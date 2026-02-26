import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GlobalSearch } from './GlobalSearch';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { ProcessedEvidenceItem, SystemAuditLog } from '../types';

describe('GlobalSearch', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockOnClose = vi.fn();
  const mockOnNavigate = vi.fn();

  it('renders when open', () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);
    expect(screen.getByPlaceholderText('Search tasks, evidence, logs...')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<GlobalSearch isOpen={false} onClose={mockOnClose} onNavigate={mockOnNavigate} />);
    expect(screen.queryByPlaceholderText('Search tasks, evidence, logs...')).not.toBeInTheDocument();
  });

  it('searches evidence items', async () => {
    const evidence: Partial<ProcessedEvidenceItem>[] = [
      { hash: '1', file: 'Evidence1', sender: 'Sender1', rec: 'Receiver1', cat: 'Category1', text: 'Some text content', date: '2023-01-01' }
    ];
    localStorage.setItem('evidence', JSON.stringify(evidence));

    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    fireEvent.change(input, { target: { value: 'Sender1' } });

    await waitFor(() => {
      expect(screen.getByText('Evidence1')).toBeInTheDocument();
    });
  });

  it('searches system audit logs', async () => {
    const logs: Partial<SystemAuditLog>[] = [
      { id: '1', date: '2023-01-01', action: 'Audit Action', status: 'Critical', note: 'Audit Note' }
    ];
    localStorage.setItem('systemAuditLogs', JSON.stringify(logs));

    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    fireEvent.change(input, { target: { value: 'Audit Action' } });

    // This is expected to fail initially until I implement the feature
    const items = await screen.findAllByText('Audit Action', {}, { timeout: 3000 });
    expect(items.length).toBeGreaterThan(0);
  });
});
