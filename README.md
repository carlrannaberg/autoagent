# AutoAgent

> Autonomous AI agent runner for executing tasks with Claude or Gemini, featuring automatic failover and comprehensive task management.

[![npm version](https://img.shields.io/npm/v/autoagent-cli.svg)](https://www.npmjs.com/package/autoagent-cli)
[![Test and Lint](https://github.com/carlrannaberg/autoagent/actions/workflows/test.yaml/badge.svg)](https://github.com/carlrannaberg/autoagent/actions/workflows/test.yaml)
[![Release](https://github.com/carlrannaberg/autoagent/actions/workflows/release.yaml/badge.svg)](https://github.com/carlrannaberg/autoagent/actions/workflows/release.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/autoagent-cli.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)

## Overview

AutoAgent is a powerful npm package that enables running autonomous AI agents using Claude or Gemini for task execution. It converts complex bash scripts into a robust TypeScript-based solution with both CLI and programmatic APIs.

### Key Features

- 🤖 **Multiple AI Providers**: Support for Claude (Anthropic), Gemini (Google), and Mock provider for testing
- 🔄 **Automatic Failover**: Seamlessly switches between providers on rate limits
- 📋 **Task Management**: Comprehensive issue and plan tracking system with status management
- 🔧 **Git Integration**: Automatic commits with co-authorship attribution
- 📊 **Provider Learning**: Tracks performance and learns from execution patterns
- 📝 **List Command**: Query issues, providers, and execution history with filtering
- ⚡ **Async Execution**: Efficient async/await based architecture
- 🛡️ **TypeScript**: Full type safety and IntelliSense support with strict mode
- 🎯 **Retry Logic**: Intelligent retry with exponential backoff
- 📁 **Template System**: Pre-built templates for issues and plans
- 🚀 **CLI & API**: Use as a command-line tool or programmatically
- 🔍 **Enhanced Error Handling**: Proper exit codes and descriptive error messages
- 🌍 **Environment Variables**: Full support for configuration via environment
- 📖 **Enhanced Gemini Output**: Automatic formatting with smart sentence boundary detection
- 🔄 **Reflection Engine**: Iterative improvement of decomposed plans and issues

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [CLI Usage](#cli-usage)
- [Programmatic Usage](#programmatic-usage)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Agent Instructions](#agent-instructions-agentmd)
- [Task Management](#task-management)
- [Examples](#examples)
- [Architecture](#architecture)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js >= 22.0.0
- npm or yarn
- Claude CLI (`claude`) or Gemini CLI (`gemini`) installed and authenticated
- Git (required for auto-commit feature, optional otherwise)

### Git Requirements

AutoAgent's auto-commit feature requires a properly configured git environment. While git is optional, it's recommended for tracking changes automatically.

#### Required Git Setup

1. **Install Git**
   ```bash
   # macOS (with Homebrew)
   brew install git
   
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install git
   
   # Windows
   # Download from https://git-scm.com/download/windows
   
   # Verify installation
   git --version
   ```

2. **Initialize Repository**
   ```bash
   # In your project directory
   git init
   
   # Or clone existing repository
   git clone <repository-url>
   cd <repository-name>
   ```

3. **Configure Git User**
   ```bash
   # Set globally (for all repositories)
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   
   # Or set locally (for current repository only)
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   
   # Verify configuration
   git config user.name
   git config user.email
   ```

4. **Add Remote (Optional)**
   ```bash
   # Add remote repository for pushing changes
   git remote add origin <repository-url>
   
   # Verify remote
   git remote -v
   ```

#### Disabling Auto-Commit

If you don't want to use git or prefer manual commits:

```bash
# Via CLI
autoagent config set-auto-commit false

# Via configuration file
{
  "gitAutoCommit": false
}
```

### Git Hooks Configuration

AutoAgent supports configuring git hook behavior during auto-commit. By default, git hooks are executed normally, but you can bypass them when needed:

```bash
# Disable git hooks globally (use --no-verify)
autoagent config set-git-no-verify true

# Enable git hooks globally (default)
autoagent config set-git-no-verify false

# Override per execution
autoagent run 1 --no-verify    # Skip hooks for this run
autoagent run 1 --verify       # Force hooks for this run
```

#### When to use `--no-verify`

The `--no-verify` flag is useful in specific scenarios:

- **CI/CD pipelines** where pre-commit hooks may fail in automated environments or require interactive input
- **Testing environments** where hooks designed for human workflows are not appropriate
- **Emergency situations** where broken or misconfigured hooks are blocking critical fixes
- **Automated environments** where hooks interfere with autonomous operations
- **Development workflows** with slow or broken git hooks that interrupt execution

**⚠️ Security Warning**: Using `--no-verify` bypasses pre-commit hooks that may include:
- Security checks and vulnerability scanning
- Code quality validation and linting
- Test execution and coverage requirements
- Commit message formatting and validation
- Other important safeguards specific to your project

Only use `--no-verify` when you understand the implications and are certain the hooks can be safely bypassed.

#### Examples

```bash
# Development workflow with slow hooks
autoagent config set-git-no-verify true     # Set globally for dev
autoagent run --all                          # Runs without hooks
autoagent run 5 --verify                     # Override for important changes

# CI/CD pipeline configuration
export AUTOAGENT_GIT_NO_VERIFY=true         # Environment variable
autoagent run specs/feature.md --all

# Emergency fix workflow
autoagent run critical-fix --no-verify

# Testing environment configuration
# In .autoagent/config.json:
{
  "gitAutoCommit": true,
  "gitCommitNoVerify": true,
  "includeCoAuthoredBy": false
}
```

### Auto-Push Configuration

AutoAgent supports automatic git push after commits, allowing for fully automated workflows. This feature is **disabled by default** for security reasons and must be explicitly enabled.

#### Prerequisites for Auto-Push

1. **Git remote repository configured**
   ```bash
   # Check if remote is configured
   git remote -v
   
   # Add remote if needed
   git remote add origin <repository-url>
   ```

2. **Push permissions to remote repository**
   - SSH keys configured (recommended)
   - HTTPS credentials cached
   - Or other authentication method

3. **Valid upstream branch**
   ```bash
   # Set upstream branch
   git push -u origin main
   
   # Or for current branch
   git push -u origin HEAD
   ```

#### Enabling Auto-Push

```bash
# Enable auto-push globally
autoagent config set-auto-push true

# Set specific remote (default: origin)
autoagent config set-push-remote upstream

# Set specific branch (default: current branch)
autoagent config set-push-branch main
```

#### Security Considerations

**⚠️ IMPORTANT**: Auto-push is disabled by default for security reasons. Before enabling:

1. **Understand the risks**: Auto-push will automatically push all changes to your remote repository
2. **Review your authentication**: Ensure your git credentials are properly secured
3. **Consider your environment**: Auto-push may not be suitable for:
   - Shared repositories with strict review processes
   - Production branches with protected status
   - Repositories requiring signed commits
   - Environments with compliance requirements

4. **Use branch protection**: Configure branch protection rules on your remote repository
5. **Test locally first**: Always test auto-push with a test repository before using in production

#### Configuration Options

```json
{
  "gitAutoCommit": true,
  "gitAutoPush": false,
  "gitPushRemote": "origin",
  "gitPushBranch": null,
  "gitCommitNoVerify": false
}
```

- `gitAutoPush`: Enable/disable automatic push (default: false)
- `gitPushRemote`: Remote name to push to (default: "origin")
- `gitPushBranch`: Branch to push to (default: current branch)

#### Auto-Push Workflow Examples

**1. CI/CD Pipeline Integration**
```bash
# GitHub Actions workflow
name: Automated Updates
on:
  schedule:
    - cron: '0 0 * * *'  # Daily

jobs:
  auto-update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Configure git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
      
      - name: Run autoagent with push
        run: |
          npm install -g autoagent-cli
          autoagent config set-auto-push true
          autoagent config set-push-branch main
          autoagent run --all
```

**2. Development Feature Branch Workflow**
```bash
# Setup feature branch with auto-push
git checkout -b feature/new-functionality
autoagent config set-auto-push true
autoagent config set-push-branch feature/new-functionality

# Work on issues with automatic backup
autoagent run specs/feature.md --all

# Each completed issue is automatically pushed to remote
# Team members can track progress in real-time
```

**3. Team Collaboration Setup**
```bash
# Configure for team repository
autoagent config init
autoagent config set-auto-push true
autoagent config set-push-remote origin
autoagent config set-push-branch develop

# Add team-specific configuration
cat > .autoagent/config.json << EOF
{
  "gitAutoCommit": true,
  "gitAutoPush": true,
  "gitPushRemote": "origin",
  "gitPushBranch": "develop",
  "includeCoAuthoredBy": true
}
EOF

# Team members can now run with auto-sync
autoagent run --all
```

**4. Testing Environment with Conditional Push**
```bash
#!/bin/bash
# Script for test environments

# Only push if tests pass
autoagent run 1-implement-feature
if npm test; then
  git push origin HEAD
else
  echo "Tests failed, not pushing changes"
  exit 1
fi

# Or use auto-push with pre-push hooks
autoagent config set-auto-push true
# Configure .git/hooks/pre-push to run tests
```

**5. Multi-Repository Workflow**
```bash
# Working with multiple related repositories
REPOS=("frontend" "backend" "shared")

for repo in "${REPOS[@]}"; do
  cd "$repo"
  autoagent config set-auto-push true
  autoagent config set-push-branch integration
  autoagent run --all
  cd ..
done

# All repositories stay synchronized
```

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
git clone https://github.com/carlrannaberg/autoagent.git
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

### 2. Create Your First Task

```bash
# Create a task with AI assistance
autoagent create "Add user authentication to the API"

# This creates a task in the STM (Simple Task Master) system
# Tasks are automatically numbered and stored in .simple-task-master/tasks/
```

### 3. Execute the Task

```bash
# Execute next pending task
autoagent run

# Execute with specific provider
autoagent run --provider gemini

# Execute a specific task by number
autoagent run 1
```

## Task Management

AutoAgent uses STM (Simple Task Master) for unified task management. All tasks are stored as structured data with automatic numbering, status tracking, and metadata.

### Task Types

Tasks can be created from:

1. **Specification Files (Specs)**: High-level project descriptions that get decomposed into actionable tasks
2. **Direct Task Creation**: Using `autoagent create` command for immediate tasks
3. **Batch Operations**: Processing multiple related tasks together

### Task Structure

Each task contains:
- **Title and Description**: Clear definition of what needs to be done
- **Status**: pending, in_progress, completed, cancelled
- **Metadata**: Created date, tags, priority, estimated effort
- **Validation**: Success criteria and acceptance requirements

### Workflow: Spec → Tasks → Execution
The typical workflow is:
1. **Write a spec** describing what you want to build
2. **Run the spec** to automatically decompose it into tasks
3. **Execute tasks** to implement the changes

Example spec processing:
```bash
# Process a specification file
autoagent run specs/add-authentication.md --all

# This automatically:
# 1. Analyzes the spec
# 2. Creates structured tasks in STM
# 3. Executes each task in sequence
```

## CLI Usage

### Core Commands

#### `autoagent run [target]`
Intelligently execute specs, issues, or plans based on the target type.

```bash
# Run next pending issue
autoagent run

# Run a specification file (creates plan + issues, then executes)
autoagent run specs/add-authentication.md

# Run specific task by number
autoagent run 5

# Run all pending tasks
autoagent run --all

# Run spec and continue with all created tasks
autoagent run specs/refactor-api.md --all

# Dry run (preview without execution)
autoagent run --dry-run

# Override provider
autoagent run --provider gemini

# Control git hooks during commits
autoagent run --no-verify   # Skip git hooks
autoagent run --verify      # Force git hooks (default)

# Use mock provider for testing
AUTOAGENT_MOCK_PROVIDER=true autoagent run

# Run with custom reflection settings
autoagent run --reflection-iterations 5

# Run without reflection
autoagent run --no-reflection
```

**Smart Detection:**
- **Spec files**: Automatically detected by content and file extension
- **Task references**: Can use task number (5) or task ID

#### `autoagent create <description>`
Create a new task with AI assistance.

```bash
# Basic usage
autoagent create "Implement user profile page"

# With specific provider
autoagent create "Add caching layer" --provider claude
```

#### `autoagent status [task]`
Display project status, pending tasks, or specific task status.

```bash
# Show overall project status
autoagent status

# Show specific task status
autoagent status 5

# Show execution history
autoagent status --history
```

Output:
```
📊 Project Status

Total Tasks:      15
Completed:        12  
Pending:          3

Next Task: #16 Add error handling

✅ Available Providers: claude, gemini
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

# Enable/disable git hooks during commits
autoagent config set-git-no-verify true   # Skip hooks (--no-verify)
autoagent config set-git-no-verify false  # Run hooks (default)

# Configure auto-push
autoagent config set-auto-push true       # Enable auto-push
autoagent config set-auto-push false      # Disable auto-push (default)
autoagent config set-push-remote upstream # Set remote (default: origin)
autoagent config set-push-branch main     # Set branch (default: current)

# Show current configuration
autoagent config show

# Clear rate limits
autoagent config clear-limits

# Get specific config value
autoagent config get provider
autoagent config get provider --show-source
autoagent config get gitCommitNoVerify

# Set any config value
autoagent config set logLevel debug
autoagent config set retryAttempts 5
autoagent config set gitCommitNoVerify true
```

#### `autoagent list <type>`
List tasks, providers, or execution history.

```bash
# List all tasks
autoagent list tasks

# List tasks by status  
autoagent list tasks --status pending
autoagent list tasks --status completed

# List with JSON output
autoagent list tasks --json

# List available providers
autoagent list providers
autoagent list providers --json

# List execution history
autoagent list executions
autoagent list executions --json
```

Example output:
```
Found 3 task(s):

  ⏳ #1 Setup project (pending)
  ✅ #2 Add tests (completed)
  🔄 #3 Refactor API (in_progress)
```

#### `autoagent check`
Verify provider availability.

```bash
# Check all providers
autoagent check

# Check specific provider
autoagent check claude
```

### Command Options

Most commands support these common options:

- `--workspace, -w <path>`: Set working directory
- `--debug, -d`: Enable debug logging
- `--provider, -p <name>`: Override provider
- `--reflection-iterations <n>`: Set maximum reflection iterations (1-10)
- `--no-reflection`: Disable reflection for this run
- `--help, -h`: Show help

## Programmatic Usage

### Basic Example

```typescript
import { AutonomousAgent } from 'autoagent';

async function runAgent() {
  // Create agent instance
  const agent = new AutonomousAgent({
    workspace: process.cwd(),
    provider: 'claude',
    autoCommit: true
  });
  
  // Execute a single task by number
  const result = await agent.executeTask(1);
  
  if (result.success) {
    console.log('Task completed successfully!');
  }
}
```

### Advanced Usage

```typescript
import { AutonomousAgent } from 'autoagent';

async function advancedExample() {
  const agent = new AutonomousAgent({
    workspace: './my-project',
    provider: 'claude',
    autoCommit: true,
    debug: true
  });
  
  // Listen to execution events
  agent.on('execution-start', (taskNumber) => {
    console.log(`Starting task #${taskNumber}`);
  });
  
  agent.on('execution-end', (result) => {
    if (result.success) {
      console.log(`✓ Task #${result.taskNumber} completed`);
    } else {
      console.log(`✗ Task #${result.taskNumber} failed: ${result.error}`);
    }
  });
  
  // Execute all pending tasks
  const results = await agent.executeAll();
  
  console.log(`Completed ${results.length} tasks`);
}
```

### Custom Provider Integration

```typescript
import { Provider, ExecutionResult } from 'autoagent';

class CustomProvider extends Provider {
  get name(): string {
    return 'custom';
  }
  
  async checkAvailability(): Promise<boolean> {
    // Implement availability check
    return true;
  }
  
  async execute(
    issueFile: string,
    planFile: string,
    contextFiles?: string[],
    signal?: AbortSignal
  ): Promise<ExecutionResult> {
    // Implement execution logic
    return {
      success: true,
      taskNumber: 1,
      duration: 1000,
      output: 'Custom provider executed successfully',
      provider: 'custom'
    };
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
  "gitAutoPush": false,
  "gitPushRemote": "origin",
  "gitPushBranch": null,
  "gitCommitNoVerify": false,
  "gitCommitInterval": 300000,
  "includeCoAuthoredBy": true,
  "logLevel": "info",
  "customInstructions": ""
}
```

For detailed configuration documentation, see [docs/CONFIG.md](docs/CONFIG.md).

## Environment Variables

AutoAgent supports configuration through environment variables, which take precedence over configuration files:

### Core Configuration

- `AUTOAGENT_DEBUG` - Enable debug mode (true/false)
- `AUTOAGENT_GIT_NO_VERIFY` - Skip git hooks during commits (true/false)

### Mock Provider (for testing)

- `AUTOAGENT_MOCK_PROVIDER` - Enable mock provider (true/false)
- `AUTOAGENT_MOCK_DELAY` - Simulated execution delay in ms
- `AUTOAGENT_MOCK_FAIL` - Simulate general execution failure (true/false)
- `AUTOAGENT_MOCK_TIMEOUT` - Simulate timeout errors (true/false)
- `AUTOAGENT_MOCK_RATE_LIMIT` - Simulate rate limit errors (true/false)
- `AUTOAGENT_MOCK_AUTH_FAIL` - Simulate authentication failures (true/false)
- `AUTOAGENT_MOCK_CHAT_FAIL` - Simulate chat/communication failures (true/false)

### Gemini Output Formatting

- `AUTOAGENT_DISABLE_GEMINI_FORMATTING` - Disable automatic output formatting (true/false)
- `AUTOAGENT_GEMINI_BUFFER_SIZE` - Override default buffer size (default: 1000)
- `AUTOAGENT_DEBUG_FORMATTING` - Enable formatting debug logs (true/false)

### Debugging

- `DEBUG` - Enable debug mode with stack traces (true/1)
- `DEBUG_CLI_EXECUTOR` - Debug CLI command execution

Example usage:
```bash
# Use mock provider with custom delay
AUTOAGENT_MOCK_PROVIDER=true AUTOAGENT_MOCK_DELAY=500 autoagent run

# Enable debug output
AUTOAGENT_DEBUG=true autoagent run --all

# Simulate rate limit errors for testing
AUTOAGENT_MOCK_PROVIDER=true AUTOAGENT_MOCK_RATE_LIMIT=true autoagent run
```

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

### Example 1: Complete Workflow from Spec to Implementation

```bash
# Create a specification for a new feature
cat > specs/add-user-profiles.md << 'EOF'
# Add User Profiles Feature

## Goal
Implement user profiles with avatars and bio information.

## Requirements
- User profile page at /users/:id
- Editable bio field (max 500 chars)
- Avatar upload with image resizing
- Privacy settings (public/private profile)
EOF

# Run the spec - this creates tasks, then executes them
autoagent run specs/add-user-profiles.md --all

# Or run step by step:
# 1. Process spec to create tasks (with reflection)
autoagent run specs/add-user-profiles.md

# 2. Review created tasks
autoagent list tasks --status pending

# 3. Execute specific tasks
autoagent run 2
autoagent run 3

# 4. Or execute remaining tasks
autoagent run --all
```

### Example 2: Query Tasks and Status

```bash
# List all pending tasks
autoagent list tasks --status pending

# Check specific task status
autoagent status 5

# View recent executions
autoagent status --history

# Get tasks in JSON format for scripting
TASKS=$(autoagent list tasks --status pending --json)
echo $TASKS | jq '.[0].name'
```

### Example 2: Batch Processing with Mock Provider

```javascript
const { AutonomousAgent, ConfigManager, STMManager } = require('autoagent-cli');

async function processBatch() {
  // Enable mock provider for testing
  process.env.AUTOAGENT_MOCK_PROVIDER = 'true';
  
  const config = new ConfigManager();
  const stm = new STMManager();
  const agent = new AutonomousAgent(config, stm);
  
  // Process all tasks with progress tracking
  const results = await agent.executeAll({
    onProgress: (percent, message) => {
      process.stdout.write(`\r[${percent}%] ${message}`);
    }
  });
  
  console.log(`\nCompleted ${results.length} tasks`);
}
```

### Example 3: Provider Failover

```javascript
const { createProvider, isProviderAvailable } = require('autoagent-cli');

async function executeWithFailover() {
  const providers = ['claude', 'gemini'];
  
  for (const providerName of providers) {
    if (await isProviderAvailable(providerName)) {
      const provider = createProvider(providerName);
      try {
        await provider.execute(1); // Execute task #1
        console.log(`Success with ${providerName}`);
        break;
      } catch (error) {
        console.log(`Failed with ${providerName}, trying next...`);
      }
    }
  }
}
```

### Example 4: Configuration Management

```bash
# Check where configuration is coming from
autoagent config get provider --show-source
# Output: provider = claude (from configuration file)

# Override provider for single run
autoagent run --provider gemini

# Set configuration programmatically
autoagent config set retryAttempts 5
autoagent config set logLevel debug

# Validate configuration
autoagent config set provider invalid-provider
# Error: Invalid value for provider. Must be one of: claude, gemini, mock
```

More examples available in the [examples/](examples/) directory:
- [basic-usage.js](examples/basic-usage.js) - Getting started
- [provider-failover.js](examples/provider-failover.js) - Failover handling
- [batch-execution.js](examples/batch-execution.js) - Batch processing
- [configuration.js](examples/configuration.js) - Configuration management
- [custom-integration.js](examples/custom-integration.js) - Advanced integration

## Testing

AutoAgent includes comprehensive testing support including a mock provider for CI/CD pipelines:

### Using Mock Provider

The mock provider simulates AI responses without making actual API calls:

```bash
# Run with mock provider
AUTOAGENT_MOCK_PROVIDER=true autoagent run

# Run tests in CI/CD
AUTOAGENT_MOCK_PROVIDER=true npm test

# Simulate specific scenarios
AUTOAGENT_MOCK_RATE_LIMIT=true autoagent run
AUTOAGENT_MOCK_FAIL=true autoagent run --all
```

### Running Tests

```bash
# Run all tests with Vitest
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test suites
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests
npm run test:e2e        # End-to-end tests

# Run with Vitest UI
npm run test:ui
```

### Test Structure

- `test/unit/` - Unit tests for individual components
- `test/integration/` - Integration tests for component interactions
- `test/e2e/` - End-to-end CLI tests
- `test/benchmark/` - Performance benchmarks

## Architecture

```
┌─────────────────┐     ┌──────────────────┐
│   CLI Interface │────▶│ Autonomous Agent │
└─────────────────┘     └────────┬─────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
 ┌──────▼────────┐     ┌────────▼─────────┐    ┌────────▼────────┐
 │ STM Manager   │     │ Config Manager   │    │    Providers    │
 │               │     │                  │    │                 │
 │ • Task CRUD   │     │ • User Config    │    │ • Claude        │
 │ • Status      │     │ • Rate Limits    │    │ • Gemini        │
 │ • Search      │     │ • Preferences    │    │ • Mock (Test)   │
 │ • Validation  │     │ • Env Variables  │    │ • Failover      │
 └───────────────┘     └──────────────────┘    └─────────────────┘
```

### Core Components

- **AutonomousAgent**: Main orchestrator for task execution
- **Providers**: AI provider implementations (Claude, Gemini)
- **STMManager**: Manages tasks through Simple Task Master integration
- **ConfigManager**: Manages configuration and rate limits
- **ReflectionEngine**: Iterative improvement system for decomposed plans
- **Logger**: Provides formatted console output
- **Git Integration**: Handles automatic commits and rollbacks
- **StreamFormatter**: Handles real-time output formatting for AI providers

## Reflection Engine

AutoAgent includes an intelligent reflection system that iteratively improves decomposed plans and issues:

```bash
# Use default reflection (3 iterations)
autoagent run specs/feature.md

# Customize reflection iterations
autoagent run specs/feature.md --reflection-iterations 5

# Disable reflection for faster execution
autoagent run specs/feature.md --no-reflection
```

The reflection engine:
- **Analyzes initial decomposition quality** using improvement scoring
- **Identifies gaps and improvements** in plans and issues
- **Iteratively refines** decomposed tasks for better clarity
- **Skips reflection for simple specifications** (< 500 words)
- **Provides progress tracking** during reflection iterations

### Configuration

Reflection behavior can be controlled through configuration:

```json
{
  "reflection": {
    "enabled": true,
    "maxIterations": 3,
    "improvementThreshold": 0.1,
    "skipForSimpleSpecs": true
  }
}
```

Or via CLI options:
```bash
# Set custom iteration count
autoagent run --reflection-iterations 5

# Disable reflection entirely
autoagent run --no-reflection
```

## Enhanced Gemini Output Formatting

AutoAgent automatically formats Gemini provider output for improved readability by detecting sentence boundaries and adding appropriate line breaks. This feature enhances the readability of long responses from the Gemini AI.

### Features

- **Smart Sentence Detection**: Automatically detects sentence endings (periods, exclamation marks, question marks)
- **Abbreviation Handling**: Recognizes common abbreviations (Dr., Mr., Inc., etc.) to avoid incorrect splits
- **Number Pattern Recognition**: Handles decimal numbers (3.14, $10.50) without breaking
- **URL/Email/Path Preservation**: Keeps URLs, email addresses, and file paths intact
- **Performance Optimized**: Processes text with <1ms overhead per 1KB
- **Configurable**: Can be disabled or customized via environment variables

### Example

```
# Before formatting:
The AI response continues without breaks. It contains multiple sentences. This makes it harder to read. Dr. Smith mentioned that version 2.0 is ready.

# After formatting:
The AI response continues without breaks.

It contains multiple sentences.

This makes it harder to read.

Dr. Smith mentioned that version 2.0 is ready.
```

### Configuration

You can control the formatting behavior with environment variables:

```bash
# Disable formatting entirely
export AUTOAGENT_DISABLE_GEMINI_FORMATTING=true

# Customize buffer size (default: 1000 characters)
export AUTOAGENT_GEMINI_BUFFER_SIZE=2000

# Enable debug logging for formatting
export AUTOAGENT_DEBUG_FORMATTING=true
```

### Performance

The formatter is highly optimized:
- Regex patterns are compiled once and reused
- Text processing achieves <1ms per 1KB of text
- Memory efficient with configurable buffer sizes
- Minimal impact on streaming performance

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

AutoAgent validates your git environment before performing auto-commits. Here are common issues and their solutions:

1. **Git not installed**
```bash
# Error: "Git is not available on your system"

# Solution - Install git:
# macOS
brew install git

# Ubuntu/Debian
sudo apt-get install git

# Windows
# Download from https://git-scm.com/download/windows

# Verify installation
git --version
```

2. **Not a git repository**
```bash
# Error: "Current directory is not a git repository"

# Solution - Initialize repository:
git init

# Or clone existing repository:
git clone <repository-url>

# Verify repository status
git status
```

3. **Git user not configured**
```bash
# Error: "Git user configuration is incomplete"

# Solution - Configure git user:
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list | grep user
```

4. **No remote repository**
```bash
# Warning: "No remote repository configured"

# Solution - Add remote (optional for local-only repos):
git remote add origin <repository-url>
git remote -v
```

5. **Quick fixes**
```bash
# Check current auto-commit setting
autoagent config get gitAutoCommit

# Enable auto-commit
autoagent config set-auto-commit true

# Disable auto-commit
autoagent config set-auto-commit false

# Debug git validation
AUTOAGENT_DEBUG=true autoagent run
```

**TypeScript compilation errors**
```bash
# Clean and rebuild
rm -rf dist
npm run build
```

**Exit code 1 with no clear error**
```bash
# Enable debug mode to see stack traces
DEBUG=true autoagent run

# Check for corrupted config
autoagent config show
```

**Cyclic dependency detected**
```bash
# List all tasks to check dependencies
autoagent list tasks --json | jq '.[] | {name, dependencies}'

# Fix by editing tasks to remove circular references
```

**Mock provider not working**
```bash
# Ensure environment variable is set
export AUTOAGENT_MOCK_PROVIDER=true
autoagent list providers  # Should show mock as available
```

**Auto-push not working**

1. **Remote not accessible**
```bash
# Error: "Failed to push: remote 'origin' not found"

# Solution - Check remote configuration:
git remote -v

# Add remote if missing:
git remote add origin <repository-url>

# Or use different remote:
autoagent config set-push-remote upstream
```

2. **Authentication failed**
```bash
# Error: "Failed to push: authentication required"

# Solution - Setup SSH keys (recommended):
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add public key to GitHub/GitLab/etc.

# Or cache HTTPS credentials:
git config --global credential.helper cache
git push  # Enter credentials once

# Test authentication:
ssh -T git@github.com  # For GitHub
```

3. **Permission denied**
```bash
# Error: "Failed to push: permission denied"

# Solution - Check repository permissions:
# Ensure you have write access to the repository

# Check branch protection rules:
# Protected branches may block direct pushes

# Use different branch:
autoagent config set-push-branch feature-branch
git checkout -b feature-branch
```

4. **Push rejected (non-fast-forward)**
```bash
# Error: "Failed to push: non-fast-forward updates were rejected"

# Solution - Pull latest changes first:
git pull --rebase origin main

# Or disable auto-push until resolved:
autoagent config set-auto-push false
```

5. **Quick push debugging**
```bash
# Test push manually first:
git push -u origin HEAD

# Check push configuration:
autoagent config get gitAutoPush
autoagent config get gitPushRemote
autoagent config get gitPushBranch

# Enable debug logging:
AUTOAGENT_DEBUG=true autoagent run
```

For more troubleshooting help, see [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/carlrannaberg/autoagent.git
cd autoagent

# Install dependencies
npm install

# Run all checks (recommended)
npm run check

# Individual commands
npm test              # Run tests with Vitest
npm run typecheck     # Check TypeScript types
npm run lint          # Check code style
npm run build         # Build the project

# Development commands
npm run test:watch    # Run tests in watch mode with Vitest
npm run test:ui       # Run tests with Vitest UI
npm run test:coverage # Run tests with coverage report
npm run lint:fix      # Auto-fix linting issues
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 🐛 Issues: [GitHub Issues](https://github.com/carlrannaberg/autoagent/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/carlrannaberg/autoagent/discussions)
- 📖 Documentation: See the `docs/` directory for detailed guides

---

Made with ❤️ by Carl Rannaberg