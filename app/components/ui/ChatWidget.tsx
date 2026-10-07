'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Olá! Sou o assistente técnico do portfólio. Analisei o acervo de Leonardo (commits, projetos, arquiteturas e stack). O que você gostaria de consultar?'
      }
    ]
  });

  const suggestions = [
    "Qual a stack favorita de Leonardo?",
    "Resuma sua experiência com Backend",
    "Como foi feito este portfólio?"
  ];

  const handleSuggestionClick = (text: string) => {
    append({
      role: 'user',
      content: text
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">

      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[390px] h-[72vh] sm:h-[520px] max-h-[calc(100dvh-120px)] bg-card border border-border rounded-sm shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">

          {/* Header */}
          <div className="p-4 flex justify-between items-center bg-parchment border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
                <Sparkles size={14} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-foreground">Terminal do Laboratório</h3>
                <p className="text-[10px] font-mono text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-olive rounded-full animate-pulse"/>
                  Assistente IA • LLaMA / OSS
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground p-1 rounded-sm hover:bg-muted transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 border border-border font-mono text-xs
                  ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-parchment text-terracotta'}`}>
                  {m.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                </div>

                <div className={`px-3.5 py-2.5 rounded-sm text-xs leading-relaxed max-w-[85%] shadow-xs overflow-hidden
                  ${m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground'}`}>
                  
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({children}) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="pl-1">{children}</li>,
                        a: ({href, children}) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline font-medium break-all">
                            {children}
                          </a>
                        ),
                        strong: ({children}) => <span className="font-bold text-foreground">{children}</span>,
                        code: ({children, className, ...props}) => {
                          const isInline = !className?.includes('language-');
                          return isInline ? (
                            <code className="bg-parchment px-1.5 py-0.5 rounded-sm text-[11px] font-mono border border-border text-terracotta">
                              {children}
                            </code>
                          ) : (
                            <div className="my-2 rounded-sm overflow-hidden border border-border bg-charcoal text-cream">
                              <div className="bg-black/30 px-2.5 py-1 border-b border-border text-[9px] font-mono text-muted-foreground uppercase">
                                Snippet
                              </div>
                              <code className="block p-2.5 text-[11px] font-mono overflow-x-auto">
                                {children}
                              </code>
                            </div>
                          );
                        }
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-sm bg-parchment border border-border text-terracotta flex items-center justify-center shrink-0">
                  <Bot size={13} />
                </div>
                <div className="bg-card border border-border px-3 py-2 rounded-sm shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-terracotta rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-terracotta rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-terracotta rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && !isLoading && (
            <div className="px-3 pb-2 pt-1 flex gap-2 overflow-x-auto bg-background/50 border-t border-border/40">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="whitespace-nowrap flex items-center gap-1.5 text-[11px] font-mono bg-parchment border border-border hover:border-terracotta hover:text-terracotta transition-colors rounded-sm px-2.5 py-1 text-muted-foreground cursor-pointer"
                >
                  {suggestion}
                  <ArrowRight size={10} className="opacity-50" />
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-parchment border-t border-border flex gap-2">
            <input
              className="flex-1 bg-background border border-border focus:border-primary rounded-sm px-3 py-2 text-xs font-sans outline-none transition-all placeholder:text-muted-foreground text-foreground"
              value={input}
              onChange={handleInputChange}
              placeholder="Pergunte sobre código, stack ou arquitetura..."
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary text-primary-foreground p-2 rounded-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs flex items-center justify-center w-8 h-8 cursor-pointer"
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative h-12 w-12 rounded-sm bg-primary text-primary-foreground shadow-lg hover:opacity-95 transition-all flex items-center justify-center border border-border cursor-pointer"
        aria-label="Abrir assistente IA"
      >
        <div className="absolute inset-0 rounded-sm bg-terracotta/20 animate-ping opacity-0 group-hover:opacity-100 duration-1000 pointer-events-none" />
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}

        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-olive"></span>
          </span>
        )}
      </button>
    </div>
  );
}