import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { describe, it, expect } from 'vitest';
import React from 'react';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Accessibility Checks', () => {
  it('has accessible names for icon-only buttons', () => {
    render(<App />);

    // Check for Open Search buttons (Sidebar and Mobile Header)
    // There are two buttons with the search icon that toggle search.
    // We expect them to have aria-label="Open search".
    const openSearchButtons = screen.getAllByLabelText('Open search');
    expect(openSearchButtons.length).toBeGreaterThan(0);

    // Check for Mobile Bottom Nav buttons
    expect(screen.getByLabelText('Dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText('Discovery Archive')).toBeInTheDocument();
    expect(screen.getByLabelText('Harper Log')).toBeInTheDocument();
    expect(screen.getByLabelText('System Audit')).toBeInTheDocument();
    expect(screen.getByLabelText('Scott Schedule')).toBeInTheDocument();

    // Open the search modal to check for the Close button
    fireEvent.click(openSearchButtons[0]);

    // Check for Close Search button in the modal
    expect(screen.getByLabelText('Close search')).toBeInTheDocument();
  });
});
