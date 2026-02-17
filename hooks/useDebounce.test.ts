import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { describe, it, expect, vi } from 'vitest';

describe('useDebounce', () => {
  it('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Value should not update immediately
    expect(result.current).toBe('initial');

    // Fast-forward time by 200ms
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('initial');

    // Fast-forward time by another 300ms (total 500ms)
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('updated');

    vi.useRealTimers();
  });

  it('should cancel the previous timeout if value changes quickly', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Update value once
    rerender({ value: 'update1', delay: 500 });

    // Fast-forward 200ms
    act(() => {
        vi.advanceTimersByTime(200);
    });

    // Update value again before delay is reached
    rerender({ value: 'update2', delay: 500 });

    // Should still be initial value
    expect(result.current).toBe('initial');

    // Fast-forward 400ms (total 600ms since first update, but only 400ms since second update)
    act(() => {
        vi.advanceTimersByTime(400);
    });

    // Should still be initial because the second update reset the timer
    expect(result.current).toBe('initial');

    // Fast-forward another 100ms (total 500ms since second update)
    act(() => {
        vi.advanceTimersByTime(100);
    });

    // Now it should update to the latest value
    expect(result.current).toBe('update2');

    vi.useRealTimers();
  });
});
