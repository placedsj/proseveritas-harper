import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GlobalSearch } from './GlobalSearch';

describe('GlobalSearch', () => {
  const onClose = vi.fn();
  const onNavigate = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
    onNavigate.mockClear();
    localStorage.clear();
  });

  it('closes when pressing Escape', () => {
    render(<GlobalSearch isOpen onClose={onClose} onNavigate={onNavigate} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
  });

  it('closes when clicking the backdrop', () => {
    render(<GlobalSearch isOpen onClose={onClose} onNavigate={onNavigate} />);

    const overlay = screen.getByTestId('global-search-overlay');
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });
});
