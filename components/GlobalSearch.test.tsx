import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { GlobalSearch } from './GlobalSearch';
import { ViewState } from '../types';

// Mock dependencies
vi.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  X: () => <div data-testid="x-icon" />,
  ArrowRight: () => <div data-testid="arrow-right" />,
  LayoutDashboard: () => <div data-testid="layout-dashboard" />,
  Map: () => <div data-testid="map-icon" />,
  FileText: () => <div data-testid="file-text" />,
  Stethoscope: () => <div data-testid="stethoscope" />,
  Scale: () => <div data-testid="scale" />,
  ShieldAlert: () => <div data-testid="shield-alert" />,
  Gavel: () => <div data-testid="gavel" />,
  Clock: () => <div data-testid="clock" />,
}));

const mockOnClose = vi.fn();
const mockOnNavigate = vi.fn();

const sampleEvidence = [
  {
    hash: '123',
    file: 'evidence1.pdf',
    sender: 'John Doe',
    rec: 'Jane Doe',
    cat: 'Harassment',
    text: 'This is a test evidence document containing important information.',
    date: '2023-01-01',
    verified: false,
    processingStatus: 'completed',
    extractedDate: '2023-01-01',
  }
];

const sampleMedicalRecords = [
  {
    id: 'med1',
    title: 'Medical Report A',
    source: 'Hospital X',
    dateOfRecord: '2023-02-01',
    ocrText: 'Patient shows signs of severe stress and anxiety.',
    status: 'reviewed',
    dateAdded: '2023-02-02',
    pageCount: 5,
  }
];

describe('GlobalSearch Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    // Seed localStorage
    localStorage.setItem('evidence', JSON.stringify(sampleEvidence));
    localStorage.setItem('medicalRecords', JSON.stringify(sampleMedicalRecords));
    localStorage.setItem('scottLogs', '[]');
    localStorage.setItem('abuseLogs', '[]');
    localStorage.setItem('timelineEvents', '[]');
    localStorage.setItem('courtEvents', '[]');
    localStorage.setItem('dailyMoves', '[]');
  });

  it('renders correctly when open', () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);
    expect(screen.getByPlaceholderText('Search tasks, evidence, logs...')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<GlobalSearch isOpen={false} onClose={mockOnClose} onNavigate={mockOnNavigate} />);
    expect(screen.queryByPlaceholderText('Search tasks, evidence, logs...')).not.toBeInTheDocument();
  });

  it('performs search and displays results', async () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    fireEvent.change(input, { target: { value: 'evidence' } });

    await waitFor(() => {
      expect(screen.getByText('evidence1.pdf')).toBeInTheDocument();
    });

    // Check that snippet is displayed
    expect(screen.getByText(/This is a test evidence/)).toBeInTheDocument();
  });

  it('displays "No results found" for unmatched query', async () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    fireEvent.change(input, { target: { value: 'nonexistentterm' } });

    await waitFor(() => {
      expect(screen.getByText('No results found for "nonexistentterm"')).toBeInTheDocument();
    });
  });

  it('handles filters correctly', async () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    // Search for sender:John
    fireEvent.change(input, { target: { value: 'sender:John' } });

    await waitFor(() => {
      expect(screen.getByText('evidence1.pdf')).toBeInTheDocument();
    });
  });

  it('searches across multiple data types', async () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs...');
    fireEvent.change(input, { target: { value: 'stress' } }); // Matches medical record

    await waitFor(() => {
      expect(screen.getByText('Medical Report A')).toBeInTheDocument();
    });
  });

  it('closes when close button is clicked', () => {
    render(<GlobalSearch isOpen={true} onClose={mockOnClose} onNavigate={mockOnNavigate} />);

    const closeButton = screen.getByLabelText('Close search');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
