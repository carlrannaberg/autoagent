import { execFile } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execFileAsync = promisify(execFile);

export interface ExecuteResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export class CliExecutor {
  private cliPath: string;
  private env: Record<string, string>;

  constructor(private workingDir: string) {
    this.cliPath = path.join(__dirname, '../../../bin/autoagent');
    this.env = {
      ...process.env,
      NODE_ENV: 'test',
      FORCE_COLOR: '0', // Disable colors for predictable output
    };
  }

  async execute(args: string[], options: { timeout?: number; cwd?: string } = {}): Promise<ExecuteResult> {
    const { timeout = 120000, cwd = this.workingDir } = options;

    try {
      const { stdout, stderr } = await execFileAsync('node', [this.cliPath, ...args], {
        cwd,
        env: this.env,
        timeout,
      });

      return {
        stdout,
        stderr,
        exitCode: 0,
      };
    } catch (error: any) {
      return {
        stdout: error.stdout || '',
        stderr: error.stderr || '',
        exitCode: error.code || 1,
      };
    }
  }

  async executeWithInput(
    args: string[],
    input: string,
    options: { timeout?: number; cwd?: string } = {}
  ): Promise<ExecuteResult> {
    const { timeout = 120000, cwd = this.workingDir } = options;

    return new Promise((resolve) => {
      const child = require('child_process').spawn('node', [this.cliPath, ...args], {
        cwd,
        env: this.env,
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      child.stdin.write(input);
      child.stdin.end();

      const timer = setTimeout(() => {
        child.kill();
        resolve({
          stdout,
          stderr,
          exitCode: -1,
        });
      }, timeout);

      child.on('close', (code: number) => {
        clearTimeout(timer);
        resolve({
          stdout,
          stderr,
          exitCode: code || 0,
        });
      });
    });
  }

  setEnv(key: string, value: string): void {
    this.env[key] = value;
  }
}