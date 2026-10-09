'use client';

import { Github, Linkedin, Mail, Phone, BookOpen, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
};

const stampVariant: Variants = {
  hidden: { opacity: 0, scale: 1.15, rotate: -1.5, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

export function Hero() {
  return (
    <motion.header 
      id="hero" 
      className="mb-14 pt-4 md:pt-8 scroll-mt-24 relative overflow-visible"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Background Rotating Seal (subtle watermark) */}
      <div className="absolute -top-16 -right-10 md:right-8 w-72 h-72 md:w-96 md:h-96 pointer-events-none opacity-[0.03] dark:opacity-[0.04] select-none">
        <svg viewBox="0 0 300 300" className="w-full h-full artisan-seal text-foreground">
          <defs>
            <path id="circlePath" d="M 150, 150 m -110, 0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0" />
          </defs>
          <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <circle cx="150" cy="150" r="95" stroke="currentColor" strokeWidth="1" fill="none" />
          <text className="text-[12px] uppercase font-mono tracking-[0.28em] fill-current font-bold">
            <textPath href="#circlePath">
              BOTTEGA DI SOFTWARE • METODOLOGIA ARTESANAL • LEONARDO RAMOS • MATURAÇÃO CONTÍNUA •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Subtle ambient glow */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none animate-hearth -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(185, 79, 53, 0.08) 0%, rgba(185, 79, 53, 0.02) 50%, transparent 75%)',
        }}
      />

      {/* Top Banner Row: Left Info + Right Portrait Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 relative">
        
        {/* Left Column (8 cols): Name, Titles, and Socials */}
        <motion.div className="lg:col-span-8 space-y-5" variants={fadeUp}>
          
          {/* Availability Label */}
          <div className="inline-flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-parchment border border-border rounded-full text-[11px] font-mono tracking-wider uppercase text-muted-foreground flex items-center gap-2 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-olive"></span>
              </span>
              <span className="font-semibold text-foreground">Disponível para Projetos</span>
              <span className="text-border">|</span>
              <span className="text-terracotta font-medium">Lote 2026</span>
            </span>
          </div>

          {/* Name — Editorial Serif */}
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.06]"
            style={{ fontFamily: 'var(--font-editorial)' }}
            variants={stampVariant}
          >
            <span className="relative inline-block">
              Leonardo Ramos
              {/* Terracotta underline stroke */}
              <svg 
                className="absolute -bottom-2.5 left-0 w-full" 
                viewBox="0 0 200 8" 
                fill="none" 
                preserveAspectRatio="none"
                style={{ height: '7px' }}
              >
                <path 
                  d="M0 5 Q50 0, 100 4 Q150 8, 200 3" 
                  stroke="var(--terracotta)" 
                  strokeWidth="3.2" 
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitles & Engineering Spec */}
          <div className="space-y-1.5 pt-1">
            <p 
              className="text-base sm:text-lg text-foreground/90 font-medium tracking-wide flex items-center gap-2"
              style={{ fontFamily: 'var(--font-technical)' }}
            >
              <span>Full Stack Developer & Engenheiro de Software</span>
            </p>
          </div>

          {/* Social and Action Links */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <SocialButton href="https://github.com/leoolivramos" icon={Github} label="GitHub" />
            <SocialButton href="https://linkedin.com/in/leonardo-de-oliveira-ramos-690318270" icon={Linkedin} label="LinkedIn" />
            <SocialButton href="https://medium.com/@leoolivramos" icon={BookOpen} label="Medium" />
            <SocialButton href="mailto:leoolivramos@gmail.com" icon={Mail} label="Email" />
            <SocialButton href="https://wa.me/5565992121341" icon={Phone} label="WhatsApp" />
            <SocialButton href="/Leonardo_Ramos_CV.pdf" icon={Download} label="Currículo (PDF)" download />
          </div>
        </motion.div>

        {/* Right Column (4 cols): Photo Frame */}
        <motion.div 
          className="lg:col-span-4 flex flex-col items-center lg:items-end"
          variants={fadeUp}
        >
          <div className="relative group card-elevate">
            {/* Subtle corner marks */}
            <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 border-terracotta/40 z-20 transition-all group-hover:scale-110 rounded-tl-sm" />
            <div className="absolute -top-2.5 -right-2.5 w-5 h-5 border-t-2 border-r-2 border-terracotta/40 z-20 transition-all group-hover:scale-110 rounded-tr-sm" />
            <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b-2 border-l-2 border-terracotta/40 z-20 transition-all group-hover:scale-110 rounded-bl-sm" />
            <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 border-terracotta/40 z-20 transition-all group-hover:scale-110 rounded-br-sm" />
            
            {/* Portrait Frame */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-border bg-card shadow-md">
              <Image
                src="/perfil.jpg"
                alt="Leonardo Ramos"
                fill
                fetchPriority="high"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 192px, 224px"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
              />
              {/* Subtle warm overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-terracotta/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Label below picture */}
            <div className="mt-3 flex items-center justify-center text-[10px] font-mono text-muted-foreground px-1">
              <span className="text-terracotta/70 font-semibold tracking-wider">BOTTEGA DI CODICE</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Manifesto / Presentation Card */}
      <motion.div 
        className="w-full bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm card-elevate overflow-hidden relative"
        variants={fadeUp}
      >
        {/* Left accent bar */}
        <div className="absolute top-4 bottom-4 left-0 w-1 rounded-r-full bg-gradient-to-b from-terracotta via-ember to-terracotta-light opacity-60" />

        {/* Header & tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-border/60 pl-4">
          <div className="flex items-center gap-2.5">
            <div>
              <span className="text-terracotta uppercase tracking-widest font-mono text-[10px] font-bold block">
                Ficha de Bancada Nº 01
              </span>
              <h2 className="font-serif font-bold text-lg text-foreground">
                A Receita: Filosofia de Engenharia
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border border-olive/30 text-olive bg-olive/5 font-semibold">
              Fermentação Lenta
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border border-terracotta/30 text-terracotta bg-terracotta/5 font-semibold">
              Forno a 450°C
            </span>
          </div>
        </div>

        {/* Content: Manifesto + Spec Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pl-4">
          
          {/* Main Manifesto (Original Content Preserved 100%) */}
          <div className="lg:col-span-8">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-balance font-normal">
              Desenvolvedor com vivência prática em{' '}
              <strong className="font-semibold text-foreground">desenvolvimento de sistemas</strong> e{' '}
              <strong className="font-semibold text-foreground">engenharia de software</strong>.
              Focado em resolver problemas complexos, criar arquiteturas escaláveis e explorar
              o potencial entre <strong className="font-semibold text-foreground">DevOps</strong>,{' '}
              <strong className="font-semibold text-foreground">sistemas distribuídos</strong> e{' '}
              <strong className="font-semibold text-foreground">IA aplicada</strong>.
            </p>
          </div>

          {/* Spec Box */}
          <div className="lg:col-span-4 p-4 rounded-xl border border-border/70 bg-parchment/50 space-y-2.5 font-mono text-xs text-muted-foreground">
            <div className="flex items-center justify-between pb-1.5 border-b border-border/40 text-[11px]">
              <span className="text-foreground font-semibold">MATÉRIA-PRIMA:</span>
              <span className="text-terracotta font-medium">Clean Architecture</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-border/40 text-[11px]">
              <span className="text-foreground font-semibold">TEMPO MATURAÇÃO:</span>
              <span className="text-olive font-medium">Resiliência Longa</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-foreground font-semibold">AMBIENTE:</span>
              <span className="text-ember font-medium">Produção Contínua</span>
            </div>
          </div>
        </div>

        {/* Footer Badges */}
        <div className="mt-6 pt-4 border-t border-dashed border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground pl-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              <span>Sistemas & Dados</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-olive" />
              <span>Aprendizado Contínuo</span>
            </span>
          </div>
          <span className="text-terracotta/80 font-semibold text-[11px] tracking-wider">
            ATELIER // CUIABÁ - MT
          </span>
        </div>
      </motion.div>
    </motion.header>
  );
}

interface SocialButtonProps {
  href: string;
  icon: React.ComponentType<{ size: number }>;
  label: string;
  download?: boolean;
}

function SocialButton({ href, icon: Icon, label, download }: SocialButtonProps) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      download={download}
      className="group inline-flex items-center gap-2 px-3.5 py-2 bg-card border border-border text-foreground text-xs font-medium rounded-xl 
        hover:border-terracotta/50 hover:bg-parchment/60 hover:text-terracotta shadow-xs
        transition-all duration-250 font-mono tracking-tight cursor-pointer"
    >
      <Icon size={14} /> 
      <span>{label}</span>
    </Link>
  );
}