import React from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onNavigate: (view: ViewState) => void;
}

// Optimized: Added React.memo and replaced currentView with isActive boolean to prevent unnecessary re-renders when global view changes
export const NavButton: React.FC<NavButtonProps> = React.memo(({ target, icon: Icon, label, isActive, onNavigate }) => {
  const activeClass = isActive ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100';
  return (
    <button
      onClick={() => onNavigate(target)}
      className={"flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full duration-200 " + activeClass}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
    </button>
  );
});
