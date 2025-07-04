# Git Repository Check for Auto-commit Specification

## Title
Git Repository Validation Before Auto-commit Execution

## Overview
This specification describes adding a validation check to ensure the working directory is a git repository before attempting auto-commit operations during issue execution. When auto-commit is enabled, the system should verify git repository status early in the execution process to provide clear feedback and prevent silent failures.

## Background/Problem Statement
Currently, when auto-commit is enabled in the configuration, the system only checks for git repository status during the post-execution phase (`handlePostExecution`). This leads to several issues:

1. **Late failure detection** - Users only discover git issues after the entire issue execution completes
2. **Wasted execution time** - Issues are fully executed before discovering commit will fail
3. **Unclear user experience** - Silent failures in git operations with minimal feedback
4. **Inconsistent behavior** - Auto-commit setting is accepted but ignored without clear indication
5. **Resource waste** - AI provider calls are made unnecessarily when commits will fail

The current implementation in `performGitCommit()` already has git validation logic, but it runs too late in the process and provides limited user feedback.

## Goals
1. **Early validation** - Check git repository status before starting issue execution when auto-commit is enabled
2. **Clear user feedback** - Provide informative messages about git repository requirements
3. **Fail fast approach** - Exit early if auto-commit is enabled but git requirements aren't met
4. **Resource efficiency** - Avoid unnecessary AI provider calls when commit will fail
5. **Consistent behavior** - Auto-commit settings should be respected and validated uniformly
6. **Helpful guidance** - Suggest remediation steps when git validation fails

## Non-Goals
1. **Automatic git initialization** - Don't automatically run `git init` for users
2. **Git configuration changes** - Don't modify user's git settings
3. **Breaking existing workflows** - Users with auto-commit disabled should be unaffected
4. **Complex git operations** - Keep validation simple and focused
5. **Cross-platform git installation** - Don't attempt to install git if missing

## Detailed Design

### Architecture Changes

#### Validation Logic Flow
```typescript
async function validateGitForAutoCommit(config: AgentConfig): Promise<void> {
  // Only validate if auto-commit is enabled
  if (config.autoCommit !== true) {
    return; // Skip validation if auto-commit is disabled
  }

  // Check git availability
  const gitAvailable = await checkGitAvailable();
  if (!gitAvailable) {
    throw new Error('Auto-commit is enabled but git is not available. Please install git or disable auto-commit.');
  }

  // Check if we're in a git repository
  const isRepo = await isGitRepository();
  if (!isRepo) {
    throw new Error('Auto-commit is enabled but current directory is not a git repository. Run "git init" or disable auto-commit.');
  }

  // Additional validation: check git user configuration
  await validateGitUserConfig();
}
```

#### Implementation Approach

1. **Add validation to `executeIssue` method** - Call validation early in the process:
   ```typescript
   async executeIssue(issueNumber: number): Promise<ExecutionResult> {
     this.isExecuting = true;
     this.abortController = new AbortController();

     try {
       // Validate git setup if auto-commit is enabled
       await this.validateGitForAutoCommit();

       // ... rest of existing execution logic
     } catch (error) {
       // Handle validation errors appropriately
     }
   }
   ```

2. **Enhance error messages** with actionable guidance:
   ```typescript
   const GitValidationErrors = {
     GIT_NOT_AVAILABLE: 'Auto-commit is enabled but git is not installed or not in PATH.',
     NOT_GIT_REPOSITORY: 'Auto-commit is enabled but current directory is not a git repository.',
     GIT_USER_NOT_CONFIGURED: 'Auto-commit is enabled but git user.name and user.email are not configured.'
   } as const;
   ```

3. **Add git user configuration validation**:
   ```typescript
   async function validateGitUserConfig(): Promise<void> {
     try {
       await execAsync('git config user.name');
       await execAsync('git config user.email');
     } catch {
       throw new Error('Git user.name and user.email must be configured for auto-commit. Run:\n  git config user.name "Your Name"\n  git config user.email "your.email@example.com"');
     }
   }
   ```

### Code Structure

#### New Validation Function
```typescript
// In src/core/autonomous-agent.ts
private async validateGitForAutoCommit(): Promise<void> {
  if (this.config.autoCommit !== true) {
    return; // Skip validation if auto-commit is disabled
  }

  // Check git availability
  const gitAvailable = await checkGitAvailable();
  if (!gitAvailable) {
    throw new Error([
      'Auto-commit is enabled but git is not available.',
      'Please install git or disable auto-commit with:',
      '  autoagent config set-auto-commit false'
    ].join('\n'));
  }

  // Check if we're in a git repository
  const isRepo = await isGitRepository();
  if (!isRepo) {
    throw new Error([
      'Auto-commit is enabled but current directory is not a git repository.',
      'Initialize git repository with:',
      '  git init',
      'Or disable auto-commit with:',
      '  autoagent config set-auto-commit false'
    ].join('\n'));
  }

  // Validate git user configuration
  await this.validateGitUserConfig();

  if (this.config.debug === true) {
    this.reportProgress('✅ Git repository validation passed', 5);
  }
}

private async validateGitUserConfig(): Promise<void> {
  try {
    await execAsync('git config user.name');
    await execAsync('git config user.email');
  } catch {
    throw new Error([
      'Git user configuration is required for auto-commit.',
      'Configure git user with:',
      '  git config user.name "Your Name"',
      '  git config user.email "your.email@example.com"',
      'Or disable auto-commit with:',
      '  autoagent config set-auto-commit false'
    ].join('\n'));
  }
}
```

#### Enhanced Git Utilities
```typescript
// In src/utils/git.ts
export interface GitValidationResult {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
}

export async function validateGitEnvironment(): Promise<GitValidationResult> {
  const result: GitValidationResult = {
    isValid: true,
    errors: [],
    suggestions: []
  };

  // Check git availability
  if (!(await checkGitAvailable())) {
    result.isValid = false;
    result.errors.push('Git is not installed or not in PATH');
    result.suggestions.push('Install git from https://git-scm.com/');
  }

  // Check repository status
  if (!(await isGitRepository())) {
    result.isValid = false;
    result.errors.push('Current directory is not a git repository');
    result.suggestions.push('Run "git init" to initialize a repository');
  }

  // Check user configuration
  try {
    await execAsync('git config user.name');
    await execAsync('git config user.email');
  } catch {
    result.isValid = false;
    result.errors.push('Git user.name and user.email are not configured');
    result.suggestions.push('Configure with "git config user.name" and "git config user.email"');
  }

  return result;
}
```

### API Changes

1. **No breaking changes** to existing APIs
2. **Enhanced error messages** with actionable guidance
3. **New optional validation utility** for external use
4. **Consistent validation timing** across all execution paths

### Error Handling

1. **Validation errors** are thrown early and caught by the main execution error handler
2. **Clear error messages** with specific remediation steps
3. **Non-blocking for non-auto-commit workflows** - validation only runs when needed
4. **Graceful degradation** - if validation fails, execution stops but system remains stable
5. **Debug logging** shows validation steps when debug mode is enabled

## Migration Strategy

### Implementation Phases
1. **Phase 1**: Add validation logic to `AutonomousAgent.executeIssue()`
2. **Phase 2**: Enhance git utility functions with comprehensive validation
3. **Phase 3**: Add helpful error messages and user guidance
4. **Phase 4**: Add debug logging and progress reporting

### Backward Compatibility
- **No breaking changes** - existing behavior is preserved
- **Users with auto-commit disabled** are completely unaffected
- **Enhanced UX** for users with auto-commit enabled
- **Clear migration path** for users who need to configure git

## Testing Strategy

### Unit Tests
1. **Validation logic testing**:
   ```typescript
   describe('validateGitForAutoCommit', () => {
     it('should skip validation when auto-commit is disabled', async () => {
       const agent = new AutonomousAgent({ autoCommit: false });
       await expect(agent.validateGitForAutoCommit()).resolves.toBeUndefined();
     });

     it('should throw error when git is not available', async () => {
       vi.mocked(checkGitAvailable).mockResolvedValue(false);
       const agent = new AutonomousAgent({ autoCommit: true });
       await expect(agent.validateGitForAutoCommit()).rejects.toThrow('git is not available');
     });

     it('should throw error when not in git repository', async () => {
       vi.mocked(checkGitAvailable).mockResolvedValue(true);
       vi.mocked(isGitRepository).mockResolvedValue(false);
       const agent = new AutonomousAgent({ autoCommit: true });
       await expect(agent.validateGitForAutoCommit()).rejects.toThrow('not a git repository');
     });
   });
   ```

2. **Git validation utility tests**:
   ```typescript
   describe('validateGitEnvironment', () => {
     it('should return valid result for properly configured git', async () => {
       const result = await validateGitEnvironment();
       expect(result.isValid).toBe(true);
       expect(result.errors).toHaveLength(0);
     });

     it('should detect missing git installation', async () => {
       vi.mocked(checkGitAvailable).mockResolvedValue(false);
       const result = await validateGitEnvironment();
       expect(result.isValid).toBe(false);
       expect(result.errors).toContain('Git is not installed');
     });
   });
   ```

### Integration Tests
1. **End-to-end validation flow**:
   ```typescript
   it('should validate git before execution when auto-commit enabled', async () => {
     const workspace = await TestWorkspace.create();
     // Don't initialize git in workspace
     
     const agent = new AutonomousAgent({ 
       workspace: workspace.path, 
       autoCommit: true 
     });
     
     await workspace.createIssue(1, 'Test Issue');
     
     const result = await agent.executeIssue(1);
     expect(result.success).toBe(false);
     expect(result.error).toContain('not a git repository');
   });
   ```

2. **Git configuration scenarios**:
   ```typescript
   it('should handle missing git user configuration', async () => {
     const workspace = await TestWorkspace.createWithGit();
     // Remove git user config
     await workspace.exec('git config --unset user.name');
     
     const agent = new AutonomousAgent({ 
       workspace: workspace.path, 
       autoCommit: true 
     });
     
     const result = await agent.executeIssue(1);
     expect(result.error).toContain('user.name and user.email');
   });
   ```

### E2E Tests
```typescript
describe('Git Validation E2E', () => {
  it('should provide helpful error message for non-git directory', async () => {
    const result = await cli.execute([
      'run', '1', '--commit'
    ], { cwd: '/tmp' }); // Non-git directory
    
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('not a git repository');
    expect(result.stderr).toContain('git init');
  });
  
  it('should succeed when git is properly configured', async () => {
    const workspace = await TestWorkspace.createWithGit();
    
    const result = await cli.execute([
      'run', '1', '--commit'
    ], { cwd: workspace.path });
    
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Changes committed');
  });
});
```

## Performance Considerations

1. **Minimal overhead** - Validation only runs when auto-commit is enabled
2. **Fast git checks** - Uses efficient git commands (rev-parse, config)
3. **Early exit** - Validation happens before expensive AI operations
4. **Cached results** - Git status checks are already optimized in existing utilities
5. **No additional dependencies** - Uses existing git utility functions

### Performance Optimizations
- **Skip validation entirely** when auto-commit is disabled
- **Reuse existing git utility functions** to avoid duplication
- **Fail fast** to save AI provider costs and execution time
- **Efficient git commands** with minimal output parsing

## Security Considerations

1. **No credential exposure** - Validation doesn't access or modify git credentials
2. **Safe git operations** - Only read-only git commands for validation
3. **Input validation** - All git command outputs are properly sanitized
4. **No sudo or elevated permissions** - All operations run with user permissions
5. **Error message safety** - Error messages don't expose sensitive file paths

### Security Measures
- **Command injection prevention** - Use parameterized git commands
- **Path traversal protection** - Validate workspace directory paths
- **Sanitized error output** - Ensure error messages don't leak sensitive information
- **Read-only validation** - No write operations during validation phase

## Documentation

### User Documentation Updates
1. **README.md** - Add git requirements section:
   ```markdown
   ## Git Requirements (for auto-commit)
   
   When auto-commit is enabled, AutoAgent requires:
   - Git installed and available in PATH
   - Current directory is a git repository
   - Git user.name and user.email configured
   
   Setup git for auto-commit:
   ```bash
   git init                                    # Initialize repository
   git config user.name "Your Name"           # Set user name
   git config user.email "your@email.com"     # Set user email
   ```

2. **Troubleshooting guide** additions:
   ```markdown
   **Auto-commit validation errors**
   ```bash
   # Error: git not available
   # Solution: Install git
   sudo apt-get install git  # Ubuntu/Debian
   brew install git          # macOS
   
   # Error: not a git repository
   # Solution: Initialize git
   git init
   
   # Error: git user not configured
   # Solution: Configure git user
   git config user.name "Your Name"
   git config user.email "your@email.com"
   ```

### Developer Documentation
1. **Architecture docs** - Document validation flow in execution pipeline
2. **API reference** - Document new validation functions and error types
3. **Testing guide** - Examples of testing git validation scenarios

## Implementation Steps

1. **Add validation method** to `AutonomousAgent` class
2. **Integrate validation** into `executeIssue` method early in execution
3. **Enhance git utilities** with comprehensive validation function
4. **Add user-friendly error messages** with remediation guidance
5. **Write comprehensive tests** covering all validation scenarios
6. **Update documentation** with git requirements and troubleshooting
7. **Add debug logging** for validation steps

## Open Questions

1. **Should we validate git remote configuration?**
   - **Decision**: No, local git operations don't require remotes

2. **Should validation be configurable/skippable?**
   - **Decision**: No, auto-commit requires git so validation should be mandatory

3. **Should we check for specific git version requirements?**
   - **Decision**: No, basic git functionality is sufficient across versions

4. **Should we validate git repository cleanliness (no uncommitted changes)?**
   - **Decision**: No, existing logic in `performGitCommit` handles this appropriately

5. **Should we provide more detailed git status information in debug mode?**
   - **Decision**: Yes, debug mode should show git repository status and configuration

## Example Workflows

### Successful Validation Workflow
```bash
# User has git configured properly
autoagent run 1 --commit

# Output:
# 🔍 Validating git setup for auto-commit...
# ✅ Git repository validation passed
# 🚀 Starting execution of issue #1...
# ... (normal execution)
# ✅ Changes committed to git
```

### Failed Validation Workflow
```bash
# User in non-git directory
autoagent run 1 --commit

# Output:
# ❌ Auto-commit is enabled but current directory is not a git repository.
# Initialize git repository with:
#   git init
# Or disable auto-commit with:
#   autoagent config set-auto-commit false
```

### Debug Mode Workflow
```bash
# Debug mode shows detailed validation
autoagent run 1 --commit --debug

# Output:
# 🔍 Validating git setup for auto-commit...
# ✅ Git available: /usr/bin/git version 2.34.1
# ✅ Git repository: .git directory found
# ✅ Git user configured: John Doe <john@example.com>
# ✅ Git repository validation passed
# 🚀 Starting execution of issue #1...
```

## Success Metrics

1. **Early failure detection** - Git issues caught before AI execution starts
2. **Clear user guidance** - Error messages include specific remediation steps
3. **Resource efficiency** - Reduced unnecessary AI provider calls
4. **Improved user experience** - Clear feedback about git requirements
5. **Consistent behavior** - Auto-commit settings respected uniformly