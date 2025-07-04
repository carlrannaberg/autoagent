import { expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import type { SpyInstance } from 'vitest';
import * as path from 'node:path';
import * as os from 'node:os';
import { rmSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import type { ExecutionResult, Issue, TodoItem, Configuration } from '../src/types/index.js';

// Load test environment variables
config({ path: '.env.test' });

// Import enhanced custom matchers
import './helpers/assertions/custom-matchers';

declare module 'vitest' {
  interface Assertion {
    toBeSuccessfulExecution(): void;
    toHaveProviderHistory(expectedProviders: string[]): void;
    toBeValidIssue(): void;
    toContainTodoItem(expectedTodo: Partial<TodoItem>): void;
    toHaveExecutedSuccessfully(): void;
    toMatchStatisticalBaseline(baseline: any, tolerance?: number): void;
    toBeWithinPerformanceThreshold(maxTime: number): void;
    toHaveValidConfiguration(): void;
  }
}

let consoleSpies: {
  log: SpyInstance;
  error: SpyInstance;
  warn: SpyInstance;
};

// Test type detection
const testType = process.env.TEST_TYPE ?? detectTestType();

function detectTestType(): string {
  const testFile = expect.getState()?.testPath;
  if (testFile === null || testFile === undefined || testFile === '') {return 'unit';}
  
  if (testFile.includes('/unit/')) {return 'unit';}
  if (testFile.includes('/integration/')) {return 'integration';}
  if (testFile.includes('/e2e/')) {return 'e2e';}
  if (testFile.includes('/performance/')) {return 'performance';}
  if (testFile.includes('/smoke/')) {return 'smoke';}
  if (testFile.includes('/contract/')) {return 'contract';}
  
  return 'unit';
}

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.AUTOAGENT_SILENT = 'true';
  
  // Set test-specific paths
  process.env.AUTOAGENT_CONFIG_DIR = join(process.cwd(), '.test-autoagent');
  
  // Set shorter timeouts for test environment
  process.env.AUTOAGENT_TIMEOUT = '5000';
  process.env.AUTOAGENT_RETRY_ATTEMPTS = '1';
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
  
  // Clear any test-specific environment variables
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('TEST_')) {
      delete process.env[key];
    }
  });
});

// Global cleanup - runs after all tests
afterAll(() => {
  // Clean up test workspaces
  const testWorkspaces = [
    join(process.cwd(), '.test-workspace'),
    join(process.cwd(), '.test-autoagent'),
    join(process.cwd(), 'test-workspace-*'),
    join(process.cwd(), 'benchmark-results')
  ];
  
  testWorkspaces.forEach(workspace => {
    try {
      rmSync(workspace, { recursive: true, force: true });
    } catch {
      // Ignore errors - directory might not exist
    }
  });
});

// Test type specific configurations
switch (testType) {
  case 'unit':
    vi.setConfig({ testTimeout: 5000 });
    break;
    
  case 'integration':
    vi.setConfig({ testTimeout: 15000 });
    break;
    
  case 'e2e':
    vi.setConfig({ testTimeout: 30000 });
    break;
    
  case 'performance':
    vi.setConfig({ testTimeout: 60000 });
    break;
    
  case 'smoke':
    vi.setConfig({ testTimeout: 10000 });
    break;
    
  default:
    vi.setConfig({ testTimeout: 10000 });
}

// Extend existing custom matchers
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
    
    if (received.requirements === undefined || received.requirements.trim().length === 0) {
      errors.push('requirements is missing or empty');
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

// Legacy helper functions for backward compatibility
export function createIssue(overrides: Partial<Issue> = {}): Issue {
  return {
    number: 1,
    title: 'Test Issue',
    file: 'issues/1-test-issue.md',
    requirements: 'Test requirement',
    acceptanceCriteria: ['Test criterion 1', 'Test criterion 2'],
    technicalDetails: 'Test technical details',
    resources: [],
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

// Export test type for use in tests
export const TEST_TYPE = testType;

export { consoleSpies };
export { TestWorkspace } from './utils/test-workspace.js';
export * from './helpers/test-doubles/index.js';