import { describe, it, expect } from 'vitest';
import { setupE2ETest, initializeProject } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent config', () => {
  const { workspace, cli } = setupE2ETest();

  describe('config get', () => {
    it('should display all configuration values', async () => {
      await initializeProject(workspace, cli);

      const result = await cli.execute(['config', 'get']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('provider:');
      expect(result.stdout).toContain('autoMode:');
      expect(result.stdout).toContain('verbose:');
    });

    it('should display specific configuration value', async () => {
      await initializeProject(workspace, cli);

      const result = await cli.execute(['config', 'get', 'provider']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatch(/provider:\s*(claude|gemini)/);
    });

    it('should handle unknown configuration keys', async () => {
      await initializeProject(workspace, cli);

      const result = await cli.execute(['config', 'get', 'unknown']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Unknown configuration key');
    });
  });

  describe('config set', () => {
    it('should update configuration values', async () => {
      await initializeProject(workspace, cli);

      let result = await cli.execute(['config', 'set', 'provider', 'gemini']);
      expect(result.exitCode).toBe(0);

      result = await cli.execute(['config', 'get', 'provider']);
      expect(result.stdout).toContain('provider: gemini');
    });

    it('should validate configuration values', async () => {
      await initializeProject(workspace, cli);

      const result = await cli.execute(['config', 'set', 'provider', 'invalid']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Invalid value');
    });

    it('should update multiple configuration values', async () => {
      await initializeProject(workspace, cli);

      await cli.execute(['config', 'set', 'verbose', 'true']);
      await cli.execute(['config', 'set', 'autoMode', 'true']);

      const result = await cli.execute(['config', 'get']);
      expect(result.stdout).toContain('verbose: true');
      expect(result.stdout).toContain('autoMode: true');
    });
  });

  describe('config reset', () => {
    it('should reset configuration to defaults', async () => {
      await initializeProject(workspace, cli);

      await cli.execute(['config', 'set', 'provider', 'gemini']);
      await cli.execute(['config', 'set', 'verbose', 'true']);

      const result = await cli.execute(['config', 'reset']);
      expect(result.exitCode).toBe(0);

      const getResult = await cli.execute(['config', 'get']);
      expect(getResult.stdout).toContain('provider: claude');
      expect(getResult.stdout).toContain('verbose: false');
    });
  });
});