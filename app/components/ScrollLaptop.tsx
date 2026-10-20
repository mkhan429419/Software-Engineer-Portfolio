"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/app/lib/projects";

const HINGE = 69.7;
const SCREEN = { left: 16.83, top: 4.53, width: 67.17, height: 60.45 };
const SHOT_SLUGS = ["cybershield", "cortex", "profeval", "stocksmart", "cardhunt", "greenthread"];
const SLIDE_MS = 1500;

const shots = SHOT_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is (typeof projects)[number] => Boolean(p),
);

export default function ScrollLaptop({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref);
  const [awake, setAwake] = useState(false);
  const [btnOn, setBtnOn] = useState(false);
  const [slide, setSlide] = useState<{ cur: number; prev: number | null }>({ cur: 0, prev: null });
  const [shown, setShown] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.55"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.85], [-82, 0]);
  const btnOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  const sync = (v: number) => {
    setAwake(v > 0.05);
    setBtnOn(v >= 0.25);
  };

  useMotionValueEvent(scrollYProgress, "change", sync);

  useEffect(() => {
    sync(scrollYProgress.get());
  }, [scrollYProgress]);

  const running = (awake || reduce) && inView;
  const btnActive = reduce ? inView : btnOn;

  useEffect(() => {
    if (!running || reduce || shown) return;
    const id = setInterval(
      () => setSlide((s) => ({ cur: (s.cur + 1) % shots.length, prev: s.cur })),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [running, reduce, shown]);

  useEffect(() => {
    if (!inView) return;
    shots.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, [inView]);

  useEffect(() => {
    if (!btnActive) setShown(false);
  }, [btnActive]);

  return (
    <div
      ref={ref}
      className={`relative aspect-[1200/928] [container-type:inline-size] ${className}`}
    >
      <div className="absolute inset-0" style={{ perspective: "500cqw", perspectiveOrigin: "50% 60%" }}>
        <img
          src="/chrome/laptop.png"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full select-none pointer-events-none"
          style={{ clipPath: `inset(${HINGE - 0.4}% 0 0 0)` }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            rotateX: reduce ? 0 : rotate,
            transformOrigin: `50% ${HINGE}%`,
            clipPath: `inset(0 0 ${100 - HINGE}% 0)`,
            willChange: "transform",
          }}
        >
          <img
            src="/chrome/laptop.png"
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full select-none pointer-events-none"
          />

          <div
            className="absolute overflow-hidden bg-[#0b0f14] [container-type:inline-size]"
            onPointerEnter={(e) => {
              if (btnActive && e.pointerType === "mouse") setShown(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setShown(false);
            }}
            onFocus={() => setShown(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setShown(false);
            }}
            style={{
              left: `${SCREEN.left}%`,
              top: `${SCREEN.top}%`,
              width: `${SCREEN.width}%`,
              height: `${SCREEN.height}%`,
            }}
          >
            {shots.map((p, i) => {
              const isCur = i === slide.cur;
              const isPrev = i === slide.prev;
              return (
                <div
                  key={p.slug}
                  className="absolute inset-0"
                  style={{
                    zIndex: isCur ? 2 : isPrev ? 1 : 0,
                    opacity: isCur || isPrev ? 1 : 0,
                    transform: isCur || isPrev ? "scale(1)" : "scale(1.06)",
                    transition: isCur
                      ? "opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1), transform 2600ms cubic-bezier(0.22, 1, 0.36, 1)"
                      : "none",
                    willChange: "opacity, transform",
                  }}
                >
                  <img
                    src={p.image}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover object-top select-none pointer-events-none"
                  />
                </div>
              );
            })}

            <motion.div
              className="absolute inset-x-0 flex justify-center"
              style={{
                zIndex: 10,
                bottom: "max(6px, 5cqw)",
                opacity: reduce ? 1 : btnOpacity,
                pointerEvents: btnActive ? "auto" : "none",
              }}
            >
              <a
                href="#projects"
                tabIndex={btnActive ? 0 : -1}
                className="peach-btn whitespace-nowrap"
                style={{
                  fontSize: "clamp(10px, 4cqw, 15px)",
                  padding: "0.67em 1.33em",
                }}
              >
                View projects
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
