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

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [CLI Usage](#cli-usage)
- [Programmatic Usage](#programmatic-usage)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Agent Instructions](#agent-instructions-agentmd)
- [File Naming Conventions](#file-naming-conventions)
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

# Execute a specific issue by name
autoagent run 1-add-authentication
```

## CLI Usage

### Core Commands

#### `autoagent run [issue]`
Execute one or all pending issues.

```bash
# Run next pending issue
autoagent run

# Run specific issue by name
autoagent run 5-update-dependencies

# Run all pending issues
autoagent run --all

# Dry run (preview without execution)
autoagent run --dry-run

# Override provider
autoagent run --provider gemini

# Disable auto-commit
autoagent run --no-auto-commit

# Use mock provider for testing
AUTOAGENT_MOCK_PROVIDER=true autoagent run
```

#### `autoagent create <description>`
Create a new issue with AI assistance.

```bash
# Basic usage
autoagent create "Implement user profile page"

# With specific provider
autoagent create "Add caching layer" --provider claude
```

#### `autoagent status [issue]`
Display project status, pending issues, or specific issue status.

```bash
# Show overall project status
autoagent status

# Show specific issue status
autoagent status 5-update-dependencies

# Show execution history
autoagent status --history
```

Output:
```
📊 Project Status

Total Issues:     15
Completed:        12  
Pending:          3

Next Issue: 16-add-error-handling

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

# Show current configuration
autoagent config show

# Clear rate limits
autoagent config clear-limits

# Get specific config value
autoagent config get provider
autoagent config get provider --show-source

# Set any config value
autoagent config set logLevel debug
autoagent config set retryAttempts 5
```

#### `autoagent list <type>`
List issues, providers, or execution history.

```bash
# List all issues
autoagent list issues

# List issues by status
autoagent list issues --status pending
autoagent list issues --status completed

# List with JSON output
autoagent list issues --json

# List available providers
autoagent list providers
autoagent list providers --json

# List execution history
autoagent list executions
autoagent list executions --json
```

Example output:
```
Found 3 issue(s):

  ⏳ 1-setup-project (pending)
  ✅ 2-add-tests (completed)
  🔄 3-refactor-api (in_progress)
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

## Environment Variables

AutoAgent supports configuration through environment variables, which take precedence over configuration files:

### Core Configuration

- `AUTOAGENT_PROVIDER` - Default AI provider (claude/gemini/mock)
- `AUTOAGENT_VERBOSE` - Enable verbose output (true/false)
- `AUTOAGENT_LOG_LEVEL` - Set log level (debug/info/warn/error)
- `AUTOAGENT_AUTO_COMMIT` - Enable auto-commit (true/false)
- `AUTOAGENT_RETRY_ATTEMPTS` - Number of retry attempts (default: 3)
- `AUTOAGENT_MAX_TOKENS` - Maximum tokens per request

### Mock Provider (for testing)

- `AUTOAGENT_MOCK_PROVIDER` - Enable mock provider (true/false)
- `AUTOAGENT_MOCK_DELAY` - Simulated execution delay in ms
- `AUTOAGENT_MOCK_ERROR` - Simulate specific errors (timeout/rate-limit/auth-failed)
- `AUTOAGENT_MOCK_FAIL_ISSUE` - Issue number to simulate failure

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

# Enable verbose debug output
DEBUG=true AUTOAGENT_VERBOSE=true autoagent run --all

# Override provider via environment
AUTOAGENT_PROVIDER=gemini autoagent run
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

## File Naming Conventions

AutoAgent creates consistent filename patterns for issues and plans:

- **Issue files**: `{number}-{title-slug}.md`
- **Plan files**: `{number}-{title-slug}-plan.md`

### How Slugs Are Generated

Titles are converted to URL-friendly slugs by:
1. Converting to lowercase
2. Replacing spaces with hyphens
3. Removing special characters (except dots and hyphens)
4. Normalizing multiple dots/hyphens to single hyphens
5. Removing leading/trailing hyphens

### Examples

| Issue Title | Issue Filename | Plan Filename |
|------------|----------------|---------------|
| Implement User Authentication | `1-implement-user-authentication.md` | `1-implement-user-authentication-plan.md` |
| Fix Bug #123 | `2-fix-bug-123.md` | `2-fix-bug-123-plan.md` |
| Add @mentions & #hashtags | `3-add-mentions-hashtags.md` | `3-add-mentions-hashtags-plan.md` |
| Feature...Test!!! | `4-feature-test.md` | `4-feature-test-plan.md` |
| Update CI/CD Pipeline | `5-update-cicd-pipeline.md` | `5-update-cicd-pipeline-plan.md` |

### Backward Compatibility

The consistent naming pattern ensures:
- Easy identification of issue/plan pairs
- Predictable file locations
- Better organization of the issues and plans directories
- Simplified scripting and automation

When using the `bootstrap` command, both issue and plan files will follow this naming convention automatically.

## Examples

### Example 1: Query Issues and Status

```bash
# List all pending issues
autoagent list issues --status pending

# Check specific issue status
autoagent status 5-implement-auth

# View recent executions
autoagent status --history

# Get issues in JSON format for scripting
ISSUES=$(autoagent list issues --status pending --json)
echo $ISSUES | jq '.[0].name'
```

### Example 2: Batch Processing with Mock Provider

```javascript
const { AutonomousAgent, ConfigManager, FileManager } = require('autoagent-cli');

async function processBatch() {
  // Enable mock provider for testing
  process.env.AUTOAGENT_MOCK_PROVIDER = 'true';
  
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

### Example 3: Provider Failover

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

### Example 4: Configuration Management

```bash
# Check where configuration is coming from
autoagent config get provider --show-source
# Output: provider = claude (from environment)

# Override with environment variable
AUTOAGENT_PROVIDER=gemini autoagent run

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
AUTOAGENT_MOCK_ERROR=rate-limit autoagent run
AUTOAGENT_MOCK_FAIL_ISSUE=3 autoagent run --all
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
 │ File Manager  │     │ Config Manager   │    │    Providers    │
 │               │     │                  │    │                 │
 │ • Issues      │     │ • User Config    │    │ • Claude        │
 │ • Plans       │     │ • Rate Limits    │    │ • Gemini        │
 │ • Todo List   │     │ • Preferences    │    │ • Mock (Test)   │
 │ • Status      │     │ • Env Variables  │    │ • Failover      │
 └───────────────┘     └──────────────────┘    └─────────────────┘
```

### Core Components

- **AutonomousAgent**: Main orchestrator for task execution
- **Providers**: AI provider implementations (Claude, Gemini)
- **FileManager**: Handles issue, plan, and todo file operations
- **ConfigManager**: Manages configuration and rate limits
- **Logger**: Provides formatted console output
- **Git Integration**: Handles automatic commits and rollbacks
- **StreamFormatter**: Handles real-time output formatting for AI providers

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

**Exit code 1 with no clear error**
```bash
# Enable debug mode to see stack traces
DEBUG=true autoagent run

# Check for corrupted config
autoagent config show
```

**Cyclic dependency detected**
```bash
# List all issues to check dependencies
autoagent list issues --json | jq '.[] | {name, dependencies}'

# Fix by editing issue files to remove circular references
```

**Mock provider not working**
```bash
# Ensure environment variable is set
export AUTOAGENT_MOCK_PROVIDER=true
autoagent list providers  # Should show mock as available
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