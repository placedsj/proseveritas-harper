import React, { memo } from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onNavigate: (view: ViewState) => void;
}

// BOLT OPTIMIZATION: Memoize NavButton to prevent unnecessary re-renders of all sidebar items
// when switching views. By passing an `isActive` boolean instead of the global `currentView` state,
// we ensure only the previously active and newly active buttons re-render, reducing DOM reconciliation.
export const NavButton = memo(({ target, icon: Icon, label, isActive, onNavigate }: NavButtonProps) => (
  <button
    onClick={() => onNavigate(target)}
    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full duration-200 ${
      isActive
        ? 'bg-red-600 text-white shadow-lg shadow-red-200'
        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
    }`}
  >
    <Icon className="w-6 h-6 mb-1" />
    <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
  </button>
));

NavButton.displayName = 'NavButton';
