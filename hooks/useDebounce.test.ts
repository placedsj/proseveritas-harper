import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { describe, it, expect, vi } from 'vitest';

describe('useDebounce', () => {
  it('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value update', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Update value
    rerender({ value: 'updated', delay: 500 });

    // Should not update immediately
    expect(result.current).toBe('initial');

    // Fast forward time slightly less than delay
    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe('initial');

    // Fast forward past delay
    act(() => {
      vi.advanceTimersByTime(2); // 499 + 2 = 501 > 500
    });

    expect(result.current).toBe('updated');
    vi.useRealTimers();
  });

  it('should update if delay changes', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Change delay to 100ms
    rerender({ value: 'updated', delay: 100 });

    act(() => {
      vi.advanceTimersByTime(101);
    });

    expect(result.current).toBe('updated');
    vi.useRealTimers();
  });
});
