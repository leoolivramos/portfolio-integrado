'use client';

import { BookOpen } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { motion, Variants } from 'framer-motion';

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' },
  }),
};

export function Education() {
  return (
    <section id="education">
      <SectionTitle title="Formação Acadêmica" icon={BookOpen} subtitle="Base da Receita" />
      
      <div className="grid gap-4">
        <motion.div 
          className="group relative p-5 bg-card border border-border rounded-sm warm-hover overflow-hidden"
          custom={0}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta/30 via-ember/20 to-transparent" />
          
          <div className="flex justify-between items-start">
            <div>
              <h3 
                className="font-semibold text-foreground text-lg"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                Bacharelado em Ciência da Computação
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Universidade Federal de Mato Grosso (UFMT)</p>
            </div>
            <span className="production-tag" style={{ borderStyle: 'solid', borderColor: 'var(--border)' }}>
              8º Semestre
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Foco em Engenharia de Software, Estruturas de Dados Avançadas e Inteligência Artificial.
            Membro ativo da Infocorp Jr.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative p-5 bg-card border border-border rounded-sm opacity-80 hover:opacity-100 warm-hover transition-all overflow-hidden"
          custom={1}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 
                className="font-semibold text-foreground"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                Programador de Sistemas Java
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Fic-Dev / Seciteci MT</p>
            </div>
            <span 
              className="text-xs text-muted-foreground"
              style={{ fontFamily: 'var(--font-technical)', fontSize: '0.65rem', letterSpacing: '0.08em' }}
            >
              Concluído 2023
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Curso intensivo de especialização. Classificação no ranking final garantiu ingresso direto no estágio da CGE-MT.
          </p>
        </motion.div>
      </div>
    </section>
  );
}