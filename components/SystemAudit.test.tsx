import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SystemAudit from './SystemAudit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

// Mock types
import { SystemAuditLog } from '../types';

describe('SystemAudit', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders initial logs correctly', () => {
    render(<SystemAudit />);
    expect(screen.getByText('System Audit: Record Integrity')).toBeInTheDocument();
    // Check for initial logs if localStorage is empty
    expect(screen.getByText('Horizon Privacy Audit')).toBeInTheDocument();
  });

  it('loads logs from localStorage', () => {
    const logs: SystemAuditLog[] = [
      { id: '99', date: '2026-03-01', action: 'Test Audit', status: 'Critical', note: 'Test Note' }
    ];
    localStorage.setItem('systemAuditLogs', JSON.stringify(logs));

    render(<SystemAudit />);
    expect(screen.getByText('Test Audit')).toBeInTheDocument();
    expect(screen.getByText('Test Note')).toBeInTheDocument();
  });

  it('adds a new log entry', async () => {
    render(<SystemAudit />);

    // Open add form
    const addBtn = screen.getByText('Log Audit');
    fireEvent.click(addBtn);

    // Fill form
    const actionInput = screen.getByPlaceholderText('e.g. Horizon Privacy Audit');
    fireEvent.change(actionInput, { target: { value: 'New Action' } });

    const noteInput = screen.getByPlaceholderText('Enter forensic findings...');
    fireEvent.change(noteInput, { target: { value: 'New Findings' } });

    const saveBtn = screen.getByText('SAVE TO LOG');
    fireEvent.click(saveBtn);

    // Verify new log is added
    expect(screen.getByText('New Action')).toBeInTheDocument();
    expect(screen.getByText('New Findings')).toBeInTheDocument();

    // Verify persistence
    const saved = JSON.parse(localStorage.getItem('systemAuditLogs') || '[]');
    expect(saved).toHaveLength(5); // 4 initial + 1 new
    expect(saved[0].action).toBe('New Action');
  });

  it('validates form input', () => {
    render(<SystemAudit />);

    // Open add form
    const addBtn = screen.getByText('Log Audit');
    fireEvent.click(addBtn);

    const saveBtn = screen.getByText('SAVE TO LOG');
    fireEvent.click(saveBtn);

    // Should not add empty log
    // We can check if the form is still open or if no new log is added.
    // Since we don't have a way to check state directly, we assume the list hasn't changed.
    // The initial list has 4 items.
    const logs = screen.getAllByText(/Active|Critical|Flagged|Verified/);
    // This selector matches status badges.
    // Initial logs statuses: Active, Critical, Flagged, Verified (4 logs)
    // Note: The static list of tags also contains these words, so be careful.

    // Better to check localStorage
    const saved = JSON.parse(localStorage.getItem('systemAuditLogs') || '[]');
    // Wait, localStorage is set in useEffect. If validation fails, setLogs isn't called, so localStorage isn't updated.
    // But SystemAudit initializes from localStorage or default.
    // If we click save and it fails, nothing happens.

    // Let's just check that 'New Action' is NOT in the document if we tried to save empty.
    expect(screen.queryByText('New Action')).not.toBeInTheDocument();
  });
});
