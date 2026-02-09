
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from './Dashboard';
import { EvidenceItem, ParentingBlock, CourtEvent, MedicalRecord } from '../types';

describe('Dashboard', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockNavigate = vi.fn();

  it('renders correct stats from localStorage', () => {
    // Setup data with unique counts
    const evidenceItems: EvidenceItem[] = [
      { id: 'ev1', title: 'Test 1', description: '', category: 'criminal', status: 'ready' },
      { id: 'ev2', title: 'Test 2', description: '', category: 'custody', status: 'needs_requesting' } // Not ready
    ];
    // Count = 1

    const custodyBlocks: ParentingBlock[] = [
      { id: 'cb1', scheduledStart: '', scheduledEnd: '', status: 'Denied by Mother', hoursLost: 10 },
      { id: 'cb2', scheduledStart: '', scheduledEnd: '', status: 'Success', hoursLost: 0 }
    ];
    // Hours = 10

    const medicalRecords: MedicalRecord[] = [
      { id: 'mr1', title: 'Rec 1', source: '', dateOfRecord: '', ocrText: '', status: 'reviewed', dateAdded: '' },
      { id: 'mr2', title: 'Rec 2', source: '', dateOfRecord: '', ocrText: '', status: 'reviewed', dateAdded: '' }
    ];
    // Count = 2

    localStorage.setItem('evidenceItems', JSON.stringify(evidenceItems));
    localStorage.setItem('custodyBlocks', JSON.stringify(custodyBlocks));
    localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
    localStorage.setItem('soberStartDate', '2025-01-01');

    // Mock current time to 2025-01-31 (30 days sober)
    vi.setSystemTime(new Date('2025-01-31'));

    render(<Dashboard onNavigate={mockNavigate} />);

    // Verify stats by finding the label and checking the value above it

    // Verified Exhibits: 1
    const verifiedLabel = screen.getByText('Verified Exhibits');
    expect(verifiedLabel.previousSibling).toHaveTextContent('1');

    // Denied Hours: 10
    const deniedLabel = screen.getByText('Hours Denied');
    expect(deniedLabel.previousSibling).toHaveTextContent('10');

    // Sober Days: 30
    const soberLabel = screen.getByText('Sober Days');
    expect(soberLabel.previousSibling).toHaveTextContent('30');

    // Medical Records: 2
    const recordsLabel = screen.getByText('Medical Records');
    expect(recordsLabel.previousSibling).toHaveTextContent('2');

    vi.useRealTimers();
  });

  it('displays next court date', () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const courtEvents: CourtEvent[] = [
      { id: '1', date: tomorrow, caseName: 'Family Law', judgeName: 'Test Judge', requiredAction: 'Custody Hearing', status: 'Pending' }
    ];

    localStorage.setItem('courtEvents', JSON.stringify(courtEvents));

    render(<Dashboard onNavigate={mockNavigate} />);

    expect(screen.getByText('Custody Hearing')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(tomorrow))).toBeInTheDocument();
    expect(screen.getByText(/Test Judge/)).toBeInTheDocument();
  });
});
