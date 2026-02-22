
import React, { useState, useEffect } from 'react';
import { Calendar, ShieldCheck, CheckCircle } from 'lucide-react';
import { ProcessedEvidenceItem } from '../types';
import { INITIAL_EVIDENCE } from './initialData';

const EvidenceProcessor: React.FC = () => {
  const [evidence, setEvidence] = useState<ProcessedEvidenceItem[]>(() => {
    const saved = localStorage.getItem('evidence');
    return saved ? JSON.parse(saved) : INITIAL_EVIDENCE;
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
