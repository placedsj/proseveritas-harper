
import React, { useState, useEffect } from 'react';
import { Landmark, CheckCircle2, Clock, AlertCircle, Plus, ExternalLink } from 'lucide-react';
import { GovBenefit } from '../types';

const initialBenefits: GovBenefit[] = [
  { id: '1', agency: 'Social Development', program: 'Social Assistance / CDO', status: 'Pending', nextAction: 'Meet CDO worker for case plan' },
  { id: '2', agency: 'WorkingNB', program: 'TSD Funding (CAEC Prep)', status: 'Not Applied', nextAction: 'Book appointment for employment action plan' },
  { id: '3', agency: 'CRA', program: 'Canada Child Benefit (CCB)', status: 'Active', nextAction: 'Confirm daughter correctly registered' },
  { id: '4', agency: 'WorkSafeNB', program: 'Application for Workers Compensation', status: 'Not Applied', nextAction: 'Submit initial claim for C5-C6 injury' },
  { id: '5', agency: 'Social Development', program: 'Disability Support (DSP)', status: 'Not Applied', nextAction: 'Check eligibility for ADHD/Spine' },
  { id: '6', agency: 'Service Canada', program: 'Sickness/Disability Benefits', status: 'Not Applied', nextAction: 'Evaluate for income transition' },
];

const GovBenefits: React.FC = () => {
  const [benefits, setBenefits] = useState<GovBenefit[]>(() => {
    const saved = localStorage.getItem('govBenefits');
    return saved ? JSON.parse(saved) : initialBenefits;
  });

  useEffect(() => {
    localStorage.setItem('govBenefits', JSON.stringify(benefits));
  }, [benefits]);

  const updateStatus = (id: string, status: GovBenefit['status']) => {
    setBenefits(benefits.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Landmark className="w-6 h-6 text-amber-500" />
            Support & Benefits Matrix
          </h2>
          <p className="text-slate-400 text-sm">Managing New Brunswick & Federal Support Systems.</p>
        </div>
        <div className="flex gap-2">
           <a href="https://www.worksafenb.ca" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 border border-blue-500/30 px-2 py-1 rounded bg-blue-900/10 transition-colors font-bold uppercase">
              WorkSafeNB Portal <ExternalLink className="w-3 h-3" />
           </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {benefits.map(benefit => (
          <div key={benefit.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-amber-500/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">{benefit.agency}</span>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    benefit.status === 'Active' ? 'bg-green-900/30 text-green-400' :
                    benefit.status === 'Pending' ? 'bg-amber-900/30 text-amber-400' :
                    benefit.status === 'Rejected' ? 'bg-red-900/30 text-red-400' :
                    'bg-slate-700 text-slate-400'
                  }`}>
                    {benefit.status}
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg">{benefit.program}</h3>
                <p className="text-amber-500/80 text-xs font-semibold mt-1 flex items-center gap-1">
                   <Clock className="w-3 h-3" /> Next: {benefit.nextAction}
                </p>
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={benefit.status}
                  onChange={(e) => updateStatus(benefit.id, e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="Not Applied">Not Applied</option>
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-900/10 border border-blue-500/30 p-6 rounded-2xl">
         <h4 className="text-blue-100 font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400" /> Operational Context
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-blue-200/70">
            <div className="space-y-2">
               <p><span className="text-white font-bold uppercase">Funding Target:</span> Secure a bridge between Social Assistance and WorkSafeNB compensation to ensure legal fees and stability.</p>
               <p><span className="text-white font-bold uppercase">WorkSafeNB:</span> Claim must be filed under "Application for Workers Compensation" for the C5-C6 spinal injury history.</p>
            </div>
            <div className="space-y-2">
               <p><span className="text-white font-bold uppercase">Gentle Path:</span> Keep attendance records for all sessions. This is positive evidence for the June 15 Trial.</p>
               <p><span className="text-white font-bold uppercase">ADHD Intake:</span> Demonstrating proactive health management is a key differentiator in custody hearings.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GovBenefits;
