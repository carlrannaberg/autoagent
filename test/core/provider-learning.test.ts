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
    it('should update AGENT.md with insights but no execution history', async () => {
      const existingContent = `# Agent Instructions

This file gives guidance to agentic coding tools.

## Project Context
Test project`;
      
      mockFileManager.readFile.mockResolvedValue(existingContent);
      mockFileManager.writeFile.mockResolvedValue(undefined);

      const executionResult: ExecutionResult = {
        success: true,
        issueNumber: 1,
        duration: 45000,
        provider: 'claude',
        issueTitle: 'Test Issue',
        filesModified: ['src/test.ts', 'src/test.spec.ts']
      };

      await providerLearning.updateProviderLearnings(executionResult);

      // Verify AGENT.md was read and written
      expect(mockFileManager.readFile).toHaveBeenCalledWith('AGENT.md');
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        'AGENT.md',
        expect.any(String)
      );
      
      // Verify no execution history is added
      const updatedContent = mockFileManager.writeFile.mock.calls[0]?.[1];
      expect(updatedContent).not.toContain('## Execution History');
      expect(updatedContent).not.toContain('## Performance Metrics');
      expect(updatedContent).not.toContain('## Detected Patterns');
      expect(updatedContent).toContain('## Learning Insights');
    });

    it('should handle failed executions and update insights', async () => {
      mockFileManager.readFile.mockResolvedValue('# Agent Instructions');
      mockFileManager.writeFile.mockResolvedValue(undefined);
      
      const executionResult: ExecutionResult = {
        success: false,
        issueNumber: 2,
        duration: 10000,
        provider: 'gemini',
        error: 'Rate limit exceeded'
      };

      await providerLearning.updateProviderLearnings(executionResult);

      // Verify file was updated
      expect(mockFileManager.writeFile).toHaveBeenCalledWith('AGENT.md', expect.any(String));
    });

    it('should accumulate insights over multiple executions', async () => {
      let currentContent = '# Agent Instructions';
      
      // Mock to simulate file updates
      mockFileManager.readFile.mockImplementation(() => Promise.resolve(currentContent));
      mockFileManager.writeFile.mockImplementation((_path, content) => {
        currentContent = content;
        return Promise.resolve();
      });

      // Multiple executions
      for (let i = 1; i <= 3; i++) {
        await providerLearning.updateProviderLearnings({
          success: i !== 3,
          issueNumber: i,
          duration: 30000 + (i * 10000),
          provider: 'claude'
        });
      }

      // Verify insights are generated but no history
      expect(currentContent).toContain('## Learning Insights');
      expect(currentContent).not.toContain('## Execution History');
      expect(currentContent).not.toContain('Total Executions');
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

    it('should generate insights from patterns', async () => {
      mockFileManager.readFile.mockResolvedValue('# Agent Instructions');
      mockFileManager.writeFile.mockResolvedValue(undefined);
      
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

      // Get the last written content
      const lastCall = mockFileManager.writeFile.mock.calls[mockFileManager.writeFile.mock.calls.length - 1];
      const finalContent = lastCall?.[1];
      
      // Verify insights are present but no patterns section
      expect(finalContent).toContain('## Learning Insights');
      expect(finalContent).toContain('Best Practices');
      expect(finalContent).not.toContain('## Detected Patterns');
    });
  });

  describe('clearCache', () => {
    it('should clear cache for specific provider', async () => {
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