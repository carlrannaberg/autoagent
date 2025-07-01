import { describe, it, expect } from 'vitest';
import { setupE2ETest, initializeProject, createSampleIssue } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('Output Formatting E2E', () => {
  const context = setupE2ETest();

  describe.skip('Table Output', () => {
    it('should format issue list as table', async () => {
      await initializeProject(context.workspace, context.cli);
      await createSampleIssue(context.workspace, 'issue-1');
      await createSampleIssue(context.workspace, 'issue-2');

      const result = await context.cli.execute(['list', 'issues']);

      expect(result.exitCode).toBe(0);
      const tableData = OutputParser.extractTableData(result.stdout);
      expect(tableData.length).toBeGreaterThanOrEqual(2);
      expect(tableData[0]).toContain('issue-1');
      expect(tableData[1]).toContain('issue-2');
    });

    it('should align table columns properly', async () => {
      await initializeProject(context.workspace, context.cli);
      await createSampleIssue(context.workspace, 'short');
      await createSampleIssue(context.workspace, 'very-long-issue-name-for-testing');

      const result = await context.cli.execute(['list', 'issues']);

      const lines = OutputParser.extractLines(result.stdout);
      const tableLine = lines.find((line) => line.includes('│'));
      expect(tableLine).toBeDefined();

      // Check that all table lines have the same length
      const tableLines = lines.filter((line) => line.includes('│'));
      const lineLengths = tableLines.map((line) => line.length);
      expect(new Set(lineLengths).size).toBe(1);
    });
  });

  describe.skip('JSON Output', () => {
    it('should format valid JSON when requested', async () => {
      await initializeProject(context.workspace, context.cli);
      await createSampleIssue(context.workspace, 'json-test');

      const result = await context.cli.execute(['list', 'issues', '--json']);

      expect(result.exitCode).toBe(0);
      expect(() => JSON.parse(result.stdout)).not.toThrow();

      const data = JSON.parse(result.stdout);
      expect(Array.isArray(data)).toBe(true);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('status');
      expect(data[0]).toHaveProperty('createdAt');
    });

    it('should output pretty-printed JSON', async () => {
      await initializeProject(context.workspace, context.cli);
      await createSampleIssue(context.workspace, 'pretty-json');

      const result = await context.cli.execute(['status', '--json']);

      expect(result.exitCode).toBe(0);
      const lines = result.stdout.split('\n');
      expect(lines.length).toBeGreaterThan(3); // Pretty printed JSON has multiple lines
      expect(lines[0]).toBe('{');
      expect(lines[lines.length - 2]).toBe('}');
    });
  });

  describe.skip('Progress Indicators', () => {
    it('should show progress during batch operations', async () => {
      await initializeProject(context.workspace, context.cli);
      
      // Create multiple issues
      for (let i = 1; i <= 5; i++) {
        await createSampleIssue(context.workspace, `batch-${i}`);
      }

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_SHOW_PROGRESS', 'true');
      
      const result = await context.cli.execute(['run', '--all']);

      expect(result.exitCode).toBe(0);
      const progress = OutputParser.extractProgress(result.stdout);
      expect(progress.length).toBeGreaterThan(0);
      expect(progress[progress.length - 1]).toBe(5);
    });

    it('should show spinner for long operations', async () => {
      await initializeProject(context.workspace, context.cli);
      await createSampleIssue(context.workspace, 'long-operation');

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_DELAY', '2000');
      context.cli.setEnv('AUTOAGENT_SHOW_SPINNER', 'true');

      const result = await context.cli.execute(['run', 'long-operation']);

      expect(result.exitCode).toBe(0);
      // Note: Actual spinner characters might be stripped, but we can check for progress messages
      expect(result.stdout).toMatch(/processing|running|executing/i);
    });
  });

  describe.skip('Verbose Output', () => {
    it('should show detailed output in verbose mode', async () => {
      await initializeProject(context.workspace, context.cli);
      await createSampleIssue(context.workspace, 'verbose-test');

      const result = await context.cli.execute(['list', 'issues', '--verbose']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Loading configuration');
      expect(result.stdout).toContain('Scanning issues directory');
      expect(result.stdout).toContain('Found 1 issue');
      expect(result.stdout).toContain('verbose-test');
    });

    it('should show debug information with timestamps', async () => {
      await initializeProject(context.workspace, context.cli);

      context.cli.setEnv('DEBUG', 'autoagent:*');
      const result = await context.cli.execute(['status', '--verbose']);

      expect(result.exitCode).toBe(0);
      // Check for timestamp pattern
      expect(result.stderr).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe.skip('Color Output', () => {
    it('should use colors when terminal supports it', async () => {
      await initializeProject(context.workspace, context.cli);
      await createSampleIssue(context.workspace, 'color-test');

      context.cli.setEnv('FORCE_COLOR', '1');
      const result = await context.cli.execute(['list', 'issues']);

      expect(result.exitCode).toBe(0);
      // Check for ANSI color codes
      // eslint-disable-next-line no-control-regex
      expect(result.stdout).toMatch(/\x1b\[\d+m/);
    });

    it('should disable colors when requested', async () => {
      await initializeProject(context.workspace, context.cli);
      await createSampleIssue(context.workspace, 'no-color-test');

      const result = await context.cli.execute(['list', 'issues', '--no-color']);

      expect(result.exitCode).toBe(0);
      // Should not contain ANSI color codes
      // eslint-disable-next-line no-control-regex
      expect(result.stdout).not.toMatch(/\x1b\[\d+m/);
    });
  });

  describe('Error Message Formatting', () => {
    it('should format error messages clearly', async () => {
      const result = await context.cli.execute(['run', 'non-existent']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Error:');
      expect(result.stderr).toContain('not initialized');
      expect(result.stderr).toContain('Run: autoagent init');
    });

    it('should show stack traces in debug mode', async () => {
      context.cli.setEnv('DEBUG', 'true');
      
      const result = await context.cli.execute(['config', 'get']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Error:');
      expect(result.stderr).toContain('Stack trace:');
      expect(result.stderr).toMatch(/at .+:\d+:\d+/);
    });
  });

  describe.skip('Summary Output', () => {
    it('should show execution summary', async () => {
      await initializeProject(context.workspace, context.cli);
      
      // Create and mock execute multiple issues
      for (let i = 1; i <= 3; i++) {
        await createSampleIssue(context.workspace, `summary-${i}`);
      }

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      const result = await context.cli.execute(['run', '--all']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Execution Summary');
      expect(result.stdout).toContain('Total: 3');
      expect(result.stdout).toContain('Completed: 3');
      expect(result.stdout).toContain('Failed: 0');
    });
  });
});