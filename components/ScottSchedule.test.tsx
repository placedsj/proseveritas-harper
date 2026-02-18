
import { describe, it, expect } from 'vitest';
import { safeCSVField } from './ScottSchedule';

describe('safeCSVField', () => {
  it('should return empty string for null/undefined/empty input', () => {
    // @ts-ignore
    expect(safeCSVField(null)).toBe('');
    // @ts-ignore
    expect(safeCSVField(undefined)).toBe('');
    expect(safeCSVField('')).toBe('');
  });

  it('should return normal strings unchanged', () => {
    expect(safeCSVField('Hello World')).toBe('Hello World');
    expect(safeCSVField('12345')).toBe('12345');
    expect(safeCSVField('Normal Text')).toBe('Normal Text');
  });

  it('should escape strings starting with =', () => {
    expect(safeCSVField('=1+1')).toBe("'=1+1");
    expect(safeCSVField('=cmd|')).toBe("'=cmd|");
  });

  it('should escape strings starting with +', () => {
    expect(safeCSVField('+1+1')).toBe("'+1+1");
  });

  it('should escape strings starting with -', () => {
    expect(safeCSVField('-1+1')).toBe("'-1+1");
  });

  it('should escape strings starting with @', () => {
    expect(safeCSVField('@import')).toBe("'@import");
  });

  it('should NOT escape strings containing symbols but not starting with them', () => {
    expect(safeCSVField('a=b')).toBe('a=b');
    expect(safeCSVField('email@example.com')).toBe('email@example.com');
  });
});
