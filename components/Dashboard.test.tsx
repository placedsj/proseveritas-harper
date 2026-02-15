
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
  writable: true
});

describe('Dashboard Stats', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  it('renders default stats when localStorage is empty', () => {
    render(<Dashboard onNavigate={() => {}} />);

    // Expect 0s for all stats
    // Verified Exhibits
    const verifiedExhibits = screen.getByText('Verified Exhibits').parentElement;
    expect(verifiedExhibits).toHaveTextContent('0');

    // Days Denied
    const daysDenied = screen.getByText('Days Denied').parentElement;
    expect(daysDenied).toHaveTextContent('0');

    // Audit Targets
    const auditTargets = screen.getByText('Audit Targets').parentElement;
    expect(auditTargets).toHaveTextContent('0');

    // SJRH Pages
    const sjrhPages = screen.getByText('SJRH Pages').parentElement;
    expect(sjrhPages).toHaveTextContent('0');
  });

  it('renders correct stats from localStorage', () => {
    // Populate localStorage
    const scottLogs = [
      { id: '1', exhibitRef: 'Ex1.png', category: 'Denial of Parenting Time' },
      { id: '2', exhibitRef: '', category: 'Other' },
      { id: '3', exhibitRef: 'Ex2.png', category: 'Denial of Parenting Time' },
    ];
    const auditLogs = [
      { id: '1' }, { id: '2' }
    ];
    const medicalRecords = [
      { id: '1', pageCount: 10 },
      { id: '2', pageCount: 5 }
    ];

    localStorageMock.setItem('scottLogs', JSON.stringify(scottLogs));
    localStorageMock.setItem('systemAuditLogs', JSON.stringify(auditLogs));
    localStorageMock.setItem('medicalRecords', JSON.stringify(medicalRecords));

    render(<Dashboard onNavigate={() => {}} />);

    // Verified Exhibits: 2 (Ex1.png, Ex2.png)
    const verifiedExhibits = screen.getByText('Verified Exhibits').parentElement;
    expect(verifiedExhibits).toHaveTextContent('2');

    // Days Denied: 2 (entries with 'Denial of Parenting Time')
    const daysDenied = screen.getByText('Days Denied').parentElement;
    expect(daysDenied).toHaveTextContent('2');

    // Audit Targets: 2 (auditLogs.length)
    const auditTargets = screen.getByText('Audit Targets').parentElement;
    expect(auditTargets).toHaveTextContent('2');

    // SJRH Pages: 15 (10 + 5)
    const sjrhPages = screen.getByText('SJRH Pages').parentElement;
    expect(sjrhPages).toHaveTextContent('15');
  });
});
