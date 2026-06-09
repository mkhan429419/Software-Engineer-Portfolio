"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-cream border-t border-olive-5 py-8"
    >
      <div className="section-wrap flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-serif font-semibold text-olive">maheen.</span>

        <p className="font-mono text-[10px] text-olive-3">
          © {new Date().getFullYear()} Maheen Akhtar Khan
        </p>
      </div>
    </motion.footer>
  );
}
