# AutoAgent Lifecycle Events Documentation

This document provides a comprehensive analysis of the AutoAgent lifecycle events, their sequence, and the core components that orchestrate the autonomous task execution system.

## Core Components Architecture

### Entry Points
- `bin/autoagent`: CLI executable entry point
- `src/cli/index.ts`: Command registration and parsing  
- `src/core/autonomous-agent.ts`: Main orchestrator class

### Core Systems
- **ConfigManager**: Global/local configuration management
- **FileManager**: Issue/plan/todo file operations
- **Provider System**: Claude/Gemini AI provider abstraction
- **ReflectionEngine**: Iterative improvement system
- **Git Integration**: Auto-commit/push functionality
- **Rate Limiting**: Provider usage management

## Main Lifecycle Events

### 1. Bootstrap Phase (`bootstrap()`)
- **Purpose**: Project initialization and plan decomposition
- **Key Events**:
  - Master plan file reading
  - Provider selection for decomposition
  - AI-driven issue/plan generation
  - TODO.md creation with issue tracking
  - Reflective improvement (optional)
- **Outputs**: Individual issue files, plan files, updated TODO.md

### 2. Configuration Phase (`initialize()`)
- **Purpose**: Load and merge configuration from multiple sources
- **Key Events**:
  - Global config loading (`~/.autoagent/config.json`)
  - Local config loading (`.autoagent/config.json`)
  - Configuration merging with precedence
  - Provider instruction file creation
- **Outputs**: Merged configuration, provider context files

### 3. Provider Selection Phase (`getAvailableProvider()`)
- **Purpose**: Choose best available AI provider
- **Key Events**:
  - Provider availability checking
  - Rate limit status validation
  - Failover logic execution
  - Provider-specific setup (e.g., Gemini model selection)
- **Outputs**: Active provider instance

### 4. Execution Phase (`executeIssue()`)
- **Purpose**: Process individual issues with AI provider
- **Key Events**:
  - Issue/plan file reading
  - Context file preparation
  - Git validation (if auto-commit enabled)
  - Pre-execution state capture (for rollback)
  - Provider execution with retry logic
  - File change tracking
- **Outputs**: Execution results, modified files

### 5. Post-Execution Phase (`handlePostExecution()`)
- **Purpose**: Complete issue processing and updates
- **Key Events**:
  - TODO.md status updates (marking completed)
  - Provider learning updates
  - Git staging and commit operations
  - Git push operations (if configured)
  - Progress reporting
- **Outputs**: Updated TODO.md, git commits, learning data

### 6. Reflection Phase (`performReflectiveImprovement()`)
- **Purpose**: Iterative improvement of decomposition
- **Key Events**:
  - Decomposition analysis
  - Gap identification
  - Improvement recommendations
  - Iterative refinement cycles
  - Score-based completion criteria
- **Outputs**: Improved issues/plans, reflection metrics

### 7. Status Tracking Phase (`getStatus()`)
- **Purpose**: Monitor progress and system state
- **Key Events**:
  - TODO statistics calculation
  - Provider availability assessment
  - Rate limit status checking
  - Next issue identification
- **Outputs**: Status reports, progress metrics

## ASCII Lifecycle Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                               AUTOAGENT LIFECYCLE                               │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLI ENTRY     │    │   BOOTSTRAP     │    │   CREATE/RUN    │    │   CONFIG/STATUS │
│                 │    │                 │    │                 │    │                 │
│ bin/autoagent   │    │ Master Plan     │    │ Issue Execution │    │ Configuration   │
│ cli/index.ts    │    │ Decomposition   │    │ Task Processing │    │ Status Reports  │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         └───────────────────────┼───────────────────────┼───────────────────────┘
                                 │                       │
                                 ▼                       ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │                AGENT INITIALIZATION                      │
                    │                                                         │
                    │  AutonomousAgent.initialize()                          │
                    │  ├─ ConfigManager.loadConfig()                         │
                    │  ├─ FileManager.createProviderInstructions()           │
                    │  └─ Event emitter setup                                │
                    └─────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │              CONFIGURATION PHASE                        │
                    │                                                         │
                    │  Global Config (~/.autoagent/config.json)              │
                    │           ├─ providers: [claude, gemini]               │
                    │           ├─ retryAttempts: 3                          │
                    │           └─ failoverDelay: 5000ms                     │
                    │                         │                               │
                    │  Local Config (.autoagent/config.json)                 │
                    │           ├─ workspace-specific settings               │
                    │           └─ overrides global settings                 │
                    │                         │                               │
                    │  Merged Configuration                                   │
                    │           └─ defaults < global < local                 │
                    └─────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │             PROVIDER SELECTION PHASE                    │
                    │                                                         │
                    │  ┌─────────────────┐    ┌─────────────────┐            │
                    │  │ Rate Limit Check│    │ Availability    │            │
                    │  │ ├─ Claude        │    │ Check           │            │
                    │  │ ├─ Gemini        │    │ ├─ CLI present  │            │
                    │  │ └─ Cooldowns     │    │ └─ Auth valid   │            │
                    │  └─────────────────┘    └─────────────────┘            │
                    │           │                       │                     │
                    │           └───────────┬───────────┘                     │
                    │                       ▼                                 │
                    │  ┌─────────────────────────────────────┐                │
                    │  │     Provider Selection Logic         │                │
                    │  │ ├─ Specific provider requested?     │                │
                    │  │ ├─ Failover to next available       │                │
                    │  │ └─ Error if all rate limited        │                │
                    │  └─────────────────────────────────────┘                │
                    └─────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
    ┌─────────────────────────────────────────────────────────────────────────────────┐
    │                           EXECUTION PHASE                                        │
    │                                                                                 │
    │  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐           │
    │  │ Pre-Execution   │    │ Core Execution  │    │ Error Handling  │           │
    │  │ ├─ Git validate  │    │ ├─ Issue read    │    │ ├─ Retry logic  │           │
    │  │ ├─ State capture │    │ ├─ Plan read     │    │ ├─ Failover     │           │
    │  │ └─ Context prep  │    │ ├─ Provider call │    │ └─ Rate limit   │           │
    │  └─────────────────┘    │ └─ Output parse  │    └─────────────────┘           │
    │                         └─────────────────┘                                    │
    │                                  │                                             │
    │                                  ▼                                             │
    │  ┌─────────────────────────────────────────────────────────────────────────┐  │
    │  │                    PROVIDER EXECUTION                                    │  │
    │  │                                                                         │  │
    │  │  Claude Provider              │           Gemini Provider               │  │
    │  │  ├─ claude chat                │           ├─ gemini chat               │  │
    │  │  ├─ Context files              │           ├─ Context files             │  │
    │  │  ├─ Stream output              │           ├─ Stream output             │  │
    │  │  └─ Rate limit tracking        │           └─ Rate limit tracking       │  │
    │  │                               │                                         │  │
    │  │  Mock Provider (Testing)       │           Future Providers             │  │
    │  │  ├─ Deterministic output       │           ├─ Extensible interface      │  │
    │  │  └─ No external deps           │           └─ Plugin architecture       │  │
    │  └─────────────────────────────────────────────────────────────────────────┘  │
    └─────────────────────────────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │              POST-EXECUTION PHASE                       │
                    │                                                         │
                    │  ┌─────────────────┐    ┌─────────────────┐            │
                    │  │ TODO Updates    │    │ Git Operations  │            │
                    │  │ ├─ Mark complete │    │ ├─ Stage changes │            │
                    │  │ ├─ Preserve old  │    │ ├─ Create commit │            │
                    │  │ └─ Add new items │    │ └─ Push if config│            │
                    │  └─────────────────┘    └─────────────────┘            │
                    │                                                         │
                    │  ┌─────────────────┐    ┌─────────────────┐            │
                    │  │ Provider Learn  │    │ Progress Report │            │
                    │  │ ├─ Update context│    │ ├─ Emit events  │            │
                    │  │ ├─ Track patterns│    │ ├─ Debug logs   │            │
                    │  │ └─ Store results │    │ └─ User feedback │            │
                    │  └─────────────────┘    └─────────────────┘            │
                    └─────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │            REFLECTION PHASE (Optional)                  │
                    │                                                         │
                    │  ┌─────────────────────────────────────────────────┐   │
                    │  │          Reflective Improvement Loop             │   │
                    │  │                                                 │   │
                    │  │  Analysis → Gaps → Changes → Apply → Validate   │   │
                    │  │      ↑                                    │     │   │
                    │  │      └────────────────────────────────────┘     │   │
                    │  │                                                 │   │
                    │  │  Configuration Controls:                        │   │
                    │  │  ├─ reflection.enabled                          │   │
                    │  │  ├─ reflection.maxIterations                    │   │
                    │  │  ├─ reflection.improvementThreshold             │   │
                    │  │  └─ reflection.skipForSimpleSpecs               │   │
                    │  └─────────────────────────────────────────────────┘   │
                    └─────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │              STATUS TRACKING PHASE                      │
                    │                                                         │
                    │  ┌─────────────────┐    ┌─────────────────┐            │
                    │  │ System Status   │    │ Progress Stats  │            │
                    │  │ ├─ Providers     │    │ ├─ Total issues │            │
                    │  │ ├─ Rate limits   │    │ ├─ Completed    │            │
                    │  │ └─ Availability  │    │ └─ Pending      │            │
                    │  └─────────────────┘    └─────────────────┘            │
                    │                                                         │
                    │  ┌─────────────────┐    ┌─────────────────┐            │
                    │  │ Next Issue      │    │ Rollback Data   │            │
                    │  │ ├─ Auto-select   │    │ ├─ Git commits  │            │
                    │  │ ├─ Priority      │    │ ├─ File backups │            │
                    │  │ └─ Dependencies  │    │ └─ State capture │            │
                    │  └─────────────────┘    └─────────────────┘            │
                    └─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                EVENT FLOW                                        │
│                                                                                 │
│  execution-start → provider-selected → progress-updates → execution-end        │
│        ↓                    ↓                ↓                    ↓            │
│   [Issue #N]         [Provider Name]    [Progress %]        [Result Data]      │
│                                                                                 │
│  error → retry → failover → rate-limit → cooldown → recovery                   │
│    ↓       ↓       ↓          ↓           ↓         ↓                         │
│  [Error]  [Retry]  [Switch]  [Limit]    [Wait]   [Resume]                      │
│                                                                                 │
│  interrupt → abort → cleanup → shutdown                                        │
│      ↓        ↓        ↓         ↓                                             │
│   [SIGINT]  [Cancel] [Save]   [Exit]                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Key Lifecycle Patterns

### Event-Driven Architecture
- EventEmitter-based progress tracking
- Async/await throughout the execution flow
- Signal-based cancellation support
- Graceful shutdown handling

### Resilience Features
- Provider failover with exponential backoff
- Rate limit management with cooldowns
- Retry logic with configurable attempts
- Rollback capability for failed executions

### Configuration Hierarchy
- Defaults → Global (`~/.autoagent/`) → Local (`.autoagent/`) → Runtime
- Hot-reload support for configuration changes
- Provider-specific instruction files

### File Management
- Dynamic issue numbering (prevents conflicts)
- Safe TODO.md updates (preserves existing content)
- Git integration with validation
- Template-based file generation

## Component Interactions

### AutonomousAgent (`src/core/autonomous-agent.ts`)
The central orchestrator that manages the entire lifecycle:
- **Lines 43-67**: Constructor and initialization
- **Lines 80-175**: Core execution logic (`executeIssue()`)
- **Lines 322-406**: Provider selection and failover
- **Lines 528-553**: Post-execution handling
- **Lines 1294-1421**: Bootstrap functionality

### ConfigManager (`src/core/config-manager.ts`)
Handles configuration loading and merging:
- **Lines 46-71**: Multi-source configuration loading
- **Lines 83-96**: Configuration updates and persistence
- Rate limit management and provider availability checking

### FileManager (`src/utils/file-manager.ts`)
Manages file operations for issues, plans, and TODO tracking:
- **Lines 29-49**: Dynamic issue numbering
- **Lines 51-82**: Issue/plan file creation
- TODO.md manipulation with content preservation

### Provider System (`src/providers/`)
Abstraction layer for AI provider interactions:
- **Claude Provider**: `claude` CLI integration with streaming
- **Gemini Provider**: `gemini` CLI integration with model selection
- **Mock Provider**: Testing and development support

### ReflectionEngine (`src/core/reflection-engine.ts`)
Iterative improvement system:
- **Lines 24-41**: Skip conditions for simple specs
- **Lines 43-99**: Reflection prompt generation
- Gap analysis and improvement recommendations

## Error Handling & Recovery

### Provider Failover
1. Primary provider rate limited or unavailable
2. Automatic failover to next available provider
3. Exponential backoff with configurable delays
4. Comprehensive error reporting and logging

### Git Integration Safety
1. Pre-execution validation of git environment
2. Staging and commit operations with user attribution
3. Optional push operations with remote validation
4. Rollback capabilities using git commits and patches

### Rate Limit Management
1. Per-provider rate limit tracking
2. Cooldown periods with remaining time calculation
3. Automatic recovery when limits reset
4. User-friendly error messages with next available time

## Conclusion

The AutoAgent lifecycle is designed for robustness, with comprehensive error handling, provider failover, and state management. The modular architecture allows for easy extension and testing, while the event-driven design enables real-time progress tracking and user feedback.

The system handles complex scenarios like provider failures, rate limiting, git operations, and iterative improvement while maintaining data integrity and providing clear feedback to users throughout the process.