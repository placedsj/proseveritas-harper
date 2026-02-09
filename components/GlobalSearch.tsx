import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Package, Compass, LayoutDashboard, Map, FileText, Stethoscope, Scale, ShieldAlert, Gavel, Clock as ClockIcon } from 'lucide-react';
import { 
  ViewState, ProductTier, DailyMove, RoadmapTask, StrategyNote,
  ProcessedEvidenceItem, MedicalRecord, ScottLogEntry, AbuseLogEntry,
  TimelineEvent, CourtEvent,
} from '../types';
import { products } from './ProductLab';
import { initialNotes } from './StrategyRoom';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
}

interface SearchResult {
  id: string;
  type: 'product' | 'strategy' | 'task' | 'roadmap' | 'evidence-processor' | 'medical-record' | 'scott-log' | 'abuse-log' | 'timeline-event' | 'court-event' | 'evidence-vault';
  title: string;
  subtitle: string;
  view: ViewState;
  score: number;
}

// Fix: Corrected generic type syntax and error handling
const getLocalStorageItem = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error: unknown) {
    console.error(`Error parsing localStorage item for key "${key}":`, error);
    return defaultValue;
  }
};

// Fix: Corrected component destructuring and variable declarations
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
    const filters: { [key: string]: string } = {};
    let textQuery = lowerQuery;

    // Fix: Properly declare match and search logic variables
    const filterRegex = /(sender|receiver|from|to|date|category|type|status|title|source|text):([\w\s.-]+)(?=\s|$)/g;
    let match: RegExpExecArray | null;
    while ((match = filterRegex.exec(lowerQuery)) !== null) {
      if (match[1] && match[2]) {
        filters[match[1]] = match[2].trim();
        textQuery = textQuery.replace(match[0], '').trim();
      }
    }

    // Fix: Helper to check if an item matches date filters
    const matchesDateFilters = (itemDateStr?: string) => {
      if (!itemDateStr) return false;
      const itemDate = new Date(itemDateStr);
      if (isNaN(itemDate.getTime())) return false;

      if (filters.date) {
        if (!itemDateStr.toLowerCase().includes(filters.date)) return false;
      }
      
      if (filters.from) {
        const fromDate = new Date(filters.from);
        if (isNaN(fromDate.getTime()) || itemDate < fromDate) return false;
      }

      if (filters.to) {
        const toDate = new Date(filters.to);
        toDate.setHours(23, 59, 59, 999); 
        if (isNaN(toDate.getTime()) || itemDate > toDate) return false;
      }
      return true;
    };

    // Fix: Correctly define generateSnippet
    const generateSnippet = (fullText: string, highlightWord: string, maxLength = 80) => {
      const index = fullText.toLowerCase().indexOf(highlightWord.toLowerCase());
      if (index === -1) {
        return fullText.substring(0, maxLength) + (fullText.length > maxLength ? '...' : '');
      }
      const start = Math.max(0, index - (maxLength / 2));
      const end = Math.min(fullText.length, index + highlightWord.length + (maxLength / 2));
      let snippet = fullText.substring(start, end);
      if (start > 0) snippet = '...' + snippet;
      if (end < fullText.length) snippet = snippet + '...';
      return snippet;
    };

    // 1. Evidence Processor
    const processedEvidence = getLocalStorageItem<ProcessedEvidenceItem[]>('evidence', []);
    processedEvidence.forEach(item => {
      let score = 0;
      let matchedSnippet = '';
      if (filters.sender && item.sender.toLowerCase().includes(filters.sender)) score += 10;
      if (filters.receiver && item.rec.toLowerCase().includes(filters.receiver)) score += 10;
      if (filters.category && item.cat.toLowerCase().includes(filters.category)) score += 15;
      if (filters.text && item.text.toLowerCase().includes(filters.text)) {
        score += 20;
        matchedSnippet = generateSnippet(item.text, filters.text);
      } else if (textQuery && item.text.toLowerCase().includes(textQuery)) {
        score += 10;
        matchedSnippet = generateSnippet(item.text, textQuery);
      }
      if (matchesDateFilters(item.date)) score += 5;
      if (item.file.toLowerCase().includes(lowerQuery)) score += 5;
      
      if (score > 0) {
        searchResults.push({
          id: `ep-${item.hash}`,
          type: 'evidence-processor',
          title: item.file,
          subtitle: matchedSnippet || `From: ${item.sender}, To: ${item.rec}. Category: ${item.cat.replace('_', ' ')}`,
          view: 'processor',
          score: score
        });
      }
    });

    // 2. Medical Records
    const medicalRecords = getLocalStorageItem<MedicalRecord[]>('medicalRecords', []);
    medicalRecords.forEach(record => {
      let score = 0;
      let matchedSnippet = '';
      if (filters.title && record.title.toLowerCase().includes(filters.title)) score += 15;
      if (filters.source && record.source.toLowerCase().includes(filters.source)) score += 10;
      if (filters.text && record.ocrText.toLowerCase().includes(filters.text)) {
        score += 20;
        matchedSnippet = generateSnippet(record.ocrText, filters.text);
      } else if (textQuery && record.ocrText.toLowerCase().includes(textQuery)) {
        score += 10;
        matchedSnippet = generateSnippet(record.ocrText, textQuery);
      }
      if (matchesDateFilters(record.dateOfRecord)) score += 5;
      
      if (score > 0) {
        searchResults.push({
          id: `mr-${record.id}`,
          type: 'medical-record',
          title: record.title,
          subtitle: matchedSnippet || `Source: ${record.source}, Date: ${record.dateOfRecord}`,
          view: 'medical-records',
          score: score
        });
      }
    });

    // 3. Scott Logs
    const scottLogs = getLocalStorageItem<ScottLogEntry[]>('scottLogs', []);
    scottLogs.forEach(log => {
      let score = 0;
      let matchedSnippet = '';
      if (filters.category && log.category.toLowerCase().includes(filters.category)) score += 15;
      if (filters.text) {
        if (log.theSay.toLowerCase().includes(filters.text)) {
          score += 10;
          matchedSnippet = generateSnippet(log.theSay, filters.text);
        }
        if (log.theFact.toLowerCase().includes(filters.text)) {
          score += 15;
          matchedSnippet = generateSnippet(log.theFact, filters.text);
        }
      } else if (textQuery) {
        if (log.theSay.toLowerCase().includes(textQuery)) {
          score += 5;
          matchedSnippet = generateSnippet(log.theSay, textQuery);
        }
        if (log.theFact.toLowerCase().includes(textQuery)) {
          score += 8;
          matchedSnippet = generateSnippet(log.theFact, textQuery);
        }
      }
      if (matchesDateFilters(log.incidentDate)) score += 5;

      if (score > 0) {
        searchResults.push({
          id: `sl-${log.id}`,
          type: 'scott-log',
          title: log.category,
          subtitle: matchedSnippet || `Say: "${log.theSay.substring(0, 40)}..." Fact: "${log.theFact.substring(0, 40)}..."`,
          view: 'scott-schedule',
          score: score
        });
      }
    });

    // 4. Abuse Logs
    const abuseLogs = getLocalStorageItem<AbuseLogEntry[]>('abuseLogs', []);
    abuseLogs.forEach(log => {
      let score = 0;
      let matchedSnippet = '';
      if (filters.type && log.type.toLowerCase().includes(filters.type)) score += 15;
      if (filters.text && log.description.toLowerCase().includes(filters.text)) {
        score += 20;
        matchedSnippet = generateSnippet(log.description, filters.text);
      } else if (textQuery && log.description.toLowerCase().includes(textQuery)) {
        score += 10;
        matchedSnippet = generateSnippet(log.description, textQuery);
      }
      if (matchesDateFilters(log.timestamp)) score += 5;

      if (score > 0) {
        searchResults.push({
          id: `al-${log.id}`,
          type: 'abuse-log',
          title: log.type,
          subtitle: matchedSnippet || (log.description ? log.description.substring(0, 60) + '...' : ''),
          view: 'scott-schedule',
          score: score
        });
      }
    });

    // 5. Timeline Events
    const timelineEvents = getLocalStorageItem<TimelineEvent[]>('timelineEvents', []);
    timelineEvents.forEach(timelineEvent => {
      let score = 0;
      let matchedSnippet = '';
      if (filters.type && timelineEvent.type.toLowerCase().includes(filters.type)) score += 10;
      if (filters.title && timelineEvent.title.toLowerCase().includes(filters.title)) {
        score += 15;
        matchedSnippet = generateSnippet(timelineEvent.title, filters.title);
      } else if (textQuery && timelineEvent.title.toLowerCase().includes(textQuery)) {
        score += 8;
        matchedSnippet = generateSnippet(timelineEvent.title, textQuery);
      }
      if (matchesDateFilters(timelineEvent.date)) score += 5;

      if (score > 0) {
        searchResults.push({
          id: `tl-${timelineEvent.id}`,
          type: 'timeline-event',
          title: timelineEvent.title,
          subtitle: matchedSnippet || `Date: ${timelineEvent.date}, Type: ${timelineEvent.type}`,
          view: 'strategy',
          score: score
        });
      }
    });

    // 6. Court Events
    const courtEvents = getLocalStorageItem<CourtEvent[]>('courtEvents', []);
    courtEvents.forEach(courtEvent => {
      let score = 0;
      let matchedSnippet = '';
      if (filters.caseName && courtEvent.caseName.toLowerCase().includes(filters.caseName)) score += 10;
      if (filters.title && courtEvent.requiredAction.toLowerCase().includes(filters.title)) {
        score += 15;
        matchedSnippet = generateSnippet(courtEvent.requiredAction, filters.title);
      } else if (textQuery && courtEvent.requiredAction.toLowerCase().includes(textQuery)) {
        score += 8;
        matchedSnippet = generateSnippet(courtEvent.requiredAction, textQuery);
      }
      if (matchesDateFilters(courtEvent.date)) score += 5;
      
      if (score > 0) {
        searchResults.push({
          id: `ce-${courtEvent.id}`,
          type: 'court-event',
          title: courtEvent.requiredAction,
          subtitle: matchedSnippet || `Case: ${courtEvent.caseName}, Date: ${courtEvent.date}`,
          view: 'dashboard',
          score: score
        });
      }
    });

    // Products
    products.forEach(p => {
      let score = 0;
      if (p.name.toLowerCase().includes(lowerQuery)) score += 10;
      if (score > 0) {
        searchResults.push({
          id: `prod-${p.id}`,
          type: 'product',
          title: p.name,
          subtitle: `${p.amps}A Kit - $${p.price}`,
          view: 'business',
          score: score
        });
      }
    });

    // Strategy Notes
    const notes = getLocalStorageItem<StrategyNote[]>('strategyNotes', initialNotes);
    notes.forEach(n => {
      let score = 0;
      let matchedSnippet = '';
      if (textQuery && n.content.toLowerCase().includes(textQuery)) {
        score += 10;
        matchedSnippet = generateSnippet(n.content, textQuery);
      }
      if (score > 0) {
        searchResults.push({
          id: `note-${n.id}`,
          type: 'strategy',
          title: n.category.toUpperCase(),
          subtitle: matchedSnippet || (n.content ? n.content.substring(0, 60) + '...' : ''),
          view: 'strategy',
          score: score
        });
      }
    });

    // Daily Moves
    const savedMoves = getLocalStorageItem<DailyMove[]>('dailyMoves', []);
    savedMoves.forEach(m => {
      let score = 0;
      if (textQuery && m.text.toLowerCase().includes(textQuery)) score += 10;
      if (score > 0) {
        searchResults.push({
          id: `move-${m.id}`,
          type: 'task',
          title: 'Daily Move',
          subtitle: m.text,
          view: 'dashboard',
          score: score
        });
      }
    });

    // Roadmap
    const savedRoadmap = getLocalStorageItem<RoadmapTask[]>('roadmapTasks', []);
    savedRoadmap.forEach(t => {
      let score = 0;
      if (textQuery && t.title.toLowerCase().includes(textQuery)) score += 10;
      if (score > 0) {
        searchResults.push({
          id: `road-${t.id}`,
          type: 'roadmap',
          title: `Roadmap (${t.status})`,
          subtitle: t.title,
          view: 'roadmap',
          score: score
        });
      }
    });

    setResults(searchResults.sort((a, b) => b.score - a.score));
  }, [query]);

  const handleSelect = (view: ViewState) => {
    onNavigate(view);
    onClose();
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'product': return <Package className="w-5 h-5 text-purple-400" />;
      case 'strategy': return <Compass className="w-5 h-5 text-blue-400" />;
      case 'task': return <LayoutDashboard className="w-5 h-5 text-green-400" />;
      case 'roadmap': return <Map className="w-5 h-5 text-orange-400" />;
      case 'evidence-processor': return <FileText className="w-5 h-5 text-red-400" />;
      case 'medical-record': return <Stethoscope className="w-5 h-5 text-indigo-400" />;
      case 'scott-log': return <Scale className="w-5 h-5 text-amber-400" />;
      case 'abuse-log': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'timeline-event': return <ClockIcon className="w-5 h-5 text-teal-400" />;
      case 'court-event': return <Gavel className="w-5 h-5 text-orange-500" />;
      case 'evidence-vault': return <FileText className="w-5 h-5 text-slate-400" />;
      default: return <Search className="w-5 h-5 text-slate-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-orange-500" />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, tasks, notes, evidence..."
            className="flex-1 bg-transparent text-white text-lg placeholder-slate-500 focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

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
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-200 font-semibold text-sm">{result.title}</h4>
                    <p className="text-slate-500 text-xs truncate" dangerouslySetInnerHTML={{ __html: result.subtitle }} />
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

export { GlobalSearch };