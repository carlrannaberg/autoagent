import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { MockProvider } from '@/providers/MockProvider';

describe('MockProvider', () => {
  let provider: MockProvider;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    vi.clearAllMocks();
    provider = new MockProvider();
    // Save original environment
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('checkAvailability', () => {
    it('should return true when mock provider is enabled', async () => {
      process.env.AUTOAGENT_MOCK_PROVIDER = 'true';
      const result = await provider.checkAvailability();
      expect(result).toBe(true);
    });

    it('should return false when mock provider is not enabled', async () => {
      delete process.env.AUTOAGENT_MOCK_PROVIDER;
      const result = await provider.checkAvailability();
      expect(result).toBe(false);
    });

    it('should return false when mock provider is explicitly disabled', async () => {
      process.env.AUTOAGENT_MOCK_PROVIDER = 'false';
      const result = await provider.checkAvailability();
      expect(result).toBe(false);
    });
  });

  describe('execute', () => {
    it('should return success message for normal execution', async () => {
      const result = await provider.execute(
        'Test task prompt',
        '/test/workspace',
        ['/additional/dir'],
        undefined
      );

      expect(result).toBe('Mock execution completed successfully for task: Test task prompt...');
    });

    it('should throw error when AUTOAGENT_MOCK_FAIL is set', async () => {
      process.env.AUTOAGENT_MOCK_FAIL = 'true';
      
      await expect(provider.execute(
        'Test task',
        '/test/workspace',
        [],
        undefined
      )).rejects.toThrow('Mock execution failed');
    });

    it('should throw timeout error when AUTOAGENT_MOCK_TIMEOUT is set', async () => {
      process.env.AUTOAGENT_MOCK_TIMEOUT = 'true';
      
      await expect(provider.execute(
        'Test task',
        '/test/workspace',
        [],
        undefined
      )).rejects.toThrow('Mock timeout');
    }, 2000);

    it('should throw rate limit error when AUTOAGENT_MOCK_RATE_LIMIT is set', async () => {
      process.env.AUTOAGENT_MOCK_RATE_LIMIT = 'true';
      
      await expect(provider.execute(
        'Test task',
        '/test/workspace',
        [],
        undefined
      )).rejects.toThrow('Rate limit exceeded');
    });

    it('should throw authentication error when AUTOAGENT_MOCK_AUTH_FAIL is set', async () => {
      process.env.AUTOAGENT_MOCK_AUTH_FAIL = 'true';
      
      await expect(provider.execute(
        'Test task',
        '/test/workspace',
        [],
        undefined
      )).rejects.toThrow('Authentication failed');
    });

    it('should handle long prompts gracefully', async () => {
      const longPrompt = 'A'.repeat(100);
      const result = await provider.execute(
        longPrompt,
        '/test/workspace',
        [],
        undefined
      );

      expect(result).toBe(`Mock execution completed successfully for task: ${'A'.repeat(50)}...`);
    });

    it('should handle abort signal', async () => {
      const abortController = new AbortController();
      const executePromise = provider.execute(
        'Test task',
        '/test/workspace',
        [],
        abortController.signal
      );

      // The mock provider doesn't actually check the abort signal,
      // but we can verify it completes normally
      const result = await executePromise;
      expect(result).toBe('Mock execution completed successfully for task: Test task...');
    });
  });

  describe('chat', () => {
    it('should return mock response for chat prompt', async () => {
      const result = await provider.chat('Hello, how are you?');
      expect(result).toBe('Mock response to: Hello, how are you?');
    });

    it('should handle chat options', async () => {
      const result = await provider.chat('Test prompt', {
        maxTokens: 100,
        temperature: 0.7
      });
      expect(result).toBe('Mock response to: Test prompt');
    });
  });

  describe('name property', () => {
    it('should return correct provider name', () => {
      expect(provider.name).toBe('mock');
    });
  });
});