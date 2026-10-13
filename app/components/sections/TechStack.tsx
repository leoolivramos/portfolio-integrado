'use client';

import { Cpu } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { SkillBadge } from '../ui/SkillBadge';
import { motion, Variants } from 'framer-motion';

const containerVariant: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function TechStack() {
  return (
    <section id="skills" className="section-split scroll-mt-24">
      <SectionTitle 
        title="Arsenal Técnico" 
        icon={Cpu} 
        subtitle="Ingredientes & Matérias-Primas Selecionadas" 
      />
      
      {/* Two groups stacked in the content column, separated by hairline rules */}
      <div className="grid grid-cols-1 gap-14 items-stretch">
        
        {/* Backend & Data */}
        <motion.div
          className="rule-top pt-7 relative flex flex-col justify-between"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
              <span className="font-mono text-xs font-semibold text-warm-brown uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terracotta" />
                Massa & Estrutura // Backend & Dados
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase px-3 py-0.5 rounded-full border border-border">
                8 Componentes
              </span>
            </div>

            <motion.div className="flex flex-wrap gap-2.5" variants={containerVariant}>
              <motion.div variants={itemVariant}><SkillBadge name="Java Spring Boot" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="Python FastAPI" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="Node.js (Express)" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="PySpark (ETL)" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="Oracle SQL" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="Trino / Presto" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="PostgreSQL" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="Docker & CI/CD" /></motion.div>
            </motion.div>
          </div>

          <div className="mt-7 text-[11px] font-mono text-muted-foreground flex justify-between items-center">
            <span>Foco: Confiabilidade & Throughput</span>
            <span className="text-terracotta font-medium">Lote Primário</span>
          </div>
        </motion.div>

        {/* Frontend & AI */}
        <motion.div
          className="rule-top pt-7 relative flex flex-col justify-between"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
              <span className="font-mono text-xs font-semibold text-warm-brown uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive" />
                Recheio & Precisão // Frontend & IA
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase px-3 py-0.5 rounded-full border border-border">
                8 Componentes
              </span>
            </div>

            <motion.div className="flex flex-wrap gap-2.5" variants={containerVariant}>
              <motion.div variants={itemVariant}><SkillBadge name="Vue.js" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="Next.js" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="React" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="Tailwind CSS" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="LLM Fine-tuning" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="Hugging Face" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="PyTorch" /></motion.div>
              <motion.div variants={itemVariant}><SkillBadge name="LoRA / PEFT" /></motion.div>
            </motion.div>
          </div>

          <div className="mt-7 text-[11px] font-mono text-muted-foreground flex justify-between items-center">
            <span>Foco: Ergonomia & Modelos Neurais</span>
            <span className="text-olive font-medium">Alta Precisão</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}