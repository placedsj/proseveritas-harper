import { useState, useEffect } from 'react';

/**
 * A hook that delays updating a value until a specified delay has passed.
 * Useful for debouncing search inputs to avoid excessive API calls or calculations.
 *
 * @param value The value to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called every time ...
    // ... useEffect is re-called. useEffect will only be re-called
    // if value changes (see the inputs array below).
    // This is how we prevent debouncedValue from updating if value is ...
    // ... changed within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}
