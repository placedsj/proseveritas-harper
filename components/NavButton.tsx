import React, { memo } from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

/**
 * ⚡ Bolt: Performance Optimization
 * Wrapped NavButton in React.memo with a custom comparison function.
 *
 * Why: App.tsx manages global state for `view` and renders 16 NavButtons.
 * Previously, every time `view` changed, all 16 NavButtons would re-render.
 *
 * Impact: Prevents O(N) re-renders for sidebar items. Now, only the buttons
 * losing and gaining active status will re-render, saving ~14 unnecessary re-renders per navigation.
 */
export const NavButton: React.FC<NavButtonProps> = memo(({ target, icon: Icon, label, currentView, onNavigate }) => (
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
), (prevProps, nextProps) => {
  // Only re-render if static props change, or if this specific button's active state changes.
  return (
    prevProps.target === nextProps.target &&
    prevProps.icon === nextProps.icon &&
    prevProps.label === nextProps.label &&
    prevProps.onNavigate === nextProps.onNavigate &&
    (prevProps.currentView === prevProps.target) === (nextProps.currentView === nextProps.target)
  );
});
