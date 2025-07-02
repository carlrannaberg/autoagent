import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GeminiProvider } from '@/providers/GeminiProvider';
import { spawn } from 'child_process';
import { EventEmitter } from 'events';
import * as fs from 'fs/promises';
import * as path from 'path';

vi.mock('child_process');
vi.mock('fs/promises');
vi.mock('path');

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

  beforeEach(() => {
    vi.clearAllMocks();
    provider = new GeminiProvider();
    mockProcess = new MockChildProcess();
    mockSpawn = vi.mocked(spawn);
    mockSpawn.mockReturnValue(mockProcess as unknown as ReturnType<typeof spawn>);
    
    // Verify spawn was called with correct stdio configuration for stdin piping
    mockSpawn.mockImplementation((command, args, options) => {
      // Verify it's the correct command
      if (command === 'gemini' && options && 'stdio' in options) {
        expect(options.stdio).toEqual(['pipe', 'pipe', 'pipe']);
        expect(args).toContain('--all_files');
        expect(args).toContain('--yolo');
      }
      return mockProcess as unknown as ReturnType<typeof spawn>;
    });
    
    // Mock fs.readFile
    vi.mocked(fs.readFile).mockResolvedValue('File content');
    
    // Mock path.basename
    vi.mocked(path.basename).mockReturnValue('filename.txt');
  });

  describe('checkAvailability', () => {
    it('should return true when gemini is available', async () => {
      // Set silent mode to avoid console output
      process.env.AUTOAGENT_SILENT = 'true';
      const availabilityPromise = provider.checkAvailability();

      // Simulate successful output (matches actual gemini --version output)
      mockProcess.stdout.emit('data', '0.1.7');
      mockProcess.emit('close', 0);

      const result = await availabilityPromise;
      expect(result).toBe(true);
      expect(mockSpawn).toHaveBeenCalledWith('gemini', ['--version']);
    });

    it('should return false when gemini is not available', async () => {
      const availabilityPromise = provider.checkAvailability();

      mockProcess.stderr.emit('data', 'command not found');
      mockProcess.emit('close', 1);

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
      
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        ['option1'],
        abortController.signal
      );

      // Need to wait for fs reads to complete
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate gemini output
      mockProcess.stdout.emit('data', 'Processing task...\n');
      mockProcess.stdout.emit('data', 'Modified: src/file.ts\n');
      mockProcess.stdout.emit('data', 'Task completed successfully\n');
      mockProcess.emit('close', 0);

      const result = await executePromise;

      expect(result).toEqual({
        success: true,
        output: 'Processing task...\nModified: src/file.ts\nTask completed successfully\n',
        provider: 'gemini',
        issueNumber: 0,
        duration: expect.any(Number),
        error: undefined,
        filesChanged: ['src/file.ts']
      });

      // Gemini uses stdin for prompt and --all_files --yolo flags
      expect(mockSpawn).toHaveBeenCalled();
      const callArgs = mockSpawn.mock.calls[0];
      expect(callArgs).toBeDefined();
      expect(callArgs![0]).toBe('gemini');
      const commandArgs = callArgs![1] as string[];
      expect(commandArgs).toContain('--all_files');
      expect(commandArgs).toContain('--yolo');
      
      // Check that content was written to stdin
      expect(mockProcess.stdin.write).toHaveBeenCalled();
      const stdinContent = (mockProcess.stdin.write as jest.Mock).mock.calls[0][0];
      expect(stdinContent).toContain('Issue content');
      expect(stdinContent).toContain('Plan content');
    });

    it('should handle execution errors', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
        
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      // Need to wait for fs reads to complete
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.stderr.emit('data', 'Error: Rate limit exceeded');
      mockProcess.emit('close', 1);

      const result = await executePromise;
      expect(result.success).toBe(false);
      expect(result.error).toContain('Rate limit exceeded');
    });

    it('should collect stderr output', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
        
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      // Need to wait for fs reads to complete
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.stderr.emit('data', 'Warning: Low quota\n');
      mockProcess.stderr.emit('data', 'Error: Failed to process\n');
      mockProcess.emit('close', 1);

      const result = await executePromise;
      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to process');
    });

    it('should handle signal abort', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
        
      const abortController = new AbortController();
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        abortController.signal
      );

      // Need to wait for fs reads to complete
      await new Promise(resolve => setImmediate(resolve));
      
      // Abort the execution
      abortController.abort();
      mockProcess.emit('close', 1);

      const result = await executePromise;
      expect(result.success).toBe(false);
      expect(result.error).toContain('aborted');
    });

    it('should detect errors in output', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
        
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      // Need to wait for fs reads to complete
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate output with error
      mockProcess.stdout.emit('data', 'Starting task...\n');
      mockProcess.stdout.emit('data', 'Error: Failed to process file\n');
      mockProcess.emit('close', 0);

      const result = await executePromise;

      expect(result.success).toBe(false);
      expect(result.output).toContain('Error: Failed to process');
    });

    it('should handle spawn errors during execution', async () => {
      mockSpawn.mockImplementation(() => {
        throw new Error('spawn failed');
      });

      const result = await provider.execute('issue.md', 'plan.md', [], undefined);
      expect(result.success).toBe(false);
      expect(result.error).toContain('spawn failed');
    });

    it('should handle empty output', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content');
        
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      // Need to wait for fs reads to complete
      await new Promise(resolve => setImmediate(resolve));
      
      // No output, just close with success
      mockProcess.emit('close', 0);

      const result = await executePromise;

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