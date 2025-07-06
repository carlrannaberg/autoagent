import { describe, it, expect } from 'vitest';
import { setupE2ETest, initializeProject } from '../helpers/setup';
// import { OutputParser } from '../helpers/output-parser';

describe('autoagent config', () => {
  const context = setupE2ETest();

  describe('config show', () => {
    it('should display all configuration values', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'show']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Configuration:');
    });
  });

  describe('config set-provider', () => {
    it('should update provider configuration', async () => {
      await initializeProject(context.workspace, context.cli);

      let result = await context.cli.execute(['config', 'set-provider', 'gemini']);
      expect(result.exitCode).toBe(0);

      result = await context.cli.execute(['config', 'show']);
      expect(result.stdout).toContain('gemini');
    });

    it('should validate provider values', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-provider', 'invalid']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Invalid provider');
    });
  });

  describe('config set-auto-commit', () => {
    it('should update auto-commit configuration', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-auto-commit', 'false']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Auto-commit disabled');
    });

    it('should handle invalid boolean values', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-auto-commit', 'invalid']);
      expect(result.exitCode).toBe(0);
      // When value is not 'true', it defaults to false
      expect(result.stdout).toContain('Auto-commit disabled');
    });
  });

  describe('config set-failover', () => {
    it('should set failover providers', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-failover', 'gemini', 'claude']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Failover providers set to: gemini, claude');
    });
  });

  describe('config clear-limits', () => {
    it('should clear all rate limits', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'clear-limits']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('All rate limits cleared');
    });

    it('should clear specific provider rate limit', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'clear-limits', '-p', 'claude']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Rate limit cleared for claude');
    });
  });

  describe('config set-auto-push', () => {
    it('should enable auto-push configuration', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-auto-push', 'true']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Auto-push enabled');
      expect(result.stdout).toContain('automatically be pushed');
    });

    it('should disable auto-push configuration', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-auto-push', 'false']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Auto-push disabled');
      expect(result.stdout).toContain('not be pushed automatically');
    });

    it('should handle invalid boolean values', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-auto-push', 'invalid']);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Invalid value: must be "true" or "false"');
    });

    it('should support global flag', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-auto-push', 'true', '--global']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Auto-push enabled');
    });
  });

  describe('config set-push-remote', () => {
    it('should set push remote configuration', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-push-remote', 'upstream']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Push remote set to: upstream');
      expect(result.stdout).toContain('remote exists');
    });

    it('should support global flag', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-push-remote', 'origin', '--global']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Push remote set to: origin');
    });

    it('should handle invalid remote names', async () => {
      await initializeProject(context.workspace, context.cli);

      const result = await context.cli.execute(['config', 'set-push-remote', 'invalid@remote']);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Invalid remote name');
    });
  });
});