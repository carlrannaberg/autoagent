import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent init', () => {
  const { workspace, cli } = setupE2ETest();

  it('should initialize a new autoagent project', async () => {
    await workspace.initGit();
    const result = await cli.execute(['init']);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    expect(await workspace.fileExists('.autoagent.json')).toBe(true);
    expect(await workspace.fileExists('issues')).toBe(true);
    expect(await workspace.fileExists('plans')).toBe(true);
    expect(await workspace.fileExists('CLAUDE.md')).toBe(true);
  });

  it('should not reinitialize if already initialized', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    const result = await cli.execute(['init']);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('already initialized');
  });

  it('should create default configuration', async () => {
    await workspace.initGit();
    await cli.execute(['init']);

    const config = await workspace.readFile('.autoagent.json');
    const parsed = JSON.parse(config);

    expect(parsed).toHaveProperty('provider');
    expect(parsed).toHaveProperty('autoMode');
    expect(parsed).toHaveProperty('verbose');
  });

  it('should handle non-git directories gracefully', async () => {
    const result = await cli.execute(['init']);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);
    expect(await workspace.fileExists('.autoagent.json')).toBe(true);
  });
});