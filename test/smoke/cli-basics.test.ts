import { describe, it, expect } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

describe('CLI Smoke Tests', () => {
  const cliPath = path.join(__dirname, '../../bin/autoagent');

  it('should show version', async () => {
    const { stdout } = await execAsync(`${cliPath} --version`);
    expect(stdout).toMatch(/\d+\.\d+\.\d+/);
  });

  it('should show help', async () => {
    const { stdout } = await execAsync(`${cliPath} --help`);
    expect(stdout).toContain('Usage:');
    expect(stdout).toContain('Commands:');
    expect(stdout).toContain('Options:');
  });

  it('should list available commands', async () => {
    const { stdout } = await execAsync(`${cliPath} --help`);
    const commands = ['config', 'status', 'list', 'init', 'create'];
    
    commands.forEach(command => {
      expect(stdout).toContain(command);
    });
  });

  it('should handle invalid command gracefully', async () => {
    try {
      await execAsync(`${cliPath} invalid-command`);
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.code).toBe(1);
      expect(error.stderr || error.stdout).toContain('Unknown command');
    }
  });

  it('should show config help without error', async () => {
    const { stdout, stderr } = await execAsync(`${cliPath} config --help`);
    expect(stderr).toBe('');
    expect(stdout).toContain('get');
    expect(stdout).toContain('set');
  });

  it('should show status without error', async () => {
    const { stdout, stderr } = await execAsync(`${cliPath} status`);
    expect(stderr).toBe('');
    expect(stdout).toContain('Status'); // Either "Status Report" or "Project Status"
  });
});

describe('CLI Environment Smoke Tests', () => {
  it('should detect Node.js version', async () => {
    const { stdout } = await execAsync('node --version');
    const version = stdout.trim();
    const major = parseInt(version.slice(1).split('.')[0]);
    expect(major).toBeGreaterThanOrEqual(16); // Minimum Node.js version
  });

  it('should have required runtime dependencies', async () => {
    // Check that the package can list its dependencies
    const { stdout } = await execAsync('npm ls --json --depth=0');
    const packageInfo = JSON.parse(stdout);
    
    expect(packageInfo.name).toBe('autoagent-cli');
    expect(packageInfo.dependencies).toBeDefined();
    
    // Check for critical runtime dependencies
    const dependencies = packageInfo.dependencies || {};
    expect(dependencies).toHaveProperty('commander');
    expect(dependencies).toHaveProperty('chalk');
  });
});