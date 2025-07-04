# Smart Run Command Specification

## Title
Smart Run Command with Plan File Support

## Overview
This specification describes enhancing the `run` command to intelligently handle different input types, including plan files for bootstrapping. This eliminates the need for a separate `bootstrap` command by making `run` smart enough to detect plan files and perform decomposition automatically. The single `run` command will handle plans, issues, and execution workflows seamlessly.

## Background/Problem Statement
Currently, the CLI has conceptual overlap between commands:
1. `autoagent bootstrap master-plan.md` - Creates the initial decomposition issue
2. `autoagent run 1` - Executes issues

This creates an artificial separation where "bootstrap" creates something that immediately needs to be "run". Users must learn two commands for what is essentially one workflow: executing a plan. The bootstrap command is just "run a plan file", making the separation unnecessary and confusing.

## Goals
1. **Unify execution interface** - Single `run` command for all execution workflows
2. **Intelligent input detection** - Command automatically detects what to run
3. **Eliminate command proliferation** - Reduce CLI surface area
4. **Maintain all functionality** - No loss of existing capabilities
5. **Smooth migration path** - Gradual deprecation of bootstrap command

## Non-Goals
1. **Breaking existing run behavior** - Current run functionality is preserved
2. **Changing plan processing logic** - Bootstrap logic remains the same
3. **Altering issue numbering** - Plans still create issue #1
4. **Complex file type detection** - Keep detection simple and reliable
5. **Magic behavior** - Behavior should be predictable and well-documented

## Detailed Design

### Architecture Changes

#### Command Structure
```bash
# Smart run - detects input type and acts accordingly
autoagent run master-plan.md         # Detects plan → bootstrap + execute
autoagent run 1                      # Detects issue number → execute issue
autoagent run implement-auth         # Detects issue name → execute issue  
autoagent run                        # No input → execute next issue
autoagent run --all                  # Execute all pending issues

# Combined with options
autoagent run master-plan.md --provider claude --all
autoagent run project-spec.md --dry-run
```

#### Implementation Approach

1. **Modify bootstrap command registration** in `src/cli/commands/bootstrap.ts`:
   - Add `--run` flag (default true for auto-execution)
   - Add `--all` flag for complete execution
   - Add `--no-run` flag to disable auto-execution (legacy behavior)

2. **Add input type detection** to run command:
   - Detect plan files (`.md` files without issue markers)
   - Detect issue files (`.md` files with issue format)
   - Handle issue numbers and names

3. **Create unified execution flow**:
   ```typescript
   // Pseudo-code for smart run command
   if (isPlanFile(target)) {
     const issueNumber = await agent.bootstrap(target);
     Logger.info('Executing decomposition...');
     const result = await agent.executeIssue(issueNumber);
     
     if (result.success && options.all) {
       await agent.executeAll();
     }
   } else if (isIssueReference(target)) {
     await agent.executeIssue(target);
   } else {
     await agent.executeNext();
   }
   ```

### Code Structure

#### Enhanced Run Command
```typescript
interface RunOptions {
  all?: boolean;
  provider?: string;
  workspace?: string;
  debug?: boolean;
  commit?: boolean;
  coAuthor?: boolean;
  dryRun?: boolean;
}

program
  .command('run [target]')
  .description('Run plan files, issues, or continue execution')
  .option('-p, --provider <provider>', 'Override AI provider')
  .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
  .option('--all', 'Continue executing all issues after initial execution')
  .option('--debug', 'Enable debug output')
  .option('--no-commit', 'Disable auto-commit')
  .option('--dry-run', 'Preview without making changes')
  .action(async (target?: string, options: RunOptions = {}) => {
    // Smart detection and execution
  });
```

#### Input Detection Functions
```typescript
async function isPlanFile(filePath: string): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    // Plan files don't have issue markers like "# Issue N:"
    return !content.match(/^# Issue \d+:/m);
  } catch {
    return false;
  }
}

function isIssueNumber(input: string): boolean {
  return /^\d+$/.test(input);
}

function isIssueFile(input: string): boolean {
  return input.endsWith('.md') && input.includes('-');
}
```

### API Changes

1. **Run command argument** changes:
   - From: `[issue]` (issue number or name only)
   - To: `[target]` (plan files, issues, or names)

2. **Bootstrap command deprecation**:
   - Mark as deprecated in help text
   - Redirect users to `run <plan-file>`
   - Eventually remove in future version

### Error Handling

1. **Bootstrap creation failure** - Exit before attempting execution
2. **Decomposition execution failure** - Report error and exit
3. **Subsequent execution failures** - Follow existing executeAll behavior
4. **Provider availability** - Check before bootstrap and execution
5. **Interrupt handling** - Graceful shutdown at any stage

## Migration Strategy

### Backward Compatibility
1. **Run command enhancement** - Now accepts plan files as input
2. **Bootstrap deprecation** - Gradual removal with migration guidance
3. **No breaking changes** - All existing run usage continues to work

### Migration Steps
1. **Update documentation** - Show new run usage patterns
2. **Add deprecation notice** - Point bootstrap users to run command
3. **Provide migration guide** - Clear steps to update workflows

## Testing Strategy

### Unit Tests
1. **Input type detection** - Test plan vs issue vs number detection
2. **Command routing** - Verify correct execution path for each input type
3. **Backward compatibility** - Ensure existing run behavior preserved

### Integration Tests
1. **Plan file execution** - Run plan files end-to-end
2. **Mixed workflows** - Plan followed by issue execution
3. **Error scenarios** - Invalid files, missing plans, etc.
4. **Backward compatibility** - All existing run scenarios

### E2E Tests
```typescript
describe('Smart Run Command E2E', () => {
  it('should detect and execute plan files', async () => {
    // Create master plan
    await workspace.writeFile('master.md', testMasterPlan);
    
    // Run with plan file
    const result = await cli.execute(['run', 'master.md']);
    
    // Verify decomposition executed
    expect(result.stdout).toContain('Decomposing plan');
    expect(result.stdout).toContain('Executing decomposition');
    expect(result.stdout).toContain('Completed issue #1');
    
    // Verify multiple issues created
    const issues = await workspace.listIssues();
    expect(issues.length).toBeGreaterThan(1);
  });
  
  it('should run all issues with plan + --all', async () => {
    const result = await cli.execute(['run', 'master.md', '--all']);
    
    expect(result.stdout).toContain('Continuing with all issues');
    expect(result.stdout).toMatch(/All \d+ issues completed/);
  });
  
  it('should maintain backward compatibility', async () => {
    await workspace.createIssue(1, 'Test Issue');
    
    const result = await cli.execute(['run', '1']);
    expect(result.stdout).toContain('Executing issue #1');
  });
});
```

## Performance Considerations

1. **No additional overhead** - Combines existing operations
2. **Memory usage** - Same as running commands sequentially
3. **Provider rate limits** - Existing rate limit handling applies
4. **Execution time** - Transparent to users what's happening

## Security Considerations

1. **No new security risks** - Uses existing execution paths
2. **File system access** - Same as current bootstrap + run
3. **Provider credentials** - Handled by existing mechanisms
4. **Git operations** - Respects existing commit settings

## Documentation

### README Updates
```markdown
## Run Command

The run command intelligently handles different input types for seamless execution:

```bash
# Run a plan file - automatically decomposes and executes
autoagent run master-plan.md

# Continue with all issues after decomposition
autoagent run master-plan.md --all

# Run specific issues
autoagent run 1                    # By number
autoagent run implement-auth       # By name
autoagent run                      # Next issue
autoagent run --all               # All issues
```
```

### Command Help Text
```
Usage: autoagent run [target] [options]

Run plan files, issues, or continue execution

Arguments:
  target                     Plan file, issue number/name, or empty for next issue

Options:
  -p, --provider <provider>  Override AI provider (claude or gemini)
  -w, --workspace <path>     Workspace directory (default: current)
  --all                      Continue executing all issues after initial execution
  --debug                    Enable debug output
  --no-commit                Disable auto-commit
  --dry-run                  Preview without making changes
  -h, --help                 Display help

Examples:
  autoagent run master-plan.md     # Decompose and execute plan
  autoagent run 1                  # Execute issue #1
  autoagent run implement-auth     # Execute issue by name
  autoagent run                    # Execute next pending issue
  autoagent run --all             # Execute all pending issues
```

## Implementation Phases

### Phase 1: Core Implementation (Day 1-2)
1. **Add input type detection** to run command
2. **Implement plan file handling** in run workflow
3. **Maintain backward compatibility** for existing run usage
4. **Add clear progress logging** for plan execution

### Phase 2: Bootstrap Deprecation (Day 3-4)
1. **Mark bootstrap command as deprecated**
2. **Add migration guidance** in bootstrap help text
3. **Update error messages** to point to run command
4. **Test migration scenarios** thoroughly

### Phase 5: Bootstrap Removal (Future Release)
1. **Remove bootstrap command entirely** (after 2-3 releases)
2. **Clean up related code** and documentation
3. **Update changelog** with removal notice
4. **Verify no internal dependencies** on bootstrap

### Phase 3: Testing (Day 5-6)
1. **Write unit tests** for input detection
2. **Create integration tests** for plan execution
3. **Add E2E tests** for all run scenarios
4. **Verify backward compatibility** thoroughly

### Phase 4: Documentation (Day 7)
1. **Update README** with unified run examples
2. **Update CHANGELOG** with run enhancement
3. **Create bootstrap migration guide**
4. **Update all documentation** to use run command

## Open Questions

1. **Default behavior change** - Should we make auto-execution opt-in instead of opt-out for safer migration?
   - **Decision**: Make it opt-out with clear documentation

2. **Progress indication** - Should we add a progress bar for multi-issue execution?
   - **Decision**: Use existing progress reporting, enhance if needed later

3. **Failure behavior** - Should --all continue on individual failures or stop?
   - **Decision**: Follow existing executeAll behavior (configurable)

4. **Commit strategy** - Should decomposition and subsequent executions be separate commits?
   - **Decision**: Follow existing auto-commit behavior for each issue

5. **Provider consistency** - Should all executions use the same provider or allow failover?
   - **Decision**: Allow normal failover behavior

## Example Workflows

### Quick Project Setup
```bash
# Decompose and implement entire project
autoagent run project-spec.md --all --provider claude
```

### Controlled Decomposition
```bash
# Decompose only (exits after creating issues)
autoagent run project-spec.md
autoagent list issues
autoagent run 5  # Run specific issue
```

### CI/CD Integration
```bash
# Automated project implementation
autoagent run spec.md --all --no-commit --provider gemini
```

## Success Metrics

1. **Unified interface** - Single run command for all execution needs
2. **Reduced cognitive load** - No need to remember bootstrap vs run
3. **Maintained functionality** - All capabilities preserved
4. **Natural workflow** - "Run this plan" is intuitive
5. **Cleaner CLI** - Fewer commands with clearer purposes