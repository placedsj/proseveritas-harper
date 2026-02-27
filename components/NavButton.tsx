import React from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const NavButton: React.FC<NavButtonProps> = ({ target, icon: Icon, label, currentView, onNavigate }) => {
  const isActive = currentView === target;

  return (
    <button
      onClick={() => onNavigate(target)}
      aria-current={isActive ? 'page' : undefined}
      title={label}
      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full duration-200 ${
        isActive
          ? 'bg-red-600 text-white shadow-lg shadow-red-200'
          : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      <Icon className="w-6 h-6 mb-1" aria-hidden="true" />
      <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
    </button>
  );
};
