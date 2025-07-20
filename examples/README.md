# AutoAgent Examples

This directory contains examples demonstrating various features and usage patterns of the AutoAgent package.

## Examples Overview

### 🚀 Getting Started

- **[basic-usage.js](basic-usage.js)** - Start here! Shows the simplest way to use AutoAgent
- **[cli-usage.js](cli-usage.js)** - Complete CLI command reference with examples
- **[spec-driven-workflow.js](spec-driven-workflow.js)** - NEW! Spec → Implementation workflow

### 🔧 Core Features

- **[configuration.js](configuration.js)** - How to configure AutoAgent for different scenarios
- **[batch-execution.js](batch-execution.js)** - Execute multiple issues with progress tracking
- **[provider-failover.js](provider-failover.js)** - Automatic failover between AI providers

### 📋 STM (Simple Task Master) Integration

- **[stm-usage.ts](stm-usage.ts)** - Complete STM workflow demonstration with task creation and management
- **[plan-creation.ts](plan-creation.ts)** - Creating and managing STM tasks (updated from legacy plans)
- **[task-status-reporter-example.ts](task-status-reporter-example.ts)** - Task execution reporting and status display

### 🎨 Advanced Usage

- **[custom-integration.js](custom-integration.js)** - Extend AutoAgent with custom functionality

## Running the Examples

### JavaScript Examples (Node.js)
```bash
# Basic usage
node examples/basic-usage.js

# See CLI commands (add --demo for live execution)
node examples/cli-usage.js --demo

# Test provider failover
node examples/provider-failover.js

# Run batch execution
node examples/batch-execution.js

# Explore configuration options
node examples/configuration.js

# Advanced integrations
node examples/custom-integration.js
```

### TypeScript Examples (with ts-node or compilation)
```bash
# STM workflow demonstration
npx ts-node examples/stm-usage.ts

# STM task creation (updated from plan creation)
npx ts-node examples/plan-creation.ts

# Task status reporting
npx ts-node examples/task-status-reporter-example.ts

# Alternative: Compile and run
npx tsc examples/stm-usage.ts && node examples/stm-usage.js
```

## Prerequisites

Make sure you have AutoAgent installed:

```bash
# Install globally
npm install -g autoagent-cli

# Or install locally
npm install autoagent-cli
```

## Example Structure

Each example is self-contained and includes:
- Clear comments explaining what's happening
- Error handling demonstrations
- Expected output examples
- Real-world use cases

## Common Patterns

### 1. STM Task Management Setup
```typescript
import { STMManager } from 'autoagent-cli/utils/stm-manager';
import { TaskContent } from 'autoagent-cli/types/stm-types';

const stmManager = new STMManager();

const taskContent: TaskContent = {
  description: 'What needs to be done',
  technicalDetails: 'How to implement it',
  implementationPlan: 'Step-by-step plan',
  acceptanceCriteria: ['Criterion 1', 'Criterion 2']
};

const taskId = await stmManager.createTask('Task Title', taskContent);
```

### 2. Task Status Management
```typescript
// Mark task as in progress
await stmManager.markTaskInProgress(taskId);

// Complete a task
await stmManager.markTaskComplete(taskId);

// Search and filter tasks
const tasks = await stmManager.searchTasks('API', {
  status: 'pending',
  tags: ['backend']
});
```

### 3. Error Handling with STM
```typescript
import { STMError } from 'autoagent-cli/utils/stm-manager';

try {
  const task = await stmManager.getTask('invalid-id');
} catch (error) {
  if (error instanceof STMError) {
    console.error(`STM Error: ${error.message} (${error.operation})`);
  }
}
```

### 4. Task Execution Status Reporting
```typescript
import { TaskStatusReporter } from 'autoagent-cli/utils/status-reporter';

const reporter = new TaskStatusReporter();
const result: ExecutionResult = {
  success: true,
  taskId: '123',
  duration: 5000,
  // ... other result data
};

reporter.reportCompletion(result);
```

## Need Help?

- Check the [main README](../README.md) for general documentation
- Look at the [templates](../templates/) for issue and plan formats
- Run `autoagent --help` for CLI documentation

## Contributing

Have a useful example? Feel free to submit a pull request!