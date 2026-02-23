import { render, screen, fireEvent } from '@testing-library/react';
import { GlobalSearch } from './GlobalSearch';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Search: () => <svg data-testid="icon-search" />,
  X: () => <svg data-testid="icon-x" />,
  ArrowRight: () => <svg data-testid="icon-arrow-right" />,
  LayoutDashboard: () => <svg data-testid="icon-layout-dashboard" />,
  Map: () => <svg data-testid="icon-map" />,
  FileText: () => <svg data-testid="icon-file-text" />,
  Stethoscope: () => <svg data-testid="icon-stethoscope" />,
  Scale: () => <svg data-testid="icon-scale" />,
  ShieldAlert: () => <svg data-testid="icon-shield-alert" />,
  Gavel: () => <svg data-testid="icon-gavel" />,
  Clock: () => <svg data-testid="icon-clock" />,
}));

describe('GlobalSearch', () => {
  it('does not render when closed', () => {
    const handleClose = vi.fn();
    render(<GlobalSearch isOpen={false} onClose={handleClose} onNavigate={vi.fn()} />);
    expect(screen.queryByLabelText(/Search query/i)).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    const handleClose = vi.fn();
    render(<GlobalSearch isOpen={true} onClose={handleClose} onNavigate={vi.fn()} />);
    expect(screen.getByLabelText(/Search query/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Close search/i)).toBeInTheDocument();
  });

  it('closes on Escape key press', () => {
    const handleClose = vi.fn();
    render(<GlobalSearch isOpen={true} onClose={handleClose} onNavigate={vi.fn()} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('closes on backdrop click', () => {
    const handleClose = vi.fn();
    render(<GlobalSearch isOpen={true} onClose={handleClose} onNavigate={vi.fn()} />);

    // The backdrop is the outermost div.
    // We will target it by a test id that we plan to add.
    const backdrop = screen.getByTestId('search-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalled();
  });

  it('does NOT close on content click', () => {
    const handleClose = vi.fn();
    render(<GlobalSearch isOpen={true} onClose={handleClose} onNavigate={vi.fn()} />);

    const input = screen.getByLabelText(/Search query/i);
    fireEvent.click(input);
    expect(handleClose).not.toHaveBeenCalled();
  });
});
