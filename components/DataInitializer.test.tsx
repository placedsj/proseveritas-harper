import { render, waitFor } from '@testing-library/react';
import { DataInitializer } from './DataInitializer';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';

describe('DataInitializer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes localStorage with default data if empty', async () => {
    render(
      <DataInitializer>
        <div>Content</div>
      </DataInitializer>
    );

    await waitFor(() => {
      expect(localStorage.getItem('scottLogs')).toBeTruthy();
      expect(localStorage.getItem('evidence')).toBeTruthy();
      expect(localStorage.getItem('medicalRecords')).toBeTruthy();
      expect(localStorage.getItem('systemAuditLogs')).toBeTruthy();
      expect(localStorage.getItem('timelineEvents_v2')).toBeTruthy();
      expect(localStorage.getItem('courtEvents')).toBeTruthy();
    });
  });

  it('does not overwrite existing data in localStorage', async () => {
    const existingLogs = JSON.stringify([{ id: 'test' }]);
    localStorage.setItem('scottLogs', existingLogs);

    render(
      <DataInitializer>
        <div>Content</div>
      </DataInitializer>
    );

    await waitFor(() => {
      expect(localStorage.getItem('scottLogs')).toBe(existingLogs);
    });
  });
});
