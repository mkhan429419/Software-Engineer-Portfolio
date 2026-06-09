"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react";
import { DeviceFrameset } from "react-device-frameset";
import { projects } from "@/app/lib/projects";

export default function Projects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [screenRevealed, setScreenRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [laptopZoom, setLaptopZoom] = useState(0.72);

  // Responsive zoom — keeps the MacBook frame inside the viewport on every screen size
  useEffect(() => {
    const FRAME_WIDTH = 1320; // approximate MacBook Pro frame width at zoom 1
    const update = () => {
      const w = window.innerWidth;
      // Reserve ~8% on each side so the frame never touches the edge
      const ideal = (w * 0.84) / FRAME_WIDTH;
      // Clamp between a legible minimum and the desktop maximum
      setLaptopZoom(Math.max(0.21, Math.min(0.72, ideal)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.95", "center 0.38"],
  });

  const laptopRotateX = useTransform(scrollYProgress, [0, 0.78], [-74, 0]);
  const clipTop = useTransform(scrollYProgress, [0.3, 0.88], [100, 0]);
  const screenClip = useTransform(clipTop, (v) => `inset(${v}% 0% 0% 0%)`);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  useEffect(() => {
    return clipTop.on("change", (v) => {
      if (v <= 2) setScreenRevealed(true);
    });
  }, [clipTop]);

  // Auto-advance carousel
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => { setHovered(false); setPaused(true); setCurrent((c) => (c - 1 + projects.length) % projects.length); };
  const next = () => { setHovered(false); setPaused(true); setCurrent((c) => (c + 1) % projects.length); };

  // DeviceFrameset uses transform:scale so layout stays at full 960×600 frame size.
  // Compensate by pulling in the wrapper with negative margins on mobile only.
  const FRAME_H = 600;
  const laptopMargin =
    laptopZoom < 0.44
      ? Math.round(-(FRAME_H * (1 - laptopZoom) / 2) + 20)
      : 0;

  return (
    <section ref={sectionRef} id="projects" className="bg-cream py-10 md:py-28 relative" style={{ overflowX: "clip" }}>
      {/* Top blobs */}
      <div className="pointer-events-none absolute -top-16 -left-8 w-[220px] h-[220px] md:-top-40 md:-left-20 md:w-[560px] md:h-[560px] rounded-full" style={{ background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.28 }} />
      <div className="hidden md:block pointer-events-none absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.22 }} />
      {/* Bottom blobs — relay into Stack (Stack has no bg so these stay visible) */}
      <div className="pointer-events-none absolute -bottom-16 -left-8 w-[220px] h-[220px] md:-bottom-40 md:-left-20 md:w-[580px] md:h-[580px] rounded-full" style={{ background: "radial-gradient(circle at 45% 60%, #E87848 0%, #F0A868 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.32 }} />
      <div className="hidden md:block pointer-events-none absolute -bottom-32 -right-20 w-[540px] h-[540px] rounded-full" style={{ background: "radial-gradient(circle at 50% 60%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.25 }} />

      <div className="section-wrap relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-14"
        >
          <p className="serif-label mb-4">Things I&rsquo;ve built</p>
          <h2 className="font-serif font-bold text-olive leading-[0.92] tracking-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}>
            Projects.
          </h2>
        </motion.div>

        {/* MacBook carousel */}
        <div className="flex flex-col items-center">
          {/* Click hint */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 serif-label flex items-center gap-2"
          >
            <MousePointer2 size={12} className="flex-shrink-0" />
            Click any project to explore details
          </motion.p>

          <div
            className="flex w-full justify-center overflow-visible"
            style={{ marginTop: laptopMargin, marginBottom: laptopMargin }}
          >
            <div style={{ perspective: "1100px", perspectiveOrigin: "50% 60%" }}>
              <motion.div style={{ opacity: frameOpacity, rotateX: laptopRotateX, transformOrigin: "center bottom" }} className="flex justify-center">
                <DeviceFrameset device="MacBook Pro" zoom={laptopZoom}>
                  <motion.div style={{ clipPath: screenRevealed ? "inset(0% 0% 0% 0%)" : screenClip, width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#080808" }}>
                    {/* All slides always mounted — iframes stay loaded, no flash */}
                    {projects.map((proj, i) => (
                      <div
                        key={proj.slug}
                        style={{
                          position: "absolute", inset: 0,
                          transform: `translateX(${(i - current) * 100}%)`,
                          transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        {/* Gradient fallback */}
                        <div style={{ position: "absolute", inset: 0, background: proj.screenBg }} />
                        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 30%, ${proj.accent}45 0%, transparent 60%)`, opacity: 0.55 }} />

                        {/* YouTube video — always loaded, no controls, muted, looping */}
                        {proj.video && (
                          <iframe
                            src={`${proj.video}?autoplay=1&mute=1&controls=0&loop=1&playlist=${proj.video.split("/embed/")[1]?.split("?")[0]}&rel=0&modestbranding=1&disablekb=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", zIndex: 1, pointerEvents: "none" }}
                          />
                        )}

                        {/* Bottom scrim + labels */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 40%, transparent 65%)", pointerEvents: "none", zIndex: 2 }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 44px", zIndex: 3, pointerEvents: "none" }}>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.22em", marginBottom: "6px", color: proj.accent, textShadow: `0 0 18px ${proj.accent}99` }}>{proj.num}</div>
                          <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "#fff", fontSize: "48px", lineHeight: 1.05, marginBottom: "6px", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>{proj.name}</h3>
                          <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>{proj.tag}</p>
                        </div>

                        {/* Hover overlay — only visible on the active slide */}
                        {i === current && (
                          <div style={{
                            position: "absolute", inset: 0, zIndex: 3,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "rgba(0,0,0,0.28)",
                            opacity: hovered ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            pointerEvents: "none",
                          }}>
                            <div style={{
                              display: "flex", alignItems: "center", gap: "10px",
                              background: "rgba(255,255,255,0.12)",
                              border: "1px solid rgba(255,255,255,0.25)",
                              backdropFilter: "blur(8px)",
                              borderRadius: "999px",
                              padding: "12px 28px",
                              transform: hovered ? "scale(1)" : "scale(0.92)",
                              transition: "transform 0.3s ease",
                            }}>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.14em", color: "white" }}>
                                View project
                              </span>
                              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>→</span>
                            </div>
                          </div>
                        )}

                        {/* Click-catcher — blocks iframe, triggers navigation */}
                        <div
                          onClick={() => router.push(`/projects/${proj.slug}`)}
                          onMouseEnter={() => i === current && setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                          style={{ position: "absolute", inset: 0, zIndex: 4, cursor: "pointer" }}
                        />
                      </div>
                    ))}

                    {/* Arrows */}
                    <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "52px", height: "52px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.6)", border: "none", cursor: "pointer", zIndex: 20 }}>
                      <ChevronLeft size={26} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", width: "52px", height: "52px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.6)", border: "none", cursor: "pointer", zIndex: 20 }}>
                      <ChevronRight size={26} />
                    </button>

                    {/* Dots */}
                    <div style={{ position: "absolute", bottom: "18px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "12px", zIndex: 20 }}>
                      {projects.map((_, i) => (
                        <button key={i} onClick={(e) => { e.stopPropagation(); setPaused(true); setCurrent(i); }}
                          style={{ width: "10px", height: "10px", borderRadius: "50%", border: "none", cursor: "pointer", background: i === current ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.22)", transition: "background 0.3s" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </DeviceFrameset>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
