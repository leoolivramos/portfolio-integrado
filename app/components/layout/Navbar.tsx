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
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90vw] max-w-3xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
    >
      <div 
        className="flex items-center gap-1 px-3 py-2.5 bg-card/90 backdrop-blur-lg border border-border rounded-sm shadow-lg"
        style={{ boxShadow: '0 4px 24px rgba(44, 36, 23, 0.08)' }}
      >
        {/* Logo mark */}
        <div className="hidden md:flex items-center mr-2 pl-2 pr-3 border-r border-border">
          <svg width="20" height="14" viewBox="0 0 48 32" fill="none" className="text-terracotta opacity-60">
            <path 
              d="M4 32 C4 14, 14 4, 24 4 C34 4, 44 14, 44 32" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              fill="none"
            />
            <circle cx="24" cy="22" r="2.5" fill="currentColor" opacity="0.5" />
          </svg>
        </div>

        <ul className="hidden md:flex items-center gap-0 flex-1">
          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link 
                href={item.href}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-parchment rounded-sm transition-all duration-200"
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

        <div className="md:pl-2 md:ml-2 md:border-l md:border-border flex items-center ml-auto md:ml-0">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-parchment rounded-sm transition-all duration-200"
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
            className="md:hidden absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-lg border border-border rounded-sm shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.name} className="border-b border-border last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-parchment transition-colors"
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