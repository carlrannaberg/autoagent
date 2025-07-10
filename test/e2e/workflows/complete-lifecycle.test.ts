import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('Complete Issue Lifecycle E2E', () => {
  const context = setupE2ETest();

  it('should complete full issue lifecycle: create → run → status', async () => {
    // Initialize git repository
    await context.workspace.initGit();
    // Add a fake remote to satisfy git validation
    await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
    // Create AGENT.md that would have been created by init
    await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
    // Create directories that commands expect
    await context.workspace.createFile('issues/.gitkeep', '');
    await context.workspace.createFile('plans/.gitkeep', '');
    // Create TODO.md file
    await context.workspace.createFile('TODO.md', '# TODO\n\nThis file tracks all issues for the autonomous agent.\n\n## Pending Issues\n\n## Completed Issues\n');
    let result;

    // Create an issue
    result = await context.cli.execute([
      'create',
      '--title',
      'E2E Test Issue',
      '--description',
      'Test the complete workflow',
      '--acceptance',
      'Create a test file',
      '--acceptance',
      'Add hello world function',
      '--details',
      'Create src/hello.ts with a simple function',
    ]);
    expect(result.exitCode).toBe(0);

    // List issues to verify creation
    result = await context.cli.execute(['list', 'issues']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('e2e-test-issue');
    expect(result.stdout).toContain('pending');

    // Check status before execution - use the full filename without .md
    result = await context.cli.execute(['status', '1-e2e-test-issue']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Status: pending');

    // Mock provider execution (since we can't run real AI in tests)
    await context.workspace.createFile('.autoagent/mock-run', 'true');
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    
    // Create a plan file for the issue (required for execution)
    await context.workspace.createFile('plans/1-e2e-test-issue.md', `# Plan for Issue #1: E2E Test Issue

## Overview
Test plan for E2E test issue.

## Implementation Steps
### Phase 1: Setup
- [ ] Create test file
- [ ] Add function

## Technical Approach
Simple implementation for testing.

## Resources
- Testing framework
`);

    // Run the issue - use issue number since the file is named 1-e2e-test-issue.md
    result = await context.cli.execute(['run', '1', '--provider', 'mock', '--no-validate']);
    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    // Check status after execution - use the full filename without .md
    result = await context.cli.execute(['status', '1-e2e-test-issue']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Status: completed');

    // Verify execution history
    result = await context.cli.execute(['status', '--history']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('e2e-test-issue');
    expect(result.stdout).toContain('completed');
  });

  it('should handle multi-issue batch execution', async () => {
    await context.workspace.initGit();
    // Add a fake remote to satisfy git validation
    await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
    // Create AGENT.md that would have been created by init
    await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
    // Create directories that commands expect
    await context.workspace.createFile('issues/.gitkeep', '');
    await context.workspace.createFile('plans/.gitkeep', '');

    // Create multiple issues and ensure TODO.md tracks them
    const issues = ['feature-1', 'feature-2', 'feature-3'];
    for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      await context.cli.execute([
        'create',
        '--title',
        `${issue}`,
        '--description',
        `Implement ${issue}`,
        '--acceptance',
        'Complete task',
      ]);
      
      // Create corresponding plan file for the issue
      const issueNumber = i + 1; // Issues are numbered starting from 1
      await context.workspace.createFile(`plans/${issueNumber}-${issue}.md`, `# Plan for Issue #${issueNumber}: ${issue}

## Overview
This plan outlines the implementation approach for ${issue} feature.

## Implementation Steps
1. Analysis phase: Review requirements and design system architecture
2. Implementation phase: Implement core functionality with error handling
3. Testing phase: Write comprehensive tests and update documentation

## Technical Approach
Standard implementation approach for ${issue}.

## Resources
- Development environment
- Testing framework
`);
    }

    // Ensure TODO.md exists with all issues as pending
    const todoContent = `# TODO

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
- [ ] **#1** feature-1 - \`issues/1-feature-1.md\`
- [ ] **#2** feature-2 - \`issues/2-feature-2.md\`
- [ ] **#3** feature-3 - \`issues/3-feature-3.md\`

## Completed Issues
`;
    await context.workspace.createFile('TODO.md', todoContent);

    // Run all issues
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    const result = await context.cli.execute(['run', '--all', '--no-validate']);

    expect(result.exitCode).toBe(0);
    // The output should contain "Running X issues" where X is the number of pending issues
    // Since other tests might have created issues, we just check that it contains "Running" and "issues"
    expect(result.stdout).toMatch(/Running \d+ issues/);

    // Check overall status
    const statusResult = await context.cli.execute(['status']);
    expect(statusResult.exitCode).toBe(0);
    const counts = OutputParser.extractStatusCounts(statusResult.stdout);
    expect(counts.completed).toBe(3);
  });

  it('should support provider switching during execution', async () => {
    await context.workspace.initGit();
    // Add a fake remote to satisfy git validation
    await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
    // Create AGENT.md that would have been created by init
    await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
    // Create directories that commands expect
    await context.workspace.createFile('issues/.gitkeep', '');
    await context.workspace.createFile('plans/.gitkeep', '');

    // Create issue
    await context.cli.execute([
      'create',
      '--title',
      'Provider Test',
      '--description',
      'Test provider switching',
    ]);

    // Configure to use gemini
    await context.cli.execute(['config', 'set', 'provider', 'gemini']);
    
    // Create a plan file for the issue (required for execution)
    await context.workspace.createFile('plans/1-provider-test.md', `# Plan for Issue #1: Provider Test

## Overview
Test plan for provider switching.

## Implementation Steps
### Phase 1: Test
- [ ] Test provider switching

## Technical Approach
Simple test implementation.
`);

    // Run with explicit claude override - use issue number since file is 1-provider-test.md
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    const result = await context.cli.execute(['run', '1', '--provider', 'claude', '--no-validate']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Provider override: claude');

    // Verify config wasn't changed
    const configResult = await context.cli.execute(['config', 'get', 'provider']);
    expect(configResult.stdout).toContain('provider: gemini');
  });
});