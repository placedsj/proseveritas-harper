
import React, { useState, useEffect } from 'react';
import { Stethoscope, Activity, CheckCircle, ArrowRight, Brain, ShieldAlert } from 'lucide-react';
import { HealthStatus } from '../types';

const HealthRehab: React.FC = () => {
  const [statuses, setStatuses] = useState<HealthStatus[]>(() => {
    const saved = localStorage.getItem('healthStatus');
    return saved ? JSON.parse(saved) : [
      { id: '1', condition: 'C5-C6 Spinal Injury', status: 'Pending Claim', nextStep: 'Submit WorkSafeNB Application for Compensation', lastReview: 'Jan 25' },
      { id: '2', condition: 'ADHD Management', status: 'Intake Required', nextStep: 'Call Mental Health / Social Dev for booking', lastReview: 'Jan 25' },
      { id: '3', condition: 'Gentle Path Counselling', status: 'Active (Ref: Andrea)', nextStep: 'Attend scheduled sessions', lastReview: 'Jan 25' },
    ];
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-red-400" />
            Health & Rehab Protocol
          </h2>
          <p className="text-slate-400 text-sm">Proving Fitness & Capacity for Harper June Elizabeth.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map(s => (
          <div key={s.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-red-500/30 transition-all flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-bold text-lg leading-tight">{s.condition}</h3>
              {s.condition.includes('ADHD') ? <Brain className="w-5 h-5 text-purple-400" /> : <Stethoscope className="w-5 h-5 text-red-400" />}
            </div>
            
            <div className="flex-grow space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-1">Current State</span>
                <span className="text-slate-200 text-sm bg-slate-900 px-2 py-1 rounded border border-slate-700">{s.status}</span>
              </div>
              
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-1">Next Objective</span>
                <p className="text-white text-sm font-semibold">{s.nextStep}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
               <span className="text-[10px] text-slate-500">Updated: {s.lastReview}</span>
               <button className="text-red-400 hover:text-red-300 transition-colors">
                  <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-900/10 border border-red-900/30 p-8 rounded-2xl relative overflow-hidden">
         <div className="relative z-10">
           <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-red-500" /> System Defense Intel
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 text-sm">
              <div className="space-y-4">
                 <p><span className="text-red-400 font-bold uppercase">SJRH Audit:</span> Kelly Chase can see access logs. Every time your name is typed into the system, there is a record. Use this to audit the "Do Not Collect" move.</p>
                 <p><span className="text-red-400 font-bold uppercase">Consent Revocation:</span> Threatening to revoke consent to info is a tactical lever if the system remains biased. Proceed with caution.</p>
              </div>
              <div className="space-y-4">
                 <p><span className="text-red-400 font-bold uppercase">Gentle Path:</span> High court value. It proves you are the victim of the system/domestic situation and are proactively seeking health, not just reacting.</p>
                 <p><span className="text-red-400 font-bold uppercase">ADHD Strategy:</span> Getting a fresh intake is about *documentation control*. You want the narrative of "managed condition" rather than "untreated impairment".</p>
              </div>
           </div>
         </div>
         <div className="absolute -right-4 -bottom-4 opacity-5">
            <Activity className="w-64 h-64 text-red-500" />
         </div>
      </div>
    </div>
  );
};

export default HealthRehab;
