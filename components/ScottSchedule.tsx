
import React, { useState, useEffect } from 'react';
import { ScottLogEntry, ScottCategory, ChildImpact } from '../types';
import { FileText, Save, Download, Scale, Plus, Info, ShieldCheck, X, Camera } from 'lucide-react';

export const safeCSV = (str: string): string => {
  if (!str) return "";
  const unsafePrefixes = ['=', '+', '-', '@'];
  if (unsafePrefixes.some(prefix => str.startsWith(prefix))) {
    return "'" + str;
  }
  return str;
};

const categories: ScottCategory[] = [
  'Denial of Parenting Time', 
  'Alienation', 
  'Unjustified Police Contact', 
  'Failure to Consult', 
  'Health/Safety Risk'
];

const impacts: ChildImpact[] = ['Crying', 'Silent', 'Regressive', 'N/A'];

const initialLogs: ScottLogEntry[] = [
  {
    id: 'photo-1',
    incidentDate: '2025-12-25T13:01:00',
    category: 'Denial of Parenting Time',
    theSay: "Merry Christmas we've been very busy. I have said Merry Christmas from you and you can celebrate with her Sunday.",
    theFact: "Direct denial of Christmas Day access despite multiple previous requests. 'Busy' is not a legal basis for withholding a child. Exhibit A-14.",
    childImpact: 'N/A',
    exhibitRef: 'Screenshot_20251225.png',
    statuteTag: 'Best Interests / Relationship Continuity'
  },
  {
    id: 'photo-2',
    incidentDate: '2025-10-21T17:04:00',
    category: 'Alienation',
    theSay: "Unless it's about parental or custodial agreements she would be breaking the no contact order.",
    theFact: "Jane RYAN (maternal grandmother) fabricating existence of a 'no contact order' to prevent Craig from communicating with the mother regarding Harper. Victim Services confirms NO NCO exists.",
    childImpact: 'N/A',
    exhibitRef: 'Screenshot_20251021.png',
    statuteTag: 'Parental Alienation / Public Mischief'
  }
];

const ScottSchedule: React.FC = () => {
  const [logs, setLogs] = useState<ScottLogEntry[]>(() => {
    const saved = localStorage.getItem('scottLogs');
    return saved ? JSON.parse(saved) : initialLogs;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [newLog, setNewLog] = useState<Partial<ScottLogEntry>>({
    incidentDate: new Date().toISOString().slice(0, 16),
    category: 'Denial of Parenting Time',
    theSay: '',
    theFact: '',
    childImpact: 'N/A',
    exhibitRef: '',
    statuteTag: ''
  });

  useEffect(() => {
    localStorage.setItem('scottLogs', JSON.stringify(logs));
  }, [logs]);

  const handleSave = () => {
    if (!newLog.theFact) return;

    const entry: ScottLogEntry = {
      id: Date.now().toString(),
      incidentDate: newLog.incidentDate || new Date().toISOString(),
      category: newLog.category as ScottCategory,
      theSay: newLog.theSay || 'N/A',
      theFact: newLog.theFact || '',
      childImpact: newLog.childImpact as ChildImpact,
      exhibitRef: newLog.exhibitRef || '',
      statuteTag: newLog.statuteTag || ''
    };

    setLogs([entry, ...logs]);
    setIsAdding(false);
    setNewLog({
      incidentDate: new Date().toISOString().slice(0, 16),
      category: 'Denial of Parenting Time',
      theSay: '',
      theFact: '',
      childImpact: 'N/A',
      exhibitRef: '',
      statuteTag: ''
    });
  };

  const exportCSV = () => {
    const headers = ['Date', 'Category', 'The Say (Allegation)', 'The Fact (Reality)', 'Child Impact', 'Exhibit', 'Statute'];
    const rows = logs.map(log => [
      `"${new Date(log.incidentDate).toLocaleString()}"`,
      `"${log.category}"`,
      `"${safeCSV(log.theSay).replace(/"/g, '""')}"`,
      `"${safeCSV(log.theFact).replace(/"/g, '""')}"`,
      `"${safeCSV(log.childImpact)}"`,
      `"${safeCSV(log.exhibitRef)}"`,
      `"${safeCSV(log.statuteTag)}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Scott_Schedule_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 text-left">
            <Scale className="w-6 h-6 text-red-600" />
            Scott Schedule
          </h2>
          <p className="text-xs text-slate-500 text-left uppercase tracking-tighter">Forensic Rebuttal: Truth vs Allegation</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowGuide(!showGuide)}
            className="bg-white hover:bg-slate-50 text-amber-600 border border-slate-200 px-3 py-2 rounded flex items-center gap-2 font-bold text-sm transition-colors"
          >
            <Info className="w-4 h-4" /> Guide
          </button>
          <button 
            onClick={exportCSV}
            className="bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 px-3 py-2 rounded flex items-center gap-2 font-bold text-sm transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Log Incident
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl animate-fade-in relative text-left shadow-sm">
          <button onClick={() => setShowGuide(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"><X className="w-4 h-4" /></button>
          <h3 className="text-amber-700 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> The Strategy: Truth vs Allegation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-slate-700">
            <div className="space-y-2">
              <p><span className="text-slate-900 font-bold italic">"The Say":</span> Record the exact allegation made by the other party. Use quotes if possible. This shows the court the "accusation" you are countering.</p>
              <p><span className="text-slate-900 font-bold italic">"The Fact":</span> Provide the objective truth. Be clinical, not emotional. Example: "I was not late; I was waiting at the door at 4:00 PM as per the ring camera log."</p>
            </div>
            <div className="space-y-2">
              <p><span className="text-slate-900 font-bold italic">Exhibit Ref:</span> Link the filename from your Evidence Vault (e.g. "Exhibit_A14.png") to this entry.</p>
              <p><span className="text-slate-900 font-bold italic">Court Value:</span> Identifying patterns of alienation or non-compliance instantly saves judges from reading 500 emails.</p>
            </div>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-red-200 animate-fade-in shadow-lg text-left">
          <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 uppercase tracking-wider">New Record</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Incident Date</label>
              <input 
                type="datetime-local"
                value={newLog.incidentDate}
                onChange={e => setNewLog({...newLog, incidentDate: e.target.value})}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Category</label>
              <select 
                value={newLog.category}
                onChange={e => setNewLog({...newLog, category: e.target.value as ScottCategory})}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:border-red-500 focus:outline-none transition-all"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1 text-red-600">"The Say" (The Allegation)</label>
              <textarea 
                value={newLog.theSay}
                onChange={e => setNewLog({...newLog, theSay: e.target.value})}
                className="w-full bg-slate-50 border border-slate-300 rounded p-3 text-slate-900 focus:border-red-500 focus:outline-none h-32 transition-all"
                placeholder="Ex: 'Craig was aggressive and late for pickup...'"
              />
            </div>
            <div>
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1 text-green-600">"The Fact" (Objective Reality)</label>
              <textarea 
                value={newLog.theFact}
                onChange={e => setNewLog({...newLog, theFact: e.target.value})}
                className="w-full bg-slate-50 border border-slate-300 rounded p-3 text-slate-900 focus:border-green-500 focus:outline-none h-32 transition-all"
                placeholder="Ex: 'Arrived at 4:00 PM. Stayed in car. Ring logs show Emma did not open the door.'"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Child Impact</label>
              <select 
                value={newLog.childImpact}
                onChange={e => setNewLog({...newLog, childImpact: e.target.value as ChildImpact})}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:border-red-500 focus:outline-none transition-all"
              >
                {impacts.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
             <div>
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Exhibit Ref (Evidence Link)</label>
              <input 
                type="text" 
                value={newLog.exhibitRef}
                onChange={e => setNewLog({...newLog, exhibitRef: e.target.value})}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:border-red-500 focus:outline-none font-mono text-sm transition-all"
                placeholder="e.g. Exhibit_A14.png"
              />
            </div>
             <div>
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Legal Tag</label>
              <input 
                type="text" 
                value={newLog.statuteTag}
                onChange={e => setNewLog({...newLog, statuteTag: e.target.value})}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:border-red-500 focus:outline-none transition-all"
                placeholder="e.g. Public Mischief / Gatekeeping"
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold shadow-md transition-all active:scale-95 flex justify-center items-center gap-2 uppercase tracking-widest"
          >
            <Save className="w-5 h-5" />
            COMMIT TO RECORD
          </button>
        </div>
      )}

      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="bg-white p-4 rounded-lg border border-slate-200 hover:border-red-200 hover:shadow-md transition-all text-left group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <span className="text-red-600 font-bold uppercase text-sm">{log.category}</span>
                <span className="text-slate-500 text-xs font-mono">{new Date(log.incidentDate).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                 {log.exhibitRef && (
                  <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded border border-blue-100 flex items-center gap-1 font-mono uppercase">
                    {log.id.startsWith('photo') ? <Camera className="w-3 h-3" /> : <FileText className="w-3 h-3" />} Ex: {log.exhibitRef}
                  </span>
                )}
                <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded border border-slate-200 uppercase font-bold">
                   Impact: {log.childImpact}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
               <div className="bg-red-50 p-3 rounded border border-red-100">
                 <p className="text-[10px] text-red-600 uppercase font-black mb-1">"The Say" (Allegation)</p>
                 <p className="text-slate-700 italic">"{log.theSay}"</p>
               </div>
               <div className="bg-green-50 p-3 rounded border border-green-100">
                 <p className="text-[10px] text-green-600 uppercase font-black mb-1">"The Fact" (Truth)</p>
                 <p className="text-slate-700">{log.theFact}</p>
               </div>
            </div>
            
            {log.statuteTag && (
              <div className="mt-2 text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Legal Argument: {log.statuteTag}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScottSchedule;
