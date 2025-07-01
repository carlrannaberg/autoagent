import { describe, it, expect } from 'vitest';
import { setupE2ETest, initializeProject, createSampleIssue } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('Output Formatting E2E', () => {
  const { workspace, cli } = setupE2ETest();

  describe('Table Output', () => {
    it('should format issue list as table', async () => {
      await initializeProject(workspace, cli);
      await createSampleIssue(workspace, 'issue-1');
      await createSampleIssue(workspace, 'issue-2');

      const result = await cli.execute(['list', 'issues']);

      expect(result.exitCode).toBe(0);
      const tableData = OutputParser.extractTableData(result.stdout);
      expect(tableData.length).toBeGreaterThanOrEqual(2);
      expect(tableData[0]).toContain('issue-1');
      expect(tableData[1]).toContain('issue-2');
    });

    it('should align table columns properly', async () => {
      await initializeProject(workspace, cli);
      await createSampleIssue(workspace, 'short');
      await createSampleIssue(workspace, 'very-long-issue-name-for-testing');

      const result = await cli.execute(['list', 'issues']);

      const lines = OutputParser.extractLines(result.stdout);
      const tableLine = lines.find((line) => line.includes('│'));
      expect(tableLine).toBeDefined();

      // Check that all table lines have the same length
      const tableLines = lines.filter((line) => line.includes('│'));
      const lineLengths = tableLines.map((line) => line.length);
      expect(new Set(lineLengths).size).toBe(1);
    });
  });

  describe('JSON Output', () => {
    it('should format valid JSON when requested', async () => {
      await initializeProject(workspace, cli);
      await createSampleIssue(workspace, 'json-test');

      const result = await cli.execute(['list', 'issues', '--json']);

      expect(result.exitCode).toBe(0);
      expect(() => JSON.parse(result.stdout)).not.toThrow();

      const data = JSON.parse(result.stdout);
      expect(Array.isArray(data)).toBe(true);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('status');
      expect(data[0]).toHaveProperty('createdAt');
    });

    it('should output pretty-printed JSON', async () => {
      await initializeProject(workspace, cli);
      await createSampleIssue(workspace, 'pretty-json');

      const result = await cli.execute(['status', '--json']);

      expect(result.exitCode).toBe(0);
      const lines = result.stdout.split('\n');
      expect(lines.length).toBeGreaterThan(3); // Pretty printed JSON has multiple lines
      expect(lines[0]).toBe('{');
      expect(lines[lines.length - 2]).toBe('}');
    });
  });

  describe('Progress Indicators', () => {
    it('should show progress during batch operations', async () => {
      await initializeProject(workspace, cli);
      
      // Create multiple issues
      for (let i = 1; i <= 5; i++) {
        await createSampleIssue(workspace, `batch-${i}`);
      }

      cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      cli.setEnv('AUTOAGENT_SHOW_PROGRESS', 'true');
      
      const result = await cli.execute(['run', '--all']);

      expect(result.exitCode).toBe(0);
      const progress = OutputParser.extractProgress(result.stdout);
      expect(progress.length).toBeGreaterThan(0);
      expect(progress[progress.length - 1]).toBe(5);
    });

    it('should show spinner for long operations', async () => {
      await initializeProject(workspace, cli);
      await createSampleIssue(workspace, 'long-operation');

      cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      cli.setEnv('AUTOAGENT_MOCK_DELAY', '2000');
      cli.setEnv('AUTOAGENT_SHOW_SPINNER', 'true');

      const result = await cli.execute(['run', 'long-operation']);

      expect(result.exitCode).toBe(0);
      // Note: Actual spinner characters might be stripped, but we can check for progress messages
      expect(result.stdout).toMatch(/processing|running|executing/i);
    });
  });

  describe('Verbose Output', () => {
    it('should show detailed output in verbose mode', async () => {
      await initializeProject(workspace, cli);
      await createSampleIssue(workspace, 'verbose-test');

      const result = await cli.execute(['list', 'issues', '--verbose']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Loading configuration');
      expect(result.stdout).toContain('Scanning issues directory');
      expect(result.stdout).toContain('Found 1 issue');
      expect(result.stdout).toContain('verbose-test');
    });

    it('should show debug information with timestamps', async () => {
      await initializeProject(workspace, cli);

      cli.setEnv('DEBUG', 'autoagent:*');
      const result = await cli.execute(['status', '--verbose']);

      expect(result.exitCode).toBe(0);
      // Check for timestamp pattern
      expect(result.stderr).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('Color Output', () => {
    it('should use colors when terminal supports it', async () => {
      await initializeProject(workspace, cli);
      await createSampleIssue(workspace, 'color-test');

      cli.setEnv('FORCE_COLOR', '1');
      const result = await cli.execute(['list', 'issues']);

      expect(result.exitCode).toBe(0);
      // Check for ANSI color codes
      expect(result.stdout).toMatch(/\u001b\[\d+m/);
    });

    it('should disable colors when requested', async () => {
      await initializeProject(workspace, cli);
      await createSampleIssue(workspace, 'no-color-test');

      const result = await cli.execute(['list', 'issues', '--no-color']);

      expect(result.exitCode).toBe(0);
      // Should not contain ANSI color codes
      expect(result.stdout).not.toMatch(/\u001b\[\d+m/);
    });
  });

  describe('Error Message Formatting', () => {
    it('should format error messages clearly', async () => {
      const result = await cli.execute(['run', 'non-existent']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Error:');
      expect(result.stderr).toContain('not initialized');
      expect(result.stderr).toContain('Run: autoagent init');
    });

    it('should show stack traces in debug mode', async () => {
      cli.setEnv('DEBUG', 'true');
      
      const result = await cli.execute(['config', 'get']);

      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Error:');
      expect(result.stderr).toContain('Stack trace:');
      expect(result.stderr).toMatch(/at .+:\d+:\d+/);
    });
  });

  describe('Summary Output', () => {
    it('should show execution summary', async () => {
      await initializeProject(workspace, cli);
      
      // Create and mock execute multiple issues
      for (let i = 1; i <= 3; i++) {
        await createSampleIssue(workspace, `summary-${i}`);
      }

      cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      const result = await cli.execute(['run', '--all']);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Execution Summary');
      expect(result.stdout).toContain('Total: 3');
      expect(result.stdout).toContain('Completed: 3');
      expect(result.stdout).toContain('Failed: 0');
    });
  });
});