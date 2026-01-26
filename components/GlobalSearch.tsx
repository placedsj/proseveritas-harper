import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Package, Compass, LayoutDashboard, Map } from 'lucide-react';
import { ViewState, ProductTier, DailyMove, RoadmapTask, StrategyNote } from '../types';
import { products } from './ProductLab';
import { initialNotes } from './StrategyRoom';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
}

interface SearchResult {
  id: string;
  type: 'product' | 'strategy' | 'task' | 'roadmap';
  title: string;
  subtitle: string;
  view: ViewState;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // 1. Search Products
    products.forEach(p => {
      if (p.name.toLowerCase().includes(lowerQuery) || p.features.some(f => f.toLowerCase().includes(lowerQuery))) {
        searchResults.push({
          id: `prod-${p.id}`,
          type: 'product',
          title: p.name,
          subtitle: `${p.amps}A Kit - $${p.price}`,
          view: 'products'
        });
      }
    });

    // 2. Search Strategy Notes
    const savedNotes = localStorage.getItem('strategyNotes');
    const notes: StrategyNote[] = savedNotes ? JSON.parse(savedNotes) : initialNotes;
    notes.forEach(n => {
      if (n.content.toLowerCase().includes(lowerQuery) || n.category.includes(lowerQuery)) {
        searchResults.push({
          id: `note-${n.id}`,
          type: 'strategy',
          title: n.category.toUpperCase(),
          subtitle: n.content.substring(0, 60).replace(/\n/g, ' ') + '...',
          view: 'strategy'
        });
      }
    });

    // 3. Search Daily Moves (Dashboard)
    const savedMoves = localStorage.getItem('dailyMoves');
    if (savedMoves) {
      const moves: DailyMove[] = JSON.parse(savedMoves);
      moves.forEach(m => {
        if (m.text.toLowerCase().includes(lowerQuery)) {
          searchResults.push({
            id: `move-${m.id}`,
            type: 'task',
            title: 'Daily Move',
            subtitle: m.text,
            view: 'dashboard'
          });
        }
      });
    }

    // 4. Search Roadmap
    const savedRoadmap = localStorage.getItem('roadmapTasks');
    if (savedRoadmap) {
      const tasks: RoadmapTask[] = JSON.parse(savedRoadmap);
      tasks.forEach(t => {
        if (t.title.toLowerCase().includes(lowerQuery) || t.category.toLowerCase().includes(lowerQuery)) {
          searchResults.push({
            id: `road-${t.id}`,
            type: 'roadmap',
            title: `Roadmap (${t.status})`,
            subtitle: t.title,
            view: 'roadmap'
          });
        }
      });
    }

    setResults(searchResults);
  }, [query]);

  const handleSelect = (view: ViewState) => {
    onNavigate(view);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-orange-500" />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, tasks, notes..."
            className="flex-1 bg-transparent text-white text-lg placeholder-slate-500 focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto flex-1 p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result.view)}
                  className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-4 group"
                >
                  <div className={`p-2 rounded-lg bg-slate-800 group-hover:bg-slate-700 border border-slate-700 group-hover:border-slate-600 transition-colors`}>
                    {result.type === 'product' && <Package className="w-5 h-5 text-purple-400" />}
                    {result.type === 'strategy' && <Compass className="w-5 h-5 text-blue-400" />}
                    {result.type === 'task' && <LayoutDashboard className="w-5 h-5 text-green-400" />}
                    {result.type === 'roadmap' && <Map className="w-5 h-5 text-orange-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-200 font-semibold text-sm">{result.title}</h4>
                    <p className="text-slate-500 text-xs truncate">{result.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-slate-500">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-600 text-sm">
              <p>Type to search across your entire PLACED OS.</p>
            </div>
          )}
        </div>
        
        <div className="bg-slate-950 p-2 text-center text-[10px] text-slate-600 border-t border-slate-800 uppercase tracking-widest font-bold">
          Global Command Center
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;