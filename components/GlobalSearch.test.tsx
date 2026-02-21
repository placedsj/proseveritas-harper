import { render, screen, fireEvent, act } from '@testing-library/react';
import { GlobalSearch } from './GlobalSearch';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

// Mock types
import { ProcessedEvidenceItem } from '../types';

describe('GlobalSearch', () => {
  const mockOnClose = vi.fn();
  const mockOnNavigate = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not render when closed', () => {
    render(<GlobalSearch isOpen={false} onClose={mockOnClose} onNavigate={mockOnNavigate} />);
    expect(screen.queryByPlaceholderText(/Search tasks, evidence, logs/i)).not.toBeInTheDocument();
  });

  it('renders when open and focuses input', () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);
    const input = screen.getByPlaceholderText(/Search tasks, evidence, logs/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('loads data from localStorage on open', () => {
     const evidence: Partial<ProcessedEvidenceItem>[] = [
       { file: 'test-evidence.pdf', sender: 'Sender A', rec: 'Receiver B', text: 'Some content', cat: 'Category A', hash: '123', date: '2023-01-01', verified: false, wScore: 0, prio: 0 }
     ];
     localStorage.setItem('evidence', JSON.stringify(evidence));

     render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

     const input = screen.getByPlaceholderText(/Search tasks, evidence, logs/i);
     fireEvent.change(input, { target: { value: 'test' } });

     // Advance timers for debounce
     act(() => {
        vi.advanceTimersByTime(200);
     });

     expect(screen.getByText('test-evidence.pdf')).toBeInTheDocument();
  });

  it('filters results correctly', () => {
     const evidence: Partial<ProcessedEvidenceItem>[] = [
       { file: 'find-me.pdf', sender: 'Alice', rec: 'Bob', text: 'Secret content', cat: 'General', hash: '1', date: '2023-01-01', verified: false, wScore: 0, prio: 0 },
       { file: 'hide-me.pdf', sender: 'Charlie', rec: 'Dave', text: 'Other content', cat: 'General', hash: '2', date: '2023-01-01', verified: false, wScore: 0, prio: 0 }
     ];
     localStorage.setItem('evidence', JSON.stringify(evidence));

     render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

     const input = screen.getByPlaceholderText(/Search tasks, evidence, logs/i);
     fireEvent.change(input, { target: { value: 'find' } });

     act(() => {
        vi.advanceTimersByTime(200);
     });

     expect(screen.getByText('find-me.pdf')).toBeInTheDocument();
     expect(screen.queryByText('hide-me.pdf')).not.toBeInTheDocument();
  });

  it('supports advanced filters (sender:)', () => {
     const evidence: Partial<ProcessedEvidenceItem>[] = [
       { file: 'email1.pdf', sender: 'Alice', rec: 'Bob', text: 'Content 1', cat: 'General', hash: '1', date: '2023-01-01', verified: false, wScore: 0, prio: 0 },
       { file: 'email2.pdf', sender: 'Bob', rec: 'Alice', text: 'Content 2', cat: 'General', hash: '2', date: '2023-01-01', verified: false, wScore: 0, prio: 0 }
     ];
     localStorage.setItem('evidence', JSON.stringify(evidence));

     render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

     const input = screen.getByPlaceholderText(/Search tasks, evidence, logs/i);
     fireEvent.change(input, { target: { value: 'sender:Alice' } });

     act(() => {
        vi.advanceTimersByTime(200);
     });

     expect(screen.getByText('email1.pdf')).toBeInTheDocument();
     expect(screen.queryByText('email2.pdf')).not.toBeInTheDocument();
  });

  it('navigates and closes on selection', () => {
     const evidence: Partial<ProcessedEvidenceItem>[] = [
       { file: 'doc.pdf', sender: 'Me', rec: 'You', text: 'Hi', cat: 'Misc', hash: '1', date: '2023-01-01', verified: false, wScore: 0, prio: 0 }
     ];
     localStorage.setItem('evidence', JSON.stringify(evidence));

     render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

     const input = screen.getByPlaceholderText(/Search tasks, evidence, logs/i);
     fireEvent.change(input, { target: { value: 'doc' } });

     act(() => {
        vi.advanceTimersByTime(200);
     });

     const result = screen.getByText('doc.pdf');
     fireEvent.click(result);

     expect(mockOnNavigate).toHaveBeenCalledWith('processor');
     expect(mockOnClose).toHaveBeenCalled();
  });
});
