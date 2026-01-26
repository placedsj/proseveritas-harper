import React, { useState, useEffect } from 'react';
import { DailyMove, BusinessMetric } from '../types';
import { TrendingUp, Users, Zap, CheckSquare, Square, AlertCircle, DollarSign, Plus, X, Trash2 } from 'lucide-react';

const initialMoves: DailyMove[] = [
  { id: '1', text: 'Finalize 30A Workshop Kit pricing breakdown', impact: 'high', completed: false },
  { id: '2', text: 'Call 3 local electricians for install partnerships', impact: 'high', completed: false },
  { id: '3', text: 'Draft "The cord stops here" landing page copy', impact: 'med', completed: true },
];

const initialMetrics: BusinessMetric = {
  oneTimeRevenue: 12500,
  mrr: 342,
  activeInstalls: 18,
  churnRate: 0,
};

const Dashboard: React.FC = () => {
  const [moves, setMoves] = useState<DailyMove[]>(() => {
    const saved = localStorage.getItem('dailyMoves');
    return saved ? JSON.parse(saved) : initialMoves;
  });

  const [metrics] = useState<BusinessMetric>(initialMetrics);
  const [isAdding, setIsAdding] = useState(false);
  const [newMove, setNewMove] = useState({ text: '', impact: 'high' as 'high' | 'med' | 'low' });

  useEffect(() => {
    localStorage.setItem('dailyMoves', JSON.stringify(moves));
  }, [moves]);

  const toggleMove = (id: string) => {
    setMoves(moves.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const deleteMove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setMoves(moves.filter(m => m.id !== id));
  };

  const addMove = () => {
    if (!newMove.text.trim()) return;
    const move: DailyMove = {
      id: Date.now().toString(),
      text: newMove.text,
      impact: newMove.impact,
      completed: false
    };
    setMoves([move, ...moves]);
    setNewMove({ text: '', impact: 'high' });
    setIsAdding(false);
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'high': return 'text-orange-500 border-orange-500/50 bg-orange-950/30';
      case 'med': return 'text-blue-500 border-blue-500/50 bg-blue-950/30';
      case 'low': return 'text-slate-500 border-slate-500/50 bg-slate-950/30';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800 border-l-4 border-orange-500 p-6 rounded-lg shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">PLACED Co-Founder OS</h1>
          <p className="text-slate-400 text-sm">
            Mode: <span className="text-orange-400 font-bold animate-pulse">MOTION</span>
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-slate-500 uppercase tracking-widest">Target Launch</p>
          <p className="text-white font-mono">T-Minus 24 Days</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <h3 className="text-slate-400 text-sm uppercase font-bold">Total Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-white">${metrics.oneTimeRevenue.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">One-time Kit Sales</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-slate-400 text-sm uppercase font-bold">Monthly Recurring</h3>
          </div>
          <p className="text-2xl font-bold text-white">${metrics.mrr.toLocaleString()}/mo</p>
          <p className="text-xs text-slate-500 mt-1">ShedCare Subscriptions</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <h3 className="text-slate-400 text-sm uppercase font-bold">Active Installs</h3>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.activeInstalls}</p>
          <p className="text-xs text-slate-500 mt-1">Connected Systems</p>
        </div>
      </div>

      {/* Today's Moves */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-orange-500" />
            Today's Moves
          </h2>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded border border-slate-600 flex items-center gap-2 transition-colors"
          >
            {isAdding ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            {isAdding ? "Cancel" : "Add Move"}
          </button>
        </div>

        {isAdding && (
          <div className="mb-6 bg-slate-800 p-4 rounded-lg border border-slate-600 animate-fade-in">
            <input 
              type="text"
              value={newMove.text}
              onChange={e => setNewMove({...newMove, text: e.target.value})}
              placeholder="What needs to get done?"
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white mb-3 focus:border-orange-500 focus:outline-none"
              autoFocus
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {(['high', 'med', 'low'] as const).map((impact) => (
                  <button
                    key={impact}
                    onClick={() => setNewMove({...newMove, impact})}
                    className={`text-xs px-3 py-1 rounded uppercase font-bold border ${
                      newMove.impact === impact 
                        ? getImpactColor(impact)
                        : 'border-slate-700 text-slate-500 hover:border-slate-500'
                    }`}
                  >
                    {impact}
                  </button>
                ))}
              </div>
              <button 
                onClick={addMove}
                disabled={!newMove.text.trim()}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded text-sm font-bold disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {moves.map(move => (
            <div 
              key={move.id}
              onClick={() => toggleMove(move.id)}
              className={`group flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all border ${
                move.completed 
                  ? 'bg-slate-900/50 border-slate-800 opacity-50' 
                  : 'bg-slate-800 border-slate-700 hover:border-orange-500/50'
              }`}
            >
              <div className={`mt-1 ${move.completed ? 'text-slate-600' : 'text-orange-500'}`}>
                {move.completed ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${move.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                  {move.text}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getImpactColor(move.impact)}`}>
                    {move.impact} Impact
                  </span>
                </div>
              </div>
              <button 
                onClick={(e) => deleteMove(e, move.id)}
                className="text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {moves.length === 0 && (
            <div className="text-center py-8 text-slate-500 border border-dashed border-slate-800 rounded-lg">
              No moves for today. Hit "Add Move" to start the engine.
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-orange-100 font-semibold text-sm">System Alert</h3>
          <p className="text-orange-200/70 text-xs mt-1">
            3 Units in "Moncton North" showing high temperature warnings (>35°C). Check ventilation specs for Workshop Tier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;