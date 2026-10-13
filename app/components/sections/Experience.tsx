'use client';

import { Briefcase } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { motion, Variants } from 'framer-motion';

const timelineVariant: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Experience() {
  return (
    <section id="experience" className="section-split scroll-mt-24">
      <SectionTitle title="Jornada Profissional" icon={Briefcase} subtitle="Etapas de Preparo" />
      <div className="space-y-0">
        <TimelineItem
          year="Jun 2024 - Atual"
          title="Estagiário em Desenvolvimento"
          place="Controladoria Geral do Estado (CGE-MT)"
          description="Desenvolvimento Full Stack (Spring Boot, Vue.js) e Engenharia de Dados com PySpark"
          index={0}
        />
      </div>
      <div className="mt-10 space-y-0">
        <TimelineItem
          year="Mai 2024 - Atual"
          title="Desenvolvedor e Diretor de Projetos Voluntário"
          place="Infocorp Jr. (Empresa Júnior de TI - UFMT)"
          description="Liderança de projetos de desenvolvimento de software para clientes reais"
          index={1}
        />
      </div>

      <div className="mt-10 space-y-0">
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
      className="relative pl-8 pb-10 border-l border-border last:pb-0 group transition-all duration-300"
      custom={index}
      variants={timelineVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Timeline dot with glowing expand effect on hover */}
      <div className="absolute left-[-5.5px] top-2.5 w-2.5 h-2.5 rounded-full border border-border bg-background group-hover:border-terracotta group-hover:bg-terracotta group-hover:scale-140 group-hover:shadow-[0_0_8px_rgba(185,79,53,0.5)] transition-all duration-300" />

      <span className="production-tag mb-3 group-hover:border-terracotta/40 transition-colors duration-200">
        {year}
      </span>
      <h3 
        className="font-normal text-foreground text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-terracotta transition-colors duration-300"
        style={{ fontFamily: 'var(--font-editorial)' }}
      >
        {title}
      </h3>
      <div 
        className="text-sm text-foreground/80 font-medium mt-2 mb-3"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {place}
      </div>
      <p className="text-[15px] text-muted-foreground leading-relaxed text-balance max-w-xl group-hover:text-foreground/90 transition-colors duration-300">{description}</p>
    </motion.div>
  );
}