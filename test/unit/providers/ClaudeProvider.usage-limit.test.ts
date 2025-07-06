import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClaudeProvider } from '@/providers/ClaudeProvider';
import { spawn } from 'child_process';
import * as fs from 'fs/promises';
import { EventEmitter } from 'events';

vi.mock('child_process');
vi.mock('fs/promises');

describe('ClaudeProvider - Usage Limit from Yesterday', () => {
  let provider: ClaudeProvider;
  let mockProcess: any;

  beforeEach(() => {
    vi.clearAllMocks();
    provider = new ClaudeProvider();
    
    // Create a mock process
    mockProcess = new EventEmitter() as any;
    mockProcess.stdout = new EventEmitter();
    mockProcess.stderr = new EventEmitter();
    mockProcess.stdin = {
      write: vi.fn(),
      end: vi.fn()
    };
    
    vi.mocked(spawn).mockReturnValue(mockProcess);
  });

  it('should detect usage limit from stdout when Claude exits with code 1 (exact scenario from yesterday)', async () => {
    // Setup file reads
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce('Issue content')
      .mockResolvedValueOnce('Plan content');
    
    const executePromise = provider.execute(
      'issues/62-add-integration-tests.md',
      'plans/62-add-integration-tests.md',
      [],
      undefined
    );

    // Wait for fs reads to complete
    await new Promise(resolve => setImmediate(resolve));
    
    // Emit spawn event
    mockProcess.emit('spawn');
    
    // Simulate the exact output from yesterday's logs
    // Based on the JSONL data: Claude outputs this to stdout before exiting
    mockProcess.stdout.emit('data', `🔧 System initialized
   Model: claude-opus-4-20250514
   Tools available: 43

💭 Agent: Claude AI usage limit reached|1751749200

❌ Task failed
`);
    
    // Claude exits with code 1
    mockProcess.emit('close', 1);

    const result = await executePromise;
    
    // Verify the result
    expect(result.success).toBe(false);
    // The regex captures from "usage limit" onwards, including the timestamp
    expect(result.error).toBe('usage limit reached|1751749200');
    
    // This error message should trigger failover
    expect(result.error?.toLowerCase()).toContain('usage limit');
  });

  it('should handle JSON error format for usage limits', async () => {
    // This tests the case where Claude returns a structured JSON error
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce('Issue content')
      .mockResolvedValueOnce('Plan content');
    
    const executePromise = provider.execute(
      'issue.md',
      'plan.md',
      [],
      undefined
    );

    await new Promise(resolve => setImmediate(resolve));
    mockProcess.emit('spawn');
    
    // From the JSONL logs, we can see Claude sometimes returns JSON errors
    const jsonError = JSON.stringify({
      type: 'error',
      message: 'Claude AI usage limit reached|1751749200'
    });
    
    mockProcess.stdout.emit('data', jsonError);
    mockProcess.emit('close', 1);

    const result = await executePromise;
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Claude AI usage limit reached|1751749200');
  });

  it('should extract usage limit from mixed output', async () => {
    // Test case where usage limit is buried in other output
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce('Issue content')
      .mockResolvedValueOnce('Plan content');
    
    const executePromise = provider.execute(
      'issue.md',
      'plan.md',
      [],
      undefined
    );

    await new Promise(resolve => setImmediate(resolve));
    mockProcess.emit('spawn');
    
    // Simulate output with multiple messages
    mockProcess.stdout.emit('data', 'Some other output\n');
    mockProcess.stdout.emit('data', 'Processing...\n');
    mockProcess.stdout.emit('data', 'Claude AI usage limit reached|1751749200\n');
    mockProcess.stdout.emit('data', 'Additional output\n');
    
    mockProcess.emit('close', 1);

    const result = await executePromise;
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('usage limit reached|1751749200');
  });

  it('should fall back to generic error when no usage limit found in stdout', async () => {
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce('Issue content')
      .mockResolvedValueOnce('Plan content');
    
    const executePromise = provider.execute(
      'issue.md',
      'plan.md',
      [],
      undefined
    );

    await new Promise(resolve => setImmediate(resolve));
    mockProcess.emit('spawn');
    
    // Output without usage limit message
    mockProcess.stdout.emit('data', 'Some other error occurred');
    mockProcess.emit('close', 1);

    const result = await executePromise;
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Claude exited with code 1');
  });
});