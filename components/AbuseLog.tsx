import React, { useState, useEffect } from 'react';
import { AbuseLogEntry, IncidentType } from '../types';
import { ShieldAlert, Save, Plus, FileText, Users, AlertTriangle, Camera } from 'lucide-react';

const incidentTypes: IncidentType[] = [
  'Harassment', 
  'Alienation', 
  'Denied Access',
  'False Police Report', 
  'Safety Risk', 
  'Financial'
];

interface AbuseLogProps {
  forceAddMode?: boolean;
}

const AbuseLog: React.FC<AbuseLogProps> = ({ forceAddMode = false }) => {
  const [logs, setLogs] = useState<AbuseLogEntry[]>(() => {
    const saved = localStorage.getItem('abuseLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(forceAddMode);
  
  // Form State
  const [newLog, setNewLog] = useState<Partial<AbuseLogEntry>>({
    timestamp: new Date().toISOString().slice(0, 16), // datetime-local format
    type: 'Harassment',
    description: '',
    severity: 5,
    childReaction: 'Normal',
    witnesses: '',
    policeReportNumber: ''
  });

  useEffect(() => {
    if (forceAddMode) setIsAdding(true);
  }, [forceAddMode]);

  useEffect(() => {
    localStorage.setItem('abuseLogs', JSON.stringify(logs));
  }, [logs]);

  const handleSave = () => {
    if (!newLog.description) return;

    const entry: AbuseLogEntry = {
      id: Date.now().toString(),
      timestamp: newLog.timestamp || new Date().toISOString(),
      type: newLog.type as IncidentType,
      description: newLog.description,
      severity: newLog.severity || 5,
      childReaction: newLog.childReaction || 'Normal',
      witnesses: newLog.witnesses || '',
      policeReportNumber: newLog.policeReportNumber || '',
      evidencePhoto: 'File attached locally' // Simulation
    };

    setLogs([entry, ...logs]);
    setIsAdding(false);
    // Reset form
    setNewLog({
      timestamp: new Date().toISOString().slice(0, 16),
      type: 'Harassment',
      description: '',
      severity: 5,
      childReaction: 'Normal',
      witnesses: '',
      policeReportNumber: ''
    });
  };

  const getSeverityLabel = (sev?: number) => {
    if (sev === 10) return <span className="text-red-500 font-bold uppercase">CRITICAL (10)</span>;
    if (sev === 5) return <span className="text-orange-400 font-bold uppercase">Medium (5)</span>;
    return <span className="text-blue-400 font-bold uppercase">Low (1)</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-red-500" />
          Abuse & Harassment Log
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold shadow-lg"
        >
          {isAdding ? "Cancel" : "Log Incident"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-6 rounded-lg border border-red-500/30 animate-fade-in shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2 uppercase tracking-wider">LOG NEW ABUSE INCIDENT</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Date & Time</label>
              <input 
                type="datetime-local"
                value={newLog.timestamp}
                onChange={e => setNewLog({...newLog, timestamp: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Category (Incident Type)</label>
              <select 
                value={newLog.type}
                onChange={e => setNewLog({...newLog, type: e.target.value as IncidentType})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
              >
                {incidentTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Status (Severity Level)</label>
            <select 
              value={newLog.severity}
              onChange={e => setNewLog({...newLog, severity: parseInt(e.target.value)})}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none font-bold"
            >
              <option value={1}>Severity 1 (Low)</option>
              <option value={5}>Severity 5 (Medium)</option>
              <option value={10}>Severity 10 (CRITICAL)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Detailed Notes (Description)</label>
            <textarea 
              value={newLog.description}
              onChange={e => setNewLog({...newLog, description: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-red-500 focus:outline-none h-32"
              placeholder="Be specific. Facts only."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Child Reaction</label>
              <select 
                value={newLog.childReaction}
                onChange={e => setNewLog({...newLog, childReaction: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
              >
                <option value="Normal">Normal</option>
                <option value="Crying">Crying</option>
                <option value="Scared">Scared</option>
                <option value="Withdrawn">Withdrawn</option>
                <option value="Silent">Silent</option>
              </select>
            </div>
             <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Witnesses</label>
              <input 
                type="text" 
                value={newLog.witnesses}
                onChange={e => setNewLog({...newLog, witnesses: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                placeholder="Names of people present"
              />
            </div>
             <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Police Report #</label>
              <input 
                type="text" 
                value={newLog.policeReportNumber}
                onChange={e => setNewLog({...newLog, policeReportNumber: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                placeholder="If applicable"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Evidence Photo/File</label>
            <div className="w-full bg-slate-900 border border-slate-700 border-dashed rounded p-4 text-center text-slate-500 hover:text-white cursor-pointer hover:border-red-500 transition-colors">
              <Camera className="w-6 h-6 mx-auto mb-2" />
              <span>Click to attach photo or audio file (Simulated)</span>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={!newLog.description}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2 uppercase tracking-widest"
          >
            <Save className="w-5 h-5" />
            SAVE EVIDENCE
          </button>
        </div>
      )}

      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <span className="text-red-400 font-bold uppercase text-sm">{log.type}</span>
                <span className="text-slate-500 text-xs">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                {getSeverityLabel(log.severity)}
                {log.policeReportNumber && (
                  <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded border border-blue-800 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Report: {log.policeReportNumber}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-slate-200 mb-3 whitespace-pre-wrap">{log.description}</p>
            
            <div className="flex gap-4 text-sm text-slate-400 border-t border-slate-700/50 pt-2">
              <div className="flex items-center gap-1">
                 <AlertTriangle className="w-4 h-4 text-orange-500" />
                 Child: <span className="text-slate-200">{log.childReaction}</span>
              </div>
              {log.witnesses && (
                <div className="flex items-center gap-1">
                   <Users className="w-4 h-4 text-blue-500" />
                   Wit: <span className="text-slate-200">{log.witnesses}</span>
                </div>
              )}
              {log.evidencePhoto && (
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4 text-green-500" />
                  <span className="text-slate-200">Evidence Attached</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {logs.length === 0 && !isAdding && (
          <div className="text-center p-8 text-slate-500 border border-dashed border-slate-700 rounded-lg">
            No incidents logged. Stay vigilant.
          </div>
        )}
      </div>
    </div>
  );
};

export default AbuseLog;