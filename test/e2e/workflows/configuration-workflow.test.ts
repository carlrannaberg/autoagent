import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import * as path from 'path';

describe('Configuration Workflow E2E', () => {
  const { workspace, cli } = setupE2ETest();

  it('should manage global and local configurations', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    // Set global config
    const homeDir = process.env.HOME;
    const globalConfigPath = homeDir !== undefined ? path.join(homeDir, '.autoagent', 'config.json') : path.join('/', '.autoagent', 'config.json');
    cli.setEnv('AUTOAGENT_CONFIG_PATH', globalConfigPath);

    let result = await cli.execute(['config', 'set', 'provider', 'gemini', '--global']);
    expect(result.exitCode).toBe(0);

    // Set local config (overrides global)
    result = await cli.execute(['config', 'set', 'provider', 'claude']);
    expect(result.exitCode).toBe(0);

    // Verify local takes precedence
    result = await cli.execute(['config', 'get', 'provider']);
    expect(result.stdout).toContain('provider: claude');

    // Show all configs with source
    result = await cli.execute(['config', 'get', '--show-source']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('(local)');
  });

  it('should support environment variable overrides', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    // Set config value
    await cli.execute(['config', 'set', 'verbose', 'false']);

    // Run with env override
    cli.setEnv('AUTOAGENT_VERBOSE', 'true');
    const result = await cli.execute(['config', 'get', 'verbose']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('verbose: true');
    expect(result.stdout).toContain('(environment)');
  });

  it('should export and import configurations', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    // Configure settings
    await cli.execute(['config', 'set', 'provider', 'gemini']);
    await cli.execute(['config', 'set', 'autoMode', 'true']);
    await cli.execute(['config', 'set', 'verbose', 'true']);

    // Export config
    let result = await cli.execute(['config', 'export', 'config-backup.json']);
    expect(result.exitCode).toBe(0);
    expect(await workspace.fileExists('config-backup.json')).toBe(true);

    // Reset config
    await cli.execute(['config', 'reset']);

    // Import config
    result = await cli.execute(['config', 'import', 'config-backup.json']);
    expect(result.exitCode).toBe(0);

    // Verify imported values
    result = await cli.execute(['config', 'get']);
    expect(result.stdout).toContain('provider: gemini');
    expect(result.stdout).toContain('autoMode: true');
    expect(result.stdout).toContain('verbose: true');
  });

  it('should validate configuration changes', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    // Try invalid provider
    let result = await cli.execute(['config', 'set', 'provider', 'invalid-provider']);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('Invalid value');

    // Try invalid boolean
    result = await cli.execute(['config', 'set', 'verbose', 'maybe']);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('must be boolean');

    // Verify config wasn't corrupted
    result = await cli.execute(['config', 'get']);
    expect(result.exitCode).toBe(0);
  });
});