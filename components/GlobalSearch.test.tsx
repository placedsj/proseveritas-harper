import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GlobalSearch } from './GlobalSearch';
import { INITIAL_SCOTT_LOGS, INITIAL_EVIDENCE, INITIAL_MEDICAL_RECORDS, INITIAL_SYSTEM_AUDIT_LOGS } from './initialData';

describe('GlobalSearch', () => {
  beforeEach(() => {
    localStorage.clear();
    // Simulate DataInitializer
    localStorage.setItem('scottLogs', JSON.stringify(INITIAL_SCOTT_LOGS));
    localStorage.setItem('evidence', JSON.stringify(INITIAL_EVIDENCE));
    localStorage.setItem('medicalRecords', JSON.stringify(INITIAL_MEDICAL_RECORDS));
    localStorage.setItem('systemAuditLogs', JSON.stringify(INITIAL_SYSTEM_AUDIT_LOGS));
  });

  const mockOnClose = vi.fn();
  const mockOnNavigate = vi.fn();

  it('should render when open', () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);
    expect(screen.getByPlaceholderText('Search tasks, evidence, logs...')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(<GlobalSearch isOpen={false} onClose={mockOnClose} onNavigate={mockOnNavigate} />);
    expect(screen.queryByPlaceholderText('Search tasks, evidence, logs...')).not.toBeInTheDocument();
  });

  it('should find results based on query', async () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    fireEvent.change(input, { target: { value: 'Merry Christmas' } });

    await waitFor(() => {
      expect(screen.getByText('Denial of Parenting Time')).toBeInTheDocument(); // From Scott Logs
      expect(screen.getByText(/Merry Christmas we've been very busy/)).toBeInTheDocument();
    });
  });

  it('should handle filters (e.g. category:)', async () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    fireEvent.change(input, { target: { value: 'category:Alienation' } });

    await waitFor(() => {
      expect(screen.getByText('Alienation')).toBeInTheDocument(); // Scott Log category
    });
  });

  it('should find medical records', async () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    fireEvent.change(input, { target: { value: 'Reasonable Suspicion' } });

    await waitFor(() => {
      expect(screen.getByText(/Reasonable Suspicion/)).toBeInTheDocument(); // Medical Record text
    });
  });
});
