import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { TechStack } from './components/sections/TechStack';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { StatsCards } from './components/sections/StatsCards';
import { AnalyticsDashboard } from './components/sections/AnalyticsDashboard';
import { Guestbook } from './components/sections/Guestbook';
import { Footer } from './components/layout/Footer';
import { getPortfolioData } from './lib/api';
import { ChatWidget } from './components/ui/ChatWidget';
import { CommandPaletteWrapper } from './components/ui/CommandPaletteWrapper';
import { OvenDivider } from './components/ui/OvenDivider';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const { stats, projects } = await getPortfolioData();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background font-sans selection:bg-primary/10 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* 1. Hero: Fachada do Atelier & Manifesto Autoral */}
          <Hero />

          {/* Forno de Transição */}
          <OvenDivider label="CARTA DE CRIAÇÕES" />

          {/* 2. Projetos em Destaque Principal: Obras do Forno */}
          <Projects data={projects} />

          {/* Forno de Transição */}
          <OvenDivider label="ARSENAL DE INGREDIENTES" />

          {/* 3. Tecnologias & Ingredientes Técnicos (2-Column Bench) */}
          <TechStack />

          {/* Forno de Transição */}
          <OvenDivider label="JORNADA & MATURAÇÃO" />

          {/* 4. Jornada & Maturação Profissional (Composição Balanceada em 2 Colunas) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <Experience />
            </div>
            <div className="lg:col-span-5">
              <Education />
            </div>
          </div>

          {/* Forno de Transição */}
          <OvenDivider label="TELEMETRIA DO LABORATÓRIO" />

          {/* 5. Rigor de Engenharia & Telemetria */}
          <StatsCards stats={stats} />
          <AnalyticsDashboard stats={stats} />

          {/* Forno de Transição */}
          <OvenDivider label="REGISTRO DO BALCÃO" />

          {/* 6. Caderno de Visitas */}
          <Guestbook />

          {/* 7. Rodapé */}
          <Footer />
        </div>
      </main>
      <ChatWidget />
      <CommandPaletteWrapper />
    </>
  );
}