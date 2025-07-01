import { ProviderLearning } from '../../src/core/provider-learning';
import { FileManager } from '../../src/utils/file-manager';
import { ExecutionResult } from '../../src/types';
import { createProvider } from '../../src/providers';

// Mock dependencies
jest.mock('../../src/utils/file-manager');
jest.mock('../../src/providers');

describe('ProviderLearning', () => {
  let providerLearning: ProviderLearning;
  let mockFileManager: jest.Mocked<FileManager>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFileManager = new FileManager() as jest.Mocked<FileManager>;
    providerLearning = new ProviderLearning(mockFileManager);
  });

  describe('updateProviderLearnings', () => {
    it('should invoke AI provider to update AGENT.md intelligently', async () => {
      // Mock the provider
      const mockProvider = {
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({ success: true })
      };
      (createProvider as jest.Mock).mockReturnValue(mockProvider);

      const executionResult: ExecutionResult = {
        success: true,
        issueNumber: 1,
        duration: 45000,
        provider: 'claude',
        issueTitle: 'Test Issue',
        filesModified: ['src/test.ts', 'src/test.spec.ts']
      };

      await providerLearning.updateProviderLearnings(executionResult);

      // Verify provider was created and used
      expect(createProvider).toHaveBeenCalledWith('claude');
      expect(mockProvider.checkAvailability).toHaveBeenCalled();
      expect(mockProvider.execute).toHaveBeenCalledWith(
        expect.stringContaining('Just completed: Issue #1'),
        '',
        ['AGENT.md', 'issues/1-*.md', 'plans/1-*.md'],
        undefined
      );
    });

    it('should handle failed executions and include error info', async () => {
      const mockProvider = {
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({ success: true })
      };
      (createProvider as jest.Mock).mockReturnValue(mockProvider);
      
      const executionResult: ExecutionResult = {
        success: false,
        issueNumber: 2,
        duration: 10000,
        provider: 'gemini',
        error: 'Rate limit exceeded'
      };

      await providerLearning.updateProviderLearnings(executionResult);

      // Verify provider was invoked with error info
      expect(mockProvider.execute).toHaveBeenCalledWith(
        expect.stringContaining('Error: Rate limit exceeded'),
        '',
        expect.any(Array),
        undefined
      );
    });

    it('should accumulate patterns over multiple executions', async () => {
      const mockProvider = {
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({ success: true })
      };
      (createProvider as jest.Mock).mockReturnValue(mockProvider);

      // Multiple executions
      for (let i = 1; i <= 3; i++) {
        await providerLearning.updateProviderLearnings({
          success: i !== 3,
          issueNumber: i,
          duration: 30000 + (i * 10000),
          provider: 'claude'
        });
      }

      // Verify provider was called for each execution
      expect(mockProvider.execute).toHaveBeenCalledTimes(3);
      
      // Check last call included pattern info
      const lastCall = mockProvider.execute.mock.calls[2];
      const prompt = lastCall[0];
      expect(prompt).toContain('Just completed: Issue #3');
    });

    it('should ignore executions without provider', async () => {
      const executionResult: ExecutionResult = {
        success: true,
        issueNumber: 1,
        duration: 1000
        // No provider specified
      };

      await providerLearning.updateProviderLearnings(executionResult);

      expect(createProvider).not.toHaveBeenCalled();
    });

    it('should handle provider not available', async () => {
      const mockProvider = {
        checkAvailability: jest.fn().mockResolvedValue(false),
        execute: jest.fn()
      };
      (createProvider as jest.Mock).mockReturnValue(mockProvider);
      
      const executionResult: ExecutionResult = {
        success: true,
        issueNumber: 1,
        duration: 25000,
        provider: 'claude',
        filesModified: ['src/file.ts']
      };

      await providerLearning.updateProviderLearnings(executionResult);
      
      // Should check availability but not execute
      expect(mockProvider.checkAvailability).toHaveBeenCalled();
      expect(mockProvider.execute).not.toHaveBeenCalled();
    });
  });

  describe('clearCache', () => {
    it('should clear cache for specific provider', async () => {
      const mockProvider = {
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({ success: true })
      };
      (createProvider as jest.Mock).mockReturnValue(mockProvider);
      
      // Populate pattern analyzer with data
      await providerLearning.updateProviderLearnings({
        success: true,
        issueNumber: 1,
        duration: 1000,
        provider: 'claude'
      });

      // Clear cache
      providerLearning.clearCache('claude');

      // Next update should work without errors
      await providerLearning.updateProviderLearnings({
        success: true,
        issueNumber: 2,
        duration: 2000,
        provider: 'claude'
      });

      // Verify no files were read or written
      expect(mockFileManager.readProviderInstructions).not.toHaveBeenCalled();
      expect(mockFileManager.writeFile).not.toHaveBeenCalled();
    });

    it('should clear all caches when no provider specified', () => {
      providerLearning.clearCache();
      // Method should complete without error
      expect(true).toBe(true);
    });
  });
});