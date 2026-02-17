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

describe('Navigation Accessibility', () => {
  it('mobile navigation buttons have aria-labels and correct aria-current state', () => {
    // Render the App
    render(<App />);

    // Check for the presence of mobile navigation buttons via their aria-labels
    const dashboardButton = screen.getByLabelText('Dashboard');
    const archiveButton = screen.getByLabelText('Discovery Archive');
    const harperButton = screen.getByLabelText('Harper Log');
    const auditButton = screen.getByLabelText('System Audit');
    const scottButton = screen.getByLabelText('Scott Schedule');

    expect(dashboardButton).toBeInTheDocument();
    expect(archiveButton).toBeInTheDocument();
    expect(harperButton).toBeInTheDocument();
    expect(auditButton).toBeInTheDocument();
    expect(scottButton).toBeInTheDocument();

    // Initial state: Dashboard should be active
    expect(dashboardButton).toHaveAttribute('aria-current', 'page');
    expect(archiveButton).not.toHaveAttribute('aria-current');

    // Click on 'Harper Log'
    fireEvent.click(harperButton);

    // Verify 'Harper Log' is now active
    expect(harperButton).toHaveAttribute('aria-current', 'page');
    expect(dashboardButton).not.toHaveAttribute('aria-current');
  });
});
