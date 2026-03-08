import React from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const NavButtonBase: React.FC<NavButtonProps> = ({ target, icon: Icon, label, currentView, onNavigate }) => (
  <button
    onClick={() => onNavigate(target)}
    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full duration-200 ${
      currentView === target
        ? 'bg-red-600 text-white shadow-lg shadow-red-200'
        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
    }`}
  >
    <Icon className="w-6 h-6 mb-1" />
    <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
  </button>
);

// ⚡ Bolt: Performance Optimization
// Why: When currentView changes, React by default re-renders all NavButtons.
// With 15+ navigation buttons, this causes unnecessary render cycles.
// Impact: Reduces re-renders from ~15 to exactly 2 (the old active button and new active button) per navigation change.
// Measurement: Use React Profiler. Navigation changes will only show updates for the two affected buttons.
export const NavButton = React.memo(NavButtonBase, (prevProps, nextProps) => {
  const wasActive = prevProps.currentView === prevProps.target;
  const isActive = nextProps.currentView === nextProps.target;

  return (
    wasActive === isActive &&
    prevProps.target === nextProps.target &&
    prevProps.label === nextProps.label &&
    prevProps.icon === nextProps.icon &&
    prevProps.onNavigate === nextProps.onNavigate
  );
});
