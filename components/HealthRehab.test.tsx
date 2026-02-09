
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HealthRehab from './HealthRehab';

describe('HealthRehab', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders default sobriety start date', () => {
    localStorage.setItem('soberStartDate', '2025-01-25');
    render(<HealthRehab />);
    const input = screen.getByLabelText(/start date/i) as HTMLInputElement;
    expect(input.value).toBe('2025-01-25');
  });

  it('updates sobriety start date and calculates days', () => {
    localStorage.setItem('soberStartDate', '2025-01-01');
    render(<HealthRehab />);
    const input = screen.getByLabelText(/start date/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2025-01-01' } });

    // Check if localStorage is updated
    expect(localStorage.getItem('soberStartDate')).toBe('2025-01-01');

    // Check days calculation
    // Mock Date.now to a fixed date
    const mockDate = new Date('2025-01-31').getTime();
    vi.setSystemTime(mockDate);

    // We need to re-render or trigger calculation if it uses Date.now() directly inside component body or hook
    // The component calculates days in render: calculateSoberDays() uses new Date()
    // So changing system time and re-rendering should update the display
    render(<HealthRehab />);
    // 30 days difference
    expect(screen.getByText('30')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
