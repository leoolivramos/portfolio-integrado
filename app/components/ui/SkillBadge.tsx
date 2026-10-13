'use client';

import { motion } from 'framer-motion';

export function SkillBadge({ name }: { name: string }) {
  return (
    <motion.span 
      className="inline-flex items-center gap-2 px-4 py-2 text-foreground text-sm font-medium rounded-full border border-border 
        hover:border-terracotta/60 hover:text-terracotta hover:bg-parchment/40
        transition-colors duration-200 cursor-default group select-none shadow-2xs"
      style={{ fontFamily: 'var(--font-body)' }}
      whileHover={{ y: -2.5, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
    >
      {/* Small decorative dot with scale and color shift */}
      <span className="w-1.5 h-1.5 rounded-full bg-terracotta/40 group-hover:scale-140 group-hover:bg-terracotta transition-all duration-300" />
      <span>{name}</span>
    </motion.span>
  );
}