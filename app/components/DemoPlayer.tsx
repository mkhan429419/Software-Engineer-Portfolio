"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { Project } from "@/app/lib/projects";
import { useYouTubePlayer } from "@/app/lib/useYouTubePlayer";
import PlayerControls from "./PlayerControls";

function youtubeId(url?: string | null) {
  if (!url || url.includes("loom")) return null;
  const match = url.match(/embed\/([^?]+)/);
  return match?.[1] ?? null;
}

/** Screenshot (or tinted gradient) shown before a video starts, or when a project has none. */
function Poster({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: project.screenBg || "#111" }}>
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(ellipse at 35% 35%, ${project.accent}55 0%, transparent 60%)` }}
      />
      {project.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          draggable={false}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
    </div>
  );
}

/**
 * Project demo player. Uses the same custom Wix-style controls as the Projects carousel
 * for YouTube demos; Loom embeds and local files keep their own player.
 */
export default function DemoPlayer({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { amount: 0.4 });
  const [seen, setSeen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const rewindRef = useRef<() => void>(() => {});

  const video = project.video;
  const videoId = youtubeId(video);

  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

  useEffect(() => {
    setCanFullscreen(!!document.fullscreenEnabled);
    const sync = () => setFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const player = useYouTubePlayer(mountRef, videoId, {
    enabled: seen,
    visible: inView,
    autoplay: !reduce,
    onEnded: () => rewindRef.current(),
  });
  rewindRef.current = player.rewind;

  const hasYouTube = !!videoId && !player.failed;
  const isFile = !!video && video.startsWith("/");
  const isEmbed = !!video && !videoId && !isFile;

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else frameRef.current?.requestFullscreen?.();
  };

  return (
    <div
      ref={frameRef}
      className="group/media relative aspect-video w-full overflow-hidden rounded-[6px] bg-[#111] lg:rounded-none"
    >
      {(!video || hasYouTube || player.failed) && <Poster project={project} />}

      {isFile && (
        <video
          src={video!}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}

      {isEmbed && (
        <iframe
          src={`${video}${video!.includes("?") ? "&" : "?"}hideEmbedTopBar=true`}
          title={`${project.name} demo`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      )}

      {videoId && !player.failed && (
        <>
          <div
            ref={mountRef}
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-[2] overflow-hidden transition-opacity duration-500 [&>iframe]:absolute [&>iframe]:left-1/2 [&>iframe]:top-1/2 [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:-translate-x-1/2 [&>iframe]:-translate-y-1/2 [&>iframe]:border-0 ${
              fullscreen ? "[&>iframe]:scale-100" : "[&>iframe]:scale-[1.2]"
            } ${player.started ? "opacity-100" : "opacity-0"}`}
          />
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={player.toggle}
            className="absolute inset-0 z-10 cursor-pointer"
          />
          <PlayerControls
            visible={(player.started || !!reduce) && !player.playing}
            playing={player.playing}
            current={player.current}
            duration={player.duration}
            loaded={player.loaded}
            muted={player.muted}
            rate={player.rate}
            fullscreen={fullscreen}
            canFullscreen={canFullscreen}
            onToggle={player.toggle}
            onSeek={player.seek}
            onMute={() => player.setMuted(!player.muted)}
            onRate={player.setRate}
            onFullscreen={toggleFullscreen}
          />
        </>
      )}
    </div>
  );
}
