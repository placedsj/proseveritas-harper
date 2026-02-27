import React, { memo } from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onNavigate: (view: ViewState) => void;
}

// ⚡ Bolt Optimization: Wrapped in React.memo to prevent unnecessary re-renders.
// Since `isActive` is now a boolean (instead of passing the full `currentView` string),
// only the buttons whose active state changes (old active -> false, new active -> true)
// will re-render, rather than the entire list of navigation buttons.
export const NavButton = memo(({ target, icon: Icon, label, isActive, onNavigate }: NavButtonProps) => (
  <button
    onClick={() => onNavigate(target)}
    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full duration-200 ${
      isActive
        ? 'bg-red-600 text-white shadow-lg shadow-red-200'
        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
    }`}
    aria-current={isActive ? 'page' : undefined}
    title={label}
  >
    <Icon className="w-6 h-6 mb-1" aria-hidden="true" />
    <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
  </button>
));

NavButton.displayName = 'NavButton';
