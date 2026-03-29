import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NavButton } from './NavButton';
import React from 'react';

// Mock icon
const MockIcon = () => <svg data-testid="icon" />;

describe('NavButton', () => {
  it('renders correctly when active', () => {
    const onNavigate = vi.fn();
    render(
      <NavButton
        target="dashboard"
        icon={MockIcon}
        label="Cmd"
        isActive={true}
        onNavigate={onNavigate}
      />
    );

    const button = screen.getByRole('button');
    // Active classes
    expect(button.className).toContain('bg-red-600');
    expect(button.className).toContain('text-white');
    expect(screen.getByText('Cmd')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders correctly when inactive', () => {
    const onNavigate = vi.fn();
    render(
      <NavButton
        target="dashboard"
        icon={MockIcon}
        label="Cmd"
        isActive={false}
        onNavigate={onNavigate}
      />
    );

    const button = screen.getByRole('button');
    // Inactive classes
    expect(button.className).toContain('text-slate-400');
    expect(button.className).not.toContain('bg-red-600');
  });

  it('calls onNavigate when clicked', () => {
    const onNavigate = vi.fn();
    render(
      <NavButton
        target="dashboard"
        icon={MockIcon}
        label="Cmd"
        isActive={false}
        onNavigate={onNavigate}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onNavigate).toHaveBeenCalledWith('dashboard');
  });
});
