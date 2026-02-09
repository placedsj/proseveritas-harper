
import React, { useState } from 'react';
import { FileText, Download, UserPlus, Calendar, ShieldCheck } from 'lucide-react';

const ParentingPlan: React.FC = () => {
  const [split, setSplit] = useState('70/30');
  
  const downloadPlan = () => {
    alert("Drafting legal PDF... (Simulated)");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-500" />
            Parenting Agreement Builder
          </h2>
          <p className="text-slate-500 text-sm italic">Proposed Plan for Harper June Elizabeth Ryan</p>
        </div>
        <button 
          onClick={downloadPlan}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Download className="w-4 h-4" /> Export Draft
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Preamble */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 1. Preamble & Philosophy
            </h3>
            <div className="bg-slate-50 p-4 rounded border border-slate-200 font-serif text-slate-700 italic text-sm">
              "This agreement is founded on the principle that it is in the best interest of Harper June Elizabeth Ryan to have a meaningful, consistent, and loving relationship with both parents. The parties commit to honesty, transparency, and a conflict-free environment for the child."
            </div>
          </section>

          {/* Schedule */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" /> 2. The "Back-to-Back" Schedule
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-slate-600 text-sm">Target Split:</span>
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                  {['50/50', '70/30', '60/40'].map(s => (
                    <button 
                      key={s}
                      onClick={() => setSplit(s)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${split === s ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-slate-500 text-xs">A 'Back-to-Back' 70/30 plan typically involves Craig having Friday after work through Monday morning transition to daycare/school every week, or alternating full weeks.</p>
            </div>
          </section>

          {/* Clauses */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">3. Essential Clauses</h3>
             <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded flex gap-3 items-start">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
                   <p className="text-xs text-slate-700"><span className="font-bold text-slate-900 uppercase">Right of First Refusal:</span> If either parent is unable to care for Harper for more than 4 hours during their time, the other parent must be contacted first.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded flex gap-3 items-start">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
                   <p className="text-xs text-slate-700"><span className="font-bold text-slate-900 uppercase">Communication:</span> All non-emergency communication regarding Harper shall occur exclusively through a court-approved parenting app.</p>
                </div>
             </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
             <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Legal Context
             </h4>
             <p className="text-xs text-blue-800 leading-relaxed">
                Feb 3 Sentencing: Showing the court you have a *proactive* parenting plan ready demonstrates stability and lack of focus on "fighting," but rather on "fathering."
             </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
             <h4 className="font-bold text-amber-900 text-sm mb-2">Parties Involved</h4>
             <ul className="text-xs text-amber-800 space-y-1">
                <li>• Father: Craig Schulz</li>
                <li>• Mother: Emma Ryan</li>
                <li>• Child: Harper June Elizabeth Ryan</li>
                <li>• Case: FDSJ-739-24</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentingPlan;
