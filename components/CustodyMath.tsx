
import React, { useState, useEffect, useMemo } from 'react';
import { ParentingBlock, CustodyStatus } from '../types';
import { Calculator, Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

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

  const calculateHours = (start: string, end: string): number => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return Number((diff / (1000 * 60 * 60)).toFixed(1));
  };

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

  // STATISTICS
  const stats = useMemo(() => {
    const { totalScheduled, totalDenied, successHours } = blocks.reduce(
      (acc, b) => {
        const hours = calculateHours(b.scheduledStart, b.scheduledEnd);
        acc.totalScheduled += hours;
        if (b.status === 'Denied by Mother') {
          acc.totalDenied += hours;
        } else if (b.status === 'Success') {
          acc.successHours += hours;
        }
        return acc;
      },
      { totalScheduled: 0, totalDenied: 0, successHours: 0 }
    );

    // Fix floating point precision issues after summation
    const result = {
      totalScheduled: Number(totalScheduled.toFixed(1)),
      totalDenied: Number(totalDenied.toFixed(1)),
      successHours: Number(successHours.toFixed(1)),
      denialRate: totalScheduled > 0 ? ((totalDenied / totalScheduled) * 100).toFixed(1) : "0.0"
    };
    
    return result;
  }, [blocks]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* SCOREBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 flex flex-col items-center shadow-sm">
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Total Scheduled</h3>
            <span className="text-3xl font-mono text-slate-900">{stats.totalScheduled} HRS</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 flex flex-col items-center shadow-sm">
             <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Success Rate</h3>
             <span className="text-3xl font-mono text-green-600">
               {stats.totalScheduled > 0 ? ((stats.successHours / stats.totalScheduled) * 100).toFixed(1) : 0}%
             </span>
        </div>
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 flex flex-col items-center relative overflow-hidden shadow-sm">
             <div className="absolute top-2 right-2 animate-pulse"><AlertTriangle className="w-4 h-4 text-red-500" /></div>
             <h3 className="text-red-700 text-xs uppercase font-bold tracking-widest mb-2">Non-Compliance %</h3>
             <span className="text-4xl font-black text-red-600">{stats.denialRate}%</span>
             <p className="text-[10px] text-red-500 mt-1">{stats.totalDenied} Hours Denied</p>
        </div>
      </div>

      {/* INPUT FORM */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
           <Calculator className="w-5 h-5 text-blue-500" />
           <h3 className="text-lg font-bold text-slate-900">Log Parenting Block</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
            <div>
                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Start Date</label>
                <input type="date" value={newBlock.startDate} onChange={e => setNewBlock({...newBlock, startDate: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Time</label>
                <input type="time" value={newBlock.startTime} onChange={e => setNewBlock({...newBlock, startTime: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">End Date</label>
                <input type="date" value={newBlock.endDate} onChange={e => setNewBlock({...newBlock, endDate: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500" />
            </div>
             <div>
                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Time</label>
                <input type="time" value={newBlock.endTime} onChange={e => setNewBlock({...newBlock, endTime: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Outcome</label>
                 <select value={newBlock.status} onChange={e => setNewBlock({...newBlock, status: e.target.value as any})} className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer">
                     <option value="Success">Success</option>
                     <option value="Denied by Mother">Denied (Mother)</option>
                     <option value="Forfeited by Father">Forfeited (Father)</option>
                 </select>
            </div>
        </div>
        <button onClick={addBlock} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors shadow-md active:scale-95">
            Calculate & Log Block
        </button>
      </div>

      {/* HISTORY TABLE */}
      <div className="space-y-2">
         {blocks.map(block => {
             const duration = calculateHours(block.scheduledStart, block.scheduledEnd);
             return (
                 <div key={block.id} className={`flex items-center justify-between p-3 rounded border ${
                     block.status === 'Denied by Mother' ? 'bg-red-50 border-red-200' : 
                     block.status === 'Forfeited by Father' ? 'bg-slate-100 border-slate-200 opacity-60' : 
                     'bg-green-50 border-green-200'
                 }`}>
                     <div className="flex items-center gap-4">
                         {block.status === 'Denied by Mother' ? <XCircle className="w-5 h-5 text-red-500" /> : <CheckCircle2 className="w-5 h-5 text-green-500" />}
                         <div>
                             <div className="text-slate-900 font-bold text-sm">
                                 {new Date(block.scheduledStart).toLocaleDateString()}
                             </div>
                             <div className="text-slate-500 text-xs flex gap-2">
                                 <span>{new Date(block.scheduledStart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                 <span>→</span>
                                 <span>{new Date(block.scheduledEnd).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                             </div>
                         </div>
                     </div>
                     <div className="text-right">
                         <div className="text-slate-900 font-mono font-bold">{duration} hrs</div>
                         <div className={`text-[10px] uppercase tracking-wider font-bold ${
                             block.status === 'Denied by Mother' ? 'text-red-600' : 'text-slate-400'
                         }`}>
                             {block.status === 'Denied by Mother' ? 'DENIED' : 'COMPLETED'}
                         </div>
                     </div>
                 </div>
             )
         })}
      </div>
    </div>
  );
};

export default CustodyMath;
