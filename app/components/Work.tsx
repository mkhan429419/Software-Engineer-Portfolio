"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PeachButton from "./PeachButton";
import SectionHead from "./SectionHead";
import PlayerScreen from "./PlayerScreen";

const PLAYER_IMAGES = ["/i1.png?v=2", "/i2.png?v=3", "/i3.png?v=2"];

function parseBold(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <span key={i} className="font-medium text-ink">{part}</span>
      : part
  );
}

const jobs = [
  {
    period: "Oct 2024 - Present",
    role: "Software Engineer",
    company: "PAM",
    url: "https://www.pam.ai",
    location: "Sterling, VA - USA · Remote",
    type: "Full-time",
    logo: "/pam.svg",
    logoBg: "bg-white",
    summary: "Building full-stack systems and AI-powered call handling pipelines for 10,000+ users across 1,000+ US auto dealerships.",
    bullets: [
      "Shipped key features across the **admin dashboard**, **call routing**, and **Agent Profiles** systems - serving **10,000+ users** and **1,000+ US auto dealerships**",
      "Built a configurable **multi-step call routing system** now deployed across all 1,000+ dealerships - cutting routing-related support requests by **~30%**, reducing setup time from days to **under an hour**, and directly addressing a top onboarding request by enabling full receptionist-mode configuration",
      "Integrated **LLM inference pipelines** (**GPT 4.1**, **OSS-20B**, **OSS-120B**) via prompt design and API orchestration, improving **service matching accuracy by 24%**",
      "Engineered **self-serve onboarding tooling** that replaced manual DynamoDB edits with a guided dashboard flow - cutting onboarding time by **50%** and removing engineering dependency from ops workflows",
      "Own **customer support end-to-end**: prompt engineering, evals & benchmarks, cross-platform triage (prompts, integrations, dashboard, core platform), and developing custom solutions - helping retain high-value accounts including **Parkway Family Auto Group**",
      "Built **proactive Slack alerting** for critical database changes and client feedback signals, cutting average issue response time by **~15%** and eliminating the need for manual log monitoring across the team",
      "Collaborated across a cross-functional async team - backend: **Node.js / Express / Serverless / AWS (Lambda, DynamoDB, S3, SQS, SNS, SES, CloudWatch) / PostgreSQL / Telnyx / Twilio / Retell AI**; frontend: **React / Next.js / TypeScript / Mantine / Chakra UI / Radix UI / Tailwind**; LLMs: **OpenAI / Anthropic / Groq / Gemini**",
    ],
    stack: ["Node.js", "Express", "AWS Lambda", "DynamoDB", "PostgreSQL", "S3", "SQS", "Telnyx", "Twilio", "Retell AI", "React", "Next.js", "TypeScript", "Mantine", "Prisma", "OpenAI", "Anthropic", "Groq", "Gemini"],
  },
  {
    period: "Jul - Sep 2024",
    role: "Software Engineering Fellow",
    company: "Headstarter AI",
    url: "https://www.headstarter.co",
    location: "New York, NY - USA · Remote",
    type: "Fellowship",
    logo: "/headstarter.png",
    logoBg: "bg-[#0d0d0d]",
    summary: "Built 9 AI projects with 100+ active users as part of a competitive fellowship cohort.",
    bullets: [
      "Built **9 AI projects** achieving **100+ active users** across various platforms",
      "Collaborated with a team of 3 fellows - backend: **Node.js / Firebase / MongoDB / Prisma / PostgreSQL / GraphQL / Pinecone / AWS**; frontend: **React / Next.js / TypeScript / Tailwind / Shadcn UI**",
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
    logo: "/dpl.png",
    logoBg: "bg-white",
    summary: "Built DataHub - a full-stack file management system, from design to deployment.",
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
  const [open, setOpen] = useState<Set<number>>(() => new Set(jobs.map((_, i) => i)));
  const toggle = (i: number) => setOpen(prev => {
    const next = new Set(prev);
    if (next.has(i)) { next.delete(i); } else { next.add(i); }
    return next;
  });

  return (
    <section id="work" className="bg-paper py-20 md:py-28">
      <div className="section-wrap">
        <SectionHead title="Experience" aside="Roles" />

        <div className="lg:flex lg:items-start lg:gap-6">
          <div className="flex justify-center mb-12 md:mb-14 lg:mb-0 lg:block lg:basis-[max(calc(23.3%-1.5rem),16.5rem)] lg:shrink-0 self-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-[min(64%,250px)] md:w-[min(58%,430px)] lg:sticky lg:top-28 lg:w-[85%] lg:max-w-[360px] select-none"
            >
              <img
                src="/chrome/ipod-player.png"
                alt=""
                aria-hidden
                className="block w-full h-auto"
                draggable={false}
              />
              <PlayerScreen images={PLAYER_IMAGES} />
            </motion.div>
          </div>
          <div className="flex flex-col gap-10 md:gap-9 2xl:gap-11 lg:flex-1 lg:min-w-0">
            {jobs.map((job, i) => (
              <div key={i}>
                <div className="grid grid-cols-1 gap-y-1.5 md:gap-y-5 md:grid-cols-[13rem_minmax(0,1fr)_auto] md:gap-x-8 2xl:grid-cols-[15.25rem_minmax(0,1fr)_auto] font-mono text-[16px] md:text-[18px] 2xl:text-[21px] leading-snug text-ink">
                  <p className="md:col-start-1 md:row-start-1">{job.period}</p>
                  <p className="md:col-start-2 md:col-span-2 md:row-start-1">{job.location}</p>
                  <div className="flex items-center gap-3 mt-3 md:mt-0 md:col-start-1 md:col-span-2 md:row-start-2 2xl:gap-4">
                    <div className={`w-10 h-10 2xl:w-11 2xl:h-11 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-ink/15 ${job.logoBg}`}>
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-[20px] font-normal leading-tight tracking-normal text-ink [word-spacing:0.14em] md:text-[22px] lg:text-[18px] 2xl:text-[21px]">
                        {job.role} at{" "}
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-ink/30 underline-offset-4 [word-spacing:normal] [text-decoration-skip-ink:none] hover:decoration-ink"
                        >
                          {job.company}
                        </a>
                      </p>
                      <p className="text-[15px] md:text-[15px] 2xl:text-[17px] text-mute mt-1">{job.type}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:col-start-3 md:row-start-2 md:justify-self-end md:self-center">
                    <PeachButton
                      onClick={() => toggle(i)}
                      className="font-sans text-[17px] md:text-[18px] 2xl:text-[21px] px-6 py-2.5 2xl:px-8 2xl:py-3"
                    >
                      {open.has(i) ? "Close" : "More Info"}
                    </PeachButton>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {open.has(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="font-sans md:pl-[52px] 2xl:pl-[60px]">
                        <p className="text-[16px] lg:text-[17px] 2xl:text-[20px] text-mute mt-6 leading-relaxed">{job.summary}</p>
                        <ul className="flex flex-col gap-3 mt-4">
                          {job.bullets.map((b, j) => (
                            <li key={j} className="flex items-baseline gap-3 text-[16px] lg:text-[17px] 2xl:text-[20px] text-ink leading-relaxed">
                              <span aria-hidden className="shrink-0 font-mono">+</span>
                              <span>{parseBold(b)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {job.stack.map((t) => (
                            <span key={t} className="rounded-md border border-ink/25 px-3 py-2 text-[14px] leading-none text-ink sm:text-[15px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
