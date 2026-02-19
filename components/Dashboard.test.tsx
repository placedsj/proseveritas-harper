
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

describe('Dashboard Stats', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('calculates and displays statistics correctly', () => {
    // 1. Setup Mock Data with UNIQUE expected counts
    const mockEvidence = [
      { hash: '1', verified: true },
      { hash: '2', verified: false },
      { hash: '3', verified: true }
    ]; // Expected: 2 Verified

    const mockScottLogs = [
      { id: '1', category: 'Denial of Parenting Time' },
      { id: '2', category: 'Other' },
      { id: '3', category: 'Denial of Parenting Time' },
      { id: '4', category: 'Denial of Parenting Time' }
    ]; // Expected: 3 Days Denied

    const mockAuditLogs = [
      { date: '2025-01-01' },
      { date: '2025-01-02' },
      { date: '2025-01-03' },
      { date: '2025-01-04' }
    ]; // Expected: 4 Audit Targets

    const mockMedicalRecords = [
      { id: '1', pageCount: 10 },
      { id: '2', pageCount: 5 },
      { id: '3' } // Missing pageCount, should treat as 0
    ]; // Expected: 15 Pages

    window.localStorage.setItem('evidence', JSON.stringify(mockEvidence));
    window.localStorage.setItem('scottLogs', JSON.stringify(mockScottLogs));
    window.localStorage.setItem('systemAuditLogs', JSON.stringify(mockAuditLogs));
    window.localStorage.setItem('medicalRecords', JSON.stringify(mockMedicalRecords));

    // 2. Render Component
    render(<Dashboard onNavigate={() => {}} />);

    // 3. Assertions
    // Verified Exhibits: 2
    expect(screen.getByText('Verified Exhibits')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // Days Denied: 3
    expect(screen.getByText('Days Denied')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // Audit Targets: 4
    expect(screen.getByText('Audit Targets')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    // SJRH Pages: 15
    expect(screen.getByText('SJRH Pages')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('handles empty localStorage gracefully', () => {
    render(<Dashboard onNavigate={() => {}} />);

    const zeros = screen.getAllByText('0');
    // At least 4 zeros for the 4 stats
    expect(zeros.length).toBeGreaterThanOrEqual(4);
  });
});
