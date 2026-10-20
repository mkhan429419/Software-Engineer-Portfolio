"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const SLIDE_MS = 2200;

export const PLAYER_SCREEN = { left: "12.5%", top: "7.42%", width: "75.8%", height: "36.23%" };

export default function PlayerScreen({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState<{ cur: number; prev: number | null }>({ cur: 0, prev: null });

  useEffect(() => {
    if (!inView || reduce || images.length < 2) return;
    const id = setInterval(
      () => setSlide((s) => ({ cur: (s.cur + 1) % images.length, prev: s.cur })),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [inView, reduce, images.length]);

  useEffect(() => {
    if (!inView) return;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [inView, images]);

  return (
    <div
      ref={ref}
      className="absolute overflow-hidden bg-[#0b0f14] pointer-events-none"
      style={PLAYER_SCREEN}
      aria-hidden
    >
      {images.map((src, i) => {
        const isCur = i === slide.cur;
        const isPrev = i === slide.prev;
        return (
          <div
            key={src}
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
              src={src}
              alt=""
              draggable={false}
              decoding="async"
              className="block h-full w-full object-cover object-top select-none"
            />
          </div>
        );
      })}
    </div>
  );
}
