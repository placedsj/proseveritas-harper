import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Update value
    rerender({ value: 'updated', delay: 500 });

    // Value should not update immediately
    expect(result.current).toBe('initial');

    // Fast-forward time by 200ms (less than delay)
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('initial');

    // Fast-forward time by remaining 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Value should now be updated
    expect(result.current).toBe('updated');
  });

  it('should cancel debounce if value changes within delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Update to 'first update'
    rerender({ value: 'first update', delay: 500 });

    // Fast-forward 200ms
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('initial');

    // Update to 'second update' before delay finishes
    rerender({ value: 'second update', delay: 500 });

    // Fast-forward another 400ms (total 600ms from start, but only 400ms from last update)
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Should still be initial because the timer was reset
    expect(result.current).toBe('initial');

    // Fast-forward another 100ms (total 500ms from last update)
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe('second update');
  });
});
