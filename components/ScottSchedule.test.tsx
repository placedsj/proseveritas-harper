
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScottSchedule from './ScottSchedule';
import { ScottLogEntry } from '../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('ScottSchedule Security Tests', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  it('sanitizes CSV injection characters in export', async () => {
    const maliciousLogs: ScottLogEntry[] = [
      {
        id: 'bad-1',
        incidentDate: '2025-01-01T12:00:00',
        category: 'Alienation',
        theSay: '=cmd|\'/C calc\'!A0', // Malicious payload
        theFact: '+SUM(1+1)', // Another malicious payload
        childImpact: 'N/A',
        exhibitRef: '@echo off', // And another
        statuteTag: '-1'
      }
    ];

    localStorage.setItem('scottLogs', JSON.stringify(maliciousLogs));

    // Spy on appendChild to capture the link element
    const appendSpy = vi.spyOn(document.body, 'appendChild');

    // Mock click to prevent navigation error in jsdom
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    render(<ScottSchedule />);

    // Find the Export CSV button
    const exportButton = screen.getByText(/Export CSV/i);
    fireEvent.click(exportButton);

    // Find the anchor element appended to body
    // We look for the argument passed to appendChild which is an HTMLAnchorElement
    const call = appendSpy.mock.calls.find(args => (args[0] as HTMLElement).tagName === 'A');
    const anchor = call ? call[0] as HTMLAnchorElement : null;

    expect(anchor).toBeTruthy();

    if (anchor) {
        const href = anchor.getAttribute('href') || '';
        // decodeURI because the content is data:text/csv;charset=utf-8,... and encodedURI is used
        // However, the content part is what matters.
        const decodedCsv = decodeURI(href);

        // Check for CSV Injection sanitation
        // We assert the FIXED behavior (escaped with single quote)

        expect(decodedCsv).toContain(`"'=cmd|'/C calc'!A0"`);
        expect(decodedCsv).toContain(`"'+SUM(1+1)"`);
        expect(decodedCsv).toContain(`"'@echo off"`);
        expect(decodedCsv).toContain(`"'-1"`);
    }
  });
});
