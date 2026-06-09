"use client";

import { motion } from "framer-motion";


export default function About() {
  return (
    <section id="about" className="bg-cream py-20 md:py-28 relative">
      {/* Top-left coral — matches Hero's left blob */}
      <div className="pointer-events-none absolute -top-16 -left-8 w-[240px] h-[240px] md:-top-40 md:-left-24 md:w-[600px] md:h-[600px] rounded-full" style={{ background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 45%, transparent 72%)", filter: "blur(70px)", opacity: 0.45 }} />
      {/* Top-right blue-purple — matches Hero's right blob */}
      <div className="hidden md:block pointer-events-none absolute -top-20 -right-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 50% 45%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(90px)", opacity: 0.38 }} />

      <div className="section-wrap relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="serif-label mb-4">The story behind</p>
          <h2
            className="font-serif font-bold text-olive leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
          >
            My journey.
          </h2>
        </motion.div>

        {/* Two-column: photo + bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: decorative photo area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative inline-block" style={{ transform: "rotate(-2deg)" }}>
              <div className="w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="/about.png"
                  alt="Maheen Khan"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>

              {/* Decorative blobs behind photo */}
              <div
                className="absolute -top-8 -left-8 w-32 h-32 rounded-full -z-10"
                style={{ background: "radial-gradient(circle, #DFA882, transparent)", filter: "blur(20px)", opacity: 0.6 }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full -z-10"
                style={{ background: "radial-gradient(circle, #8BBAD8, transparent)", filter: "blur(18px)", opacity: 0.5 }}
              />
            </div>

            {/* Floating shapes */}
            <motion.span
              animate={{ y: [0, -8, 0], rotate: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 text-3xl text-olive-3 opacity-50 pointer-events-none"
            >
              ✦
            </motion.span>
            <motion.span
              animate={{ y: [0, 9, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 -left-6 text-xl text-olive-4 opacity-40 pointer-events-none"
            >
              ✶
            </motion.span>
          </motion.div>

          {/* Right: bio text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-5 pt-4"
          >
            <h3 className="font-serif font-bold text-olive text-3xl md:text-4xl leading-tight">
              Hey, I&rsquo;m Maheen.
            </h3>

            <div className="flex flex-col gap-4 text-olive-2 leading-relaxed text-[15px]">
              <p>
                I&rsquo;m a software engineer currently at{" "}
                <span className="text-olive font-semibold">PAM</span> (remote), where I build
                full-stack systems and AI-powered call handling pipelines serving over{" "}
                <span className="text-olive font-semibold">5,000 users</span> across{" "}
                <span className="text-olive font-semibold">500+ US auto dealerships</span>.
              </p>
              <p>
                My work spans the whole stack —{" "}
                <span className="text-olive font-semibold">backend APIs, LLM integrations</span>, and the{" "}
                <span className="text-olive font-semibold">interfaces</span> people use every day. I care about reliability and latency as much
                as I care about the product feeling right. Beyond the code, I stay close to
                what customers actually need: owning{" "}
                <span className="text-olive font-semibold">prompt engineering, evals</span>, and{" "}
                <span className="text-olive font-semibold">cross-platform triage</span> to keep things running smoothly.
              </p>
              <p>
                I hold a Software Engineering degree from{" "}
                <span className="text-olive font-semibold">NUST</span> (graduated May 2026).
                I&rsquo;m also a{" "}
                <span className="text-olive font-semibold">UAE Golden Visa holder</span> —
                based in Abu Dhabi, open to relocation.
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 pt-5 border-t border-olive-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-slow" />
                <span className="text-[13px] text-olive-2 font-medium">
                  Currently @ PAM · Sterling, VA - USA · Remote
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-serif font-bold text-3xl text-olive leading-none">1.9+</p>
                <p className="text-[11px] text-olive-3 leading-snug">yrs<br />exp.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
