"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const W = 160;
const H = 126;
const TICK_MS = 1000 / 30;

const COL: Record<string, string> = {
  bg: "#9bbc0f",
  c: "#8bac0f",
  b: "#306230",
  a: "#0f380f",
};

const HERO_BODY = [
  "...aaaa...",
  "..aaaaaa..",
  "..aacaca..",
  "..aaaaaa..",
  "...aaaa...",
  ".aabbbbaa.",
  ".ab.bb.ba.",
  "..abbbba..",
];
const HERO_LEGS = [
  ["..aa..aa..", "..aa..aa.."],
  ["...aaaa...", "...aaaa..."],
];
const HERO_AIR = ["..aa..aa..", ".aa....aa."];

const FONT: Record<string, string> = {
  A: "010101111101101",
  B: "110101110101110",
  C: "011100100100011",
  D: "110101101101110",
  E: "111100110100111",
  F: "111100110100100",
  G: "011100101101011",
  H: "101101111101101",
  I: "111010010010111",
  J: "001001001101010",
  K: "101101110101101",
  L: "100100100100111",
  M: "101111111101101",
  N: "110101101101101",
  O: "010101101101010",
  P: "110101110100100",
  Q: "010101101111011",
  R: "110101110101101",
  S: "011100010001110",
  T: "111010010010010",
  U: "101101101101111",
  V: "101101101101010",
  W: "101101111111101",
  X: "101101010101101",
  Y: "101101010010010",
  Z: "111001010100111",
  "0": "111101101101111",
  "1": "010110010010111",
  "2": "111001111100111",
  "3": "111001111001111",
  "4": "101101111001001",
  "5": "111100111001111",
  "6": "111100111101111",
  "7": "111001001001001",
  "8": "111101111101111",
  "9": "111101111001111",
  "%": "101001010100101",
  "!": "010010010000010",
  ".": "000000000000010",
};

const STARS: [number, number][] = [
  [14, 22],
  [140, 18],
  [30, 46],
  [132, 42],
  [52, 10],
  [112, 9],
];

const STATUS = [
  [0, "BOOTING UP"],
  [20, "LOADING ASSETS"],
  [45, "COMPILING CODE"],
  [70, "SHIPPING IT"],
  [96, "READY"],
] as const;

const textWidth = (s: string, k: number) => s.length * 4 * k - k;

export default function GameScreen({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrapRef, { margin: "200px" });
  const reduce = useReducedMotion();
  const runningRef = useRef(false);
  runningRef.current = inView && !reduce;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const px = (x: number, y: number, w: number, h: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x), Math.round(y), w, h);
    };

    const sprite = (rows: string[], x: number, y: number, k: number) => {
      rows.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
          const ch = row[rx];
          if (ch !== ".") px(x + rx * k, y + ry * k, k, k, COL[ch]);
        }
      });
    };

    const text = (s: string, x: number, y: number, k: number, color = COL.a) => {
      for (let i = 0; i < s.length; i++) {
        const bits = FONT[s[i]];
        if (!bits) continue;
        for (let j = 0; j < 15; j++) {
          if (bits[j] === "1") px(x + i * 4 * k + (j % 3) * k, y + Math.floor(j / 3) * k, k, k, color);
        }
      }
    };

    const centered = (s: string, y: number, k: number, color?: string) =>
      text(s, Math.round((W - textWidth(s, k)) / 2), y, k, color);

    const BAR_X = 20;
    const BAR_W = 120;
    const BAR_Y = 80;
    const SEGMENTS = 20;

    let frame = 0;
    let progress = 0;
    let speed = 0.8;
    let speedTimer = 0;
    let hold = 0;

    const tick = () => {
      frame++;
      if (hold > 0) {
        hold--;
        if (hold === 0) {
          progress = 0;
          speed = 0.5;
        }
        return;
      }
      if (--speedTimer <= 0) {
        speed = [0.15, 0.6, 1.1, 1.8][Math.floor(Math.random() * 4)];
        speedTimer = 10 + Math.floor(Math.random() * 20);
      }
      progress = Math.min(100, progress + speed);
      if (progress >= 100) hold = 75;
    };

    const render = () => {
      px(0, 0, W, H, COL.bg);

      centered("MAHEEN KHAN", 5, 1, COL.b);
      px(0, 14, W, 1, COL.c);

      STARS.forEach(([x, y], i) => {
        const phase = (Math.floor(frame / 9) + i) % 4;
        if (phase === 0) {
          px(x - 1, y, 3, 1, COL.b);
          px(x, y - 1, 1, 3, COL.b);
        } else if (phase < 3) {
          px(x, y, 1, 1, COL.b);
        }
      });

      const ready = progress >= 100;
      const bob = ready ? Math.round(Math.abs(Math.sin(frame / 3)) * 5) : Math.floor(frame / 4) % 2;
      const heroX = 65;
      const heroY = 18 - bob;
      sprite(HERO_BODY, heroX, heroY, 3);
      const legs = ready ? HERO_AIR : HERO_LEGS[Math.floor(frame / 4) % 2];
      sprite(legs, heroX, heroY + HERO_BODY.length * 3, 3);
      px(heroX - 2, 49, 34, 1, COL.b);
      px(heroX + 2, 50, 26, 1, COL.c);

      if (ready) {
        if (Math.floor(frame / 10) % 2 === 0) centered("PRESS START", 58, 2);
      } else {
        const dots = ".".repeat(Math.floor(frame / 8) % 4);
        text("LOADING" + dots, Math.round((W - textWidth("LOADING...", 2)) / 2), 58, 2);
      }

      px(BAR_X - 2, BAR_Y - 2, BAR_W + 4, 14, COL.a);
      px(BAR_X - 1, BAR_Y - 1, BAR_W + 2, 12, COL.bg);
      const segW = BAR_W / SEGMENTS;
      const filled = Math.floor((progress / 100) * SEGMENTS);
      for (let i = 0; i < filled; i++) {
        px(BAR_X + i * segW + 1, BAR_Y + 1, segW - 2, 8, COL.a);
      }
      if (!ready && filled < SEGMENTS) {
        const partial = ((progress / 100) * SEGMENTS - filled) * (segW - 2);
        px(BAR_X + filled * segW + 1, BAR_Y + 1, Math.round(partial), 8, COL.b);
      }

      const status = [...STATUS].reverse().find(([from]) => progress >= from)?.[1] ?? "";
      text(status, BAR_X - 2, 99, 1, COL.b);
      const pct = `${Math.floor(progress)}%`;
      text(pct, BAR_X + BAR_W + 2 - textWidth(pct, 1), 99, 1, COL.a);

      px(0, 112, W, 1, COL.c);
      centered("LV 01", 116, 1, COL.b);
    };

    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!runningRef.current) {
        last = now;
        return;
      }
      acc += Math.min(now - last, 250);
      last = now;
      let stepped = false;
      while (acc >= TICK_MS) {
        tick();
        acc -= TICK_MS;
        stepped = true;
      }
      if (stepped) render();
    };

    for (let i = 0; i < 70; i++) tick();
    render();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`} aria-hidden>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="block h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,56,15,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(15,56,15,0.10) 1px, transparent 1px)",
          backgroundSize: `calc(100% / ${W}) calc(100% / ${H})`,
          boxShadow: "inset 0 0 18px rgba(15,56,15,0.35)",
        }}
      />
    </div>
  );
}
