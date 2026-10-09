'use client';

import { Briefcase } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { motion, Variants } from 'framer-motion';

const timelineVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <SectionTitle title="Jornada Profissional" icon={Briefcase} subtitle="Etapas de Preparo" />
      <div className="mt-8 space-y-0">
        <TimelineItem
          year="Jun 2024 - Atual"
          title="Estagiário em Desenvolvimento"
          place="Controladoria Geral do Estado (CGE-MT)"
          description="Desenvolvimento Full Stack (Spring Boot, Vue.js) e Engenharia de Dados com PySpark"
          index={0}
        />
      </div>
      <div className="mt-8 space-y-0">
        <TimelineItem
          year="Mai 2024 - Atual"
          title="Desenvolvedor e Diretor de Projetos Voluntário"
          place="Infocorp Jr. (Empresa Júnior de TI - UFMT)"
          description="Liderança de projetos de desenvolvimento de software para clientes reais"
          index={1}
        />
      </div>

      <div className="mt-8 space-y-0">
        <TimelineItem
          year="Fev 2026 - Atual"
          title="Analista e Desenvolvedor de Sistemas"
          place="NIESA - Núcleo Interdisciplinar de Estudos em Saneamento Ambiental (UFMT)"
          description="Desenvolvimento de sistemas web, com foco em análise de dados e visualização"
          index={2}
        />
      </div>
    </section>
  );
}

function TimelineItem({ year, title, place, description, index = 0 }: any) {
  return (
    <motion.div 
      className="relative pl-8 pb-10 border-l-2 border-border last:pb-0 last:border-0 group"
      custom={index}
      variants={timelineVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Timeline dot — artisan terracotta ring */}
      <div className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full border-2 border-border bg-parchment group-hover:border-terracotta group-hover:bg-terracotta/20 transition-all duration-300">
        <div className="absolute inset-0 rounded-full bg-terracotta/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1.5">
        <h3 
          className="font-semibold text-foreground text-lg"
          style={{ fontFamily: 'var(--font-editorial)' }}
        >
          {title}
        </h3>
        <span 
          className="production-tag mt-1 sm:mt-0 rounded-md"
          style={{ borderStyle: 'solid', borderColor: 'var(--border)' }}
        >
          {year}
        </span>
      </div>
      <div 
        className="text-sm text-foreground/80 font-medium mb-3"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {place}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed text-balance">{description}</p>
    </motion.div>
  );
}