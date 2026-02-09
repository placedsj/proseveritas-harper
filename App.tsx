
import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import Dashboard from './components/Dashboard';
import ScottSchedule from './components/ScottSchedule';
import CustodyMath from './components/CustodyMath';
import BusinessCommand from './components/BusinessCommand';
import StrategyRoom from './components/StrategyRoom';
import Roadmap from './components/Roadmap';
import CoFounderChat from './components/CoFounderChat';
import AbuseLog from './components/AbuseLog';
import ProductLab from './components/ProductLab';
import GlobalSearch from './components/GlobalSearch';
import { LayoutDashboard, Scale, Calculator, Briefcase, Compass, Map, Cpu, ShieldAlert, Package } from 'lucide-react';
import { MedicalRecords } from './components/MedicalRecords';
import EvidenceProcessor from './components/EvidenceProcessor';
import { GlobalSearch } from './components/GlobalSearch';
import MoralCompass from './components/MoralCompass';
import ParentingPlan from './components/ParentingPlan';
import EducationBuild from './components/EducationBuild';
import HealthRehab from './components/HealthRehab';
import HarperLog from './components/HarperLog';
import GovBenefits from './components/GovBenefits';
import LegalSRL from './components/LegalSRL';
import DadBuildPlan from './components/DadBuildPlan';
import DiscoveryArchive from './components/DiscoveryArchive';
import SystemAudit from './components/SystemAudit';

import { LayoutDashboard, Scale, Calculator, Briefcase, Compass, Stethoscope, Search, Map, Star, FileText, GraduationCap, Activity, Heart, Landmark, Gavel, Database, Fingerprint } from 'lucide-react';

const NAV_ITEMS: { target: ViewState, icon: any, label: string }[] = [
  { target: 'dashboard', icon: LayoutDashboard, label: 'Cmd' },
  { target: 'scott-schedule', icon: Scale, label: 'Scott' },
  { target: 'abuse-log', icon: ShieldAlert, label: 'Log' },
  { target: 'custody-math', icon: Calculator, label: 'Math' },
  { target: 'business', icon: Briefcase, label: 'Biz' },
  { target: 'products', icon: Package, label: 'Prods' },
  { target: 'strategy', icon: Compass, label: 'Plan' },
  { target: 'roadmap', icon: Map, label: 'Map' },
  { target: 'cofounder', icon: Cpu, label: 'AI' },
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const NavButton = ({ target, icon: Icon, label }: { target: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => setView(target)}
      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full ${
        view === target 
          ? 'bg-red-600 text-white shadow-lg shadow-red-900/50' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={setView} />
      
      {/* Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-24 bg-slate-900 border-r border-slate-800 py-6 items-center z-50 overflow-y-auto scrollbar-hide">
        <div className="mb-6 flex-shrink-0">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-bold text-2xl text-white transform -rotate-3 shadow-lg shadow-red-600/20">SDG</div>
        </div>
        
        <div className="space-y-4 w-full px-2 flex-1 overflow-y-auto scrollbar-none">
          {NAV_ITEMS.map((item) => (
            <NavButton key={item.target} {...item} />
          ))}
        <div className="space-y-4 w-full px-2">
          <NavButton target="dashboard" icon={LayoutDashboard} label="Cmd" />
          <NavButton target="discovery-archive" icon={Database} label="Archive" />
          <NavButton target="system-audit" icon={Fingerprint} label="Audit" />
          <NavButton target="harper-log" icon={Heart} label="Harper" />
          <NavButton target="education-build" icon={GraduationCap} label="Build" />
          <NavButton target="health-rehab" icon={Activity} label="Health" />
          <NavButton target="gov-benefits" icon={Landmark} label="Gov" />
          <NavButton target="scott-schedule" icon={Scale} label="Scott" />
          <NavButton target="processor" icon={Map} label="Evidence" />
          <NavButton target="business" icon={Briefcase} label="Biz" />
        </div>
        
        <div className="mt-auto py-6 space-y-4 flex flex-col items-center flex-shrink-0">
          <button onClick={toggleSearch} className="p-2 text-slate-400 hover:text-white transition-colors">
            <Search className="w-6 h-6" />
          </button>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mx-auto" title="System Online" />
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white">SDG</div>
          <h1 className="font-bold text-lg text-white tracking-tight uppercase">Defense Grid</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleSearch} className="text-slate-400 hover:text-white">
            <Search className="w-6 h-6" />
          </button>
          <span className="text-xs text-green-500 font-mono bg-green-900/20 px-2 py-1 rounded">ONLINE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-24 max-w-6xl mx-auto w-full mb-20 md:mb-0">
        <div className="animate-fade-in">
          {view === 'dashboard' && <Dashboard onNavigate={setView} />}
          {view === 'discovery-archive' && <DiscoveryArchive />}
          {view === 'system-audit' && <SystemAudit />}
          {view === 'moral-compass' && <MoralCompass />}
          {view === 'parenting-plan' && <ParentingPlan />}
          {view === 'harper-log' && <HarperLog />}
          {view === 'education-build' && <EducationBuild />}
          {view === 'health-rehab' && <HealthRehab />}
          {view === 'gov-benefits' && <GovBenefits />}
          {view === 'legal-srl' && <LegalSRL />}
          {view === 'build-plan' && <DadBuildPlan />}
          {view === 'scott-schedule' && <ScottSchedule />}
          {view === 'custody-math' && <CustodyMath />}
          {view === 'business' && <BusinessCommand />}
          {view === 'strategy' && <StrategyRoom />}
          {view === 'roadmap' && <Roadmap />}
          {view === 'medical-records' && <MedicalRecords />}
          {view === 'processor' && <EvidenceProcessor />}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 flex gap-4 overflow-x-auto z-50 px-4">
        {NAV_ITEMS.map(({ target, icon: Icon }) => (
          <button
            key={target}
            onClick={() => setView(target)}
            className={`p-2 min-w-[40px] ${
              view === target ? 'text-red-500' : 'text-slate-500'
            }`}
          >
            <Icon className="w-6 h-6 mx-auto" />
          </button>
        ))}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 flex justify-around z-50 overflow-x-auto">
        <button onClick={() => setView('dashboard')} className={`p-2 min-w-[50px] ${view === 'dashboard' ? 'text-red-500' : 'text-slate-500'}`}><LayoutDashboard className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('discovery-archive')} className={`p-2 min-w-[50px] ${view === 'discovery-archive' ? 'text-indigo-500' : 'text-slate-500'}`}><Database className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('harper-log')} className={`p-2 min-w-[50px] ${view === 'harper-log' ? 'text-pink-500' : 'text-slate-500'}`}><Heart className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('system-audit')} className={`p-2 min-w-[50px] ${view === 'system-audit' ? 'text-blue-500' : 'text-slate-500'}`}><Fingerprint className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('scott-schedule')} className={`p-2 min-w-[50px] ${view === 'scott-schedule' ? 'text-red-500' : 'text-slate-500'}`}><Scale className="w-6 h-6 mx-auto" /></button>
      </nav>

      <GlobalSearch isOpen={isSearchOpen} onClose={toggleSearch} onNavigate={setView} />
    </div>
  );
};

export default App;
