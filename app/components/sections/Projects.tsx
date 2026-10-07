'use client';

import { useState } from 'react';
import { Terminal, FileText, Grid3x3, List, Info, ArrowUpRight, GitCommit, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Project } from '../../types';
import { ProjectModal } from '../ui/ProjectModal';
import { ScoreExplanationModal } from '../ui/ScoreExplanationModal';
import { motion, Variants } from 'framer-motion';

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
    <section id="projects" className="scroll-mt-24 relative">
      <SectionTitle 
        title="Carta de Projetos" 
        icon={Terminal} 
        subtitle="Criações do Forno & Produção Autoral" 
      />
      
      {/* Header controls & description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 -mt-2">
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Sistemas e arquiteturas desenvolvidos com matérias-primas modernas, sincronizados diretamente do GitHub e avaliados pelo índice de maturação técnica.
        </p>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
          <button
            onClick={() => setShowScoreInfo(true)}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-terracotta transition-colors bg-parchment px-3 py-1.5 rounded-sm border border-border hover:border-terracotta/40 cursor-pointer shadow-2xs"
          >
            <Info size={13} className="text-terracotta" />
            <span>Como?</span>
          </button>

          <div className="flex gap-1 bg-parchment p-1 rounded-sm border border-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-sm transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-card text-foreground shadow-xs border border-border font-bold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Visualização em grade"
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-sm transition-all cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-card text-foreground shadow-xs border border-border font-bold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Visualização em lista"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {showScoreInfo && <ScoreExplanationModal onClose={() => setShowScoreInfo(false)} />}

      {/* Projects Collection */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" 
        : "flex flex-col gap-4"
      }>
        {visibleProjects.map((repo, idx) => {
          const score = repo.projectScore?.finalScore ?? 0;
          const isHot = repo.projectScore?.status.includes('Fogo') || repo.projectScore?.status.includes('Fire') || score >= 80;
          const isConsistent = repo.projectScore?.status.includes('Consistente') || (score >= 60 && score < 80);

          return (
            <motion.div 
              key={repo.id} 
              onClick={() => setSelectedProject(repo)}
              className={`relative block bg-card border border-border rounded-sm card-elevate cursor-pointer group overflow-hidden ${
                viewMode === 'grid' ? 'p-5 flex flex-col justify-between h-full' : 'p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4'
              }`}
              custom={idx}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
            >
              {/* Top Artisanal Brand Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta via-ember to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className={viewMode === 'list' ? 'flex-1 min-w-0' : ''}>
                {/* Header: Title and Language/Status Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-terracotta uppercase tracking-wider block font-semibold mb-0.5">
                      {repo.language ? `${repo.language}` : 'Repositório Autoral'}
                    </span>
                    <h3 
                      className="font-serif font-bold text-foreground text-lg group-hover:text-terracotta transition-colors flex items-center gap-1.5"
                    >
                      <span>{repo.name}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-terracotta shrink-0" />
                    </h3>
                  </div>

                  {/* Status Badge — Professional Craft Framing */}
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm border font-semibold
                    ${isHot 
                      ? 'bg-ember/10 text-ember border-ember/30' 
                      : isConsistent 
                      ? 'bg-olive/10 text-olive border-olive/30' 
                      : 'bg-warm-brown/10 text-warm-brown border-warm-brown/30'
                    }`}
                  >
                    <div className="flex items-center">
                      {isHot ? 'Forno Ativo' : isConsistent ? 'Maturação Estável' : 'Acervo Técnico'}
                    </div>
                  </span>
                </div>
                
                {/* Description */}
                <p className={`text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-2 md:line-clamp-1'}`}>
                  {repo.description || "Consulte a documentação e arquitetura técnica deste repositório."}
                </p>
              </div>

              {/* Technical Calibration & Metrics — Sophisticated, Non-Gamified */}
              {repo.projectScore && (
                <div className={viewMode === 'list' ? 'md:w-80 shrink-0 space-y-2' : 'mt-4 pt-3 border-t border-border/60 space-y-2.5'}>
                  {/* Calibrated Meter Header */}
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-olive" />
                      Índice de Maturação
                    </span>
                    <span className="font-bold text-foreground font-serif text-sm">
                      {score.toFixed(0)}%
                    </span>
                  </div>
                  
                  {/* Fine Precision Gauge (Hairline Craft Meter) */}
                  <div className="h-1.5 w-full bg-parchment rounded-sm overflow-hidden border border-border/40 relative">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out rounded-sm
                        ${score >= 80 ? 'bg-gradient-to-r from-terracotta to-ember' : 
                          score >= 60 ? 'bg-olive' : 
                          'bg-warm-brown'}`} 
                      style={{ width: `${Math.min(100, Math.max(10, score))}%` }}
                    />
                  </div>
                  
                  {/* Granular Telemetry Footnotes */}
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground pt-0.5">
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
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount(prev => prev + 3)}
            className="px-6 py-2.5 bg-card hover:bg-parchment text-foreground font-medium text-xs font-mono tracking-wider uppercase rounded-sm border border-border transition-all shadow-xs hover:border-terracotta/40 cursor-pointer flex items-center gap-2"
          >
            <span>Ver Mais Criações do Acervo</span>
            <span className="text-terracotta font-bold">+</span>
          </button>
        </div>
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}