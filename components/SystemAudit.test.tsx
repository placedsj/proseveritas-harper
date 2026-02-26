import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SystemAudit from './SystemAudit';

describe('SystemAudit Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the component and allows opening the form', () => {
    render(<SystemAudit />);
    // "Log Audit" button might not have aria-label yet, but has text "Log Audit"
    const logButton = screen.getByRole('button', { name: /Log Audit/i });
    expect(logButton).toBeInTheDocument();
    fireEvent.click(logButton);
    expect(screen.getByText('New Audit Entry')).toBeInTheDocument();
  });

  it('validates form fields and disables save button', () => {
    render(<SystemAudit />);
    fireEvent.click(screen.getByRole('button', { name: /Log Audit/i }));

    const saveButton = screen.getByRole('button', { name: /SAVE TO LOG/i });

    // Initially disabled
    expect(saveButton).toBeDisabled();

    // Fill inputs
    const actionInput = screen.getByLabelText(/Action \/ Target/i);
    const noteInput = screen.getByLabelText(/Findings \/ Note/i);

    fireEvent.change(actionInput, { target: { value: 'Test Action' } });
    expect(saveButton).toBeDisabled(); // Still disabled, need note

    fireEvent.change(noteInput, { target: { value: 'Test Note' } });
    expect(saveButton).not.toBeDisabled(); // Now enabled
  });

  it('has accessible close button', () => {
    render(<SystemAudit />);
    fireEvent.click(screen.getByRole('button', { name: /Log Audit/i }));

    // This will fail until we add aria-label="Close form"
    const closeButton = screen.getByRole('button', { name: /Close form/i });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(screen.queryByText('New Audit Entry')).not.toBeInTheDocument();
  });

  it('associates labels with inputs', () => {
    render(<SystemAudit />);
    fireEvent.click(screen.getByRole('button', { name: /Log Audit/i }));

    // These will fail until we add htmlFor and id
    expect(screen.getByLabelText(/Action \/ Target/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Findings \/ Note/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
  });
});
