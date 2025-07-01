import { ClaudeProvider } from '../../src/providers/ClaudeProvider';
import { spawn } from 'child_process';
import { EventEmitter } from 'events';
import * as fs from 'fs/promises';
import * as path from 'path';

jest.mock('child_process');
jest.mock('fs/promises');
jest.mock('path');

class MockChildProcess extends EventEmitter {
  stdout = new EventEmitter();
  stderr = new EventEmitter();
  stdin = {
    write: jest.fn(),
    end: jest.fn()
  };
  kill = jest.fn();
}

describe('ClaudeProvider', () => {
  let provider: ClaudeProvider;
  let mockSpawn: jest.MockedFunction<typeof spawn>;
  let mockProcess: MockChildProcess;
  let originalConsoleLog: typeof console.log;
  
  beforeAll(() => {
    // Suppress console output during tests
    // eslint-disable-next-line no-console
    originalConsoleLog = console.log;
    // eslint-disable-next-line no-console
    console.log = jest.fn();
  });
  
  afterAll(() => {
    // Restore console.log
    // eslint-disable-next-line no-console
    console.log = originalConsoleLog;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    provider = new ClaudeProvider();
    mockProcess = new MockChildProcess();
    mockSpawn = spawn as jest.MockedFunction<typeof spawn>;
    mockSpawn.mockReturnValue(mockProcess as unknown as ReturnType<typeof spawn>);
    
    // Mock fs.readFile
    (fs.readFile as jest.Mock).mockResolvedValue('File content');
    
    // Mock path.basename
    (path.basename as jest.Mock).mockReturnValue('filename.txt');
    
    // Mock process.cwd
    jest.spyOn(process, 'cwd').mockReturnValue('/test/dir');
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
      (fs.readFile as jest.Mock)
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

      expect(result).toEqual({
        success: true,
        output: 'Task completed successfully\nModified: src/file.ts',
        provider: 'claude',
        issueNumber: 0,
        duration: expect.any(Number),
        filesChanged: ['src/file.ts']
      });

      // Check spawn was called with correct arguments
      expect(mockSpawn).toHaveBeenCalled();
      const callArgs = mockSpawn.mock.calls[0];
      expect(callArgs).toBeDefined();
      expect(callArgs![0]).toBe('claude');
      expect(callArgs![1]).toContain('--add-dir');
      expect(callArgs![1]).toContain('/test/dir');
      expect(callArgs![1]).toContain('-p');
      expect(callArgs![1]).toContain('--output-format');
      expect(callArgs![1]).toContain('stream-json');
      expect(callArgs![1]).toContain('--verbose');
      expect(callArgs![1]).toContain('--dangerously-skip-permissions');
      expect(callArgs![1]).toContain('--max-turns');
      expect(callArgs![1]).toContain('30');
    });

    it('should handle execution errors', async () => {
      (fs.readFile as jest.Mock)
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

      const result = await executePromise;
      expect(result.success).toBe(false);
      expect(result.error).toContain('Rate limit exceeded');
    });

    it('should handle context files correctly', async () => {
      (fs.readFile as jest.Mock)
        .mockResolvedValueOnce('Issue content')
        .mockResolvedValueOnce('Plan content')
        .mockResolvedValueOnce('Context 1')
        .mockResolvedValueOnce('Context 2');
      
      (path.basename as jest.Mock)
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

      await executePromise;
      
      // Check that context files were written to stdin
      expect(mockProcess.stdin.write).toHaveBeenCalled();
      const stdinContent = mockProcess.stdin.write.mock.calls[0][0];
      expect(stdinContent).toContain('Context 1');
      expect(stdinContent).toContain('Context 2');
      expect(stdinContent).toContain('context1.md');
      expect(stdinContent).toContain('context2.md');
    });

    it('should handle streaming output with file modifications', async () => {
      (fs.readFile as jest.Mock)
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

      expect(result.success).toBe(true);
      expect(result.output).toContain('Regular output without JSON');
      expect(result.filesChanged).toEqual(['src/test.ts']);
    });

    it('should handle signal abort', async () => {
      (fs.readFile as jest.Mock)
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

      const result = await executePromise;
      expect(result.success).toBe(false);
      expect(result.error).toContain('aborted');
    });

    it('should handle spawn errors during execution', async () => {
      mockSpawn.mockImplementation(() => {
        throw new Error('spawn failed');
      });

      const result = await provider.execute('issue.md', 'plan.md', [], undefined);
      expect(result.success).toBe(false);
      expect(result.error).toContain('spawn failed');
    });
  });

  describe('name property', () => {
    it('should return correct provider name', () => {
      expect(provider.name).toBe('claude');
    });
  });
});