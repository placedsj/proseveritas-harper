import React, { useState, useEffect } from 'react';
import { Sun, Moon, CheckCircle, Circle, Volume2 } from 'lucide-react';
import { DailyChecklist } from '../types';
import { speak } from '../services/audioService';

interface DailyRitualProps {
  audioEnabled: boolean;
}

const DailyRitual: React.FC<DailyRitualProps> = ({ audioEnabled }) => {
  const [checklist, setChecklist] = useState<DailyChecklist>(() => {
    const saved = localStorage.getItem('dailyChecklist');
    return saved ? JSON.parse(saved) : {
      sleep: false,
      mental: false,
      food: false,
      readReality: false,
      oneTask: false,
      noContact: false,
      progressMade: false
    };
  });

  useEffect(() => {
    localStorage.setItem('dailyChecklist', JSON.stringify(checklist));
  }, [checklist]);

  const toggle = (key: keyof DailyChecklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speak(text);
  };

  const Item = ({ label, id, warning }: { label: string, id: keyof DailyChecklist, warning?: string }) => (
    <div 
      onClick={() => toggle(id)}
      className={`relative flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors group ${
        checklist[id] ? 'bg-green-900/20 border border-green-800' : 'bg-slate-800 border border-slate-700 hover:bg-slate-750'
      }`}
    >
      <div className={`mt-1 ${checklist[id] ? 'text-green-500' : 'text-slate-500'}`}>
        {checklist[id] ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
      </div>
      <div className="flex-1 pr-8">
        <p className={`font-medium ${checklist[id] ? 'text-green-100' : 'text-slate-200'}`}>{label}</p>
        {warning && !checklist[id] && (
          <p className="text-xs text-amber-500 mt-1 uppercase font-bold tracking-wide">{warning}</p>
        )}
      </div>
      
      {audioEnabled && (
        <button 
          onClick={(e) => handleSpeak(e, warning ? `${label}. Warning: ${warning}` : label)}
          className="absolute right-3 top-3 p-2 text-slate-500 hover:text-blue-400 opacity-50 group-hover:opacity-100 transition-all"
          title="Play Reminder"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-4 text-amber-400">
          <Sun className="w-6 h-6" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Morning Protocol</h2>
        </div>
        <div className="space-y-3">
          <Item id="sleep" label="Did you get 5+ hours sleep?" warning="If NO, adjust intensity today." />
          <Item id="mental" label="Mental Check: Are you spiraling?" warning="If YES, call recovery or church FIRST." />
          <Item id="food" label="Eat something. Protein. Now." />
          <Item id="readReality" label="Read 'The Reality Check' & Daily Task." />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4 text-indigo-400">
          <Moon className="w-6 h-6" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Evening Protocol</h2>
        </div>
        <div className="space-y-3">
          <Item id="noContact" label="Did I avoid talking to cops/ex/social media?" warning="Silence is safety." />
          <Item id="progressMade" label="Did I make ONE court-related step forward?" />
          <Item id="oneTask" label="Sleep 6+ hours. Non-negotiable." />
        </div>
      </div>
      
      <button 
        onClick={() => setChecklist({
            sleep: false, mental: false, food: false, readReality: false, 
            oneTask: false, noContact: false, progressMade: false
        })}
        className="w-full py-3 text-slate-500 hover:text-white text-sm uppercase tracking-widest hover:bg-slate-800 rounded transition-colors"
      >
        Reset for New Day
      </button>
    </div>
  );
};

export default DailyRitual;