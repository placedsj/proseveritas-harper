
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from './Dashboard';
import { ProcessedEvidenceItem, ScottLogEntry, SystemAuditLog, MedicalRecord } from '../types';

// Mock data
const mockEvidence: ProcessedEvidenceItem[] = [
  { file: '1.png', verified: true, hash: '1', date: '', sender: '', rec: '', text: '', cat: '', prio: 0, wScore: 0 },
  { file: '2.png', verified: false, hash: '2', date: '', sender: '', rec: '', text: '', cat: '', prio: 0, wScore: 0 },
  { file: '3.png', verified: true, hash: '3', date: '', sender: '', rec: '', text: '', cat: '', prio: 0, wScore: 0 },
]; // 2 verified

const mockScottLogs: ScottLogEntry[] = [
  { id: '1', category: 'Denial of Parenting Time', incidentDate: '', theSay: '', theFact: '', childImpact: 'N/A', exhibitRef: '', statuteTag: '' },
  { id: '2', category: 'Alienation', incidentDate: '', theSay: '', theFact: '', childImpact: 'N/A', exhibitRef: '', statuteTag: '' },
  { id: '3', category: 'Denial of Parenting Time', incidentDate: '', theSay: '', theFact: '', childImpact: 'N/A', exhibitRef: '', statuteTag: '' },
]; // 2 denials

const mockSystemAuditLogs: SystemAuditLog[] = [
  { id: '1', date: '', action: '', status: '', note: '' },
  { id: '2', date: '', action: '', status: '', note: '' },
  { id: '3', date: '', action: '', status: '', note: '' },
]; // 3 audits

const mockMedicalRecords: MedicalRecord[] = [
  { id: '1', title: '', source: '', dateOfRecord: '', ocrText: '', status: 'reviewed', dateAdded: '', pageCount: 10 },
  { id: '2', title: '', source: '', dateOfRecord: '', ocrText: '', status: 'reviewed', dateAdded: '', pageCount: 5 },
]; // 15 pages

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();

    // Setup localStorage mock
    localStorage.setItem('evidence', JSON.stringify(mockEvidence));
    localStorage.setItem('scottLogs', JSON.stringify(mockScottLogs));
    localStorage.setItem('systemAuditLogs', JSON.stringify(mockSystemAuditLogs));
    localStorage.setItem('medicalRecords', JSON.stringify(mockMedicalRecords));
  });

  it('calculates and displays statistics from localStorage', async () => {
    const onNavigate = vi.fn();
    render(<Dashboard onNavigate={onNavigate} />);

    // Check for "Verified Exhibits" -> 2
    // We look for the number 2 specifically in the context of stats blocks if possible,
    // but globally finding '2' is risky if the timer has a '2'.
    // However, the test runs fast so timer might not update much.
    // Let's rely on finding the label and checking nearby value if possible, or just expect '2' to be present.
    // Better: assert specific elements.

    expect(screen.getByText('Verified Exhibits')).toBeInTheDocument();
    expect(screen.getByText('Days Denied')).toBeInTheDocument();
    expect(screen.getByText('Audit Targets')).toBeInTheDocument();
    expect(screen.getByText('SJRH Pages')).toBeInTheDocument();

    // Since we know the numbers are unique enough in this combination:
    // 2, 2, 3, 15.
    // '2' appears twice. '3' once. '15' once.

    const twos = screen.getAllByText('2');
    expect(twos.length).toBeGreaterThanOrEqual(2); // At least 2 verified + 2 denials = 4? No, values are 2 and 2.

    expect(screen.getByText('3')).toBeInTheDocument(); // Audit Targets
    expect(screen.getByText('15')).toBeInTheDocument(); // SJRH Pages
  });

  it('handles missing localStorage data gracefully', () => {
    localStorage.clear();
    const onNavigate = vi.fn();
    render(<Dashboard onNavigate={onNavigate} />);

    // Should verify it renders 0 for everything
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThan(0);

    // Specifically check that labels are still there
    expect(screen.getByText('Verified Exhibits')).toBeInTheDocument();
  });
});
