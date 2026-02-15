
import { describe, it, expect } from 'vitest';
import { escapeCSV } from './security';

describe('escapeCSV', () => {
  it('should quote normal strings', () => {
    expect(escapeCSV('Hello World')).toBe('"Hello World"');
  });

  it('should escape double quotes', () => {
    expect(escapeCSV('He said "Hello"')).toBe('"He said ""Hello"""');
  });

  it('should handle numbers', () => {
    expect(escapeCSV(123)).toBe('"123"');
  });

  it('should handle null/undefined', () => {
    expect(escapeCSV(null)).toBe('""');
    expect(escapeCSV(undefined)).toBe('""');
  });

  it('should escape malicious formulas starting with =', () => {
    expect(escapeCSV('=cmd|')).toBe("\"'=cmd|\"");
  });

  it('should escape malicious formulas starting with +', () => {
    expect(escapeCSV('+SUM(1,1)')).toBe("\"'+SUM(1,1)\"");
  });

  it('should escape malicious formulas starting with -', () => {
    expect(escapeCSV('-SUM(1,1)')).toBe("\"'-SUM(1,1)\"");
  });

  it('should escape malicious formulas starting with @', () => {
    expect(escapeCSV('@SUM(1,1)')).toBe("\"'@SUM(1,1)\"");
  });

  it('should escape double quotes even in malicious formulas', () => {
    expect(escapeCSV('=cmd| /C calc"')).toBe("\"'=cmd| /C calc\"\"\"");
  });
});
