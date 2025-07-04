import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createProvider, getFirstAvailableProvider } from '@/providers';
import { ClaudeProvider } from '@/providers/ClaudeProvider';
import { GeminiProvider } from '@/providers/GeminiProvider';
import { Provider } from '@/providers/Provider';
import { ProviderName } from '@/types';

vi.mock('@/providers/ClaudeProvider');
vi.mock('@/providers/GeminiProvider');

describe('Provider factory functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    let mockClaudeProvider: Provider;
    let mockGeminiProvider: Provider;

    beforeEach(() => {
      mockClaudeProvider = {
        name: 'claude',
        checkAvailability: vi.fn(),
        execute: vi.fn()
      } as unknown as Provider;

      mockGeminiProvider = {
        name: 'gemini',
        checkAvailability: vi.fn(),
        execute: vi.fn()
      } as unknown as Provider;

      vi.mocked(ClaudeProvider).mockImplementation(() => mockClaudeProvider);
      vi.mocked(GeminiProvider).mockImplementation(() => mockGeminiProvider);
    });

    it('should return first available provider', async () => {
      vi.mocked(mockClaudeProvider.checkAvailability).mockResolvedValue(true);
      vi.mocked(mockGeminiProvider.checkAvailability).mockResolvedValue(true);

      const provider = await getFirstAvailableProvider(['claude', 'gemini']);
      
      expect(provider).toBe(mockClaudeProvider);
      expect(mockClaudeProvider.checkAvailability).toHaveBeenCalled();
      expect(mockGeminiProvider.checkAvailability).not.toHaveBeenCalled();
    });

    it('should skip unavailable providers', async () => {
      vi.mocked(mockClaudeProvider.checkAvailability).mockResolvedValue(false);
      vi.mocked(mockGeminiProvider.checkAvailability).mockResolvedValue(true);

      const provider = await getFirstAvailableProvider(['claude', 'gemini']);
      
      expect(provider).toBe(mockGeminiProvider);
      expect(mockClaudeProvider.checkAvailability).toHaveBeenCalled();
      expect(mockGeminiProvider.checkAvailability).toHaveBeenCalled();
    });

    it('should return null if no providers available', async () => {
      vi.mocked(mockClaudeProvider.checkAvailability).mockResolvedValue(false);
      vi.mocked(mockGeminiProvider.checkAvailability).mockResolvedValue(false);

      const provider = await getFirstAvailableProvider(['claude', 'gemini']);
      
      expect(provider).toBeNull();
    });

    it('should handle empty provider list', async () => {
      const provider = await getFirstAvailableProvider([]);
      expect(provider).toBeNull();
    });

    it('should handle provider creation errors', async () => {
      vi.mocked(ClaudeProvider).mockImplementation(() => {
        throw new Error('Failed to create provider');
      });

      const provider = await getFirstAvailableProvider(['claude']);
      expect(provider).toBeNull();
    });

    it('should handle checkAvailability errors', async () => {
      vi.mocked(mockClaudeProvider.checkAvailability).mockRejectedValue(new Error('Check failed'));
      vi.mocked(mockGeminiProvider.checkAvailability).mockResolvedValue(true);

      const provider = await getFirstAvailableProvider(['claude', 'gemini']);
      
      expect(provider).toBe(mockGeminiProvider);
    });

    it('should use default providers when none specified', async () => {
      vi.mocked(mockClaudeProvider.checkAvailability).mockResolvedValue(true);

      const provider = await getFirstAvailableProvider();
      
      expect(provider).toBe(mockClaudeProvider);
      expect(ClaudeProvider).toHaveBeenCalled();
    });
  });
});