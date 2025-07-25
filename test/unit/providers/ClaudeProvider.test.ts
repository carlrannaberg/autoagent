import { describe, it, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest';
import { ClaudeProvider } from '@/providers/ClaudeProvider';
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

describe('ClaudeProvider', () => {
  let provider: ClaudeProvider;
  let mockSpawn: ReturnType<typeof vi.fn>;
  let mockProcess: MockChildProcess;
  let originalConsoleLog: typeof console.log;
  
  beforeAll(() => {
    // Suppress console output during tests
    // eslint-disable-next-line no-console
    originalConsoleLog = console.log;
    // eslint-disable-next-line no-console
    console.log = vi.fn();
  });
  
  afterAll(() => {
    // Restore console.log
    // eslint-disable-next-line no-console
    console.log = originalConsoleLog;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    provider = new ClaudeProvider();
    mockProcess = new MockChildProcess();
    mockSpawn = vi.mocked(spawn);
    mockSpawn.mockReturnValue(mockProcess as unknown as ReturnType<typeof spawn>);
    
    // Mock fs.readFile
    vi.mocked(fs.readFile).mockResolvedValue('File content');
    
    // Mock path.basename
    vi.mocked(path.basename).mockReturnValue('filename.txt');
    
    // Mock process.cwd
    vi.spyOn(process, 'cwd').mockReturnValue('/test/dir');
  });

  describe('checkAvailability', () => {
    it('should return true when claude is available', async () => {
      // Set silent mode to avoid console output
      process.env.AUTOAGENT_SILENT = 'true';
      const availabilityPromise = provider.checkAvailability();

      // Simulate successful output (matches actual claude --version output)
      mockProcess.stdout.emit('data', '1.0.35 (Claude Code)');
      mockProcess.emit('close', 0);

      const result = await availabilityPromise;
      expect(result).toBe(true);
      expect(mockSpawn).toHaveBeenCalledWith('claude', ['--version']);
    });

    it('should return false when claude is not available', async () => {
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
    it('should execute successfully with JSON output', async () => {
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
      
      // Emit spawn event first
      mockProcess.emit('spawn');
      
      // Simulate claude streaming JSON output (one per line)
      const jsonMessages = [
        JSON.stringify({
          type: 'assistant',
          message: {
            content: [{
              type: 'text',
              text: 'Task completed successfully\nModified: src/file.ts'
            }]
          }
        }),
        JSON.stringify({
          type: 'result',
          result: 'Task completed successfully\nModified: src/file.ts'
        })
      ].join('\n');
      
      mockProcess.stdout.emit('data', jsonMessages);
      mockProcess.emit('close', 0);

      const result = await executePromise;

      // The result should be the raw JSON output from Claude
      const expectedJson = [
        JSON.stringify({
          type: 'assistant',
          message: {
            content: [{
              type: 'text',
              text: 'Task completed successfully\nModified: src/file.ts'
            }]
          }
        }),
        JSON.stringify({
          type: 'result',
          result: 'Task completed successfully\nModified: src/file.ts'
        })
      ].join('\n');
      
      expect(result).toBe(expectedJson);

      // Check spawn was called with correct arguments
      expect(mockSpawn).toHaveBeenCalled();
      const callArgs = mockSpawn.mock.calls[0];
      expect(callArgs).toBeDefined();
      expect(callArgs![0]).toBe('claude');
      expect(callArgs![1]).toContain('--add-dir');
      expect(callArgs![1]).toContain('plan.md'); // workspace parameter
      expect(callArgs![1]).toContain('-p');
      expect(callArgs![1]).toContain('issue.md'); // prompt parameter
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
      
      // Emit spawn event first
      mockProcess.emit('spawn');
      
      mockProcess.stderr.emit('data', 'Error: Rate limit exceeded');
      mockProcess.emit('close', 1);

      await expect(executePromise).rejects.toThrow('Rate limit exceeded');
    });

    it('should detect Claude usage limit errors from JSON', async () => {
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
      
      // Emit spawn event first
      mockProcess.emit('spawn');
      
      // Simulate error message in JSON format
      const errorMessage = JSON.stringify({ type: 'error', message: 'Claude AI usage limit reached' });
      mockProcess.stdout.emit('data', errorMessage);
      mockProcess.emit('close', 1);

      await expect(executePromise).rejects.toThrow('Claude exited with code 1:');
    });

    it('should detect Claude usage limit errors from stderr', async () => {
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
      
      // Emit spawn event first
      mockProcess.emit('spawn');
      
      mockProcess.stderr.emit('data', 'Claude AI usage limit reached');
      mockProcess.emit('close', 1);

      await expect(executePromise).rejects.toThrow('Claude exited with code 1:');
    });

    it('should handle context files correctly', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content')
        .mockResolvedValueOnce('Context 1')
        .mockResolvedValueOnce('Context 2');
      
      vi.mocked(path.basename)
        .mockReturnValueOnce('context1.md')
        .mockReturnValueOnce('context2.md');
        
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        ['context1.md', 'context2.md'],
        undefined
      );

      // Need to wait for fs reads to complete
      await new Promise(resolve => setImmediate(resolve));
      
      // Emit spawn event first
      mockProcess.emit('spawn');
      
      mockProcess.stdout.emit('data', 'Success');
      mockProcess.emit('close', 0);

      const result = await executePromise;
      expect(result).toBe('Success');
      
      // Context files are now passed via command line args, not stdin
      // Verify spawn was called with correct args including context files
      const spawnArgs = mockSpawn.mock.calls[0][1];
      expect(spawnArgs).toContain('context1.md');
      expect(spawnArgs).toContain('context2.md');
    });

    it('should handle streaming output with file modifications', async () => {
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
      
      // Emit spawn event first
      mockProcess.emit('spawn');
      
      // Simulate streaming multiple messages
      const messages = [
        JSON.stringify({
          type: 'assistant',
          message: {
            content: [{
              type: 'text',
              text: 'Regular output without JSON\n'
            }]
          }
        }),
        JSON.stringify({
          type: 'assistant',
          message: {
            content: [{
              type: 'text',
              text: 'Modified: src/test.ts\n'
            }]
          }
        })
      ].join('\n');
      
      mockProcess.stdout.emit('data', messages);
      mockProcess.emit('close', 0);

      const result = await executePromise;

      expect(result).toContain('Regular output without JSON');
      expect(result).toContain('Modified: src/test.ts');
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
      
      // Emit spawn event first
      mockProcess.emit('spawn');
      
      // Abort the execution
      abortController.abort();
      mockProcess.emit('close', 1);

      await expect(executePromise).rejects.toThrow('aborted');
    });

    it('should handle spawn errors during execution', async () => {
      mockSpawn.mockImplementation(() => {
        throw new Error('spawn failed');
      });

      await expect(provider.execute('issue.md', 'plan.md', [], undefined)).rejects.toThrow('spawn failed');
    });
  });

  describe('name property', () => {
    it('should return correct provider name', () => {
      expect(provider.name).toBe('claude');
    });
  });
});