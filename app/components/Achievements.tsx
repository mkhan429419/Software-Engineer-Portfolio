"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import SectionHead from "./SectionHead";

// Hackathon results that show a screenshot of the project instead of an illustration.
const PROJECT_SHOTS: Record<string, string> = {
  "06": "/projects/cortex.png", // Finalist - PAM Track -> Cortex Dashboard
  "07": "/projects/spidex.png", // Finalist - OloStep Track -> Spidex
  "08": "/projects/smartdocs.png", // Top 20 Teams - 48-hour Hackathon -> SmartDocs
};

const achievements = [
  {
    year: "Oct 2026",
    title: "Rector's Gold Medal for Best Final Year Project",
    context: "NUST SEECS Convocation 2026 · 40+ competing teams",
    highlight: true,
    icon: "01",
  },
  {
    year: "May 2026",
    title: "3rd Best Industry Project of Software Engineering",
    context: "NUST SEECS Open House 2026 · 40+ competing teams",
    highlight: true,
    icon: "02",
  },
  {
    year: "Aug 2023",
    title: "UAE Golden Visa Holder",
    context: "UAE Government · Outstanding Student Category",
    highlight: true,
    icon: "03",
  },
  {
    year: "Jan 2026",
    title: "AI, Cyber Hackathon & Drone Swarm Gala",
    context: "Pak-China Friendship Centre · 20+ participating teams",
    highlight: false,
    icon: "04",
  },
  {
    year: "Feb 2025",
    title: "NUST GPA-Based Scholarship Award",
    context: "NUST SEECS · 1-time recipient",
    highlight: false,
    icon: "05",
  },
  {
    year: "Aug 2024",
    title: "Finalist - PAM Track",
    context: "Headstarter AI Hiring Hackathon 2 · 30+ competing teams",
    highlight: false,
    icon: "06",
  },
  {
    year: "Aug 2024",
    title: "Finalist - OloStep Track",
    context: "Headstarter AI Hiring Hackathon 1 · 50+ competing teams",
    highlight: false,
    icon: "07",
  },
  {
    year: "Jul 2024",
    title: "Top 20 Teams - 48-hour Hackathon",
    context: "Headstarter AI Hackathon · 550+ competing teams",
    highlight: false,
    icon: "08",
  },
].map((a) => ({ ...a, image: PROJECT_SHOTS[a.icon] ?? `/achievements/${a.icon}.jpg` }));

const N = achievements.length;
// Slightly slower than the Experience section's player screen (2.2s); same crossfade.
const AUTOPLAY_MS = 2400;

// Screen opening inside /chrome/laptop-retro.jpg (percent of the image).
const SCREEN = { left: 10.63, top: 4.92, width: 77.95, height: 54.92 };
// Where the lid meets the base (percent from the top); the lid folds around this line on scroll.
const HINGE = 68.6;

export default function Achievements() {
  const reduce = useReducedMotion();
  const laptopRef = useRef<HTMLDivElement>(null);
  const inView = useInView(laptopRef, { amount: 0.3 });
  const startX = useRef<number | null>(null);
  const [slide, setSlide] = useState<{ cur: number; prev: number | null }>({ cur: 0, prev: null });
  const { cur, prev } = slide;
  const setCur = useCallback((i: number) => setSlide((s) => (s.cur === i ? s : { cur: i, prev: s.cur })), []);
  const [paused, setPaused] = useState(false);
  const [awake, setAwake] = useState(false);

  // The lid opens as the laptop scrolls into view and folds back down when scrolling away.
  // Progress is read from the live position (not a one-off measurement) so it stays correct
  // with the sticky column and layout shifts above.
  const scrollYProgress = useMotionValue(0);
  const rotate = useTransform(scrollYProgress, [0, 0.85], [-82, 0]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setAwake(v > 0.05));
  useEffect(() => {
    const el = laptopRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startTop = vh * 0.95; // laptop top reaches 95% of the viewport -> closed
      const endTop = vh * 0.55 - r.height / 2; // laptop centre reaches 55% -> open
      const p = (startTop - r.top) / (startTop - endTop);
      scrollYProgress.set(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollYProgress]);

  // Warm the cache so the faster pace never shows a half-loaded slide.
  useEffect(() => {
    if (!inView) return;
    achievements.forEach((a) => {
      const img = new Image();
      img.src = a.image;
    });
  }, [inView]);

  const go = useCallback(
    (d: number) => setSlide((s) => ({ cur: (s.cur + d + N) % N, prev: s.cur })),
    [],
  );

  // Advance on a timer; restarting whenever the slide changes gives manual picks a full beat.
  useEffect(() => {
    if (reduce || paused || !inView || !awake) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [cur, reduce, paused, inView, awake, go]);

  return (
    <section id="achievements" className="bg-paper py-20 md:py-28">
      <div className="section-wrap">
        <SectionHead title="Achievements" aside="Recognition" />

        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:items-start lg:gap-x-10 xl:gap-x-16">
          {/* Laptop carousel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto w-full max-w-[560px] md:max-w-[680px] lg:sticky lg:top-28 lg:max-w-none"
          >
            <div
              ref={laptopRef}
              className="relative aspect-[1007/792] select-none [container-type:inline-size]"
              onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
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
              style={{ touchAction: "pan-y" }}
            >
              <div className="absolute inset-0" style={{ perspective: "500cqw", perspectiveOrigin: "50% 60%" }}>
                {/* Base (keyboard) stays put */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/chrome/laptop-retro.jpg"
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full select-none"
                  style={{ clipPath: `inset(${HINGE - 0.4}% 0 0 0)` }}
                />
                {/* Lid (screen) folds around the hinge */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateX: reduce ? 0 : rotate,
                    transformOrigin: `50% ${HINGE}%`,
                    clipPath: `inset(0 0 ${100 - HINGE}% 0)`,
                    willChange: "transform",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/chrome/laptop-retro.jpg"
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none"
                  />
                  <div
                    className="absolute overflow-hidden bg-[#0b0f14]"
                    style={{
                      left: `${SCREEN.left}%`,
                      top: `${SCREEN.top}%`,
                      width: `${SCREEN.width}%`,
                      height: `${SCREEN.height}%`,
                    }}
                  >
                    {achievements.map((a, i) => (
                      <div
                        key={a.icon}
                        aria-hidden={i !== cur}
                        className="absolute inset-0"
                        style={{
                          zIndex: i === cur ? 2 : i === prev ? 1 : 0,
                          opacity: i === cur || i === prev ? 1 : 0,
                          transform: i === cur || i === prev ? "scale(1)" : "scale(1.06)",
                          transition:
                            i === cur && !reduce
                              ? "opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1), transform 2600ms cubic-bezier(0.22, 1, 0.36, 1)"
                              : "none",
                          willChange: "opacity, transform",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={a.image}
                          alt={i === cur ? a.title : ""}
                          draggable={false}
                          loading={i === 0 ? "eager" : "lazy"}
                          decoding="async"
                          className="pointer-events-none block h-full w-full select-none object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* List */}
          <ul className="flex min-w-0 flex-col gap-2 md:gap-3">
            {achievements.map((a, i) => {
              const on = i === cur;
              return (
                <motion.li
                  key={a.icon}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => setCur(i)}
                    aria-current={on ? "true" : undefined}
                    className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors duration-200 md:gap-4 md:px-4 ${
                      on ? "border-ink bg-peach" : "border-transparent hover:border-ink/20"
                    }`}
                  >
                    <span className="block min-w-0 flex-1">
                      <span className="block font-mono text-[14px] leading-none text-ink md:text-[15px] 2xl:text-[17px]">
                        {a.year}
                      </span>
                      <span className="mt-2 block break-words text-[18px] font-normal leading-tight tracking-tight text-ink sm:text-[20px] 2xl:text-[22px]">
                        {a.title}
                      </span>
                      <span className="mt-1.5 block break-words font-mono text-[14px] leading-snug text-mute md:text-[15px] 2xl:text-[16px]">
                        {a.context}
                      </span>
                    </span>

                    <span
                      className={`hidden flex-shrink-0 self-start pt-0.5 font-mono text-[14px] sm:block md:text-[15px] ${
                        on ? "text-ink" : "text-mute"
                      }`}
                    >
                      {a.icon}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
