import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import { GeminiProvider } from '../../../src/providers/GeminiProvider';
import { RateLimitDetectedError } from '../../../src/core/rate-limit-monitor';

// Mock dependencies
vi.mock('fs/promises', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs/promises')>();
  return {
    ...actual,
    readFile: vi.fn()
  };
});

vi.mock('../../../src/core/provider-rate-limiter', () => ({
  ProviderRateLimiter: vi.fn().mockImplementation(() => ({
    isProviderRateLimited: vi.fn(),
    getRateLimitStatus: vi.fn(),
    markProviderRateLimited: vi.fn(),
    getBestGeminiModel: vi.fn()
  }))
}));

vi.mock('../../../src/core/rate-limit-monitor', () => ({
  RateLimitMonitor: vi.fn().mockImplementation(() => ({
    executeGeminiWithFallback: vi.fn()
  })),
  RateLimitDetectedError: class extends Error {
    constructor(provider: string, originalError: string) {
      super(`Rate limit detected for ${provider}: ${originalError}`);
      this.name = 'RateLimitDetectedError';
    }
  }
}));

vi.mock('../../../src/utils/logger', () => ({
  Logger: {
    info: vi.fn(),
    error: vi.fn(),
    warning: vi.fn()
  }
}));

const mockFs = vi.mocked(fs);

describe('Enhanced GeminiProvider', () => {
  let provider: GeminiProvider;
  let mockRateLimiter: any;
  let mockMonitor: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    provider = new GeminiProvider();
    
    // Access the mocked instances
    mockRateLimiter = (provider as any).rateLimiter;
    mockMonitor = (provider as any).monitor;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('checkAvailability', () => {
    it('should check Gemini CLI availability', async () => {
      // Mock the spawnProcess method
      vi.spyOn(provider as any, 'spawnProcess')
        .mockResolvedValue({ code: 0 });

      const result = await provider.checkAvailability();

      expect(result).toBe(true);
    });

    it('should return false if Gemini CLI is not available', async () => {
      vi.spyOn(provider as any, 'spawnProcess')
        .mockResolvedValue({ code: 1 });

      const result = await provider.checkAvailability();

      expect(result).toBe(false);
    });

    it('should return false if spawn process throws error', async () => {
      vi.spyOn(provider as any, 'spawnProcess')
        .mockRejectedValue(new Error('Command not found'));

      const result = await provider.checkAvailability();

      expect(result).toBe(false);
    });
  });

  describe('execute', () => {
    const mockIssueFile = '/path/to/issue/1-test-issue.md';
    const mockPlanFile = '/path/to/plan/1-test-plan.md';
    
    beforeEach(() => {
      mockFs.readFile.mockImplementation((path: string) => {
        if (path.includes('issue')) {
          return 'Test issue content';
        }
        if (path.includes('plan')) {
          return 'Test plan content';
        }
        return 'Context file content';
      });
    });

    it('should fail fast if provider is rate limited', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(true);
      mockRateLimiter.getRateLimitStatus.mockResolvedValue({
        timeRemaining: 1800000 // 30 minutes
      });

      const result = await provider.execute(mockIssueFile, mockPlanFile);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Gemini is rate limited. Try again in 30 minutes.');
      expect(mockMonitor.executeGeminiWithFallback).not.toHaveBeenCalled();
    });

    it('should execute successfully when not rate limited', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 0,
        stdout: 'Task completed successfully\nModified: src/test.ts',
        stderr: ''
      });

      const result = await provider.execute(mockIssueFile, mockPlanFile);

      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
      expect(result.issueNumber).toBe(1);
      expect(result.filesChanged).toEqual(['src/test.ts']);
      expect(mockMonitor.executeGeminiWithFallback).toHaveBeenCalledWith(
        ['--all_files', '--yolo'],
        expect.objectContaining({
          stdinContent: expect.stringContaining('Test issue content'),
          enableStreaming: true
        })
      );
    });

    it('should include context files in the prompt', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 0,
        stdout: 'Success',
        stderr: ''
      });

      const contextFiles = ['/path/to/context.ts'];
      await provider.execute(mockIssueFile, mockPlanFile, contextFiles);

      const call = mockMonitor.executeGeminiWithFallback.mock.calls[0];
      const options = call[1];
      
      expect(options.stdinContent).toContain('Additional Context Files');
      expect(options.stdinContent).toContain('context.ts');
      expect(options.stdinContent).toContain('Context file content');
    });

    it('should handle context files that cannot be read', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 0,
        stdout: 'Success',
        stderr: ''
      });

      mockFs.readFile.mockImplementation((path: string) => {
        if (path.includes('context')) {
          throw new Error('File not found');
        }
        return path.includes('issue') ? 'Test issue content' : 'Test plan content';
      });

      const contextFiles = ['/path/to/missing-context.ts'];
      const result = await provider.execute(mockIssueFile, mockPlanFile, contextFiles);

      expect(result.success).toBe(true);
      // Should not include the missing context file content
      const call = mockMonitor.executeGeminiWithFallback.mock.calls[0];
      expect(call[1].stdinContent).not.toContain('missing-context.ts');
    });

    it('should handle RateLimitDetectedError', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockRejectedValue(
        new RateLimitDetectedError('gemini', 'quota exceeded')
      );

      const result = await provider.execute(mockIssueFile, mockPlanFile);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Rate limit detected');
      expect(result.provider).toBe('gemini');
    });

    it('should handle execution failure', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 1,
        stdout: '',
        stderr: 'Execution failed'
      });

      const result = await provider.execute(mockIssueFile, mockPlanFile);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Gemini execution failed with code 1');
    });

    it('should pass abort signal to monitor', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 0,
        stdout: 'Success',
        stderr: ''
      });

      const abortController = new AbortController();
      await provider.execute(mockIssueFile, mockPlanFile, [], abortController.signal);

      const call = mockMonitor.executeGeminiWithFallback.mock.calls[0];
      expect(call[1].signal).toBe(abortController.signal);
    });
  });

  describe('chat', () => {
    it('should fail fast if provider is rate limited', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(true);
      mockRateLimiter.getRateLimitStatus.mockResolvedValue({
        timeRemaining: 3600000 // 1 hour
      });

      await expect(provider.chat('test prompt')).rejects.toThrow(
        'Gemini is rate limited. Try again in 60 minutes.'
      );
    });

    it('should execute chat successfully when not rate limited', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 0,
        stdout: 'This is the response',
        stderr: ''
      });

      const result = await provider.chat('test prompt');

      expect(result).toBe('This is the response');
      expect(mockMonitor.executeGeminiWithFallback).toHaveBeenCalledWith(
        ['test prompt'],
        expect.objectContaining({
          enableStreaming: false
        })
      );
    });

    it('should include system prompt when provided', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 0,
        stdout: 'Response',
        stderr: ''
      });

      await provider.chat('user prompt', { systemPrompt: 'You are a helpful assistant' });

      const call = mockMonitor.executeGeminiWithFallback.mock.calls[0];
      const args = call[0];
      
      expect(args[0]).toContain('You are a helpful assistant');
      expect(args[0]).toContain('user prompt');
    });

    it('should handle RateLimitDetectedError in chat', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockRejectedValue(
        new RateLimitDetectedError('gemini', 'quota exceeded')
      );

      await expect(provider.chat('test')).rejects.toThrow(
        'Gemini rate limit detected'
      );
    });

    it('should handle execution failure in chat', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 1,
        stdout: '',
        stderr: 'Chat failed'
      });

      await expect(provider.chat('test')).rejects.toThrow(
        'Gemini exited with code 1'
      );
    });

    it('should handle empty response', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 0,
        stdout: '   \n  ',
        stderr: ''
      });

      await expect(provider.chat('test')).rejects.toThrow(
        'No response text received from Gemini'
      );
    });

    it('should pass abort signal in chat options', async () => {
      mockRateLimiter.isProviderRateLimited.mockResolvedValue(false);
      mockMonitor.executeGeminiWithFallback.mockResolvedValue({
        exitCode: 0,
        stdout: 'Response',
        stderr: ''
      });

      const abortController = new AbortController();
      await provider.chat('test', { signal: abortController.signal });

      const call = mockMonitor.executeGeminiWithFallback.mock.calls[0];
      expect(call[1].signal).toBe(abortController.signal);
    });
  });

  describe('extractIssueNumber', () => {
    it('should extract issue number from file path', () => {
      const extractIssueNumber = (provider as any).extractIssueNumber.bind(provider);
      
      expect(extractIssueNumber('/path/to/1-test-issue.md')).toBe(1);
      expect(extractIssueNumber('/path/to/42-another-issue.md')).toBe(42);
      expect(extractIssueNumber('/path/to/invalid-file.md')).toBe(0);
    });
  });

  describe('determineSuccess', () => {
    it('should determine success based on exit code and output', () => {
      const determineSuccess = (provider as any).determineSuccess.bind(provider);
      
      expect(determineSuccess('success output', '', 0)).toBe(true);
      expect(determineSuccess('output', '', 1)).toBe(false);
      expect(determineSuccess('error: failed', '', 0)).toBe(false);
      expect(determineSuccess('failed: operation', '', 0)).toBe(false);
      expect(determineSuccess('exception: occurred', '', 0)).toBe(false);
      expect(determineSuccess('traceback: error', '', 0)).toBe(false);
    });
  });

  describe('extractFilesChanged', () => {
    it('should extract changed files from output', () => {
      const extractFilesChanged = (provider as any).extractFilesChanged.bind(provider);
      
      const output = `
        Modified: src/test.ts
        Created: src/new-file.js
        Updated: package.json
        Wrote to: dist/output.txt
      `;
      
      const files = extractFilesChanged(output);
      expect(files).toEqual(['src/test.ts', 'src/new-file.js', 'package.json', 'dist/output.txt']);
    });

    it('should handle duplicate file paths', () => {
      const extractFilesChanged = (provider as any).extractFilesChanged.bind(provider);
      
      const output = `
        Modified: src/test.ts
        Updated: src/test.ts
      `;
      
      const files = extractFilesChanged(output);
      expect(files).toEqual(['src/test.ts']);
    });
  });
});