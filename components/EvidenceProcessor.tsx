
import React, { useState, useEffect } from 'react';
import { Calendar, ShieldCheck, CheckCircle } from 'lucide-react';
import { ProcessedEvidenceItem } from '../types';

const RAW_RECORDS: Omit<ProcessedEvidenceItem, 'wScore' | 'verified'>[] = [
  { file: "2025-01-08(1).png", date: "Jan 08 2025", sender: "UNKNOWN", rec: "UNKNOWN", text: "Thanks [Name]. Touch base later if you don’t mind to check in with her. you and [Name] are doing a great job...", cat: "NON_COMPLIANCE", prio: 8, hash: "a3f5d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "IMG_3841.PNG", date: "Dec 09 2024", sender: "[Subject Name]", rec: "Court", text: "Final Statement | am not requesting additional parenting time—I am only seeking due process. | have personally witnessed [Name] using methamphetamine inside the home where [Child Name] resides.", cat: "CRIMINAL_CONDUCT", prio: 10, hash: "e9d1d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "IMG_3618.PNG", date: "Jan 10 2025", sender: "Lab", rec: "Department", text: "MRO Report - Specimen N11381257. Results: Negative Dilute. Creatinine levels low. Omitted from official Social Dev report.", cat: "ENDANGERMENT", prio: 9, hash: "z8v4d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" }
];

const EvidenceProcessor: React.FC = () => {
  const [evidence, setEvidence] = useState<ProcessedEvidenceItem[]>(() => {
    const saved = localStorage.getItem('evidence');
    return saved ? JSON.parse(saved) : RAW_RECORDS.map(r => ({ ...r, wScore: (r.prio || 5) * 2, verified: false }));
  });

  useEffect(() => {
    localStorage.setItem('evidence', JSON.stringify(evidence));
  }, [evidence]);

  const toggleVerified = (hash: string) => {
    setEvidence(prev => prev.map(item => item.hash === hash ? { ...item, verified: !item.verified } : item));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center text-left">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-red-600" />
          Evidence Processor
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {evidence.map((item) => (
          <div key={item.hash} className={`bg-white p-4 rounded-lg border border-slate-200 flex flex-col md:flex-row gap-4 hover:shadow-md transition-all ${item.verified ? 'border-green-300 bg-green-50/30' : ''}`}>
            <div className="flex-1 text-left">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-slate-900 font-bold text-sm">{item.file}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-blue-600 font-bold uppercase border border-slate-200">{item.cat}</span>
              </div>
              <p className="text-slate-600 text-xs italic line-clamp-2">"{item.text}"</p>
              <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                <Calendar className="w-3 h-3" /> {item.date} | W-Score: {item.wScore}
              </div>
            </div>
            <div className="flex md:flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
              <button 
                onClick={() => toggleVerified(item.hash)}
                className={`p-2 rounded-full transition-all ${item.verified ? 'bg-green-600 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvidenceProcessor;
