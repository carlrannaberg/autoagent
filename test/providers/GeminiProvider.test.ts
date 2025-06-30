import { GeminiProvider } from '../../src/providers/GeminiProvider';
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

describe('GeminiProvider', () => {
  let provider: GeminiProvider;
  let mockSpawn: jest.MockedFunction<typeof spawn>;
  let mockProcess: MockChildProcess;

  beforeEach(() => {
    jest.clearAllMocks();
    provider = new GeminiProvider();
    mockProcess = new MockChildProcess();
    mockSpawn = spawn as jest.MockedFunction<typeof spawn>;
    mockSpawn.mockReturnValue(mockProcess as unknown as ReturnType<typeof spawn>);
  });

  describe('checkAvailability', () => {
    it('should return true when gemini is available', async () => {
      // Set silent mode to avoid console output
      process.env.AUTOAGENT_SILENT = 'true';
      const availabilityPromise = provider.checkAvailability();

      // Simulate successful output
      mockProcess.stdout.emit('data', 'gemini version 1.0.0');
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
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        ['option1'],
        abortController.signal
      );

      // Simulate gemini output
      mockProcess.stdout.emit('data', 'Processing task...\n');
      mockProcess.stdout.emit('data', 'Task completed successfully\n');
      mockProcess.emit('close', 0);

      const result = await executePromise;

      expect(result).toEqual({
        success: true,
        output: 'Processing task...\nTask completed successfully\n',
        provider: 'gemini',
        issueNumber: 0,
        duration: expect.any(Number),
        error: undefined,
        filesChanged: undefined
      });

      expect(mockSpawn).toHaveBeenCalledWith(
        'gemini',
        ['autonomous', '--issue', 'issue.md', '--plan', 'plan.md', '--context', 'option1']
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

    it('should collect stderr output', async () => {
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      mockProcess.stderr.emit('data', 'Warning: Low quota\n');
      mockProcess.stderr.emit('data', 'Error: Failed to process\n');
      mockProcess.emit('close', 1);

      const result = await executePromise;
      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to process');
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

    it('should handle large output chunks', async () => {
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

      // Simulate a large chunk of data
      const largeData = 'x'.repeat(10000) + '\n';
      mockProcess.stdout.emit('data', largeData);
      mockProcess.emit('close', 0);

      const result = await executePromise;

      expect(result.success).toBe(true);
      expect(result.output?.length ?? 0).toBeGreaterThan(9000);
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
      const executePromise = provider.execute(
        'issue.md',
        'plan.md',
        [],
        undefined
      );

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