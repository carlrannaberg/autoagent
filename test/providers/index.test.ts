import { createProvider, getFirstAvailableProvider } from '../../src/providers';
import { ClaudeProvider } from '../../src/providers/ClaudeProvider';
import { GeminiProvider } from '../../src/providers/GeminiProvider';
import { Provider } from '../../src/providers/Provider';
import { ProviderName } from '../../src/types';

jest.mock('../../src/providers/ClaudeProvider');
jest.mock('../../src/providers/GeminiProvider');

describe('Provider factory functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProvider', () => {
    it('should create a ClaudeProvider', () => {
      const provider = createProvider('claude');
      expect(provider).toBeInstanceOf(ClaudeProvider);
    });

    it('should create a GeminiProvider', () => {
      const provider = createProvider('gemini');
      expect(provider).toBeInstanceOf(GeminiProvider);
    });

    it('should throw error for unknown provider', () => {
      expect(() => createProvider('unknown' as unknown as ProviderName))
        .toThrow('Invalid provider type: unknown');
    });
  });

  describe('getFirstAvailableProvider', () => {
    let mockClaudeProvider: jest.Mocked<Provider>;
    let mockGeminiProvider: jest.Mocked<Provider>;

    beforeEach(() => {
      mockClaudeProvider = {
        name: 'claude',
        checkAvailability: jest.fn(),
        execute: jest.fn()
      } as unknown as jest.Mocked<Provider>;

      mockGeminiProvider = {
        name: 'gemini',
        checkAvailability: jest.fn(),
        execute: jest.fn()
      } as unknown as jest.Mocked<Provider>;

      (ClaudeProvider as jest.Mock).mockImplementation(() => mockClaudeProvider);
      (GeminiProvider as jest.Mock).mockImplementation(() => mockGeminiProvider);
    });

    it('should return first available provider', async () => {
      mockClaudeProvider.checkAvailability.mockResolvedValue(true);
      mockGeminiProvider.checkAvailability.mockResolvedValue(true);

      const provider = await getFirstAvailableProvider(['claude', 'gemini']);
      
      expect(provider).toBe(mockClaudeProvider);
      expect(mockClaudeProvider.checkAvailability).toHaveBeenCalled();
      expect(mockGeminiProvider.checkAvailability).not.toHaveBeenCalled();
    });

    it('should skip unavailable providers', async () => {
      mockClaudeProvider.checkAvailability.mockResolvedValue(false);
      mockGeminiProvider.checkAvailability.mockResolvedValue(true);

      const provider = await getFirstAvailableProvider(['claude', 'gemini']);
      
      expect(provider).toBe(mockGeminiProvider);
      expect(mockClaudeProvider.checkAvailability).toHaveBeenCalled();
      expect(mockGeminiProvider.checkAvailability).toHaveBeenCalled();
    });

    it('should return null if no providers available', async () => {
      mockClaudeProvider.checkAvailability.mockResolvedValue(false);
      mockGeminiProvider.checkAvailability.mockResolvedValue(false);

      const provider = await getFirstAvailableProvider(['claude', 'gemini']);
      
      expect(provider).toBeNull();
    });

    it('should handle empty provider list', async () => {
      const provider = await getFirstAvailableProvider([]);
      expect(provider).toBeNull();
    });

    it('should handle provider creation errors', async () => {
      (ClaudeProvider as jest.Mock).mockImplementation(() => {
        throw new Error('Failed to create provider');
      });

      const provider = await getFirstAvailableProvider(['claude']);
      expect(provider).toBeNull();
    });

    it('should handle checkAvailability errors', async () => {
      mockClaudeProvider.checkAvailability.mockRejectedValue(new Error('Check failed'));
      mockGeminiProvider.checkAvailability.mockResolvedValue(true);

      const provider = await getFirstAvailableProvider(['claude', 'gemini']);
      
      expect(provider).toBe(mockGeminiProvider);
    });

    it('should use default providers when none specified', async () => {
      mockClaudeProvider.checkAvailability.mockResolvedValue(true);

      const provider = await getFirstAvailableProvider();
      
      expect(provider).toBe(mockClaudeProvider);
      expect(ClaudeProvider).toHaveBeenCalled();
    });
  });
});