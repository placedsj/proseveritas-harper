
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from './Dashboard';
import { ProcessedEvidenceItem, MedicalRecord, ScottLogEntry, SystemAuditLogEntry } from '../types';

const mockEvidence: ProcessedEvidenceItem[] = [
  {
    file: 'evidence1.pdf',
    date: '2025-01-01',
    sender: 'Sender A',
    rec: 'Receiver B',
    text: 'This is some evidence text regarding custody.',
    cat: 'custody',
    prio: 1,
    hash: 'hash1',
    wScore: 10,
    verified: true // 1
  },
  {
    file: 'evidence2.pdf',
    date: '2025-01-02',
    sender: 'Sender A',
    rec: 'Receiver B',
    text: 'Another text.',
    cat: 'custody',
    prio: 1,
    hash: 'hash2',
    wScore: 10,
    verified: false // 0
  }
];

const mockScottLogs: ScottLogEntry[] = [
  {
    id: 'log1',
    incidentDate: '2025-03-01T12:00:00',
    category: 'Denial of Parenting Time', // 1
    theSay: 'I cannot come.',
    theFact: 'She was available.',
    childImpact: 'Crying',
    exhibitRef: 'ex1',
    statuteTag: 'Statute 1'
  },
  {
    id: 'log2',
    incidentDate: '2025-03-02T12:00:00',
    category: 'Alienation', // 0
    theSay: 'Bad dad.',
    theFact: 'Good dad.',
    childImpact: 'N/A',
    exhibitRef: 'ex2',
    statuteTag: 'Statute 2'
  }
];

const mockSystemAuditLogs: SystemAuditLogEntry[] = [
  {
    id: 'audit1',
    date: '2025-03-01',
    action: 'Audit 1',
    status: 'Active',
    note: 'Note 1'
  },
  {
    id: 'audit2',
    date: '2025-03-02',
    action: 'Audit 2',
    status: 'Critical',
    note: 'Note 2'
  }
];

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'med1',
    title: 'Medical Report A',
    source: 'Hospital X',
    dateOfRecord: '2025-02-01',
    ocrText: 'Patient showed signs of stress.',
    status: 'reviewed',
    dateAdded: '2025-02-02',
    pageCount: 5
  },
  {
    id: 'med2',
    title: 'Medical Report B',
    source: 'Hospital Y',
    dateOfRecord: '2025-02-03',
    ocrText: 'Another report.',
    status: 'needs_review',
    dateAdded: '2025-02-04',
    pageCount: 10
  }
];

describe('Dashboard', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('evidence', JSON.stringify(mockEvidence));
    localStorage.setItem('scottLogs', JSON.stringify(mockScottLogs));
    localStorage.setItem('systemAuditLogs', JSON.stringify(mockSystemAuditLogs));
    localStorage.setItem('medicalRecords', JSON.stringify(mockMedicalRecords));
  });

  it('renders stats correctly from localStorage', async () => {
    render(<Dashboard onNavigate={() => {}} />);

    // Verified Exhibits: 1
    // Days Denied: 1
    // Audit Targets: 2
    // SJRH Pages: 15 (5 + 10)

    await waitFor(() => {
       // Check Verified Exhibits (1)
       const verifiedLabel = screen.getByText('Verified Exhibits');
       const verifiedValue = verifiedLabel.parentElement?.querySelector('p.text-slate-900');
       expect(verifiedValue).toHaveTextContent('1');

       // Check Days Denied (1)
       const deniedLabel = screen.getByText('Days Denied');
       const deniedValue = deniedLabel.parentElement?.querySelector('p.text-blue-600');
       expect(deniedValue).toHaveTextContent('1');

       // Check Audit Targets (2)
       const auditLabel = screen.getByText('Audit Targets');
       const auditValue = auditLabel.parentElement?.querySelector('p.text-indigo-600');
       expect(auditValue).toHaveTextContent('2');

       // Check SJRH Pages (15)
       const pagesLabel = screen.getByText('SJRH Pages');
       const pagesValue = pagesLabel.parentElement?.querySelector('p.text-amber-600');
       expect(pagesValue).toHaveTextContent('15');
    });
  });

  it('calculates stats correctly with empty localStorage', async () => {
    localStorage.clear();
    render(<Dashboard onNavigate={() => {}} />);

    await waitFor(() => {
       const zeros = screen.getAllByText('0');
       expect(zeros.length).toBeGreaterThan(0); // Should have multiple zeros
    });
  });
});
