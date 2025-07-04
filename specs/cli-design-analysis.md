# CLI Design Analysis: Bootstrap Integration

## Current Design Problems

1. **Two-step workflow** - Users must run two commands for a common task
2. **Conceptual overlap** - Bootstrap creates an issue that needs to be run
3. **Command proliferation** - More commands = more complexity
4. **Artificial separation** - Bootstrap is just "run a plan file"

## Design Option Analysis

### Option 1: Smart Run Command (Recommended)
```bash
# Run detects input type and acts accordingly
autoagent run master-plan.md    # Detects plan file → bootstrap + execute
autoagent run 1                  # Detects issue number → execute issue
autoagent run implement-auth     # Detects issue name → execute issue
autoagent run                    # No input → execute next issue
autoagent run --all             # Execute all pending issues
```

**Pros:**
- Single command for all execution scenarios
- Intuitive - "run" works on whatever you give it
- Follows "Do What I Mean" principle
- Reduces cognitive load

**Cons:**
- Slightly magical behavior
- Need clear documentation
- More complex implementation

### Option 2: Explicit Subcommands
```bash
autoagent run plan master-plan.md   # Bootstrap and execute
autoagent run issue 1               # Run specific issue
autoagent run next                  # Run next issue
autoagent run all                   # Run all issues
```

**Pros:**
- Very explicit
- No ambiguity
- Easy to document

**Cons:**
- More verbose
- Breaks existing interface
- Still multiple commands to remember

### Option 3: File-based Flag
```bash
autoagent run --plan master-plan.md  # Bootstrap from plan
autoagent run 1                      # Run issue
autoagent run --all                  # Run all
```

**Pros:**
- Clear distinction with flag
- Maintains current interface
- Explicit intent

**Cons:**
- Flag feels awkward for primary argument
- Still two mental models

### Option 4: Pipeline Commands (Git-style)
```bash
autoagent init master-plan.md    # Bootstrap (like git init)
autoagent run                    # Run next
autoagent run --all             # Run all
```

**Pros:**
- Familiar pattern from git
- Clear separation
- "init" better describes bootstrap

**Cons:**
- Still two commands
- Doesn't solve the core problem

## Recommended Implementation: Smart Run

The smart run command provides the best user experience:

```typescript
export function registerRunCommand(program: Command): void {
  program
    .command('run [target]')
    .description('Run issues, plans, or continue execution')
    .option('--all', 'Run all pending issues')
    .option('--continue', 'Continue from a plan file after bootstrap')
    // ... other options
    .action(async (target?: string, options: RunOptions = {}) => {
      if (target && target.endsWith('.md')) {
        // Detect plan file
        if (await isPlanFile(target)) {
          await runPlan(target, options);
        } else if (await isIssueFile(target)) {
          await runIssue(target, options);
        }
      } else if (target && /^\d+$/.test(target)) {
        // Issue number
        await runIssue(parseInt(target), options);
      } else if (target) {
        // Issue name search
        await runIssueByName(target, options);
      } else if (options.all) {
        // Run all
        await runAll(options);
      } else {
        // Run next
        await runNext(options);
      }
    });
}
```

## Migration Path

### Phase 1: Add Plan Support to Run
- Detect `.md` files in run command
- Check if it's a plan (no issue markers) vs issue file
- Execute bootstrap + run for plans

### Phase 2: Deprecate Bootstrap
- Mark bootstrap command as deprecated
- Point users to `run <plan-file>`
- Maintain for 2-3 versions

### Phase 3: Remove Bootstrap
- Remove bootstrap command entirely
- Update all documentation

## Usage Examples

### Before (Current)
```bash
# Initialize project
autoagent bootstrap project-spec.md
autoagent run 1
autoagent run --all

# Or forget the second step and wonder why nothing happened
autoagent bootstrap project-spec.md
# ... user confusion ...
```

### After (Smart Run)
```bash
# Initialize project - one command
autoagent run project-spec.md --all

# Natural progression
autoagent run project-spec.md    # Creates and runs decomposition
autoagent run 2                  # Run specific task
autoagent run --all             # Finish everything
```

## Decision Matrix

| Criteria | Keep Separate | Smart Run | Subcommands | File Flag |
|----------|--------------|-----------|-------------|-----------|
| Ease of Use | 2/5 | 5/5 | 3/5 | 3/5 |
| Discoverability | 4/5 | 4/5 | 5/5 | 3/5 |
| Implementation | 5/5 | 2/5 | 3/5 | 4/5 |
| Backward Compat | 5/5 | 4/5 | 1/5 | 4/5 |
| Intuitiveness | 2/5 | 5/5 | 4/5 | 3/5 |
| **Total** | 18/25 | 20/25 | 16/25 | 17/25 |

## Final Recommendation

Implement the **Smart Run Command** approach because:

1. **Optimal UX** - Single command for all execution workflows
2. **Natural mental model** - "Run this thing" works for plans, issues, or all
3. **Reduces friction** - Common workflow becomes one command
4. **Future-proof** - Can add more "runnable" types later
5. **Maintains simplicity** - Despite smart behavior, concept is simple

The bootstrap command should be deprecated but maintained for backward compatibility, with clear migration messages pointing to the new approach.