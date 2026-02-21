
import { render, screen, fireEvent } from '@testing-library/react';
import ScottSchedule from './ScottSchedule';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

describe('ScottSchedule Security', () => {
  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    localStorageMock.clear();
    originalCreateElement = document.createElement.bind(document);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('prevents CSV Formula Injection by sanitizing fields starting with =', async () => {
    let capturedAnchor: HTMLAnchorElement | null = null;

    // Spy on document.createElement
    const createElementSpy = vi.spyOn(document, 'createElement');

    createElementSpy.mockImplementation((tagName: string, options?: ElementCreationOptions) => {
        const element = originalCreateElement(tagName, options);
        if (tagName === 'a') {
            capturedAnchor = element as HTMLAnchorElement;
            // Spy on click to prevent actual navigation/download and verify call
            vi.spyOn(capturedAnchor, 'click').mockImplementation(() => {});
            // Spy on setAttribute to verify calls
            vi.spyOn(capturedAnchor, 'setAttribute');
        }
        return element;
    });

    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url');

    render(<ScottSchedule />);

    // 1. Click "Log Incident"
    const logButton = screen.getByText(/Log Incident/i);
    fireEvent.click(logButton);

    // 2. Fill in malicious payload
    const maliciousPayload = "=cmd|' /C calc'!A0";

    const sayInput = screen.getByPlaceholderText(/Ex: 'Craig was aggressive/i);
    fireEvent.change(sayInput, { target: { value: maliciousPayload } });

    const factInput = screen.getByPlaceholderText(/Ex: 'Arrived at 4:00 PM/i);
    fireEvent.change(factInput, { target: { value: "Nothing happened" } });

    // 3. Commit
    fireEvent.click(screen.getByText(/COMMIT TO RECORD/i));

    // 4. Export
    fireEvent.click(screen.getByText(/Export CSV/i));

    // 5. Verify
    expect(capturedAnchor).not.toBeNull();
    expect(capturedAnchor!.setAttribute).toHaveBeenCalledWith('href', expect.stringContaining('data:text/csv'));

    // Get the actual href value set on the element
    // Note: getAttribute might return the set value or the resolved URL.
    // Since we spied on setAttribute, we can check the call args.
    const hrefCall = (capturedAnchor!.setAttribute as any).mock.calls.find((call: any[]) => call[0] === 'href');
    const href = hrefCall ? hrefCall[1] : '';
    const csvContent = decodeURI(href);

    // ASSERTION: Should fail initially (vulnerability present)
    expect(csvContent).toContain(`"'${maliciousPayload}"`);
  });
});
