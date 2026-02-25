import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

// Mock types
import { ProcessedEvidenceItem, ScottLogEntry, SystemAuditLog, MedicalRecord } from '../types';

describe('Dashboard', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('calculates and displays statistics correctly from localStorage', async () => {
    // Mock Data
    const evidence: Partial<ProcessedEvidenceItem>[] = [
      { verified: true },
      { verified: true },
      { verified: false }
    ];
    const scottLogs: Partial<ScottLogEntry>[] = [
      { category: 'Denial of Parenting Time' },
      { category: 'Alienation' },
      { category: 'Denial of Parenting Time' }
    ];
    const auditLogs: Partial<SystemAuditLog>[] = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' }
    ];
    const medicalRecords: Partial<MedicalRecord>[] = [
      { pageCount: 10 },
      { pageCount: 5 },
      { pageCount: 21 }
    ];

    // Set localStorage
    localStorage.setItem('evidence', JSON.stringify(evidence));
    localStorage.setItem('scottLogs', JSON.stringify(scottLogs));
    localStorage.setItem('systemAuditLogs', JSON.stringify(auditLogs));
    localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));

    render(<Dashboard onNavigate={vi.fn()} />);

    const checkStat = async (label: string, value: string) => {
      await waitFor(() => {
        const labelEl = screen.getByText(label);
        const valueEl = labelEl.parentElement?.querySelector('p:first-child');
        expect(valueEl).toHaveTextContent(value);
      });
    };

    await checkStat('Verified Exhibits', '2');
    await checkStat('Days Denied', '2');
    await checkStat('Audit Targets', '4');
    await checkStat('SJRH Pages', '36');
  });

  it('handles empty localStorage gracefully', async () => {
    localStorage.clear();
    render(<Dashboard onNavigate={vi.fn()} />);

    const checkStat = async (label: string, value: string) => {
      await waitFor(() => {
        const labelEl = screen.getByText(label);
        const valueEl = labelEl.parentElement?.querySelector('p:first-child');
        expect(valueEl).toHaveTextContent(value);
      });
    };

    await checkStat('Verified Exhibits', '0');
    await checkStat('Days Denied', '0');
    await checkStat('Audit Targets', '0');
    await checkStat('SJRH Pages', '0');
  });
});
