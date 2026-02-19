
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Fingerprint, Eye, Search, FileWarning, Clock, AlertTriangle, Plus, Save } from 'lucide-react';
import { SystemAuditLogEntry } from '../types';

const initialLogs: SystemAuditLogEntry[] = [
    { id: '1', date: 'Feb 7, 2026', action: 'Horizon Privacy Audit', status: 'Active', note: 'Kelly Chase confirming permission to review Sept 10 records. Investigating "Trade" (MRI for Psych Eval) and Secure Ward detention protocol.' },
    { id: '2', date: 'Jan 23, 2026', action: 'Order Gap Identification', status: 'Critical', note: 'Documentation found: Admitted to secure ward (Room 47) at 16:30. "Mental Health Consult" order not placed until 17:18. Illegal detention for 48 minutes.' },
    { id: '3', date: 'Jan 23, 2026', action: 'Triage Discrepancy', status: 'Flagged', note: 'Diagnosis code (S6190) lists "wrist and hand" while triage notes confirm "left dorsal hand". Code used to trigger mental health risk profiling?' },
    { id: '4', date: 'Jan 15, 2026', action: 'Victim Status Audit', status: 'Verified', note: 'SJPF confirmed File 25-2390069 as domestic incident. PSR omission confirmed as willful suppression by Goldsworthy.' },
];

const SystemAudit: React.FC = () => {
  const [logs, setLogs] = useState<SystemAuditLogEntry[]>(() => {
    const saved = localStorage.getItem('systemAuditLogs');
    return saved ? JSON.parse(saved) : initialLogs;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newLog, setNewLog] = useState<Partial<SystemAuditLogEntry>>({
    date: new Date().toISOString().split('T')[0],
    action: '',
    status: 'Active',
    note: ''
  });

  useEffect(() => {
    localStorage.setItem('systemAuditLogs', JSON.stringify(logs));
  }, [logs]);

  const handleAddAuditLog = () => {
    if (!newLog.action || !newLog.note) return;
    const log: SystemAuditLogEntry = {
      id: Date.now().toString(),
      date: newLog.date || new Date().toISOString().split('T')[0],
      action: newLog.action,
      status: newLog.status as any,
      note: newLog.note
    };
    setLogs([log, ...logs]);
    setIsAdding(false);
    setNewLog({
       date: new Date().toISOString().split('T')[0],
       action: '',
       status: 'Active',
       note: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 text-left">
            <Fingerprint className="w-6 h-6 text-blue-600" />
            System Audit: Record Integrity
          </h2>
          <p className="text-slate-500 text-sm text-left">Investigating Institutional Capture & Document Fabrications.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold text-sm shadow-md transition-all"
        >
          <Plus className="w-4 h-4" /> {isAdding ? "Cancel" : "Add Log"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" /> Forensic Trail
          </h3>

          {isAdding && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4 animate-fade-in text-left">
              <h4 className="text-xs font-bold text-blue-800 uppercase mb-3">New Audit Entry</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Action / Audit Title"
                  className="w-full p-2 rounded border border-blue-200 text-xs"
                  value={newLog.action}
                  onChange={e => setNewLog({...newLog, action: e.target.value})}
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 p-2 rounded border border-blue-200 text-xs"
                    value={newLog.date}
                    onChange={e => setNewLog({...newLog, date: e.target.value})}
                  />
                  <select
                    className="flex-1 p-2 rounded border border-blue-200 text-xs"
                    value={newLog.status}
                    onChange={e => setNewLog({...newLog, status: e.target.value as any})}
                  >
                    <option value="Active">Active</option>
                    <option value="Critical">Critical</option>
                    <option value="Flagged">Flagged</option>
                    <option value="Verified">Verified</option>
                  </select>
                </div>
                <textarea
                  placeholder="Audit Notes..."
                  className="w-full p-2 rounded border border-blue-200 text-xs h-20"
                  value={newLog.note}
                  onChange={e => setNewLog({...newLog, note: e.target.value})}
                />
                <button
                  onClick={handleAddAuditLog}
                  className="w-full bg-blue-600 text-white py-2 rounded text-xs font-bold uppercase hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-3 h-3" /> Save Entry
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 rounded border border-slate-200 group hover:border-blue-300 transition-all text-left">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-700 font-bold text-sm">{log.action}</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">{log.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{log.note}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    log.status === 'Critical' ? 'bg-red-50 text-red-600 border-red-200' : 
                    log.status === 'Flagged' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-left shadow-sm">
             <h4 className="font-bold text-red-900 text-sm mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" /> Institutional Negligence
             </h4>
             <div className="space-y-4 text-xs text-red-800">
                <div className="flex gap-3">
                   <Clock className="w-10 h-10 text-red-600 flex-shrink-0" />
                   <p>
                     <span className="font-bold text-red-950 block mb-1">Secure Ward Order Gap:</span> 
                     Records prove you were detained in the mental health ward for nearly **50 minutes** before any doctor signed an order. This is a primary charter violation for the February hearing.
                   </p>
                </div>
                <div className="flex gap-3">
                   <AlertTriangle className="w-10 h-10 text-red-600 flex-shrink-0" />
                   <p>
                     <span className="font-bold text-red-950 block mb-1">Fabricated NCO:</span>
                     Grandmother (Jane) text claiming a "No Contact Order" existed. Victim Services confirms NO order was ever approved. This is **Public Mischief** used to block parenting time.
                   </p>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 text-left shadow-sm">
             <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2 uppercase tracking-tighter">
                <Search className="w-4 h-4 text-slate-400" /> Searchable Audit Tags
             </h4>
             <div className="flex flex-wrap gap-2 pt-2">
                {['Kelly Chase', 'NP Claire Logan', 'S6190 Code', 'Order Gap', 'Ghost NCO', 'MRO Dilute'].map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded border border-slate-200 font-mono">
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
