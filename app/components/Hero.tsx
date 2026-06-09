"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import { Mail, FileText } from "lucide-react";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dubai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);
  return <span className="font-mono text-[12px] font-medium text-olive tabular-nums">{time} GST</span>;
}

const links = [
  { Icon: GitHubIcon, label: "GitHub", href: "https://github.com/mkhan429419" },
  { Icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/maheen-akhtar-khan-377082267" },
  { Icon: Mail, label: "Email", href: "mailto:pakhtar635@gmail.com" },
  { Icon: FileText, label: "Download CV", href: "https://docs.google.com/document/d/1Q19JyPTfHUG_QdYq0lUesaKULfKtckfi53ZgXHi47E0/edit?usp=sharing", download: false },
];

/* Inline avatar — place your photo at /public/avatar.png to replace the placeholder */
function InlineAvatar() {
  return (
    <span
      className="relative hidden md:inline-flex items-center justify-center overflow-hidden border-2 border-cream-dark select-none flex-shrink-0"
      style={{
        width: "clamp(4rem, 10vw, 10rem)",
        height: "clamp(2.8rem, 7vw, 7rem)",
        borderRadius: "40%",
        background: "linear-gradient(160deg, #D8C0A0, #C0A070)",
        position: "relative",
        top: "1.2rem",
      }}
    >
      <img
        src="/avatar.png?v=3"
        alt="Maheen"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        onError={(e) => {
          // Falls back to monogram if photo not found
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </span>
  );
}

/* Clover — 4 large overlapping circles, each a slightly different sage green */
function FlowerShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <circle cx="50" cy="27" r="26" fill="#B4E894" />
      <circle cx="73" cy="50" r="26" fill="#7DC856" />
      <circle cx="50" cy="73" r="26" fill="#96D870" />
      <circle cx="27" cy="50" r="26" fill="#C8F0A0" />
      <circle cx="50" cy="50" r="15" fill="#E6F8D8" />
    </svg>
  );
}

/* Starburst — 8 thin triangular spikes, alternating blue/teal/purple tones */
function StarShape({ className = "" }: { className?: string }) {
  const colors = [
    "#5888C0","#7060B8","#58A8C8","#8850B0",
    "#6888C0","#7070C8","#48A8C0","#9868C8",
  ];
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      {colors.map((fill, i) => (
        <polygon
          key={i}
          points="50,50 48.5,4 51.5,4"
          fill={fill}
          opacity="0.92"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="8" fill="#D8E8F8" />
    </svg>
  );
}

/* 4-pointed gem sparkle — proper diamond arms, each a different pastel jewel tone */
function SparkleShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 70" fill="none" className={className} aria-hidden="true">
      {/* Top — purple */}
      <path d="M35 35 L32 20 L35 3 L38 20 Z" fill="#A870C8" />
      {/* Right — teal */}
      <path d="M35 35 L50 32 L67 35 L50 38 Z" fill="#58B8C8" />
      {/* Bottom — green */}
      <path d="M35 35 L38 50 L35 67 L32 50 Z" fill="#80C870" />
      {/* Left — pink */}
      <path d="M35 35 L20 38 L3 35 L20 32 Z" fill="#C068A8" />
      <circle cx="35" cy="35" r="4" fill="#F0EDE8" />
    </svg>
  );
}

/* Green gradient diamond */
function DiamondShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 70" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="heroGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AADC74" />
          <stop offset="60%" stopColor="#78B848" />
          <stop offset="100%" stopColor="#5A8830" />
        </linearGradient>
      </defs>
      <path d="M35 4 L66 35 L35 66 L4 35 Z" fill="url(#heroGreenGrad)" />
      <path d="M35 20 L51 35 L35 50 L19 35 Z" fill="#CCE890" opacity="0.55" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-cream"
    >
      {/* Vertical column grid lines — matches Marimba structural feel */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {[20, 36, 52, 68, 84].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${pct}%`, background: "rgba(43,61,24,0.07)" }}
          />
        ))}
      </div>

      {/* Blobs — vibrant coral-orange left, blue-purple right, matching Marimba saturation */}
      <div
        className="pointer-events-none absolute -top-12 -left-10 w-[260px] h-[260px] md:-top-24 md:-left-24 md:w-[580px] md:h-[580px] rounded-full"
        style={{
          background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 45%, transparent 72%)",
          filter: "blur(80px)",
          opacity: 0.55,
        }}
      />
      <div
        className="hidden md:block pointer-events-none absolute -top-10 -right-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 45%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)",
          filter: "blur(80px)",
          opacity: 0.48,
        }}
      />
      <div
        className="hidden md:block pointer-events-none absolute bottom-20 left-1/3 w-[280px] h-[280px] rounded-full"
        style={{
          background: "radial-gradient(circle, #B090D8, transparent)",
          filter: "blur(70px)",
          opacity: 0.28,
        }}
      />

      {/* Decorative shapes — mirrors Marimba's colorful scattered shapes */}

      {/* Clover — top-left near orange blob */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="pointer-events-none absolute top-[18%] left-[17%] w-10 h-10 select-none"
      >
        <FlowerShape />
      </motion.div>

      {/* Starburst — left side below clover */}
      <motion.div
        animate={{ y: [0, 11, 0], rotate: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.6 }}
        className="pointer-events-none absolute top-[32%] left-[7%] w-9 h-9 select-none"
      >
        <StarShape />
      </motion.div>

      {/* Gem sparkle — bottom right, small */}
      <motion.div
        animate={{ y: [0, -7, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.0 }}
        className="pointer-events-none absolute bottom-[26%] right-[18%] w-8 h-8 select-none"
      >
        <SparkleShape />
      </motion.div>

      {/* Green diamond — bottom right, larger */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.3 }}
        className="pointer-events-none absolute bottom-[18%] right-[12%] w-12 h-12 select-none"
      >
        <DiamondShape />
      </motion.div>

      {/* Green half-circle peeking at far right — matches Marimba right-edge shape */}
      <div
        className="pointer-events-none absolute select-none"
        style={{ top: "48%", right: "-20px", width: "64px", height: "64px" }}
      >
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#7EC860" />
          <circle cx="32" cy="32" r="20" fill="#A8D870" />
        </svg>
      </div>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-8 md:px-16 lg:px-24 pt-7 pb-2"
      >
        <span className="font-serif font-bold text-olive text-xl tracking-tight">maheen.</span>
        <div className="hidden md:flex items-center gap-8">
          <span className="text-[13px] font-medium text-olive">Software Engineer</span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-olive">
            <MapPin size={12} />
            Abu Dhabi, UAE
          </span>
        </div>
        <LiveClock />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 md:px-16 lg:px-24 py-12 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3, scale: 1.04, borderColor: "rgba(24,40,16,0.7)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-olive/50 rounded-full px-4 py-1.5 mb-10 cursor-default"
          style={{ transition: "box-shadow 0.2s ease" }}
        >
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive-3 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-olive-3" />
          </span>
          <span className="font-sans text-[12px] text-olive">Open to work</span>
        </motion.div>

        {/* Large serif name — photo embedded inline like Marimba reference */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="font-serif font-black text-olive leading-[1] tracking-tight inline-flex flex-wrap items-center justify-center gap-x-4"
            style={{ fontSize: "clamp(3.8rem, 10.5vw, 10rem)" }}
          >
            <span>Maheen</span>
            <InlineAvatar />
            <span>Akhtar</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="font-serif font-black text-olive leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(3.8rem, 10.5vw, 10rem)" }}
          >
            Khan.
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-olive-2 text-base md:text-lg leading-relaxed max-w-lg mb-10"
        >
          Building full-stack systems and AI-powered products used by{" "}
          <span className="text-olive font-semibold">5,000+ users</span> across{" "}
          <span className="text-olive font-semibold">500+ US auto dealerships.</span>
        </motion.p>

        {/* Links row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.download ? undefined : "_blank"}
              rel={l.download ? undefined : "noopener noreferrer"}
              download={l.download}
              className="group flex items-center gap-1.5 text-[13px] font-medium text-olive-2 hover:text-olive transition-colors duration-200 border border-olive/25 rounded-full px-4 py-1.5 hover:border-olive/50 hover:bg-olive/5"
            >
              <l.Icon size={12} />
              {l.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="relative z-10 pb-8 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-olive-3" />
        </motion.div>
      </motion.div>
    </section>
  );
}
