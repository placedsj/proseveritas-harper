import React, { useState } from 'react';
import { ViewState } from './types';
import Dashboard from './components/Dashboard';
import ProductLab from './components/ProductLab';
import PowerMonitor from './components/PowerMonitor';
import StrategyRoom from './components/StrategyRoom';
import CoFounderChat from './components/CoFounderChat';
import Roadmap from './components/Roadmap';
import { LayoutDashboard, Package, Activity, Compass, MessageSquare, Map } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');

  const NavButton = ({ target, icon: Icon, label }: { target: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => setView(target)}
      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full ${
        view === target 
          ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50' 
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
        <div className="mb-8">
          <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center font-bold text-2xl text-white transform -rotate-3">P</div>
        </div>
        
        <div className="space-y-4 w-full px-2">
          <NavButton target="dashboard" icon={LayoutDashboard} label="Dash" />
          <NavButton target="roadmap" icon={Map} label="Map" />
          <NavButton target="products" icon={Package} label="Kits" />
          <NavButton target="monitor" icon={Activity} label="Live" />
          <NavButton target="strategy" icon={Compass} label="Plan" />
          <NavButton target="cofounder" icon={MessageSquare} label="AI" />
        </div>
        
        <div className="mt-auto pb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mx-auto" title="System Online" />
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white">P</div>
          <h1 className="font-bold text-lg text-white tracking-tight">PLACED OS</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-green-500 font-mono bg-green-900/20 px-2 py-1 rounded">ONLINE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-24 max-w-7xl mx-auto w-full">
        <div className="animate-fade-in">
          {view === 'dashboard' && <Dashboard />}
          {view === 'roadmap' && <Roadmap />}
          {view === 'products' && <ProductLab />}
          {view === 'monitor' && <PowerMonitor />}
          {view === 'strategy' && <StrategyRoom />}
          {view === 'cofounder' && <CoFounderChat />}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 flex justify-around z-50 overflow-x-auto">
        <button onClick={() => setView('dashboard')} className={`p-2 min-w-[50px] ${view === 'dashboard' ? 'text-orange-500' : 'text-slate-500'}`}><LayoutDashboard className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('roadmap')} className={`p-2 min-w-[50px] ${view === 'roadmap' ? 'text-orange-500' : 'text-slate-500'}`}><Map className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('products')} className={`p-2 min-w-[50px] ${view === 'products' ? 'text-orange-500' : 'text-slate-500'}`}><Package className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('monitor')} className={`p-2 min-w-[50px] ${view === 'monitor' ? 'text-orange-500' : 'text-slate-500'}`}><Activity className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('cofounder')} className={`p-2 min-w-[50px] ${view === 'cofounder' ? 'text-orange-500' : 'text-slate-500'}`}><MessageSquare className="w-6 h-6 mx-auto" /></button>
      </nav>
    </div>
  );
};

export default App;