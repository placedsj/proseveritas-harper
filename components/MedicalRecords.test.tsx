import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MedicalRecords } from './MedicalRecords';

// Mock localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock URL.createObjectURL and URL.revokeObjectURL
const createObjectURLMock = vi.fn();
const revokeObjectURLMock = vi.fn();
Object.defineProperty(window.URL, 'createObjectURL', { value: createObjectURLMock });
Object.defineProperty(window.URL, 'revokeObjectURL', { value: revokeObjectURLMock });

describe('MedicalRecords', () => {
  beforeEach(() => {
    window.localStorage.clear();
    createObjectURLMock.mockReset();
    revokeObjectURLMock.mockReset();
    createObjectURLMock.mockReturnValue('blob:mock-url');
  });

  afterEach(() => {
      vi.restoreAllMocks();
  });

  it('downloads the record text securely when the download button is clicked', async () => {
    // Setup a mock record in localStorage
    const mockRecord = {
      id: '1',
      title: 'Test Record with <InvalidChars>',
      source: 'Test Source',
      dateOfRecord: '2025-01-01',
      ocrText: 'Confidential Patient Data',
      status: 'reviewed',
      dateAdded: '2025-01-01',
      pageCount: 1
    };
    window.localStorage.setItem('medicalRecords', JSON.stringify([mockRecord]));

    render(<MedicalRecords />);

    // Find the download button
    const downloadButton = screen.getByText(/Download Text/i);
    fireEvent.click(downloadButton);

    // Verify Blob creation and URL generation
    await waitFor(() => {
      expect(createObjectURLMock).toHaveBeenCalled();
    });

    // Inspect the Blob passed to createObjectURL
    const blob = createObjectURLMock.mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
  });

  it('sanitizes the filename during download', async () => {
      const originalCreateElement = document.createElement.bind(document);
      const realAnchor = originalCreateElement('a');
      const clickSpy = vi.spyOn(realAnchor, 'click');
      const setAttributeSpy = vi.spyOn(realAnchor, 'setAttribute');

      const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName: string, options?: ElementCreationOptions) => {
          if (tagName === 'a') {
              return realAnchor;
          }
          return originalCreateElement(tagName, options);
      });

      const mockRecord = {
          id: '1',
          title: 'Test/Record: With "Quotes" & <Tags>',
          source: 'Test Source',
          dateOfRecord: '2025-01-01',
          ocrText: 'Data',
          status: 'reviewed',
          dateAdded: '2025-01-01',
          pageCount: 1
      };
      window.localStorage.setItem('medicalRecords', JSON.stringify([mockRecord]));

      render(<MedicalRecords />);

      const downloadButton = screen.getByText(/Download Text/i);
      fireEvent.click(downloadButton);

      // Since we assign to .download property, setAttribute might NOT be called directly by the code (link.download = ...).
      // However, link.download property assignment often reflects in attribute.
      // But in jsdom, we should check the property on the element.

      await waitFor(() => {
          expect(realAnchor.download).toBe('Test_Record_With_Quotes_Tags_.txt');
      });

      expect(clickSpy).toHaveBeenCalled();
  });
});
