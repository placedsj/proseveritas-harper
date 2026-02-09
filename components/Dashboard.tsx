
import React, { useState, useEffect } from 'react';
import { Scale, ArrowRight, Star, FileText, GraduationCap, Heart, Activity, Landmark, Gavel, ShieldCheck } from 'lucide-react';
import { EvidenceItem, ParentingBlock, CourtEvent, MedicalRecord } from '../types';

interface DashboardProps {
  onNavigate: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Lazy initialization for synchronous data loading from localStorage
  const [stats, setStats] = useState(() => {
    try {
      const evidenceItems: EvidenceItem[] = JSON.parse(localStorage.getItem('evidenceItems') || '[]');
      const custodyBlocks: ParentingBlock[] = JSON.parse(localStorage.getItem('custodyBlocks') || '[]');
      const medicalRecords: MedicalRecord[] = JSON.parse(localStorage.getItem('medicalRecords') || '[]');
      const soberStart = localStorage.getItem('soberStartDate') || '2025-01-25';

      const verifiedCount = evidenceItems.filter(i => i.status === 'ready').length;
      const deniedHrs = custodyBlocks.reduce((acc, b) => acc + (b.status === 'Denied by Mother' ? b.hoursLost : 0), 0);
      const recordsCount = medicalRecords.length;

      const start = new Date(soberStart).getTime();
      const now = new Date().getTime();
      const sDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));

      return {
        verifiedExhibits: verifiedCount,
        deniedHours: deniedHrs,
        soberDays: sDays,
        medicalRecordsCount: recordsCount
      };
    } catch (e) {
      console.error("Error loading dashboard stats:", e);
      return { verifiedExhibits: 0, deniedHours: 0, soberDays: 0, medicalRecordsCount: 0 };
    }
  });

  const [courtDates, setCourtDates] = useState(() => {
    try {
      const courtEvents: CourtEvent[] = JSON.parse(localStorage.getItem('courtEvents') || '[]');
      const futureEvents = courtEvents.filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0))).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const nextCustody = futureEvents.find(e => e.caseName === 'Family Law' || e.requiredAction.toLowerCase().includes('custody')) || null;
      const nextSentencing = futureEvents.find(e => e.caseName === 'Criminal Defense' || e.requiredAction.toLowerCase().includes('sentencing')) || null;

      return { custody: nextCustody, sentencing: nextSentencing };
    } catch (e) {
      console.error("Error loading court dates:", e);
      return { custody: null, sentencing: null };
    }
  });

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  const [sentencingDays, setSentencingDays] = useState(0);

  useEffect(() => {
    // TIMERS FOR HEADERS
    const targetDate = courtDates.custody ? new Date(`${courtDates.custody.date}T09:30:00`) : new Date('2026-03-30T09:30:00');
    const sentencingDate = courtDates.sentencing ? new Date(`${courtDates.sentencing.date}T09:00:00`) : new Date('2026-03-03T09:00:00');
    
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const sDiff = sentencingDate.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        });
      } else {
         setTimeLeft({ days: 0, hours: 0 });
      }

      const sDays = Math.floor(sDiff / (1000 * 60 * 60 * 24));
      setSentencingDays(sDays > 0 ? sDays : 0);
    };

    calculateTime(); // Run immediately
    const timer = setInterval(calculateTime, 1000 * 60);

    return () => clearInterval(timer);
  }, [courtDates]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* MISSION DIRECTIVE SECTION */}
      <div 
        onClick={() => onNavigate('moral-compass')}
        className="bg-gradient-to-r from-red-900/40 to-slate-900 border border-red-500/30 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-red-500 transition-all"
      >
        <div className="flex items-center gap-4">
           <div className="bg-red-500/20 p-2 rounded-lg">
               <ShieldCheck className="w-5 h-5 text-red-500" />
           </div>
           <div>
               <h2 className="text-xs font-black text-red-500 uppercase tracking-widest text-left">Status: Pro Se Command</h2>
               <p className="text-white text-sm font-bold italic text-left">"Counsel Withdrawn. Direct control established. Truth is the only attorney."</p>
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
                   <h2 className="text-xl font-black text-white uppercase tracking-widest leading-none">
                     {courtDates.custody ? courtDates.custody.requiredAction : 'Custody Hearing'}
                   </h2>
                   <p className="text-indigo-300 text-xs font-semibold mt-1">
                     {courtDates.custody ? `${courtDates.custody.date} (Judge ${courtDates.custody.judgeName})` : 'Date Pending'}
                   </p>
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
                   <h2 className="text-xl font-black text-white uppercase tracking-widest leading-none">
                     {courtDates.sentencing ? courtDates.sentencing.requiredAction : 'Sentencing'}
                   </h2>
                   <p className="text-blue-300 text-xs font-semibold mt-1">
                     {courtDates.sentencing ? `${courtDates.sentencing.date} (Judge ${courtDates.sentencing.judgeName})` : 'Date Pending'}
                   </p>
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

      {/* TACTICAL ALERT */}
      <div className="bg-amber-900/10 border border-amber-500/30 p-4 rounded-xl flex items-center gap-4">
        <div className="bg-amber-500/20 p-2 rounded-lg">
            <Star className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex-1 text-left">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Trial Target: June 15, 2026</h4>
          <p className="text-slate-300 text-xs">Full Custody Trial finalized. Evidence locker locked for handoff.</p>
        </div>
      </div>

      {/* TRACKERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={() => onNavigate('education-build')} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-indigo-500 cursor-pointer group transition-all text-left">
          <div className="flex justify-between items-start mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-400" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Academic</span>
          </div>
          <h3 className="text-white font-bold">CAEC / Upgrade</h3>
          <p className="text-xs text-slate-400 mt-1">Path to passing verified.</p>
        </div>

        <div onClick={() => onNavigate('harper-log')} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-pink-500 cursor-pointer group transition-all text-left">
          <div className="flex justify-between items-start mb-4">
            <Heart className="w-8 h-8 text-pink-500" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Safety</span>
          </div>
          <h3 className="text-white font-bold">Clinical Alert Log</h3>
          <p className="text-xs text-slate-400 mt-1">Pattern of health logged.</p>
        </div>

        <div onClick={() => onNavigate('health-rehab')} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-red-400 cursor-pointer group transition-all text-left">
          <div className="flex justify-between items-start mb-4">
            <Activity className="w-8 h-8 text-red-400" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Biological</span>
          </div>
          <h3 className="text-white font-bold">Sobriety Track</h3>
          <p className="text-xs text-slate-400 mt-1">{stats.soberDays}+ Days verified.</p>
        </div>
      </div>

      {/* EXHIBIT OVERVIEW */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-left">
         <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Global Exhibit Summary
         </h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-white font-bold text-xl">{stats.verifiedExhibits}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Verified Exhibits</p>
            </div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-blue-400 font-bold text-xl">{stats.deniedHours}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Hours Denied</p>
            </div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-green-400 font-bold text-xl">{stats.soberDays}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Sober Days</p>
            </div>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <p className="text-amber-500 font-bold text-xl">{stats.medicalRecordsCount}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black">Medical Records</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
