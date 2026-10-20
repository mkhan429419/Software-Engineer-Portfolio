"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  setPlaybackRate(rate: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  getVideoLoadedFraction(): number;
  getIframe(): HTMLIFrameElement | null;
  stopVideo(): void;
  destroy(): void;
}

interface YTNamespace {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const STATE_ENDED = 0;
const STATE_PLAYING = 1;
const STATE_PAUSED = 2;

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        if (window.YT) resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = null;
        reject(new Error("YouTube API failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

// Only one project video may ever make sound. Every player is registered here
// and fully silenced + torn down before another one is created.
const livePlayers = new Set<YTPlayer>();

function killPlayer(p: YTPlayer) {
  livePlayers.delete(p);
  let frame: HTMLIFrameElement | null = null;
  try {
    frame = p.getIframe();
  } catch {
    /* player not initialised yet */
  }
  try {
    p.mute();
    p.stopVideo();
  } catch {
    /* not ready: removing the iframe below still stops playback */
  }
  if (frame) {
    // Navigating away guarantees the audio stops even if destroy() is slow.
    frame.src = "about:blank";
    frame.remove();
  }
  try {
    p.destroy();
  } catch {
    /* iframe already gone */
  }
}

interface Options {
  /** Create the player only once this is true (e.g. section scrolled into view). */
  enabled: boolean;
  /** Pause when false, resume when true (unless the visitor paused manually). */
  visible: boolean;
  autoplay: boolean;
  onEnded: () => void;
}

export function useYouTubePlayer(
  mountRef: RefObject<HTMLDivElement>,
  videoId: string | null,
  { enabled, visible, autoplay, onEnded }: Options
) {
  const playerRef = useRef<YTPlayer | null>(null);
  const userPaused = useRef(false);
  const playingRef = useRef(false);
  const mutedRef = useRef(true);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;

  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [muted, setMutedState] = useState(true);
  const [rate, setRateState] = useState(1);

  useEffect(() => {
    setReady(false);
    setStarted(false);
    setPlaying(false);
    setFailed(false);
    setCurrent(0);
    setDuration(0);
    setLoaded(0);
    setRateState(1);
    playingRef.current = false;
    userPaused.current = false;

    const mount = mountRef.current;
    if (!videoId || !enabled || !mount) return;

    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const host = document.createElement("div");
    mount.appendChild(host);

    const sync = () => {
      const p = playerRef.current;
      if (!p) return;
      setCurrent(p.getCurrentTime() || 0);
      setDuration(p.getDuration() || 0);
      setLoaded(p.getVideoLoadedFraction() || 0);
    };

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        livePlayers.forEach(killPlayer);
        const created = new YT.Player(host, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (cancelled) return;
              if (!mutedRef.current) playerRef.current?.unMute();
              setReady(true);
              sync();
              timer = setInterval(sync, 250);
            },
            onStateChange: (e: { data: number }) => {
              if (cancelled) return;
              if (e.data === STATE_PLAYING) {
                playingRef.current = true;
                setPlaying(true);
                setStarted(true);
              } else if (e.data === STATE_PAUSED) {
                playingRef.current = false;
                setPlaying(false);
              } else if (e.data === STATE_ENDED) {
                playingRef.current = false;
                setPlaying(false);
                onEndedRef.current();
              }
            },
            onError: () => {
              if (!cancelled) setFailed(true);
            },
          },
        });
        playerRef.current = created;
        livePlayers.add(created);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      const p = playerRef.current;
      playerRef.current = null;
      if (p) killPlayer(p);
      mount.replaceChildren();
    };
  }, [videoId, enabled, autoplay, mountRef]);

  useEffect(() => {
    const p = playerRef.current;
    if (!ready || !p) return;
    if (!visible) {
      if (playingRef.current) p.pauseVideo();
    } else if (!userPaused.current && !playingRef.current && autoplay) {
      p.playVideo();
    }
  }, [visible, ready, autoplay]);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (playingRef.current) {
      userPaused.current = true;
      p.pauseVideo();
    } else {
      userPaused.current = false;
      p.playVideo();
    }
  }, []);

  /** Jump back to the first frame and wait there (used when a video ends and shouldn't loop). */
  const rewind = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    userPaused.current = true;
    p.seekTo(0, true);
    p.pauseVideo();
    setCurrent(0);
  }, []);

  const seek = useCallback((seconds: number, commit: boolean) => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(seconds, commit);
    setCurrent(seconds);
  }, []);

  const setMuted = useCallback((next: boolean) => {
    const p = playerRef.current;
    mutedRef.current = next;
    setMutedState(next);
    if (!p) return;
    if (next) p.mute();
    else p.unMute();
  }, []);

  const setRate = useCallback((next: number) => {
    playerRef.current?.setPlaybackRate(next);
    setRateState(next);
  }, []);

  return {
    ready,
    started,
    playing,
    failed,
    current,
    duration,
    loaded,
    muted,
    rate,
    toggle,
    rewind,
    seek,
    setMuted,
    setRate,
  };
}
