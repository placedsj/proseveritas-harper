import { describe, it, expect } from 'vitest';
import { calculateHours } from './CustodyMath';

describe('CustodyMath', () => {
  describe('calculateHours', () => {
    it('should calculate hours correctly for same day', () => {
      const start = '2023-10-27T10:00';
      const end = '2023-10-27T14:30';
      expect(calculateHours(start, end)).toBe(4.5);
    });

    it('should calculate hours correctly for overnight', () => {
      const start = '2023-10-27T22:00';
      const end = '2023-10-28T02:00';
      expect(calculateHours(start, end)).toBe(4.0);
    });

    it('should return negative for invalid range', () => {
        const start = '2023-10-27T10:00';
        const end = '2023-10-27T09:00';
        expect(calculateHours(start, end)).toBeLessThan(0);
    });
  });
});
