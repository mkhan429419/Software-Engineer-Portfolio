"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiTypescript, SiJavascript, SiPython, SiCplusplus,
  SiNodedotjs, SiExpress, SiGraphql, SiPrisma,
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer,
  SiMantine, SiChakraui,
  SiMongodb, SiPostgresql, SiFirebase, SiRedis,
  SiOpenai, SiHuggingface, SiGooglegemini,
  SiGit, SiVercel, SiDocker, SiTwilio,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

// Inline SVG for icons not available in any react-icons set
const DynamoDBIcon = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="5" rx="8" ry="2.5" fill="#4053AF"/>
    <path d="M4 5v5.5c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5c0 1.38-3.58 2.5-8 2.5S4 6.38 4 5z" fill="#5060C0"/>
    <path d="M4 10.5v5.5c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-5.5c0 1.38-3.58 2.5-8 2.5s-8-1.12-8-2.5z" fill="#4053AF"/>
    <ellipse cx="12" cy="16" rx="8" ry="2.5" fill="#5060C0"/>
  </svg>
);

const PineconeIcon = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L7 9h2.5L7 14h3L8 21l8-9h-3.5L15 7h-2.5L15 2H12z" fill="#6366F1"/>
  </svg>
);

type SvgIconComponent = React.FC<{ size?: number }>;

type StackItem = {
  name: string;
  icon?: IconType;
  svgIcon?: SvgIconComponent;
  color: string;
  abbr?: string;
};

const row1: StackItem[] = [
  { name: "TypeScript",  icon: SiTypescript,       color: "#3B82F6" },
  { name: "JavaScript",  icon: SiJavascript,       color: "#D4A017" }, // gold — yellow washes out on cream
  { name: "Python",      icon: SiPython,           color: "#4B9CD3" },
  { name: "C++",         icon: SiCplusplus,        color: "#0077B6" },
  { name: "Node.js",     icon: SiNodedotjs,        color: "#38A169" },
  { name: "Express",     icon: SiExpress,          color: "#525252" }, // Express is black — slightly lifted
  { name: "GraphQL",     icon: SiGraphql,          color: "#E10098" },
  { name: "Prisma",      icon: SiPrisma,           color: "#2A6496" }, // Prisma teal-blue, more vibrant
  { name: "React",       icon: SiReact,            color: "#22AADE" }, // vivid sky-blue
  { name: "Next.js",     icon: SiNextdotjs,        color: "#404040" }, // Next.js is black — lifted to show
  { name: "Tailwind",    icon: SiTailwindcss,      color: "#0EA5E9" },
  { name: "Framer",      icon: SiFramer,           color: "#0055FF" },
  { name: "Mantine",     icon: SiMantine,          color: "#228BE6" },
  { name: "Chakra UI",   icon: SiChakraui,         color: "#38B2AC" },
];

const row2: StackItem[] = [
  { name: "AWS",         icon: FaAws,              color: "#FF9900" }, // official AWS orange
  { name: "DynamoDB",    svgIcon: DynamoDBIcon,    color: "#4053AF" },
  { name: "MongoDB",     icon: SiMongodb,          color: "#3A9E3A" },
  { name: "PostgreSQL",  icon: SiPostgresql,       color: "#3B82F6" },
  { name: "Firebase",    icon: SiFirebase,         color: "#F57C00" }, // Firebase orange
  { name: "Pinecone",    svgIcon: PineconeIcon,    color: "#6366F1" },
  { name: "Redis",       icon: SiRedis,            color: "#E53935" },
  { name: "OpenAI",      icon: SiOpenai,           color: "#10B981" },
  { name: "Gemini",      icon: SiGooglegemini,     color: "#4285F4" },
  { name: "Groq",                                  color: "#F55036", abbr: "GR" },
  { name: "Retell AI",                             color: "#6366F1", abbr: "RA" },
  { name: "HuggingFace", icon: SiHuggingface,      color: "#C78A00" }, // amber — yellow washes out on cream
  { name: "ElevenLabs",                            color: "#444",    abbr: "EL" },
  { name: "Twilio",      icon: SiTwilio,           color: "#F22F46" },
  { name: "Git",         icon: SiGit,              color: "#F05032" },
  { name: "Vercel",      icon: SiVercel,           color: "#404040" }, // Vercel is black — lifted to show
  { name: "Docker",      icon: SiDocker,           color: "#2496ED" },
];

const ITEM_WIDTH = 56; // px, matches size={30} icon + label padding

function MarqueeTrack({ items, gap, reverse = false }: { items: StackItem[]; gap: number; reverse?: boolean }) {

  const quadrupled = [...items, ...items, ...items, ...items];
  const animClass = reverse ? "marquee-anim-reverse" : "marquee-anim";

  return (
    <div
      className="marquee-track relative w-full"
      style={{
        overflowX: "hidden",
        overflowY: "visible",
        paddingTop: "6px",
        paddingBottom: "6px",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className={`${animClass} flex w-max`}>
        {quadrupled.map((item, i) => {
          const Icon = item.icon;
          const SvgIcon = item.svgIcon;
          return (
            <div
              key={`${item.name}-${i}`}
              className="stack-item flex flex-col items-center gap-2 select-none cursor-default"
              style={{ minWidth: `${ITEM_WIDTH}px`, marginRight: `${gap}px`, "--glow": item.color } as React.CSSProperties}
            >
              {Icon ? (
                <Icon size={30} color={item.color} />
              ) : SvgIcon ? (
                <SvgIcon size={30} />
              ) : (
                <span className="font-mono text-[13px] font-bold leading-none" style={{ color: item.color, height: "30px", display: "flex", alignItems: "center" }}>
                  {item.abbr}
                </span>
              )}
              <span className="font-mono text-[9px] tracking-[0.06em] text-olive-3 text-center leading-tight" style={{ maxWidth: "60px" }}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Stack() {
  // Use the shorter row (row1, 14 items) to set gap — both rows share the same value
  const [gap, setGap] = useState(60);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const n = row1.length; // 14 — the shorter row drives the calculation
      const slot = Math.ceil((vw + ITEM_WIDTH + 40) / n);
      setGap(Math.max(slot - ITEM_WIDTH, 40));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="stack" className="pt-4 pb-20 md:pt-6 md:pb-28 relative">
      {/* No blobs — Projects relays in from above, Education relays in from below */}

      {/* Marquee rows — overflow-hidden only here, not on the section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        <MarqueeTrack items={row1} gap={gap} />
        <MarqueeTrack items={row2} gap={gap} reverse />
      </motion.div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-25%); }
          to   { transform: translateX(0); }
        }
        .marquee-anim {
          animation: marquee 38s linear infinite;
        }
        .marquee-anim-reverse {
          animation: marquee-reverse 38s linear infinite;
        }
        /* Pause the whole row when hovering anywhere on it */
        .marquee-track:hover .marquee-anim,
        .marquee-track:hover .marquee-anim-reverse {
          animation-play-state: paused;
        }
        /* Per-item hover glow */
        .stack-item {
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .stack-item:hover {
          transform: translateY(-2px) scale(1.06);
          filter: brightness(1.15) drop-shadow(0 0 5px var(--glow));
        }
      `}</style>
    </section>
  );
}
