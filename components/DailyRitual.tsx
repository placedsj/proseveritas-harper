import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { DailyChecklist } from '../types';
import { speak } from '../services/audioService';
import DailyRitualItem from './DailyRitualItem';

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

  const toggle = useCallback((key: keyof DailyChecklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleSpeak = useCallback((e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speak(text);
  }, []);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-4 text-amber-400">
          <Sun className="w-6 h-6" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Morning Protocol</h2>
        </div>
        <div className="space-y-3">
          <DailyRitualItem
            id="sleep"
            label="Did you get 5+ hours sleep?"
            warning="If NO, adjust intensity today."
            checked={checklist.sleep}
            onToggle={toggle}
            audioEnabled={audioEnabled}
            onSpeak={handleSpeak}
          />
          <DailyRitualItem
            id="mental"
            label="Mental Check: Are you spiraling?"
            warning="If YES, call recovery or church FIRST."
            checked={checklist.mental}
            onToggle={toggle}
            audioEnabled={audioEnabled}
            onSpeak={handleSpeak}
          />
          <DailyRitualItem
            id="food"
            label="Eat something. Protein. Now."
            checked={checklist.food}
            onToggle={toggle}
            audioEnabled={audioEnabled}
            onSpeak={handleSpeak}
          />
          <DailyRitualItem
            id="readReality"
            label="Read 'The Reality Check' & Daily Task."
            checked={checklist.readReality}
            onToggle={toggle}
            audioEnabled={audioEnabled}
            onSpeak={handleSpeak}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4 text-indigo-400">
          <Moon className="w-6 h-6" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Evening Protocol</h2>
        </div>
        <div className="space-y-3">
          <DailyRitualItem
            id="noContact"
            label="Did I avoid talking to cops/ex/social media?"
            warning="Silence is safety."
            checked={checklist.noContact}
            onToggle={toggle}
            audioEnabled={audioEnabled}
            onSpeak={handleSpeak}
          />
          <DailyRitualItem
            id="progressMade"
            label="Did I make ONE court-related step forward?"
            checked={checklist.progressMade}
            onToggle={toggle}
            audioEnabled={audioEnabled}
            onSpeak={handleSpeak}
          />
          <DailyRitualItem
            id="oneTask"
            label="Sleep 6+ hours. Non-negotiable."
            checked={checklist.oneTask}
            onToggle={toggle}
            audioEnabled={audioEnabled}
            onSpeak={handleSpeak}
          />
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
