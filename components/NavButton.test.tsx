import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { NavButton } from './NavButton';
import { Activity } from 'lucide-react';

test('renders correctly with default state', () => {
  render(<NavButton target="dashboard" icon={Activity} label="Test Nav" currentView="system-audit" onNavigate={() => {}} />);

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('title', 'Test Nav');
  expect(button).not.toHaveAttribute('aria-current');
  expect(button.className).toContain('focus-visible:outline-none');
});

test('renders correctly with active state', () => {
  render(<NavButton target="dashboard" icon={Activity} label="Test Nav" currentView="dashboard" onNavigate={() => {}} />);

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-current', 'page');
  expect(button.className).toContain('bg-red-600');
});
