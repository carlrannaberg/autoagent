import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import * as path from 'path';

describe('Configuration Workflow E2E', () => {
  const context = setupE2ETest();

  it('should manage global and local configurations', async () => {
    await context.workspace.initGit();
    await context.cli.execute(['init']);

    // Set global config
    const homeDir = process.env.HOME;
    const globalConfigPath = homeDir !== undefined ? path.join(homeDir, '.autoagent', 'config.json') : path.join('/', '.autoagent', 'config.json');
    context.cli.setEnv('AUTOAGENT_CONFIG_PATH', globalConfigPath);

    let result = await context.cli.execute(['config', 'set', 'provider', 'gemini', '--global']);
    expect(result.exitCode).toBe(0);

    // Set local config (overrides global)
    result = await context.cli.execute(['config', 'set', 'provider', 'claude']);
    expect(result.exitCode).toBe(0);

    // Verify local takes precedence
    result = await context.cli.execute(['config', 'get', 'provider']);
    expect(result.stdout).toContain('provider: claude');

    // Show all configs with source
    result = await context.cli.execute(['config', 'get', '--show-source']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('(local)');
  });

  it('should support environment variable overrides', async () => {
    await context.workspace.initGit();
    await context.cli.execute(['init']);

    // Set config value
    await context.cli.execute(['config', 'set', 'verbose', 'false']);

    // Run with env override
    context.cli.setEnv('AUTOAGENT_VERBOSE', 'true');
    const result = await context.cli.execute(['config', 'get', 'verbose', '--show-source']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('verbose: true');
    expect(result.stdout).toContain('(environment)');
  });

  it.skip('should export and import configurations', async () => {
    await context.workspace.initGit();
    await context.cli.execute(['init']);

    // Configure settings
    await context.cli.execute(['config', 'set', 'provider', 'gemini']);
    await context.cli.execute(['config', 'set', 'autoMode', 'true']);
    await context.cli.execute(['config', 'set', 'verbose', 'true']);

    // Export config
    let result = await context.cli.execute(['config', 'export', 'config-backup.json']);
    expect(result.exitCode).toBe(0);
    expect(await context.workspace.fileExists('config-backup.json')).toBe(true);

    // Reset config
    await context.cli.execute(['config', 'reset']);

    // Import config
    result = await context.cli.execute(['config', 'import', 'config-backup.json']);
    expect(result.exitCode).toBe(0);

    // Verify imported values
    result = await context.cli.execute(['config', 'get']);
    expect(result.stdout).toContain('provider: gemini');
    expect(result.stdout).toContain('autoMode: true');
    expect(result.stdout).toContain('verbose: true');
  });

  it('should validate configuration changes', async () => {
    await context.workspace.initGit();
    await context.cli.execute(['init']);

    // Try invalid provider
    let result = await context.cli.execute(['config', 'set', 'provider', 'invalid-provider']);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('Invalid value for provider');

    // Try invalid boolean
    result = await context.cli.execute(['config', 'set', 'verbose', 'maybe']);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('Value must be boolean');

    // Verify config wasn't corrupted
    result = await context.cli.execute(['config', 'get']);
    expect(result.exitCode).toBe(0);
  });
});