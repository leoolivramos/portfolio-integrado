'use client';

import { motion } from 'framer-motion';

interface OvenDividerProps {
  label?: string;
}

export function OvenDivider({ label }: OvenDividerProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-12 my-6">
      {/* Background ambient warm hearth glow */}
      <div 
        className="absolute w-48 h-20 rounded-full animate-hearth pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(232, 147, 74, 0.22) 0%, transparent 75%)',
        }}
      />

      <div className="w-full flex items-center justify-center">
        {/* Left artisanal ruled line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border" />
        
        {/* Center oven arch architectural emblem */}
        <motion.div 
          className="relative mx-6 flex flex-col items-center justify-center group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Architectural Oven SVG */}
          <svg width="56" height="38" viewBox="0 0 56 38" fill="none" className="text-border transition-colors group-hover:text-terracotta/70 duration-500">
            {/* Base hearth hearthstone */}
            <path d="M6 36 H50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Outer brick dome arch */}
            <path 
              d="M10 36 C10 18, 18 6, 28 6 C38 6, 46 18, 46 36" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              fill="none"
            />

            {/* Keystone (fecho da abóbada do forno) */}
            <path d="M26 4 L30 4 L29 8 L27 8 Z" fill="var(--terracotta)" opacity="0.8" />

            {/* Inner mouth chamber */}
            <path 
              d="M17 36 C17 24, 21 16, 28 16 C35 16, 39 24, 39 36" 
              stroke="var(--ember)" 
              strokeWidth="1.2" 
              fill="rgba(232, 147, 74, 0.04)"
              opacity="0.7"
            />

            {/* Radiant wood-fire ember bed */}
            <circle cx="28" cy="30" r="3" fill="var(--ember)" className="animate-pulse" />
            <circle cx="23" cy="32" r="1.5" fill="var(--terracotta)" opacity="0.6" />
            <circle cx="33" cy="32" r="1.5" fill="var(--terracotta)" opacity="0.6" />
            
            {/* Delicate rising heat lines */}
            <path d="M25 24 Q24 20, 26 17" stroke="var(--ember)" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
            <path d="M31 24 Q32 20, 30 17" stroke="var(--ember)" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
          </svg>

          {/* Micro label under arch */}
          {label && (
            <motion.span 
              className="mt-2 text-[9px] font-mono uppercase tracking-[0.25em] text-warm-brown font-semibold opacity-75"
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 0.75, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
        
        {/* Right artisanal ruled line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    </div>
  );
}
