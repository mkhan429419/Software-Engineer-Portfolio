"use client";

import { FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import CrtFrame from "./CrtFrame";

const socials = [
  { label: "GitHub", href: "https://github.com/mkhan429419", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/maheen-akhtar-khan-377082267", Icon: FaLinkedin },
  { label: "Email", href: "mailto:pakhtar635@gmail.com", Icon: MdEmail },
  { label: "CV", href: "https://docs.google.com/document/d/1Q19JyPTfHUG_QdYq0lUesaKULfKtckfi53ZgXHi47E0/edit?usp=sharing", Icon: FileText },
];

function FeaturedCopy({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <p className={compact ? "text-[28px] sm:text-[30px] text-ink leading-none" : "text-[24px] text-ink leading-none"}>
        Maheen Khan
      </p>
      <p
        className={compact ? "text-[22px] leading-none text-ink mt-5 mb-5" : "text-[18px] leading-none text-ink mt-5 mb-4"}
        aria-hidden
      >
        +
      </p>
      <p className={compact ? "font-mono text-[19px] sm:text-[20px] text-ink leading-snug" : "font-mono text-[16px] text-ink leading-snug"}>
        Currently at PAM
      </p>
      <p className={compact ? "text-[18px] sm:text-[19px] text-ink/85 leading-snug mt-3" : "text-[15px] text-ink/85 leading-snug mt-2"}>
        Software Engineer.
        <br />
        Full-stack systems and AI products for 10,000+ users.
      </p>
      <div className={compact ? "mt-5 flex items-center gap-2.5" : "mt-4 flex items-center gap-2"}>
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex items-center justify-center w-8 h-8 text-ink hover:text-black transition-colors duration-150"
          >
            <Icon size={compact ? 22 : 18} />
          </a>
        ))}
      </div>
    </>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative bg-paper overflow-x-clip overflow-y-visible">
      <div className="pt-[148px] md:pt-[180px] lg:pt-[250px] pb-[calc(5.5rem+3vw)] md:pb-[calc(7.5rem+3vw)]">
        {/* Mobile / tablet: featured copy stacks above the TV, same as Wix */}
        <div className="lg:hidden px-7 sm:px-10 pt-2 pb-[calc(4rem+4vw)] max-w-[480px]">
          <FeaturedCopy compact />
        </div>

        {/*
          Desktop Wix: CRT is ~94% of the viewport, offset ~4.6% from the left,
          and the stand hangs past the fold. Mobile: ~88% width, centered.
        */}
        <div className="max-w-[2400px] mx-auto">
        <div className="relative w-[87.7%] mx-auto mb-4 lg:w-[94%] lg:mx-0 lg:ml-[4.1%] lg:mb-8">
          <CrtFrame scale={1.4}>
            <div className="absolute inset-0">
              <img
                src="/hero.gif?v=0"
                alt=""
                className="hero-kenburns absolute inset-0 w-full h-full object-cover object-[center_20%]"
              />

              <div className="hidden lg:flex absolute top-[5.5%] left-[4%] w-[min(300px,38%)] origin-top-left scale-[0.943]">
                <div className="w-full bg-white/80 rounded-[7px] px-4 py-3.5">
                  <FeaturedCopy />
                </div>
              </div>
            </div>
          </CrtFrame>
        </div>
        </div>
      </div>
    </section>
  );
}
