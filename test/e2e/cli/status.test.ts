import { describe, it, expect } from 'vitest';
import { setupE2ETest, initializeProject, createSampleIssue } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent status', () => {
  const context = setupE2ETest();

  it('should show overall project status', async () => {
    await initializeProject(context.workspace, context.cli);
    await createSampleIssue(context.workspace, 'issue-1', 1);
    await createSampleIssue(context.workspace, 'issue-2', 2);

    const result = await context.cli.execute(['status']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Project Status');
    expect(result.stdout).toMatch(/Total Issues:\s*2/);
    expect(result.stdout).toMatch(/Pending:\s*2/);
  });

  it('should show specific issue status', async () => {
    await initializeProject(context.workspace, context.cli);
    await createSampleIssue(context.workspace, 'test-issue');

    const result = await context.cli.execute(['status', 'test-issue']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('test-issue');
    expect(result.stdout).toContain('Status: pending');
  });

  it('should show execution history', async () => {
    await initializeProject(context.workspace, context.cli);

    await context.workspace.createFile('.autoagent/executions.json', JSON.stringify([
      {
        id: 'exec-1',
        issue: 'test-issue',
        status: 'completed',
        timestamp: new Date().toISOString(),
        duration: 120,
        provider: 'claude',
      },
      {
        id: 'exec-2',
        issue: 'test-issue-2',
        status: 'failed',
        timestamp: new Date().toISOString(),
        duration: 60,
        provider: 'gemini',
        error: 'Test error',
      },
    ]));

    const result = await context.cli.execute(['status', '--history']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Recent Executions');
    expect(result.stdout).toContain('test-issue');
    expect(result.stdout).toContain('completed');
    expect(result.stdout).toContain('test-issue-2');
    expect(result.stdout).toContain('failed');
  });

  it.skip('should show provider statistics', async () => {
    await initializeProject(context.workspace, context.cli);

    await context.workspace.createFile('.autoagent/stats.json', JSON.stringify({
      claude: {
        totalExecutions: 10,
        successRate: 0.9,
        averageDuration: 180,
      },
      gemini: {
        totalExecutions: 5,
        successRate: 0.8,
        averageDuration: 120,
      },
    }));

    const result = await context.cli.execute(['status', '--providers']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Provider Statistics');
    expect(result.stdout).toContain('claude');
    expect(result.stdout).toContain('90%');
    expect(result.stdout).toContain('gemini');
    expect(result.stdout).toContain('80%');
  });

  it('should handle missing status data gracefully', async () => {
    await initializeProject(context.workspace, context.cli);

    const result = await context.cli.execute(['status', 'non-existent']);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('Issue not found');
  });

  it.skip('should support JSON output format', async () => {
    await initializeProject(context.workspace, context.cli);
    await createSampleIssue(context.workspace, 'json-test');

    const result = await context.cli.execute(['status', '--json']);

    expect(result.exitCode).toBe(0);
    const data = OutputParser.extractJsonOutput(result.stdout);
    expect(data).toHaveProperty('totalIssues', 1);
    expect(data).toHaveProperty('pending', 1);
    expect(data).toHaveProperty('completed', 0);
  });
});