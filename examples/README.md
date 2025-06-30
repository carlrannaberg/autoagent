# AutoAgent Examples

This directory contains examples demonstrating various features and usage patterns of the AutoAgent package.

## Examples Overview

### 🚀 Getting Started

- **[basic-usage.js](basic-usage.js)** - Start here! Shows the simplest way to use AutoAgent
- **[cli-usage.js](cli-usage.js)** - Complete CLI command reference with examples

### 🔧 Core Features

- **[configuration.js](configuration.js)** - How to configure AutoAgent for different scenarios
- **[batch-execution.js](batch-execution.js)** - Execute multiple issues with progress tracking
- **[provider-failover.js](provider-failover.js)** - Automatic failover between AI providers

### 🎨 Advanced Usage

- **[custom-integration.js](custom-integration.js)** - Extend AutoAgent with custom functionality

## Running the Examples

All examples can be run directly with Node.js:

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

### 1. Basic Setup
```javascript
const { AutonomousAgent, FileManager, ConfigManager } = require('autoagent-cli');

const fileManager = new FileManager(process.cwd());
const configManager = new ConfigManager(process.cwd());
const agent = new AutonomousAgent(fileManager, configManager);
```

### 2. Progress Tracking
```javascript
agent.on('progress', (data) => {
  console.log(`[${data.phase}] ${data.message} - ${data.percentage}%`);
});
```

### 3. Error Handling
```javascript
try {
  const result = await agent.executeNext();
  if (!result.success) {
    console.error('Execution failed:', result.error);
  }
} catch (error) {
  console.error('Unexpected error:', error);
}
```

## Need Help?

- Check the [main README](../README.md) for general documentation
- Look at the [templates](../templates/) for issue and plan formats
- Run `autoagent --help` for CLI documentation

## Contributing

Have a useful example? Feel free to submit a pull request!