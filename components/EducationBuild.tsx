
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
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
            Education Build: CAEC Upgrade
          </h2>
          <p className="text-slate-500 text-sm">Path to High School Equivalency (New Brunswick)</p>
        </div>
        <div className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded border border-indigo-100 font-bold">
          Ref: Saint John Kings Adult Learning
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm flex items-center gap-2">
            <Book className="w-4 h-4 text-indigo-600" /> Subject Readiness
          </h3>
          <div className="space-y-4">
            {progress.map(p => (
              <div key={p.subject} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-900 font-semibold">{p.subject}</span>
                <select 
                  value={p.status}
                  onChange={(e) => updateStatus(p.subject, e.target.value as any)}
                  className={`text-xs px-2 py-1 rounded font-bold uppercase focus:outline-none cursor-pointer border ${
                    p.status === 'Passed' ? 'bg-green-50 text-green-700 border-green-200' :
                    p.status === 'Ready to Write' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    p.status === 'In Prep' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-200 text-slate-600 border-slate-300'
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
           <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
             <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" /> Training & Skills (NB)
             </h4>
             <ul className="text-xs text-blue-800 space-y-3">
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                   <div><span className="font-bold text-blue-900">TSD Funding:</span> Check eligibility with WorkingNB for tuition/book support.</div>
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                   <div><span className="font-bold text-blue-900">First Aid/CPR:</span> High court value. Target completion: Feb 2025.</div>
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                   <div><span className="font-bold text-blue-900">CDO Action Plan:</span> Integrate CAEC goals into Social Development file.</div>
                </li>
             </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h4 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-widest">Build Status</h4>
             <div className="w-full bg-slate-100 rounded-full h-4 mb-2 overflow-hidden border border-slate-200">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-1000" 
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
