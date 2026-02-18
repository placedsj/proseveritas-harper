import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { NavButton } from './NavButton';
import { LayoutDashboard } from 'lucide-react';
import React from 'react';

describe('Navigation Accessibility', () => {
  it('NavButton has aria-current when active', () => {
    const fn = () => {};
    render(
      <NavButton
        target="dashboard"
        icon={LayoutDashboard}
        label="Cmd"
        currentView="dashboard"
        onNavigate={fn}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-current', 'page');
  });

  it('NavButton does not have aria-current when inactive', () => {
    const fn = () => {};
    render(
      <NavButton
        target="dashboard"
        icon={LayoutDashboard}
        label="Cmd"
        currentView="products"
        onNavigate={fn}
      />
    );
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('aria-current');
  });

  it('Mobile Bottom Nav buttons have aria-labels', () => {
    render(<App />);
    // Mobile nav is hidden on desktop by default in CSS (md:hidden),
    // but jsdom doesn't process media queries, so it should be in the DOM.
    // We can query by aria-label to verify they exist.

    expect(screen.getByLabelText('Dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText('Discovery Archive')).toBeInTheDocument();
    expect(screen.getByLabelText('Harper Log')).toBeInTheDocument();
    expect(screen.getByLabelText('System Audit')).toBeInTheDocument();
    expect(screen.getByLabelText('Scott Schedule')).toBeInTheDocument();
  });
});
