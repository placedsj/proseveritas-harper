
import React, { useState, useEffect } from 'react';
import { ScottLogEntry, ScottCategory, ChildImpact } from '../types';
import { FileText, Save, Download, AlertTriangle, Scale, Plus } from 'lucide-react';

const categories: ScottCategory[] = [
  'Denial of Parenting Time', 
  'Alienation', 
  'Unjustified Police Contact', 
  'Failure to Consult', 
  'Health/Safety Risk'
];

const impacts: ChildImpact[] = ['Crying', 'Silent', 'Regressive', 'N/A'];

const ScottSchedule: React.FC = () => {
  const [logs, setLogs] = useState<ScottLogEntry[]>(() => {
    const saved = localStorage.getItem('scottLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
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
      `"${log.theSay.replace(/"/g, '""')}"`,
      `"${log.theFact.replace(/"/g, '""')}"`,
      `"${log.childImpact}"`,
      `"${log.exhibitRef}"`,
      `"${log.statuteTag}"`
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
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Scale className="w-6 h-6 text-red-500" />
            Scott Schedule
          </h2>
          <p className="text-xs text-slate-400">Systematic Evidence Logging for Counsel</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={exportCSV}
            className="bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 px-3 py-2 rounded flex items-center gap-2 font-bold text-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold shadow-lg"
          >
            <Plus className="w-4 h-4" /> Log Incident
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-6 rounded-lg border border-red-500/30 animate-fade-in shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2 uppercase tracking-wider">New Record</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Incident Date</label>
              <input 
                type="datetime-local"
                value={newLog.incidentDate}
                onChange={e => setNewLog({...newLog, incidentDate: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Category</label>
              <select 
                value={newLog.category}
                onChange={e => setNewLog({...newLog, category: e.target.value as ScottCategory})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1 text-red-300">"The Say" (Her Allegation)</label>
              <textarea 
                value={newLog.theSay}
                onChange={e => setNewLog({...newLog, theSay: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-red-500 focus:outline-none h-32"
                placeholder="Exact quote of what was claimed..."
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1 text-green-300">"The Fact" (Objective Reality)</label>
              <textarea 
                value={newLog.theFact}
                onChange={e => setNewLog({...newLog, theFact: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-green-500 focus:outline-none h-32"
                placeholder="What actually happened, supported by evidence..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Child Impact</label>
              <select 
                value={newLog.childImpact}
                onChange={e => setNewLog({...newLog, childImpact: e.target.value as ChildImpact})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
              >
                {impacts.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
             <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Exhibit Ref (File/Link)</label>
              <input 
                type="text" 
                value={newLog.exhibitRef}
                onChange={e => setNewLog({...newLog, exhibitRef: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                placeholder="e.g. Screenshot_A4.jpg"
              />
            </div>
             <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Statute / Legal Tag</label>
              <input 
                type="text" 
                value={newLog.statuteTag}
                onChange={e => setNewLog({...newLog, statuteTag: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                placeholder="e.g. Best Interests"
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2 uppercase tracking-widest"
          >
            <Save className="w-5 h-5" />
            SAVE TO RECORD
          </button>
        </div>
      )}

      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <span className="text-red-400 font-bold uppercase text-sm">{log.category}</span>
                <span className="text-slate-500 text-xs font-mono">{new Date(log.incidentDate).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                 {log.exhibitRef && (
                  <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded border border-blue-800 flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Ex: {log.exhibitRef}
                  </span>
                )}
                <span className="bg-slate-900 text-slate-400 text-xs px-2 py-1 rounded border border-slate-800">
                   {log.childImpact}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
               <div className="bg-red-950/20 p-3 rounded border border-red-900/30">
                 <p className="text-xs text-red-500 uppercase font-bold mb-1">She Said:</p>
                 <p className="text-slate-300 italic">"{log.theSay}"</p>
               </div>
               <div className="bg-green-950/20 p-3 rounded border border-green-900/30">
                 <p className="text-xs text-green-500 uppercase font-bold mb-1">The Fact:</p>
                 <p className="text-slate-300">{log.theFact}</p>
               </div>
            </div>
            
            {log.statuteTag && (
              <div className="mt-2 text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Tag: {log.statuteTag}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScottSchedule;
