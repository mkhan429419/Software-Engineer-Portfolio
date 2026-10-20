"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useInView, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/app/lib/projects";
import { useYouTubePlayer } from "@/app/lib/useYouTubePlayer";
import SectionHead from "./SectionHead";
import PeachButton from "./PeachButton";
import PlayerControls from "./PlayerControls";

const SLIDE_MS = 5500;

function youtubeId(url?: string | null) {
  if (!url || url.includes("loom")) return null;
  const match = url.match(/embed\/([^?]+)/);
  return match?.[1] ?? null;
}

function loomSrc(url?: string | null) {
  if (!url || !url.includes("loom")) return null;
  const join = url.includes("?") ? "&" : "?";
  return `${url}${join}hideEmbedTopBar=true&hide_title=true&hide_owner=true&hide_share=true&autoplay=1&muted=1`;
}

function SlideMedia({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 bg-[#111] overflow-hidden">
      <img
        src={project.image}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}

function ProjectCopy({ project }: { project: Project }) {
  return (
    <>
      <p className="text-[20px] md:text-[22px] lg:text-[28px] text-ink leading-tight break-words">
        {project.name}
      </p>
      <p className="text-[18px] sm:text-[20px] lg:text-[22px] leading-none text-ink mt-4 mb-3 lg:mt-5 lg:mb-5" aria-hidden>
        +
      </p>
      <p className="font-mono text-[16px] md:text-[18px] lg:text-[19px] text-ink leading-snug break-words">
        {project.tag}
      </p>
      <p className="font-mono text-[16px] md:text-[18px] lg:text-[19px] text-ink leading-snug mt-2">
        {project.date}
      </p>
      <div className="mt-4 lg:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} GitHub`}
            onPointerDown={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 text-ink hover:text-black transition-colors duration-150"
          >
            <FaGithub size={22} />
          </a>
        )}
        {project.details && (
          <a
            href={project.details}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} details`}
            onPointerDown={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 text-ink hover:text-black transition-colors duration-150"
          >
            <FaLinkedin size={22} />
          </a>
        )}
        <PeachButton
          href={`/projects/${project.slug}`}
          className="!px-4 !py-2 !text-[14px] sm:!px-5 sm:!py-2.5 sm:!text-[15px]"
        >
          View project
        </PeachButton>
      </div>
    </>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const inView = useInView(root, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const startX = useRef<number | null>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const n = projects.length;
  const project = projects[index];
  const videoId = youtubeId(project.video);
  const loom = loomSrc(project.video);

  const go = (dir: number) => setIndex((i) => (i + dir + n) % n);
  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);

  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

  // Preload every poster so the next slide never flashes a blank player.
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  const player = useYouTubePlayer(mountRef, videoId, {
    enabled: seen,
    visible: inView,
    autoplay: !reduce,
    onEnded: next,
  });
  const hasYouTube = !!videoId && !player.failed;
  const hasVideo = hasYouTube || !!loom;

  // Video slides advance when the video ends; image-only slides use a timer.
  useEffect(() => {
    if (!inView || reduce || paused || hasVideo) return;
    const id = setTimeout(next, SLIDE_MS);
    return () => clearTimeout(id);
  }, [inView, reduce, paused, hasVideo, index, next]);

  useEffect(() => {
    setCanFullscreen(!!document.fullscreenEnabled);
    const sync = () => setFullscreen(document.fullscreenElement === mediaRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else mediaRef.current?.requestFullscreen?.();
  };

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + n) % n);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, n]);

  const renderPager = (className: string) => (
    <div className={`items-stretch overflow-hidden rounded-lg border border-ink bg-peach text-ink ${className}`}>
      <button
        type="button"
        aria-label="Previous project"
        onClick={() => go(-1)}
        className="inline-flex h-9 w-9 items-center justify-center transition-colors duration-150 hover:bg-peach-dark sm:h-10 sm:w-11"
      >
        <ChevronLeft className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
      </button>
      <p className="flex min-w-[3.5rem] items-center justify-center px-0.5 text-center font-mono text-[12px] tabular-nums sm:min-w-[4.25rem] sm:px-1 sm:text-[13px]">
        {project.num} / {String(n).padStart(2, "0")}
      </p>
      <button
        type="button"
        aria-label="Next project"
        onClick={() => go(1)}
        className="inline-flex h-9 w-9 items-center justify-center transition-colors duration-150 hover:bg-peach-dark sm:h-10 sm:w-11"
      >
        <ChevronRight className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
      </button>
    </div>
  );

  return (
    <section id="projects" ref={root} className="bg-paper py-20 md:py-28 overflow-x-clip">
      <div className="section-wrap">
        <div className="relative mb-10 md:mb-14">
          <SectionHead title="Projects" aside="Selected work" className="!mb-0" />
          {/* lg+: prev / next sit in the heading row so they never cover the video */}
          {renderPager("absolute right-0 top-0 hidden lg:flex")}
        </div>
      </div>

      <div
        className="relative w-full select-none"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current == null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (dx > 40) go(-1);
          else if (dx < -40) go(1);
        }}
      >
        {/* Mobile/tablet: copy above the media. Desktop: frosted overlay on the video. */}
        <div
          className="px-6 md:px-12 mb-5 md:mb-6 max-w-[480px] lg:max-w-none lg:mb-0 lg:px-0 lg:absolute lg:z-20 lg:top-32 lg:left-[4%] lg:w-[min(400px,34%)]"
          aria-live="polite"
        >
          <div className="lg:w-full lg:bg-white/80 lg:rounded-[7px] lg:px-5 lg:py-5">
            <ProjectCopy project={project} />
          </div>
        </div>

        <div
          ref={mediaRef}
          className="group/media relative mx-6 md:mx-12 lg:mx-0 rounded-[6px] lg:rounded-none bg-[#111] overflow-hidden aspect-[1.36] lg:aspect-auto lg:h-[min(75vw,100svh,1100px)]"
        >
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                opacity: i === index ? 1 : 0,
                zIndex: i === index ? 1 : 0,
                pointerEvents: i === index ? "auto" : "none",
              }}
              aria-hidden={i !== index}
            >
              <SlideMedia project={p} />
            </div>
          ))}

          <div
            ref={mountRef}
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-[2] overflow-hidden transition-opacity duration-500 [&>iframe]:absolute [&>iframe]:left-1/2 [&>iframe]:top-1/2 [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:-translate-x-1/2 [&>iframe]:-translate-y-1/2 [&>iframe]:border-0 ${
              fullscreen ? "[&>iframe]:scale-100" : "[&>iframe]:scale-[1.35] lg:[&>iframe]:scale-[1.45]"
            } ${player.started ? "opacity-100" : "opacity-0"}`}
          />

          {loom && (
            <iframe
              key={loom}
              src={inView || seen ? loom : undefined}
              title={`${project.name} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 z-[2] h-full w-full border-0"
            />
          )}

          {/* Below lg: prev / next overlay the top-right corner of the video */}
          {!fullscreen && (
            <div className="absolute right-3 top-3 z-20 md:right-4 md:top-4 lg:hidden">
              {renderPager("flex")}
            </div>
          )}

          {hasYouTube && (
            <>
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
      </div>
    </section>
  );
}
