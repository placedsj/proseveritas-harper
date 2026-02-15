
import { render, screen, fireEvent } from '@testing-library/react';
import ScottSchedule from './ScottSchedule';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ScottSchedule', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  it('escapes formulas in CSV export', () => {
    // Setup malicious data
    const maliciousLogs = [{
      id: 'test-1',
      incidentDate: '2025-01-01T00:00:00',
      category: 'Test',
      theSay: '=cmd|calc',
      theFact: '@import',
      childImpact: 'N/A',
      exhibitRef: '+attack',
      statuteTag: '-minus'
    }];

    localStorageMock.setItem('scottLogs', JSON.stringify(maliciousLogs));

    // Create a real anchor element to spy on
    // We use the real document implementation so checking instanceof HTMLAnchorElement works if needed
    // But we need to create it *before* the component calls createElement

    // We can't easily create a 'real' anchor that is also returned by spy
    // without using the original createElement.

    // NOTE: We must capture the original createElement BEFORE spying
    const originalCreateElement = document.createElement.bind(document);

    const mockAnchor = originalCreateElement('a');
    const setAttributeSpy = vi.spyOn(mockAnchor, 'setAttribute');
    const clickSpy = vi.spyOn(mockAnchor, 'click');

    // Spy on createElement to return our pre-made anchor
    vi.spyOn(document, 'createElement').mockImplementation((tagName, options) => {
      if (tagName === 'a') {
        return mockAnchor;
      }
      return originalCreateElement(tagName, options);
    });

    // No need to mock appendChild/removeChild because mockAnchor is a real Node

    render(<ScottSchedule />);

    // Click Export
    const exportBtn = screen.getByText(/Export CSV/i);
    fireEvent.click(exportBtn);

    // Check content
    expect(setAttributeSpy).toHaveBeenCalled();
    const calls = setAttributeSpy.mock.calls;
    const hrefCall = calls.find((call) => call[0] === 'href');
    expect(hrefCall).toBeDefined();

    if (hrefCall) {
        const href = hrefCall[1];
        const csvContent = decodeURI(href);

        // Assert escaping - checking specifically for single quote prepending
        expect(csvContent).toContain("'=cmd|calc");
        expect(csvContent).toContain("'@import");
        expect(csvContent).toContain("'+attack");
        expect(csvContent).toContain("'-minus");
    }
  });
});
