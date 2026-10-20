"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import PeachButton from "./PeachButton";
import SectionHead from "./SectionHead";

const contactLinks = [
  { label: "Email", value: "pakhtar635@gmail.com", href: "mailto:pakhtar635@gmail.com", download: false },
  {
    label: "LinkedIn",
    value: "/in/maheen-akhtar-khan",
    href: "https://www.linkedin.com/in/maheen-akhtar-khan-377082267",
    download: false,
  },
  { label: "GitHub", value: "@mkhan429419", href: "https://github.com/mkhan429419", download: false },
  {
    label: "CV",
    value: "Download CV",
    href: "https://docs.google.com/document/d/1Q19JyPTfHUG_QdYq0lUesaKULfKtckfi53ZgXHi47E0/edit?usp=sharing",
    download: false,
  },
];

/* Frosted white card (like the Wix footer) so text stays readable over the CD. */
const cardClass = "rounded-[25px] border border-white bg-white/80 p-5 sm:p-6 lg:p-7";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "200px 0px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      alert("Something went wrong. Please email me directly at pakhtar635@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full border-0 border-b border-ink/30 bg-transparent px-0 py-2.5 text-[15px] text-ink placeholder:text-mute/80 focus:border-ink focus:outline-none focus:ring-0 transition-colors duration-150 font-sans sm:text-[16px] md:py-3";

  const cdImg = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/footer-cd.png"
      alt=""
      draggable={false}
      className="footer-cd-spin h-full w-full select-none object-contain"
      style={{ animationPlayState: inView ? "running" : "paused" }}
    />
  );

  return (
    <section ref={sectionRef} id="contact" className="relative isolate overflow-hidden bg-paper py-20 md:py-28">
      <div className="section-wrap">
        <SectionHead
          title="Contact"
          asideClassName="hidden lg:block"
          aside={
            <>
              Get in touch
              {/* lg+: sits on the same baseline, starting at the links column */}
              <span className="absolute hidden whitespace-nowrap lg:inline lg:left-[calc(56%+0.88rem)] xl:left-[calc(56%+1.32rem)]">
                Or reach out directly
              </span>
            </>
          }
        />

        <div className="relative grid grid-cols-1 gap-10 [--g:2rem] md:gap-12 xl:[--g:3rem] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-start lg:gap-x-8 xl:gap-x-12">
          {/* Left column wrapper: also anchors the stacked (below lg) CD to the bottom of card 1 */}
          <div className="relative min-w-0 lg:max-w-[720px]">
            {/* Stacked layout: CD centred on the gap between the two cards */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[calc(100%+1.25rem)] -z-10 aspect-square w-[min(110vw,32rem)] -translate-x-1/2 -translate-y-1/2 md:top-[calc(100%+1.5rem)] md:w-[min(88vw,40rem)] lg:hidden"
            >
              {cdImg}
            </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`min-w-0 ${cardClass}`}
          >
            {/* Below lg the heading lives inside its card (same as "Or reach out directly") */}
            <p className="mb-4 font-mono text-[19px] font-normal text-ink sm:text-[21px] md:mb-5 md:text-[26px] lg:hidden">
              Get in touch
            </p>
            <p className="mb-6 max-w-[540px] text-[16px] leading-relaxed text-ink md:mb-8 lg:text-[17px] 2xl:text-[20px]">
              If you&rsquo;re hiring, collaborating, or working on something interesting - I&rsquo;d love to hear from you.
            </p>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 md:gap-6"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-6 md:gap-6">
                    <div>
                      <label htmlFor="contact-name" className="mono-label mb-1.5 block">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={fieldClass}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mono-label mb-1.5 block">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={fieldClass}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mono-label mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={`${fieldClass} min-h-[120px] resize-y sm:min-h-[132px] md:min-h-[144px]`}
                      required
                    />
                  </div>
                  <PeachButton type="submit" disabled={loading} className="mt-1 w-full sm:w-auto sm:min-w-[160px]">
                    {loading ? "Sending..." : "Send message"}
                  </PeachButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 rounded-lg border border-ink bg-peach/20 p-6 md:p-7"
                >
                  <CheckCircle size={22} className="text-ink" aria-hidden />
                  <div>
                    <p className="mb-1 text-[18px] text-ink md:text-[20px]">Message sent</p>
                    <p className="text-[15px] leading-relaxed text-mute">
                      Thanks for reaching out - I typically respond within 24 hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="self-start text-[15px] text-ink underline underline-offset-4 transition-colors duration-150 hover:text-mute"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>

          {/* Side-by-side layout (lg+): CD centred on the vertical gap between the two cards.
              Card 1 is capped at 720px, so the gap centre is worked out from the real column widths. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute left-[calc((min(720px,0.56*(100%-var(--g)))+0.56*(100%-var(--g))+var(--g))/2)] top-1/2 -z-10 aspect-square w-[min(46vw,46rem)] -translate-x-1/2 -translate-y-1/2">
              {cdImg}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }}
            className={`min-w-0 ${cardClass}`}
          >
            <p className="mb-4 font-mono text-[19px] font-normal text-ink sm:text-[21px] md:mb-5 md:text-[26px] lg:hidden">
              Or reach out directly
            </p>
            <ul className="flex flex-col gap-1">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.download ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    {...(link.download ? { download: true } : {})}
                    className="group flex items-baseline justify-between gap-4 border-b border-ink/15 py-3.5 transition-colors duration-150 last:border-b-0 hover:text-mute md:py-4"
                  >
                    <span className="shrink-0 font-sans text-[15px] font-normal leading-snug text-ink sm:text-[16px]">
                      {link.label}
                    </span>
                    <span className="flex min-w-0 items-baseline gap-2">
                      <span className="break-all font-mono text-[15px] leading-snug text-mute transition-colors duration-150 group-hover:text-ink sm:text-[16px]">
                        {link.value}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="shrink-0 translate-y-px text-mute transition-colors duration-150 group-hover:text-ink"
                        aria-hidden
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
