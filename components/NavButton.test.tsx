import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect, vi } from 'vitest';
import { NavButton } from './NavButton';
import { LayoutDashboard } from 'lucide-react';

it('renders correctly', () => {
  const onNavigate = vi.fn();
  render(<NavButton target="dashboard" icon={LayoutDashboard} label="Cmd" isActive={true} onNavigate={onNavigate} />);

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Cmd');
});
