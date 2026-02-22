import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import DataInitializer from './DataInitializer';
import { INITIAL_SCOTT_LOGS, INITIAL_EVIDENCE, INITIAL_MEDICAL_RECORDS, INITIAL_SYSTEM_AUDIT_LOGS } from './initialData';

describe('DataInitializer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should populate localStorage with initial data if empty', () => {
    render(<DataInitializer />);

    expect(JSON.parse(localStorage.getItem('scottLogs') || '[]')).toEqual(INITIAL_SCOTT_LOGS);
    expect(JSON.parse(localStorage.getItem('evidence') || '[]')).toEqual(INITIAL_EVIDENCE);
    expect(JSON.parse(localStorage.getItem('medicalRecords') || '[]')).toEqual(INITIAL_MEDICAL_RECORDS);
    expect(JSON.parse(localStorage.getItem('systemAuditLogs') || '[]')).toEqual(INITIAL_SYSTEM_AUDIT_LOGS);
  });

  it('should not overwrite existing data in localStorage', () => {
    const existingLogs = [{ id: 'existing', category: 'Test' }];
    localStorage.setItem('scottLogs', JSON.stringify(existingLogs));

    render(<DataInitializer />);

    expect(JSON.parse(localStorage.getItem('scottLogs') || '[]')).toEqual(existingLogs);
    // Others should still be populated
    expect(JSON.parse(localStorage.getItem('evidence') || '[]')).toEqual(INITIAL_EVIDENCE);
  });
});
