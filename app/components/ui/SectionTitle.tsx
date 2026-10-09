'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  icon: LucideIcon;
  id?: string;
  subtitle?: string;
}

export function SectionTitle({ title, icon: Icon, id, subtitle }: SectionTitleProps) {
  return (
    <motion.div 
      id={id} 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="relative mt-12 mb-8">

        <h2 
          className="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
          style={{ fontFamily: 'var(--font-editorial)' }}
        >
          {title}
        </h2>

        {subtitle && (
          <p 
            className="mt-1.5 text-muted-foreground"
            style={{ fontFamily: 'var(--font-technical)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {subtitle}
          </p>
        )}

        {/* Bottom accent line */}
        <div className="mt-4 h-0.5 w-16 bg-terracotta/35 rounded-full" />
      </div>
    </motion.div>
  );
}