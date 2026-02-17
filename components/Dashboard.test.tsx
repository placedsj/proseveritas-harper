import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { describe, it, expect, beforeEach, vi } from 'vitest';
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

describe('Dashboard Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders dynamic statistics from localStorage', () => {
    // Setup mock data with unique counts to avoid ambiguity
    // Verified Exhibits: 3
    const evidence = [
      { verified: true, file: 'e1' },
      { verified: false, file: 'e2' },
      { verified: true, file: 'e3' },
      { verified: true, file: 'e4' }
    ];

    // Days Denied: 2
    const scottLogs = [
      { category: 'Denial of Parenting Time' },
      { category: 'Alienation' },
      { category: 'Denial of Parenting Time' }
    ];

    // Audit Targets: 4
    const systemAuditLogs = [
        { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }
    ];

    // SJRH Pages: 35
    const medicalRecords = [
        { pageCount: 10 }, { pageCount: 20 }, { pageCount: 5 }
    ];

    localStorage.setItem('evidence', JSON.stringify(evidence));
    localStorage.setItem('scottLogs', JSON.stringify(scottLogs));
    localStorage.setItem('systemAuditLogs', JSON.stringify(systemAuditLogs));
    localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));

    render(<Dashboard onNavigate={() => {}} />);

    // Assertions
    // Verified Exhibits: 3
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Verified Exhibits')).toBeInTheDocument();

    // Days Denied: 2
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Days Denied')).toBeInTheDocument();

    // Audit Targets: 4
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Audit Targets')).toBeInTheDocument();

    // SJRH Pages: 35
    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('SJRH Pages')).toBeInTheDocument();
  });

  it('handles empty localStorage gracefully', () => {
    localStorage.clear();
    render(<Dashboard onNavigate={() => {}} />);

    // Should render 0s
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(4); // At least 4 zeros for the stats

    expect(screen.getByText('Verified Exhibits')).toBeInTheDocument();
    expect(screen.getByText('Days Denied')).toBeInTheDocument();
    expect(screen.getByText('Audit Targets')).toBeInTheDocument();
    expect(screen.getByText('SJRH Pages')).toBeInTheDocument();
  });
});
