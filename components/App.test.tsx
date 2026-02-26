import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('App', () => {
  it('renders without crashing and shows dashboard elements', () => {
    render(<App />);

    // Check for Sidebar Logo
    const logos = screen.getAllByText('SDG');
    expect(logos.length).toBeGreaterThan(0);

    // Check for a known element in Dashboard (it is not lazy loaded)
    // "Status: Pro Se Command" is in Dashboard
    expect(screen.getByText(/Status: Pro Se Command/i)).toBeInTheDocument();
  });

  it('contains accessible navigation and search controls', () => {
    render(<App />);

    // Sidebar search button
    const searchButtons = screen.getAllByLabelText('Open global search');
    expect(searchButtons.length).toBeGreaterThan(0);

    // Mobile bottom nav buttons
    // Note: These are hidden on desktop, but rendered in the DOM
    expect(screen.getByLabelText('Dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText('Discovery Archive')).toBeInTheDocument();
    expect(screen.getByLabelText('Harper Log')).toBeInTheDocument();
    expect(screen.getByLabelText('System Audit')).toBeInTheDocument();
    expect(screen.getByLabelText('Scott Schedule')).toBeInTheDocument();
  });
});
