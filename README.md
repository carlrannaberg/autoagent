# AutoAgent

> Autonomous AI agent runner for executing tasks with Claude or Gemini, featuring automatic failover and comprehensive task management.

[![npm version](https://img.shields.io/npm/v/autoagent-cli.svg)](https://www.npmjs.com/package/autoagent-cli)
[![Test and Lint](https://github.com/yourusername/autoagent/actions/workflows/test.yaml/badge.svg)](https://github.com/yourusername/autoagent/actions/workflows/test.yaml)
[![Release](https://github.com/yourusername/autoagent/actions/workflows/release.yaml/badge.svg)](https://github.com/yourusername/autoagent/actions/workflows/release.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/autoagent-cli.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)

## Overview

AutoAgent is a powerful npm package that enables running autonomous AI agents using Claude or Gemini for task execution. It converts complex bash scripts into a robust TypeScript-based solution with both CLI and programmatic APIs.

### Key Features

- 🤖 **Multiple AI Providers**: Support for Claude (Anthropic) and Gemini (Google)
- 🔄 **Automatic Failover**: Seamlessly switches between providers on rate limits
- 📋 **Task Management**: Comprehensive issue and plan tracking system
- 🔧 **Git Integration**: Automatic commits with co-authorship attribution
- 📊 **Provider Learning**: Tracks performance and learns from execution patterns
- ⚡ **Async Execution**: Efficient async/await based architecture
- 🛡️ **TypeScript**: Full type safety and IntelliSense support
- 🎯 **Retry Logic**: Intelligent retry with exponential backoff
- 📁 **Template System**: Pre-built templates for issues and plans
- 🚀 **CLI & API**: Use as a command-line tool or programmatically

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [CLI Usage](#cli-usage)
- [Programmatic Usage](#programmatic-usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Architecture](#architecture)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js >= 22.0.0
- npm or yarn
- Claude CLI (`claude`) or Gemini CLI (`gemini`) installed and authenticated

### Global Installation

```bash
npm install -g autoagent-cli
```

### Local Installation

```bash
npm install autoagent-cli
```

### From Source

```bash
git clone https://github.com/yourusername/autoagent.git
cd autoagent
npm install
npm run build
npm link  # For global CLI access
```

## Quick Start

### 1. Initialize Configuration

```bash
# Create a local configuration
autoagent config init

# Or create a global configuration
autoagent config init --global
```

### 2. Create Your First Issue

```bash
# Create an issue with AI assistance
autoagent create "Add user authentication to the API"

# Or manually create an issue file
echo "# Issue: Add Authentication

## Description
Implement JWT-based authentication for the REST API.

## Requirements
- User login endpoint
- Token generation
- Middleware for protected routes" > issues/1-add-authentication.md
```

### 3. Execute the Issue

```bash
# Execute with default provider
autoagent run

# Execute with specific provider
autoagent run --provider gemini

# Execute a specific issue
autoagent run issues/1-add-authentication.md
```

## CLI Usage

### Core Commands

#### `autoagent run [issue]`
Execute one or all pending issues.

```bash
# Run next pending issue
autoagent run

# Run specific issue
autoagent run issues/5-update-dependencies.md

# Run all pending issues
autoagent run --all

# Dry run (preview without execution)
autoagent run --dry-run

# Override provider
autoagent run --provider gemini

# Disable auto-commit
autoagent run --no-auto-commit
```

#### `autoagent create <description>`
Create a new issue with AI assistance.

```bash
# Basic usage
autoagent create "Implement user profile page"

# With specific provider
autoagent create "Add caching layer" --provider claude
```

#### `autoagent status`
Display project status and pending issues.

```bash
autoagent status
```

Output:
```
AutoAgent Status
================
Provider: claude (available)
Pending Issues: 3
Completed Issues: 12
Next Issue: #16 - Add error handling
Git: main branch (clean)
```

#### `autoagent config`
Manage configuration settings.

```bash
# Initialize configuration
autoagent config init [--global]

# Set default provider
autoagent config set-provider gemini

# Set failover order
autoagent config set-failover claude,gemini

# Enable/disable auto-commit
autoagent config set-auto-commit true

# Show current configuration
autoagent config show

# Clear rate limits
autoagent config clear-limits
```

#### `autoagent check`
Verify provider availability.

```bash
# Check all providers
autoagent check

# Check specific provider
autoagent check claude
```

#### `autoagent bootstrap`
Create initial issue from master plan.

```bash
# Create bootstrap issue from master-plan.md
autoagent bootstrap
```

### Command Options

Most commands support these common options:

- `--workspace, -w <path>`: Set working directory
- `--debug, -d`: Enable debug logging
- `--provider, -p <name>`: Override provider
- `--help, -h`: Show help

## Programmatic Usage

### Basic Example

```typescript
import { AutonomousAgent, ConfigManager, FileManager } from 'autoagent';

async function runAgent() {
  // Initialize components
  const configManager = new ConfigManager();
  const fileManager = new FileManager();
  
  // Create agent instance
  const agent = new AutonomousAgent(configManager, fileManager);
  
  // Execute a single issue
  const result = await agent.executeIssue('issues/1-setup-project.md');
  
  if (result.success) {
    console.log('Issue completed successfully!');
  }
}
```

### Advanced Usage

```typescript
import { 
  AutonomousAgent, 
  ConfigManager, 
  FileManager,
  createProvider 
} from 'autoagent';

async function advancedExample() {
  const config = new ConfigManager('./my-project');
  const files = new FileManager('./my-project');
  const agent = new AutonomousAgent(config, files);
  
  // Listen to progress events
  agent.on('progress', (data) => {
    console.log(`Progress: ${data.percentage}% - ${data.message}`);
  });
  
  // Execute all pending issues
  const results = await agent.executeAll({
    onProgress: (percent, message) => {
      console.log(`[${percent}%] ${message}`);
    },
    dryRun: false,
    autoCommit: true
  });
  
  // Check results
  results.forEach(result => {
    if (result.success) {
      console.log(`✓ ${result.issueNumber}: ${result.issueTitle}`);
    } else {
      console.log(`✗ ${result.issueNumber}: ${result.error}`);
    }
  });
}
```

### Custom Provider Integration

```typescript
import { Provider, ProviderType } from 'autoagent';

class CustomProvider extends Provider {
  name: ProviderType = 'custom' as ProviderType;
  
  async checkAvailability(): Promise<boolean> {
    // Implement availability check
    return true;
  }
  
  async execute(
    issueFile: string, 
    signal?: AbortSignal
  ): Promise<void> {
    // Implement execution logic
  }
}
```

For detailed API documentation, see [docs/API.md](docs/API.md).

## Configuration

AutoAgent uses a layered configuration system:

1. **Default Configuration** (built-in)
2. **Global Configuration** (`~/.autoagent/config.json`)
3. **Local Configuration** (`./.autoagent/config.json`)

### Configuration Options

```json
{
  "defaultProvider": "claude",
  "providers": {
    "claude": {
      "enabled": true,
      "maxTokens": 100000
    },
    "gemini": {
      "enabled": true,
      "maxTokens": 100000
    }
  },
  "failoverProviders": ["claude", "gemini"],
  "failoverDelay": 2000,
  "retryAttempts": 3,
  "retryDelay": 1000,
  "maxTokens": 100000,
  "rateLimitCooldown": 3600000,
  "gitAutoCommit": true,
  "gitCommitInterval": 300000,
  "includeCoAuthoredBy": true,
  "logLevel": "info",
  "customInstructions": ""
}
```

For detailed configuration documentation, see [docs/CONFIG.md](docs/CONFIG.md).

## Agent Instructions (AGENT.md)

AutoAgent uses the `AGENT.md` file to provide context to AI providers about your project. This file gives guidance to agentic coding tools on codebase structure, build/test commands, architecture, etc.

The `AGENT.md` file is automatically created when you run AutoAgent for the first time. It includes:
- Project context and description
- Technology stack
- Coding standards
- Build and test commands
- Execution history (automatically updated)

For backward compatibility, `CLAUDE.md` and `GEMINI.md` are created as symlinks to `AGENT.md` (or stub files on systems that don't support symlinks).

Learn more about the AGENT.md standard at [https://agent.md](https://agent.md).

## Examples

### Example 1: Batch Processing

```javascript
const { AutonomousAgent, ConfigManager, FileManager } = require('autoagent-cli');

async function processBatch() {
  const config = new ConfigManager();
  const files = new FileManager();
  const agent = new AutonomousAgent(config, files);
  
  // Process all issues with progress tracking
  const results = await agent.executeAll({
    onProgress: (percent, message) => {
      process.stdout.write(`\r[${percent}%] ${message}`);
    }
  });
  
  console.log(`\nCompleted ${results.length} issues`);
}
```

### Example 2: Provider Failover

```javascript
const { createProvider, isProviderAvailable } = require('autoagent-cli');

async function executeWithFailover() {
  const providers = ['claude', 'gemini'];
  
  for (const providerName of providers) {
    if (await isProviderAvailable(providerName)) {
      const provider = createProvider(providerName);
      try {
        await provider.execute('issues/current.md');
        console.log(`Success with ${providerName}`);
        break;
      } catch (error) {
        console.log(`Failed with ${providerName}, trying next...`);
      }
    }
  }
}
```

More examples available in the [examples/](examples/) directory:
- [basic-usage.js](examples/basic-usage.js) - Getting started
- [provider-failover.js](examples/provider-failover.js) - Failover handling
- [batch-execution.js](examples/batch-execution.js) - Batch processing
- [configuration.js](examples/configuration.js) - Configuration management
- [custom-integration.js](examples/custom-integration.js) - Advanced integration

## Architecture

```
┌─────────────────┐     ┌──────────────────┐
│   CLI Interface │────▶│ Autonomous Agent │
└─────────────────┘     └────────┬─────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
 ┌──────▼────────┐     ┌────────▼─────────┐    ┌────────▼────────┐
 │ File Manager  │     │ Config Manager   │    │    Providers    │
 │               │     │                  │    │                 │
 │ • Issues      │     │ • User Config    │    │ • Claude        │
 │ • Plans       │     │ • Rate Limits    │    │ • Gemini        │
 │ • Todo List   │     │ • Preferences    │    │ • Failover      │
 └───────────────┘     └──────────────────┘    └─────────────────┘
```

### Core Components

- **AutonomousAgent**: Main orchestrator for task execution
- **Providers**: AI provider implementations (Claude, Gemini)
- **FileManager**: Handles issue, plan, and todo file operations
- **ConfigManager**: Manages configuration and rate limits
- **Logger**: Provides formatted console output
- **Git Integration**: Handles automatic commits and rollbacks

## Troubleshooting

### Common Issues

**Provider not available**
```bash
# Check provider status
autoagent check

# Clear rate limits if needed
autoagent config clear-limits
```

**Git auto-commit not working**
```bash
# Ensure git is initialized
git init

# Check git configuration
autoagent config show

# Enable auto-commit
autoagent config set-auto-commit true
```

**TypeScript compilation errors**
```bash
# Clean and rebuild
rm -rf dist
npm run build
```

For more troubleshooting help, see [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/autoagent.git
cd autoagent

# Install dependencies
npm install

# Run tests
npm test

# Run in watch mode
npm run test:watch

# Build the project
npm run build

# Lint the code
npm run lint
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@autoagent.dev
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/autoagent/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/autoagent/discussions)
- 📖 Documentation: [Full Documentation](https://autoagent.dev/docs)

---

Made with ❤️ by the AutoAgent team