"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { GitHubIcon } from "@/app/components/Icons";
import { projects } from "@/app/lib/projects";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];

  if (!project) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-mono text-olive-3">Project not found.</p>
      </div>
    );
  }

  const prevProject = projects[(idx - 1 + projects.length) % projects.length];
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <main className="min-h-screen bg-cream relative overflow-x-hidden">
      {/* Blobs — same relay system as all portfolio sections */}
      <div className="pointer-events-none absolute -top-16 -left-8 w-[220px] h-[220px] md:-top-40 md:-left-20 md:w-[560px] md:h-[560px] rounded-full" style={{ background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.28 }} />
      <div className="hidden md:block pointer-events-none absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.22 }} />

      {/* ── Main section ── */}
      <section className="bg-cream py-14 md:py-20 relative">
        <div className="section-wrap relative z-10">

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <button
              onClick={() => router.push("/#projects")}
              className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-olive-3 hover:text-olive transition-colors group"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to portfolio
            </button>
          </motion.div>

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="serif-label mb-4">Things I&rsquo;ve built</p>
            <h1
              className="font-serif font-bold text-olive leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
            >
              {project.name}.
            </h1>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-olive-3 mt-4">
              {project.tag}
            </p>
          </motion.div>

          {/* ── 16:9 video / gradient ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-2xl overflow-hidden mb-14"
            style={{ position: "relative", paddingBottom: "56.25%", background: project.screenBg }}
          >
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 35% 35%, ${project.accent}50 0%, transparent 60%)`, opacity: 0.65 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)" }} />

            {/* Static image (when no video) */}
            {!project.video && project.image && (
              <img
                src={project.image}
                alt={project.name}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            )}

            {/* Fallback title overlay — always shown when no video */}
            {!project.video && (
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 75%)" }} />
            )}
            {!project.video && (
              <div style={{ position: "absolute", bottom: "clamp(20px,4vw,48px)", left: "clamp(20px,4vw,48px)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.25em", color: project.accent, opacity: 0.9, display: "block", marginBottom: "10px" }}>
                  {project.num} / {String(projects.length).padStart(2, "0")}
                </span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "white", fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 0.95, margin: 0 }}>
                  {project.name}
                </h2>
              </div>
            )}

            {/* Local video (.mp4 etc.) — autoplay, muted required by browsers */}
            {project.video && project.video.startsWith("/") && (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            {/* YouTube / Loom embed — ?autoplay=1 triggers autoplay */}
            {project.video && !project.video.startsWith("/") && (
              <iframe
                src={`${project.video}?autoplay=1&mute=1`}
                title={project.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            )}
          </motion.div>

          {/* ── Two-column details ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12 md:gap-16 items-start"
          >
            {/* Left — achievements + problem + description */}
            <div className="flex flex-col gap-6">

              {/* Achievements */}
              {project.achievements?.length > 0 && (
                <div className="flex flex-col gap-2">
                  {project.achievements.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(24,40,16,0.055)", border: "1px solid rgba(24,40,16,0.09)" }}>
                      <span className="text-base">🏆</span>
                      <span className="text-[13px] font-medium text-olive-2">{a}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem solved */}
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-olive-4">Problem solved</p>
                <p className="text-[14px] text-olive-2 leading-[1.75]">{project.problemSolved}</p>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-olive-4">What I built</p>
                <p className="text-[14px] text-olive-2 leading-[1.75]">{project.description}</p>
              </div>
            </div>

            {/* Right — date + stack + links */}
            <div className="flex flex-col gap-7 md:pt-1">

              {/* Date */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-olive-4 mb-1.5">Timeline</p>
                <p className="font-mono text-[12px] text-olive-3">{project.date}</p>
              </div>

              {/* Stack */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-olive-4 mb-3">Tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] text-olive-3 px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(24,40,16,0.07)", border: "1px solid rgba(24,40,16,0.11)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2.5">
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-olive-4 mb-1">Links</p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[12px] text-olive-2 px-5 py-2.5 rounded-full w-fit transition-all duration-200 hover:text-olive hover:bg-olive/[0.06]"
                  style={{ border: "1.5px solid rgba(24,40,16,0.22)" }}
                >
                  <GitHubIcon size={13} /> GitHub
                </a>
                <a
                  href={project.details}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[12px] text-cream px-5 py-2.5 rounded-full w-fit transition-all duration-200 hover:opacity-80 hover:scale-[1.02]"
                  style={{ background: "#182810" }}
                >
                  <ArrowUpRight size={13} /> Details
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Prev / Next ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 pt-8 border-t border-olive-4 flex items-center justify-between"
          >
            <button
              onClick={() => router.push(`/projects/${prevProject.slug}`)}
              className="group flex items-center gap-3 hover:gap-4 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-olive-2 group-hover:text-olive group-hover:bg-cream-dark transition-all duration-200"
                style={{ border: "1.5px solid rgba(24,40,16,0.3)" }}
              >
                <ChevronLeft size={18} />
              </div>
              <div className="text-left hidden sm:block">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-olive-3 mb-0.5">Previous</p>
                <p className="font-serif text-[16px] font-semibold text-olive-2 group-hover:text-olive transition-colors">{prevProject.name}</p>
              </div>
            </button>

            <span className="font-mono text-[12px] text-olive-3 font-medium">
              {project.num} <span className="opacity-40">/</span> {String(projects.length).padStart(2, "0")}
            </span>

            <button
              onClick={() => router.push(`/projects/${nextProject.slug}`)}
              className="group flex items-center gap-3 hover:gap-4 transition-all duration-200"
            >
              <div className="text-right hidden sm:block">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-olive-3 mb-0.5">Next</p>
                <p className="font-serif text-[16px] font-semibold text-olive-2 group-hover:text-olive transition-colors">{nextProject.name}</p>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-olive-2 group-hover:text-olive group-hover:bg-cream-dark transition-all duration-200"
                style={{ border: "1.5px solid rgba(24,40,16,0.3)" }}
              >
                <ChevronRight size={18} />
              </div>
            </button>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
