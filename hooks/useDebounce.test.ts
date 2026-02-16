import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the value after the delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });

    // Value should not update immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should be updated
    expect(result.current).toBe('updated');
  });

  it('should reset the timer if value changes within the delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    rerender({ value: 'updated1', delay: 500 });

    // Advance time partially
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Update again before delay finishes
    rerender({ value: 'updated2', delay: 500 });

    // Advance time to complete the first delay period
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Should still be initial because timer was reset
    expect(result.current).toBe('initial');

    // Advance time to complete the second delay period
    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe('updated2');
  });
});
