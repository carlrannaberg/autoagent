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
    
    // Create mocks
    mockProcess = new MockChildProcess();
    mockSpawn = vi.mocked(spawn);
    mockSpawn.mockReturnValue(mockProcess as unknown as ReturnType<typeof spawn>);
    
    // Create provider instance after mocks are set up
    provider = new GeminiProvider();
  });

  describe('checkAvailability', () => {
    it('should return true when gemini is available', async () => {
      // Set silent mode to avoid console output
      process.env.AUTOAGENT_SILENT = 'true';
      
      // For checkAvailability, the provider uses direct spawn (not RateLimitMonitor)
      const availabilityPromise = provider.checkAvailability();

      // Simulate successful output (matches actual gemini --version output)
      process.nextTick(() => {
        mockProcess.stdout.emit('data', 'gemini version 0.1.7');
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
      // No file reads needed since execute gets prompt directly
      
      const executePromise = provider.execute(
        'Issue content\nPlan content\nContext file content',
        '/test/workspace',
        [],
        abortController.signal
      );
      
      // Wait for spawn to be called
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate successful output
      mockProcess.stdout.emit('data', 'Processing task...\nModified: src/file.ts\nTask completed successfully\n');
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      expect(result).toBe('Processing task...\nModified: src/file.ts\nTask completed successfully\n');

      // Verify spawn was called with correct args
      expect(mockSpawn).toHaveBeenCalledWith(
        'gemini',
        ['Issue content\nPlan content\nContext file content', '--sandbox'],
        expect.objectContaining({
          cwd: '/test/workspace',
          env: expect.any(Object)
        })
      );
    });

    it('should handle execution errors', async () => {
      // No file reads needed since execute gets prompt directly
        
      const executePromise = provider.execute(
        'Issue content\nPlan content',
        '/test/workspace',
        [],
        undefined
      );
      
      // Wait for spawn to be called
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate error output
      mockProcess.stderr.emit('data', 'Error: Rate limit detected');
      mockProcess.emit('close', 1);
      
      await expect(executePromise).rejects.toThrow('Gemini exited with code 1');
    });

    it('should collect stderr output', async () => {
      // No file reads needed since execute gets prompt directly
        
      const executePromise = provider.execute(
        'Issue content\nPlan content',
        '/test/workspace',
        [],
        undefined
      );
      
      // Wait for spawn to be called
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate stderr output
      mockProcess.stderr.emit('data', 'Warning: Low quota\nError: Failed to process\n');
      mockProcess.emit('close', 1);
      
      await expect(executePromise).rejects.toThrow('Gemini exited with code 1');
    });

    it('should handle signal abort', async () => {
      // No file reads needed since execute gets prompt directly
        
      const abortController = new AbortController();
      
      const executePromise = provider.execute(
        'Issue content\nPlan content',
        '/test/workspace',
        [],
        abortController.signal
      );
      
      // Wait for spawn to be called
      await new Promise(resolve => setImmediate(resolve));
      
      // Abort the execution
      abortController.abort();
      mockProcess.emit('close', 1);
      
      await expect(executePromise).rejects.toThrow('aborted');
    });

    it('should detect errors in output', async () => {
      // No file reads needed since execute gets prompt directly
        
      const executePromise = provider.execute(
        'Issue content\nPlan content',
        '/test/workspace',
        [],
        undefined
      );
      
      // Wait for spawn to be called
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate output with error
      mockProcess.stdout.emit('data', 'Starting task...\nError: Failed to process file\n');
      mockProcess.stderr.emit('data', 'Error: Failed to process');
      mockProcess.emit('close', 1);
      
      await expect(executePromise).rejects.toThrow('Gemini exited with code 1');
    });

    it('should handle spawn errors during execution', async () => {
      // Mock spawn error
      mockSpawn.mockImplementation(() => {
        throw new Error('spawn failed');
      });

      await expect(provider.execute('test prompt', '/workspace', [], undefined)).rejects.toThrow('spawn failed');
    });

    it('should handle empty output', async () => {
      // No file reads needed since execute gets prompt directly
        
      const executePromise = provider.execute(
        'Issue content\nPlan content',
        '/test/workspace',
        [],
        undefined
      );
      
      // Wait for spawn to be called
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate empty output
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      expect(result).toBe('');
    });
  });

  describe('name property', () => {
    it('should return correct provider name', () => {
      expect(provider.name).toBe('gemini');
    });
  });
});