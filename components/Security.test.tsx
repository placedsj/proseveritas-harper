import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoFounderChat from './CoFounderChat';
import SpiralJournal from './SpiralJournal';

test('CoFounderChat has max length on input', () => {
  render(<CoFounderChat />);
  const input = screen.getByPlaceholderText(/Ask for direction/i);
  expect(input).toHaveAttribute('maxLength', '2000');
});

test('SpiralJournal has max length on textarea', () => {
  render(<SpiralJournal />);
  const textarea = screen.getByPlaceholderText(/I'm worried about/i);
  expect(textarea).toHaveAttribute('maxLength', '2000');
});