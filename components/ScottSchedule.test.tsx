
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScottSchedule from './ScottSchedule';
import { ScottLogEntry } from '../types';

describe('ScottSchedule', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders initial logs from localStorage', async () => {
    const mockLogs: ScottLogEntry[] = [
      {
        id: 'log1',
        incidentDate: '2025-01-01T12:00:00',
        category: 'Denial of Parenting Time',
        theSay: 'Say 1',
        theFact: 'Fact 1',
        childImpact: 'N/A',
        exhibitRef: 'ex1',
        statuteTag: 'Statute 1'
      }
    ];
    localStorage.setItem('scottLogs', JSON.stringify(mockLogs));

    render(<ScottSchedule />);

    await waitFor(() => {
      // Use regex to match text with surrounding quotes if present
      expect(screen.getByText(/Say 1/)).toBeInTheDocument();
      expect(screen.getByText(/Fact 1/)).toBeInTheDocument();
    });
  });

  it('adds a new log', async () => {
    render(<ScottSchedule />);

    // Open add form
    const addBtn = screen.getByText(/Log Incident/i);
    fireEvent.click(addBtn);

    // Fill form
    const sayInput = screen.getByPlaceholderText(/Ex: 'Craig was aggressive/i);
    const factInput = screen.getByPlaceholderText(/Ex: 'Arrived at 4:00 PM/i);

    fireEvent.change(sayInput, { target: { value: 'New Allegation' } });
    fireEvent.change(factInput, { target: { value: 'New Fact' } });

    // Submit
    const saveBtn = screen.getByText(/COMMIT TO RECORD/i);
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText(/New Allegation/)).toBeInTheDocument();
      expect(screen.getByText(/New Fact/)).toBeInTheDocument();
    });
  });
});
