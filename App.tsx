
import React, { useState, Suspense, lazy } from 'react';
import { ViewState } from './types';
import Dashboard from './components/Dashboard';
import { GlobalSearch } from './components/GlobalSearch';
import { NavButton } from './components/NavButton';
import { LayoutDashboard, Scale, Search, Map, Heart, Landmark, Database, Fingerprint, GraduationCap, Activity, Calculator, Briefcase, Compass, Package, Stethoscope } from 'lucide-react';

const ScottSchedule = lazy(() => import('./components/ScottSchedule'));
const CustodyMath = lazy(() => import('./components/CustodyMath'));
const BusinessCommand = lazy(() => import('./components/BusinessCommand'));
const StrategyRoom = lazy(() => import('./components/StrategyRoom'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const ProductLab = lazy(() => import('./components/ProductLab'));
const PowerMonitor = lazy(() => import('./components/PowerMonitor'));
const MedicalRecords = lazy(() => import('./components/MedicalRecords').then(module => ({ default: module.MedicalRecords })));
const EvidenceProcessor = lazy(() => import('./components/EvidenceProcessor'));
const MoralCompass = lazy(() => import('./components/MoralCompass'));
const ParentingPlan = lazy(() => import('./components/ParentingPlan'));
const EducationBuild = lazy(() => import('./components/EducationBuild'));
const HealthRehab = lazy(() => import('./components/HealthRehab'));
const HarperLog = lazy(() => import('./components/HarperLog'));
const GovBenefits = lazy(() => import('./components/GovBenefits'));
const LegalSRL = lazy(() => import('./components/LegalSRL'));
const DadBuildPlan = lazy(() => import('./components/DadBuildPlan'));
const DiscoveryArchive = lazy(() => import('./components/DiscoveryArchive'));
const SystemAudit = lazy(() => import('./components/SystemAudit'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans selection:bg-red-100 selection:text-red-900">
      
      {/* Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-24 bg-white border-r border-slate-200 py-6 items-center z-50 overflow-y-auto scrollbar-hide shadow-sm">
        <div className="mb-6 flex-shrink-0">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-bold text-2xl text-white transform -rotate-3 shadow-lg shadow-red-200">SDG</div>
        </div>
        
        <div className="space-y-4 w-full px-2">
          <NavButton target="dashboard" icon={LayoutDashboard} label="Cmd" currentView={view} onNavigate={setView} />
          <NavButton target="discovery-archive" icon={Database} label="Archive" currentView={view} onNavigate={setView} />
          <NavButton target="system-audit" icon={Fingerprint} label="Audit" currentView={view} onNavigate={setView} />
          <NavButton target="harper-log" icon={Heart} label="Harper" currentView={view} onNavigate={setView} />
          <NavButton target="education-build" icon={GraduationCap} label="Build" currentView={view} onNavigate={setView} />
          <NavButton target="health-rehab" icon={Activity} label="Health" currentView={view} onNavigate={setView} />
          <NavButton target="gov-benefits" icon={Landmark} label="Gov" currentView={view} onNavigate={setView} />
          <NavButton target="scott-schedule" icon={Scale} label="Scott" currentView={view} onNavigate={setView} />
          <NavButton target="custody-math" icon={Calculator} label="Math" currentView={view} onNavigate={setView} />
          <NavButton target="business" icon={Briefcase} label="Biz" currentView={view} onNavigate={setView} />
          <NavButton target="strategy" icon={Compass} label="Plan" currentView={view} onNavigate={setView} />
          <NavButton target="roadmap" icon={Map} label="Map" currentView={view} onNavigate={setView} />
          <NavButton target="products" icon={Package} label="Lab" currentView={view} onNavigate={setView} />
          <NavButton target="power-monitor" icon={Activity} label="Pwr" currentView={view} onNavigate={setView} />
          <NavButton target="processor" icon={Map} label="Evidence" currentView={view} onNavigate={setView} />
          <NavButton target="medical-records" icon={Stethoscope} label="Med" currentView={view} onNavigate={setView} />
        </div>
        
        <div className="mt-auto py-6 space-y-4 flex flex-col items-center flex-shrink-0">
          <button onClick={toggleSearch} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <Search className="w-6 h-6" />
          </button>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mx-auto shadow-sm" title="System Online" />
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden bg-white p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-red-200">SDG</div>
          <h1 className="font-bold text-lg text-slate-900 tracking-tight uppercase">Defense Grid</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleSearch} className="text-slate-400 hover:text-slate-900">
            <Search className="w-6 h-6" />
          </button>
          <span className="text-xs text-green-600 font-mono bg-green-50 px-2 py-1 rounded border border-green-100">ONLINE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-24 max-w-6xl mx-auto w-full mb-20 md:mb-0">
        <div className="animate-fade-in">
          <Suspense fallback={<LoadingSpinner />}>
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
            {view === 'products' && <ProductLab />}
            {view === 'power-monitor' && <PowerMonitor />}
            {view === 'medical-records' && <MedicalRecords />}
            {view === 'processor' && <EvidenceProcessor />}
          </Suspense>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex justify-around z-50 overflow-x-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button onClick={() => setView('dashboard')} className={`p-2 min-w-[50px] ${view === 'dashboard' ? 'text-red-600' : 'text-slate-400'}`}><LayoutDashboard className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('discovery-archive')} className={`p-2 min-w-[50px] ${view === 'discovery-archive' ? 'text-indigo-600' : 'text-slate-400'}`}><Database className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('harper-log')} className={`p-2 min-w-[50px] ${view === 'harper-log' ? 'text-pink-600' : 'text-slate-400'}`}><Heart className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('system-audit')} className={`p-2 min-w-[50px] ${view === 'system-audit' ? 'text-blue-600' : 'text-slate-400'}`}><Fingerprint className="w-6 h-6 mx-auto" /></button>
        <button onClick={() => setView('scott-schedule')} className={`p-2 min-w-[50px] ${view === 'scott-schedule' ? 'text-red-600' : 'text-slate-400'}`}><Scale className="w-6 h-6 mx-auto" /></button>
      </nav>

      <GlobalSearch isOpen={isSearchOpen} onClose={toggleSearch} onNavigate={setView} />
    </div>
  );
};

export default App;
