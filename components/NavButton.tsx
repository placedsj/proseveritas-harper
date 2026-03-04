import React from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const NavButton = React.memo(
  ({ target, icon: Icon, label, currentView, onNavigate }: NavButtonProps) => (
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
  (prev, next) => {
    // Optimization: Only re-render if the button's active state changes.
    // This prevents all N navigation buttons from re-rendering when the view changes.
    const wasActive = prev.currentView === prev.target;
    const isActive = next.currentView === next.target;
    return (
      wasActive === isActive &&
      prev.target === next.target &&
      prev.label === next.label &&
      prev.icon === next.icon &&
      prev.onNavigate === next.onNavigate
    );
  }
);
