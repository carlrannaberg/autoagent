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

## File Types

AutoAgent works with three types of markdown files:

### 1. Specification Files (Specs)
High-level project descriptions that define what needs to be built. These files describe the overall goal, requirements, and constraints without implementation details.

**Example:** `update-authentication-system.md`
```markdown
# Update Authentication System

## Goal
Modernize the authentication system to support OAuth2 and improve security.

## Requirements
- Support for OAuth2 providers (Google, GitHub)
- Backward compatibility with existing JWT tokens
- Enhanced security with refresh tokens
- Rate limiting on auth endpoints
```

### 2. Plan Files
Detailed implementation plans that break down how to achieve a specification. Plans include specific technical steps, dependencies, and sequencing.

**Example:** `1-update-authentication-system-plan.md`
```markdown
# Plan: Update Authentication System

## Implementation Steps
1. Add OAuth2 dependencies
2. Create OAuth provider abstraction
3. Implement Google OAuth flow
4. Add refresh token support
5. Update user model for OAuth data
6. Add rate limiting middleware
```

### 3. Issue Files
Actionable work items with specific acceptance criteria. Issues are the atomic units of work that agents execute.

**Example:** `2-add-oauth2-dependencies.md`
```markdown
# Issue 2: Add OAuth2 dependencies

## Description
Add required npm packages for OAuth2 implementation.

## Acceptance Criteria
- [ ] passport-oauth2 added to package.json
- [ ] passport-google-oauth20 added
- [ ] passport-github2 added
- [ ] Dependencies installed and lock file updated
```

### File Flow: Spec → Plan → Issues
The typical workflow is:
1. **Write a spec** describing what you want to build
2. **Run the spec** to automatically generate a plan and decomposed issues
3. **Execute issues** to implement the changes

## CLI Usage

### Core Commands

#### `autoagent run [target]`
Intelligently execute specs, issues, or plans based on the target type.

```bash
# Run next pending issue
autoagent run

# Run a specification file (creates plan + issues, then executes)
autoagent run specs/add-authentication.md

# Run specific issue by number
autoagent run 5

# Run specific issue by name
autoagent run 5-update-dependencies

# Run specific issue by filename
autoagent run issues/5-update-dependencies.md

# Run all pending issues
autoagent run --all

# Run spec and continue with all created issues
autoagent run specs/refactor-api.md --all

# Dry run (preview without execution)
autoagent run --dry-run

# Override provider
autoagent run --provider gemini

# Disable auto-commit
autoagent run --no-commit

# Use mock provider for testing
AUTOAGENT_MOCK_PROVIDER=true autoagent run

# Run with custom reflection settings
autoagent run --reflection-iterations 5

# Run without reflection
autoagent run --no-reflection
```

**Smart Detection:**
- **Spec/Plan files**: Automatically detected by content (no "Issue #:" marker)
- **Issue files**: Detected by "Issue #:" marker in content
- **Issue references**: Can use number (5), name (5-update-dependencies), or path

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
  
  // Execute a single issue by number
  const result = await agent.executeIssue(1);
  
  if (result.success) {
    console.log('Issue completed successfully!');
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
  agent.on('execution-start', (issueNumber) => {
    console.log(`Starting issue #${issueNumber}`);
  });
  
  agent.on('execution-end', (result) => {
    if (result.success) {
      console.log(`✓ Issue #${result.issueNumber} completed`);
    } else {
      console.log(`✗ Issue #${result.issueNumber} failed: ${result.error}`);
    }
  });
  
  // Execute all pending issues
  const results = await agent.executeAll();
  
  console.log(`Completed ${results.length} issues`);
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
      issueNumber: 1,
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
  "gitCommitInterval": 300000,
  "includeCoAuthoredBy": true,
  "logLevel": "info",
  "customInstructions": ""
}
```

For detailed configuration documentation, see [docs/CONFIG.md](docs/CONFIG.md).

## Migration Guide: Bootstrap to Run

### What Changed?
The `bootstrap` command has been integrated into the `run` command for a unified interface. The `run` command now intelligently detects file types and routes to the appropriate action.

### Before (Old Way)
```bash
# Bootstrap from a spec file
autoagent bootstrap plan.md

# Then manually run the decomposition issue
autoagent run 1-decompose-project

# Then run created issues
autoagent run --all
```

### After (New Way)
```bash
# Just run the spec file directly!
autoagent run plan.md --all

# Or step by step:
autoagent run plan.md      # Creates and runs decomposition
autoagent run --all        # Runs all created issues
```

### Key Benefits
- **Simpler**: One command instead of multiple
- **Smarter**: Automatically detects file types
- **Flexible**: Works with specs, plans, issues, or issue numbers
- **Backward Compatible**: All existing issue files still work

### Quick Reference
| Task | Old Command | New Command |
|------|------------|-------------|
| Bootstrap from spec | `autoagent bootstrap spec.md` | `autoagent run spec.md` |
| Run issue by number | `autoagent run 5` | `autoagent run 5` |
| Run issue by name | `autoagent run 5-fix-bug` | `autoagent run 5-fix-bug` |
| Run all issues | `autoagent run --all` | `autoagent run --all` |
| Bootstrap + run all | `bootstrap` then `run 1` then `run --all` | `autoagent run spec.md --all` |

## Environment Variables

AutoAgent supports configuration through environment variables, which take precedence over configuration files:

### Core Configuration

- `AUTOAGENT_DEBUG` - Enable debug mode (true/false)

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

When specs are processed, both issue and plan files follow this naming convention automatically.

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

# Run the spec - this creates a plan and issues, then executes them
autoagent run specs/add-user-profiles.md --all

# Or run step by step:
# 1. Process spec to create plan and issues (with reflection)
autoagent run specs/add-user-profiles.md

# 2. Review created issues
autoagent list issues --status pending

# 3. Execute specific issues
autoagent run 2-create-profile-model
autoagent run 3-add-avatar-upload

# 4. Or execute remaining issues
autoagent run --all
```

### Example 2: Query Issues and Status

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