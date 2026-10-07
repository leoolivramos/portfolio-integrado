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
    <section id="skills" className="scroll-mt-24">
      <SectionTitle 
        title="Arsenal Técnico" 
        icon={Cpu} 
        subtitle="Ingredientes & Matérias-Primas Selecionadas" 
      />
      
      {/* 2-Column Workstation Layout (Expande pela largura da tela) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* Backend & Data Workstation */}
        <motion.div
          className="bg-card border border-border rounded-sm p-6 card-elevate relative flex flex-col justify-between"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Top subtle brand accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta/40 via-ember/30 to-transparent" />

          <div>
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-border/70">
              <span className="font-mono text-xs font-bold text-warm-brown uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terracotta" />
                Massa & Estrutura // Backend & Dados
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase bg-parchment px-2 py-0.5 rounded-sm border border-border">
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

          <div className="mt-6 pt-3 border-t border-dashed border-border/60 text-[11px] font-mono text-muted-foreground flex justify-between items-center">
            <span>Foco: Confiabilidade & Throughput</span>
            <span className="text-terracotta">Lote Primário</span>
          </div>
        </motion.div>

        {/* Frontend & AI Workstation */}
        <motion.div
          className="bg-card border border-border rounded-sm p-6 card-elevate relative flex flex-col justify-between"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Top subtle brand accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-olive/40 via-ember/30 to-transparent" />

          <div>
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-border/70">
              <span className="font-mono text-xs font-bold text-warm-brown uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive" />
                Recheio & Precisão // Frontend & IA
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase bg-parchment px-2 py-0.5 rounded-sm border border-border">
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

          <div className="mt-6 pt-3 border-t border-dashed border-border/60 text-[11px] font-mono text-muted-foreground flex justify-between items-center">
            <span>Foco: Ergonomia & Modelos Neurais</span>
            <span className="text-olive">Alta Precisão</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}