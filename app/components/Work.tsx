"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function parseBold(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <span key={i} className="text-olive font-semibold">{part}</span>
      : part
  );
}

const jobs = [
  {
    period: "Oct 2024 — Present",
    role: "Software Engineer",
    company: "PAM",
    url: "https://www.pam.ai",
    location: "Sterling, VA - USA · Remote",
    type: "Full-time",
    color: "#2E78B8",
    logo: "/pam.svg",
    logoBg: "bg-white",
    summary: "Building full-stack systems and AI-powered call handling pipelines for 5K+ users across 500+ US auto dealerships.",
    bullets: [
      "Shipped key features across the **admin dashboard**, **call routing**, and **Agent Profiles** systems — serving **5,000+ users** and **500+ US auto dealerships**",
      "Built a configurable **multi-step call routing system** now deployed across all 500+ dealerships — cutting routing-related support requests by **~30%**, reducing setup time from days to **under an hour**, and directly addressing a top onboarding request by enabling full receptionist-mode configuration",
      "Integrated **LLM inference pipelines** (**GPT 4.1**, **OSS-20B**, **OSS-120B**) via prompt design and API orchestration, improving **service matching accuracy by 24%**",
      "Engineered **self-serve onboarding tooling** that replaced manual DynamoDB edits with a guided dashboard flow — cutting onboarding time by **50%** and removing engineering dependency from ops workflows",
      "Own **customer support end-to-end**: prompt engineering, evals & benchmarks, cross-platform triage (prompts, integrations, dashboard, core platform), and developing custom solutions — helping retain high-value accounts including **Parkway Family Auto Group**",
      "Built **proactive Slack alerting** for critical database changes and client feedback signals, cutting average issue response time by **~15%** and eliminating the need for manual log monitoring across the team",
      "Collaborated across a cross-functional async team — backend: **Node.js / Express / Serverless / AWS (Lambda, DynamoDB, S3, SQS, SNS, SES, CloudWatch) / PostgreSQL / Telnyx / Twilio / Retell AI**; frontend: **React / Next.js / TypeScript / Mantine / Chakra UI / Radix UI / Tailwind**; LLMs: **OpenAI / Anthropic / Groq / Gemini**",
    ],
    stack: ["Node.js", "Express", "AWS Lambda", "DynamoDB", "PostgreSQL", "S3", "SQS", "Telnyx", "Twilio", "Retell AI", "React", "Next.js", "TypeScript", "Mantine", "Prisma", "OpenAI", "Anthropic", "Groq", "Gemini"],
  },
  {
    period: "Jul — Sep 2024",
    role: "Software Engineering Fellow",
    company: "Headstarter AI",
    url: "https://www.headstarter.co",
    location: "New York, NY - USA · Remote",
    type: "Fellowship",
    color: "#C4683A",
    logo: "/headstarter.png",
    logoBg: "bg-[#0d0d0d]",
    summary: "Built 9 AI projects with 100+ active users as part of a competitive fellowship cohort.",
    bullets: [
      "Built **9 AI projects** achieving **100+ active users** across various platforms",
      "Collaborated with a team of 3 fellows — backend: **Node.js / Firebase / MongoDB / Prisma / PostgreSQL / GraphQL / Pinecone / AWS**; frontend: **React / Next.js / TypeScript / Tailwind / Shadcn UI**",
      "Integrated APIs including **Gemini**, **Groq**, **LiveBlocks**, **Scraper**, and **IBM Connect**",
    ],
    stack: ["Node.js", "Firebase", "MongoDB", "Pinecone", "PostgreSQL", "Next.js", "TypeScript", "Groq", "Gemini"],
  },
  {
    period: "Jun 2024",
    role: "MERN Stack Intern",
    company: "DPL",
    url: "https://www.dplit.com",
    location: "Islamabad, Pakistan · Hybrid",
    type: "Internship",
    color: "#4E7A28",
    logo: "/dpl.png",
    logoBg: "bg-white",
    summary: "Built DataHub — a full-stack file management system, from design to deployment.",
    bullets: [
      "Built **DataHub**, a full-stack file management system, under supervisor guidance",
      "Implemented secure file handling via **AWS S3**, following best practices from design to deployment",
      "Stack: **MongoDB / Express / React / Node.js / TypeScript / Tailwind**",
      "Deployed via **Vercel**, **Heroku**, and **MongoDB Atlas**",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "Tailwind", "AWS S3"],
  },
];

export default function Work() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) => setOpen(prev => {
    const next = new Set(prev);
    if (next.has(i)) { next.delete(i); } else { next.add(i); }
    return next;
  });

  return (
    <section id="work" className="bg-cream py-20 md:py-28 relative">
      {/* Top-right blue-purple — bleeds up into About's lower area */}
      <div className="pointer-events-none absolute -top-16 right-0 w-[220px] h-[220px] md:-top-40 md:-right-20 md:w-[560px] md:h-[560px] rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.28 }} />
      {/* Top-left coral — bleeds up into About's lower area */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.22 }} />
      <div className="section-wrap relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="serif-label mb-4">Where I&rsquo;ve worked</p>
          <h2
            className="font-serif font-bold text-olive leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
          >
            Experience.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0 border-t border-olive-5">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-b border-olive-5"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left py-7 flex items-start gap-6 group"
              >
                {/* Company logo */}
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden mt-0.5 border border-olive-5 ${job.logoBg}`}>
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-1" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="font-serif font-semibold text-xl text-olive">
                      {job.role}
                    </span>
                    <span className="text-olive-3 font-sans text-sm">at</span>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="font-serif font-semibold text-xl text-olive underline-offset-2 decoration-olive-4 hover:underline hover:decoration-olive-3 transition-all"
                    >
                      {job.company}
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-[11px] text-olive-3">{job.period}</span>
                    <span className="text-olive-4">·</span>
                    <span className="font-mono text-[10px] text-olive-3 tracking-[0.05em]">{job.type}</span>
                    <span className="text-olive-4">·</span>
                    <span className="font-mono text-[10px] text-olive-3 tracking-[0.05em]">{job.location}</span>
                  </div>
                  <p className="text-[14px] text-olive-2 leading-relaxed max-w-xl">{job.summary}</p>
                </div>

                <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${open.has(i) ? "border-olive-2" : "border-olive-4"}`}>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${open.has(i) ? "text-olive rotate-180" : "text-olive-3"}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open.has(i) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-16">
                      <ul className="flex flex-col gap-2.5 mb-5">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3 text-[14px] text-olive-2 leading-relaxed">
                            <span className="text-olive-3 flex-shrink-0 mt-0.5">–</span>
                            <span>{parseBold(b)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {job.stack.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] tracking-[0.05em] px-2.5 py-1 rounded-full text-olive-2 border border-olive-4"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
