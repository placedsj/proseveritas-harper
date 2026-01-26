import React, { useState, useEffect } from 'react';
import { SpiralEntry } from '../types';
import { Brain, Trash2, Zap, Save } from 'lucide-react';
import { getRealityCheck } from '../services/geminiService';

const SpiralJournal: React.FC = () => {
  const [entries, setEntries] = useState<SpiralEntry[]>(() => {
    const saved = localStorage.getItem('spiralEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentThought, setCurrentThought] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    localStorage.setItem('spiralEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = async () => {
    if (!currentThought.trim()) return;

    const newEntry: SpiralEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      content: currentThought,
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentThought('');
  };

  const handleAnalyze = async (id: string, content: string) => {
    setIsAnalyzing(true);
    const response = await getRealityCheck(content);
    setEntries(prev => prev.map(e => e.id === id ? { ...e, aiResponse: response } : e));
    setIsAnalyzing(false);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Anti-Spiral Journal</h2>
        </div>
        <p className="text-slate-400 text-sm mb-4">
          Write down the racing thoughts here. Get them out of your head. Do NOT act on them.
        </p>
        
        <textarea
          value={currentThought}
          onChange={(e) => setCurrentThought(e.target.value)}
          placeholder="I'm worried about..."
          className="w-full bg-slate-900 text-white p-4 rounded border border-slate-700 focus:border-purple-500 focus:outline-none min-h-[120px] mb-4"
        />
        
        <button
          onClick={handleSave}
          disabled={!currentThought.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save Thought (Don't Chase It)
        </button>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="bg-slate-800 p-4 rounded border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-slate-500">{new Date(entry.timestamp).toLocaleString()}</span>
              <button onClick={() => deleteEntry(entry.id)} className="text-slate-600 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-200 mb-4">{entry.content}</p>
            
            {entry.aiResponse ? (
              <div className="bg-green-900/20 border border-green-800 p-3 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-3 h-3 text-green-400" />
                  <span className="text-xs font-bold text-green-400 uppercase">Reality Check</span>
                </div>
                <p className="text-green-100 text-sm">{entry.aiResponse}</p>
              </div>
            ) : (
              <button
                onClick={() => handleAnalyze(entry.id, entry.content)}
                disabled={isAnalyzing}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Zap className="w-3 h-3" />
                {isAnalyzing ? "Analyzing..." : "Get AI Reality Check"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiralJournal;