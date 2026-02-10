import React, { useState, useEffect } from 'react';
import { Stethoscope, Activity, ArrowRight, Brain, ShieldAlert, Plus, Trash2, Save, X } from 'lucide-react';
import { HealthStatus } from '../types';

const HealthRehab: React.FC = () => {
  const [statuses, setStatuses] = useState<HealthStatus[]>(() => {
    const saved = localStorage.getItem('healthStatus');
    return saved ? JSON.parse(saved) : [
      { id: '1', condition: 'C5-C6 Spinal Injury', status: 'Pending Claim', nextStep: 'Submit WorkSafeNB Application for Compensation', lastReview: 'Jan 25' },
      { id: '2', condition: 'ADHD Management', status: 'Intake Required', nextStep: 'Call Mental Health / Social Dev for booking', lastReview: 'Jan 25' },
      { id: '3', condition: 'Gentle Path Counselling', status: 'Active (Ref: Andrea)', nextStep: 'Attend scheduled sessions', lastReview: 'Jan 25' },
    ];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newStatus, setNewStatus] = useState<Partial<HealthStatus>>({
    condition: '',
    status: '',
    nextStep: '',
    lastReview: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  });

  useEffect(() => {
    localStorage.setItem('healthStatus', JSON.stringify(statuses));
  }, [statuses]);

  const handleSave = () => {
    if (!newStatus.condition || !newStatus.status) return;

    const entry: HealthStatus = {
      id: Date.now().toString(),
      condition: newStatus.condition,
      status: newStatus.status,
      nextStep: newStatus.nextStep || '',
      lastReview: newStatus.lastReview || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    setStatuses([...statuses, entry]);
    setIsAdding(false);
    setNewStatus({
      condition: '',
      status: '',
      nextStep: '',
      lastReview: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  };

  const handleDelete = (id: string) => {
    setStatuses(statuses.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-red-500" />
            Health & Rehab Protocol
          </h2>
          <p className="text-slate-500 text-sm">Proving Fitness & Capacity for Harper June Elizabeth.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold shadow-md hover:shadow-lg transition-all"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? "Cancel" : "Add Protocol"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-red-200 shadow-md text-left">
          <h3 className="font-bold text-slate-900 mb-4 uppercase text-sm">New Health Protocol</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Condition</label>
              <input
                type="text"
                value={newStatus.condition}
                onChange={e => setNewStatus({...newStatus, condition: e.target.value})}
                className="w-full p-2 border border-slate-300 rounded text-sm focus:border-red-500 focus:outline-none"
                placeholder="e.g. Physical Therapy"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Status</label>
              <input
                type="text"
                value={newStatus.status}
                onChange={e => setNewStatus({...newStatus, status: e.target.value})}
                className="w-full p-2 border border-slate-300 rounded text-sm focus:border-red-500 focus:outline-none"
                placeholder="e.g. Active"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Next Step</label>
            <input
              type="text"
              value={newStatus.nextStep}
              onChange={e => setNewStatus({...newStatus, nextStep: e.target.value})}
              className="w-full p-2 border border-slate-300 rounded text-sm focus:border-red-500 focus:outline-none"
              placeholder="e.g. Schedule appointment"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold text-sm flex justify-center items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Protocol
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-red-300 hover:shadow-md transition-all flex flex-col h-full text-left group relative">
            <button
              onClick={() => handleDelete(s.id)}
              className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex justify-between items-start mb-4 pr-6">
              <h3 className="text-slate-900 font-bold text-lg leading-tight">{s.condition}</h3>
              {s.condition.includes('ADHD') ? <Brain className="w-5 h-5 text-purple-500" /> : <Stethoscope className="w-5 h-5 text-red-500" />}
            </div>
            
            <div className="flex-grow space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Current State</span>
                <span className="text-slate-700 text-sm bg-slate-50 px-2 py-1 rounded border border-slate-200 font-semibold">{s.status}</span>
              </div>
              
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Next Objective</span>
                <p className="text-slate-900 text-sm font-semibold">{s.nextStep}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
               <span className="text-[10px] text-slate-400">Updated: {s.lastReview}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-50 border border-red-100 p-8 rounded-2xl relative overflow-hidden text-left shadow-sm">
         <div className="relative z-10">
           <h3 className="text-xl font-bold text-red-900 uppercase tracking-widest mb-6 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-red-600" /> System Defense Intel
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-red-900 text-sm">
              <div className="space-y-4">
                 <p><span className="text-red-700 font-bold uppercase">SJRH Audit:</span> Kelly Chase can see access logs. Every time your name is typed into the system, there is a record. Use this to audit the "Do Not Collect" move.</p>
                 <p><span className="text-red-700 font-bold uppercase">Consent Revocation:</span> Threatening to revoke consent to info is a tactical lever if the system remains biased. Proceed with caution.</p>
              </div>
              <div className="space-y-4">
                 <p><span className="text-red-700 font-bold uppercase">Gentle Path:</span> High court value. It proves you are the victim of the system/domestic situation and are proactively seeking health, not just reacting.</p>
                 <p><span className="text-red-700 font-bold uppercase">ADHD Strategy:</span> Getting a fresh intake is about *documentation control*. You want the narrative of "managed condition" rather than "untreated impairment".</p>
              </div>
           </div>
         </div>
         <div className="absolute -right-4 -bottom-4 opacity-10">
            <Activity className="w-64 h-64 text-red-500" />
         </div>
      </div>
    </div>
  );
};

export default HealthRehab;
