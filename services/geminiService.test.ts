
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCoFounderResponse, getRealityCheck } from './geminiService';

// Mock the GoogleGenAI library
const { mockGenerateContent } = vi.hoisted(() => {
  return {
    mockGenerateContent: vi.fn(),
  }
});

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      constructor() {}
      models = {
        generateContent: mockGenerateContent.mockResolvedValue({ text: 'Mock Response' }),
      };
    },
  };
});

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCoFounderResponse', () => {
    it('calls generateContent with the user message and context', async () => {
      const userMessage = 'Hello "World"';
      const context = 'Context with "quotes"';

      await getCoFounderResponse(userMessage, context);

      expect(mockGenerateContent).toHaveBeenCalled();
      const callArgs = mockGenerateContent.mock.calls[0][0];

      // Sanitization Check: Expect JSON stringified values
      // JSON.stringify('Context with "quotes"') -> '"Context with \"quotes\""'
      expect(callArgs.contents).toContain(`**Context:** ${JSON.stringify(context)}`);
      expect(callArgs.contents).toContain(`**User:** ${JSON.stringify(userMessage)}`);
    });
  });

  describe('getRealityCheck', () => {
    it('calls generateContent with the thought', async () => {
      const thought = 'My thought "with quotes"';

      await getRealityCheck(thought);

      expect(mockGenerateContent).toHaveBeenCalled();
      const callArgs = mockGenerateContent.mock.calls[0][0];

      // Sanitization Check
      expect(callArgs.contents).toContain(`User: ${JSON.stringify(thought)}`);
    });
  });
});
