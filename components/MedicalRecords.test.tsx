import { render, screen, fireEvent } from '@testing-library/react';
import { MedicalRecords } from './MedicalRecords';
import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';

describe('MedicalRecords', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('triggers download when button is clicked', () => {
    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    global.URL.revokeObjectURL = vi.fn();

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click');
    const appendSpy = vi.spyOn(document.body, 'appendChild');
    const removeSpy = vi.spyOn(document.body, 'removeChild');

    render(<MedicalRecords />);

    // Find the download button for the first record
    const downloadButtons = screen.getAllByText(/Download Text/i);
    expect(downloadButtons.length).toBeGreaterThan(0);

    fireEvent.click(downloadButtons[0]);

    expect(global.URL.createObjectURL).toHaveBeenCalled();

    // Find the call that appended an anchor
    const anchorCall = appendSpy.mock.calls.find(call => (call[0] as HTMLElement).tagName === 'A');
    expect(anchorCall).toBeDefined();

    const appendedElement = anchorCall![0] as HTMLAnchorElement;
    expect(appendedElement.download).toContain('.txt');
    expect(appendedElement.href).toContain('mock-url');

    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith(appendedElement);
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });
});
