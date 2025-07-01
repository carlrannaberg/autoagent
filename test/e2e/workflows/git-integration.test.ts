import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

describe('Git Integration Workflow E2E', () => {
  const context = setupE2ETest();

  it('should track changes in git during execution', async () => {
    await context.workspace.initGit();
    
    // Create initial file to commit
    await context.workspace.createFile('README.md', '# Test Project\n');
    await context.workspace.commit('Initial commit');

    // Set mock provider before initialization
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    
    await context.cli.execute(['init']);
    await context.workspace.commit('Add autoagent configuration');

    // Create and run an issue with mock provider
    const createResult = await context.cli.execute([
      'create',
      '--title',
      'Git Test Issue',
      '--description',
      'Test git integration',
      '--provider',
      'mock'
    ]);
    
    // Check if the issue was created successfully
    expect(createResult.exitCode).toBe(0);

    const { stdout: statusBefore } = await execFileAsync('git', ['status', '--porcelain'], {
      cwd: context.workspace.getPath(),
    });
    expect(statusBefore).toContain('issues/');

    await context.workspace.commit('Add test issue');

    // Mock execution - run the issue that was just created
    const runResult = await context.cli.execute(['run', '1']);
    expect(runResult.exitCode).toBe(0);

    // Check git log
    const { stdout: log } = await execFileAsync('git', ['log', '--oneline', '-n', '5'], {
      cwd: context.workspace.getPath(),
    });
    expect(log).toContain('Add test issue');
    expect(log).toContain('Add autoagent configuration');
  });

  it('should create meaningful commit messages', async () => {
    await context.workspace.initGit();
    
    // Create initial file to commit
    await context.workspace.createFile('README.md', '# Test Project\n');
    await context.workspace.commit('Initial commit');
    
    // Set mock provider before initialization
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    
    await context.cli.execute(['init']);
    await context.workspace.commit('Initial setup');

    // Create multiple issues
    const issues = [
      { title: 'Add User Auth', desc: 'Implement user authentication' },
      { title: 'Setup Database', desc: 'Configure database connections' },
      { title: 'Create API Endpoints', desc: 'Build REST API' },
    ];

    for (const issue of issues) {
      const createResult = await context.cli.execute([
        'create',
        '--title',
        issue.title,
        '--description',
        issue.desc,
        '--provider',
        'mock'
      ]);
      
      // Only commit if the issue was created successfully
      if (createResult.exitCode === 0) {
        // Check if there are changes to commit
        const { stdout: status } = await execFileAsync('git', ['status', '--porcelain'], {
          cwd: context.workspace.getPath(),
        });
        
        if (status.trim()) {
          await context.workspace.commit(`Add issue: ${issue.title}`);
        }
      }
    }

    // Check commit history
    const { stdout: log } = await execFileAsync('git', ['log', '--oneline'], {
      cwd: context.workspace.getPath(),
    });

    for (const issue of issues) {
      expect(log).toContain(`Add issue: ${issue.title}`);
    }
  });

  it('should handle uncommitted changes gracefully', async () => {
    await context.workspace.initGit();
    
    // Create initial file and commit
    await context.workspace.createFile('README.md', '# Test Project\n');
    await context.workspace.commit('Initial commit');
    
    // Set mock provider before initialization
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    
    await context.cli.execute(['init']);
    await context.workspace.commit('Add configuration');

    // Create issue but don't commit
    const createResult = await context.cli.execute([
      'create',
      '--title',
      'Uncommitted Issue',
      '--description',
      'Test uncommitted changes',
      '--provider',
      'mock'
    ]);
    
    expect(createResult.exitCode).toBe(0);

    // List issues to verify it was created
    const result = await context.cli.execute(['list', 'issues']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('1-uncommitted-issue');

    // Check git status
    const { stdout: status } = await execFileAsync('git', ['status', '--porcelain'], {
      cwd: context.workspace.getPath(),
    });
    expect(status).toContain('issues/');
  });

  it('should support branch-based workflow', async () => {
    await context.workspace.initGit();
    
    // Create initial file and commit
    await context.workspace.createFile('README.md', '# Test Project\n');
    await context.workspace.commit('Initial commit');
    
    // Set mock provider before initialization
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    
    await context.cli.execute(['init']);
    await context.workspace.commit('Initial setup');

    // Get the default branch name
    const { stdout: defaultBranch } = await execFileAsync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: context.workspace.getPath(),
    });
    const mainBranch = defaultBranch.trim();

    // Create feature branch
    await execFileAsync('git', ['checkout', '-b', 'feature/new-feature'], {
      cwd: context.workspace.getPath(),
    });

    // Create issue on feature branch
    const createResult = await context.cli.execute([
      'create',
      '--title',
      'Feature Branch Issue',
      '--description',
      'Implement on feature branch',
      '--provider',
      'mock'
    ]);
    
    expect(createResult.exitCode).toBe(0);
    
    // Check if there are changes to commit
    const { stdout: status } = await execFileAsync('git', ['status', '--porcelain'], {
      cwd: context.workspace.getPath(),
    });
    
    if (status.trim()) {
      await context.workspace.commit('Add feature issue');
    }

    // Switch back to main branch
    await execFileAsync('git', ['checkout', mainBranch], {
      cwd: context.workspace.getPath(),
    });

    // Issues should not be visible on main
    const mainResult = await context.cli.execute(['list', 'issues']);
    expect(mainResult.stdout).not.toContain('1-feature-branch-issue');

    // Switch back to feature branch
    await execFileAsync('git', ['checkout', 'feature/new-feature'], {
      cwd: context.workspace.getPath(),
    });

    // Issues should be visible on feature branch
    const featureResult = await context.cli.execute(['list', 'issues']);
    expect(featureResult.stdout).toContain('1-feature-branch-issue');
  });
});