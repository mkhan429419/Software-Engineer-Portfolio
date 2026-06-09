"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home",           href: "#home" },
  { label: "About",          href: "#about" },
  { label: "Work",           href: "#work" },
  { label: "Projects",       href: "#projects" },
  { label: "Education",      href: "#education" },
  { label: "Achievements",   href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = navLinks.find((l) => l.href === `#${id}`);
            if (match) setActive(match.label);
          }
        });
      },
      { threshold: 0.3 }
    );

    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-2"
    >
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="group flex items-center gap-2"
        >
          <span
            className={`text-[11px] font-sans transition-all duration-200 ${
              active === link.label
                ? "text-olive"
                : "text-olive-3 group-hover:text-olive-2"
            }`}
          >
            {link.label}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              active === link.label
                ? "bg-olive"
                : "bg-transparent group-hover:bg-olive-4"
            }`}
          />
        </a>
      ))}
    </motion.nav>
  );
}
