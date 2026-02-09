
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Fingerprint, Eye, Search, FileWarning, Clock, AlertTriangle, Plus, Trash2, X, Save } from 'lucide-react';
import { SystemAuditLog } from '../types';

const initialLogs: SystemAuditLog[] = [
  { id: '1', date: 'Feb 7, 2026', action: 'Horizon Privacy Audit', status: 'Active', note: 'Kelly Chase confirming permission to review Sept 10 records. Investigating "Trade" (MRI for Psych Eval) and Secure Ward detention protocol.' },
  { id: '2', date: 'Jan 23, 2026', action: 'Order Gap Identification', status: 'Critical', note: 'Documentation found: Admitted to secure ward (Room 47) at 16:30. "Mental Health Consult" order not placed until 17:18. Illegal detention for 48 minutes.' },
  { id: '3', date: 'Jan 23, 2026', action: 'Triage Discrepancy', status: 'Flagged', note: 'Diagnosis code (S6190) lists "wrist and hand" while triage notes confirm "left dorsal hand". Code used to trigger mental health risk profiling?' },
  { id: '4', date: 'Jan 15, 2026', action: 'Victim Status Audit', status: 'Verified', note: 'SJPF confirmed File 25-2390069 as domestic incident. PSR omission confirmed as willful suppression by Goldsworthy.' },
];

const SystemAudit: React.FC = () => {
  const [logs, setLogs] = useState<SystemAuditLog[]>(() => {
    const saved = localStorage.getItem('systemAuditLogs');
    return saved ? JSON.parse(saved) : initialLogs;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newLog, setNewLog] = useState<Partial<SystemAuditLog>>({
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    action: '',
    status: 'Active',
    note: ''
  });

  useEffect(() => {
    localStorage.setItem('systemAuditLogs', JSON.stringify(logs));
  }, [logs]);

  const handleSave = () => {
    if (!newLog.action || !newLog.note) return;

    const log: SystemAuditLog = {
      id: Date.now().toString(),
      date: newLog.date || new Date().toLocaleDateString(),
      action: newLog.action,
      status: newLog.status as SystemAuditLog['status'],
      note: newLog.note
    };

    setLogs([log, ...logs]);
    setIsAdding(false);
    setNewLog({
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      action: '',
      status: 'Active',
      note: ''
    });
  };

  const deleteLog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this audit log?')) {
        setLogs(logs.filter(l => l.id !== id));
    }
  };

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
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold shadow-lg transition-all"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? "Cancel" : "New Entry"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-6 rounded-xl border border-blue-500/30 shadow-2xl animate-fade-in text-left">
           <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-500" /> Log New Discrepancy
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                 <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Date</label>
                 <input
                   type="text"
                   value={newLog.date}
                   onChange={e => setNewLog({...newLog, date: e.target.value})}
                   className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                 />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Action / Title</label>
                 <input
                   type="text"
                   value={newLog.action}
                   onChange={e => setNewLog({...newLog, action: e.target.value})}
                   className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                   placeholder="e.g. Missing Police Report"
                 />
              </div>
           </div>

           <div className="mb-4">
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Status</label>
              <div className="flex gap-4">
                 {['Active', 'Critical', 'Flagged', 'Verified'].map(s => (
                    <button
                      key={s}
                      onClick={() => setNewLog({...newLog, status: s as any})}
                      className={`px-3 py-1 rounded text-xs font-bold uppercase border transition-all ${
                        newLog.status === s
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {s}
                    </button>
                 ))}
              </div>
           </div>

           <div className="mb-6">
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Investigation Note</label>
              <textarea
                value={newLog.note}
                onChange={e => setNewLog({...newLog, note: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 focus:outline-none h-24"
                placeholder="Details of the discrepancy found..."
              />
           </div>

           <button
             onClick={handleSave}
             disabled={!newLog.action || !newLog.note}
             className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded font-bold uppercase tracking-widest shadow-lg flex justify-center items-center gap-2"
           >
             <Save className="w-5 h-5" /> Save to Audit Log
           </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl space-y-6">
          <h3 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-500" /> Forensic Trail
          </h3>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-900/50 rounded border border-slate-700 group hover:border-blue-500/50 transition-all text-left relative">
                <button
                  onClick={() => deleteLog(log.id)}
                  className="absolute top-2 right-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex justify-between items-start mb-2 pr-6">
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
            {logs.length === 0 && (
                <div className="text-center p-8 text-slate-500 border border-dashed border-slate-700 rounded">
                    No audit logs recorded. Start tracking discrepancies.
                </div>
            )}
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
