import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('Complete Issue Lifecycle E2E', () => {
  const { workspace, cli } = setupE2ETest();

  it('should complete full issue lifecycle: create → run → status', async () => {
    // Initialize project
    await workspace.initGit();
    let result = await cli.execute(['init']);
    expect(result.exitCode).toBe(0);

    // Create an issue
    result = await cli.execute([
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
    result = await cli.execute(['list', 'issues']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('e2e-test-issue');
    expect(result.stdout).toContain('pending');

    // Check status before execution
    result = await cli.execute(['status', 'e2e-test-issue']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Status: pending');

    // Mock provider execution (since we can't run real AI in tests)
    await workspace.createFile('.autoagent/mock-run', 'true');
    cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');

    // Run the issue
    result = await cli.execute(['run', 'e2e-test-issue', '--provider', 'mock']);
    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    // Check status after execution
    result = await cli.execute(['status', 'e2e-test-issue']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Status: completed');

    // Verify execution history
    result = await cli.execute(['status', '--history']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('e2e-test-issue');
    expect(result.stdout).toContain('completed');
  });

  it('should handle multi-issue batch execution', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    // Create multiple issues
    const issues = ['feature-1', 'feature-2', 'feature-3'];
    for (const issue of issues) {
      await cli.execute([
        'create',
        '--title',
        `${issue}`,
        '--description',
        `Implement ${issue}`,
        '--acceptance',
        'Complete task',
      ]);
    }

    // Run all issues
    cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    const result = await cli.execute(['run', '--all']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Running 3 issues');

    // Check overall status
    const statusResult = await cli.execute(['status']);
    expect(statusResult.exitCode).toBe(0);
    const counts = OutputParser.extractStatusCounts(statusResult.stdout);
    expect(counts.completed).toBe(3);
  });

  it('should support provider switching during execution', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    // Create issue
    await cli.execute([
      'create',
      '--title',
      'Provider Test',
      '--description',
      'Test provider switching',
    ]);

    // Configure to use gemini
    await cli.execute(['config', 'set', 'provider', 'gemini']);

    // Run with explicit claude override
    cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    const result = await cli.execute(['run', 'provider-test', '--provider', 'claude']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Using provider: claude');

    // Verify config wasn't changed
    const configResult = await cli.execute(['config', 'get', 'provider']);
    expect(configResult.stdout).toContain('provider: gemini');
  });
});