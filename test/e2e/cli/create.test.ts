import { describe, it, expect } from 'vitest';
import { setupE2ETest, initializeProject } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent create', () => {
  const context = setupE2ETest();

  it('should create a new issue interactively', async () => {
    await initializeProject(context.workspace, context.cli);

    const input = 'Implement a new feature\n- [ ] Task 1\n- [ ] Task 2\nSimple feature implementation\n';
    const result = await context.cli.executeWithInput(['create', '--title', 'Test Issue', '--provider', 'mock'], input);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    const issues = await context.workspace.listFiles('issues');
    expect(issues.length).toBe(1);
    expect(issues[0]).toMatch(/test-issue.*\.md/);
  });

  it('should create issue with command line arguments', async () => {
    await initializeProject(context.workspace, context.cli);

    const result = await context.cli.execute([
      'create',
      '--title',
      'CLI Test Issue',
      '--provider',
      'mock'
    ]);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    const issues = await context.workspace.listFiles('issues');
    expect(issues.length).toBe(1);

    const issueContent = await context.workspace.readFile(`issues/${issues[0]}`);
    expect(issueContent).toContain('CLI Test Issue');
    expect(issueContent).toContain('# Issue');
    expect(issueContent).toContain('## Description');
    expect(issueContent).toContain('To be defined');
  });

  it('should validate issue format', async () => {
    await initializeProject(context.workspace, context.cli);

    const result = await context.cli.execute(['create']);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('Issue title is required');
  });

  it('should generate unique issue filenames', async () => {
    await initializeProject(context.workspace, context.cli);

    await context.cli.execute([
      'create',
      '--title',
      'Duplicate Issue',
      '--provider',
      'mock'
    ]);

    const result = await context.cli.execute([
      'create',
      '--title',
      'Duplicate Issue',
      '--provider',
      'mock'
    ]);

    expect(result.exitCode).toBe(0);

    const issues = await context.workspace.listFiles('issues');
    expect(issues.length).toBe(2);
    expect(issues[0]).not.toBe(issues[1]);
  });

  it('should support template usage', async () => {
    await initializeProject(context.workspace, context.cli);

    const result = await context.cli.execute([
      'create',
      '--title',
      'Bug Report',
      '--provider',
      'mock'
    ]);

    expect(result.exitCode).toBe(0);

    const issues = await context.workspace.listFiles('issues');
    const issueContent = await context.workspace.readFile(`issues/${issues[0]}`);
    expect(issueContent).toContain('Bug Report');
  });
});