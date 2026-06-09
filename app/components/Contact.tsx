"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { Mail, FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const contactLinks = [
  { Icon: Mail,       label: "Email",    value: "pakhtar635@gmail.com",           href: "mailto:pakhtar635@gmail.com",                                             download: false },
  { Icon: LinkedInIcon, label: "LinkedIn", value: "/in/maheen-akhtar-khan",      href: "https://www.linkedin.com/in/maheen-akhtar-khan-377082267",                download: false },
  { Icon: GitHubIcon, label: "GitHub",   value: "@mkhan429419",                  href: "https://github.com/mkhan429419",                                          download: false },
  { Icon: FileText,   label: "CV",       value: "Download CV",                   href: "https://docs.google.com/document/d/1Q19JyPTfHUG_QdYq0lUesaKULfKtckfi53ZgXHi47E0/edit?usp=sharing", download: false },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

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
      alert("Something went wrong. Please try emailing me directly at pakhtar635@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-cream border border-olive-5 text-[13.5px] text-olive placeholder-olive-4 px-4 py-3 rounded-xl focus:outline-none focus:border-olive-3 transition-colors duration-150 font-sans";

  return (
    <section id="contact" className="bg-cream py-20 md:py-28 relative">
      {/* Top-right blue-purple — bleeds up into Certifications' lower area */}
      <div className="pointer-events-none absolute -top-16 right-0 w-[220px] h-[220px] md:-top-40 md:-right-20 md:w-[560px] md:h-[560px] rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #90B8E0 0%, #C0A0E0 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.28 }} />
      {/* Top-left coral — bleeds up into Certifications' lower area */}
      <div className="hidden md:block pointer-events-none absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle at 45% 40%, #E87848 0%, #F0A868 50%, transparent 72%)", filter: "blur(100px)", opacity: 0.22 }} />

      <div className="section-wrap relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="serif-label mb-4">Let&rsquo;s connect</p>
          <h2
            className="font-serif font-bold text-olive leading-[0.92] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
          >
            Get in touch.
          </h2>
          <p className="text-olive-2 text-[14.5px] leading-relaxed max-w-lg">
            If you&rsquo;re working on
            something interesting, or just want to chat — I&rsquo;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mono-label mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mono-label mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mono-label mb-2">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-olive text-cream text-[13px] font-medium rounded-xl px-6 py-3.5 hover:bg-olive-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send message →"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-cream p-8 flex flex-col gap-4"
                >
                  <CheckCircle size={24} className="text-[#22C55E]" />
                  <div>
                    <p className="font-serif font-semibold text-olive text-xl mb-1">Message sent!</p>
                    <p className="text-olive-2 text-[13.5px] leading-relaxed">
                      Thanks for reaching out — I typically respond within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                    className="text-[13px] text-olive-2 hover:text-olive transition-colors self-start"
                  >
                    Send another message →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: contact links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-start"
          >
            <p className="mono-label mb-6">Or reach out directly</p>
            <div className="flex flex-col rounded-2xl bg-cream overflow-hidden">
              {contactLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.download ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  {...(link.download ? { download: true } : {})}
                  className={`group flex items-center justify-between px-6 py-5 hover:bg-cream-dark transition-colors duration-150 ${
                    i < contactLinks.length - 1 ? "border-b border-olive-5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <link.Icon size={14} className="text-olive-3 group-hover:text-olive transition-colors" />
                    <span className="text-[13.5px] text-olive-2 group-hover:text-olive transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[12px] text-olive-2 group-hover:text-olive transition-colors">
                      {link.value}
                    </span>
                    <ArrowUpRight size={13} className="text-olive-3 group-hover:text-olive transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
