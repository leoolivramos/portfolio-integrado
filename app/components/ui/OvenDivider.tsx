'use client';

import { motion } from 'framer-motion';

interface OvenDividerProps {
  label?: string;
}

export function OvenDivider({ label }: OvenDividerProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-10 my-4">
      <div className="w-full flex items-center justify-center">
        {/* Left ruled line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border" />
        
        {/* Center decorative element — abstracted arch mark */}
        <motion.div 
          className="relative mx-6 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Simplified arch — abstracted from oven, now just a refined decorative motif */}
          <svg width="36" height="24" viewBox="0 0 36 24" fill="none" className="text-border">
            {/* Arch form */}
            <path 
              d="M4 23 C4 11, 10 3, 18 3 C26 3, 32 11, 32 23" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              fill="none"
            />
            {/* Base line */}
            <path d="M2 23 H34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            {/* Small keystone dot */}
            <circle cx="18" cy="18" r="2" fill="var(--terracotta)" opacity="0.4" />
          </svg>

          {/* Label */}
          {label && (
            <motion.span 
              className="mt-2 text-[9px] font-mono uppercase tracking-[0.22em] text-warm-gray font-semibold opacity-60"
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
        
        {/* Right ruled line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    </div>
  );
}
