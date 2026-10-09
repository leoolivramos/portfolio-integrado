'use client';

import { Home, Code, Briefcase, Terminal, BarChart3, Moon, Sun, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Início', icon: Home, href: '#hero' },
  { name: 'Projetos', icon: Terminal, href: '#projects' },
  { name: 'Arsenal', icon: Code, href: '#skills' },
  { name: 'Jornada', icon: Briefcase, href: '#experience' },
  { name: 'Telemetria', icon: BarChart3, href: '#analyticsdashboard' },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.nav 
      className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[92vw] max-w-3xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
    >
      <div 
        className="flex items-center gap-1 px-3 py-2.5 bg-card/92 backdrop-blur-xl border border-border rounded-2xl"
        style={{ boxShadow: '0 4px 20px rgba(40, 37, 34, 0.06), 0 1px 3px rgba(40, 37, 34, 0.04)' }}
      >
        {/* Logo mark */}
        <div className="hidden md:flex items-center mr-2 pl-2 pr-3 border-r border-border/60">
          <span className="font-serif font-bold text-sm text-terracotta tracking-tight">LR</span>
        </div>

        <ul className="hidden md:flex items-center gap-0 flex-1">
          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link 
                href={item.href}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-parchment/60 rounded-xl transition-all duration-200"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <item.icon size={15} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center p-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="md:pl-2 md:ml-2 md:border-l md:border-border/60 flex items-center ml-auto md:ml-0">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-parchment/60 rounded-xl transition-all duration-200"
            title="Alternar tema"
          >
            {!mounted ? (
              <div className="w-4 h-4" />
            ) : theme === 'dark' ? (
              <Sun size={15} />
            ) : (
              <Moon size={15} />
            )}
            <span className="hidden sm:inline text-xs" style={{ fontFamily: 'var(--font-technical)', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              {!mounted ? '' : (theme === 'dark' ? 'LIGHT' : 'DARK')}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.name} className="border-b border-border/50 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-parchment/60 transition-colors"
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}