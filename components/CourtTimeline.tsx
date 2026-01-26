import React, { useState, useEffect } from 'react';
import { CourtEvent, CaseName, CourtStatus } from '../types';
import { Gavel, Plus, CheckCircle2, Clock, Calendar } from 'lucide-react';

const CourtTimeline: React.FC = () => {
  const [events, setEvents] = useState<CourtEvent[]>(() => {
    const saved = localStorage.getItem('courtEvents');
    return saved ? JSON.parse(saved) : [
      { id: '1', date: '2026-02-03', caseName: 'Criminal Defense', judgeName: 'TBD', requiredAction: 'Sentencing Hearing - R v Schulz', status: 'Pending' }
    ];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CourtEvent>>({
    date: '',
    caseName: 'Criminal Defense',
    judgeName: '',
    requiredAction: '',
    status: 'Pending'
  });

  useEffect(() => {
    localStorage.setItem('courtEvents', JSON.stringify(events));
  }, [events]);

  const handleSave = () => {
    if (!newEvent.date || !newEvent.requiredAction) return;

    const event: CourtEvent = {
      id: Date.now().toString(),
      date: newEvent.date || '',
      caseName: newEvent.caseName as CaseName,
      judgeName: newEvent.judgeName || 'TBD',
      requiredAction: newEvent.requiredAction || '',
      status: 'Pending'
    };

    setEvents([...events, event].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setIsAdding(false);
    setNewEvent({ date: '', caseName: 'Criminal Defense', judgeName: '', requiredAction: '', status: 'Pending' });
  };

  const toggleStatus = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, status: e.status === 'Pending' ? 'Done' : 'Pending' } : e));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Gavel className="w-6 h-6 text-orange-500" />
          Court Timeline
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold"
        >
          <Plus className="w-4 h-4" /> Add Date
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Hearing Date</label>
              <input 
                type="date" 
                value={newEvent.date}
                onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Case</label>
              <select 
                value={newEvent.caseName}
                onChange={e => setNewEvent({...newEvent, caseName: e.target.value as CaseName})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="Criminal Defense">Criminal Defense (R v Schulz)</option>
                <option value="Family Law">Family Law (FDSJ-739-24)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Required Action / Description</label>
              <input 
                type="text" 
                value={newEvent.requiredAction}
                onChange={e => setNewEvent({...newEvent, requiredAction: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-orange-500 focus:outline-none"
                placeholder="e.g. Sentencing Hearing"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs uppercase font-bold mb-1">Judge Name</label>
              <input 
                type="text" 
                value={newEvent.judgeName}
                onChange={e => setNewEvent({...newEvent, judgeName: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-orange-500 focus:outline-none"
                placeholder="Presiding Judge"
              />
            </div>
          </div>
          <button 
            onClick={handleSave}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-bold"
          >
            Add to Docket
          </button>
        </div>
      )}

      <div className="space-y-4">
        {events.map(event => (
          <div 
            key={event.id} 
            className={`p-4 rounded-lg border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
              event.status === 'Done' 
                ? 'bg-slate-900 border-slate-800 opacity-60' 
                : 'bg-slate-800 border-slate-700 hover:border-orange-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full flex-shrink-0 ${
                event.caseName === 'Criminal Defense' ? 'bg-red-900/20 text-red-500' : 'bg-blue-900/20 text-blue-500'
              }`}>
                <Gavel className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-lg ${event.status === 'Done' ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {event.requiredAction}
                  </h3>
                  <span className="text-[10px] uppercase font-bold bg-slate-900 px-2 rounded text-slate-400 border border-slate-800">
                    {event.caseName}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {event.date}
                  </span>
                  <span>Judge: {event.judgeName}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => toggleStatus(event.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-bold border transition-colors ${
                event.status === 'Done' 
                  ? 'bg-green-900/20 text-green-500 border-green-900' 
                  : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
              }`}
            >
              {event.status === 'Done' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              {event.status}
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-center p-8 text-slate-500 border border-dashed border-slate-700 rounded-lg">
            No court dates scheduled.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtTimeline;
