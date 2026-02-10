import React, { memo } from 'react';
import { CheckCircle, Circle, Volume2 } from 'lucide-react';
import { DailyChecklist } from '../types';

interface DailyRitualItemProps {
  label: string;
  id: keyof DailyChecklist;
  warning?: string;
  checked: boolean;
  onToggle: (id: keyof DailyChecklist) => void;
  audioEnabled: boolean;
  onSpeak: (e: React.MouseEvent, text: string) => void;
}

const DailyRitualItem: React.FC<DailyRitualItemProps> = memo(({
  label,
  id,
  warning,
  checked,
  onToggle,
  audioEnabled,
  onSpeak
}) => (
  <div
    onClick={() => onToggle(id)}
    className={`relative flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors group ${
      checked ? 'bg-green-900/20 border border-green-800' : 'bg-slate-800 border border-slate-700 hover:bg-slate-750'
    }`}
  >
    <div className={`mt-1 ${checked ? 'text-green-500' : 'text-slate-500'}`}>
      {checked ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
    </div>
    <div className="flex-1 pr-8">
      <p className={`font-medium ${checked ? 'text-green-100' : 'text-slate-200'}`}>{label}</p>
      {warning && !checked && (
        <p className="text-xs text-amber-500 mt-1 uppercase font-bold tracking-wide">{warning}</p>
      )}
    </div>

    {audioEnabled && (
      <button
        onClick={(e) => onSpeak(e, warning ? `${label}. Warning: ${warning}` : label)}
        className="absolute right-3 top-3 p-2 text-slate-500 hover:text-blue-400 opacity-50 group-hover:opacity-100 transition-all"
        title="Play Reminder"
      >
        <Volume2 className="w-4 h-4" />
      </button>
    )}
  </div>
));

DailyRitualItem.displayName = 'DailyRitualItem';

export default DailyRitualItem;
