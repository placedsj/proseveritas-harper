
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GlobalSearch } from './GlobalSearch';
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
    verified: true
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
  }
];

const mockScottLogs: ScottLogEntry[] = [
  {
    id: 'log1',
    incidentDate: '2025-03-01T12:00:00',
    category: 'Denial of Parenting Time',
    theSay: 'I cannot come.',
    theFact: 'She was available.',
    childImpact: 'Crying',
    exhibitRef: 'ex1',
    statuteTag: 'Statute 1'
  }
];

describe('GlobalSearch', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('evidence', JSON.stringify(mockEvidence));
    localStorage.setItem('medicalRecords', JSON.stringify(mockMedicalRecords));
    localStorage.setItem('scottLogs', JSON.stringify(mockScottLogs));
    localStorage.setItem('abuseLogs', JSON.stringify([]));
    localStorage.setItem('timelineEvents', JSON.stringify([]));
    localStorage.setItem('courtEvents', JSON.stringify([]));
    localStorage.setItem('dailyMoves', JSON.stringify([]));
  });

  it('renders nothing when closed', () => {
    render(<GlobalSearch isOpen={false} onClose={() => {}} onNavigate={() => {}} />);
    expect(screen.queryByPlaceholderText(/Search tasks, evidence, logs.../i)).not.toBeInTheDocument();
  });

  it('renders search input when open', () => {
    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);
    expect(screen.getByPlaceholderText(/Search tasks, evidence, logs.../i)).toBeInTheDocument();
  });

  it('searches and displays results from evidence', async () => {
    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);
    const input = screen.getByPlaceholderText(/Search tasks, evidence, logs.../i);

    fireEvent.change(input, { target: { value: 'custody' } });

    await waitFor(() => {
      expect(screen.getByText('evidence1.pdf')).toBeInTheDocument();
      // Searching 'custody' will show snippet, so 'Sender A' (subtitle fallback) won't be shown
      expect(screen.getByText(/custody/i)).toBeInTheDocument();
    });
  });

  it('searches and displays results from medical records', async () => {
    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);
    const input = screen.getByPlaceholderText(/Search tasks, evidence, logs.../i);

    fireEvent.change(input, { target: { value: 'stress' } });

    await waitFor(() => {
      expect(screen.getByText('Medical Report A')).toBeInTheDocument();
      expect(screen.getByText(/Patient showed signs of stress/)).toBeInTheDocument();
    });
  });

  it('searches and displays results from scott logs', async () => {
    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);
    const input = screen.getByPlaceholderText(/Search tasks, evidence, logs.../i);

    fireEvent.change(input, { target: { value: 'available' } });

    await waitFor(() => {
      expect(screen.getByText('Denial of Parenting Time')).toBeInTheDocument();
      expect(screen.getByText(/She was available/)).toBeInTheDocument();
    });
  });

  it('calls onNavigate and onClose when a result is clicked', async () => {
    const onNavigate = vi.fn();
    const onClose = vi.fn();
    render(<GlobalSearch isOpen={true} onClose={onClose} onNavigate={onNavigate} />);

    const input = screen.getByPlaceholderText(/Search tasks, evidence, logs.../i);
    fireEvent.change(input, { target: { value: 'custody' } });

    await waitFor(() => {
      expect(screen.getByText('evidence1.pdf')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('evidence1.pdf'));

    expect(onNavigate).toHaveBeenCalledWith('processor');
    expect(onClose).toHaveBeenCalled();
  });
});
