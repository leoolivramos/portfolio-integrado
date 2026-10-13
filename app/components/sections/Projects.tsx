'use client';

import { useState } from 'react';
import { Terminal, Grid3x3, List, Info, ArrowUpRight, GitCommit, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Project } from '../../types';
import { ProjectModal } from '../ui/ProjectModal';
import { ScoreExplanationModal } from '../ui/ScoreExplanationModal';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export function Projects({ data }: { data: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showScoreInfo, setShowScoreInfo] = useState(false);

  const sortedProjects = [...data]
    .sort((a, b) => (b.projectScore?.finalScore ?? 0) - (a.projectScore?.finalScore ?? 0));
  
  const visibleProjects = sortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProjects.length;

  return (
    <section id="projects" className="section-split scroll-mt-24 relative">
      <SectionTitle 
        title="Carta de Projetos" 
        icon={Terminal} 
        subtitle="Criações do Forno & Produção Autoral" 
      />
      
      {/* Header controls & description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
        <p className="lead-text text-foreground/75 max-w-xl text-balance">
          Sistemas e arquiteturas desenvolvidos com matérias-primas modernas, sincronizados diretamente do GitHub e avaliados pelo índice de maturação técnica.
        </p>

        <div className="flex items-center gap-2.5 self-stretch md:self-auto justify-between md:justify-end shrink-0">
          <motion.button
            onClick={() => setShowScoreInfo(true)}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-terracotta transition-colors px-3 py-2 rounded-xl border border-border hover:border-terracotta/40 cursor-pointer shadow-2xs"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Info size={13} className="text-terracotta" />
            <span>Como?</span>
          </motion.button>

          <div className="flex gap-1 p-1 rounded-xl border border-border bg-card/60">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-parchment text-foreground font-bold shadow-2xs' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Visualização em grade"
              whileTap={{ scale: 0.92 }}
            >
              <Grid3x3 size={16} />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-parchment text-foreground font-bold shadow-2xs' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Visualização em lista"
              whileTap={{ scale: 0.92 }}
            >
              <List size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScoreInfo && <ScoreExplanationModal onClose={() => setShowScoreInfo(false)} />}
      </AnimatePresence>

      {/* Projects Collection — entries separated by hairline rules */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 gap-x-10" 
        : "flex flex-col"
      }>
        {visibleProjects.map((repo, idx) => {
          const score = repo.projectScore?.finalScore ?? 0;
          const isHot = repo.projectScore?.status.includes('Fogo') || repo.projectScore?.status.includes('Fire') || score >= 80;
          const isConsistent = repo.projectScore?.status.includes('Consistente') || (score >= 60 && score < 80);

          return (
            <motion.div 
              key={repo.id} 
              onClick={() => setSelectedProject(repo)}
              className={`relative block border-t border-border cursor-pointer group py-7 transition-colors hover:bg-parchment/20 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-xl ${
                viewMode === 'grid' ? 'flex flex-col justify-between h-full' : 'flex flex-col md:flex-row md:items-center justify-between gap-5'
              }`}
              custom={idx}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Hairline wipe on hover */}
              <div className="absolute top-0 left-0 h-px w-0 bg-terracotta group-hover:w-full transition-all duration-500 ease-out" />

              <div className={viewMode === 'list' ? 'flex-1 min-w-0' : ''}>
                {/* Header: Title and Language/Status Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="eyebrow block mb-2">
                      {repo.language ? `${repo.language}` : 'Repositório Autoral'}
                    </span>
                    <h3 
                      className="font-serif font-normal tracking-tight text-foreground text-2xl group-hover:text-terracotta transition-colors flex items-center gap-1.5"
                    >
                      <span>{repo.name}</span>
                      <ArrowUpRight 
                        size={16} 
                        className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-terracotta shrink-0" 
                      />
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border font-semibold shrink-0 group-hover:scale-105 transition-transform duration-200
                    ${isHot 
                      ? 'text-ember border-ember/40 bg-ember/5' 
                      : isConsistent 
                      ? 'text-olive border-olive/40 bg-olive/5' 
                      : 'text-warm-brown border-warm-brown/30 bg-warm-brown/5'
                    }`}
                  >
                    <div className="flex items-center">
                      {isHot ? 'Forno Ativo' : isConsistent ? 'Maturação Estável' : 'Acervo Técnico'}
                    </div>
                  </span>
                </div>
                
                {/* Description */}
                <p className={`text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-5 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-2 md:line-clamp-1'}`}>
                  {repo.description || "Consulte a documentação e arquitetura técnica deste repositório."}
                </p>
              </div>

              {/* Technical Calibration & Metrics */}
              {repo.projectScore && (
                <div className={viewMode === 'list' ? 'md:w-80 shrink-0 space-y-2' : 'space-y-2.5'}>
                  {/* Calibrated Meter Header */}
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-olive" />
                      Índice de Maturação
                    </span>
                    <span className="text-foreground font-serif text-lg tracking-tight group-hover:text-terracotta transition-colors">
                      {score.toFixed(0)}%
                    </span>
                  </div>
                  
                  {/* Fine Precision Gauge */}
                  <div className="h-px w-full bg-border relative overflow-hidden">
                    <div 
                      className={`absolute left-0 -top-px h-[3px] transition-all duration-1000 ease-out rounded-full
                        ${score >= 80 ? 'bg-terracotta' : 
                          score >= 60 ? 'bg-olive' : 
                          'bg-warm-brown'}`} 
                      style={{ width: `${Math.min(100, Math.max(10, score))}%` }}
                    />
                  </div>
                  
                  {/* Granular Telemetry Footnotes */}
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <GitCommit size={11} className="text-terracotta" />
                      Atividade: {repo.projectScore.activityScore.toFixed(0)}%
                    </span>
                    <span className="flex items-center gap-1">
                      Consistência: {repo.projectScore.consistencyScore.toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Pagination control */}
      {hasMore && (
        <div className="flex justify-start mt-10 rule-top pt-10">
          <motion.button
            onClick={() => setVisibleCount(prev => prev + 3)}
            className="px-6 py-3 hover:bg-parchment text-foreground font-medium text-xs font-mono tracking-wider uppercase rounded-xl border border-border transition-colors hover:border-terracotta/40 cursor-pointer flex items-center gap-2 shadow-2xs"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Ver Mais Criações do Acervo</span>
            <span className="text-terracotta font-bold transition-transform group-hover:rotate-90">+</span>
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}