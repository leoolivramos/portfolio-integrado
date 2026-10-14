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
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const titleLetterVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2 + i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Hero() {
  return (
    <motion.header 
      id="hero" 
      className="pt-6 md:pt-14 pb-6 scroll-mt-24 relative overflow-visible"
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

      {/* Asymmetric headline row: oversized name left, portrait right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end relative">
        
        <motion.div className="lg:col-span-8 space-y-8 md:space-y-10" variants={fadeUp}>
          
          {/* Availability Label */}
          <motion.div 
            className="inline-flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="px-3.5 py-1.5 border border-border rounded-full text-[11px] font-mono tracking-wider uppercase text-muted-foreground flex items-center gap-2 shadow-2xs hover:border-olive/50 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-olive"></span>
              </span>
              <span className="font-semibold text-foreground">Disponível para Projetos</span>
              <span className="text-border">|</span>
              <span className="text-terracotta font-medium">Lote 2026</span>
            </span>
          </motion.div>

          {/* Name — oversized editorial serif with staggered word reveal */}
          <h1 className="display-title text-foreground overflow-hidden">
            <motion.span 
              className="block"
              custom={0}
              variants={titleLetterVariants}
              initial="hidden"
              animate="visible"
            >
              Leonardo
            </motion.span>{' '}
            <motion.span 
              className="block text-terracotta"
              custom={1}
              variants={titleLetterVariants}
              initial="hidden"
              animate="visible"
            >
              Ramos
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-lg text-foreground/80 font-medium tracking-wide"
            style={{ fontFamily: 'var(--font-technical)' }}
            variants={fadeUp}
          >
            <span>Full Stack Developer & Engenheiro de Software</span>
          </motion.p>

          {/* Social and Action Links */}
          <motion.div className="flex flex-wrap items-center gap-x-2 gap-y-2.5 pt-2" variants={fadeUp}>
            <SocialButton href="https://github.com/leoolivramos" icon={Github} label="GitHub" />
            <SocialButton href="https://linkedin.com/in/leonardo-de-oliveira-ramos-690318270" icon={Linkedin} label="LinkedIn" />
            <SocialButton href="https://medium.com/@leoolivramos" icon={BookOpen} label="Medium" />
            <SocialButton href="mailto:leoolivramos@gmail.com" icon={Mail} label="Email" />
            <SocialButton href="https://wa.me/5565992121341" icon={Phone} label="WhatsApp" />
            <SocialButton href="/Leonardo_Ramos_CV.pdf" icon={Download} label="Currículo (PDF)" download />
          </motion.div>
        </motion.div>

        {/* Portrait with spring hover & smooth glow */}
        <motion.div 
          className="lg:col-span-4 flex flex-col items-start lg:items-end"
          variants={fadeUp}
        >
          <motion.div 
            className="relative group"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative w-52 h-64 sm:w-60 sm:h-72 lg:w-64 lg:h-80 rounded-[22px] overflow-hidden bg-parchment shadow-md border border-border/80 group-hover:border-terracotta/40 group-hover:shadow-xl transition-all duration-500">
              <Image
                src="/perfil.jpg"
                alt="Leonardo Ramos"
                fill
                fetchPriority="high"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 208px, 256px"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terracotta/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Label below picture */}
            <div className="mt-4 flex items-center text-[10px] font-mono text-muted-foreground group-hover:text-terracotta transition-colors duration-300">
              <span className="font-semibold tracking-[0.18em]">BOTTEGA DI CODICE</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Manifesto — borderless two-column block under a hairline rule */}
      <motion.div 
        className="rule-top mt-16 md:mt-24 pt-10 md:pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative"
        variants={fadeUp}
      >
        {/* Left: label, heading, tags */}
        <div className="lg:col-span-4 space-y-5">
          <span className="eyebrow block">
            Ficha de Bancada Nº 01
          </span>
          <h2 className="block-heading text-foreground text-balance">
            Desenvolvedor de Software Artesanal
          </h2>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-olive/40 text-olive font-semibold hover:border-olive transition-colors">
              Engenharia de Software
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-terracotta/40 text-terracotta font-semibold hover:border-terracotta transition-colors">
              Desenvolvimento
            </span>
          </div>
        </div>

        {/* Right: manifesto, spec rows, footer badges */}
        <div className="lg:col-span-8 space-y-10">
          <p className="lead-text text-foreground/80 text-balance">
            Desenvolvedor com vivência prática em{' '}
            <strong className="font-medium text-foreground">desenvolvimento de sistemas</strong> e{' '}
            <strong className="font-medium text-foreground">engenharia de software</strong>.
            Focado em resolver problemas complexos, criar arquiteturas escaláveis e explorar
            o potencial entre <strong className="font-medium text-foreground">DevOps</strong>,{' '}
            <strong className="font-medium text-foreground">sistemas distribuídos</strong> e{' '}
            <strong className="font-medium text-foreground">IA aplicada</strong>.
          </p>

          {/* Spec rows with interactive hover transitions */}
          <div className="font-mono text-xs text-muted-foreground">
            <div className="flex items-center justify-between py-3 border-t border-border text-[11px] hover:text-foreground hover:pl-1 transition-all duration-200">
              <span className="text-foreground font-semibold">MATÉRIA-PRIMA:</span>
              <span className="text-terracotta font-medium">Clean Architecture</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-border text-[11px] hover:text-foreground hover:pl-1 transition-all duration-200">
              <span className="text-foreground font-semibold">TEMPO MATURAÇÃO:</span>
              <span className="text-olive font-medium">Resiliência Longa</span>
            </div>
            <div className="flex items-center justify-between py-3 border-y border-border text-[11px] hover:text-foreground hover:pl-1 transition-all duration-200">
              <span className="text-foreground font-semibold">AMBIENTE:</span>
              <span className="text-ember font-medium">Produção Contínua</span>
            </div>
          </div>

          {/* Footer badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                <span>Sistemas & Dados</span>
              </span>
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                <span>Aprendizado Contínuo</span>
              </span>
            </div>
            <span className="text-terracotta font-semibold text-[11px] tracking-wider">
              CUIABÁ - MT
            </span>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}

interface SocialButtonProps {
  href: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  download?: boolean;
}

function SocialButton({ href, icon: Icon, label, download }: SocialButtonProps) {
  const isPrimary = !!download;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
    >
      <Link 
        href={href} 
        target="_blank" 
        download={download}
        className={`group inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl font-mono tracking-tight cursor-pointer transition-all duration-200 ${
          isPrimary
            ? 'bg-primary text-primary-foreground hover:bg-terracotta-dark shadow-sm hover:shadow-md'
            : 'text-foreground/80 hover:text-terracotta hover:bg-parchment/50 border border-transparent hover:border-border/60'
        }`}
      >
        <Icon size={14} className="group-hover:rotate-12 group-hover:scale-115 transition-transform duration-200 shrink-0 text-terracotta" /> 
        <span className={isPrimary ? '' : 'underline-offset-4 group-hover:underline'}>{label}</span>
      </Link>
    </motion.div>
  );
}