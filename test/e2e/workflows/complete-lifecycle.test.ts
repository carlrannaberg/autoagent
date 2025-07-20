import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

// Note: These tests mix STM task creation with issue-based status commands
// The status command hasn't been updated to work with STM tasks yet
describe.skip('Complete Issue Lifecycle E2E', () => {
  const context = setupE2ETest();

  it('should complete full issue lifecycle: create → run → status', async () => {
    // Initialize git repository
    await context.workspace.initGit();
    // Add a fake remote to satisfy git validation
    await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
    // Create AGENT.md that would have been created by init
    await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
    // Note: STM will handle task management, no need for issues/plans directories
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

    // List tasks to verify creation
    result = await context.cli.execute(['list', 'tasks']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('E2E Test Issue');
    expect(result.stdout).toContain('pending');

    // Check status before execution - use task ID
    result = await context.cli.execute(['status', '1']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Status: pending');

    // Mock provider execution (since we can't run real AI in tests)
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');

    // Run the task - use task ID
    result = await context.cli.execute(['run', '1', '--provider', 'mock']);
    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    // Check status after execution - use task ID
    result = await context.cli.execute(['status', '1']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Status: completed');

    // Verify execution history by listing all tasks
    result = await context.cli.execute(['list', 'tasks']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('E2E Test Issue');
    expect(result.stdout).toContain('done');
  });

  it('should handle multi-task batch execution', async () => {
    await context.workspace.initGit();
    // Add a fake remote to satisfy git validation
    await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
    // Create AGENT.md that would have been created by init
    await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
    // Note: STM will handle task management, no need for issues/plans directories

    // Create multiple tasks using create command
    const tasks = ['feature-1', 'feature-2', 'feature-3'];
    for (const task of tasks) {
      await context.cli.execute([
        'create',
        '--title',
        `${task}`,
        '--description',
        `Implement ${task}`,
        '--acceptance',
        'Complete task',
      ]);
    }

    // Verify tasks were created by listing them
    const listResult = await context.cli.execute(['list', 'tasks']);
    expect(listResult.exitCode).toBe(0);
    expect(listResult.stdout).toContain('feature-1');
    expect(listResult.stdout).toContain('feature-2');
    expect(listResult.stdout).toContain('feature-3');

    // Run all tasks
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    const result = await context.cli.execute(['run', '--all']);

    expect(result.exitCode).toBe(0);
    // The output should contain "Found X pending task" where X is the number of pending tasks
    expect(result.stdout).toMatch(/Found \d+ pending task/);

    // Check overall status by listing all tasks and counting completed ones
    const statusResult = await context.cli.execute(['list', 'tasks']);
    expect(statusResult.exitCode).toBe(0);
    // Count completed tasks (look for 'done' status in output)
    const doneMatches = statusResult.stdout.match(/\(done\)/g);
    expect(doneMatches?.length).toBe(3);
  });

  it('should support provider switching during execution', async () => {
    await context.workspace.initGit();
    // Add a fake remote to satisfy git validation
    await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
    // Create AGENT.md that would have been created by init
    await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
    // Note: STM will handle task management, no need for issues/plans directories

    // Create task
    await context.cli.execute([
      'create',
      '--title',
      'Provider Test',
      '--description',
      'Test provider switching',
    ]);

    // Configure to use gemini
    await context.cli.execute(['config', 'set', 'provider', 'gemini']);

    // Run with explicit claude override - use task ID
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    const result = await context.cli.execute(['run', '1', '--provider', 'claude']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Executing task: 1');

    // Verify config wasn't changed
    const configResult = await context.cli.execute(['config', 'get', 'provider']);
    expect(configResult.stdout).toContain('provider: gemini');
  });
});