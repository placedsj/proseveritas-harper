import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GlobalSearch } from './GlobalSearch';
import { StorageService } from '../services/storageService';

// Mock StorageService
vi.mock('../services/storageService', () => ({
  StorageService: {
    getEvidence: vi.fn(() => []),
    getMedicalRecords: vi.fn(() => []),
    getScottLogs: vi.fn(() => []),
    getAbuseLogs: vi.fn(() => []),
    getTimelineEvents: vi.fn(() => []),
    getCourtEvents: vi.fn(() => []),
    getDailyMoves: vi.fn(() => []),
    getSystemAuditLogs: vi.fn(() => []),
    getBusinessProjects: vi.fn(() => []),
    getRoadmapTasks: vi.fn(() => []),
    getStrategyNotes: vi.fn(() => []),
    getProductTiers: vi.fn(() => []),
  }
}));

describe('GlobalSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render nothing when closed', () => {
    render(<GlobalSearch isOpen={false} onClose={() => {}} onNavigate={() => {}} />);
    expect(screen.queryByPlaceholderText('Search tasks, evidence, logs, audits...')).toBeNull();
  });

  it('should render input when open', () => {
    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);
    expect(screen.getByPlaceholderText('Search tasks, evidence, logs, audits...')).toBeInTheDocument();
  });

  it('should call StorageService methods when opened', () => {
    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);
    expect(StorageService.getEvidence).toHaveBeenCalled();
    expect(StorageService.getMedicalRecords).toHaveBeenCalled();
    expect(StorageService.getSystemAuditLogs).toHaveBeenCalled();
  });

  it('should display results when searching evidence', async () => {
    (StorageService.getEvidence as any).mockReturnValue([
      { file: 'Test Evidence', text: 'This is a test evidence', sender: 'Sender', rec: 'Receiver', cat: 'Category', date: '2025-01-01', hash: '1' }
    ]);

    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs, audits...');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText('Test Evidence')).toBeInTheDocument();
    });
  });

  it('should display system audit logs when searching', async () => {
    (StorageService.getSystemAuditLogs as any).mockReturnValue([
      { id: '1', action: 'Audit Action', note: 'Audit Note', date: '2025-01-01', status: 'Active' }
    ]);

    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs, audits...');
    fireEvent.change(input, { target: { value: 'Audit' } });

    await waitFor(() => {
      expect(screen.getByText('Audit Action')).toBeInTheDocument();
      expect(screen.getByText('Audit Note')).toBeInTheDocument();
    });
  });

  it('should display business projects when searching', async () => {
    (StorageService.getBusinessProjects as any).mockReturnValue([
      { id: '1', name: 'New Project', status: 'Active', value: 1000, type: 'PLACED', nextAction: 'Do it' }
    ]);

    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs, audits...');
    fireEvent.change(input, { target: { value: 'Project' } });

    await waitFor(() => {
      expect(screen.getByText('New Project')).toBeInTheDocument();
      expect(screen.getByText('Status: Active, Value: $1000')).toBeInTheDocument();
    });
  });

  it('should filter by specific fields (e.g. action:)', async () => {
    (StorageService.getSystemAuditLogs as any).mockReturnValue([
      { id: '1', action: 'Target Action', note: 'Note', date: '2025-01-01', status: 'Active' },
      { id: '2', action: 'Other', note: 'Note', date: '2025-01-01', status: 'Active' }
    ]);

    render(<GlobalSearch isOpen={true} onClose={() => {}} onNavigate={() => {}} />);

    const input = screen.getByPlaceholderText('Search tasks, evidence, logs, audits...');
    fireEvent.change(input, { target: { value: 'action:Target' } });

    await waitFor(() => {
      expect(screen.getByText('Target Action')).toBeInTheDocument();
      expect(screen.queryByText('Other')).toBeNull();
    });
  });
});
