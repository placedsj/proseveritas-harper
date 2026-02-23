import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StorageService } from './storageService';

describe('StorageService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should return default value when key is not found', () => {
    const result = StorageService.getItem('nonExistentKey', 'default');
    expect(result).toBe('default');
  });

  it('should return stored value when key exists', () => {
    const data = { id: 1, name: 'Test' };
    localStorage.setItem('testKey', JSON.stringify(data));
    const result = StorageService.getItem('testKey', {});
    expect(result).toEqual(data);
  });

  it('should handle JSON parse errors gracefully', () => {
    localStorage.setItem('invalidJson', '{invalid');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = StorageService.getItem('invalidJson', 'fallback');
    expect(result).toBe('fallback');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should set item in localStorage', () => {
    const data = { id: 123 };
    StorageService.setItem('newKey', data);
    expect(localStorage.getItem('newKey')).toBe(JSON.stringify(data));
  });

  it('should get system audit logs correctly', () => {
    const logs = [{ id: '1', action: 'Test Audit' }];
    localStorage.setItem('systemAuditLogs', JSON.stringify(logs));
    const result = StorageService.getSystemAuditLogs();
    expect(result).toEqual(logs);
  });
});
