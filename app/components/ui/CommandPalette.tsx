'use client';

import { useEffect, useState } from 'react';
import { Mail, FileText, Sun, Moon, Home, Code, BookOpen, MessageCircle, Check, Terminal } from 'lucide-react';
import { useTheme } from 'next-themes';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setSearch('');
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        onClose();
        setSearch('');
      }, 300);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('leoolivramos@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
        setSearch('');
      }, 1500);
    });
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setTimeout(() => {
      onClose();
      setSearch('');
    }, 100);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Leonardo_Ramos_CV.pdf';
    link.download = 'Leonardo_Ramos_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      onClose();
      setSearch('');
    }, 100);
  };

  const commands = [
    // Navigation
    {
      id: 'home',
      label: 'Ir para Início (Atelier)',
      icon: Home,
      action: () => handleNavigate('hero'),
      group: 'Navegar'
    },
    {
      id: 'projects',
      label: 'Ir para Carta de Projetos',
      icon: Code,
      action: () => handleNavigate('projects'),
      group: 'Navegar'
    },
    {
      id: 'skills',
      label: 'Ir para Arsenal Técnico (Ingredientes)',
      icon: Terminal,
      action: () => handleNavigate('skills'),
      group: 'Navegar'
    },
    {
      id: 'experience',
      label: 'Ir para Jornada & Maturação',
      icon: MessageCircle,
      action: () => handleNavigate('experience'),
      group: 'Navegar'
    },
    {
      id: 'telemetry',
      label: 'Ir para Telemetria do Laboratório',
      icon: BookOpen,
      action: () => handleNavigate('analyticsdashboard'),
      group: 'Navegar'
    },
    {
      id: 'guestbook',
      label: 'Ir para Caderno de Visitas',
      icon: Mail,
      action: () => handleNavigate('guestbook'),
      group: 'Navegar'
    },
    // Actions
    {
      id: 'copy-email',
      label: copied ? 'Email copiado!' : 'Copiar Email',
      icon: copied ? Check : Mail,
      action: handleCopyEmail,
      group: 'Ações'
    },
    {
      id: 'download-cv',
      label: 'Baixar Currículo (PDF)',
      icon: FileText,
      action: handleDownloadCV,
      group: 'Ações'
    },
    // Theme
    {
      id: 'toggle-theme',
      label: theme === 'dark' ? 'Modo Claro' : 'Modo Escuro',
      icon: theme === 'dark' ? Sun : Moon,
      action: handleToggleTheme,
      group: 'Aparência'
    }
  ];

  const groups = ['Navegar', 'Ações', 'Aparência'];
  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.group.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => {
          onClose();
          setSearch('');
        }}
      />

      {/* Command Palette */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl p-4">
        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
          <div className="flex items-center border-b border-border px-4 py-1.5 bg-parchment">
            <Terminal size={16} className="mr-3 text-terracotta shrink-0" />
            <input
              type="text"
              placeholder="Digite um comando, seção ou atalho..."
              className="flex h-11 w-full bg-transparent py-2 text-sm font-sans outline-none placeholder:text-muted-foreground text-foreground"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          <div className="max-h-80 overflow-y-auto py-2 p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-muted-foreground">
                Nenhum comando correspondente encontrado.
              </div>
            ) : (
              groups.map((group) => {
                const groupCommands = filteredCommands.filter(cmd => cmd.group === group);
                if (groupCommands.length === 0) return null;

                return (
                  <div key={group} className="mb-2 last:mb-0">
                    <div className="px-3 py-1 text-[10px] font-mono font-bold text-terracotta uppercase tracking-widest">
                      {group}
                    </div>
                    {groupCommands.map((cmd) => {
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          className="w-full relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-xs font-sans outline-none hover:bg-parchment hover:text-foreground text-foreground/90 transition-colors text-left"
                        >
                          <Icon className={`mr-2.5 h-3.5 w-3.5 flex-shrink-0 ${copied && cmd.id === 'copy-email' ? 'text-olive' : 'text-terracotta'}`} />
                          <span className="font-medium">{cmd.label}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-border bg-parchment px-4 py-2.5 text-[11px] font-mono text-muted-foreground flex justify-between items-center">
            <span>Laboratório de Navegação Rápida</span>
            <span>ESC para fechar</span>
          </div>
        </div>
      </div>
    </>
  );
}
