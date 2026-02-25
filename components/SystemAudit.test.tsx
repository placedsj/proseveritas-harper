import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import SystemAudit from './SystemAudit';
import React from 'react';

describe('SystemAudit Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('validates form fields before allowing save', () => {
    render(<SystemAudit />);

    // Open the form
    const addAuditButton = screen.getByText(/Log Audit/i);
    fireEvent.click(addAuditButton);

    // Find the save button
    const saveButton = screen.getByRole('button', { name: /SAVE TO LOG/i });

    // Initially disabled because fields are empty
    expect(saveButton).toBeDisabled();

    // Fill in required fields
    // Note: These labels are currently NOT associated with inputs, so getByLabelText might fail or select nothing if not implemented correctly yet.
    // However, testing-library tries to be smart. If not, I'll need to update the component to associate them.
    // This test confirms the need for accessible labels too!

    // Let's assume we want to fix the labels as part of the plan.
    // If getByLabelText fails, it confirms the accessibility issue.
    const actionInput = screen.getByLabelText(/Action \/ Target/i);
    fireEvent.change(actionInput, { target: { value: 'Test Action' } });

    // Button should still be disabled (note is missing)
    expect(saveButton).toBeDisabled();

    const noteInput = screen.getByLabelText(/Findings \/ Note/i);
    fireEvent.change(noteInput, { target: { value: 'Test Note' } });

    // Now it should be enabled
    expect(saveButton).not.toBeDisabled();
  });

  it('has an accessible close button', () => {
    render(<SystemAudit />);
    const addAuditButton = screen.getByText(/Log Audit/i);
    fireEvent.click(addAuditButton);

    // This should find the button once we add aria-label="Close form"
    const closeButton = screen.getByRole('button', { name: /Close form/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    // Form should close (not visible anymore)
    expect(screen.queryByText(/New Audit Entry/i)).not.toBeInTheDocument();
  });
});
