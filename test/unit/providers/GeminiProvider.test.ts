import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GeminiProvider } from '@/providers/GeminiProvider';
import { spawn } from 'child_process';
import { EventEmitter } from 'events';
import * as fs from 'fs/promises';
import * as path from 'path';
import { RateLimitMonitor, RateLimitDetectedError } from '@/core/rate-limit-monitor';

vi.mock('child_process');
vi.mock('fs/promises');
vi.mock('path');
vi.mock('@/core/rate-limit-monitor');

class MockChildProcess extends EventEmitter {
  stdout = new EventEmitter();
  stderr = new EventEmitter();
  stdin = {
    write: vi.fn(),
    end: vi.fn()
  };
  kill = vi.fn();
}

describe('GeminiProvider', () => {
  let provider: GeminiProvider;
  let mockSpawn: ReturnType<typeof vi.fn>;
  let mockProcess: MockChildProcess;
  let mockRateLimitMonitor: RateLimitMonitor;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create mocks
    mockProcess = new MockChildProcess();
    mockSpawn = vi.mocked(spawn);
    mockSpawn.mockReturnValue(mockProcess as unknown as ReturnType<typeof spawn>);
    
    // Mock RateLimitMonitor constructor and methods
    mockRateLimitMonitor = {
      executeGeminiWithFallback: vi.fn(),
      executeClaudeWithMonitoring: vi.fn(),
      spawnWithMonitoring: vi.fn()
    } as any;
    
    vi.mocked(RateLimitMonitor).mockImplementation(() => mockRateLimitMonitor);
    
    // Create provider instance after mocks are set up
    provider = new GeminiProvider();
    
    // Mock fs.readFile
    vi.mocked(fs.readFile).mockResolvedValue('File content');
    
    // Mock path.basename
    vi.mocked(path.basename).mockReturnValue('filename.txt');
  });

  describe('checkAvailability', () => {
    it('should return true when gemini is available', async () => {
      // Set silent mode to avoid console output
      process.env.AUTOAGENT_SILENT = 'true';
      
      // For checkAvailability, the provider uses direct spawn (not RateLimitMonitor)
      const availabilityPromise = provider.checkAvailability();

      // Simulate successful output (matches actual gemini --version output)
      process.nextTick(() => {
        mockProcess.stdout.emit('data', '0.1.7');
        mockProcess.emit('close', 0);
      });

      const result = await availabilityPromise;
      expect(result).toBe(true);
      expect(mockSpawn).toHaveBeenCalledWith('gemini', ['--version']);
    });

    it('should return false when gemini is not available', async () => {
      const availabilityPromise = provider.checkAvailability();

      process.nextTick(() => {
        mockProcess.stderr.emit('data', 'command not found');
        mockProcess.emit('close', 1);
      });

      const result = await availabilityPromise;
      expect(result).toBe(false);
    });

    it('should handle spawn errors', async () => {
      mockSpawn.mockImplementation(() => {
        throw new Error('spawn failed');
      });

      const result = await provider.checkAvailability();
      expect(result).toBe(false);
    });
  });

  describe('execute', () => {
    it('should execute successfully', async () => {
      const abortController = new AbortController();
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content')
        .mockResolvedValueOnce('Context file content');
      
      // Mock the RateLimitMonitor response
      vi.mocked(mockRateLimitMonitor.executeGeminiWithFallback).mockResolvedValue({
        stdout: 'Processing task...\nModified: src/file.ts\nTask completed successfully\n',
        stderr: '',
        exitCode: 0,
        rateLimitDetected: false,
        terminatedEarly: false
      });
      
      const result = await provider.execute(
        'issue.md',
        'plan.md',
        ['option1'],
        abortController.signal
      );

      expect(result).toEqual({
        success: true,
        output: 'Processing task...\nModified: src/file.ts\nTask completed successfully\n',
        provider: 'gemini',
        issueNumber: 0,
        duration: expect.any(Number),
        error: undefined,
        filesChanged: ['src/file.ts']
      });

      // Verify RateLimitMonitor was called with correct args
      expect(mockRateLimitMonitor.executeGeminiWithFallback).toHaveBeenCalledWith(
        ['--all_files', '--yolo'],
        {
          signal: abortController.signal,
          stdinContent: expect.stringContaining('Issue content'),
          enableStreaming: true
        }
      );
    });

    it('should handle execution errors', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
      
      // Mock a rate limit error
      vi.mocked(mockRateLimitMonitor.executeGeminiWithFallback).mockRejectedValue(
        new RateLimitDetectedError('gemini', 'All Gemini models are rate limited. Consider using Claude instead.')
      );
        
      const result = await provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Rate limit detected');
    });

    it('should collect stderr output', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
      
      // Mock execution failure with stderr
      vi.mocked(mockRateLimitMonitor.executeGeminiWithFallback).mockResolvedValue({
        stdout: '',
        stderr: 'Warning: Low quota\nError: Failed to process\n',
        exitCode: 1,
        rateLimitDetected: false,
        terminatedEarly: false
      });
        
      const result = await provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to process');
    });

    it('should handle signal abort', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
        
      const abortController = new AbortController();
      
      // Mock abort error
      vi.mocked(mockRateLimitMonitor.executeGeminiWithFallback).mockRejectedValue(
        new Error('Process aborted by user')
      );
      
      const result = await provider.execute(
        'issue.md',
        'plan.md',
        [],
        abortController.signal
      );
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('aborted');
    });

    it('should detect errors in output', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
      
      // Mock output with error indicators
      vi.mocked(mockRateLimitMonitor.executeGeminiWithFallback).mockResolvedValue({
        stdout: 'Starting task...\nError: Failed to process file\n',
        stderr: '',
        exitCode: 0,
        rateLimitDetected: false,
        terminatedEarly: false
      });
        
      const result = await provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      expect(result.success).toBe(false);
      expect(result.output).toContain('Error: Failed to process');
    });

    it('should handle spawn errors during execution', async () => {
      // Mock file read errors
      vi.mocked(fs.readFile).mockRejectedValue(new Error('File read failed'));

      const result = await provider.execute('issue.md', 'plan.md', [], undefined);
      expect(result.success).toBe(false);
      expect(result.error).toContain('File read failed');
    });

    it('should handle empty output', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
      
      // Mock empty output
      vi.mocked(mockRateLimitMonitor.executeGeminiWithFallback).mockResolvedValue({
        stdout: '',
        stderr: '',
        exitCode: 0,
        rateLimitDetected: false,
        terminatedEarly: false
      });
        
      const result = await provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      expect(result.success).toBe(true);
      expect(result.output).toBe('');
    });
  });

  describe('name property', () => {
    it('should return correct provider name', () => {
      expect(provider.name).toBe('gemini');
    });
  });
});