import React from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const NavButtonComponent: React.FC<NavButtonProps> = ({ target, icon: Icon, label, currentView, onNavigate }) => (
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

export const NavButton = React.memo(NavButtonComponent, (prevProps, nextProps) => {
  const wasActive = prevProps.currentView === prevProps.target;
  const isActive = nextProps.currentView === nextProps.target;

  return (
    wasActive === isActive &&
    prevProps.target === nextProps.target &&
    prevProps.icon === nextProps.icon &&
    prevProps.label === nextProps.label &&
    prevProps.onNavigate === nextProps.onNavigate
  );
});
