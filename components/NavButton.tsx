import React, { memo } from 'react';
import { ViewState } from '../types';

interface NavButtonProps {
  target: ViewState;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onNavigate: (view: ViewState) => void;
}

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders of navigation items when currentView changes.
export const NavButton = memo(({ target, icon: Icon, label, isActive, onNavigate }: NavButtonProps) => {
  const activeClass = 'bg-red-600 text-white shadow-lg shadow-red-200';
  const inactiveClass = 'text-slate-400 hover:text-slate-900 hover:bg-slate-100';
  return (
  <button
    onClick={() => onNavigate(target)}
    className={"flex flex-col items-center justify-center p-3 rounded-xl transition-all w-full duration-200 " + (isActive ? activeClass : inactiveClass)}
  >
    <Icon className="w-6 h-6 mb-1" />
    <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
  </button>
)});

NavButton.displayName = 'NavButton';
