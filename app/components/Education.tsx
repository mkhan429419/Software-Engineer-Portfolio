"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";

const education: {
  period: string;
  location: string;
  note: string | null;
  school: string;
  aka: string | null;
  degree: string;
  tags: string[];
  gradeLabel: string;
  grade: string;
  highlights: string[];
  courses: string[];
  abbr: string;
  logo: string;
  logoBg: string;
  logoBlend: boolean;
}[] = [
  {
    period: "Sep 2022 – Jun 2026",
    location: "Islamabad, Pakistan",
    note: null,
    school: "National University of Sciences and Technology (NUST)",
    aka: null,
    degree: "Bachelor of Engineering - BE, Software Engineering",
    tags: [],
    gradeLabel: "CGPA",
    grade: "3.39 / 4.00",
    highlights: [
      "Admitted into the country's #1 engineering school, with a <2% acceptance rate.",
      "Won the Rector's Gold Medal among 40+ teams for best final-year project (CyberShield).",
      "Won 3rd best industry project among 40+ teams for my final-year project (CyberShield).",
      "Received a GPA-based scholarship.",
    ],
    courses: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Database Systems",
      "Cloud Computing",
      "Web Engineering",
    ],
    abbr: "NUST",
    logo: "/nust.png",
    logoBg: "#fff",
    logoBlend: true,
  },
  {
    period: "Jun 2012 – Jun 2022",
    location: "Abu Dhabi, UAE",
    note: null,
    school: "SABIS International School – Abu Dhabi",
    aka: null,
    degree: "American High School Diploma, Mathematics and Computer Science",
    tags: [],
    gradeLabel: "Grade",
    grade: "97 / 100",
    highlights: ["Earned the UAE's 10-year Golden Visa for outstanding academic performance."],
    courses: [],
    abbr: "ISCAD",
    logo: "/iscad.png",
    logoBg: "#fff",
    logoBlend: false,
  },
];

export default function Education() {
  return (
    <section id="education" className="bg-paper py-20 md:py-28">
      <div className="section-wrap">
        <SectionHead title="Education" aside="Background" />

        <div className="flex flex-col gap-12 md:gap-16">
          {education.map((e, i) => (
            <motion.article
              key={e.abbr}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="grid grid-cols-1 gap-y-5 lg:grid-cols-[max(calc(23.3%-1.5rem),16.5rem)_minmax(0,1fr)] lg:gap-x-6 lg:gap-y-0"
            >
              {/* Date / place column, aligned under the section heading's aside */}
              <div className="font-mono text-[16px] leading-snug text-ink md:text-[18px] 2xl:text-[21px]">
                <p>{e.period}</p>
                <p className="mt-1 text-mute md:mt-2">{e.location}</p>
                {e.note && <p className="mt-1 text-[14px] text-mute md:mt-2 2xl:text-[16px]">{e.note}</p>}
              </div>

              <div className="min-w-0 max-w-[1100px] 2xl:max-w-[1400px]">
                <div className="flex items-center gap-4">
                  <div
                    className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl border border-ink/15 md:h-12 md:w-12"
                    style={{ backgroundColor: e.logoBg }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={e.logo}
                      alt={e.abbr}
                      className="h-full w-full object-contain p-1"
                      style={e.logoBlend ? { filter: "invert(1) hue-rotate(180deg) brightness(0.6)" } : undefined}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="break-words text-[20px] font-normal leading-tight tracking-tight text-ink md:text-[22px] lg:text-[24px] 2xl:text-[26px]">
                      {e.school}
                    </h3>
                    {e.aka && <p className="mt-1 text-[15px] text-mute md:text-[16px]">{e.aka}</p>}
                  </div>
                </div>

                <p className="mt-5 font-mono text-[16px] leading-snug text-ink md:text-[18px]">
                  {e.degree}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-ink bg-peach px-3 py-2 text-[14px] leading-none text-ink sm:text-[15px]">
                    <span className="text-ink/70">{e.gradeLabel}</span>
                    {e.grade}
                  </span>
                  {e.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-lg border border-ink/25 px-3 py-2 text-[14px] leading-none text-ink sm:text-[15px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="mt-6 flex flex-col gap-3 text-[16px] leading-[1.5] text-ink lg:text-[17px] 2xl:text-[20px]">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex items-baseline gap-3">
                      <span aria-hidden className="shrink-0 font-mono">
                        +
                      </span>
                      <span className="break-words">{h}</span>
                    </li>
                  ))}
                </ul>

                {e.courses.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {e.courses.map((c) => (
                      <li
                        key={c}
                        className="rounded-md border border-ink/25 px-3 py-2 text-[14px] leading-none text-ink sm:text-[15px]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
