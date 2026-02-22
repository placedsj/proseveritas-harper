import { render, screen } from '@testing-library/react';
import EvidenceProcessor from './EvidenceProcessor';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';

describe('EvidenceProcessor', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders verify buttons with accessible labels', () => {
    render(<EvidenceProcessor />);

    // There are 3 default items, all unverified initially.
    // We expect to find buttons with aria-label "Verify evidence"
    // Currently, this will fail as there are no aria-labels.
    const verifyButtons = screen.getAllByRole('button', { name: /Verify evidence/i });
    expect(verifyButtons).toHaveLength(3);
  });

  it('renders verify buttons with tooltips', () => {
    render(<EvidenceProcessor />);

    const verifyButtons = screen.getAllByTitle(/Mark as verified/i);
    expect(verifyButtons).toHaveLength(3);
  });
});
