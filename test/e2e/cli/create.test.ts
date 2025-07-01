import { describe, it, expect } from 'vitest';
import { setupE2ETest, initializeProject } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent create', () => {
  const { workspace, cli } = setupE2ETest();

  it('should create a new issue interactively', async () => {
    await initializeProject(workspace, cli);

    const input = 'Test Issue\nImplement a new feature\n- [ ] Task 1\n- [ ] Task 2\nSimple feature implementation\n';
    const result = await cli.executeWithInput(['create'], input);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    const issues = await workspace.listFiles('issues');
    expect(issues.length).toBe(1);
    expect(issues[0]).toMatch(/test-issue.*\.md/);
  });

  it('should create issue with command line arguments', async () => {
    await initializeProject(workspace, cli);

    const result = await cli.execute([
      'create',
      '--title',
      'CLI Test Issue',
      '--description',
      'Test description',
      '--acceptance',
      'Task 1',
      '--acceptance',
      'Task 2',
      '--details',
      'Technical details here',
    ]);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    const issues = await workspace.listFiles('issues');
    expect(issues.length).toBe(1);

    const issueContent = await workspace.readFile(`issues/${issues[0]}`);
    expect(issueContent).toContain('CLI Test Issue');
    expect(issueContent).toContain('Test description');
    expect(issueContent).toContain('Task 1');
    expect(issueContent).toContain('Task 2');
  });

  it('should validate issue format', async () => {
    await initializeProject(workspace, cli);

    const result = await cli.execute(['create', '--title', '']);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('Title is required');
  });

  it('should generate unique issue filenames', async () => {
    await initializeProject(workspace, cli);

    await cli.execute([
      'create',
      '--title',
      'Duplicate Issue',
      '--description',
      'First issue',
    ]);

    const result = await cli.execute([
      'create',
      '--title',
      'Duplicate Issue',
      '--description',
      'Second issue',
    ]);

    expect(result.exitCode).toBe(0);

    const issues = await workspace.listFiles('issues');
    expect(issues.length).toBe(2);
    expect(issues[0]).not.toBe(issues[1]);
  });

  it('should support template usage', async () => {
    await initializeProject(workspace, cli);

    const result = await cli.execute([
      'create',
      '--template',
      'bug',
      '--title',
      'Bug Report',
      '--description',
      'Found a bug',
    ]);

    expect(result.exitCode).toBe(0);

    const issues = await workspace.listFiles('issues');
    const issueContent = await workspace.readFile(`issues/${issues[0]}`);
    expect(issueContent).toContain('Bug Report');
  });
});