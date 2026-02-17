import { safeCSV } from './ScottSchedule';
import { describe, it, expect } from 'vitest';

describe('safeCSV', () => {
  it('escapes strings starting with =', () => {
    expect(safeCSV('=1+1')).toBe("'=1+1");
  });
  it('escapes strings starting with +', () => {
    expect(safeCSV('+1+1')).toBe("'+1+1");
  });
  it('escapes strings starting with -', () => {
    expect(safeCSV('-1+1')).toBe("'-1+1");
  });
  it('escapes strings starting with @', () => {
    expect(safeCSV('@1+1')).toBe("'@1+1");
  });
  it('does not escape safe strings', () => {
    expect(safeCSV('Safe String')).toBe("Safe String");
  });
  it('handles empty strings', () => {
    expect(safeCSV('')).toBe("");
  });
});
