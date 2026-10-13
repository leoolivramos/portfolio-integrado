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
      className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/70"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
        {/* Logo mark */}
        <Link href="#hero" className="flex items-center">
          <motion.span 
            className="font-serif font-normal text-xl text-terracotta tracking-tight select-none cursor-pointer"
            whileHover={{ scale: 1.12, rotate: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
          >
            LR
          </motion.span>
        </Link>

        <ul className="hidden md:flex items-center justify-end gap-1 flex-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link 
                  href={item.href}
                  className="inline-flex items-center px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.025em] text-muted-foreground hover:text-foreground hover:bg-parchment/60 rounded-xl transition-all duration-200"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>

        <div className="flex items-center ml-auto md:ml-0 gap-1">
          <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-parchment/60 rounded-xl transition-colors duration-200 cursor-pointer"
            title="Alternar tema"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {!mounted ? (
              <div className="w-4 h-4" />
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center text-terracotta"
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </motion.div>
              </AnimatePresence>
            )}
            <span className="hidden sm:inline text-xs" style={{ fontFamily: 'var(--font-technical)', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              {!mounted ? '' : (theme === 'dark' ? 'LIGHT' : 'DARK')}
            </span>
          </motion.button>

          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Menu"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-background/97 backdrop-blur-md border-b border-border overflow-hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col max-w-6xl mx-auto px-4 sm:px-6">
              {navItems.map((item) => (
                <li key={item.name} className="border-b border-border/50 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 py-4 text-sm font-semibold uppercase tracking-[0.025em] text-muted-foreground hover:text-foreground transition-colors"
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