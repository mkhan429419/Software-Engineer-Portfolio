"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

const RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const ICON = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", "aria-hidden": true } as const;

export function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg {...ICON} width={size} height={size}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 3C6.916 3 4 5.916 4 9.5C4 13.084 6.916 16 10.5 16C14.084 16 17 13.084 17 9.5C17 5.916 14.084 3 10.5 3ZM9 7.1L13 9.5L9 11.9V7.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg {...ICON}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 3C6.916 3 4 5.916 4 9.5C4 13.084 6.916 16 10.5 16C14.084 16 17 13.084 17 9.5C17 5.916 14.084 3 10.5 3ZM8.94 7.225C8.904 7.225 8.875 7.254 8.875 7.29V11.71C8.875 11.746 8.904 11.775 8.94 11.775H9.98C10.016 11.775 10.045 11.746 10.045 11.71V7.29C10.045 7.254 10.016 7.225 9.98 7.225H8.94ZM11.02 7.225C10.984 7.225 10.955 7.254 10.955 7.29V11.71C10.955 11.746 10.984 11.775 11.02 11.775H12.06C12.096 11.775 12.125 11.746 12.125 11.71V7.29C12.125 7.254 12.096 7.225 12.06 7.225H11.02Z"
        fill="currentColor"
      />
    </svg>
  );
}

function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg {...ICON}>
      <path d="M3.5 8.2H6.2L10 5V15L6.2 11.8H3.5V8.2Z" fill="currentColor" />
      {muted ? (
        <path d="M12.6 8L16.6 12M16.6 8L12.6 12" stroke="currentColor" strokeLinecap="round" />
      ) : (
        <>
          <path d="M12.3 7.6C13.1 8.2 13.5 9 13.5 10C13.5 11 13.1 11.8 12.3 12.4" stroke="currentColor" strokeLinecap="round" />
          <path d="M14.2 5.8C15.6 6.9 16.3 8.3 16.3 10C16.3 11.7 15.6 13.1 14.2 14.2" stroke="currentColor" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg {...ICON}>
      <path d="M5.00977 13.333C5.44809 13.9877 6.01231 14.5519 6.66699 14.9902L6.11035 15.8203C5.34708 15.3092 4.68969 14.652 4.17871 13.8887L5.00977 13.333Z" fill="currentColor" />
      <path d="M3.62402 8.73047L4.11426 8.82812C4.03945 9.20634 4 9.59807 4 10C4 10.4019 4.03945 10.7937 4.11426 11.1719L3.62305 11.2686L3.62402 11.2695L3.13379 11.3652C3.04648 10.9236 3 10.4672 3 10C3 9.53244 3.04636 9.07569 3.13379 8.63379L3.62402 8.73047Z" fill="currentColor" />
      <path d="M6.66699 5.00977C6.01231 5.44806 5.44809 6.01233 5.00977 6.66699L4.17871 6.11035C4.68972 5.34713 5.34711 4.6897 6.11035 4.17871L6.66699 5.00977Z" fill="currentColor" />
      <path d="M9 7.5L13 10L9 12.5V7.5Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3662 3C14.2322 3 17.3662 6.13401 17.3662 10C17.3662 13.866 14.2322 17 10.3662 17C9.89857 17 9.44194 16.9527 9 16.8652L9.19434 15.8857C9.42732 15.9319 9.66507 15.9644 9.90692 15.9827C13.3357 16.2381 16.3662 13.4526 16.3662 10C16.3662 6.66957 13.5384 3.91772 10.2113 4.00196C9.86539 4.01072 9.52447 4.04894 9.19434 4.11426L9.09668 3.62305L9 3.13379C9.44192 3.04642 9.89867 3 10.3662 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FullscreenIcon({ active }: { active: boolean }) {
  return (
    <svg {...ICON}>
      {active ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 4H8V8H4V9H9V4ZM12 4H11V9H16V8H12V4ZM4 11V12H8V16H9V11H4ZM11 11V16H12V12H16V11H11Z"
          fill="currentColor"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 11V14.293L8.293 11L9 11.707L5.707 15H9V16H4V11H5ZM16 4V9H15V5.707L11.707 9L11 8.293L14.293 5H11V4H16Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.94 6a.75.75 0 0 1 1.06 1.06l-5.5 5.5L5 10.06A.75.75 0 0 1 6.06 9L7.5 10.44 11.94 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function fmt(seconds: number) {
  const s = Math.max(0, Math.floor(seconds || 0));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function SeekBar({
  current,
  duration,
  loaded,
  onSeek,
}: {
  current: number;
  duration: number;
  loaded: number;
  onSeek: (seconds: number, commit: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pct = duration ? Math.min(100, (current / duration) * 100) : 0;

  const at = (e: PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)) * duration;
  };

  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft") onSeek(Math.max(0, current - step), true);
    else if (e.key === "ArrowRight") onSeek(Math.min(duration, current + step), true);
    else return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Seek slider"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(current)}
      aria-valuetext={`${fmt(current)} of ${fmt(duration)}`}
      onKeyDown={onKey}
      onPointerDown={(e) => {
        if (!duration) return;
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        onSeek(at(e), false);
      }}
      onPointerMove={(e) => {
        if (dragging.current) onSeek(at(e), false);
      }}
      onPointerUp={(e) => {
        if (!dragging.current) return;
        dragging.current = false;
        onSeek(at(e), true);
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      className="group/seek relative flex h-4 w-full cursor-pointer touch-none items-center outline-none"
    >
      <div className="relative h-1 w-full bg-black/20 transition-[height] group-hover/seek:h-[6px] group-focus-visible/seek:h-[6px]">
        <div className="absolute inset-y-0 left-0 bg-white/40" style={{ width: `${Math.min(100, loaded * 100)}%` }} />
        <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${pct}%` }} />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}

const btn =
  "inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/80 sm:h-7 sm:w-7";

interface Props {
  visible: boolean;
  playing: boolean;
  current: number;
  duration: number;
  loaded: number;
  muted: boolean;
  rate: number;
  fullscreen: boolean;
  canFullscreen: boolean;
  onToggle: () => void;
  onSeek: (seconds: number, commit: boolean) => void;
  onMute: () => void;
  onRate: (rate: number) => void;
  onFullscreen: () => void;
}

export default function PlayerControls({
  visible,
  playing,
  current,
  duration,
  loaded,
  muted,
  rate,
  fullscreen,
  canFullscreen,
  onToggle,
  onSeek,
  onMute,
  onRate,
  onFullscreen,
}: Props) {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const close = (e: globalThis.PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    const esc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [menu]);

  const show = visible || menu;

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className={`absolute inset-x-0 bottom-0 z-20 px-3 pb-2.5 pt-6 text-white transition-opacity duration-300 sm:px-4 sm:pb-3 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.21)_70%,rgba(0,0,0,0.7))] ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      } group-hover/media:pointer-events-auto group-hover/media:opacity-100 group-focus-within/media:pointer-events-auto group-focus-within/media:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100`}
    >
      <SeekBar current={current} duration={duration} loaded={loaded} onSeek={onSeek} />

      <div className="mt-1 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={onToggle} className={btn}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <p className="whitespace-nowrap font-mono text-[11px] text-white/90 sm:text-[12px]">
            {fmt(current)} / {fmt(duration)}
          </p>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button type="button" aria-label={muted ? "Unmute" : "Mute"} onClick={onMute} className={btn}>
            <VolumeIcon muted={muted} />
          </button>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-label="Playback speed"
              aria-haspopup="menu"
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className={btn}
            >
              <SpeedIcon />
            </button>
            {menu && (
              <div
                role="menu"
                aria-label="Playback speed options"
                className="absolute bottom-full right-0 z-40 mb-2 max-h-28 min-w-[7.5rem] overflow-y-auto rounded-[7px] bg-black/75 py-1 backdrop-blur-sm min-[400px]:max-h-40 sm:max-h-60"
              >
                {RATES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="menuitem"
                    aria-label={`Playback speed ${r}x`}
                    aria-current={r === rate ? true : undefined}
                    onClick={() => {
                      onRate(r);
                      setMenu(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-1 text-left font-mono text-[12px] transition-colors hover:bg-white/10 ${
                      r === rate ? "text-white" : "text-white/70"
                    }`}
                  >
                    <span className="inline-flex h-4 w-4 items-center justify-center">{r === rate && <CheckIcon />}</span>
                    {r === 1 ? "Normal" : `${r}x`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {canFullscreen && (
            <button
              type="button"
              aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              onClick={onFullscreen}
              className={btn}
            >
              <FullscreenIcon active={fullscreen} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
