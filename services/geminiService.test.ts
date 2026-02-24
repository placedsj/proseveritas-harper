
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Set API key before import to bypass the early return
process.env.API_KEY = 'test-key';

const { generateContentMock } = vi.hoisted(() => {
  return { generateContentMock: vi.fn() };
});

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      constructor() {}
      models = {
        generateContent: generateContentMock
      };
    }
  };
});

import { getCoFounderResponse, getRealityCheck } from './geminiService';

describe('geminiService Security', () => {
  beforeEach(() => {
    generateContentMock.mockReset();
    generateContentMock.mockResolvedValue({ text: 'Mock response' });
  });

  it('should sanitize user input in getCoFounderResponse (Security Fix)', async () => {
    const maliciousInput = 'Input with "quotes" and \\backslashes\\';
    const context = 'Context with "quotes"';

    // Expected sanitized versions
    // " -> \"  and \ -> \\
    const expectedInput = 'Input with \\"quotes\\" and \\\\backslashes\\\\';
    const expectedContext = 'Context with \\"quotes\\"';

    await getCoFounderResponse(maliciousInput, context);

    expect(generateContentMock).toHaveBeenCalled();
    const callArgs = generateContentMock.mock.calls[0][0];
    const prompt = callArgs.contents;

    // Assert that the prompt contains the SANITIZED input
    expect(prompt).toContain(expectedInput);
    expect(prompt).toContain(expectedContext);

    // Also verify that the context is wrapped in quotes in the prompt
    expect(prompt).toContain(`**Context:** "${expectedContext}"`);
  });

  it('should sanitize thought input in getRealityCheck (Security Fix)', async () => {
    const maliciousInput = 'Thought with "quotes"';
    const expectedInput = 'Thought with \\"quotes\\"';

    await getRealityCheck(maliciousInput);

    expect(generateContentMock).toHaveBeenCalled();
    const callArgs = generateContentMock.mock.calls[0][0];
    const prompt = callArgs.contents;

    expect(prompt).toContain(expectedInput);
    expect(prompt).toContain(`User: "${expectedInput}"`);
  });
});
