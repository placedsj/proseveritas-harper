import React, { useState, useEffect } from 'react';
import { 
  Calendar, ShieldCheck, CheckCircle
} from 'lucide-react';
import { ProcessedEvidenceItem } from '../types';

const CASE_ID = "FDSJ-739-24";

const RAW_RECORDS: Omit<ProcessedEvidenceItem, 'wScore' | 'verified'>[] = [
  { file: "2025-01-08(1).png", date: "Jan 08 2025 6:04 PM", sender: "UNKNOWN", rec: "UNKNOWN", text: "Thanks Emma. Touch base later if you don’t mind to check in with her. you and Jane are doing a great job and | had no doubt you would. Yup. Just sucks | can't be home with our daughter...", cat: "NON_COMPLIANCE", prio: 8, hash: "a3f5d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "2025-01-08(10).png", date: "Dec 10 2024 9:37 AM", sender: "Jane Ryan", rec: "Craig Schulz", text: "Oh Craig I'm so sorry this is happening | had no idea. Craig | couldn't open this as | don't have an iPhone", cat: "NON_COMPLIANCE", prio: 8, hash: "b7c2d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "IMG_3841.PNG", date: "Dec 09 2024 10:25 PM", sender: "Craig Schulz", rec: "Court", text: "Final Statement | am not requesting additional parenting time—I am only seeking due process. | have personally witnessed Emma using methamphetamine inside the home where Harper resides.", cat: "CRIMINAL_CONDUCT", prio: 10, hash: "e9d1d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "2025-01-08(23).png", date: "Dec 09 2024 9:09 PM", sender: "Craig Schulz", rec: "Emma Ryan", text: "You got a half hour. I'd say start at making smart decisions. Now sober up or don’t. And we'll talk later.", cat: "CRIMINAL_CONDUCT", prio: 10, hash: "f1b3d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "IMG_2029.PNG", date: "Nov 19 2024 6:56 PM", sender: "Emma Ryan", rec: "Craig Schulz", text: "Unless it’s about Harper or piper | don't care I'll be home soon with formula _ Leave it at the door thanks, - Back to block list", cat: "ENDANGERMENT", prio: 9, hash: "c4a8d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "IMG_2996.PNG", date: "Jan 01 2025 6:50 AM", sender: "System", rec: "System", text: "1:57 PM — Audio: “45-Minute Recording on iPad” (1:57-2:42 PM) Summary: Audio recording captures further escalating arguments and Emma’s erratic behavior.", cat: "CRIMINAL_CONDUCT", prio: 10, hash: "d7e2d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "2025-01-08(110).png", date: "Oct 02 2024 4:23 PM", sender: "Emma Ryan", rec: "Craig Schulz", text: "Lol, you don’t support shit. You literally don't support shit and I pay for it half the time and you even smoke mine...", cat: "FINANCIAL_ISSUES", prio: 7, hash: "h9k2d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "2025-01-08(155).png", date: "Dec 06 2024 4:15 PM", sender: "Emma Ryan", rec: "Craig Schulz", text: "No Craig you didn’t have drugs and you lost it tearing the apartment apart. Holy | You brought them into our home over and over...", cat: "CRIMINAL_CONDUCT", prio: 10, hash: "j1m3d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" },
  { file: "IMG_3618.PNG", date: "Jan 10 2025 3:25 PM", sender: "Lab", rec: "Department", text: "Medical Review Officer's Report - Specimen N11381257. Results: Negative Dilute. Creatinine levels low.", cat: "ENDANGERMENT", prio: 9, hash: "z8v4d8c2e1b9f4d7e6c5b8a1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2" }
];

const CATEGORY_WEIGHTS: Record<string, number> = {
  CRIMINAL_CONDUCT: 10,
  ENDANGERMENT: 9,
  NON_COMPLIANCE: 8,
  THREATS_INTIMIDATION: 7,
  FINANCIAL_ISSUES: 5,
  CUSTODY_VIOLATIONS: 6,
  GENERAL: 3
};

const calculateWeightedScore = (item: Omit<ProcessedEvidenceItem, 'wScore' | 'verified'>) => {
  const base = (item.prio || 5) * (CATEGORY_WEIGHTS[item.cat] || 3);
  const year = item.date.includes("2025") ? 2.5 : item.date.includes("2024") ? 2.0 : 1.0;
  return base + year;
};

// Fix: Complete component definition and add export default
const EvidenceProcessor: React.FC = () => {
  const [evidence, setEvidence] = useState<ProcessedEvidenceItem[]>(() => {
    const saved = localStorage.getItem('evidence');
    if (saved) return JSON.parse(saved);
    return RAW_RECORDS.map((r) => ({ 
      ...r, 
      wScore: calculateWeightedScore(r), 
      verified: false 
    }));
  });

  useEffect(() => {
    localStorage.setItem('evidence', JSON.stringify(evidence));
  }, [evidence]);

  const toggleVerified = (hash: string) => {
    setEvidence(prev => prev.map(item => 
      item.hash === hash ? { ...item, verified: !item.verified } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-red-500" />
          Evidence Processor
        </h2>
        <div className="text-xs text-slate-500 font-mono">CASE: {CASE_ID}</div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {evidence.map((item) => (
          <div key={item.hash} className={`bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row gap-4 ${item.verified ? 'border-green-500/50' : ''}`}>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-bold">{item.file}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {item.date}
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                  item.cat === 'CRIMINAL_CONDUCT' ? 'bg-red-900/30 text-red-400' :
                  item.cat === 'ENDANGERMENT' ? 'bg-orange-900/30 text-orange-400' :
                  'bg-blue-900/30 text-blue-400'
                }`}>
                  {item.cat}
                </div>
              </div>
              <p className="text-slate-300 text-sm italic mb-2">"{item.text}"</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Sender: {item.sender}</span>
                <span>Receiver: {item.rec}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-4">
              <div className="text-center">
                <div className="text-xs text-slate-500 uppercase font-bold">W-Score</div>
                <div className="text-lg font-bold text-white">{item.wScore}</div>
              </div>
              <button 
                onClick={() => toggleVerified(item.hash)}
                className={`p-2 rounded-full transition-colors ${item.verified ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvidenceProcessor;