
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScottSchedule from './ScottSchedule';
import React from 'react';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  FileText: () => <span data-testid="icon-filetext" />,
  Save: () => <span data-testid="icon-save" />,
  Download: () => <span data-testid="icon-download" />,
  AlertTriangle: () => <span data-testid="icon-alert" />,
  Scale: () => <span data-testid="icon-scale" />,
  Plus: () => <span data-testid="icon-plus" />,
  Info: () => <span data-testid="icon-info" />,
  ShieldCheck: () => <span data-testid="icon-shield" />,
  X: () => <span data-testid="icon-x" />,
  Camera: () => <span data-testid="icon-camera" />,
}));

describe('ScottSchedule', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should export sanitized CSV when Export CSV is clicked', () => {
    const originalCreateElement = document.createElement.bind(document);
    const originalAppendChild = document.body.appendChild.bind(document.body);
    const originalRemoveChild = document.body.removeChild.bind(document.body);

    const createElementSpy = vi.spyOn(document, 'createElement');

    const anchorMock = {
      setAttribute: vi.fn(),
      click: vi.fn(),
      href: '',
      download: '',
    } as unknown as HTMLAnchorElement;

    createElementSpy.mockImplementation((tagName: string, options?: ElementCreationOptions) => {
      if (tagName === 'a') {
        return anchorMock;
      }
      return originalCreateElement(tagName, options);
    });

    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node) => {
      if (node === anchorMock) return anchorMock;
      return originalAppendChild(node);
    });

    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((node) => {
      if (node === anchorMock) return anchorMock;
      return originalRemoveChild(node);
    });

    render(<ScottSchedule />);

    const exportButton = screen.getByText(/Export CSV/i);
    fireEvent.click(exportButton);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(anchorMock);

    const setAttributeCalls = (anchorMock.setAttribute as any).mock.calls;
    const hrefCall = setAttributeCalls.find((call: any[]) => call[0] === 'href');

    expect(hrefCall).toBeDefined();
    const hrefValue = hrefCall[1];
    expect(hrefValue).toContain('data:text/csv;charset=utf-8,');
  });

  it('should sanitize dangerous characters in CSV export', () => {
    const originalCreateElement = document.createElement.bind(document);
    const originalAppendChild = document.body.appendChild.bind(document.body);
    const originalRemoveChild = document.body.removeChild.bind(document.body);

    const createElementSpy = vi.spyOn(document, 'createElement');

    const anchorMock = {
      setAttribute: vi.fn(),
      click: vi.fn(),
    } as unknown as HTMLAnchorElement;

    createElementSpy.mockImplementation((tagName: string, options?: ElementCreationOptions) => {
      if (tagName === 'a') {
        return anchorMock;
      }
      return originalCreateElement(tagName, options);
    });

    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => {
      if (node === anchorMock) return anchorMock;
      return originalAppendChild(node);
    });

    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => {
      if (node === anchorMock) return anchorMock;
      return originalRemoveChild(node);
    });

    render(<ScottSchedule />);

    // 1. Open "Log Incident" form
    const logButton = screen.getByText(/Log Incident/i);
    fireEvent.click(logButton);

    // 2. Fill in "The Fact" with malicious content
    const factInput = screen.getByPlaceholderText(/Ex: 'Arrived at 4:00 PM/i);

    fireEvent.change(factInput, { target: { value: '=cmd| /C calc' } });

    // 3. Save
    const saveButton = screen.getByText(/COMMIT TO RECORD/i);
    fireEvent.click(saveButton);

    // 4. Export
    const exportButton = screen.getByText(/Export CSV/i);
    fireEvent.click(exportButton);

    // 5. Verify
    const setAttributeCalls = (anchorMock.setAttribute as any).mock.calls;
    const hrefCall = setAttributeCalls.find((call: any[]) => call[0] === 'href');
    const csvContent = decodeURI(hrefCall[1]);

    expect(csvContent).toContain('"\'=cmd| /C calc"');
  });
});
