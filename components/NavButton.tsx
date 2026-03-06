import React from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

// ⚡ Bolt Performance Optimization:
// Wrapped in React.memo() with a custom equality function to prevent 14+ unnecessary
// re-renders of navigation items whenever the view state changes in App.tsx.
// A button only needs to re-render if it is becoming active or becoming inactive.
export const NavButton: React.FC<NavButtonProps> = React.memo(
  ({ target, icon: Icon, label, currentView, onNavigate }) => (
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
  ),
  (prevProps, nextProps) => {
    // Only re-render if this specific button's active state changes,
    // or if the label or target props change.
    const wasActive = prevProps.currentView === prevProps.target;
    const isActive = nextProps.currentView === nextProps.target;
    return (
      wasActive === isActive &&
      prevProps.label === nextProps.label &&
      prevProps.target === nextProps.target &&
      prevProps.icon === nextProps.icon
    );
  }
);
