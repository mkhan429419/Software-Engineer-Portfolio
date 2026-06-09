"use client";

import { motion } from "framer-motion";

const achievements = [
  {
    year: "Jun 2026",
    title: "Shortlisted for Rector's Gold Medal Presentation",
    context: "NUST SEECS · 40+ competing teams",
    highlight: true,
    icon: "🥇",
  },
  {
    year: "May 2026",
    title: "3rd Best Industry Project of Software Engineering",
    context: "NUST SEECS Open House 2026 · 40+ competing teams",
    highlight: true,
    icon: "🏆",
  },
  {
    year: "Jan 2024",
    title: "UAE Golden Visa Holder",
    context: "Government of the United Arab Emirates",
    highlight: true,
    icon: "🌟",
  },
  {
    year: "Jan 2026",
    title: "AI, Cyber Hackathon & Drone Swarm Gala",
    context: "20+ participating teams",
    highlight: false,
    icon: "🤖",
  },
  {
    year: "Feb 2025",
    title: "NUST GPA-Based Scholarship Award",
    context: "1-time recipient · National University of Sciences & Technology",
    highlight: false,
    icon: "🎓",
  },
  {
    year: "Aug 2024",
    title: "Finalist — PAM Track",
    context: "Headstarter Hiring Hackathon 2 · 30+ competing teams",
    highlight: false,
    icon: "🏅",
  },
  {
    year: "Aug 2024",
    title: "Finalist — OloStep Track",
    context: "Headstarter Hiring Hackathon 1 · 50+ competing teams",
    highlight: false,
    icon: "🏅",
  },
  {
    year: "Jul 2024",
    title: "Top 20 Teams — 48-hour Hackathon",
    context: "Headstarter AI · 550+ competing teams",
    highlight: false,
    icon: "⚡",
  },
];

export default function Achievements() {
  const top = achievements.filter((a) => a.highlight);
  const rest = achievements.filter((a) => !a.highlight);

  return (
    <section id="achievements" className="bg-cream py-20 md:py-28 relative">
      <div className="pointer-events-none absolute -top-16 right-0 w-[220px] h-[220px] md:-top-40 md:-right-20 md:w-[560px] md:h-[560px] rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.28 }} />
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.22 }} />

      <div className="section-wrap relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="serif-label mb-4">Recognition & wins</p>
          <h2
            className="font-serif font-bold text-olive leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
          >
            Achievements.
          </h2>
        </motion.div>

        {/* Featured — large editorial rows */}
        <div className="flex flex-col">
          {top.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t border-olive-5 py-9 md:py-10 flex items-start gap-8 md:gap-14"
            >
              {/* Decorative index */}
              <span
                className="font-serif font-bold text-olive leading-none flex-shrink-0 select-none hidden sm:block"
                style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-olive-3 mb-3">{a.year}</p>
                <h3
                  className="font-serif font-bold text-olive leading-tight mb-3"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)" }}
                >
                  {a.title}
                </h3>
                <p className="font-mono text-[11px] text-olive-3 tracking-wide">{a.context}</p>
              </div>

              <span className="text-2xl flex-shrink-0 mt-1 hidden md:block">{a.icon}</span>
            </motion.div>
          ))}
        </div>

        {/* Rest — spacious rows */}
        <div className="flex flex-col">
          {rest.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-5 py-6 border-t border-olive-5"
            >
              <span className="text-xl flex-shrink-0 mt-0.5 leading-none">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] text-olive font-medium leading-snug mb-1">{a.title}</p>
                <p className="font-mono text-[11px] text-olive-3">{a.context}</p>
              </div>
              <span className="font-mono text-[11px] text-olive-3 flex-shrink-0 pt-0.5 whitespace-nowrap">{a.year}</span>
            </motion.div>
          ))}
          <div className="border-t border-olive-5" />
        </div>
      </div>
    </section>
  );
}
