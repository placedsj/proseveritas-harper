
import React, { useState, useEffect } from 'react';
import { Scale, ArrowRight, Star, FileText, GraduationCap, Heart, Activity, Landmark, Gavel, ShieldCheck, Search } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  const [sentencingDays, setSentencingDays] = useState(0);

  useEffect(() => {
    // Primary Target: Custody Hearing March 30
    const target = new Date('2026-03-30T09:30:00');
    // Secondary Target: Sentencing March 3 (Judge Palmer)
    const sentencing = new Date('2026-03-03T09:00:00');
    
    const timer = setInterval(() => {
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
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* MISSION DIRECTIVE SECTION */}
      <div 
        onClick={() => onNavigate('moral-compass')}
        className="bg-gradient-to-r from-red-900/40 to-slate-900 border border-red-500/30 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-red-500 transition-all"
      >
        <div className="flex items-center gap-4 text-left">
           <div className="bg-red-500/20 p-2 rounded-lg">
               <ShieldCheck className="w-5 h-5 text-red-500" />
           </div>
           <div>
               <h2 className="text-xs font-black text-red-500 uppercase tracking-widest">Status: Pro Se Command</h2>
               <p className="text-white text-sm font-bold italic">"Counsel Withdrawn. Direct control established. Truth is the only attorney."</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-red-500/60 font-mono">SRL-ACTIVE</span>
          <ArrowRight className="w-4 h-4 text-red-500 opacity-50" />
        </div>
      </div>

      {/* DUAL ALERT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-700 rounded-xl p-6 flex flex-col items-center justify-between shadow-lg shadow-indigo-900/20">
          <div className="flex items-center gap-4 w-full mb-4">
               <div className="bg-indigo-600 p-3 rounded-full animate-pulse">
                   <Gavel className="w-6 h-6 text-white" />
               </div>
               <div className="text-left">
                   <h2 className="text-xl font-black text-white uppercase tracking-widest leading-none">Custody Hearing</h2>
                   <p className="text-indigo-300 text-xs font-semibold mt-1">March 30, 2026</p>
               </div>
          </div>
          <div className="flex gap-4 text-center w-full justify-center">
              <div className="bg-black/30 p-3 rounded-lg min-w-[80px]">
                  <span className="block text-3xl font-mono font-bold text-white">{timeLeft.days}</span>
                  <span className="text-[10px] text-indigo-400 uppercase font-bold">Days</span>
              </div>
              <div className="bg-black/30 p-3 rounded-lg min-w-[80px]">
                  <span className="block text-3xl font-mono font-bold text-white">{timeLeft.hours}</span>
                  <span className="text-[10px] text-indigo-400 uppercase font-bold">Hours</span>
              </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-700 rounded-xl p-6 flex flex-col items-center justify-between">
          <div className="flex items-center gap-4 w-full mb-4">
               <div className="bg-blue-600 p-3 rounded-full">
                   <Scale className="w-6 h-6 text-white" />
               </div>
               <div className="text-left">
                   <h2 className="text-xl font-black text-white uppercase tracking-widest leading-none">Sentencing</h2>
                   <p className="text-blue-300 text-xs font-semibold mt-1">March 3, 2026 (Judge Palmer)</p>
               </div>
          </div>
          <div className="w-full flex justify-center">
              <div className="bg-black/30 p-3 rounded-lg min-w-[170px] text-center">
                  <span className="block text-3xl font-mono font-bold text-white">{sentencingDays} DAYS</span>
                  <span className="text-[10px] text-blue-400 uppercase font-bold tracking-tighter">Back with Acquittal Judge</span>
              </div>
          </div>
        </div>
      </div>

      {/* TRACKERS - GRID RECALIBRATED TO 2 COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => onNavigate('education-build')} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-indigo-500 cursor-pointer group transition-all text-left">
          <div className="flex justify-between items-start mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Academic</span>
          </div>
          <h3 className="text-white font-bold">CAEC / Upgrade Track</h3>
          <p className="text-xs text-slate-400 mt-1">Educational readiness verified. Credits progressing.</p>
        </div>

        <div onClick={() => onNavigate('harper-log')} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-pink-500 cursor-pointer group transition-all text-left">
          <div className="flex justify-between items-start mb-4">
            <Heart className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Safety</span>
          </div>
          <h3 className="text-white font-bold">Clinical Alert Log</h3>
          <p className="text-xs text-slate-400 mt-1">Pattern of health and visitation logged.</p>
        </div>
      </div>

      {/* EXHIBIT OVERVIEW */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-left">
         <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Global Discovery Summary
         </h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-white font-bold text-xl">87</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Verified Exhibits</p>
            </div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-blue-400 font-bold text-xl">129</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Days Denied</p>
            </div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-indigo-400 font-bold text-xl">4</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Audit Targets</p>
            </div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-amber-500 font-bold text-xl">36</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">SJRH Pages</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
