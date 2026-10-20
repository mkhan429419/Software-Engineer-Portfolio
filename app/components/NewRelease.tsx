"use client";

import { useEffect, useState } from "react";
import { Pause, Play, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SectionHead from "./SectionHead";
import PeachButton from "./PeachButton";

const socials = [
  { label: "GitHub", href: "https://github.com/mkhan429419", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/maheen-akhtar-khan-377082267", Icon: FaLinkedin },
  { label: "Email", href: "mailto:pakhtar635@gmail.com", Icon: MdEmail },
  { label: "CV", href: "https://docs.google.com/document/d/1Q19JyPTfHUG_QdYq0lUesaKULfKtckfi53ZgXHi47E0/edit?usp=sharing", Icon: FileText },
];

export default function NewRelease() {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0.42);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 0.96 ? 0.08 : p + 0.004));
    }, 80);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="section-wrap">
        <SectionHead title="Featured" aside="Currently at PAM" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-ink/5">
            <img src="/about.png" alt="Maheen Khan" className="w-full h-full object-cover object-top" />
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-[22px] md:text-[32px] text-ink leading-snug">
              Building full-stack systems and AI-powered products used by 10,000+ users across 1,000+ US auto dealerships.
            </p>

            <div className="border border-ink/15 rounded-xl px-5 py-4">
              <p className="font-mono text-[12px] text-mute mb-2">Current role</p>
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <p className="text-[18px] text-ink">Software Engineer</p>
                  <p className="font-mono text-[12px] text-mute">PAM · Sterling, VA</p>
                </div>
                <button
                  type="button"
                  aria-label={playing ? "Pause" : "Play"}
                  onClick={() => setPlaying((v) => !v)}
                  className="w-10 h-10 rounded-full border border-ink flex items-center justify-center bg-peach"
                >
                  {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>
              </div>
              <div className="h-[3px] bg-ink/10 rounded-full overflow-hidden">
                <div className="h-full bg-ink" style={{ width: `${progress * 100}%` }} />
              </div>
              <p className="font-mono text-[12px] text-mute mt-2">2+ yrs</p>
            </div>

            <div className="flex items-center gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-ink hover:text-mute"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>

            <PeachButton href="/#work">More Info</PeachButton>
          </div>
        </div>
      </div>
    </section>
  );
}
