import { vi } from 'vitest';
import type { ChildProcess } from 'child_process';

/**
 * Mock process configuration for testing provider commands
 */
export interface MockProcessConfig {
  /** Command being executed */
  command: string;
  /** Command arguments */
  args: string[];
  /** Exit code to return */
  exitCode: number;
  /** Stdout content to emit */
  stdout?: string;
  /** Stderr content to emit */
  stderr?: string;
  /** Delay before emitting data (ms) */
  delay?: number;
  /** Delay before process close (ms) */
  closeDelay?: number;
}

/**
 * Usage limit error configuration
 */
export interface UsageLimitConfig {
  /** Provider name */
  provider: string;
  /** Usage limit message */
  message: string;
  /** Reset timestamp (epoch seconds) */
  resetTime?: number;
  /** Whether to format as JSON */
  asJson?: boolean;
}

/**
 * Creates a mock ChildProcess with configured behavior
 */
export function createMockProcess(config: MockProcessConfig): Partial<ChildProcess> {
  const mockProcess: Partial<ChildProcess> = {
    stdout: { on: vi.fn() } as any,
    stderr: { on: vi.fn() } as any,
    stdin: { write: vi.fn(), end: vi.fn() } as any,
    on: vi.fn(),
    kill: vi.fn()
  };

  // Set up process event handlers
  const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
  mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
    if (event === 'spawn') {
      setTimeout(() => callback(), config.delay ?? 10);
    } else if (event === 'close') {
      setTimeout(() => callback(config.exitCode), config.closeDelay ?? 50);
    }
  });

  // Set up stdout handlers
  if (config.stdout !== undefined && config.stdout !== '') {
    const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
    mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
      if (event === 'data') {
        setTimeout(() => {
          callback(Buffer.from(config.stdout!));
        }, (config.delay ?? 10) + 10);
      }
    });
  }

  // Set up stderr handlers
  if (config.stderr !== undefined && config.stderr !== '') {
    const mockStderrOn = mockProcess.stderr!.on as ReturnType<typeof vi.fn>;
    mockStderrOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
      if (event === 'data') {
        setTimeout(() => {
          callback(Buffer.from(config.stderr!));
        }, (config.delay ?? 10) + 10);
      }
    });
  }

  return mockProcess;
}

/**
 * Creates a mock process that simulates a usage limit error
 */
export function createMockProcessWithUsageLimit(config: UsageLimitConfig): Partial<ChildProcess> {
  const message = config.asJson === true
    ? JSON.stringify({
        type: 'error',
        message: config.message
      })
    : config.resetTime !== undefined && config.resetTime > 0
      ? `${config.message}|${config.resetTime}`
      : config.message;

  return createMockProcess({
    command: config.provider,
    args: [],
    exitCode: 1,
    stdout: message,
    closeDelay: 100
  });
}

/**
 * Creates a mock process that simulates a successful version check
 */
export function createMockVersionProcess(provider: string): Partial<ChildProcess> {
  return createMockProcess({
    command: provider,
    args: ['--version'],
    exitCode: 0,
    stdout: `${provider} CLI version 1.0.0\n`,
    delay: 10,
    closeDelay: 30
  });
}

/**
 * Creates a mock process that simulates successful execution
 */
export function createMockSuccessProcess(provider: string, output: string): Partial<ChildProcess> {
  return createMockProcess({
    command: provider,
    args: [],
    exitCode: 0,
    stdout: output,
    closeDelay: 100
  });
}

/**
 * Creates a mock spawn function that handles multiple command scenarios
 */
export function createMockSpawn(scenarios: Map<string, MockProcessConfig>): ReturnType<typeof vi.fn> {
  return vi.fn().mockImplementation((command: string, args: string[]) => {
    const key = `${command} ${args.join(' ')}`;
    const config = scenarios.get(key) || scenarios.get(command);
    
    if (!config) {
      throw new Error(`Unexpected command: ${command} ${args.join(' ')}`);
    }

    return createMockProcess({
      ...config,
      command,
      args
    });
  });
}

/**
 * Common provider scenarios for testing
 */
export const PROVIDER_SCENARIOS = {
  CLAUDE_VERSION: {
    command: 'claude',
    args: ['--version'],
    exitCode: 0,
    stdout: 'Claude CLI version 1.0.0\n'
  },
  CLAUDE_USAGE_LIMIT: {
    command: 'claude',
    args: [],
    exitCode: 1,
    stdout: 'Claude AI usage limit reached|1751749200\n'
  },
  GEMINI_VERSION: {
    command: 'gemini',
    args: ['--version'],
    exitCode: 0,
    stdout: 'Gemini CLI version 1.0.0\n'
  },
  GEMINI_SUCCESS: {
    command: 'gemini',
    args: [],
    exitCode: 0,
    stdout: 'Task completed successfully by Gemini\n'
  }
} as const;