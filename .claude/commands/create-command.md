Create a new slash command based on the user's input. The user will provide the command name and the instruction text. Create the appropriate markdown file in .claude/commands/ with the given name and content.

## Slash Command Guidelines (from Claude Code docs):

### Command Structure
- Project commands: stored in `.claude/commands/` directory (use prefix `/project:`)
- Personal commands: stored in `~/.claude/commands/` directory (use prefix `/user:`)
- Command files must be Markdown files (`.md` extension)

### Naming Conventions
- Use lowercase with hyphens for multi-word commands (e.g., `validate-code.md`)
- Commands support namespacing with subdirectories (e.g., `.claude/commands/testing/unit.md` → `/project:testing:unit`)

### Command Features
- **Dynamic Arguments**: Commands can accept arguments when invoked
- **File References**: Can reference specific files or patterns
- **Bash Integration**: Can include bash commands to execute
- **Extended Thinking**: Can trigger extended thinking mode for complex tasks

### Example Command Creation
To create a command named "optimize" that analyzes performance:
```bash
mkdir -p .claude/commands
echo "Analyze this code for performance issues:" > .claude/commands/optimize.md
```

### Usage
After creation, use the command with: `/project:command-name` or `/user:command-name`

When creating the new command, ensure:
1. The filename uses lowercase with hyphens (not spaces or underscores)
2. The file has a `.md` extension
3. The content is clear and specific about what Claude should do
4. Consider if the command should be project-specific or personal