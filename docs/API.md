# AutoAgent API Documentation

This document provides comprehensive documentation for using AutoAgent programmatically in your Node.js applications.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Classes](#core-classes)
  - [AutonomousAgent](#autonomousagent)
  - [ConfigManager](#configmanager)
  - [FileManager](#filemanager)
  - [Providers](#providers)
- [Utility Classes](#utility-classes)
  - [Logger](#logger)
  - [Git Utilities](#git-utilities)
  - [Retry Utilities](#retry-utilities)
- [Type Definitions](#type-definitions)
- [Events](#events)
- [Error Handling](#error-handling)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install autoagent-cli
```

## Quick Start

### Basic Usage

```typescript
import { AutonomousAgent, ConfigManager, FileManager } from 'autoagent-cli';

async function main() {
  // Initialize managers
  const config = new ConfigManager();
  const files = new FileManager();
  
  // Create agent
  const agent = new AutonomousAgent(config, files);
  
  // Execute next pending issue
  const result = await agent.executeNext();
  
  if (result.success) {
    console.log(`Completed: ${result.issueTitle}`);
  }
}

main().catch(console.error);
```

### TypeScript Usage

```typescript
import { 
  AutonomousAgent, 
  ConfigManager, 
  FileManager,
  ExecutionResult,
  ExecutionOptions 
} from 'autoagent-cli';

async function executeWithOptions(): Promise<ExecutionResult> {
  const config = new ConfigManager('./my-project');
  const files = new FileManager('./my-project');
  const agent = new AutonomousAgent(config, files);
  
  const options: ExecutionOptions = {
    provider: 'claude',
    dryRun: false,
    autoCommit: true,
    onProgress: (percent: number, message: string) => {
      console.log(`[${percent}%] ${message}`);
    }
  };
  
  return await agent.executeNext(options);
}
```

## Core Classes

### AutonomousAgent

The main class for executing AI tasks autonomously.

#### Constructor

```typescript
constructor(
  configManager: ConfigManager,
  fileManager: FileManager
)
```

#### Methods

##### executeIssue

Execute a specific issue file.

```typescript
async executeIssue(
  issuePath: string,
  options?: ExecutionOptions
): Promise<ExecutionResult>
```

**Parameters:**
- `issuePath` (string): Path to the issue file
- `options` (ExecutionOptions): Optional execution options

**Returns:** `ExecutionResult`

**Example:**
```typescript
const result = await agent.executeIssue('issues/5-add-auth.md', {
  provider: 'gemini',
  autoCommit: false
});
```

##### executeNext

Execute the next pending issue from the todo list.

```typescript
async executeNext(
  options?: ExecutionOptions
): Promise<ExecutionResult>
```

**Example:**
```typescript
const result = await agent.executeNext({
  onProgress: (percent, message) => {
    console.log(`Progress: ${percent}% - ${message}`);
  }
});
```

##### executeAll

Execute all pending issues.

```typescript
async executeAll(
  options?: ExecutionOptions
): Promise<ExecutionResult[]>
```

**Example:**
```typescript
const results = await agent.executeAll({
  dryRun: false,
  autoCommit: true
});

console.log(`Completed ${results.filter(r => r.success).length} issues`);
```

##### createIssue

Create a new issue with AI assistance.

```typescript
async createIssue(
  description: string,
  options?: { provider?: string }
): Promise<{ issuePath: string; planPath: string }>
```

**Example:**
```typescript
const { issuePath, planPath } = await agent.createIssue(
  'Add user authentication system',
  { provider: 'claude' }
);
```

##### bootstrap

Create a bootstrap issue from a master plan.

```typescript
async bootstrap(
  planFile?: string
): Promise<{ issuePath: string; planPath: string }>
```

**Example:**
```typescript
const { issuePath } = await agent.bootstrap('master-plan.md');
```

##### getStatus

Get current project status.

```typescript
async getStatus(): Promise<Status>
```

**Example:**
```typescript
const status = await agent.getStatus();
console.log(`Pending issues: ${status.pendingCount}`);
console.log(`Next issue: ${status.nextIssue?.title}`);
```

##### cancel

Cancel ongoing execution.

```typescript
cancel(): void
```

#### Events

The AutonomousAgent extends EventEmitter and emits the following events:

- `progress`: Emitted during execution with progress updates
- `provider-switch`: Emitted when switching providers
- `execution-start`: Emitted when starting execution
- `execution-complete`: Emitted when execution completes

**Example:**
```typescript
agent.on('progress', (data) => {
  console.log(`${data.percentage}% - ${data.message}`);
});

agent.on('provider-switch', (data) => {
  console.log(`Switching from ${data.from} to ${data.to}`);
});
```

### ConfigManager

Manages configuration and rate limits.

#### Constructor

```typescript
constructor(workspace?: string)
```

#### Methods

##### getConfig

Get merged configuration.

```typescript
getConfig(): UserConfig
```

##### updateConfig

Update configuration values.

```typescript
async updateConfig(
  updates: Partial<UserConfig>,
  scope: 'global' | 'local' = 'local'
): Promise<void>
```

**Example:**
```typescript
await config.updateConfig({
  defaultProvider: 'gemini',
  gitAutoCommit: false
}, 'local');
```

##### checkProviderAvailability

Check if a provider is available (not rate limited).

```typescript
async checkProviderAvailability(
  provider: string
): Promise<boolean>
```

##### recordRateLimit

Record a rate limit error for a provider.

```typescript
async recordRateLimit(
  provider: string,
  error?: string
): Promise<void>
```

##### clearRateLimit

Clear rate limit for a provider.

```typescript
async clearRateLimit(provider?: string): Promise<void>
```

### FileManager

Handles file operations for issues, plans, and todos.

#### Constructor

```typescript
constructor(workspace?: string)
```

#### Methods

##### createIssue

Create a new issue file.

```typescript
async createIssue(
  title: string,
  content: string
): Promise<{ number: number; path: string }>
```

##### readIssue

Read an issue file.

```typescript
async readIssue(path: string): Promise<Issue>
```

##### createPlan

Create a plan file.

```typescript
async createPlan(
  issueNumber: number,
  title: string,
  content: string
): Promise<string>
```

##### readPlan

Read a plan file.

```typescript
async readPlan(path: string): Promise<Plan>
```

##### readTodo

Read the todo list.

```typescript
async readTodo(): Promise<string>
```

##### updateTodo

Update the todo list.

```typescript
async updateTodo(content: string): Promise<void>
```

##### getNextIssue

Get the next pending issue.

```typescript
async getNextIssue(): Promise<{
  issueNumber: number;
  title: string;
  path: string;
} | null>
```

### Providers

#### Creating Providers

```typescript
import { createProvider, Provider } from 'autoagent-cli';

// Create a provider instance
const provider = createProvider('claude');

// Check availability
const available = await provider.checkAvailability();

// Execute an issue
if (available) {
  await provider.execute('issues/1-setup.md');
}
```

#### Custom Provider Implementation

```typescript
import { Provider, ProviderType } from 'autoagent-cli';

class CustomProvider extends Provider {
  name: ProviderType = 'custom' as ProviderType;
  
  async checkAvailability(): Promise<boolean> {
    // Check if your provider is available
    return true;
  }
  
  async execute(
    issueFile: string,
    signal?: AbortSignal
  ): Promise<void> {
    // Implement execution logic
    const issue = await this.readIssue(issueFile);
    
    // Call your AI service
    const result = await this.callAI(issue);
    
    // Handle result
    if (!result.success) {
      throw new Error(result.error);
    }
  }
  
  private async callAI(issue: any): Promise<any> {
    // Your AI service implementation
  }
}
```

## Utility Classes

### Logger

Provides formatted console output with color support.

```typescript
import { Logger } from 'autoagent-cli';

const logger = new Logger({
  prefix: '[AutoAgent]',
  enableColors: true,
  enableTimestamps: true
});

// Log levels
logger.info('Starting execution');
logger.success('Task completed');
logger.warn('Rate limit approaching');
logger.error('Execution failed', new Error('Details'));
logger.debug('Debug information');

// Progress bar
logger.progress(75, 'Processing files...');

// Utilities
logger.newline();
logger.clear();
```

### Git Utilities

Git integration utilities.

```typescript
import { 
  isGitRepository,
  getGitStatus,
  createCommit,
  hasChangesToCommit,
  getChangedFiles 
} from 'autoagent-cli';

// Check git status
const status = await getGitStatus();
console.log(`Branch: ${status.branch}`);
console.log(`Clean: ${status.isClean}`);

// Create a commit
if (await hasChangesToCommit()) {
  const files = await getChangedFiles();
  await createCommit(
    'feat: Add authentication',
    'Claude <claude@autoagent-cli>'
  );
}
```

### Retry Utilities

Retry failed operations with exponential backoff.

```typescript
import { 
  retry,
  retryWithJitter,
  createRetryableFunction,
  isRateLimitError 
} from 'autoagent-cli';

// Basic retry
const result = await retry(
  async () => {
    return await fetchData();
  },
  {
    maxAttempts: 3,
    initialDelay: 1000,
    backoffMultiplier: 2
  }
);

// Retry with jitter
const data = await retryWithJitter(
  async () => await apiCall(),
  { maxAttempts: 5 }
);

// Create retryable function
const retryableApi = createRetryableFunction(
  apiCall,
  { maxAttempts: 3 }
);

const result = await retryableApi(params);
```

## Type Definitions

### ExecutionOptions

```typescript
interface ExecutionOptions {
  provider?: string;
  dryRun?: boolean;
  autoCommit?: boolean;
  onProgress?: (percentage: number, message: string) => void;
  signal?: AbortSignal;
}
```

### ExecutionResult

```typescript
interface ExecutionResult {
  success: boolean;
  issueNumber?: number;
  issueTitle?: string;
  issueFile?: string;
  planFile?: string;
  provider?: string;
  duration?: number;
  error?: string;
  filesModified?: string[];
  gitCommit?: string;
}
```

### Issue

```typescript
interface Issue {
  number: number;
  title: string;
  description?: string;
  requirements?: string[];
  acceptanceCriteria?: string[];
  technicalDetails?: string;
  resources?: string[];
  content: string;
}
```

### Plan

```typescript
interface Plan {
  issueNumber: number;
  title: string;
  phases: Phase[];
  technicalApproach?: string;
  challenges?: string;
  content: string;
}

interface Phase {
  name: string;
  tasks: string[];
}
```

### UserConfig

```typescript
interface UserConfig {
  defaultProvider: string;
  providers: {
    [key: string]: {
      enabled: boolean;
      maxTokens?: number;
      timeout?: number;
      customArgs?: string[];
    };
  };
  failoverProviders: string[];
  failoverDelay: number;
  retryAttempts: number;
  retryDelay: number;
  maxTokens: number;
  rateLimitCooldown: number;
  gitAutoCommit: boolean;
  gitCommitInterval: number;
  includeCoAuthoredBy: boolean;
  enableRollback: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  customInstructions: string;
  workspace: string;
  issuesDir: string;
  plansDir: string;
  todoFile: string;
}
```

### Status

```typescript
interface Status {
  provider: string;
  providerAvailable: boolean;
  pendingCount: number;
  completedCount: number;
  nextIssue: {
    number: number;
    title: string;
    path: string;
  } | null;
  git: {
    initialized: boolean;
    branch: string;
    isClean: boolean;
  };
}
```

## Events

### AgentEvent Types

```typescript
type AgentEvent = 
  | 'progress'
  | 'execution-start'
  | 'execution-complete'
  | 'provider-switch'
  | 'git-commit'
  | 'error';
```

### Event Listeners

```typescript
// Progress events
agent.on('progress', (data: {
  percentage: number;
  message: string;
  phase?: string;
}) => {
  console.log(`${data.percentage}% - ${data.message}`);
});

// Execution lifecycle
agent.on('execution-start', (data: {
  issueNumber: number;
  issueTitle: string;
  provider: string;
}) => {
  console.log(`Starting: ${data.issueTitle}`);
});

agent.on('execution-complete', (data: ExecutionResult) => {
  console.log(`Completed: ${data.issueTitle}`);
});

// Provider events
agent.on('provider-switch', (data: {
  from: string;
  to: string;
  reason: string;
}) => {
  console.log(`Switching providers: ${data.reason}`);
});

// Git events
agent.on('git-commit', (data: {
  hash: string;
  message: string;
}) => {
  console.log(`Committed: ${data.hash}`);
});
```

## Error Handling

### Error Types

```typescript
import { 
  RateLimitError, 
  RetryError, 
  ProviderError 
} from 'autoagent-cli';

try {
  await agent.executeNext();
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after: ${error.retryAfter}`);
  } else if (error instanceof RetryError) {
    console.log(`Failed after ${error.attempts} attempts`);
  } else if (error instanceof ProviderError) {
    console.log(`Provider error: ${error.provider} - ${error.message}`);
  }
}
```

### Handling Cancellation

```typescript
const controller = new AbortController();

// Cancel after 5 minutes
setTimeout(() => controller.abort(), 5 * 60 * 1000);

try {
  await agent.executeAll({
    signal: controller.signal
  });
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Execution cancelled');
  }
}
```

## Advanced Usage

### Batch Processing with Concurrency

```typescript
import { AutonomousAgent, ConfigManager, FileManager } from 'autoagent-cli';

async function batchProcess() {
  const config = new ConfigManager();
  const files = new FileManager();
  const agent = new AutonomousAgent(config, files);
  
  // Get all pending issues
  const todoContent = await files.readTodo();
  const pendingIssues = parsePendingIssues(todoContent);
  
  // Process in batches
  const batchSize = 3;
  const results: ExecutionResult[] = [];
  
  for (let i = 0; i < pendingIssues.length; i += batchSize) {
    const batch = pendingIssues.slice(i, i + batchSize);
    
    const batchResults = await Promise.all(
      batch.map(issue => 
        agent.executeIssue(issue.path).catch(err => ({
          success: false,
          error: err.message,
          issueFile: issue.path
        }))
      )
    );
    
    results.push(...batchResults);
  }
  
  return results;
}
```

### Custom Progress Tracking

```typescript
class ProgressTracker {
  private startTime: number;
  private completed: number = 0;
  private total: number;
  
  constructor(total: number) {
    this.total = total;
    this.startTime = Date.now();
  }
  
  update(completed: number, message: string) {
    this.completed = completed;
    const percentage = Math.round((completed / this.total) * 100);
    const elapsed = Date.now() - this.startTime;
    const rate = completed / (elapsed / 1000); // per second
    const remaining = (this.total - completed) / rate;
    
    console.log(`[${percentage}%] ${message}`);
    console.log(`Rate: ${rate.toFixed(2)}/s, ETA: ${remaining.toFixed(0)}s`);
  }
}

// Usage
const tracker = new ProgressTracker(10);

agent.on('execution-complete', (result) => {
  tracker.update(++completed, `Completed: ${result.issueTitle}`);
});
```

### Provider Learning Integration

```typescript
import { ProviderLearning } from 'autoagent-cli';

const learning = new ProviderLearning('./my-project');

// After execution
agent.on('execution-complete', async (result) => {
  if (result.success) {
    await learning.recordExecution(result);
    await learning.updateProviderInstructions();
  }
});

// Get insights
const insights = await learning.generateInsights('claude');
console.log('Provider insights:', insights);
```

### Rollback Support

```typescript
import { capturePreExecutionState, rollback } from 'autoagent-cli';

// Capture state before execution
const rollbackData = await capturePreExecutionState();

try {
  const result = await agent.executeNext();
  
  if (!result.success) {
    // Rollback on failure
    await rollback(rollbackData);
    console.log('Rolled back to previous state');
  }
} catch (error) {
  await rollback(rollbackData);
  throw error;
}
```

## API Reference

### Exports

```typescript
// Classes
export { AutonomousAgent } from './core/autonomous-agent';
export { ConfigManager } from './core/config-manager';
export { FileManager } from './utils/file-manager';
export { Provider } from './providers/base';
export { ClaudeProvider } from './providers/claude';
export { GeminiProvider } from './providers/gemini';
export { Logger } from './utils/logger';
export { ProviderLearning } from './core/provider-learning';
export { PatternAnalyzer } from './core/pattern-analyzer';

// Functions
export { createProvider, isProviderAvailable } from './providers';
export { retry, retryWithJitter, createRetryableFunction } from './utils/retry';
export * from './utils/git';

// Types
export * from './types';

// Errors
export { RateLimitError, RetryError } from './utils/retry';
```

### Package Structure

```
autoagent/
├── dist/                    # Compiled JavaScript
│   ├── index.js            # Main entry point
│   ├── index.d.ts          # TypeScript declarations
│   └── ...
├── src/                    # Source code
│   ├── core/              # Core functionality
│   ├── providers/         # AI providers
│   ├── utils/             # Utilities
│   ├── types/             # TypeScript types
│   └── cli/               # CLI implementation
└── package.json           # Package manifest
```

---

For more examples and use cases, check out the [examples directory](https://github.com/yourusername/autoagent/tree/main/examples) in the repository.