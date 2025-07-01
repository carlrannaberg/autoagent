import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent init', () => {
  const context = setupE2ETest();

  it('should initialize a new autoagent project', async () => {
    await context.workspace.initGit();
    const result = await context.cli.execute(['init']);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    expect(await context.workspace.fileExists('.autoagent.json')).toBe(true);
    expect(await context.workspace.fileExists('issues')).toBe(true);
    expect(await context.workspace.fileExists('plans')).toBe(true);
    expect(await context.workspace.fileExists('CLAUDE.md')).toBe(true);
  });

  it('should not reinitialize if already initialized', async () => {
    await context.workspace.initGit();
    await context.cli.execute(['init']);

    const result = await context.cli.execute(['init']);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('already initialized');
  });

  it('should create default configuration', async () => {
    await context.workspace.initGit();
    await context.cli.execute(['init']);

    const config = await context.workspace.readFile('.autoagent.json');
    const parsed = JSON.parse(config);

    expect(parsed).toHaveProperty('provider');
    expect(parsed).toHaveProperty('autoMode');
    expect(parsed).toHaveProperty('verbose');
  });

  it('should handle non-git directories gracefully', async () => {
    const result = await context.cli.execute(['init']);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);
    expect(await context.workspace.fileExists('.autoagent.json')).toBe(true);
  });
});