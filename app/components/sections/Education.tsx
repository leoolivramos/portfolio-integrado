'use client';

import { BookOpen } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { motion, Variants } from 'framer-motion';

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Education() {
  return (
    <section id="education" className="section-split">
      <SectionTitle title="Formação Acadêmica" icon={BookOpen} subtitle="Base de conhecimento" />
      
      <div className="grid gap-0">
        <motion.div 
          className="group relative rule-top py-8 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-xl transition-all duration-300 hover:bg-parchment/20"
          custom={0}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ x: 3 }}
        >
          {/* Hairline wipe on hover */}
          <div className="absolute top-0 left-0 h-px w-0 bg-terracotta group-hover:w-full transition-all duration-500 ease-out" />

          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
            <span className="production-tag group-hover:border-terracotta/40 transition-colors">
              8º Semestre
            </span>
          </div>
          <h3 
            className="font-normal text-foreground text-2xl md:text-3xl tracking-tight leading-tight group-hover:text-terracotta transition-colors duration-300"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            Bacharelado em Ciência da Computação
          </h3>
          <p className="text-sm text-foreground/80 font-medium mt-2">Universidade Federal de Mato Grosso (UFMT)</p>
          <p className="text-[15px] text-muted-foreground mt-3 leading-relaxed max-w-xl group-hover:text-foreground/90 transition-colors">
            Foco em Engenharia de Software, Estruturas de Dados Avançadas e Inteligência Artificial.
            Membro ativo da Infocorp Jr.
          </p>
        </motion.div>
        
        <motion.div 
          className="group relative rule-top border-b border-border py-8 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-xl transition-all duration-300 hover:bg-parchment/20"
          custom={1}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ x: 3 }}
        >
          {/* Hairline wipe on hover */}
          <div className="absolute top-0 left-0 h-px w-0 bg-terracotta group-hover:w-full transition-all duration-500 ease-out" />
          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
            <span className="production-tag group-hover:border-terracotta/40 transition-colors">
              Concluído 2023
            </span>
          </div>
          <h3 
            className="font-normal text-foreground text-xl md:text-2xl tracking-tight leading-tight group-hover:text-terracotta transition-colors duration-300"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            Programador de Sistemas Java
          </h3>
          <p className="text-sm text-foreground/80 font-medium mt-2">Fic-Dev / Seciteci MT</p>
          <p className="text-[15px] text-muted-foreground mt-3 leading-relaxed max-w-xl group-hover:text-foreground/90 transition-colors">
            Curso intensivo de especialização. Classificação no ranking final garantiu ingresso direto no estágio da CGE-MT.
          </p>
        </motion.div>
        <motion.div 
          className="group relative rule-top border-b border-border py-8 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-xl transition-all duration-300 hover:bg-parchment/20"
          custom={1}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ x: 3 }}
        >
          {/* Hairline wipe on hover */}
          <div className="absolute top-0 left-0 h-px w-0 bg-terracotta group-hover:w-full transition-all duration-500 ease-out" />
          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
            <span className="production-tag group-hover:border-terracotta/40 transition-colors">
              Em andamento
            </span>
          </div>
          <h3 
            className="font-normal text-foreground text-xl md:text-2xl tracking-tight leading-tight group-hover:text-terracotta transition-colors duration-300"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
             FIC - Programação de Sistemas com Inteligência Artificial
          </h3>
          <p className="text-sm text-foreground/80 font-medium mt-2">Fic-Dev / Seciteci MT</p>
          <p className="text-[15px] text-muted-foreground mt-3 leading-relaxed max-w-xl group-hover:text-foreground/90 transition-colors">
            Curso intensivo de especialização em uso de IA e dados.
          </p>
        </motion.div>
      </div>
    </section>
  );
}