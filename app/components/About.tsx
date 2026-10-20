"use client";

import SectionHead from "./SectionHead";
import ScrollLaptop from "./ScrollLaptop";

export default function About() {
  return (
    <section id="about" className="bg-paper py-20 md:py-28">
      <div className="section-wrap">
        <SectionHead title="About" aside="Bio" />

        <div className="grid grid-cols-1 lg:grid-cols-[50.5%_minmax(0,1fr)] gap-10 lg:gap-x-[4.6vw] items-start">
          <div className="rounded-2xl overflow-hidden aspect-[5/7] w-full max-w-[720px] mx-auto lg:max-w-none">
            <img
              src="/about.png"
              alt="Maheen Khan"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col gap-6 min-w-0 w-full max-w-[720px] mx-auto lg:mx-0 lg:max-w-[680px] 2xl:max-w-[780px] lg:self-stretch">
            <h3 className="font-mono text-[26px] md:text-[30px] 2xl:text-[38px] text-ink leading-tight">Hey, I&rsquo;m Maheen.</h3>

            <div className="flex flex-col gap-4 text-[16px] lg:text-[17px] 2xl:text-[20px] text-ink leading-relaxed">
              <p>
                I&rsquo;m a software engineer with{" "}
                <span className="font-medium">2 years of professional experience</span>, currently at{" "}
                <span className="font-medium">PAM</span> (remote), where I build
                full-stack systems and AI-powered call handling pipelines serving over{" "}
                <span className="font-medium">10,000+ users</span> across{" "}
                <span className="font-medium">1,000+ US auto dealerships</span>.
              </p>
              <p>
                My work spans the whole stack -{" "}
                <span className="font-medium">backend APIs, LLM integrations</span>, and the{" "}
                <span className="font-medium">interfaces</span> people use every day. I care about reliability and latency as much
                as I care about the product feeling right. Beyond the code, I stay close to
                what customers actually need: owning{" "}
                <span className="font-medium">prompt engineering, evals</span>, and{" "}
                <span className="font-medium">cross-platform triage</span> to keep things running smoothly.
              </p>
              <p>
                I hold a Software Engineering degree from{" "}
                <span className="font-medium">NUST</span> (graduated June 2026).
                I&rsquo;m also a{" "}
                <span className="font-medium">UAE Golden Visa holder</span> (outstanding student category) -
                currently based in Abu Dhabi.
              </p>
            </div>

            <div className="mt-8 md:mt-12 w-full lg:mt-0 lg:max-w-[38.3vw] lg:flex-1 lg:min-h-[250px] lg:mb-[2.8vw] lg:relative">
              <div className="lg:absolute lg:inset-0 lg:[container-type:size]">
                <ScrollLaptop className="w-[94%] mx-auto lg:mx-0 lg:absolute lg:left-0 lg:bottom-0 lg:w-[min(100cqw,calc(100cqh*1.2931))]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
