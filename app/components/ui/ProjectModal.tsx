'use client';

import { X, Github, ExternalLink, Calendar, Star, GitFork } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';
import { Project } from '../../types';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeQuery.addEventListener('change', handleChange);
    
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    if (isOpen) document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative bg-card w-full max-w-4xl max-h-[90vh] rounded-sm shadow-2xl border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border bg-parchment">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-terracotta font-semibold">
                Ficha Técnica do Repositório
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground flex flex-wrap items-center gap-3">
              {project.name}
              {project.language && (
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-sm bg-terracotta/10 text-terracotta border border-terracotta/20">
                  {project.language}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5"><Calendar size={13} className="text-terracotta"/> {new Date(project.updatedAt).toLocaleDateString('pt-BR')}</span>
              <span className="flex items-center gap-1.5"><Star size={13} className="text-ember"/> {project.stars} stars</span>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-sm transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Readme content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-background">
          {project.readme ? (
            <div className="prose dark:prose-invert max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:border-b prose-headings:border-border/60 prose-headings:pb-2
              prose-h1:text-2xl prose-h1:mt-0 prose-h1:mb-5 prose-h1:text-foreground
              prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-foreground
              prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2 prose-h3:border-0
              prose-p:leading-relaxed prose-p:my-3 prose-p:text-foreground/90
              prose-a:text-terracotta prose-a:underline hover:opacity-80 prose-a:font-medium
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-terracotta prose-code:bg-parchment prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
              prose-blockquote:border-l-4 prose-blockquote:border-terracotta prose-blockquote:bg-parchment/60 prose-blockquote:py-1.5 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-sm
              prose-ul:my-3 prose-ol:my-3 prose-li:my-1
              prose-table:border-collapse prose-table:w-full prose-table:my-5
              prose-thead:bg-parchment
              prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:font-mono prose-th:text-xs
              prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2 prose-td:text-xs
              prose-tr:border-b prose-tr:border-border
              prose-img:rounded-sm prose-img:border prose-img:border-border prose-img:shadow-sm prose-img:my-4 prose-img:mx-auto
              prose-hr:border-border prose-hr:my-6"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    
                    return !inline && language ? (
                      <div className="my-4 rounded-sm overflow-hidden border border-border shadow-xs">
                        <div className="bg-parchment px-4 py-1.5 border-b border-border flex items-center justify-between">
                          <span className="text-[11px] font-mono text-terracotta font-semibold uppercase">{language}</span>
                        </div>
                        <SyntaxHighlighter
                          style={isDark ? oneDark : oneLight}
                          language={language}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            background: isDark ? '#1A1410' : '#FAF6F1',
                            fontSize: '0.85rem',
                            padding: '1rem',
                          }}
                          codeTagProps={{
                            style: {
                              fontFamily: 'var(--font-mono), monospace',
                            }
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  a({ node, children, href, ...props }: any) {
                    const isExternal = href?.startsWith('http');
                    return (
                      <a
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        {...props}
                      >
                        {children}
                        {isExternal && <ExternalLink className="inline ml-1 w-3 h-3 text-terracotta" />}
                      </a>
                    );
                  },
                  img({ node, src, alt, ...props }: any) {
                    return (
                      <img
                        src={src}
                        alt={alt || ''}
                        loading="lazy"
                        {...props}
                      />
                    );
                  },
                  table({ node, children, ...props }: any) {
                    return (
                      <div className="overflow-x-auto my-6">
                        <table {...props}>{children}</table>
                      </div>
                    );
                  },
                  input({ node, type, checked, ...props }: any) {
                    if (type === 'checkbox') {
                      return (
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled
                          className="mr-2 accent-primary"
                          {...props}
                        />
                      );
                    }
                    return <input type={type} {...props} />;
                  },
                }}
              >
                {project.readme}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center">
              <GitFork size={40} className="mb-4 opacity-30 text-terracotta" />
              <p className="text-base font-serif font-bold text-foreground">Documentação não disponível</p>
              <p className="text-xs font-mono mt-1">Este repositório não possui um arquivo README detalhado.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-parchment flex justify-end gap-3 z-10">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors cursor-pointer"
          >
            Fechar
          </button>
          <Link 
            href={project.url} 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-mono font-medium rounded-sm hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
          >
            <Github size={15} />
            <span>Ver código fonte</span>
          </Link>
        </div>
      </div>
    </div>
  );
}