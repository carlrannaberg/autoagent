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
});