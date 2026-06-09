"use client";

import { motion } from "framer-motion";

const education = [
  {
    period: "Sep 2022 — May 2026",
    degree: "Bachelor of Software Engineering (BESE)",
    school: "National University of Sciences & Technology",
    abbr: "NUST",
    logo: "/nust.png",
    logoBg: "#fff",
    logoBlend: true,          // mix-blend-mode: lighten strips the black bg from the logo
    location: "Islamabad, Pakistan",
    gpa: "3.32 / 4.0",
    current: false,
    note: "Graduated May 2026",
    courses: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Database Systems",
      "Cloud Computing",
      "Web Engineering",
    ],
  },
  {
    period: "May 2012 — May 2022",
    degree: "O / A Levels",
    school: "The International School of Choueifat",
    abbr: "ISCAD",
    logo: "/iscad.png",
    logoBg: "#fff",
    logoBlend: false,
    location: "Abu Dhabi, UAE",
    gpa: null,
    current: false,
    note: null,
    courses: [],
  },
];

export default function Education() {
  return (
    <section id="education" className="bg-cream pt-20 pb-10 md:pt-28 md:pb-14 relative">
      {/* Top-left coral — bleeds up into Stack's lower area */}
      <div className="pointer-events-none absolute -top-16 -left-8 w-[220px] h-[220px] md:-top-40 md:-left-20 md:w-[560px] md:h-[560px] rounded-full" style={{ background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.28 }} />
      {/* Top-right blue-purple — bleeds up into Stack's lower area */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.22 }} />
      <div className="section-wrap relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="serif-label mb-4">Academic background</p>
          <h2
            className="font-serif font-bold text-olive leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
          >
            Education.
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {education.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group py-8 md:py-10 border-t border-olive-5 first:border-t-0"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">

                {/* Logo badge */}
                <div
                  className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden mt-1"
                  style={{ backgroundColor: e.logoBg }}
                >
                  <img
                    src={e.logo}
                    alt={e.abbr}
                    className="w-full h-full object-contain p-1"
                    style={e.logoBlend ? { filter: "invert(1) hue-rotate(180deg) brightness(0.6)" } : undefined}
                  />
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3
                      className="font-serif font-bold text-olive leading-tight"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
                    >
                      {e.degree}
                    </h3>
                    {e.current && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-[#22C55E] flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse-slow" />
                        current
                      </span>
                    )}
                  </div>

                  <p className="text-olive-2 font-medium text-[15px] mb-2">{e.school}</p>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-[11px] text-olive-3">{e.period}</span>
                    <span className="text-olive-4">·</span>
                    <span className="font-mono text-[11px] text-olive-3">{e.location}</span>
                    {e.note && (
                      <>
                        <span className="text-olive-4">·</span>
                        <span className="font-mono text-[11px] text-olive-3">{e.note}</span>
                      </>
                    )}
                  </div>

                  {e.courses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {e.courses.map((c) => (
                        <span
                          key={c}
                          className="font-mono text-[10px] tracking-[0.04em] px-2.5 py-1 rounded-full text-olive-3 border border-olive-4"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* GPA — understated, just metadata */}
                {e.gpa && (
                  <div className="flex-shrink-0 md:text-right">
                    <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-olive-3 mb-1">CGPA</p>
                    <p className="font-serif text-olive-2 font-semibold text-xl">{e.gpa}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
