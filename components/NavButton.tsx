import React from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

/**
 * ⚡ Bolt Performance Optimization:
 * We use React.memo with a custom equality function here to prevent O(N) re-renders
 * on every navigation change. When the ViewState changes in App.tsx, only 2 out of
 * the ~16 NavButtons actually need to re-render (the one losing active state and
 * the one gaining it).
 *
 * Impact: Reduces NavButton re-renders from ~16 to exactly 2 per navigation event,
 * saving unnecessary React diffing cycles on the sidebar components.
 */
export const NavButton = React.memo<NavButtonProps>(({ target, icon: Icon, label, currentView, onNavigate }) => (
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
), (prev, next) => {
  // Only re-render if this specific button's active state changes,
  // or if its core props (target, label, icon, onNavigate) change.
  const isPrevActive = prev.currentView === prev.target;
  const isNextActive = next.currentView === next.target;
  return (
    isPrevActive === isNextActive &&
    prev.target === next.target &&
    prev.label === next.label &&
    prev.icon === next.icon &&
    prev.onNavigate === next.onNavigate
  );
});

NavButton.displayName = 'NavButton';
