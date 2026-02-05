
import React, { useState, useEffect } from 'react';
import { Scale, Calculator, Briefcase, Timer, ArrowRight, AlertTriangle } from 'lucide-react';
import { ScottLogEntry } from '../types';

interface DashboardProps {
  onNavigate: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [recentLogs, setRecentLogs] = useState<ScottLogEntry[]>([]);

  useEffect(() => {
    // Sentencing Countdown Feb 3
    const target = new Date('2025-02-03T09:00:00'); // Assuming 9am

    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60);

    // Load recent Scott Logs
    const savedLogs = localStorage.getItem('scottLogs');
    if (savedLogs) {
        setRecentLogs(JSON.parse(savedLogs).slice(0, 3));
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* RED ALERT SECTION */}
      <div className="bg-gradient-to-r from-red-900 to-slate-900 border border-red-700 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between shadow-lg shadow-red-900/20">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
             <div className="bg-red-600 p-3 rounded-full animate-pulse">
                 <Timer className="w-6 h-6 text-white" />
             </div>
             <div>
                 <h2 className="text-2xl font-black text-white uppercase tracking-widest">Sentencing Hearing</h2>
                 <p className="text-red-300 text-sm font-semibold">Feb 3, 2025 - R v Schulz</p>
             </div>
        </div>
        <div className="flex gap-4 text-center">
            {!isExpired ? (
              <>
                <div className="bg-black/30 p-3 rounded-lg min-w-[80px]">
                    <span className="block text-3xl font-mono font-bold text-white">{timeLeft.days}</span>
                    <span className="text-[10px] text-red-400 uppercase font-bold">Days</span>
                </div>
                <div className="bg-black/30 p-3 rounded-lg min-w-[80px]">
                    <span className="block text-3xl font-mono font-bold text-white">{timeLeft.hours}</span>
                    <span className="text-[10px] text-red-400 uppercase font-bold">Hours</span>
                </div>
              </>
            ) : (
               <div className="bg-black/30 p-3 rounded-lg px-6 flex items-center">
                  <span className="text-xl font-bold text-red-500 uppercase tracking-widest">Completed</span>
               </div>
            )}
        </div>
      </div>

      {/* QUICK LAUNCH GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1 */}
        <div 
          onClick={() => onNavigate('scott-schedule')}
          className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-red-500 cursor-pointer group transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <Scale className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Scott Schedule</h3>
            <p className="text-sm text-slate-400">Log Abuse & "The Fact" vs "The Say". Export CSV for Counsel.</p>
        </div>

        {/* Module 2 */}
        <div 
          onClick={() => onNavigate('custody-math')}
          className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 cursor-pointer group transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <Calculator className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Custody Math</h3>
            <p className="text-sm text-slate-400">Track parenting blocks. Calculate non-compliance percentage automatically.</p>
        </div>

        {/* Module 3 */}
        <div 
          onClick={() => onNavigate('business')}
          className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-green-500 cursor-pointer group transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <Briefcase className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Ops & Business</h3>
            <p className="text-sm text-slate-400">Shed leads, revenue tracking, and business survival tasks.</p>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
         <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-white">Recent Evidence Logs</h3>
         </div>
         <div className="space-y-3">
            {recentLogs.length > 0 ? recentLogs.map(log => (
                <div key={log.id} className="bg-slate-900/50 p-3 rounded border-l-2 border-red-500 flex justify-between items-center">
                    <div>
                        <p className="text-red-400 text-xs font-bold uppercase">{log.category}</p>
                        <p className="text-slate-300 text-sm truncate max-w-md">"{log.theSay}"</p>
                    </div>
                    <span className="text-slate-500 text-xs">{new Date(log.incidentDate).toLocaleDateString()}</span>
                </div>
            )) : (
                <p className="text-slate-500 text-sm italic">No recent incidents logged.</p>
            )}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
