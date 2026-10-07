'use client';

import { Terminal } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 pt-10 pb-16 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-foreground/80 gap-6">
      <div className="flex items-center gap-3">
        {/* Artisanal mini oven mark */}
        <div className="w-6 h-6 rounded-sm border border-border bg-parchment flex items-center justify-center text-terracotta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M4 20h16M5 20V12a7 7 0 0 1 14 0v8" />
            <path d="M9 20v-4a3 3 0 0 1 6 0v4" />
          </svg>
        </div>
        <p className="font-mono text-xs tracking-tight text-muted-foreground">
          © {currentYear} <span className="text-foreground font-semibold">Leonardo Ramos</span> • Full Stack Developer & Laboratório de Software
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
        <Terminal size={13} className="text-terracotta" />
        <span>Navegação rápida:</span>
        <kbd className="px-2 py-0.5 rounded-sm bg-parchment border border-border font-mono text-[11px] text-foreground font-semibold shadow-xs">
          Cmd + K
        </kbd>
      </div>
    </footer>
  );
}