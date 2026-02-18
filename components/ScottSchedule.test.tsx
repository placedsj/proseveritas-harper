import { describe, it, expect } from 'vitest';
import { safeCSVField } from './ScottSchedule';

describe('safeCSVField', () => {
  it('should escape normal text', () => {
    expect(safeCSVField('Hello World')).toBe('"Hello World"');
  });

  it('should escape text with double quotes', () => {
    expect(safeCSVField('Hello "World"')).toBe('"Hello ""World"""');
  });

  it('should sanitize CSV Formula Injection for "="', () => {
    expect(safeCSVField('=1+1')).toBe('"\'' + '=1+1"');
  });

  it('should sanitize CSV Formula Injection for "+"', () => {
    expect(safeCSVField('+1+1')).toBe('"\'' + '+1+1"');
  });

  it('should sanitize CSV Formula Injection for "-"', () => {
    expect(safeCSVField('-1+1')).toBe('"\'' + '-1+1"');
  });

  it('should sanitize CSV Formula Injection for "@"', () => {
    expect(safeCSVField('@SUM(1,1)')).toBe('"\'' + '@SUM(1,1)"');
  });

  it('should handle empty string', () => {
    expect(safeCSVField('')).toBe('""');
  });

  it('should handle complex mix of injection and quotes', () => {
    expect(safeCSVField('=cmd|"/C calc"')).toBe('"\'' + '=cmd|""/C calc"""');
  });
});
