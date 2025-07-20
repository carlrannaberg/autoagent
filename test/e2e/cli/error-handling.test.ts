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

    it('should handle run command without tasks present', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();

      const result = await context.cli.execute(['run']); // No tasks exist yet

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('No tasks found. Create tasks using the "create" command.');
    });

    it('should handle invalid option values', async () => {
      const result = await context.cli.execute(['list', 'tasks', '--status', 'invalid-status']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Invalid status');
    });
  });

  describe('File System Errors', () => {
    it('should handle missing configuration file gracefully', async () => {
      const result = await context.cli.execute(['config', 'get']);

      // Should succeed with default config values
      expect(result.exitCode).toBe(0);
    });

    it('should handle corrupted configuration file', async () => {
      // Create a corrupted config file
      await context.workspace.createFile('.autoagent/config.json', '{ invalid json }');

      const result = await context.cli.execute(['config', 'get']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Failed to parse configuration');
    });

    it('should handle permission errors', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      
      // Ensure config exists by setting a value
      await context.cli.execute(['config', 'set', 'provider', 'claude']);

      // Make config file read-only
      const configPath = path.join(context.workspace.getPath(), '.autoagent/config.json');
      await fs.chmod(configPath, 0o444);

      const result = await context.cli.execute(['config', 'set', 'provider', 'gemini']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toMatch(/permission|access/i);

      // Restore permissions for cleanup
      await fs.chmod(configPath, 0o644);
    });

    it('should handle missing task IDs', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();

      const result = await context.cli.execute(['run', 'non-existent-task']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Task non-existent-task not found');
    });
  });

  describe('Network and Provider Errors', () => {
    it('should handle provider timeout', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      
      // Create a task using CLI
      await context.cli.execute([
        'create',
        '--title',
        'Test Task',
        '--description',
        'Test task for timeout testing',
        '--acceptance',
        'Test passes'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_TIMEOUT', 'true');

      const result = await context.cli.execute(['run', '1'], { timeout: 5000 });

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('timeout');
    });

    it('should handle provider rate limit', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      
      // Create a task using CLI
      await context.cli.execute([
        'create',
        '--title',
        'Rate Limit Test Task',
        '--description',
        'Test task for rate limit testing',
        '--acceptance',
        'Test passes'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_RATE_LIMIT', 'true');

      const result = await context.cli.execute(['run', '1']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr.toLowerCase()).toContain('rate limit');
    });

    it('should handle provider authentication failure', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      
      // Create a task using CLI
      await context.cli.execute([
        'create',
        '--title',
        'Auth Test Task',
        '--description',
        'Test task for auth testing',
        '--acceptance',
        'Test passes'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_AUTH_FAIL', 'true');

      const result = await context.cli.execute(['run', '1']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr.toLowerCase()).toContain('authentication');
    });
  });

  describe('Invalid Input Handling', () => {
    it('should handle invalid task IDs gracefully', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();

      const result = await context.cli.execute(['run', '999']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Task 999 not found');
    });

    it('should handle empty task list gracefully', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();

      const result = await context.cli.execute(['list', 'tasks']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('No tasks found');
    });

    it('should handle invalid task search queries', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      
      // Create a valid task
      await context.cli.execute([
        'create',
        '--title',
        'Valid Task',
        '--description',
        'A valid task for testing'
      ]);
      
      const result = await context.cli.execute(['run', 'Non-existent Task']);
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Task Non-existent Task not found');
    });
  });

  describe('Recovery Scenarios', () => {
    it('should handle task execution failure gracefully', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      
      // Create a task
      await context.cli.execute([
        'create',
        '--title',
        'Failing Task',
        '--description',
        'This task will fail during execution'
      ]);

      // Use mock provider but set it to fail
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_FAIL', 'true');
      
      const result = await context.cli.execute(['run', '1'], { timeout: 10000 });
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Mock execution failed');
    });

    it('should handle empty task execution gracefully', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      
      // No tasks created
      const result = await context.cli.execute(['run', '--all']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('No pending tasks to execute');
    });
  });
});