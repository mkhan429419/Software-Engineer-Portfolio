"use client";

import { motion } from "framer-motion";

const certs = [
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera",
    period: "Jun — Sep 2024",
    color: "#0056D2",
    skills: ["Supervised Learning", "Neural Networks", "Regression", "Classification", "TensorFlow"],
  },
  {
    name: "Complete JavaScript Course",
    issuer: "Udemy",
    period: "Jun — Sep 2024",
    color: "#A435F0",
    skills: ["ES6+", "Async JS", "DOM Manipulation", "OOP", "Closures"],
  },
  {
    name: "Complete Web Development Course",
    issuer: "Udemy",
    period: "Jun — Dec 2023",
    color: "#A435F0",
    skills: ["HTML / CSS", "JavaScript", "Node.js", "MongoDB", "REST APIs"],
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="bg-cream py-20 md:py-28 relative">
      <div className="pointer-events-none absolute -top-16 -left-8 w-[220px] h-[220px] md:-top-40 md:-left-20 md:w-[560px] md:h-[560px] rounded-full" style={{ background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.28 }} />
      <div className="hidden md:block pointer-events-none absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.22 }} />

      <div className="section-wrap relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="serif-label mb-4">Courses & credentials</p>
          <h2
            className="font-serif font-bold text-olive leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
          >
            Certifications.
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {certs.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-start gap-6 py-7 md:py-8 border-t border-olive-5"
            >
              {/* Coloured left accent bar */}
              <div
                className="w-1 self-stretch rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: c.color, minHeight: "48px" }}
              />

              <div className="flex-1 min-w-0">
                {/* Issuer + period */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="font-mono text-[10px] tracking-[0.1em] uppercase font-semibold"
                    style={{ color: c.color }}
                  >
                    {c.issuer}
                  </span>
                  <span className="text-olive-4">·</span>
                  <span className="font-mono text-[11px] text-olive-3">{c.period}</span>
                </div>

                {/* Certificate name */}
                <h3
                  className="font-serif font-bold text-olive leading-tight mb-3"
                  style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}
                >
                  {c.name}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] tracking-[0.04em] px-2.5 py-1 rounded-full text-olive-3 border border-olive-4"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-olive-5" />
        </div>
      </div>
    </section>
  );
}
