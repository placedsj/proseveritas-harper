
import React, { useState } from 'react';
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
import { LayoutDashboard, Scale, Calculator, Briefcase, Compass, Map, Cpu, ShieldAlert, Package } from 'lucide-react';

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
      
      {/* Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-24 bg-slate-900 border-r border-slate-800 py-6 items-center z-50">
        <div className="mb-6">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-bold text-2xl text-white transform -rotate-3">SDG</div>
        </div>
        
        <div className="space-y-4 w-full px-2 flex-1 overflow-y-auto scrollbar-none">
          {NAV_ITEMS.map((item) => (
            <NavButton key={item.target} {...item} />
          ))}
        </div>
        
        <div className="mt-auto pb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mx-auto" title="System Online" />
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white">SDG</div>
          <h1 className="font-bold text-lg text-white tracking-tight">SCHULZ DEFENSE GRID</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-green-500 font-mono bg-green-900/20 px-2 py-1 rounded">ONLINE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-24 max-w-6xl mx-auto w-full mb-20 md:mb-0">
        <div className="animate-fade-in">
          {view === 'dashboard' && <Dashboard onNavigate={setView} />}
          {view === 'scott-schedule' && <ScottSchedule />}
          {view === 'abuse-log' && <AbuseLog />}
          {view === 'custody-math' && <CustodyMath />}
          {view === 'business' && <BusinessCommand />}
          {view === 'products' && <ProductLab />}
          {view === 'strategy' && <StrategyRoom />}
          {view === 'roadmap' && <Roadmap />}
          {view === 'cofounder' && <CoFounderChat />}
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
      </nav>
    </div>
  );
};

export default App;
