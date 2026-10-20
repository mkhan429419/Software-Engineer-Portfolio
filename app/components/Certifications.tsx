"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";

const certs = [
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera",
    period: "Jun 2024 - Sep 2024",
    skills: ["Supervised Learning", "Neural Networks", "Regression", "Classification", "TensorFlow"],
  },
  {
    name: "Complete JavaScript Course",
    issuer: "Udemy",
    period: "Jun 2024 - Sep 2024",
    skills: ["ES6+", "Async JS", "DOM Manipulation", "OOP", "Closures"],
  },
  {
    name: "Complete Web Development Course",
    issuer: "Udemy",
    period: "Jun 2023 - Dec 2023",
    skills: ["HTML / CSS", "JavaScript", "Node.js", "MongoDB", "REST APIs"],
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="bg-paper py-20 md:py-28">
      <div className="section-wrap">
        <SectionHead title="Certifications" aside="Courses" />

        <div className="flex flex-col gap-12 md:gap-16">
          {certs.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="grid grid-cols-1 gap-y-5 lg:grid-cols-[max(calc(23.3%-1.5rem),16.5rem)_minmax(0,1fr)] lg:gap-x-6 lg:gap-y-0"
            >
              {/* Date / platform column, aligned under the section heading's aside */}
              <div className="font-mono text-[16px] leading-snug text-ink md:text-[18px] 2xl:text-[21px]">
                <p>{c.period}</p>
                <p className="mt-1 text-mute md:mt-2">{c.issuer}</p>
              </div>

              <div className="min-w-0 max-w-[1100px] 2xl:max-w-[1400px]">
                <h3 className="break-words text-[20px] font-normal leading-tight tracking-tight text-ink md:text-[22px] lg:text-[24px] 2xl:text-[26px]">
                  {c.name}
                </h3>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-ink/25 px-3 py-2 text-[14px] leading-none text-ink sm:text-[15px]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
