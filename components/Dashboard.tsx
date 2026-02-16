
import React, { useState, useEffect } from 'react';
import { Scale, ArrowRight, Star, FileText, GraduationCap, Heart, Activity, Landmark, Gavel, ShieldCheck, Search, Map, Package } from 'lucide-react';
import { ProcessedEvidenceItem, ScottLogEntry, SystemAuditLog, MedicalRecord } from '../types';

interface DashboardProps {
  onNavigate: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  const [sentencingDays, setSentencingDays] = useState(0);
  const [stats] = useState(() => {
    // Load dynamic stats from localStorage
    try {
      const evidence: ProcessedEvidenceItem[] = JSON.parse(localStorage.getItem('evidence') || '[]');
      const scottLogs: ScottLogEntry[] = JSON.parse(localStorage.getItem('scottLogs') || '[]');
      const systemAuditLogs: SystemAuditLog[] = JSON.parse(localStorage.getItem('systemAuditLogs') || '[]');
      const medicalRecords: MedicalRecord[] = JSON.parse(localStorage.getItem('medicalRecords') || '[]');

      return {
        verifiedExhibits: evidence.filter(e => e.verified).length,
        daysDenied: scottLogs.filter(l => l.category === 'Denial of Parenting Time').length,
        auditTargets: systemAuditLogs.length,
        sjrhPages: medicalRecords.reduce((sum, r) => sum + (r.pageCount || 0), 0)
      };
    } catch (e) {
      console.error("Failed to load dashboard stats", e);
      return { verifiedExhibits: 0, daysDenied: 0, auditTargets: 0, sjrhPages: 0 };
    }
  });

  useEffect(() => {
    const target = new Date('2026-03-30T09:30:00');
    const sentencing = new Date('2026-03-03T09:00:00');
    
    const calculate = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      const sDiff = sentencing.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        });
      }
      setSentencingDays(Math.floor(sDiff / (1000 * 60 * 60 * 24)));
    };

    calculate();
    const timer = setInterval(calculate, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* MISSION DIRECTIVE SECTION */}
      <button
        type="button"
        onClick={() => onNavigate('moral-compass')}
        className="w-full text-left bg-white border border-red-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-red-400 hover:shadow-md transition-all duration-200 group"
      >
        <div className="flex items-center gap-4 text-left">
           <div className="bg-red-50 p-2 rounded-lg border border-red-100 group-hover:bg-red-100 transition-colors">
               <ShieldCheck className="w-5 h-5 text-red-600" />
           </div>
           <div>
               <h2 className="text-xs font-black text-red-600 uppercase tracking-widest">Status: Pro Se Command</h2>
               <p className="text-slate-700 text-sm font-bold italic">"Counsel Withdrawn. Direct control established. Truth is the only attorney."</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-red-500/80 font-mono">SRL-ACTIVE</span>
          <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* DUAL ALERT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-indigo-200 rounded-xl p-6 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4 w-full mb-4">
               <div className="bg-indigo-50 p-3 rounded-full border border-indigo-100">
                   <Gavel className="w-6 h-6 text-indigo-600" />
               </div>
               <div className="text-left">
                   <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest leading-none">Custody Hearing</h2>
                   <p className="text-indigo-600 text-xs font-bold mt-1">March 30, 2026</p>
               </div>
          </div>
          <div className="flex gap-4 text-center w-full justify-center">
              <div className="bg-slate-50 p-3 rounded-lg min-w-[80px] border border-slate-200">
                  <span className="block text-3xl font-mono font-bold text-slate-900">{timeLeft.days}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Days</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg min-w-[80px] border border-slate-200">
                  <span className="block text-3xl font-mono font-bold text-slate-900">{timeLeft.hours}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Hours</span>
              </div>
          </div>
        </div>

        <div className="bg-white border border-blue-200 rounded-xl p-6 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4 w-full mb-4">
               <div className="bg-blue-50 p-3 rounded-full border border-blue-100">
                   <Scale className="w-6 h-6 text-blue-600" />
               </div>
               <div className="text-left">
                   <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest leading-none">Sentencing</h2>
                   <p className="text-blue-600 text-xs font-bold mt-1">March 3, 2026 (Judge Palmer)</p>
               </div>
          </div>
          <div className="w-full flex justify-center">
              <div className="bg-slate-50 p-3 rounded-lg min-w-[170px] text-center border border-slate-200">
                  <span className="block text-3xl font-mono font-bold text-slate-900">{sentencingDays} DAYS</span>
                  <span className="text-[10px] text-blue-500 uppercase font-bold tracking-tighter">Back with Acquittal Judge</span>
              </div>
          </div>
        </div>
      </div>

      {/* TRACKERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => onNavigate('education-build')}
          className="w-full text-left bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md cursor-pointer group transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Academic</span>
          </div>
          <h3 className="text-slate-900 font-bold">CAEC / Upgrade Track</h3>
          <p className="text-xs text-slate-500 mt-1">Educational readiness verified. Credits progressing.</p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('harper-log')}
          className="w-full text-left bg-white p-5 rounded-xl border border-slate-200 hover:border-pink-400 hover:shadow-md cursor-pointer group transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <Heart className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Safety</span>
          </div>
          <h3 className="text-slate-900 font-bold">Clinical Alert Log</h3>
          <p className="text-xs text-slate-500 mt-1">Pattern of health and visitation logged.</p>
        </button>

        {/* Module 4 */}
        <button
          type="button"
          onClick={() => onNavigate('roadmap')}
          className="w-full bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-orange-500 cursor-pointer group transition-all text-left"
        >
            <div className="flex justify-between items-start mb-4">
                <Map className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Execution Roadmap</h3>
            <p className="text-sm text-slate-400">Track tasks, growth, tech, and legal milestones.</p>
        </button>

        {/* Module 5 */}
        <button
          type="button"
          onClick={() => onNavigate('products')}
          className="w-full bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500 cursor-pointer group transition-all text-left"
        >
            <div className="flex justify-between items-start mb-4">
                <Package className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Product Lab</h3>
            <p className="text-sm text-slate-400">Manage product tiers, specs, and inventory.</p>
        </button>

        {/* Module 6 */}
        <button
          type="button"
          onClick={() => onNavigate('power-monitor')}
          className="w-full bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-yellow-500 cursor-pointer group transition-all text-left"
        >
            <div className="flex justify-between items-start mb-4">
                <Activity className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Power Monitor</h3>
            <p className="text-sm text-slate-400">Live monitoring of power load, temperature, and status.</p>
        </button>
      </div>

      {/* EXHIBIT OVERVIEW */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 text-left shadow-sm">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Global Discovery Summary
         </h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
               <p className="text-slate-900 font-bold text-xl">{stats.verifiedExhibits}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Verified Exhibits</p>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
               <p className="text-blue-600 font-bold text-xl">{stats.daysDenied}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Days Denied</p>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
               <p className="text-indigo-600 font-bold text-xl">{stats.auditTargets}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Audit Targets</p>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
               <p className="text-amber-600 font-bold text-xl">{stats.sjrhPages}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">SJRH Pages</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
