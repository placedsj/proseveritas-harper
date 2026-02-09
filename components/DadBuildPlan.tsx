
import React from 'react';
import { Download, Printer, ShieldCheck, Heart, GraduationCap, Gavel } from 'lucide-react';

const DadBuildPlan: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">The Master Plan</h2>
          <p className="text-slate-500 text-sm">Formal 2025-2027 Build Record</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded flex items-center gap-2 font-bold transition-all"
          >
            <Printer className="w-4 h-4" /> Print PDF
          </button>
        </div>
      </div>

      <div className="bg-white text-slate-950 p-12 rounded-xl shadow-lg space-y-8 font-serif leading-relaxed border-t-[12px] border-slate-900">
        <div className="text-center space-y-2 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Harper’s Dad Build – 2025–2027 Plan</h1>
          <p className="text-lg italic text-slate-600">Commitment to Stability, Truth, and the Best Interest of Harper June Elizabeth Ryan</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
           <div className="space-y-4">
              <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4" /> 1. Operational Overview
              </h2>
              <ul className="space-y-1 text-slate-700">
                 <li><span className="font-bold">Subject:</span> Craig Schulz (Father)</li>
                 <li><span className="font-bold">Daughter:</span> Harper June Elizabeth Ryan</li>
                 <li><span className="font-bold">Status:</span> Self-Represented Litigant</li>
                 <li><span className="font-bold">Location:</span> Saint John, NB</li>
              </ul>
           </div>
           <div className="space-y-4">
              <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
                 <Heart className="w-4 h-4" /> 2. The Objective
              </h2>
              <p className="italic text-slate-600">
                 "To transition from recovery to stable, self-supporting fatherhood while maintaining a safe, consistent environment for Harper."
              </p>
           </div>
        </section>

        <section className="space-y-4">
           <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> 3. Education & Skills (2025-2026)
           </h2>
           <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
              <li><span className="font-bold">Academic Upgrade:</span> Register with Saint John Kings Adult Learning for CAEC (GED) preparation and testing.</li>
              <li><span className="font-bold">Employment Strategy:</span> Collaborate with WorkingNB to finalize a Training and Skills Development (TSD) action plan.</li>
              <li><span className="font-bold">Safety Certifications:</span> Complete Standard First Aid/CPR (Feb 2025 target) to bolster parenting credentials.</li>
           </ul>
        </section>

        <section className="space-y-4">
           <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> 4. Health & Physical Rehabilitation
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                 <p className="font-bold mb-1">C5-C6 Spinal Integrity</p>
                 <p>Maintenance of WorkSafeNB rehab plan and physiotherapy to ensure physical capacity for manual work (Roofing) and active parenting.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                 <p className="font-bold mb-1">Mental Health & ADHD</p>
                 <p>Voluntary participation in ADHD management and trauma-focused counseling (Addictions & Mental Health Saint John) to demonstrate resilience.</p>
              </div>
           </div>
        </section>

        <section className="space-y-4">
           <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
              <Gavel className="w-4 h-4" /> 5. Legal & Parenting Protocol
           </h2>
           <div className="space-y-3 text-slate-700 text-sm">
              <p><span className="font-bold">Shared Parenting:</span> Proposal for a "Back-to-Back" 70/30 or 50/50 schedule focused on Harper's transitions and stability.</p>
              <p><span className="font-bold">Communication:</span> Commitment to short, factual, and child-focused communication via court-approved methods.</p>
              <p><span className="font-bold">Evidence:</span> Systematic logging via the Scott Schedule to ensure "The Say" is always countered by "The Fact."</p>
           </div>
        </section>

        <div className="pt-12 text-center text-xs text-slate-400 font-sans uppercase tracking-[0.3em]">
           "Only the truth, what God would do, and in Harper's best interest."
        </div>
      </div>
    </div>
  );
};

export default DadBuildPlan;
