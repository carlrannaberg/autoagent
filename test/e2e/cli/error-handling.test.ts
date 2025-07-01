import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('Error Handling E2E', () => {
  const context = setupE2ETest();

  describe('Invalid Commands', () => {
    it('should handle unknown commands gracefully', async () => {
      const result = await context.cli.execute(['unknown-command']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain("Unknown command 'unknown-command'");
      expect(result.stderr).toContain('autoagent --help');
    });

    it('should handle missing required arguments', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);

      const result = await context.cli.execute(['run']); // Missing issue name

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Missing required argument');
    });

    it('should handle invalid option values', async () => {
      const result = await context.cli.execute(['list', 'issues', '--status', 'invalid-status']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Invalid status');
    });
  });

  describe('File System Errors', () => {
    it('should handle missing configuration file', async () => {
      const result = await context.cli.execute(['config', 'get']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('not initialized');
      expect(result.stderr).toContain('autoagent init');
    });

    it('should handle corrupted configuration file', async () => {
      await context.workspace.createFile('.autoagent.json', '{ invalid json }');

      const result = await context.cli.execute(['config', 'get']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Failed to parse configuration');
    });

    it('should handle permission errors', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);

      // Make config file read-only
      const configPath = path.join(context.workspace.getPath(), '.autoagent.json');
      await fs.chmod(configPath, 0o444);

      const result = await context.cli.execute(['config', 'set', 'provider', 'gemini']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toMatch(/permission|access/i);

      // Restore permissions for cleanup
      await fs.chmod(configPath, 0o644);
    });

    it('should handle missing issue files', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);

      const result = await context.cli.execute(['run', 'non-existent-issue']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Issue not found');
    });
  });

  describe('Network and Provider Errors', () => {
    it('should handle provider timeout', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      await context.workspace.createFile('issues/timeout-test.md', '# Test Issue');

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_TIMEOUT', 'true');

      const result = await context.cli.execute(['run', 'timeout-test'], { timeout: 5000 });

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('timeout');
    });

    it('should handle provider rate limit', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      await context.workspace.createFile('issues/rate-limit-test.md', '# Test Issue');

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_RATE_LIMIT', 'true');

      const result = await context.cli.execute(['run', 'rate-limit-test']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('rate limit');
    });

    it('should handle provider authentication failure', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      await context.workspace.createFile('issues/auth-test.md', '# Test Issue');

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_AUTH_FAIL', 'true');

      const result = await context.cli.execute(['run', 'auth-test']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('authentication');
    });
  });

  describe('Invalid Input Handling', () => {
    it('should handle malformed issue files', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      await context.workspace.createFile('issues/malformed.md', 'Not a valid issue format');

      const result = await context.cli.execute(['run', 'malformed']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Invalid issue format');
    });

    it('should handle empty issue files', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      await context.workspace.createFile('issues/empty.md', '');

      const result = await context.cli.execute(['list', 'issues']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Invalid format');
    });

    it('should handle cyclic dependencies in issues', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);

      await context.workspace.createFile('issues/issue-a.md', `# Issue A
## Dependencies
- issue-b`);
      await context.workspace.createFile('issues/issue-b.md', `# Issue B
## Dependencies
- issue-a`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      const result = await context.cli.execute(['run', '--all']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Cyclic dependency');
    });
  });

  describe('Recovery Scenarios', () => {
    it('should recover from partial execution', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      await context.workspace.createFile('issues/partial-test.md', '# Test Issue');

      // Simulate partial execution
      await context.workspace.createFile('.autoagent/status.json', JSON.stringify({
        'partial-test': {
          status: 'running',
          startedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        },
      }));

      const result = await context.cli.execute(['status', 'partial-test']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('running');
      expect(result.stdout).toContain('1 hour ago');
    });

    it('should clean up after failed execution', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      await context.workspace.createFile('issues/cleanup-test.md', '# Test Issue');

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_FAIL', 'true');

      const result = await context.cli.execute(['run', 'cleanup-test']);

      expect(result.exitCode).toBe(1);

      // Verify status was updated
      const statusResult = await context.cli.execute(['status', 'cleanup-test']);
      expect(statusResult.stdout).toContain('failed');
    });
  });
});