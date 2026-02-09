
import React, { useState, useEffect } from 'react';
import { Heart, Plus, Save, Sun, Moon, Utensils } from 'lucide-react';
import { HarperLogEntry } from '../types';

const HarperLog: React.FC = () => {
  const [entries, setEntries] = useState<HarperLogEntry[]>(() => {
    const saved = localStorage.getItem('harperLog');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<HarperLogEntry>>({
    timestamp: new Date().toISOString().slice(0, 16),
    activity: '',
    mood: 'Happy',
    feedingNotes: '',
    milestones: ''
  });

  useEffect(() => {
    localStorage.setItem('harperLog', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!newEntry.activity) return;
    const entry: HarperLogEntry = {
      id: Date.now().toString(),
      timestamp: newEntry.timestamp || new Date().toISOString(),
      activity: newEntry.activity,
      mood: newEntry.mood as any,
      feedingNotes: newEntry.feedingNotes,
      milestones: newEntry.milestones
    };
    setEntries([entry, ...entries]);
    setIsAdding(false);
    setNewEntry({ timestamp: new Date().toISOString().slice(0, 16), activity: '', mood: 'Happy', feedingNotes: '', milestones: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            The Harper Log
          </h2>
          <p className="text-slate-500 text-sm">Positive parenting track record & well-being milestones.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold shadow-md hover:shadow-lg transition-all"
        >
          {isAdding ? "Cancel" : <><Plus className="w-4 h-4" /> Log Moment</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-pink-200 animate-fade-in shadow-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="datetime-local"
              value={newEntry.timestamp}
              onChange={e => setNewEntry({...newEntry, timestamp: e.target.value})}
              className="bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:border-pink-500 focus:outline-none transition-all"
            />
            <select 
              value={newEntry.mood}
              onChange={e => setNewEntry({...newEntry, mood: e.target.value as any})}
              className="bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:border-pink-500 transition-all"
            >
              <option value="Happy">Mood: Happy / Smiling</option>
              <option value="Calm">Mood: Calm / Sleeping</option>
              <option value="Tired">Mood: Tired</option>
              <option value="Fussy">Mood: Fussy</option>
            </select>
          </div>
          <input 
            type="text"
            placeholder="What did you do? (e.g., Reading books, Tummy time, Park)"
            value={newEntry.activity}
            onChange={e => setNewEntry({...newEntry, activity: e.target.value})}
            className="w-full bg-slate-50 border border-slate-300 rounded p-3 text-slate-900 focus:border-pink-500 transition-all"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea 
              placeholder="Feeding/Formula notes..."
              value={newEntry.feedingNotes}
              onChange={e => setNewEntry({...newEntry, feedingNotes: e.target.value})}
              className="bg-slate-50 border border-slate-300 rounded p-3 text-slate-900 h-20 transition-all"
            />
            <textarea 
              placeholder="Milestones or development observed..."
              value={newEntry.milestones}
              onChange={e => setNewEntry({...newEntry, milestones: e.target.value})}
              className="bg-slate-50 border border-slate-300 rounded p-3 text-slate-900 h-20 transition-all"
            />
          </div>
          <button 
            onClick={handleSave}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all"
          >
            <Save className="w-5 h-5 mx-auto" />
          </button>
        </div>
      )}

      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="bg-white p-5 rounded-lg border border-slate-200 hover:border-pink-200 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <span className="text-pink-600 font-bold text-lg">{entry.activity}</span>
                <span className="text-slate-400 text-xs font-mono">{new Date(entry.timestamp).toLocaleString()}</span>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                entry.mood === 'Happy' ? 'bg-green-50 text-green-600 border border-green-100' :
                entry.mood === 'Calm' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                'bg-amber-50 text-amber-600 border border-amber-100'
              }`}>
                {entry.mood}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {entry.feedingNotes && (
                <div className="flex items-start gap-2 text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                  <Utensils className="w-3 h-3 text-pink-500 mt-0.5" />
                  <p>{entry.feedingNotes}</p>
                </div>
              )}
              {entry.milestones && (
                <div className="flex items-start gap-2 text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                  <Heart className="w-3 h-3 text-pink-500 mt-0.5" />
                  <p>{entry.milestones}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HarperLog;
