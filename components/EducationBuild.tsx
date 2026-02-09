
import React, { useState, useEffect } from 'react';
import { GraduationCap, Book, CheckCircle, Clock, Plus } from 'lucide-react';
import { CAECProgress } from '../types';

const EducationBuild: React.FC = () => {
  const [progress, setProgress] = useState<CAECProgress[]>(() => {
    const saved = localStorage.getItem('caecProgress');
    return saved ? JSON.parse(saved) : [
      { subject: 'Reading', status: 'In Prep' },
      { subject: 'Writing', status: 'In Prep' },
      { subject: 'Math', status: 'In Prep' },
      { subject: 'Science', status: 'Not Started' },
      { subject: 'Social Studies', status: 'Not Started' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('caecProgress', JSON.stringify(progress));
  }, [progress]);

  const updateStatus = (subject: string, status: CAECProgress['status']) => {
    setProgress(progress.map(p => p.subject === subject ? { ...p, status } : p));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            Education Build: CAEC Upgrade
          </h2>
          <p className="text-slate-400 text-sm">Path to High School Equivalency (New Brunswick)</p>
        </div>
        <div className="text-xs bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded border border-indigo-500/30">
          Ref: Saint John Kings Adult Learning
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl space-y-6">
          <h3 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
            <Book className="w-4 h-4 text-indigo-500" /> Subject Readiness
          </h3>
          <div className="space-y-4">
            {progress.map(p => (
              <div key={p.subject} className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700">
                <span className="text-white font-semibold">{p.subject}</span>
                <select 
                  value={p.status}
                  onChange={(e) => updateStatus(p.subject, e.target.value as any)}
                  className={`text-xs px-2 py-1 rounded font-bold uppercase focus:outline-none cursor-pointer ${
                    p.status === 'Passed' ? 'bg-green-900/30 text-green-400' :
                    p.status === 'Ready to Write' ? 'bg-blue-900/30 text-blue-400' :
                    p.status === 'In Prep' ? 'bg-amber-900/30 text-amber-400' :
                    'bg-slate-700 text-slate-400'
                  }`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Prep">In Prep</option>
                  <option value="Ready to Write">Ready to Write</option>
                  <option value="Passed">Passed</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-blue-900/10 border border-blue-500/30 p-5 rounded-xl">
             <h4 className="font-bold text-blue-100 text-sm mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Training & Skills (NB)
             </h4>
             <ul className="text-xs text-blue-200/70 space-y-3">
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                   <div><span className="font-bold text-white">TSD Funding:</span> Check eligibility with WorkingNB for tuition/book support.</div>
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                   <div><span className="font-bold text-white">First Aid/CPR:</span> High court value. Target completion: Feb 2025.</div>
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                   <div><span className="font-bold text-white">CDO Action Plan:</span> Integrate CAEC goals into Social Development file.</div>
                </li>
             </ul>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
             <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Build Status</h4>
             <div className="w-full bg-slate-900 rounded-full h-4 mb-2 overflow-hidden border border-slate-700">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-1000" 
                  style={{ width: `${(progress.filter(p => p.status === 'Passed').length / 5) * 100}%` }}
                />
             </div>
             <p className="text-[10px] text-slate-500 text-right font-mono uppercase">
                {progress.filter(p => p.status === 'Passed').length} / 5 Credits Cleared
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationBuild;
