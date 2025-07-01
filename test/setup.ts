import { expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import type { SpyInstance } from 'vitest';
import * as path from 'node:path';
import * as os from 'node:os';
import type { ExecutionResult, Issue, TodoItem, Configuration } from '../src/types/index.js';

declare module 'vitest' {
  interface Assertion {
    toBeSuccessfulExecution(): void;
    toHaveProviderHistory(expectedProviders: string[]): void;
    toBeValidIssue(): void;
    toContainTodoItem(expectedTodo: Partial<TodoItem>): void;
  }
}

let consoleSpies: {
  log: SpyInstance;
  error: SpyInstance;
  warn: SpyInstance;
};

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.AUTOAGENT_SILENT = 'true';
});

beforeEach(() => {
  vi.clearAllMocks();
  
  consoleSpies = {
    log: vi.spyOn(console, 'log').mockImplementation(() => {}),
    error: vi.spyOn(console, 'error').mockImplementation(() => {}),
    warn: vi.spyOn(console, 'warn').mockImplementation(() => {})
  };
});

afterEach(() => {
  vi.restoreAllMocks();
  
  if (consoleSpies.log !== undefined) {consoleSpies.log.mockRestore();}
  if (consoleSpies.error !== undefined) {consoleSpies.error.mockRestore();}
  if (consoleSpies.warn !== undefined) {consoleSpies.warn.mockRestore();}
});

expect.extend({
  toBeSuccessfulExecution(received: ExecutionResult) {
    const pass = received.success === true && received.error === undefined;
    
    if (pass) {
      return {
        message: (): string => 'expected execution not to be successful',
        pass: true
      };
    } else {
      return {
        message: (): string => 
          'expected execution to be successful, but got:\n' +
          `  success: ${String(received.success)}\n` +
          `  error: ${received.error?.message ?? 'none'}`,
        pass: false
      };
    }
  },

  toHaveProviderHistory(received: ExecutionResult, expectedProviders: string[]) {
    const actualProviders = received.providerHistory ?? [];
    const pass = 
      actualProviders.length === expectedProviders.length &&
      actualProviders.every((provider, index) => provider === expectedProviders[index]);
    
    if (pass === true) {
      return {
        message: (): string => 
          `expected provider history not to be [${expectedProviders.join(', ')}]`,
        pass: true
      };
    } else {
      return {
        message: (): string => 
          `expected provider history to be [${expectedProviders.join(', ')}], ` +
          `but got [${actualProviders.join(', ')}]`,
        pass: false
      };
    }
  },

  toBeValidIssue(received: Issue) {
    const errors: string[] = [];
    
    if (received.title === undefined || received.title.trim().length === 0) {
      errors.push('title is missing or empty');
    }
    
    if (received.requirement === undefined || received.requirement.trim().length === 0) {
      errors.push('requirement is missing or empty');
    }
    
    if (!Array.isArray(received.acceptanceCriteria) || received.acceptanceCriteria.length === 0) {
      errors.push('acceptanceCriteria must be a non-empty array');
    }
    
    const pass = errors.length === 0;
    
    if (pass) {
      return {
        message: (): string => 'expected issue not to be valid',
        pass: true
      };
    } else {
      return {
        message: (): string => 
          'expected issue to be valid, but found errors:\n' +
          errors.map(e => `  - ${e}`).join('\n'),
        pass: false
      };
    }
  },

  toContainTodoItem(received: TodoItem[], expectedTodo: Partial<TodoItem>) {
    const found = received.find(todo => {
      return Object.entries(expectedTodo).every(([key, value]) => {
        return todo[key as keyof TodoItem] === value;
      });
    });
    
    const pass = found !== undefined;
    
    if (pass) {
      return {
        message: (): string => 
          `expected todos not to contain item matching ${JSON.stringify(expectedTodo)}`,
        pass: true
      };
    } else {
      return {
        message: (): string => 
          `expected todos to contain item matching ${JSON.stringify(expectedTodo)}, ` +
          `but got:\n${JSON.stringify(received, null, 2)}`,
        pass: false
      };
    }
  }
});

export function createIssue(overrides: Partial<Issue> = {}): Issue {
  return {
    title: 'Test Issue',
    requirement: 'Test requirement',
    acceptanceCriteria: ['Test criterion 1', 'Test criterion 2'],
    technicalDetails: 'Test technical details',
    dependencies: [],
    ...overrides
  };
}

export function createExecutionResult(overrides: Partial<ExecutionResult> = {}): ExecutionResult {
  return {
    success: true,
    issueNumber: 1,
    duration: 1000,
    filesModified: [],
    providerHistory: ['claude'],
    ...overrides
  };
}

export function createConfiguration(overrides: Partial<Configuration> = {}): Configuration {
  return {
    provider: 'claude',
    fallbackProvider: 'gemini',
    maxRetries: 3,
    workingDirectory: process.cwd(),
    parallelIssues: 1,
    verbose: false,
    excludePatterns: [],
    workspaceOnly: false,
    dryRun: false,
    ...overrides
  };
}

export function createTodoItem(overrides: Partial<TodoItem> = {}): TodoItem {
  return {
    id: Math.random().toString(36).substring(7),
    content: 'Test todo item',
    status: 'pending',
    ...overrides
  };
}

export function createTempDir(): string {
  return path.join(os.tmpdir(), `autoagent-test-${Date.now()}`);
}

export const testHelpers = {
  createIssue,
  createExecutionResult,
  createConfiguration,
  createTodoItem,
  createTempDir
};

export { consoleSpies };
export { TestWorkspace } from './utils/test-workspace.js';
export * from './mocks/index.js';