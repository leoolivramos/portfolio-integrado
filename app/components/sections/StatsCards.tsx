'use client';

import { Stats } from '../../types';
import { motion, Variants } from 'framer-motion';
import { Layers, Flame, Code } from 'lucide-react';

interface StatsCardsProps {
  stats: Stats;
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay: i * 0.1, 
      ease: 'easeOut',
    },
  }),
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      <StatCard 
        value={stats?.totalProjects ?? 0}
        label="Criações Catalogadas"
        tag="PRODUÇÃO.ACERVO"
        icon={Layers}
        index={0}
      />

      <StatCard 
        value={stats?.commitsLast90Days ?? 0}
        label="Cadência de Forno (90d)"
        tag="TELEMETRIA.COMMITS"
        icon={Flame}
        index={1}
      />

      <StatCard 
        value={stats?.mainLanguage ?? 'TypeScript'}
        label="Ingrediente Principal"
        tag="ESPECIALIZAÇÃO.STACK"
        icon={Code}
        isText
        index={2}
      />
    </div>
  );
}

function StatCard({
  value,
  label,
  tag,
  icon: Icon,
  isText = false,
  index = 0,
}: {
  value: number | string;
  label: string;
  tag: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  isText?: boolean;
  index?: number;
}) {
  return (
    <motion.div 
      className="relative bg-card border border-border rounded-2xl p-6 card-elevate group overflow-hidden flex flex-col justify-between"
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Top accent line with warm gradient */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta/40 via-ember/30 to-transparent" />
      
      {/* Top tag & icon row */}
      <div className="flex items-center justify-between mb-4">
        <span 
          className="font-mono text-[10px] tracking-widest text-warm-brown uppercase font-semibold"
        >
          {tag}
        </span>
        <div className="w-8 h-8 rounded-xl bg-parchment border border-border flex items-center justify-center text-terracotta group-hover:scale-105 transition-transform">
          <Icon size={15} className="text-terracotta" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="my-2">
        {isText ? (
          <div 
            className="text-2xl sm:text-3xl font-bold text-terracotta font-serif"
          >
            {value}
          </div>
        ) : (
          <div 
            className="text-4xl md:text-5xl font-bold text-foreground font-serif tracking-tight"
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        )}
      </div>

      {/* Label & Status */}
      <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-sans">
        <span className="font-medium text-foreground/80">{label}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
      </div>

      {/* Bottom corner draft crossmark */}
      <div className="absolute bottom-2 right-2 opacity-20 pointer-events-none font-mono text-[9px] text-terracotta">
        +
      </div>
    </motion.div>
  );
}