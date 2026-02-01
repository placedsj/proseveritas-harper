import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We mock before import
const mockGenerateContent = vi.fn();
const mockGoogleGenAI = vi.fn();

class MockGoogleGenAIClass {
  constructor(args: any) {
    mockGoogleGenAI(args);
  }
  models = {
    generateContent: mockGenerateContent,
  };
}

vi.mock('@google/genai', () => ({
  GoogleGenAI: MockGoogleGenAIClass,
}));

describe('geminiService', () => {
  let geminiService: typeof import('./geminiService');
  const originalEnv = process.env;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('getCoFounderResponse should return connection message if API key is missing', async () => {
    delete process.env.API_KEY;
    geminiService = await import('./geminiService');

    const response = await geminiService.getCoFounderResponse('Hello', 'Context');
    expect(response).toBe('MOTION: Connect your API key to activate Co-Founder mode.');
    expect(mockGoogleGenAI).not.toHaveBeenCalled();
  });

  it('getCoFounderResponse should call API and return text', async () => {
    process.env.API_KEY = 'test-key';
    mockGenerateContent.mockResolvedValue({ text: 'MOTION: Response' });
    geminiService = await import('./geminiService');

    const response = await geminiService.getCoFounderResponse('Hello', 'Context');
    expect(response).toBe('MOTION: Response');
    expect(mockGoogleGenAI).toHaveBeenCalledWith({ apiKey: 'test-key' });
    expect(mockGenerateContent).toHaveBeenCalled();
  });

  it('getCoFounderResponse should handle API errors', async () => {
    process.env.API_KEY = 'test-key';
    mockGenerateContent.mockRejectedValue(new Error('API Error'));
    geminiService = await import('./geminiService');

    const response = await geminiService.getCoFounderResponse('Hello', 'Context');
    expect(response).toBe('CALM: API connection issue. Focus on the manual tasks for now.');
  });

  it('getRealityCheck should return missing key message', async () => {
    delete process.env.API_KEY;
    geminiService = await import('./geminiService');

    const response = await geminiService.getRealityCheck('Bad thought');
    expect(response).toBe('API Key missing. Cannot analyze.');
  });

  it('getRealityCheck should return analysis', async () => {
    process.env.API_KEY = 'test-key';
    mockGenerateContent.mockResolvedValue({ text: 'Stop.' });
    geminiService = await import('./geminiService');

    const response = await geminiService.getRealityCheck('Bad thought');
    expect(response).toBe('Stop.');
  });
});
