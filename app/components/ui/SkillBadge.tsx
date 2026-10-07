'use client';

import { motion } from 'framer-motion';

export function SkillBadge({ name }: { name: string }) {
  return (
    <motion.span 
      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-parchment text-foreground text-sm font-medium rounded-sm border border-border 
        hover:border-terracotta/40 hover:bg-card hover:shadow-sm 
        transition-all duration-300 cursor-default group"
      style={{ fontFamily: 'var(--font-body)' }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Small decorative dot */}
      <span className="w-1 h-1 rounded-full bg-terracotta/40 group-hover:bg-terracotta transition-colors duration-300" />
      {name}
    </motion.span>
  );
}