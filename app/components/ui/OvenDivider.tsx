'use client';

import { motion } from 'framer-motion';

interface OvenDividerProps {
  label?: string;
}

export function OvenDivider({ label }: OvenDividerProps) {
  return (
    <div className="relative flex items-center gap-6 py-16 md:py-24">
      {/* Technical label sits on the left, hairline rule fills the rest */}
      {label && (
        <motion.span 
          className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-warm-gray font-medium"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {label}
        </motion.span>
      )}
      <motion.div 
        className="flex-1 h-px bg-border origin-left"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span 
        className="shrink-0 w-1.5 h-1.5 rounded-full bg-terracotta/80 shadow-[0_0_8px_rgba(185,79,53,0.35)]"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.35, type: "spring", stiffness: 400, damping: 20 }}
      />
    </div>
  );
}
