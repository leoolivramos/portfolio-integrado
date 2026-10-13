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
      className="section-title scroll-mt-24"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="relative pt-2 mb-10 lg:mb-0">
        {subtitle && (
          <p className="eyebrow mb-4">
            {subtitle}
          </p>
        )}

        <h2 className="section-heading text-foreground text-balance">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}