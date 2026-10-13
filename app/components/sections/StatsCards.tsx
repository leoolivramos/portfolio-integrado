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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-2 mb-16 md:mb-24">
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
      className="relative rule-top pt-6 pb-4 group flex flex-col justify-between cursor-default transition-all duration-300"
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {/* Hairline highlight on card hover */}
      <div className="absolute top-0 left-0 h-px w-0 bg-terracotta group-hover:w-full transition-all duration-500 ease-out" />

      {/* Top tag & icon row */}
      <div className="flex items-center justify-between mb-8">
        <span 
          className="font-mono text-[10px] tracking-widest text-warm-brown uppercase font-semibold group-hover:text-terracotta transition-colors duration-200"
        >
          {tag}
        </span>
        <div className="p-1 rounded-lg text-terracotta group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">
          <Icon size={16} />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mb-5">
        {isText ? (
          <div 
            className="text-4xl sm:text-5xl font-normal text-terracotta font-serif tracking-[-0.04em] leading-none group-hover:translate-x-1 transition-transform duration-200"
          >
            {value}
          </div>
        ) : (
          <div 
            className="text-6xl md:text-7xl font-normal text-foreground font-serif tracking-[-0.04em] leading-none group-hover:text-terracotta group-hover:translate-x-1 transition-all duration-200"
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        )}
      </div>

      {/* Label & Status */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
        <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">{label}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
      </div>
    </motion.div>
  );
}