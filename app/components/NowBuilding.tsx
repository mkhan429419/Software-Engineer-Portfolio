"use client";

import { useEffect, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Terminal } from "lucide-react";
import PeachButton from "./PeachButton";

const tracks = [
  {
    title: "Call routing & AI pipelines",
    sub: "PAM · Software Engineer · Oct 2024 - Present",
    stack: ["Node.js", "AWS", "PostgreSQL", "OpenAI"],
    href: "/#work",
    cta: "View experience",
  },
  {
    title: "CyberShield",
    sub: "Final-year project · NUST",
    stack: ["Next.js", "Node.js", "MongoDB", "Gemini API"],
    href: "/projects/cybershield",
    cta: "View project",
  },
  {
    title: "Cortex Dashboard",
    sub: "Headstarter AI Hiring Hackathon 2 · Finalist",
    stack: ["Next.js", "DynamoDB", "AWS Comprehend"],
    href: "/projects/cortex",
    cta: "View project",
  },
];

const TRACK_MS = 9000;
const TICK_MS = 100;

export default function NowBuilding() {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => e + TICK_MS);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (elapsed >= TRACK_MS) {
      setIndex((i) => (i + 1) % tracks.length);
      setElapsed(0);
    }
  }, [elapsed]);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + tracks.length) % tracks.length);
    setElapsed(0);
  };

  const track = tracks[index];
  const progress = Math.min(elapsed / TRACK_MS, 1);

  return (
    <div className="flex flex-col gap-5 w-full max-w-[460px] 2xl:max-w-[540px]">
      <div className="border border-ink/20 rounded-xl bg-white px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Terminal size={20} className="text-ink flex-shrink-0" aria-hidden />
            <p className="font-mono text-[18px] sm:text-[20px] text-ink truncate">Now Building</p>
          </div>
          <div className={`eq ${playing ? "" : "eq-paused"}`} aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="mt-5 min-h-[72px]" aria-live="polite">
          <p className="font-mono text-[15px] sm:text-[16px] text-ink leading-snug">{track.title}</p>
          <p className="font-mono text-[12px] text-mute mt-1.5 leading-snug">{track.sub}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {track.stack.map((s) => (
            <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-md text-ink border border-ink/20">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 h-[3px] bg-ink/10 rounded-full overflow-hidden">
          <div className="h-full bg-ink" style={{ width: `${progress * 100}%` }} />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-mono text-[12px] text-mute">
            {String(index + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="w-9 h-9 flex items-center justify-center text-ink hover:text-mute transition-colors"
            >
              <SkipBack size={16} />
            </button>
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
              className="w-10 h-10 rounded-full border border-ink bg-peach hover:bg-peach-dark transition-colors flex items-center justify-center text-ink"
            >
              {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="w-9 h-9 flex items-center justify-center text-ink hover:text-mute transition-colors"
            >
              <SkipForward size={16} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <PeachButton href={track.href}>{track.cta}</PeachButton>
      </div>
    </div>
  );
}
