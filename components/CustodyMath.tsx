
import React, { useState, useEffect, useMemo } from 'react';
import { ParentingBlock, CustodyStatus } from '../types';
import { Calculator, Clock, CheckCircle2, XCircle, AlertTriangle, Trash2 } from 'lucide-react';

export const calculateHours = (start: string, end: string): number => {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Number((diff / (1000 * 60 * 60)).toFixed(1));
};

const CustodyMath: React.FC = () => {
  const [blocks, setBlocks] = useState<ParentingBlock[]>(() => {
    const saved = localStorage.getItem('custodyBlocks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newBlock, setNewBlock] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    status: 'Success' as CustodyStatus
  });

  useEffect(() => {
    localStorage.setItem('custodyBlocks', JSON.stringify(blocks));
  }, [blocks]);

  const addBlock = () => {
    if (!newBlock.startDate || !newBlock.startTime || !newBlock.endDate || !newBlock.endTime) return;

    const startIso = `${newBlock.startDate}T${newBlock.startTime}`;
    const endIso = `${newBlock.endDate}T${newBlock.endTime}`;
    const hours = calculateHours(startIso, endIso);

    if (hours <= 0) {
        alert("End time must be after start time");
        return;
    }

    const block: ParentingBlock = {
      id: Date.now().toString(),
      scheduledStart: startIso,
      scheduledEnd: endIso,
      status: newBlock.status,
      hoursLost: newBlock.status === 'Denied by Mother' ? hours : 0
    };

    setBlocks([block, ...blocks].sort((a,b) => new Date(b.scheduledStart).getTime() - new Date(a.scheduledStart).getTime()));
    // Reset but keep dates for convenience
    setNewBlock({ ...newBlock, startTime: '', endTime: '' });
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  // STATISTICS
  const stats = useMemo(() => {
    const totalScheduled = blocks.reduce((acc, b) => acc + calculateHours(b.scheduledStart, b.scheduledEnd), 0);
    const totalDenied = blocks.reduce((acc, b) => acc + (b.status === 'Denied by Mother' ? calculateHours(b.scheduledStart, b.scheduledEnd) : 0), 0);
    const successHours = blocks.reduce((acc, b) => acc + (b.status === 'Success' ? calculateHours(b.scheduledStart, b.scheduledEnd) : 0), 0);
    
    const denialRate = totalScheduled > 0 ? ((totalDenied / totalScheduled) * 100).toFixed(1) : "0.0";
    const successRate = totalScheduled > 0 ? ((successHours / totalScheduled) * 100).toFixed(1) : "0.0";
    
    return { totalScheduled, totalDenied, successHours, denialRate, successRate };
  }, [blocks]);

  return (
    <div className="space-y-8">
      {/* SCOREBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col items-center">
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Total Scheduled</h3>
            <span className="text-3xl font-mono text-white">{stats.totalScheduled} HRS</span>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col items-center">
             <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Success Rate</h3>
             <span className="text-3xl font-mono text-green-400">
               {stats.successRate}%
             </span>
        </div>
        <div className="bg-red-900/20 p-6 rounded-lg border border-red-600 flex flex-col items-center relative overflow-hidden">
             <div className="absolute top-2 right-2 animate-pulse"><AlertTriangle className="w-4 h-4 text-red-500" /></div>
             <h3 className="text-red-400 text-xs uppercase font-bold tracking-widest mb-2">Non-Compliance %</h3>
             <span className="text-4xl font-black text-red-500">{stats.denialRate}%</span>
             <p className="text-[10px] text-red-300 mt-1">{stats.totalDenied} Hours Denied</p>
        </div>
      </div>

      {/* INPUT FORM */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
           <Calculator className="w-5 h-5 text-blue-500" />
           <h3 className="text-lg font-bold text-white">Log Parenting Block</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
            <div>
                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Start Date</label>
                <input type="date" value={newBlock.startDate} onChange={e => setNewBlock({...newBlock, startDate: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" />
            </div>
            <div>
                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Time</label>
                <input type="time" value={newBlock.startTime} onChange={e => setNewBlock({...newBlock, startTime: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" />
            </div>
            <div>
                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">End Date</label>
                <input type="date" value={newBlock.endDate} onChange={e => setNewBlock({...newBlock, endDate: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" />
            </div>
             <div>
                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Time</label>
                <input type="time" value={newBlock.endTime} onChange={e => setNewBlock({...newBlock, endTime: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" />
            </div>
            <div>
                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Outcome</label>
                 <select value={newBlock.status} onChange={e => setNewBlock({...newBlock, status: e.target.value as any})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none">
                     <option value="Success">Success</option>
                     <option value="Denied by Mother">Denied (Mother)</option>
                     <option value="Forfeited by Father">Forfeited (Father)</option>
                 </select>
            </div>
        </div>
        <button onClick={addBlock} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors">
            Calculate & Log Block
        </button>
      </div>

      {/* HISTORY TABLE */}
      <div className="space-y-2">
         {blocks.map(block => {
             const duration = calculateHours(block.scheduledStart, block.scheduledEnd);
             return (
                 <div key={block.id} className={`flex items-center justify-between p-3 rounded border ${
                     block.status === 'Denied by Mother' ? 'bg-red-950/20 border-red-900/50' : 
                     block.status === 'Forfeited by Father' ? 'bg-slate-900 border-slate-800 opacity-50' : 
                     'bg-green-950/10 border-green-900/30'
                 }`}>
                     <div className="flex items-center gap-4">
                         {block.status === 'Denied by Mother' ? <XCircle className="w-5 h-5 text-red-500" /> : <CheckCircle2 className="w-5 h-5 text-green-500" />}
                         <div>
                             <div className="text-white font-bold text-sm">
                                 {new Date(block.scheduledStart).toLocaleDateString()}
                             </div>
                             <div className="text-slate-500 text-xs flex gap-2">
                                 <span>{new Date(block.scheduledStart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                 <span>→</span>
                                 <span>{new Date(block.scheduledEnd).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                             </div>
                         </div>
                     </div>
                     <div className="text-right flex items-center gap-4">
                         <div>
                            <div className="text-white font-mono font-bold">{duration} hrs</div>
                            <div className={`text-[10px] uppercase tracking-wider font-bold ${
                                block.status === 'Denied by Mother' ? 'text-red-400' : 'text-slate-500'
                            }`}>
                                {block.status === 'Denied by Mother' ? 'DENIED' : 'COMPLETED'}
                            </div>
                         </div>
                         <button
                            onClick={() => deleteBlock(block.id)}
                            className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-900/20 rounded transition-all"
                         >
                            <Trash2 className="w-4 h-4" />
                         </button>
                     </div>
                 </div>
             )
         })}
      </div>
    </div>
  );
};

export default CustodyMath;
