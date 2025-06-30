import { ClaudeProvider } from '../../src/providers/ClaudeProvider';
import { spawn } from 'child_process';
import { EventEmitter } from 'events';

jest.mock('child_process');

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

  beforeEach(() => {
    jest.clearAllMocks();
    provider = new ClaudeProvider();
    mockProcess = new MockChildProcess();
    mockSpawn = spawn as jest.MockedFunction<typeof spawn>;
    mockSpawn.mockReturnValue(mockProcess as unknown as ReturnType<typeof spawn>);
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
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        ['option1'],
        abortController.signal
      );

      // Simulate claude output
      mockProcess.stdout.emit('data', 'Processing...\n');
      mockProcess.stdout.emit('data', JSON.stringify({
        type: 'result',
        is_error: false,
        content: 'Task completed successfully'
      }));
      mockProcess.emit('close', 0);

      const result = await executePromise;

      expect(result).toEqual({
        success: true,
        output: expect.any(String) as string,
        provider: 'claude',
        issueNumber: 0,
        duration: expect.any(Number),
        error: undefined,
        filesChanged: undefined,
        rollbackData: undefined
      });

      expect(mockSpawn).toHaveBeenCalledWith(
        'claude',
        ['autonomous', '--json', '--issue', 'issue.md', '--plan', 'plan.md', '--context', 'option1']
      );
    });

    it('should handle execution errors', async () => {
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      mockProcess.stderr.emit('data', 'Error: Rate limit exceeded');
      mockProcess.emit('close', 1);

      const result = await executePromise;
      expect(result.success).toBe(false);
      expect(result.error).toContain('Rate limit exceeded');
    });

    it('should handle JSON error responses', async () => {
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      mockProcess.stdout.emit('data', JSON.stringify({
        type: 'result',
        is_error: true,
        error: 'Task failed'
      }));
      mockProcess.emit('close', 0);

      const result = await executePromise;
      expect(result.success).toBe(true);
      expect(result.error).toBe('Task failed');
    });

    it('should handle non-JSON output', async () => {
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      mockProcess.stdout.emit('data', 'Regular output without JSON\n');
      mockProcess.stdout.emit('data', 'More output\n');
      mockProcess.emit('close', 0);

      const result = await executePromise;

      expect(result.success).toBe(true);
      expect(result.output).toContain('Regular output without JSON');
    });

    it('should handle signal abort', async () => {
      const abortController = new AbortController();
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        abortController.signal
      );

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