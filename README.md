# Autonomous Agents Template

A template repository for creating autonomous AI agents using Claude. This template provides scripts and structure for task-based autonomous agent workflows.

## Features

- 🤖 Autonomous task execution with Claude or Gemini
- 📋 Issue and plan management system with todo tracking
- 🎨 Beautiful formatted output with progress tracking
- 🔄 Single task or continuous execution modes
- 📝 Structured issue and plan templates

## Prerequisites

- [Claude CLI](https://claude.ai/code) or [Gemini CLI](https://ai.google.dev/docs/gemini_cli) installed and configured
- Bash shell (macOS/Linux)
- `jq` for JSON parsing (install with `brew install jq` or `apt-get install jq`)

## Available Commands

This template provides npm scripts for all operations:

```bash
# Claude commands
npm run agent               # Run Claude agent for one task
npm run agent:auto          # Run Claude agent continuously for all tasks

# Gemini commands
npm run agent:gemini        # Run Gemini agent for one task
npm run agent:gemini:auto   # Run Gemini agent continuously for all tasks

# Other commands
npm run issue         # Create a new issue
npm run bootstrap     # Create a bootstrap issue from master plan
npm run complete      # Manually mark an issue as complete
npm run test          # Run all tests
npm run test:unit     # Run unit tests only
```

## Quick Start

1. **Clone this template**
   ```bash
   git clone <your-repo-url>
   cd autonomous-agents-template
   ```

2. **Create your first issue**
   ```bash
   npm run issue "Build a REST API for user management"
   ```

3. **Run the agent**
   ```bash
   # Run a single task with Claude
   npm run agent

   # Run all tasks continuously with Gemini
   npm run agent:gemini:auto
   ```

## Bootstrapping from a Master Plan

When you have a comprehensive plan or specification document, you can bootstrap your entire project structure:

### 1. **Create Master Plan**
First, create a detailed plan document:
```bash
echo "Your comprehensive project plan..." > master-plan.md
```

### 2. **Create Bootstrap Issue**

#### Using the Bootstrap Command (Recommended)
```bash
# Create bootstrap issue with default master-plan.md
npm run bootstrap

# Or specify a custom plan file
npm run bootstrap -- --plan my-project-spec.md

# Open in editor after creation
npm run bootstrap -- --editor
```

#### Manual Method
```bash
npm run issue "Bootstrap Project from Master Plan"
# Then manually edit the issue to add bootstrap instructions
```

The `create-bootstrap.sh` command automatically creates a properly formatted bootstrap issue that instructs the AI to:
- Read and analyze your master plan document
- Decompose it into individual, actionable issues
- Create implementation plans for each issue
- Update todo.md with all new tasks in proper sequence

### 3. **Run the Agent**
```bash
# Run with Claude
npm run agent

# Or run with Gemini
npm run agent:gemini
```

The AI will read your master plan and automatically:
- Break it down into logical issues
- Create detailed implementation plans
- Set up the entire project structure
- Prepare everything for autonomous execution

### 4. **Execute the Generated Issues**
Once bootstrapping is complete:
```bash
# Review the generated issues and plans
ls issues/
ls plans/

# Run all issues autonomously
npm run agent:auto # or agent:gemini:auto
```

This bootstrapping approach is perfect for:
- Large projects with detailed specifications
- Converting existing documentation into actionable tasks
- Migrating from other project management systems
- Setting up complex multi-phase implementations

## Project Structure

```
autonomous-agents-template/
├── scripts/
│   ├── run-agent.sh      # Main agent runner
│   ├── create-issue.sh   # Create new issues with plans
│   ├── create-bootstrap.sh # Create bootstrap issue from master plan
│   └── complete-issue.sh # Manually mark issues as complete
├── issues/               # Issue definitions (created automatically)
├── plans/                # Implementation plans (created automatically)
├── docs/                 # Documentation
├── examples/             # Example issues and workflows
├── todo.md              # Issue tracking file
├── CLAUDE.md            # Claude-specific project instructions
├── GEMINI.md            # Gemini-specific project instructions
└── README.md            # This file
```

## Scripts

All scripts can be run via npm commands. Use `npm run <command>` instead of calling shell scripts directly.

### `run-agent.sh` (via `npm run agent` or `npm run agent:gemini`)
The main script that runs the AI on your tasks.

**Usage:**
```bash
# Run with Claude
npm run agent
npm run agent:auto

# Run with Gemini
npm run agent:gemini
npm run agent:gemini:auto
```

**Options:**
- `--auto`: Run all pending issues continuously
- `-p, --provider`: Specify the AI provider ('claude' or 'gemini'). Defaults to 'claude'.

### `create-issue.sh` (via `npm run issue`)
Creates a new issue file with corresponding plan and adds it to todo.md.

**Usage:**
```bash
npm run issue [-- --editor] "Issue title"
```

**Options:**
- `--editor`: Open the created issue in your $EDITOR

**Example:**
```bash
npm run issue -- --editor "Implement authentication system"
```

### `create-bootstrap.sh` (via `npm run bootstrap`)
Create a bootstrap issue that decomposes a master plan into individual tasks.

**Usage:**
```bash
npm run bootstrap [-- [--plan <plan-file>] [--editor]]
```

**Options:**
- `--plan <file>`: Path to the plan markdown file (default: master-plan.md)
- `--editor`: Open the created bootstrap issue in your $EDITOR
- `-h, --help`: Show help message

**Examples:**
```bash
# Use default master-plan.md
npm run bootstrap

# Use custom plan file
npm run bootstrap -- --plan docs/project-spec.md

# Open in editor after creation
npm run bootstrap -- --editor
```

### `complete-issue.sh` (via `npm run complete`)
Manually mark an issue as complete (useful if an issue was completed outside the agent).

**Usage:**
```bash
npm run complete <issue_number>
```

**Example:**
```bash
npm run complete 3
```

## Issue and Plan Format

### Issues
Issues are markdown files in the `issues/` directory:

```markdown
# Issue N: Title

## Requirement
[Main requirement or problem to solve]

## Acceptance Criteria
- [ ] Specific criterion 1
- [ ] Specific criterion 2

## Technical Details
[Technical constraints or notes]

## Resources
[Documentation or references]
```

### Plans
Each issue has a corresponding plan in the `plans/` directory:

```markdown
# Plan for Issue N: Title

## Implementation Plan
### Phase 1: Setup
- [ ] Initial tasks

### Phase 2: Core Implementation
- [ ] Main implementation tasks

### Phase 3: Testing & Validation
- [ ] Testing tasks

## Technical Approach
[Architecture decisions]

## Potential Challenges
[Anticipated issues]
```

## Customization

### AI Instructions
Create a `CLAUDE.md` or `GEMINI.md` file in the root directory to provide project-specific instructions:

```markdown
# Project Context
- Architecture: [Your architecture]
- Tech stack: [Your technologies]
- Conventions: [Your coding standards]

# Special Instructions
[Any specific guidelines for the agent]
```

### Environment Variables
- `AUTO_COMMIT`: Set to "true" to auto-commit after each issue completion (requires git)
- `EDITOR`: Your preferred text editor for the --editor flag

## Examples

The `examples/` directory contains comprehensive examples demonstrating various usage patterns:

### Available Examples

- **[basic-usage.js](examples/basic-usage.js)** - Simple example showing how to execute a single issue with progress tracking
- **[provider-failover.js](examples/provider-failover.js)** - Demonstrates automatic provider failover when rate limits are hit
- **[batch-execution.js](examples/batch-execution.js)** - Shows how to execute multiple issues with progress tracking and cancellation
- **[configuration.js](examples/configuration.js)** - Comprehensive configuration examples and validation
- **[custom-integration.js](examples/custom-integration.js)** - Advanced examples for extending AutoAgent with custom functionality
- **[cli-usage.js](examples/cli-usage.js)** - Complete CLI command reference with practical examples

### Running Examples

```bash
# Run any example directly
node examples/basic-usage.js

# Run the CLI usage demo
node examples/cli-usage.js --demo

# Run examples that demonstrate specific features
node examples/provider-failover.js
node examples/batch-execution.js
node examples/configuration.js
```

### Quick Example: Basic Usage

```javascript
const { AutonomousAgent, FileManager, ConfigManager } = require('autoagent');

async function main() {
  const fileManager = new FileManager(process.cwd());
  const configManager = new ConfigManager(process.cwd());
  const agent = new AutonomousAgent(fileManager, configManager);

  // Execute the next pending issue
  const result = await agent.executeNext({
    provider: 'claude',
    onProgress: (percentage, message) => {
      console.log(`${percentage}% - ${message}`);
    }
  });

  if (result.success) {
    console.log('Issue completed successfully!');
  }
}

main().catch(console.error);
```

### Example Templates

The `templates/` directory contains starter templates for creating new issues and plans:

- **[templates/issue.md](templates/issue.md)** - Template for creating new issues with all required sections
- **[templates/plan.md](templates/plan.md)** - Template for creating implementation plans with phases and technical approach

Use these templates when creating issues manually or reference them when building automation tools.

## Best Practices

1. **Clear Issue Definitions**: Be specific about requirements and acceptance criteria
2. **Detailed Plans**: Create comprehensive implementation plans
3. **Incremental Issues**: Break large projects into smaller, testable issues
4. **Context Matters**: Include relevant project context in `CLAUDE.md` or `GEMINI.md`
5. **Review Output**: In non-auto mode, review agent output before proceeding
6. **Version Control**: Commit your issues, plans, and todo.md for tracking

## Troubleshooting

**"claude: command not found"** or **"gemini: command not found"**
- Install the required CLI from its official source.

**"jq: command not found"**
- macOS: `brew install jq`
- Ubuntu/Debian: `sudo apt-get install jq`
- Other: See https://stedolan.github.io/jq/download/

**Issue not being marked complete**
- Check that the agent successfully completed the issue
- Use `./scripts/complete-issue.sh N` to manually mark complete

## Contributing

This is a template repository. Fork it and customize for your needs!

## License

MIT License - See LICENSE file for details