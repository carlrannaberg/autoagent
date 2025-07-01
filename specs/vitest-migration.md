# AutoAgent Vitest Migration Guide

## Complete Migration from Jest to Vitest

This guide provides a step-by-step migration path from Jest to Vitest, following Gemini CLI's testing patterns.

## Step 1: Install Vitest and Dependencies

```bash
# Remove Jest packages
npm uninstall jest @types/jest ts-jest

# Install Vitest and related packages
npm install -D vitest @vitest/ui @vitest/coverage-v8 @vitest/runner
npm install -D @testing-library/jest-dom @testing-library/user-event
npm install -D happy-dom
```

## Step 2: Create Vitest Configuration

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts', 'test/**/*.{test,spec}.ts'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'coverage/**',
        'dist/**',
        'node_modules/**',
        'test/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/index.ts' // Often just exports
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    },
    setupFiles: ['./test/setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: 4,
        minThreads: 1
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@test': resolve(__dirname, './test')
    }
  }
});
```

### vitest.config.e2e.ts (for E2E tests)
```typescript
import { defineConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ['test/e2e/**/*.test.ts'],
    testTimeout: 120000,
    hookTimeout: 120000,
    pool: 'forks', // Better isolation for E2E tests
    poolOptions: {
      forks: {
        singleFork: true // Run E2E tests sequentially
      }
    }
  }
});
```

## Step 3: Update package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:unit": "vitest run --config vitest.config.ts src",
    "test:integration": "vitest run --config vitest.config.ts test/integration",
    "test:e2e": "vitest run --config vitest.config.e2e.ts",
    "test:coverage": "vitest run --coverage",
    "test:coverage:ui": "vitest --coverage --ui",
    "test:bench": "vitest bench",
    "test:ci": "vitest run --coverage --reporter=json --reporter=default",
    "test:debug": "vitest --inspect-brk --inspect --logHeapUsage --threads=false"
  }
}
```

## Step 4: Create Test Setup File

### test/setup.ts
```typescript
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Global test setup
beforeAll(() => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.AUTOAGENT_SILENT = 'true';
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

// Global test utilities
global.testUtils = {
  // Add any global utilities here
};

// Custom matchers
expect.extend({
  toBeSuccessfulExecution(received: any) {
    const pass = received?.success === true && !received?.error;
    return {
      pass,
      message: () => pass
        ? `Expected execution to fail`
        : `Expected successful execution but got: ${JSON.stringify(received)}`
    };
  },

  toHaveProviderHistory(content: string, provider: string) {
    const hasHistory = content.includes('## Execution History') &&
                      content.includes(provider);
    return {
      pass: hasHistory,
      message: () => `Expected content to ${hasHistory ? 'not ' : ''}contain ${provider} history`
    };
  }
});
```

## Step 5: Migrate Test Files

### Example: Migrating a Jest Test to Vitest

#### Before (Jest):
```typescript
// test/core/config-manager.test.ts
import { ConfigManager } from '../../src/core/config-manager';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
    mkdir: jest.fn()
  }
}));

describe('ConfigManager', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  let configManager: ConfigManager;

  beforeEach(() => {
    jest.clearAllMocks();
    configManager = new ConfigManager('/test/project');
  });

  it('should load config', async () => {
    mockFs.readFile.mockResolvedValue(JSON.stringify({ test: true }));
    const config = await configManager.loadConfig();
    expect(config.test).toBe(true);
  });
});
```

#### After (Vitest):
```typescript
// test/core/config-manager.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ConfigManager } from '../../src/core/config-manager';
import { promises as fs } from 'fs';

vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
    mkdir: vi.fn()
  }
}));

describe('ConfigManager', () => {
  const mockFs = fs as {
    readFile: ReturnType<typeof vi.fn>;
    writeFile: ReturnType<typeof vi.fn>;
    mkdir: ReturnType<typeof vi.fn>;
  };
  let configManager: ConfigManager;

  beforeEach(() => {
    vi.clearAllMocks();
    configManager = new ConfigManager('/test/project');
  });

  it('should load config', async () => {
    mockFs.readFile.mockResolvedValue(JSON.stringify({ test: true }));
    const config = await configManager.loadConfig();
    expect(config.test).toBe(true);
  });
});
```

## Step 6: Enhanced Mock System (Gemini CLI Pattern)

### test/mocks/index.ts
```typescript
export * from './providers';
export * from './filesystem';
export * from './process';
export * from './git';
```

### test/mocks/providers.ts
```typescript
import { vi } from 'vitest';
import type { Provider, ExecutionResult } from '@/types';

export interface MockProviderBehavior {
  availability?: boolean | (() => boolean);
  executionResult?: Partial<ExecutionResult> | (() => Partial<ExecutionResult>);
  rateLimitAfter?: number;
  delayMs?: number | [number, number]; // Fixed or range
  throwError?: string | Error;
}

export function createMockProvider(
  name: 'claude' | 'gemini',
  behavior: MockProviderBehavior = {}
): Provider {
  let executionCount = 0;

  return {
    name,

    checkAvailability: vi.fn().mockImplementation(async () => {
      if (typeof behavior.availability === 'function') {
        return behavior.availability();
      }
      return behavior.availability ?? true;
    }),

    execute: vi.fn().mockImplementation(async (issueFile: string, planFile: string) => {
      executionCount++;

      // Check rate limit
      if (behavior.rateLimitAfter && executionCount > behavior.rateLimitAfter) {
        throw new Error(`Rate limit exceeded after ${behavior.rateLimitAfter} calls`);
      }

      // Simulate delay
      if (behavior.delayMs) {
        const delay = Array.isArray(behavior.delayMs)
          ? behavior.delayMs[0] + Math.random() * (behavior.delayMs[1] - behavior.delayMs[0])
          : behavior.delayMs;
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Throw error if configured
      if (behavior.throwError) {
        throw typeof behavior.throwError === 'string'
          ? new Error(behavior.throwError)
          : behavior.throwError;
      }

      // Return execution result
      const baseResult: ExecutionResult = {
        success: true,
        issueNumber: parseInt(issueFile.match(/(\d+)/)?.[1] || '0'),
        duration: 1000,
        provider: name
      };

      if (typeof behavior.executionResult === 'function') {
        return { ...baseResult, ...behavior.executionResult() };
      }

      return { ...baseResult, ...behavior.executionResult };
    })
  };
}

// Preset scenarios
export const providerScenarios = {
  alwaysSucceeds: (name: 'claude' | 'gemini') => createMockProvider(name, {
    availability: true,
    executionResult: { success: true }
  }),

  rateLimited: (name: 'claude' | 'gemini', limit = 3) => createMockProvider(name, {
    rateLimitAfter: limit
  }),

  flaky: (name: 'claude' | 'gemini', successRate = 0.7) => createMockProvider(name, {
    executionResult: () => ({
      success: Math.random() < successRate
    })
  }),

  slow: (name: 'claude' | 'gemini') => createMockProvider(name, {
    delayMs: [2000, 5000]
  }),

  unavailable: (name: 'claude' | 'gemini') => createMockProvider(name, {
    availability: false
  })
};
```

### test/mocks/filesystem.ts
```typescript
import { vi } from 'vitest';
import { Volume, createFsFromVolume } from 'memfs';
import type { promises as fsPromises } from 'fs';

export function createMockFileSystem(initialFiles: Record<string, string> = {}) {
  const vol = new Volume();
  const fs = createFsFromVolume(vol) as typeof fsPromises;

  // Initialize with files
  Object.entries(initialFiles).forEach(([filePath, content]) => {
    const dir = filePath.substring(0, filePath.lastIndexOf('/'));
    if (dir) {
      vol.mkdirSync(dir, { recursive: true });
    }
    vol.writeFileSync(filePath, content);
  });

  return {
    fs,
    vol,

    // Helper methods
    async exists(path: string): Promise<boolean> {
      try {
        await fs.access(path);
        return true;
      } catch {
        return false;
      }
    },

    async readJSON(path: string): Promise<any> {
      const content = await fs.readFile(path, 'utf-8');
      return JSON.parse(content);
    },

    async writeJSON(path: string, data: any): Promise<void> {
      await fs.writeFile(path, JSON.stringify(data, null, 2));
    },

    snapshot(): Record<string, string> {
      return vol.toJSON() as Record<string, string>;
    },

    restore(snapshot: Record<string, string>): void {
      vol.reset();
      vol.fromJSON(snapshot);
    },

    reset(): void {
      vol.reset();
    }
  };
}
```

## Step 7: Integration Test Examples

### test/integration/provider-failover.test.ts
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { createMockFileSystem } from '@test/mocks/filesystem';
import { providerScenarios } from '@test/mocks/providers';
import { TestWorkspace } from '@test/utils/workspace';

describe('Provider Failover Integration', () => {
  let workspace: TestWorkspace;

  beforeEach(async () => {
    workspace = await TestWorkspace.create();
    await workspace.setupStandardStructure();
  });

  afterEach(async () => {
    await workspace.cleanup();
  });

  it('should failover from Claude to Gemini on rate limit', async () => {
    // Mock providers with different behaviors
    const claudeProvider = providerScenarios.rateLimited('claude', 2);
    const geminiProvider = providerScenarios.alwaysSucceeds('gemini');

    // Create agent with mocked providers
    const agent = new AutonomousAgent({
      workspace: workspace.path,
      providers: { claude: claudeProvider, gemini: geminiProvider }
    });

    // Execute multiple issues to trigger rate limit
    const results = [];
    for (let i = 1; i <= 5; i++) {
      await workspace.createIssue(i, `Test Issue ${i}`);
      const result = await agent.executeIssue(i);
      results.push(result);
    }

    // First 2 should use Claude
    expect(results[0].provider).toBe('claude');
    expect(results[1].provider).toBe('claude');

    // Rest should failover to Gemini
    expect(results[2].provider).toBe('gemini');
    expect(results[3].provider).toBe('gemini');
    expect(results[4].provider).toBe('gemini');

    // All should succeed
    expect(results.every(r => r.success)).toBe(true);
  });
});
```

## Step 8: E2E Test Example

### test/e2e/full-workflow.test.ts
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { spawn } from 'child_process';
import { promisify } from 'util';
import { TestWorkspace } from '@test/utils/workspace';

const execFile = promisify(require('child_process').execFile);

describe('Full CLI Workflow E2E', () => {
  let workspace: TestWorkspace;

  beforeEach(async () => {
    workspace = await TestWorkspace.create();
    await workspace.setupStandardStructure();
  });

  afterEach(async () => {
    await workspace.cleanup();
  });

  it('should complete full issue lifecycle', async () => {
    const cliPath = require.resolve('../../dist/cli/index.js');

    // Initialize config
    await execFile('node', [cliPath, 'config', 'init'], {
      cwd: workspace.path
    });

    // Create issue
    const { stdout: createOutput } = await execFile('node', [
      cliPath, 'create', 'Implement user authentication'
    ], {
      cwd: workspace.path
    });

    expect(createOutput).toContain('Created issue #1');

    // Execute issue
    const { stdout: runOutput } = await execFile('node', [
      cliPath, 'run', '--provider', 'gemini', '--no-commit'
    ], {
      cwd: workspace.path
    });

    expect(runOutput).toContain('Execution completed successfully');

    // Check status
    const { stdout: statusOutput } = await execFile('node', [
      cliPath, 'status'
    ], {
      cwd: workspace.path
    });

    expect(statusOutput).toContain('Completed: 1');
  }, { timeout: 60000 });
});
```

## Step 9: Benchmark Tests

### test/benchmarks/execution.bench.ts
```typescript
import { bench, describe } from 'vitest';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { TestWorkspace } from '@test/utils/workspace';

describe('Execution Performance', () => {
  let workspace: TestWorkspace;

  beforeAll(async () => {
    workspace = await TestWorkspace.create();
    await workspace.setupStandardStructure();

    // Create test issues
    for (let i = 1; i <= 10; i++) {
      await workspace.createIssue(i, `Benchmark Issue ${i}`);
    }
  });

  afterAll(async () => {
    await workspace.cleanup();
  });

  bench('single issue execution', async () => {
    const agent = new AutonomousAgent({
      workspace: workspace.path,
      autoCommit: false
    });
    await agent.executeIssue(1);
  });

  bench('batch execution (5 issues)', async () => {
    const agent = new AutonomousAgent({
      workspace: workspace.path,
      autoCommit: false
    });

    for (let i = 1; i <= 5; i++) {
      await agent.executeIssue(i);
    }
  });

  bench('provider initialization', () => {
    new AutonomousAgent({ workspace: workspace.path });
  });
});
```

## Step 10: Test Utilities

### test/utils/workspace.ts
```typescript
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class TestWorkspace {
  private constructor(public readonly path: string) {}

  static async create(): Promise<TestWorkspace> {
    const path = await fs.mkdtemp(join(tmpdir(), 'autoagent-test-'));
    return new TestWorkspace(path);
  }

  async setupStandardStructure() {
    // Create directories
    await fs.mkdir(join(this.path, 'issues'), { recursive: true });
    await fs.mkdir(join(this.path, 'plans'), { recursive: true });
    await fs.mkdir(join(this.path, '.autoagent'), { recursive: true });

    // Create standard files
    await this.writeFile('TODO.md', '# To-Do\n\n## Pending Issues\n\n## Completed Issues\n');
    await this.writeFile('CLAUDE.md', '# Claude Instructions\n\n## Project Context\nTest project');
    await this.writeFile('GEMINI.md', '# Gemini Instructions\n\n## Project Context\nTest project');

    // Initialize git
    await this.exec('git init');
    await this.exec('git config user.name "Test User"');
    await this.exec('git config user.email "test@example.com"');
    await this.exec('git add .');
    await this.exec('git commit -m "Initial commit"');

    return this;
  }

  async createIssue(number: number, title: string) {
    const filename = `${number}-${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    await this.writeFile(`issues/${filename}`, `# Issue ${number}: ${title}

## Requirements
Implement ${title}

## Acceptance Criteria
- [ ] Feature implemented
- [ ] Tests written
- [ ] Documentation updated`);

    await this.writeFile(`plans/${number}-plan.md`, `# Plan for Issue ${number}

## Phase 1
- [ ] Implementation
- [ ] Testing`);

    // Update TODO
    const todo = await this.readFile('TODO.md');
    await this.writeFile('TODO.md', todo.replace(
      '## Pending Issues',
      `## Pending Issues\n- [ ] **[Issue #${number}]** ${title}`
    ));
  }

  async writeFile(path: string, content: string) {
    const fullPath = join(this.path, path);
    const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(fullPath, content);
  }

  async readFile(path: string): Promise<string> {
    return fs.readFile(join(this.path, path), 'utf-8');
  }

  async exec(command: string): Promise<{ stdout: string; stderr: string }> {
    return execAsync(command, { cwd: this.path });
  }

  async cleanup() {
    await fs.rm(this.path, { recursive: true, force: true });
  }
}
```

## Migration Checklist

### Phase 1: Setup (Day 1-2)
- [ ] Install Vitest packages
- [ ] Create vitest.config.ts
- [ ] Update package.json scripts
- [ ] Create test/setup.ts
- [ ] Run a simple test to verify setup

### Phase 2: Core Migration (Day 3-7)
- [ ] Migrate test utilities to Vitest
- [ ] Update mock system
- [ ] Migrate unit tests (batch by directory)
- [ ] Fix any import issues
- [ ] Ensure coverage works

### Phase 3: Integration Tests (Week 2)
- [ ] Create integration test structure
- [ ] Write provider failover tests
- [ ] Add workflow integration tests
- [ ] Set up E2E test configuration
- [ ] Add benchmark tests

### Phase 4: CI/CD Update (Week 2)
- [ ] Update GitHub Actions to use Vitest
- [ ] Configure coverage reporting
- [ ] Set up test result reporting
- [ ] Add benchmark tracking

### Phase 5: Cleanup (Week 3)
- [ ] Remove all Jest dependencies
- [ ] Delete Jest configuration
- [ ] Update documentation
- [ ] Train team on Vitest features

## Common Migration Issues and Solutions

### Issue: "Cannot find module 'jest'"
```typescript
// Replace all jest imports
import { vi, describe, it, expect } from 'vitest';
```

### Issue: Mock syntax differences
```typescript
// Jest
jest.fn().mockResolvedValue(value);

// Vitest
vi.fn().mockResolvedValue(value);
```

### Issue: Setup file not running
```typescript
// Ensure setupFiles in vitest.config.ts
test: {
  setupFiles: ['./test/setup.ts']
}
```

### Issue: Snapshot differences
```typescript
// Vitest snapshots are slightly different
// Update snapshots with:
npm run test -- -u
```

## Benefits After Migration

1. **Faster Test Execution**: Vitest is 2-3x faster than Jest
2. **Better TypeScript Support**: No need for ts-jest
3. **Native ESM Support**: Works out of the box
4. **Built-in UI**: `npm run test:ui` for visual debugging
5. **Better Watch Mode**: Smarter file watching
6. **Concurrent Testing**: True parallel test execution
7. **Better Error Messages**: More helpful stack traces

## Next Steps

1. Start with a single test file migration
2. Verify CI/CD still works
3. Gradually migrate remaining tests
4. Add new features (benchmarks, UI testing)
5. Optimize test performance

Remember: You can run Jest and Vitest side-by-side during migration!


// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Enable Jest-like globals for easier migration
    globals: true,

    // Node environment for CLI testing
    environment: 'node',

    // Test file patterns - matches your current structure
    include: [
      'src/**/*.{test,spec}.ts',
      'test/**/*.{test,spec}.ts'
    ],
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      'coverage',
      'test/e2e/**' // E2E tests use separate config
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'coverage/**',
        'dist/**',
        'node_modules/**',
        'test/**',
        'examples/**',
        'docs/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/index.ts', // Usually just exports
        'src/cli/**' // CLI is tested via integration tests
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      },
      clean: true,
      cleanOnRerun: true
    },

    // Setup files
    setupFiles: ['./test/setup.ts'],

    // Timeouts
    testTimeout: 30000,
    hookTimeout: 30000,

    // Threading for performance
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: 4,
        minThreads: 1,
        useAtomics: true
      }
    },

    // Reporter configuration
    reporters: process.env.CI
      ? ['default', 'json', 'junit']
      : ['default'],
    outputFile: {
      json: './coverage/test-results.json',
      junit: './coverage/junit.xml'
    },

    // Watch mode configuration
    watchExclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],

    // Retry flaky tests
    retry: process.env.CI ? 2 : 0,

    // Randomize test order to catch order dependencies
    sequence: {
      shuffle: true
    }
  },

  // Path aliases matching your tsconfig
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@test': resolve(__dirname, './test'),
      '@types': resolve(__dirname, './src/types'),
      '@core': resolve(__dirname, './src/core'),
      '@providers': resolve(__dirname, './src/providers'),
      '@utils': resolve(__dirname, './src/utils')
    }
  }
});

// vitest.config.integration.ts
import { defineConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ['test/integration/**/*.test.ts'],
    // Longer timeouts for integration tests
    testTimeout: 60000,
    hookTimeout: 60000,
    // Run integration tests sequentially
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
        maxForks: 1,
        minForks: 1
      }
    }
  }
});

// vitest.config.e2e.ts
import { defineConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ['test/e2e/**/*.test.ts'],
    // Even longer timeouts for E2E tests
    testTimeout: 120000,
    hookTimeout: 120000,
    // Definitely sequential for E2E
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
        maxForks: 1,
        minForks: 1
      }
    },
    // No retries for E2E in development
    retry: process.env.CI ? 1 : 0
  }
});

// test/setup.ts
import { expect, afterEach, beforeAll, vi } from 'vitest';
import type { ExecutionResult, Issue } from '@/types';

// Set test environment
beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.AUTOAGENT_SILENT = 'true';

  // Mock console methods to reduce noise
  global.console = {
    ...console,
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    // Keep error for debugging
    error: console.error
  };
});

// Cleanup after each test
afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

// Custom matchers for AutoAgent
expect.extend({
  toBeSuccessfulExecution(received: ExecutionResult) {
    const pass =
      received?.success === true &&
      !received?.error &&
      received?.issueNumber > 0 &&
      received?.duration >= 0;

    return {
      pass,
      message: () =>
        pass
          ? `Expected execution to fail`
          : `Expected successful execution but got: ${JSON.stringify(received, null, 2)}`
    };
  },

  toHaveProviderHistory(content: string, provider: string) {
    const hasHistory =
      content.includes('## Execution History') &&
      content.includes(provider);

    return {
      pass: hasHistory,
      message: () =>
        `Expected content to ${hasHistory ? 'not ' : ''}contain ${provider} execution history`
    };
  },

  toBeValidIssue(received: Issue) {
    const errors: string[] = [];

    if (!received?.number || received.number <= 0) {
      errors.push('Issue number must be positive');
    }
    if (!received?.title?.trim()) {
      errors.push('Issue must have a title');
    }
    if (!received?.requirements?.trim()) {
      errors.push('Issue must have requirements');
    }
    if (!Array.isArray(received?.acceptanceCriteria) || received.acceptanceCriteria.length === 0) {
      errors.push('Issue must have acceptance criteria');
    }

    return {
      pass: errors.length === 0,
      message: () =>
        errors.length === 0
          ? `Expected issue to be invalid`
          : `Invalid issue:\n${errors.map(e => `  - ${e}`).join('\n')}`
    };
  },

  toContainTodoItem(content: string, issueNumber: number, completed = false) {
    const checkbox = completed ? '[x]' : '[ ]';
    const pattern = new RegExp(`- \\${checkbox}.*Issue #${issueNumber}`, 'm');
    const contains = pattern.test(content);

    return {
      pass: contains,
      message: () =>
        `Expected TODO to ${contains ? 'not ' : ''}contain ${completed ? 'completed' : 'pending'} issue #${issueNumber}`
    };
  }
});

// Global test utilities
declare global {
  namespace Vi {
    interface Assertion {
      toBeSuccessfulExecution(): void;
      toHaveProviderHistory(provider: string): void;
      toBeValidIssue(): void;
      toContainTodoItem(issueNumber: number, completed?: boolean): void;
    }
  }
}

// Mock timers utility
export function useFakeTimers() {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  return {
    advance: (ms: number) => vi.advanceTimersByTime(ms),
    runAll: () => vi.runAllTimers(),
    runPending: () => vi.runOnlyPendingTimers()
  };
}

// Test data factories
export const factories = {
  issue: (overrides: Partial<Issue> = {}): Issue => ({
    number: 1,
    title: 'Test Issue',
    file: 'issues/1-test-issue.md',
    requirements: 'Test requirements',
    acceptanceCriteria: ['Test criteria 1', 'Test criteria 2'],
    ...overrides
  }),

  executionResult: (overrides: Partial<ExecutionResult> = {}): ExecutionResult => ({
    success: true,
    issueNumber: 1,
    duration: 1000,
    provider: 'claude',
    ...overrides
  })
};

// package.json updates
const packageJsonUpdates = {
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:unit": "vitest run src",
    "test:integration": "vitest run --config vitest.config.integration.ts",
    "test:e2e": "vitest run --config vitest.config.e2e.ts",
    "test:coverage": "vitest run --coverage",
    "test:coverage:ui": "vitest --coverage --ui",
    "test:bench": "vitest bench",
    "test:ci": "vitest run --coverage --reporter=json --reporter=junit --reporter=default",
    "test:debug": "vitest --inspect-brk --inspect --logHeapUsage --threads=false",
    "test:affected": "vitest --changed HEAD~1",
    "test:related": "vitest --findRelatedTests"
  },
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "@vitest/runner": "^1.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "happy-dom": "^12.0.0",
    "memfs": "^4.0.0"
  }
};

// Example migrated test file
// test/core/autonomous-agent.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { createMockProvider } from '@test/mocks/providers';
import { TestWorkspace } from '@test/utils/workspace';
import { factories } from '@test/setup';

describe('AutonomousAgent', () => {
  let workspace: TestWorkspace;
  let agent: AutonomousAgent;

  beforeEach(async () => {
    workspace = await TestWorkspace.create();
    await workspace.setupStandardStructure();
    agent = new AutonomousAgent({
      workspace: workspace.path,
      autoCommit: false
    });
  });

  afterEach(async () => {
    await workspace.cleanup();
  });

  describe('executeIssue', () => {
    it('should execute an issue successfully', async () => {
      // Create test issue
      await workspace.createIssue(1, 'Test Issue');

      // Mock provider
      const mockProvider = createMockProvider('claude', {
        executionResult: { success: true, output: 'Task completed' }
      });

      vi.mocked(createProvider).mockReturnValue(mockProvider);

      // Execute
      const result = await agent.executeIssue(1);

      // Assertions using custom matchers
      expect(result).toBeSuccessfulExecution();
      expect(result.provider).toBe('claude');

      // Verify TODO was updated
      const todo = await workspace.readFile('TODO.md');
      expect(todo).toContainTodoItem(1, true);
    });

    it('should handle execution failure', async () => {
      await workspace.createIssue(1, 'Test Issue');

      const mockProvider = createMockProvider('claude', {
        throwError: 'Execution failed'
      });

      vi.mocked(createProvider).mockReturnValue(mockProvider);

      const result = await agent.executeIssue(1);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Execution failed');

      // TODO should not be marked complete
      const todo = await workspace.readFile('TODO.md');
      expect(todo).toContainTodoItem(1, false);
    });
  });

  describe('provider failover', () => {
    it('should failover to Gemini when Claude is rate limited', async () => {
      await workspace.createIssue(1, 'Test Issue');

      // Mock Claude to fail with rate limit
      const claudeMock = createMockProvider('claude', {
        throwError: 'Rate limit exceeded'
      });

      // Mock Gemini to succeed
      const geminiMock = createMockProvider('gemini', {
        executionResult: { success: true }
      });

      // Setup provider mocks
      vi.mocked(createProvider)
        .mockReturnValueOnce(claudeMock)
        .mockReturnValueOnce(geminiMock);

      const result = await agent.executeIssue(1);

      expect(result).toBeSuccessfulExecution();
      expect(result.provider).toBe('gemini');
    });
  });
});

## Example GitHub Actions workflow for Vitest
```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
        test-suite: [unit, integration]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run \${{ matrix.test-suite }} tests
        run: npm run test:\${{ matrix.test-suite }}

      - name: Upload coverage
        if: matrix.test-suite == 'unit' && matrix.node-version == '20'
        uses: codecov/codecov-action@v3
        with:
          directory: ./coverage
          flags: unittests
          fail_ci_if_error: true

  e2e:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run E2E tests
        run: npm run test:e2e
        timeout-minutes: 30

  coverage-check:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Check coverage thresholds
        run: npm run test:coverage

      - name: Generate coverage report
        uses: davelosert/vitest-coverage-report-action@v2
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}
```