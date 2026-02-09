
import React from 'react';
import { ShieldAlert, Fingerprint, Eye, Search, FileWarning, Clock, AlertTriangle } from 'lucide-react';

const SystemAudit: React.FC = () => {
  const auditLogs = [
    { date: 'Feb 7, 2026', action: 'Horizon Privacy Audit', status: 'Active', note: 'Kelly Chase confirming permission to review Sept 10 records. Investigating "Trade" (MRI for Psych Eval) and Secure Ward detention protocol.' },
    { date: 'Jan 23, 2026', action: 'Order Gap Identification', status: 'Critical', note: 'Documentation found: Admitted to secure ward (Room 47) at 16:30. "Mental Health Consult" order not placed until 17:18. Illegal detention for 48 minutes.' },
    { date: 'Jan 23, 2026', action: 'Triage Discrepancy', status: 'Flagged', note: 'Diagnosis code (S6190) lists "wrist and hand" while triage notes confirm "left dorsal hand". Code used to trigger mental health risk profiling?' },
    { date: 'Jan 15, 2026', action: 'Victim Status Audit', status: 'Verified', note: 'SJPF confirmed File 25-2390069 as domestic incident. PSR omission confirmed as willful suppression by Goldsworthy.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 text-left">
            <Fingerprint className="w-6 h-6 text-blue-500" />
            System Audit: Record Integrity
          </h2>
          <p className="text-slate-400 text-sm text-left">Investigating Institutional Capture & Document Fabrications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl space-y-6">
          <h3 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-500" /> Forensic Trail
          </h3>
          <div className="space-y-4">
            {auditLogs.map((log, i) => (
              <div key={i} className="p-4 bg-slate-900/50 rounded border border-slate-700 group hover:border-blue-500/50 transition-all text-left">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-400 font-bold text-sm">{log.action}</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">{log.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{log.note}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    log.status === 'Critical' ? 'bg-red-900/30 text-red-400 border-red-800' : 
                    log.status === 'Flagged' ? 'bg-amber-900/30 text-amber-400 border-amber-800' :
                    'bg-blue-900/30 text-blue-400 border-blue-800'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-xl text-left">
             <h4 className="font-bold text-red-100 text-sm mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Institutional Negligence
             </h4>
             <div className="space-y-4 text-xs text-red-200/70">
                <div className="flex gap-3">
                   <Clock className="w-10 h-10 text-red-500 flex-shrink-0" />
                   <p>
                     <span className="font-bold text-white block mb-1">Secure Ward Order Gap:</span> 
                     Records prove you were detained in the mental health ward for nearly **50 minutes** before any doctor signed an order. This is a primary charter violation for the February hearing.
                   </p>
                </div>
                <div className="flex gap-3">
                   <AlertTriangle className="w-10 h-10 text-red-500 flex-shrink-0" />
                   <p>
                     <span className="font-bold text-white block mb-1">Fabricated NCO:</span>
                     Grandmother (Jane) text claiming a "No Contact Order" existed. Victim Services confirms NO order was ever approved. This is **Public Mischief** used to block parenting time.
                   </p>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-left">
             <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2 uppercase tracking-tighter">
                <Search className="w-4 h-4 text-slate-500" /> Searchable Audit Tags
             </h4>
             <div className="flex flex-wrap gap-2 pt-2">
                {['Kelly Chase', 'NP Claire Logan', 'S6190 Code', 'Order Gap', 'Ghost NCO', 'MRO Dilute'].map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 font-mono">
                    {tag}
                  </span>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAudit;
