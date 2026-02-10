import React, { useState, useEffect } from 'react';
import { StrategyNote } from '../types';
import { BookOpen, Scale, Handshake, Edit3 } from 'lucide-react';

export const initialNotes: StrategyNote[] = [
  { id: '1', category: 'copy', content: 'Tagline: "The cord stops here."\n\nValue Props:\n1. No more extension cords across the lawn.\n2. True 30A/50A power for tools, not just lights.\n3. Safety first monitoring.', lastUpdated: Date.now() },
  { id: '2', category: 'rules', content: 'NB Electrical Practice Reality:\n- Trench depth 24" required.\n- Warning tape essential.\n- Homeowner permits allow for DIY wire pull, but final connection needs Red Seal sign-off.\n- PLACED Strategy: We provide the "pre-certified" kit, local partner handles final tie-in.', lastUpdated: Date.now() },
  { id: '3', category: 'partners', content: 'Electrician Pitch:\n"We bring you the customer with the trench dug and wire pulled. You show up, terminate 4 ends, inspect, sign, and bill $300 for 1 hour of work. Zero sales effort for you."', lastUpdated: Date.now() },
];

const StrategyRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'copy' | 'rules' | 'partners'>('copy');
  
  const [notes, setNotes] = useState<StrategyNote[]>(() => {
    const saved = localStorage.getItem('strategyNotes');
    return saved ? JSON.parse(saved) : initialNotes;
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('strategyNotes', JSON.stringify(notes));
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [notes]);

  const activeNote = notes.find(n => n.category === activeTab);

  const handleUpdate = (content: string) => {
    setNotes(notes.map(n => n.category === activeTab ? { ...n, content, lastUpdated: Date.now() } : n));
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-64 space-y-2">
        <button 
          onClick={() => setActiveTab('copy')}
          className={`w-full p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'copy' ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-bold">Messaging & Copy</span>
        </button>
        <button 
          onClick={() => setActiveTab('rules')}
          className={`w-full p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'rules' ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Scale className="w-5 h-5" />
          <span className="font-bold">Rules vs Reality</span>
        </button>
        <button 
          onClick={() => setActiveTab('partners')}
          className={`w-full p-4 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'partners' ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          <Handshake className="w-5 h-5" />
          <span className="font-bold">Partnerships</span>
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 bg-slate-800 rounded-lg border border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-orange-500" />
            {activeTab === 'rules' ? 'NB Electrical Compliance' : activeTab === 'copy' ? 'Core Messaging' : 'Partner Network'}
          </h3>
          <span className="text-xs text-slate-500">Auto-saved</span>
        </div>
        <textarea 
          className="flex-1 bg-slate-900/50 text-slate-200 p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed m-2 rounded"
          value={activeNote?.content || ''}
          onChange={(e) => handleUpdate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default StrategyRoom;