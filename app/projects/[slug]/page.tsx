"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/app/lib/projects";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SectionHead from "@/app/components/SectionHead";
import PeachButton from "@/app/components/PeachButton";
import DemoPlayer from "@/app/components/DemoPlayer";

const bodyText = "text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] leading-[1.5] text-ink break-words";
const labelText =
  "font-mono text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-tight text-ink font-normal mb-2 md:mb-3";
// Two columns on desktop (wider media / copy), single column below.
// Compact on phones; the default peach-btn size from sm up. (`!` is needed because .peach-btn sets its own padding/size.)
const btnSize = "!px-4 !py-1.5 !text-[14px] sm:!px-5 sm:!py-2.5 sm:!text-[15px]";
const mediaCol = "grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-x-[4.5vw] lg:gap-y-0";
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];

  if (!project) {
    return (
      <main className="min-h-screen bg-paper">
        <Navbar />
        <div className="section-wrap pt-[140px] md:pt-[180px]">
          <p className="font-mono text-ink text-[16px] mb-6">Project not found.</p>
          <PeachButton href="/#projects">Back to projects</PeachButton>
        </div>
      </main>
    );
  }

  const total = String(projects.length).padStart(2, "0");
  const prevProject = projects[(idx - 1 + projects.length) % projects.length];
  const nextProject = projects[(idx + 1) % projects.length];
  const achievements = project.achievements ?? [];

  return (
    <main className="min-h-screen bg-paper relative overflow-x-clip">
      <Navbar />

      {/* Overview: demo left, copy right (stacked below lg) */}
      <section className="pt-[104px] sm:pt-[116px] md:pt-[148px] pb-20 md:pb-28">
        <div className="section-wrap">
          {/* Back link + project pager (same peach style, matching heights) */}
          <div className="mb-10 md:mb-14 flex items-stretch justify-between gap-3">
            <PeachButton
              href="/#projects"
              className={btnSize}
            >
              <span className="sm:hidden">← All</span>
              <span className="hidden sm:inline">← All projects</span>
            </PeachButton>

            <nav
              aria-label="Project navigation"
              className="flex items-stretch overflow-hidden rounded-lg border border-ink bg-peach text-ink"
            >
              <Link
                href={`/projects/${prevProject.slug}`}
                aria-label={`Previous project: ${prevProject.name}`}
                title={prevProject.name}
                className="inline-flex w-9 items-center justify-center transition-colors duration-150 hover:bg-peach-dark sm:w-11"
              >
                <ChevronLeft className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              </Link>
              <p className="flex min-w-[3.5rem] items-center justify-center px-0.5 text-center font-mono text-[12px] tabular-nums sm:min-w-[4.25rem] sm:px-1 sm:text-[13px]">
                {project.num} / {total}
              </p>
              <Link
                href={`/projects/${nextProject.slug}`}
                aria-label={`Next project: ${nextProject.name}`}
                title={nextProject.name}
                className="inline-flex w-9 items-center justify-center transition-colors duration-150 hover:bg-peach-dark sm:w-11"
              >
                <ChevronRight className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              </Link>
            </nav>
          </div>

          <SectionHead title="Overview" aside={project.name} className="!mb-8 md:!mb-12 lg:!mb-14" />

          <div className={mediaCol}>
            {/* The demo is the only media. Projects without a demo video show their screenshot. */}
            <DemoPlayer project={project} />

            <div className="flex flex-col gap-7 md:gap-8 max-w-[640px]">
              <div>
                <h3 className={labelText}>Problem solved</h3>
                <p className={bodyText}>{project.problemSolved}</p>
              </div>
              <div>
                <h3 className={labelText}>What I built</h3>
                <p className={bodyText}>{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details: meta + buttons left, stack + achievements right */}
      <section className="pb-20 md:pb-28">
        <div className="section-wrap">
          <SectionHead title="Details" aside="At a glance" className="!mb-8 md:!mb-12 lg:!mb-14" />

          <div className={mediaCol}>
            <div className="flex flex-col gap-6 md:gap-7">
              <div className="font-mono text-[15px] sm:text-[16px] md:text-[17px] lg:text-[19px] leading-[1.55] text-ink break-words flex flex-col gap-1">
                <p>Type: {project.tag}</p>
                <p>Timeline: {project.date}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {project.github && (
                  <PeachButton href={project.github} external className={`gap-2 ${btnSize}`}>
                    <FaGithub size={16} /> GitHub
                  </PeachButton>
                )}
                {project.details && (
                  <PeachButton href={project.details} external className={`gap-2 ${btnSize}`}>
                    Details <ArrowUpRight size={16} />
                  </PeachButton>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-8 md:gap-10 max-w-[640px]">
              <div>
                <h3 className={labelText}>Tech stack</h3>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="text-[14px] sm:text-[15px] lg:text-[16px] leading-none text-ink px-3 py-2 rounded-md border border-ink/25"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {achievements.length > 0 && (
                <div>
                  <h3 className={labelText}>Achievements</h3>
                  <ul className={`${bodyText} flex flex-col gap-3`}>
                    {achievements.map((a) => (
                      <li key={a} className="flex items-baseline gap-3">
                        <span aria-hidden className="shrink-0">
                          +
                        </span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
