import { useState, useEffect } from 'react';

/**
 * A hook that delays updating a value until a specified delay has passed.
 * Useful for delaying expensive operations like API calls or complex filtering
 * until the user has stopped typing.
 *
 * @param value The value to debounce
 * @param delay The delay in milliseconds (default: 300ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout if the value changes or the component unmounts
    // This cancels the previous update if a new value comes in before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
