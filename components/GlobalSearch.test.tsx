import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GlobalSearch } from './GlobalSearch';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { ProcessedEvidenceItem, MedicalRecord, ScottLogEntry } from '../types';

describe('GlobalSearch', () => {
  const onNavigateMock = vi.fn();
  const onCloseMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    onNavigateMock.mockClear();
    onCloseMock.mockClear();

    // Mock Data
    const evidence: ProcessedEvidenceItem[] = [{
      file: 'file1.pdf',
      date: '2025-01-01',
      sender: 'Alice',
      rec: 'Bob',
      text: 'some secret text',
      cat: 'Custody',
      prio: 1,
      hash: 'abc',
      wScore: 1,
      verified: true
    }];

    const medicalRecords: MedicalRecord[] = [{
      id: 'med1',
      title: 'Doctor Report',
      source: 'Hospital',
      dateOfRecord: '2025-02-01',
      ocrText: 'patient is fine',
      status: 'reviewed',
      dateAdded: '2025-02-02',
      pageCount: 2
    }];

    const scottLogs: ScottLogEntry[] = [{
      id: 'sl1',
      incidentDate: '2025-03-01',
      category: 'Alienation',
      theSay: 'You are bad',
      theFact: 'I am good',
      childImpact: 'Crying',
      exhibitRef: '',
      statuteTag: ''
    }];

    localStorage.setItem('evidence', JSON.stringify(evidence));
    localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
    localStorage.setItem('scottLogs', JSON.stringify(scottLogs));
  });

  it('renders when isOpen is true', () => {
    render(<GlobalSearch isOpen={true} onClose={onCloseMock} onNavigate={onNavigateMock} />);
    expect(screen.getByLabelText('Search query')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<GlobalSearch isOpen={false} onClose={onCloseMock} onNavigate={onNavigateMock} />);
    expect(screen.queryByLabelText('Search query')).not.toBeInTheDocument();
  });

  it('searches and displays results', async () => {
    render(<GlobalSearch isOpen={true} onClose={onCloseMock} onNavigate={onNavigateMock} />);

    const input = screen.getByLabelText('Search query');
    fireEvent.change(input, { target: { value: 'secret' } });

    // Wait for debounce (200ms)
    await waitFor(() => {
      expect(screen.getByText('file1.pdf')).toBeInTheDocument();
    }, { timeout: 1000 });

    expect(screen.getByText(/some secret text/)).toBeInTheDocument();
  });

  it('handles filtering logic', async () => {
    render(<GlobalSearch isOpen={true} onClose={onCloseMock} onNavigate={onNavigateMock} />);

    const input = screen.getByLabelText('Search query');
    fireEvent.change(input, { target: { value: 'category:Alienation' } });

    await waitFor(() => {
      expect(screen.getByText('Alienation')).toBeInTheDocument();
    });

    // Should verify it's a Scott Log result
    expect(screen.getByText(/You are bad/)).toBeInTheDocument();
  });

  it('navigates on result click', async () => {
    render(<GlobalSearch isOpen={true} onClose={onCloseMock} onNavigate={onNavigateMock} />);

    const input = screen.getByLabelText('Search query');
    fireEvent.change(input, { target: { value: 'Doctor' } });

    await waitFor(() => {
      expect(screen.getByText('Doctor Report')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Doctor Report'));

    expect(onNavigateMock).toHaveBeenCalledWith('medical-records');
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('closes on close button click', () => {
    render(<GlobalSearch isOpen={true} onClose={onCloseMock} onNavigate={onNavigateMock} />);

    const closeButton = screen.getByLabelText('Close search');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
