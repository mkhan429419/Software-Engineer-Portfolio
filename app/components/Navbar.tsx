"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflowY = open ? "hidden" : "";
    return () => { root.style.overflowY = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper">
        <div className="section-wrap h-[72px] sm:h-[80px] md:h-[96px] flex items-center justify-between md:grid md:grid-cols-3">
          <a href="/#home" className="hidden md:block text-[28px] text-ink tracking-tight justify-self-start whitespace-nowrap">
            Maheen Khan
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="text-[32px] md:text-[40px] leading-none text-ink md:justify-self-center w-12 h-12 -ml-3 md:ml-0 flex items-center justify-center"
          >
            {open ? "×" : "+"}
          </button>
          <p className="text-[15px] sm:text-[18px] md:text-[22px] lg:text-[26px] text-ink md:justify-self-end whitespace-nowrap">
            Abu Dhabi, UAE
          </p>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-paper pt-[72px] sm:pt-[80px] md:pt-[96px] overflow-y-auto overscroll-contain"
          >
            <ul className="section-wrap flex flex-col gap-1 py-6 md:py-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 sm:py-3 text-[28px] sm:text-[32px] md:text-[44px] text-ink leading-none hover:text-mute transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
