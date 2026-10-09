import { Terminal, X, Clock, ShieldCheck, Zap, Repeat } from "lucide-react";

export function ScoreExplanationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-border bg-parchment">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-terracotta font-semibold">
              Metodologia de Avaliação
            </span>
            <h3 className="font-serif font-bold text-lg text-foreground flex items-center gap-2">
              <Terminal size={16} className="text-terracotta" />
              Algoritmo de Classificação
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs font-mono text-muted-foreground leading-relaxed p-3.5 bg-parchment/60 rounded-xl border border-border/60">
            Este portfólio não é estático. Um worker coleta metadados e estatísticas de uso da API do GitHub para gerar uma classificação automática de <strong className="text-foreground">0 a 100</strong> baseada em 4 pilares:
          </p>

          <div className="space-y-3">
            {/* 1. Recência & Manutenção */}
            <div className="flex gap-3.5 p-3.5 rounded-xl border border-border/80 bg-background hover:bg-parchment/30 transition-colors">
              <div className="p-2.5 bg-terracotta/10 text-terracotta rounded-xl h-fit shrink-0 border border-terracotta/20">
                <Clock size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-serif font-bold text-sm text-foreground">Recência & Manutenção</h4>
                  <span className="text-[11px] font-mono font-bold bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-md border border-terracotta/20">30%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Projetos atualizados recentemente valem mais. Um commit na última semana garante nota máxima neste critério. Projetos &quot;abandonados&quot; há mais de 1 ano perdem relevância.
                </p>
              </div>
            </div>

            {/* 2. Qualidade Estrutural */}
            <div className="flex gap-3.5 p-3.5 rounded-xl border border-border/80 bg-background hover:bg-parchment/30 transition-colors">
              <div className="p-2.5 bg-olive/10 text-olive rounded-xl h-fit shrink-0 border border-olive/20">
                <ShieldCheck size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-serif font-bold text-sm text-foreground">Qualidade Estrutural</h4>
                  <span className="text-[11px] font-mono font-bold bg-olive/10 text-olive px-2 py-0.5 rounded-md border border-olive/20">30%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A IA analisa se o projeto tem <strong className="text-foreground">Testes (Jest/Cypress)</strong>, Pipelines de DevOps, boa documentação (README) e Deploy ativo. Projetos complexos pontuam mais.
                </p>
              </div>
            </div>

            {/* 3. Volume de Atividade */}
            <div className="flex gap-3.5 p-3.5 rounded-xl border border-border/80 bg-background hover:bg-parchment/30 transition-colors">
              <div className="p-2.5 bg-ember/15 text-ember rounded-xl h-fit shrink-0 border border-ember/25">
                <Zap size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-serif font-bold text-sm text-foreground">Volume de Atividade</h4>
                  <span className="text-[11px] font-mono font-bold bg-ember/15 text-ember px-2 py-0.5 rounded-md border border-ember/25">20%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Mede a intensidade do desenvolvimento. Um volume saudável de commits indica um projeto robusto, não apenas um &quot;Hello World&quot;.
                </p>
              </div>
            </div>

            {/* 4. Consistência */}
            <div className="flex gap-3.5 p-3.5 rounded-xl border border-border/80 bg-background hover:bg-parchment/30 transition-colors">
              <div className="p-2.5 bg-warm-brown/15 text-warm-brown rounded-xl h-fit shrink-0 border border-warm-brown/25">
                <Repeat size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-serif font-bold text-sm text-foreground">Consistência</h4>
                  <span className="text-[11px] font-mono font-bold bg-warm-brown/15 text-warm-brown px-2 py-0.5 rounded-md border border-warm-brown/25">20%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Premia a disciplina. Codar um pouco por vários dias vale mais do que fazer 100 commits em um único dia e nunca mais voltar.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="p-4 bg-parchment border-t border-border flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-primary text-primary-foreground text-xs font-mono font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            Fechar Ficha Técnica
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}