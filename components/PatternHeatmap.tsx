
import React, { useMemo } from 'react';
import { AbuseLogEntry } from '../types';
import { BarChart3, AlertTriangle, Calendar } from 'lucide-react';

interface PatternHeatmapProps {
  logs: AbuseLogEntry[];
}

const PatternHeatmap: React.FC<PatternHeatmapProps> = ({ logs }) => {
  // Sort logs by date ascending
  const sortedLogs = useMemo(() => {
    return [...logs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [logs]);

  const getSeverity = (log: AbuseLogEntry): number => {
    if (log.severity) return log.severity;
    // Heuristic calculation if severity is missing
    let score = 3;
    if (log.type === 'False Police Report') score += 5;
    if (log.type === 'Denied Access') score += 4;
    if (log.type === 'Harassment') score += 2;
    if (log.childReaction === 'Crying' || log.childReaction === 'Scared') score += 3;
    if (log.childReaction === 'Withdrawn') score += 2;
    return Math.min(score, 10);
  };

  const getSeverityColor = (score: number) => {
    if (score >= 8) return 'bg-red-600';
    if (score >= 5) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  const getImpactLabel = (impact: string) => {
    switch(impact) {
      case 'Crying': return '😭';
      case 'Withdrawn': return '😶';
      case 'Silent': return '🤐';
      case 'Scared': return '😨';
      default: return '😐';
    }
  };

  // Calculate Average Severity
  const avgSeverity = useMemo(() => {
    if (logs.length === 0) return 0;
    const sum = logs.reduce((acc, log) => acc + getSeverity(log), 0);
    return (sum / logs.length).toFixed(1);
  }, [logs]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-500" />
            Pattern Heatmap
          </h2>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600"></span>
              <span className="text-slate-400">Critical (8-10)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-slate-400">Moderate (5-7)</span>
            </div>
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="h-64 flex items-center justify-center border border-dashed border-slate-700 rounded-lg text-slate-500">
            No incidents logged yet.
          </div>
        ) : (
          <div className="relative h-64 flex items-end justify-between gap-2 overflow-x-auto pb-8 pt-4 px-2">
             {/* Y-Axis Lines roughly */}
             <div className="absolute inset-0 pointer-events-none flex flex-col justify-between text-xs text-slate-700 font-mono">
                <div className="border-t border-slate-700/30 w-full h-0">10 - Critical Risk</div>
                <div className="border-t border-slate-700/30 w-full h-0">5 - Escalation</div>
                <div className="border-b border-slate-700/30 w-full h-0">0</div>
             </div>

             {sortedLogs.map((log) => {
               const severity = getSeverity(log);
               const dateStr = new Date(log.timestamp).toLocaleDateString();
               
               return (
               <div key={log.id} className="relative group flex flex-col justify-end h-full w-12 flex-shrink-0 items-center">
                 {/* Tooltip */}
                 <div className="absolute bottom-full mb-2 hidden group-hover:block z-10 w-48 bg-slate-900 text-xs p-2 rounded border border-slate-600 shadow-xl">
                    <p className="font-bold text-white">{dateStr}</p>
                    <p className="text-orange-400">{log.type}</p>
                    <p className="text-slate-300 italic">"{log.description.substring(0, 30)}..."</p>
                    {log.businessCorrelation && (
                      <p className="text-red-400 mt-1 border-t border-slate-700 pt-1">⚠️ Biz Loss: {log.businessCorrelation}</p>
                    )}
                 </div>

                 {/* Child Impact Icon */}
                 <div className="mb-1 text-xs">{getImpactLabel(log.childReaction)}</div>

                 {/* The Bar */}
                 <div 
                    className={`w-full rounded-t ${getSeverityColor(severity)} transition-all hover:opacity-80`}
                    style={{ height: `${severity * 10}%` }}
                 ></div>

                 {/* Date Label */}
                 <div className="absolute top-full mt-2 text-[10px] text-slate-500 -rotate-45 origin-top-left whitespace-nowrap">
                   {dateStr.split('/').slice(0, 2).join('/')}
                 </div>
               </div>
             )})}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-900/10 border border-red-900/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-red-100 font-bold">Severity Analysis</h3>
          </div>
          <p className="text-red-200/70 text-sm">
            Average Severity Score: <span className="font-bold text-white text-lg">{avgSeverity}</span> / 10.
            {Number(avgSeverity) > 6 ? " Pattern indicates high-conflict escalation." : " Monitoring baseline conflict."}
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
           <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-blue-100 font-bold">Court Date Correlation</h3>
          </div>
          <p className="text-slate-400 text-sm">
            Check for spikes in the 7 days preceding upcoming Feb 3 Sentencing. Patterns often repeat 48 hours before major legal events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatternHeatmap;
