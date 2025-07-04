# Git Commit No-Verify Configuration Specification

## Title
Git Commit `--no-verify` Flag Configuration and Runtime Control

## Overview
This specification describes adding support for the `--no-verify` flag to git commits, along with configuration options to control this behavior globally and per-execution. The `--no-verify` flag bypasses git hooks (pre-commit, commit-msg, etc.) which can be essential in automated environments or when hooks are causing unwanted delays or failures.

## Background/Problem Statement
Currently, AutoAgent creates git commits without any mechanism to bypass git hooks. This creates several issues in various scenarios:

1. **CI/CD pipelines** - Pre-commit hooks may fail in automated environments or require interactive input
2. **Development workflows** - Slow or broken git hooks can interrupt autonomous execution
3. **Hook conflicts** - Pre-commit hooks may conflict with auto-generated commit messages or file modifications
4. **Testing environments** - Hooks designed for human workflows may not be appropriate for automated testing
5. **Emergency scenarios** - Critical fixes may need to bypass broken or misconfigured hooks

Users currently have no way to control whether git hooks are executed during auto-commit operations, leading to:
- Failed executions due to hook failures
- Long delays from slow hooks
- Interrupted workflows from interactive hooks
- No flexibility for different deployment scenarios

## Goals
1. **Add `--no-verify` support** - Enable bypassing git hooks during auto-commit
2. **Global configuration** - Allow users to set default behavior in config files
3. **Runtime override** - Provide CLI flags to override default behavior per execution
4. **Backward compatibility** - Maintain existing behavior by default (hooks enabled)
5. **Clear documentation** - Explain when and why to use `--no-verify`
6. **Flexible control** - Support both enabling and disabling at runtime

## Non-Goals
1. **Hook management** - Don't attempt to install, modify, or debug git hooks
2. **Selective hook bypassing** - Don't provide granular control over individual hook types
3. **Hook execution logging** - Don't attempt to capture or report hook output
4. **Hook compatibility testing** - Don't validate hook compatibility
5. **Alternative hook systems** - Focus only on standard git hooks

## Detailed Design

### Architecture Changes

#### Configuration Interface Updates
```typescript
// In src/types/index.ts
export interface UserConfig {
  // ... existing fields
  /** Whether to automatically commit changes */
  gitAutoCommit: boolean;
  /** Skip git hooks when auto-committing */
  gitCommitNoVerify: boolean;
  /** Include co-authored-by in commit messages */
  includeCoAuthoredBy?: boolean;
}

export interface AgentConfig {
  // ... existing fields
  /** Whether to automatically commit changes */
  autoCommit?: boolean;
  /** Skip git hooks during commits */
  noVerify?: boolean;
  /** Include co-authored-by in commit messages */
  includeCoAuthoredBy?: boolean;
}
```

#### Git Utility Function Updates
```typescript
// In src/utils/git.ts
export interface CommitOptions {
  message: string;
  coAuthor?: {
    name: string;
    email: string;
  };
  signoff?: boolean;
  /** Skip git hooks (--no-verify flag) */
  noVerify?: boolean;
}

export async function createCommit(options: CommitOptions): Promise<GitCommitResult> {
  try {
    const { message, coAuthor, signoff, noVerify } = options;
    
    // Build commit message with co-author if provided
    let fullMessage = message;
    if (coAuthor) {
      fullMessage += `\n\nCo-authored-by: ${coAuthor.name} <${coAuthor.email}>`;
    }

    // Build git commit command
    let command = `git commit -m "${fullMessage.replace(/"/g, '\\"')}"`;
    
    if (signoff === true) {
      command += ' --signoff';
    }
    
    if (noVerify === true) {
      command += ' --no-verify';
    }

    const { stdout } = await execAsync(command);
    
    // Extract commit hash from output
    const hashMatch = stdout.match(/\[[\w\s-]+\s+([a-f0-9]+)\]/);
    const commitHash = hashMatch ? hashMatch[1] : undefined;

    return {
      success: true,
      commitHash
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
```

### Implementation Approach

#### 1. Configuration Manager Updates
```typescript
// In src/core/config-manager.ts
export class ConfigManager {
  // ... existing methods

  private getDefaultConfig(): UserConfig {
    return {
      // ... existing defaults
      gitAutoCommit: false,
      gitCommitNoVerify: false, // Default: respect git hooks
      includeCoAuthoredBy: true,
    };
  }

  public async setGitCommitNoVerify(noVerify: boolean): Promise<void> {
    const config = await this.getConfig();
    config.gitCommitNoVerify = noVerify;
    await this.saveConfig(config);
  }

  public async getGitCommitNoVerify(): Promise<boolean> {
    const config = await this.getConfig();
    return config.gitCommitNoVerify ?? false;
  }
}
```

#### 2. Autonomous Agent Updates
```typescript
// In src/core/autonomous-agent.ts
export class AutonomousAgent extends EventEmitter {
  // ... existing code

  private async performGitCommit(issue: Issue, result: ExecutionResult): Promise<void> {
    try {
      // Check if git is available and we're in a repo
      const gitAvailable = await checkGitAvailable();
      const isRepo = await isGitRepository();

      if (gitAvailable !== true || isRepo !== true) {
        if (this.config.debug === true) {
          this.reportProgress('Git not available or not in a repository', 0);
        }
        return;
      }

      // Check if there are changes to commit
      const hasChanges = await hasChangesToCommit();
      if (!hasChanges) {
        return; // No changes to commit
      }

      // Stage all changes
      await stageAllChanges();

      // Create commit message
      const issueName = `${issue.number}-${issue.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
      const commitMessage = `feat: Complete issue from issues/${issueName}.md`;

      // Determine no-verify setting (runtime override takes precedence)
      const userConfig = this.configManager.getConfig();
      const noVerify = this.config.noVerify ?? userConfig.gitCommitNoVerify ?? false;

      if (this.config.debug === true && noVerify) {
        this.reportProgress('Committing with --no-verify (skipping git hooks)', 90);
      }

      // Create commit with optional co-authorship and no-verify
      const commitResult = await createCommit({
        message: commitMessage,
        coAuthor: (this.config.includeCoAuthoredBy === true && result.provider !== undefined) ? {
          name: result.provider.charAt(0).toUpperCase() + result.provider.slice(1),
          email: `${result.provider}@autoagent-cli`
        } : undefined,
        noVerify
      });

      if (commitResult.success) {
        this.reportProgress('Changes committed to git', 95);

        // Store commit hash in result for potential rollback
        if (commitResult.commitHash !== undefined && commitResult.commitHash !== '' && result.rollbackData !== undefined) {
          result.rollbackData.gitCommit = commitResult.commitHash;
        }
      } else if (this.config.debug === true) {
        this.reportProgress(`Git commit failed: ${commitResult.error ?? 'Unknown error'}`, 0);
      }
    } catch (error) {
      // Log error but don't fail the execution
      if (this.config.debug === true) {
        this.reportProgress(`Git commit error: ${error instanceof Error ? error.message : String(error)}`, 0);
      }
    }
  }
}
```

#### 3. CLI Command Updates
```typescript
// In src/cli/commands/run.ts
interface RunOptions {
  all?: boolean;
  provider?: string;
  workspace?: string;
  debug?: boolean;
  commit?: boolean;
  coAuthor?: boolean;
  dryRun?: boolean;
  verify?: boolean;    // New: --verify flag
  noVerify?: boolean;  // New: --no-verify flag
}

export function registerRunCommand(program: Command): void {
  program
    .command('run [issue]')
    .description('Run the specified issue, next issue, or all issues')
    .option('-p, --provider <provider>', 'Override AI provider for this run (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .option('--all', 'Run all pending issues')
    .option('--debug', 'Enable debug output')
    .option('--no-commit', 'Disable auto-commit for this run')
    .option('--commit', 'Enable auto-commit for this run')
    .option('--no-co-author', 'Disable co-authorship for this run')
    .option('--co-author', 'Enable co-authorship for this run')
    .option('--dry-run', 'Preview what would be done without making changes')
    .option('--verify', 'Enable git hooks during commits (default)')
    .option('--no-verify', 'Skip git hooks during commits (--no-verify)')
    .action(async (issue?: string, options: RunOptions = {}) => {
      try {
        const workspacePath = options.workspace ?? process.cwd();
        
        // Handle conflicting verify options
        let noVerify: boolean | undefined;
        if (options.noVerify === true && options.verify === true) {
          Logger.warning('⚠️  Both --verify and --no-verify specified. Using --no-verify.');
          noVerify = true;
        } else if (options.noVerify === true) {
          noVerify = true;
        } else if (options.verify === true) {
          noVerify = false;
        }
        // Otherwise, noVerify remains undefined and will use config default
        
        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace,
          debug: options.debug,
          autoCommit: options.commit !== undefined ? options.commit : undefined,
          includeCoAuthoredBy: options.coAuthor !== undefined ? options.coAuthor : undefined,
          noVerify,  // New: pass no-verify setting
          dryRun: options.dryRun,
          signal: abortController.signal,
          onProgress: (message: string, percentage?: number): void => {
            if (percentage !== undefined) {
              Logger.info(`[${percentage}%] ${message}`);
            } else {
              Logger.info(message);
            }
          }
        });

        // ... rest of existing logic
      } catch (error) {
        // ... existing error handling
      }
    });
}
```

#### 4. Configuration Command Updates
```typescript
// In src/cli/commands/config.ts
export function registerConfigCommand(program: Command): void {
  const configCmd = program
    .command('config')
    .description('Manage configuration settings');

  // ... existing subcommands

  configCmd
    .command('set-git-no-verify <value>')
    .description('Enable or disable git hooks during auto-commit (true/false)')
    .option('-g, --global', 'Set global configuration')
    .action(async (value: string, options: ConfigOptions = {}) => {
      try {
        const configManager = new ConfigManager(options.global ? undefined : process.cwd());
        const boolValue = value.toLowerCase() === 'true';
        
        await configManager.setGitCommitNoVerify(boolValue);
        
        Logger.success(`✅ Git commit no-verify set to: ${boolValue}`);
        Logger.info(`Commits will ${boolValue ? 'skip' : 'run'} git hooks`);
      } catch (error) {
        Logger.error(`❌ Failed to set git commit no-verify: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });

  // Update show command to display no-verify setting
  configCmd
    .command('show')
    .description('Show current configuration')
    .option('-g, --global', 'Show global configuration')
    .action(async (options: ConfigOptions = {}) => {
      try {
        const configManager = new ConfigManager(options.global ? undefined : process.cwd());
        const config = await configManager.getConfig();
        
        Logger.info('📋 Current configuration:');
        Logger.info(`   Default provider: ${config.providers[0] ?? 'none'}`);
        Logger.info(`   Failover providers: ${config.providers.slice(1).join(', ') || 'none'}`);
        Logger.info(`   Auto-commit: ${config.gitAutoCommit ? 'enabled' : 'disabled'}`);
        Logger.info(`   Git hooks: ${config.gitCommitNoVerify ? 'disabled (--no-verify)' : 'enabled'}`);
        Logger.info(`   Co-authored commits: ${config.includeCoAuthoredBy ? 'enabled' : 'disabled'}`);
        // ... rest of existing config display
      } catch (error) {
        Logger.error(`❌ Failed to load configuration: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}
```

### Code Structure

#### New Configuration Options
```typescript
// Configuration hierarchy (highest precedence first):
// 1. CLI flags (--verify, --no-verify)
// 2. AgentConfig.noVerify
// 3. UserConfig.gitCommitNoVerify
// 4. Default (false - hooks enabled)

interface GitCommitBehavior {
  respectHooks: boolean;
  source: 'default' | 'config' | 'runtime' | 'cli';
}

function resolveGitCommitBehavior(
  cliNoVerify?: boolean,
  cliVerify?: boolean,
  runtimeNoVerify?: boolean,
  configNoVerify?: boolean
): GitCommitBehavior {
  if (cliNoVerify === true) {
    return { respectHooks: false, source: 'cli' };
  }
  if (cliVerify === true) {
    return { respectHooks: true, source: 'cli' };
  }
  if (runtimeNoVerify !== undefined) {
    return { respectHooks: !runtimeNoVerify, source: 'runtime' };
  }
  if (configNoVerify !== undefined) {
    return { respectHooks: !configNoVerify, source: 'config' };
  }
  return { respectHooks: true, source: 'default' };
}
```

### API Changes

1. **CommitOptions interface** - Add `noVerify?: boolean` field
2. **UserConfig interface** - Add `gitCommitNoVerify: boolean` field  
3. **AgentConfig interface** - Add `noVerify?: boolean` field
4. **CLI options** - Add `--verify` and `--no-verify` flags to run command
5. **Config commands** - Add `set-git-no-verify` subcommand

### Error Handling

1. **Conflicting CLI flags** - Warn user when both `--verify` and `--no-verify` are specified
2. **Invalid config values** - Validate boolean values in configuration
3. **Git command failures** - Existing git error handling remains unchanged
4. **Hook failures** - When hooks are enabled and fail, provide clear error messages
5. **Debug logging** - Show whether hooks are enabled/disabled in debug mode

## Migration Strategy

### Backward Compatibility
- **Default behavior unchanged** - Hooks remain enabled by default
- **Existing configurations** - No migration needed for existing config files
- **CLI compatibility** - All existing CLI options continue to work
- **No breaking changes** - New functionality is purely additive

### Configuration Migration
1. **Automatic addition** - New `gitCommitNoVerify` field automatically added with `false` default
2. **Version compatibility** - Older config files work without modification
3. **Graceful degradation** - Missing config fields use sensible defaults

## Testing Strategy

### Unit Tests
1. **CommitOptions testing**:
   ```typescript
   describe('createCommit', () => {
     it('should add --no-verify flag when noVerify is true', async () => {
       const execSpy = vi.spyOn(child_process, 'exec');
       
       await createCommit({
         message: 'Test commit',
         noVerify: true
       });
       
       expect(execSpy).toHaveBeenCalledWith(
         expect.stringContaining('git commit -m "Test commit" --no-verify')
       );
     });

     it('should not add --no-verify flag when noVerify is false', async () => {
       const execSpy = vi.spyOn(child_process, 'exec');
       
       await createCommit({
         message: 'Test commit',
         noVerify: false
       });
       
       expect(execSpy).toHaveBeenCalledWith(
         expect.stringMatching(/^git commit -m "Test commit"(?!.*--no-verify)/)
       );
     });

     it('should combine flags correctly', async () => {
       const execSpy = vi.spyOn(child_process, 'exec');
       
       await createCommit({
         message: 'Test commit',
         signoff: true,
         noVerify: true
       });
       
       expect(execSpy).toHaveBeenCalledWith(
         expect.stringContaining('git commit -m "Test commit" --signoff --no-verify')
       );
     });
   });
   ```

2. **Configuration testing**:
   ```typescript
   describe('ConfigManager', () => {
     it('should set and get git commit no-verify setting', async () => {
       const configManager = new ConfigManager();
       
       await configManager.setGitCommitNoVerify(true);
       const result = await configManager.getGitCommitNoVerify();
       
       expect(result).toBe(true);
     });

     it('should default to false for git commit no-verify', async () => {
       const configManager = new ConfigManager();
       const result = await configManager.getGitCommitNoVerify();
       
       expect(result).toBe(false);
     });
   });
   ```

3. **Agent configuration testing**:
   ```typescript
   describe('AutonomousAgent git commit behavior', () => {
     it('should use runtime noVerify setting over config', async () => {
       const agent = new AutonomousAgent({
         autoCommit: true,
         noVerify: true  // Runtime override
       });
       
       // Mock config to return false
       vi.mocked(configManager.getConfig).mockResolvedValue({
         gitCommitNoVerify: false
       });
       
       const createCommitSpy = vi.spyOn(gitUtils, 'createCommit');
       
       await agent.performGitCommit(mockIssue, mockResult);
       
       expect(createCommitSpy).toHaveBeenCalledWith(
         expect.objectContaining({ noVerify: true })
       );
     });
   });
   ```

### Integration Tests
1. **CLI flag testing**:
   ```typescript
   describe('Run command with git options', () => {
     it('should pass no-verify flag to agent', async () => {
       const result = await cli.execute([
         'run', '1', '--commit', '--no-verify'
       ]);
       
       expect(result.exitCode).toBe(0);
       // Verify that git commit was called with --no-verify
     });

     it('should handle conflicting verify flags', async () => {
       const result = await cli.execute([
         'run', '1', '--commit', '--verify', '--no-verify'
       ]);
       
       expect(result.stdout).toContain('Using --no-verify');
     });
   });
   ```

2. **Configuration command testing**:
   ```typescript
   describe('Config command git settings', () => {
     it('should set git no-verify configuration', async () => {
       const result = await cli.execute([
         'config', 'set-git-no-verify', 'true'
       ]);
       
       expect(result.exitCode).toBe(0);
       expect(result.stdout).toContain('Git commit no-verify set to: true');
     });

     it('should show git no-verify in configuration display', async () => {
       await cli.execute(['config', 'set-git-no-verify', 'true']);
       
       const result = await cli.execute(['config', 'show']);
       
       expect(result.stdout).toContain('Git hooks: disabled (--no-verify)');
     });
   });
   ```

### E2E Tests
```typescript
describe('Git No-Verify E2E', () => {
  it('should skip pre-commit hooks when no-verify is enabled', async () => {
    const workspace = await TestWorkspace.createWithGit();
    
    // Add a failing pre-commit hook
    await workspace.writeFile('.git/hooks/pre-commit', `#!/bin/sh
echo "Pre-commit hook executed"
exit 1
`);
    await workspace.exec('chmod +x .git/hooks/pre-commit');
    
    // Run with no-verify should succeed despite failing hook
    const result = await cli.execute([
      'run', '1', '--commit', '--no-verify'
    ], { cwd: workspace.path });
    
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Changes committed');
  });

  it('should fail when hooks are enabled and hook fails', async () => {
    const workspace = await TestWorkspace.createWithGit();
    
    // Add a failing pre-commit hook
    await workspace.writeFile('.git/hooks/pre-commit', `#!/bin/sh
echo "Pre-commit hook failed"
exit 1
`);
    await workspace.exec('chmod +x .git/hooks/pre-commit');
    
    // Run with hooks enabled should fail
    const result = await cli.execute([
      'run', '1', '--commit', '--verify'
    ], { cwd: workspace.path });
    
    expect(result.exitCode).toBe(0); // Execution succeeds but commit fails
    expect(result.stderr).toContain('Git commit failed');
  });
});
```

## Performance Considerations

1. **Minimal overhead** - Flag only adds a few characters to git command
2. **Hook bypass benefits** - Skipping slow hooks can significantly improve performance
3. **No additional git operations** - Uses existing git commit infrastructure
4. **Configuration caching** - Config values are cached for performance
5. **Command building efficiency** - String concatenation is minimal and fast

### Performance Optimizations
- **Lazy flag evaluation** - Only determine no-verify setting when committing
- **String template reuse** - Optimize command string building
- **Configuration lookup** - Use cached config values when possible

## Security Considerations

1. **Hook bypass implications** - Skipping hooks may bypass security checks
2. **User awareness** - Clear documentation about security implications
3. **Audit trail** - Debug logs show when hooks are bypassed
4. **Default security** - Hooks enabled by default for security
5. **No credential exposure** - No additional credential or sensitive data handling

### Security Measures
- **Conservative defaults** - Hooks enabled by default
- **Clear logging** - Debug mode shows when hooks are bypassed
- **Documentation warnings** - Explain security implications of `--no-verify`
- **Audit considerations** - Recommend enabling hooks in production environments

### Security Implications of `--no-verify`
When `--no-verify` is used, the following git hooks are bypassed:
- **pre-commit** - May skip code quality checks, security scans, or formatting
- **prepare-commit-msg** - May skip automatic commit message generation
- **commit-msg** - May skip commit message validation or formatting
- **post-commit** - May skip notifications or additional processing

Users should understand these implications and only use `--no-verify` when appropriate.

## Documentation

### User Documentation Updates
1. **README.md** - Add git hooks section:
   ```markdown
   ## Git Hooks Configuration

   AutoAgent supports configuring git hook behavior during auto-commit:

   ```bash
   # Disable git hooks globally (use --no-verify)
   autoagent config set-git-no-verify true

   # Enable git hooks globally (default)
   autoagent config set-git-no-verify false

   # Override per execution
   autoagent run 1 --commit --no-verify    # Skip hooks for this run
   autoagent run 1 --commit --verify       # Force hooks for this run
   ```

   ### When to use `--no-verify`
   - **CI/CD pipelines** where hooks may fail or be inappropriate
   - **Testing environments** where hooks are not needed
   - **Emergency situations** where hooks are broken or blocking
   - **Automated environments** where human-oriented hooks are not relevant

   **Security Warning**: Using `--no-verify` bypasses pre-commit hooks that may include security checks, code quality validation, or other important safeguards.
   ```

2. **Configuration guide**:
   ```markdown
   ## Git Configuration Options

   | Setting | Description | Default | Values |
   |---------|-------------|---------|---------|
   | `gitAutoCommit` | Enable automatic commits | `false` | `true`, `false` |
   | `gitCommitNoVerify` | Skip git hooks during commits | `false` | `true`, `false` |
   | `includeCoAuthoredBy` | Add co-author to commits | `true` | `true`, `false` |

   ### Example Configuration
   ```json
   {
     "gitAutoCommit": true,
     "gitCommitNoVerify": false,
     "includeCoAuthoredBy": true
   }
   ```
   ```

3. **CLI help text**:
   ```bash
   autoagent run --help
   
   Options:
     --commit              Enable auto-commit for this run
     --no-commit          Disable auto-commit for this run
     --verify             Enable git hooks during commits (default)
     --no-verify          Skip git hooks during commits (--no-verify)
   ```

### Developer Documentation
1. **Architecture docs** - Document git hook handling in commit process
2. **API reference** - Document new configuration options and commit parameters
3. **Testing guide** - Examples of testing git hook scenarios

## Implementation Steps

1. **Update CommitOptions interface** and `createCommit` function in git utilities
2. **Add configuration fields** to UserConfig and AgentConfig interfaces
3. **Implement configuration management** methods for git no-verify setting
4. **Update AutonomousAgent** to pass no-verify setting to git operations
5. **Add CLI flags** to run command for runtime override
6. **Implement config commands** for managing git no-verify setting
7. **Write comprehensive tests** covering all scenarios and edge cases
8. **Update documentation** with usage examples and security considerations

## Open Questions

1. **Should we log hook execution details?**
   - **Decision**: Only log whether hooks are enabled/disabled in debug mode

2. **Should we validate that hooks exist before trying to skip them?**
   - **Decision**: No, let git handle hook existence validation

3. **Should we provide per-hook-type control (pre-commit vs commit-msg)?**
   - **Decision**: No, keep it simple with all-or-nothing `--no-verify`

4. **Should we warn users when hooks are disabled?**
   - **Decision**: Only show in debug mode to avoid noise

5. **Should we support environment variable override?**
   - **Decision**: Yes, add `AUTOAGENT_GIT_NO_VERIFY` environment variable

## Example Workflows

### Development Workflow with Slow Hooks
```bash
# Global setting to skip hooks in development
autoagent config set-git-no-verify true

# Run normally (will skip hooks)
autoagent run 1 --commit

# Force hooks for important commits
autoagent run 2 --commit --verify
```

### CI/CD Pipeline Configuration
```bash
# Set no-verify for automated environment
export AUTOAGENT_GIT_NO_VERIFY=true

# Run full automation without hook interference
autoagent run project-spec.md --all --commit
```

### Emergency Fix Workflow
```bash
# Skip hooks for urgent fix
autoagent run critical-fix --commit --no-verify
```

### Testing Environment
```bash
# Disable hooks in testing configuration
{
  "gitAutoCommit": true,
  "gitCommitNoVerify": true,
  "includeCoAuthoredBy": false
}
```

## Success Metrics

1. **Flexible git integration** - Users can control hook behavior based on their needs
2. **Improved automation reliability** - Fewer failures due to hook issues in CI/CD
3. **Maintained security** - Hooks enabled by default with clear warnings about bypassing
4. **Clear user control** - Multiple ways to configure behavior (config, CLI, environment)
5. **Backward compatibility** - Existing workflows continue to work unchanged