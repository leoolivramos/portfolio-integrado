'use client';

import { Terminal } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 md:mt-32 pt-10 pb-16 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-foreground/80 gap-6">
      <div className="flex items-center gap-4">
        <span className="font-serif font-normal text-2xl text-terracotta tracking-tight">LR</span>
        <p className="font-mono text-xs tracking-tight text-muted-foreground">
          © {currentYear} <span className="text-foreground font-semibold">Leonardo Ramos</span> • Full Stack Developer & Laboratório de Software
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
        <Terminal size={13} className="text-terracotta" />
        <span>Navegação rápida:</span>
        <kbd 
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
          }}
          className="px-2 py-0.5 rounded-md border border-border font-mono text-[11px] text-foreground font-semibold cursor-pointer hover:border-terracotta hover:text-terracotta hover:bg-parchment transition-all select-none shadow-2xs"
          title="Clique ou pressione Cmd+K para abrir a paleta de comandos"
        >
          Cmd + K
        </kbd>
      </div>
    </footer>
  );
}