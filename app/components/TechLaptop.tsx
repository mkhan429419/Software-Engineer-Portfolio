"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Token = [text: string, color?: string];

const C = {
  comment: "#6b7685",
  keyword: "#FFBF88",
  string: "#9ece6a",
  fn: "#7aa2f7",
  ok: "#9ece6a",
};

const lines: Token[][] = [
  [["// call routing", C.comment]],
  [["const ", C.keyword], ["route = await ", undefined], ["router", C.fn]],
  [["  .match(", undefined], ["call.intent", C.fn], [")", undefined]],
  [["  .fallback(", undefined], ['"receptionist"', C.string], [");", undefined]],
  [["", undefined]],
  [["$ ", C.comment], ["deploy --all", undefined]],
  [["\u2713 1,000+ dealerships live", C.ok]],
];

const total = lines.reduce((n, l) => n + l.reduce((m, [t]) => m + t.length, 0), 0);

export default function TechLaptop({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return;
    }
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (n < total) {
        n += 1;
        setCount(n);
        timer = setTimeout(tick, 38);
      } else {
        timer = setTimeout(() => {
          n = 0;
          setCount(0);
          timer = setTimeout(tick, 600);
        }, 4500);
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [inView]);

  let remaining = count;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative w-full [container-type:inline-size] ${className}`}
    >
      <img
        src="/chrome/laptop.png"
        alt=""
        className="relative z-0 block w-full h-auto select-none pointer-events-none"
      />
      <div
        className="absolute z-10 overflow-hidden bg-[#0b0f14]"
        style={{ left: "17.2%", top: "4.9%", width: "66.2%", height: "59.6%" }}
      >
        <div
          className="font-mono leading-[1.55] whitespace-pre text-[#c9d1d9]"
          style={{ fontSize: "max(9px, 3cqw)", padding: "3.2cqw 3.6cqw" }}
        >
          {lines.map((line, i) => {
            const lineLen = line.reduce((m, [t]) => m + t.length, 0);
            const shown = Math.max(0, Math.min(lineLen, remaining));
            remaining -= lineLen;
            const typing = shown > 0 && shown < lineLen;
            const isLast = i === lines.length - 1;
            let left = shown;
            return (
              <div key={i} className="min-h-[1.55em]">
                {line.map(([text, color], j) => {
                  const part = text.slice(0, Math.max(0, left));
                  left -= text.length;
                  return (
                    <span key={j} style={color ? { color } : undefined}>
                      {part}
                    </span>
                  );
                })}
                {(typing || (isLast && shown === lineLen && count >= total)) && (
                  <span className="inline-block w-[0.55em] h-[1em] -mb-[0.15em] bg-[#c9d1d9] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
