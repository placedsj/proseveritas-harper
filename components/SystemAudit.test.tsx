
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SystemAudit from './SystemAudit';

describe('SystemAudit', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // Mock window.confirm
    window.confirm = vi.fn(() => true);
  });

  it('renders default logs from localStorage if present', () => {
    const logs = [
      { id: '1', date: 'Feb 1, 2026', action: 'Test Action', status: 'Active', note: 'Test Note' }
    ];
    localStorage.setItem('systemAuditLogs', JSON.stringify(logs));

    render(<SystemAudit />);

    expect(screen.getByText('Test Action')).toBeInTheDocument();
    expect(screen.getByText('Test Note')).toBeInTheDocument();
  });

  it('allows adding a new log entry', () => {
    localStorage.setItem('systemAuditLogs', '[]');
    render(<SystemAudit />);

    // Click "New Entry" button
    fireEvent.click(screen.getByText(/New Entry/i));

    // Fill form
    const actionInput = screen.getByPlaceholderText(/e.g. Missing Police Report/i);
    const noteInput = screen.getByPlaceholderText(/Details of the discrepancy found.../i);

    fireEvent.change(actionInput, { target: { value: 'New Test Audit' } });
    fireEvent.change(noteInput, { target: { value: 'Found a new issue' } });

    // Click Status button (e.g., 'Critical')
    fireEvent.click(screen.getByRole('button', { name: 'Critical' }));

    // Click Save
    fireEvent.click(screen.getByText(/Save to Audit Log/i));

    // Verify new log is displayed
    expect(screen.getByText('New Test Audit')).toBeInTheDocument();
    expect(screen.getByText('Found a new issue')).toBeInTheDocument();
    expect(screen.getByText('Critical')).toBeInTheDocument();

    // Verify localStorage updated
    const savedLogs = JSON.parse(localStorage.getItem('systemAuditLogs') || '[]');
    expect(savedLogs).toHaveLength(1);
    expect(savedLogs[0].action).toBe('New Test Audit');
  });

  it('allows deleting a log entry', () => {
    const logs = [
        { id: '1', date: 'Feb 1, 2026', action: 'Delete Me', status: 'Active', note: 'Will be deleted' }
    ];
    localStorage.setItem('systemAuditLogs', JSON.stringify(logs));

    render(<SystemAudit />);

    const deleteBtn = screen.getByTitle('Delete Entry');
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalled();
    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();

    const savedLogs = JSON.parse(localStorage.getItem('systemAuditLogs') || '[]');
    expect(savedLogs).toHaveLength(0);
  });
});
