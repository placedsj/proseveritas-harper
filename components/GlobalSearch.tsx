
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, LayoutDashboard, Map, FileText, Stethoscope, Scale, ShieldAlert, Gavel, Clock as ClockIcon } from 'lucide-react';
import { 
  ViewState, DailyMove,
  ProcessedEvidenceItem, MedicalRecord, ScottLogEntry, AbuseLogEntry,
  TimelineEvent, CourtEvent,
} from '../types';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
}

interface SearchResult {
  id: string;
  type: 'task' | 'evidence-processor' | 'medical-record' | 'scott-log' | 'abuse-log' | 'timeline-event' | 'court-event' | 'evidence-vault';
  title: string;
  subtitle: string;
  view: ViewState;
  score: number;
}

interface SearchData {
  evidence: ProcessedEvidenceItem[];
  medicalRecords: MedicalRecord[];
  scottLogs: ScottLogEntry[];
  abuseLogs: AbuseLogEntry[];
  timelineEvents: TimelineEvent[];
  courtEvents: CourtEvent[];
  dailyMoves: DailyMove[];
}

const getLocalStorageItem = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error: unknown) {
    console.error(`Error parsing localStorage item for key "${key}":`, error);
    return defaultValue;
  }
};

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSearchData(null); // Clear data to free memory
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Load all data into memory once when opened to avoid expensive localStorage reads/parsing on every keystroke
    setSearchData({
      evidence: getLocalStorageItem<ProcessedEvidenceItem[]>('evidence', []),
      medicalRecords: getLocalStorageItem<MedicalRecord[]>('medicalRecords', []),
      scottLogs: getLocalStorageItem<ScottLogEntry[]>('scottLogs', []),
      abuseLogs: getLocalStorageItem<AbuseLogEntry[]>('abuseLogs', []),
      timelineEvents: getLocalStorageItem<TimelineEvent[]>('timelineEvents', []),
      courtEvents: getLocalStorageItem<CourtEvent[]>('courtEvents', []),
      dailyMoves: getLocalStorageItem<DailyMove[]>('dailyMoves', []),
    });
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || !searchData) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];
    const filters: { [key: string]: string } = {};
    let textQuery = lowerQuery;

    const filterRegex = /(sender|receiver|from|to|date|category|type|status|title|source|text):([\w\s.-]+)(?=\s|$)/g;
    let match: RegExpExecArray | null;
    while ((match = filterRegex.exec(lowerQuery)) !== null) {
      if (match[1] && match[2]) {
        filters[match[1]] = match[2].trim();
        textQuery = textQuery.replace(match[0], '').trim();
      }
    }

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
    searchData.evidence.forEach(item => {
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
    searchData.medicalRecords.forEach(record => {
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
    searchData.scottLogs.forEach(log => {
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
    searchData.abuseLogs.forEach(log => {
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
    searchData.timelineEvents.forEach(timelineEvent => {
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
          view: 'dashboard', // Default to dashboard for now, timeline view is embedded
          score: score
        });
      }
    });

    // 6. Court Events
    searchData.courtEvents.forEach(courtEvent => {
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

    // Daily Moves
    searchData.dailyMoves.forEach(m => {
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

    setResults(searchResults.sort((a, b) => b.score - a.score));
  }, [query, searchData]);

  const handleSelect = (view: ViewState) => {
    onNavigate(view);
    onClose();
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'task': return <LayoutDashboard className="w-5 h-5 text-green-600" />;
      case 'evidence-processor': return <FileText className="w-5 h-5 text-red-600" />;
      case 'medical-record': return <Stethoscope className="w-5 h-5 text-indigo-600" />;
      case 'scott-log': return <Scale className="w-5 h-5 text-amber-600" />;
      case 'abuse-log': return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'timeline-event': return <ClockIcon className="w-5 h-5 text-teal-600" />;
      case 'court-event': return <Gavel className="w-5 h-5 text-orange-600" />;
      case 'evidence-vault': return <FileText className="w-5 h-5 text-slate-500" />;
      default: return <Search className="w-5 h-5 text-slate-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-900/30 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fade-in"
      onClick={onClose}
      data-testid="global-search-overlay"
    >
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, evidence, logs..."
            className="flex-1 bg-transparent text-slate-900 text-lg placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-2 bg-slate-50">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result.view)}
                  className="w-full text-left p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all flex items-center gap-4 group border border-transparent hover:border-slate-200"
                >
                  <div className={`p-2 rounded-lg bg-white border border-slate-200 transition-colors`}>
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-900 font-semibold text-sm">{result.title}</h4>
                    <p className="text-slate-500 text-xs truncate">{result.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-slate-500">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              <p>Type to search across your entire PLACED OS.</p>
            </div>
          )}
        </div>
        
        <div className="bg-white p-2 text-center text-[10px] text-slate-400 border-t border-slate-100 uppercase tracking-widest font-bold">
          Global Command Center
        </div>
      </div>
    </div>
  );
};

export { GlobalSearch };
