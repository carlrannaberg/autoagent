import { describe, it, expect } from 'vitest';
import { setupE2ETest, initializeProject, createSampleIssue } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent list', () => {
  const context = setupE2ETest();

  it('should list all issues', async () => {
    await initializeProject(context.workspace, context.cli);
    await createSampleIssue(context.workspace, 'issue-1');
    await createSampleIssue(context.workspace, 'issue-2');
    await createSampleIssue(context.workspace, 'issue-3');

    const result = await context.cli.execute(['list', 'issues']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('issue-1');
    expect(result.stdout).toContain('issue-2');
    expect(result.stdout).toContain('issue-3');
    expect(result.stdout).toContain('pending');
  });

  it('should filter issues by status', async () => {
    await initializeProject(context.workspace, context.cli);
    await createSampleIssue(context.workspace, 'pending-issue');

    await context.workspace.createFile('.autoagent/status.json', JSON.stringify({
      'completed-issue': {
        status: 'completed',
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
    }));

    const result = await context.cli.execute(['list', 'issues', '--status', 'completed']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('completed-issue');
    expect(result.stdout).not.toContain('pending-issue');
  });

  it('should list providers', async () => {
    await initializeProject(context.workspace, context.cli);

    const result = await context.cli.execute(['list', 'providers']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('claude');
    expect(result.stdout).toContain('gemini');
  });

  it('should show empty list gracefully', async () => {
    await initializeProject(context.workspace, context.cli);

    const result = await context.cli.execute(['list', 'issues']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('No issues found');
  });

  it('should support JSON output format', async () => {
    await initializeProject(context.workspace, context.cli);
    await createSampleIssue(context.workspace, 'json-test');

    const result = await context.cli.execute(['list', 'issues', '--json']);

    expect(result.exitCode).toBe(0);
    const data = OutputParser.extractJsonOutput(result.stdout);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0]).toHaveProperty('name', 'json-test');
    expect(data[0]).toHaveProperty('status', 'pending');
  });

  it('should list recent executions', async () => {
    await initializeProject(context.workspace, context.cli);

    await context.workspace.createFile('.autoagent/executions.json', JSON.stringify([
      {
        id: 'exec-1',
        issue: 'test-issue',
        status: 'completed',
        timestamp: new Date().toISOString(),
      },
    ]));

    const result = await context.cli.execute(['list', 'executions']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('exec-1');
    expect(result.stdout).toContain('test-issue');
    expect(result.stdout).toContain('completed');
  });
});