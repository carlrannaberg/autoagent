import { ProviderLearning } from '../../src/core/provider-learning';
import { FileManager } from '../../src/utils/file-manager';
import { ExecutionResult } from '../../src/types';

// Mock FileManager
jest.mock('../../src/utils/file-manager');

describe('ProviderLearning', () => {
  let providerLearning: ProviderLearning;
  let mockFileManager: jest.Mocked<FileManager>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFileManager = new FileManager() as jest.Mocked<FileManager>;
    providerLearning = new ProviderLearning(mockFileManager);
  });

  describe('updateProviderLearnings', () => {
    it('should update provider instructions with execution results', async () => {
      // Mock existing provider file content
      const existingContent = `# Claude Instructions

This file contains project-specific instructions for Claude.

## Project Context
Test project

## Coding Standards
TypeScript strict mode`;

      mockFileManager.readProviderInstructions.mockResolvedValue(existingContent);
      mockFileManager.updateProviderInstructions.mockResolvedValue(undefined);

      const executionResult: ExecutionResult = {
        success: true,
        issueNumber: 1,
        duration: 45000,
        provider: 'claude',
        issueTitle: 'Test Issue',
        filesModified: ['src/test.ts', 'src/test.spec.ts']
      };

      await providerLearning.updateProviderLearnings(executionResult);

      // Verify file was read
      expect(mockFileManager.readProviderInstructions).toHaveBeenCalledWith('CLAUDE');

      // Verify file was updated
      expect(mockFileManager.updateProviderInstructions).toHaveBeenCalledWith(
        'CLAUDE',
        expect.any(String)
      );

      // Check the updated content includes execution history
      const updatedContent = mockFileManager.updateProviderInstructions.mock.calls[0]?.[1];
      expect(updatedContent).toContain('## Execution History');
      expect(updatedContent).toContain('Successfully completed Issue #1: Test Issue');
      expect(updatedContent).toContain('## Performance Metrics');
      expect(updatedContent).toContain('## Learning Insights');
    });

    it('should handle failed executions', async () => {
      mockFileManager.readProviderInstructions.mockResolvedValue('# Gemini Instructions');
      mockFileManager.updateProviderInstructions.mockResolvedValue(undefined);

      const executionResult: ExecutionResult = {
        success: false,
        issueNumber: 2,
        duration: 10000,
        provider: 'gemini',
        error: 'Rate limit exceeded'
      };

      await providerLearning.updateProviderLearnings(executionResult);

      const updatedContent = mockFileManager.updateProviderInstructions.mock.calls[0]?.[1];
      expect(updatedContent).toContain('Failed Issue #2');
    });

    it('should calculate metrics correctly over multiple executions', async () => {
      let currentContent = '# Claude Instructions';
      
      // Mock to simulate persistent file updates
      mockFileManager.readProviderInstructions.mockImplementation(async () => currentContent);
      mockFileManager.updateProviderInstructions.mockImplementation(async (_provider, content) => {
        currentContent = content;
      });

      // First execution
      await providerLearning.updateProviderLearnings({
        success: true,
        issueNumber: 1,
        duration: 30000,
        provider: 'claude'
      });

      // Second execution
      await providerLearning.updateProviderLearnings({
        success: true,
        issueNumber: 2,
        duration: 40000,
        provider: 'claude'
      });

      // Third execution (failure)
      await providerLearning.updateProviderLearnings({
        success: false,
        issueNumber: 3,
        duration: 20000,
        provider: 'claude'
      });

      expect(currentContent).toContain('Total Executions**: 3');
      expect(currentContent).toContain('Success Rate**: 66.7%');
      expect(currentContent).toContain('2 successful, 1 failed');
    });

    it('should ignore executions without provider', async () => {
      const executionResult: ExecutionResult = {
        success: true,
        issueNumber: 1,
        duration: 1000
        // No provider specified
      };

      await providerLearning.updateProviderLearnings(executionResult);

      expect(mockFileManager.readProviderInstructions).not.toHaveBeenCalled();
      expect(mockFileManager.updateProviderInstructions).not.toHaveBeenCalled();
    });

    it('should detect patterns after multiple executions', async () => {
      let currentContent = '# Claude Instructions';
      
      // Mock to simulate persistent file updates
      mockFileManager.readProviderInstructions.mockImplementation(async () => currentContent);
      mockFileManager.updateProviderInstructions.mockImplementation(async (_provider, content) => {
        currentContent = content;
      });

      // Simulate multiple successful executions
      for (let i = 1; i <= 10; i++) {
        await providerLearning.updateProviderLearnings({
          success: true,
          issueNumber: i,
          duration: 25000 + (i * 1000),
          provider: 'claude',
          filesModified: [`src/file${i}.ts`, `test/file${i}.spec.ts`]
        });
      }

      expect(currentContent).toContain('## Detected Patterns');
      expect(currentContent).toContain('High Confidence Patterns');
      expect(currentContent).toContain('Consistently successful execution pattern');
    });
  });

  describe('clearCache', () => {
    it('should clear cache for specific provider', async () => {
      // Populate cache
      mockFileManager.readProviderInstructions.mockResolvedValue('# Claude Instructions');
      mockFileManager.updateProviderInstructions.mockResolvedValue(undefined);

      await providerLearning.updateProviderLearnings({
        success: true,
        issueNumber: 1,
        duration: 1000,
        provider: 'claude'
      });

      // Clear cache
      providerLearning.clearCache('claude');

      // Next update should re-read metrics
      await providerLearning.updateProviderLearnings({
        success: true,
        issueNumber: 2,
        duration: 2000,
        provider: 'claude'
      });

      // Should have read the file twice (once for each update after cache clear)
      expect(mockFileManager.readProviderInstructions).toHaveBeenCalledTimes(2);
    });

    it('should clear all caches when no provider specified', () => {
      providerLearning.clearCache();
      // Method should complete without error
      expect(true).toBe(true);
    });
  });
});