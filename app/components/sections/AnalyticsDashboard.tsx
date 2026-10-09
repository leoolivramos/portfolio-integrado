'use client';

import { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { SectionTitle } from '../ui/SectionTitle';
import { BarChart3, Info, X, Activity, Code2, Radar as RadarIcon } from 'lucide-react';
import { Stats } from '../../types';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

/* Artisanal palette for charts */
const COLORS = ['#B94F35', '#65704B', '#D97736', '#873A2A', '#8A8177']; 

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-card border border-border p-3 rounded-xl shadow-xl text-xs"
        style={{ fontFamily: 'var(--font-technical)' }}
      >
        <p className="font-bold mb-1" style={{ fontFamily: 'var(--font-body)' }}>{label}</p>
        <p style={{ color: 'var(--terracotta)' }}>{payload[0].name || 'Valor'}: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function MetricsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center p-5 border-b border-border bg-parchment">
          <h3 className="font-semibold flex items-center gap-2 text-foreground" style={{ fontFamily: 'var(--font-editorial)' }}>
            <Info size={18} className="text-terracotta" />
            Como as métricas são calculadas?
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>
        <div className="p-6 space-y-5 text-sm overflow-y-auto max-h-[70vh]">
          <div className="flex gap-3.5">
            <div className="p-2.5 bg-terracotta/10 rounded-xl h-fit shrink-0 border border-terracotta/20">
              <Activity size={16} className="text-terracotta" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1 text-sm" style={{ fontFamily: 'var(--font-editorial)' }}>Fluxo de Trabalho</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cadência de commits nos <strong>últimos 90 dias</strong>. Dias sem atividade são preservados.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5">
            <div className="p-2.5 bg-olive/10 rounded-xl h-fit shrink-0 border border-olive/20">
              <Code2 size={16} className="text-olive" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1 text-sm" style={{ fontFamily: 'var(--font-editorial)' }}>Especialização Tecnológica</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Distribuição de linguagens em repositórios públicos não arquivados.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5">
            <div className="p-2.5 bg-terracotta/10 rounded-xl h-fit shrink-0 border border-terracotta/20">
              <RadarIcon size={16} className="text-terracotta" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2 text-sm" style={{ fontFamily: 'var(--font-editorial)' }}>Perfil de Engenharia (Radar)</h4>
              
              <div className="grid grid-cols-1 gap-2">
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    <strong className="text-foreground">Velocidade:</strong> Ritmo atual baseado nos últimos 30 dias.
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    <strong className="text-foreground">Volume:</strong> Soma total de commits desde o início da carreira.
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    <strong className="text-foreground">Atividade:</strong> Frequência média de commits.
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    <strong className="text-foreground">Consistência:</strong> Regularidade sem intervalos longos.
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    <strong className="text-foreground">Qualidade:</strong> Saúde dos projetos. Avalia READMEs, descrições claras e boas práticas de versionamento e documentação.
                  </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-parchment border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-foreground text-background text-xs font-mono font-medium rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
          >
            Entendi
          </button>
        </div>

      </div>
      
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

export function AnalyticsDashboard({ stats }: { stats: Stats }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!stats?.charts) return null;

  const activityData = stats.charts.activity || [];
  const languagesData = stats.charts.languages || [];
  const radarData = stats.charts.radar || [];

  const isDark = mounted && theme === 'dark';
  const gridStroke = isDark ? '#3D342A' : '#E0D5C5';
  const textColor = isDark ? '#A89882' : '#8C7A64';

  if (activityData.length === 0 && languagesData.length === 0 && radarData.length === 0) {
    return null;
  }

  return (
    <section id='analyticsdashboard' className="mb-16 relative">
      
      <div>
        <SectionTitle title="Telemetria & Rigor" icon={BarChart3} subtitle="Auditoria de Produção em Tempo Real" />
        <div className="flex justify-between items-center -mt-2 mb-4">
          <p className="text-sm text-muted-foreground">
            Métricas de cadência, distribuição de código e perfil de engenharia auditadas continuamente.
          </p>
          <button
            onClick={() => setShowInfo(true)}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-terracotta transition-colors bg-parchment px-3 py-1.5 rounded-lg border border-border hover:border-terracotta/30 cursor-pointer shadow-xs shrink-0"
          >
            <Info size={13} className="text-terracotta" />
            <span>Metodologia</span>
          </button>
        </div>
      </div>

      {showInfo && <MetricsModal onClose={() => setShowInfo(false)} />}
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        
        {activityData.length > 0 && (
          <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6 h-[320px] relative overflow-hidden card-elevate">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta/40 via-ember/30 to-transparent" />
            <div className="flex items-center justify-between mb-4">
              <h3 
                className="font-mono text-xs text-warm-brown uppercase tracking-widest font-semibold flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                Cadência de Commits (Últimos 90 Dias)
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground bg-parchment px-2.5 py-0.5 rounded-md border border-border">
                STREAM CONTÍNUA
              </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--terracotta)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--terracotta)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 10, fill: textColor, fontFamily: 'var(--font-technical)'}}
                  axisLine={false} 
                  tickLine={false} 
                  minTickGap={30}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="commits" 
                  stroke="var(--terracotta)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCommits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {languagesData.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 h-[320px] flex flex-col relative overflow-hidden card-elevate">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-olive/40 via-transparent to-transparent" />
            <h3 
              className="font-mono text-xs text-warm-brown uppercase tracking-widest font-semibold mb-2 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-olive" />
              Composição das Matérias-Primas (Linguagens)
            </h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languagesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {languagesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {languagesData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {radarData.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 h-[320px] w-full relative overflow-hidden card-elevate flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta/40 via-transparent to-transparent" />
            <h3 
              className="font-mono text-xs text-warm-brown uppercase tracking-widest font-semibold mb-2 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Perfil de Engenharia & Equilíbrio
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke={gridStroke} opacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 10, fontFamily: 'var(--font-technical)' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="var(--olive)"
                  strokeWidth={2}
                  fill="var(--olive)"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

      </motion.div>
    </section>
  );
}