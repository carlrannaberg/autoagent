# AutoAgent Configuration Guide

This guide covers all configuration options available in AutoAgent, including how to set them up, their precedence rules, and best practices.

## Table of Contents

- [Configuration Overview](#configuration-overview)
- [Configuration Files](#configuration-files)
- [Configuration Options](#configuration-options)
- [Provider Configuration](#provider-configuration)
- [Rate Limiting](#rate-limiting)
- [Git Integration](#git-integration)
- [Logging Configuration](#logging-configuration)
- [Environment Variables](#environment-variables)
- [CLI Configuration Commands](#cli-configuration-commands)
- [Examples](#examples)
- [Best Practices](#best-practices)

## Configuration Overview

AutoAgent uses a layered configuration system that allows for flexible setup across different environments. Configuration can be set at three levels:

1. **Default Configuration** - Built-in defaults that work out of the box
2. **Global Configuration** - User-wide settings stored in `~/.autoagent/config.json`
3. **Local Configuration** - Project-specific settings stored in `./.autoagent/config.json`

### Configuration Precedence

Configuration values are merged in the following order (later values override earlier ones):

```
Default Config → Global Config → Local Config → CLI Arguments
```

This means:
- CLI arguments always take precedence
- Local project settings override global settings
- Global settings override defaults
- Defaults are used when no other value is specified

## Configuration Files

### Global Configuration

Location: `~/.autoagent/config.json`

The global configuration file contains user-wide settings that apply to all projects. This is ideal for:
- Default provider preferences
- Personal API rate limit settings
- General behavior preferences

### Local Configuration

Location: `./.autoagent/config.json`

The local configuration file contains project-specific settings. This is ideal for:
- Project-specific provider settings
- Custom instructions for the project
- Team-shared configuration

### Creating Configuration Files

```bash
# Create global configuration
autoagent config init --global

# Create local configuration
autoagent config init
```

## Configuration Options

### Complete Configuration Schema

```json
{
  "defaultProvider": "claude",
  "providers": {
    "claude": {
      "enabled": true,
      "maxTokens": 100000,
      "timeout": 300000
    },
    "gemini": {
      "enabled": true,
      "maxTokens": 100000,
      "timeout": 300000
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
  "enableRollback": true,
  "logLevel": "info",
  "customInstructions": "",
  "workspace": ".",
  "issuesDir": "issues",
  "plansDir": "plans",
  "todoFile": "todo.md"
}
```

### Option Descriptions

#### Core Options

- **`defaultProvider`** (string): Default AI provider to use. Options: `"claude"`, `"gemini"`
  - Default: `"claude"`
  - Example: `"gemini"`

- **`failoverProviders`** (array): Order of providers to try when the primary fails
  - Default: `["claude", "gemini"]`
  - Example: `["gemini", "claude"]`

- **`failoverDelay`** (number): Milliseconds to wait before trying the next provider
  - Default: `2000`
  - Range: 0-60000

- **`workspace`** (string): Working directory for the agent
  - Default: `"."`
  - Example: `"./my-project"`

#### Retry Configuration

- **`retryAttempts`** (number): Maximum number of retry attempts for failed operations
  - Default: `3`
  - Range: 0-10

- **`retryDelay`** (number): Initial delay in milliseconds between retry attempts
  - Default: `1000`
  - Range: 100-10000

#### Token Limits

- **`maxTokens`** (number): Maximum tokens allowed per request
  - Default: `100000`
  - Range: 1000-200000

## Provider Configuration

### Provider-Specific Settings

Each provider can have its own configuration:

```json
{
  "providers": {
    "claude": {
      "enabled": true,
      "maxTokens": 100000,
      "timeout": 300000,
      "customArgs": ["--model", "claude-3-opus"]
    },
    "gemini": {
      "enabled": true,
      "maxTokens": 100000,
      "timeout": 300000,
      "customArgs": ["--temperature", "0.7"]
    }
  }
}
```

### Provider Options

- **`enabled`** (boolean): Whether the provider is available for use
- **`maxTokens`** (number): Provider-specific token limit
- **`timeout`** (number): Execution timeout in milliseconds
- **`customArgs`** (array): Additional CLI arguments for the provider

### Disabling a Provider

```json
{
  "providers": {
    "gemini": {
      "enabled": false
    }
  }
}
```

## Rate Limiting

### Rate Limit Configuration

- **`rateLimitCooldown`** (number): Cooldown period in milliseconds after hitting rate limit
  - Default: `3600000` (1 hour)
  - Example: `7200000` (2 hours)

### Rate Limit Storage

Rate limits are tracked separately from configuration:
- Global: `~/.autoagent/rate-limits.json`
- Local: `./.autoagent/rate-limits.json`

### Rate Limit Format

```json
{
  "claude": {
    "count": 5,
    "resetAt": "2024-01-15T10:30:00.000Z",
    "lastError": "Rate limit exceeded"
  }
}
```

### Clearing Rate Limits

```bash
# Clear all rate limits
autoagent config clear-limits

# Clear specific provider
autoagent config clear-limits claude
```

## Git Integration

### Git Options

- **`gitAutoCommit`** (boolean): Automatically commit after completing issues
  - Default: `true`
  - Example: `false`

- **`gitCommitInterval`** (number): Minimum time between auto-commits (milliseconds)
  - Default: `300000` (5 minutes)
  - Example: `600000` (10 minutes)

- **`includeCoAuthoredBy`** (boolean): Include co-authorship attribution in commits
  - Default: `true`
  - Example: `false`

- **`enableRollback`** (boolean): Enable rollback data capture before execution
  - Default: `true`
  - Example: `false`

### Git Commit Format

When `gitAutoCommit` is enabled, commits are created with:

```
feat: Complete issue from issues/5-add-authentication.md

Co-authored-by: Claude <claude@autoagent>
```

## Logging Configuration

### Log Levels

- **`logLevel`** (string): Logging verbosity level
  - Options: `"error"`, `"warn"`, `"info"`, `"debug"`
  - Default: `"info"`

### Log Level Behaviors

- **`error`**: Only show errors
- **`warn`**: Show errors and warnings
- **`info`**: Show errors, warnings, and informational messages (default)
- **`debug`**: Show all messages including debug information

## Environment Variables

AutoAgent respects the following environment variables:

```bash
# Override default provider
export AUTOAGENT_PROVIDER=gemini

# Set workspace directory
export AUTOAGENT_WORKSPACE=/path/to/project

# Enable debug logging
export AUTOAGENT_DEBUG=true

# Disable auto-commit
export AUTOAGENT_NO_COMMIT=true
```

### Environment Variable Precedence

Environment variables override configuration files but are overridden by CLI arguments:

```
Config Files → Environment Variables → CLI Arguments
```

## CLI Configuration Commands

### Initialize Configuration

```bash
# Create local config
autoagent config init

# Create global config
autoagent config init --global
```

### Set Configuration Values

```bash
# Set default provider
autoagent config set-provider gemini

# Set failover order
autoagent config set-failover gemini,claude

# Enable/disable auto-commit
autoagent config set-auto-commit false

# Set co-authorship
autoagent config set-co-authored-by true
```

### View Configuration

```bash
# Show current configuration
autoagent config show

# Show only active configuration (merged)
autoagent config show --merged
```

### Reset Configuration

```bash
# Reset to defaults
autoagent config reset

# Reset specific option
autoagent config reset defaultProvider
```

## Examples

### Example 1: Development Configuration

```json
{
  "defaultProvider": "claude",
  "gitAutoCommit": false,
  "logLevel": "debug",
  "retryAttempts": 5,
  "customInstructions": "Use ES6 modules and async/await patterns"
}
```

### Example 2: Production Configuration

```json
{
  "defaultProvider": "gemini",
  "failoverProviders": ["gemini", "claude"],
  "gitAutoCommit": true,
  "gitCommitInterval": 600000,
  "logLevel": "warn",
  "rateLimitCooldown": 7200000
}
```

### Example 3: Team Configuration

```json
{
  "defaultProvider": "claude",
  "providers": {
    "claude": {
      "maxTokens": 150000
    }
  },
  "customInstructions": "Follow company coding standards at docs/standards.md",
  "issuesDir": "tasks",
  "plansDir": "specs"
}
```

### Example 4: Limited Token Configuration

```json
{
  "maxTokens": 50000,
  "providers": {
    "claude": {
      "maxTokens": 50000
    },
    "gemini": {
      "maxTokens": 30000
    }
  },
  "retryAttempts": 2
}
```

## Best Practices

### 1. Use Local Configuration for Projects

Keep project-specific settings in local configuration:

```bash
cd my-project
autoagent config init
autoagent config set-provider gemini
```

### 2. Global Configuration for Personal Preferences

Set your personal preferences globally:

```bash
autoagent config init --global
autoagent config set-auto-commit true --global
```

### 3. Custom Instructions

Use custom instructions to provide context:

```json
{
  "customInstructions": "This is a React Native project using TypeScript. Follow the style guide at docs/style.md"
}
```

### 4. Rate Limit Management

Monitor and manage rate limits:

```bash
# Check rate limit status
autoagent config show

# Clear if needed
autoagent config clear-limits
```

### 5. Provider Failover Strategy

Configure failover based on your needs:

```json
{
  "defaultProvider": "claude",
  "failoverProviders": ["claude", "gemini"],
  "failoverDelay": 5000
}
```

### 6. Version Control

Include local configuration in version control:

```bash
# .gitignore
.autoagent/rate-limits.json
.autoagent/cache/

# Include
.autoagent/config.json
```

### 7. Environment-Specific Configuration

Use different configurations for different environments:

```bash
# Development
cp .autoagent/config.dev.json .autoagent/config.json

# Production
cp .autoagent/config.prod.json .autoagent/config.json
```

## Troubleshooting Configuration

### Configuration Not Loading

1. Check file locations:
   ```bash
   ls -la ~/.autoagent/config.json
   ls -la ./.autoagent/config.json
   ```

2. Validate JSON syntax:
   ```bash
   cat .autoagent/config.json | jq .
   ```

3. Check precedence:
   ```bash
   autoagent config show --merged
   ```

### Provider Not Available

1. Check provider configuration:
   ```json
   {
     "providers": {
       "claude": {
         "enabled": true
       }
     }
   }
   ```

2. Verify CLI installation:
   ```bash
   which claude
   which gemini
   ```

### Rate Limits Not Clearing

1. Manually remove rate limit file:
   ```bash
   rm ~/.autoagent/rate-limits.json
   rm ./.autoagent/rate-limits.json
   ```

2. Use force clear:
   ```bash
   autoagent config clear-limits --force
   ```

---

For more help, see the [Troubleshooting Guide](TROUBLESHOOTING.md) or run `autoagent config --help`.