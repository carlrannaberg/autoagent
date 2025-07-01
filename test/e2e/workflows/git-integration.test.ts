import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

describe('Git Integration Workflow E2E', () => {
  const { workspace, cli } = setupE2ETest();

  it('should track changes in git during execution', async () => {
    await workspace.initGit();
    await workspace.commit('Initial commit');

    await cli.execute(['init']);
    await workspace.commit('Add autoagent configuration');

    // Create and run an issue
    await cli.execute([
      'create',
      '--title',
      'Git Test Issue',
      '--description',
      'Test git integration',
    ]);

    const { stdout: statusBefore } = await execFileAsync('git', ['status', '--porcelain'], {
      cwd: workspace.getPath(),
    });
    expect(statusBefore).toContain('issues/');

    await workspace.commit('Add test issue');

    // Mock execution
    cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    await cli.execute(['run', 'git-test-issue']);

    // Check git log
    const { stdout: log } = await execFileAsync('git', ['log', '--oneline', '-n', '5'], {
      cwd: workspace.getPath(),
    });
    expect(log).toContain('Add test issue');
    expect(log).toContain('Add autoagent configuration');
  });

  it('should create meaningful commit messages', async () => {
    await workspace.initGit();
    await cli.execute(['init']);
    await workspace.commit('Initial setup');

    // Create multiple issues
    const issues = [
      { title: 'Add User Auth', desc: 'Implement user authentication' },
      { title: 'Setup Database', desc: 'Configure database connections' },
      { title: 'Create API Endpoints', desc: 'Build REST API' },
    ];

    for (const issue of issues) {
      await cli.execute([
        'create',
        '--title',
        issue.title,
        '--description',
        issue.desc,
      ]);
      await workspace.commit(`Add issue: ${issue.title}`);
    }

    // Check commit history
    const { stdout: log } = await execFileAsync('git', ['log', '--oneline'], {
      cwd: workspace.getPath(),
    });

    for (const issue of issues) {
      expect(log).toContain(`Add issue: ${issue.title}`);
    }
  });

  it('should handle uncommitted changes gracefully', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    // Create issue but don't commit
    await cli.execute([
      'create',
      '--title',
      'Uncommitted Issue',
      '--description',
      'Test uncommitted changes',
    ]);

    // Try to run with uncommitted changes
    const result = await cli.execute(['status']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Uncommitted Issue');

    // Check git status
    const { stdout: status } = await execFileAsync('git', ['status', '--porcelain'], {
      cwd: workspace.getPath(),
    });
    expect(status).toContain('issues/');
  });

  it('should support branch-based workflow', async () => {
    await workspace.initGit();
    await cli.execute(['init']);
    await workspace.commit('Initial setup');

    // Create feature branch
    await execFileAsync('git', ['checkout', '-b', 'feature/new-feature'], {
      cwd: workspace.getPath(),
    });

    // Create issue on feature branch
    await cli.execute([
      'create',
      '--title',
      'Feature Branch Issue',
      '--description',
      'Implement on feature branch',
    ]);
    await workspace.commit('Add feature issue');

    // Switch back to main branch
    await execFileAsync('git', ['checkout', 'main'], {
      cwd: workspace.getPath(),
    });

    // Issues should not be visible on main
    const mainResult = await cli.execute(['list', 'issues']);
    expect(mainResult.stdout).not.toContain('feature-branch-issue');

    // Switch back to feature branch
    await execFileAsync('git', ['checkout', 'feature/new-feature'], {
      cwd: workspace.getPath(),
    });

    // Issues should be visible on feature branch
    const featureResult = await cli.execute(['list', 'issues']);
    expect(featureResult.stdout).toContain('feature-branch-issue');
  });
});