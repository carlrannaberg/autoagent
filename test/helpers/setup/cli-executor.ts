import { execFile, ExecFileException } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as os from 'os';

const execFileAsync = promisify(execFile);

interface ExecError extends ExecFileException {
  stdout?: string;
  stderr?: string;
  status?: number;
  signal?: string;
  exitCode?: number;
  killed?: boolean;
}

export interface ExecuteResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export class CliExecutor {
  private cliPath: string;
  private env: Record<string, string>;
  private tempHomeDir: string | null = null;

  constructor(private workingDir: string) {
    this.cliPath = path.join(__dirname, '../../../bin/autoagent');
    this.env = {
      ...process.env,
      NODE_ENV: 'test',
      FORCE_COLOR: '0', // Disable colors for predictable output
      AUTOAGENT_MOCK_PROVIDER: 'true', // Enable mock provider for E2E tests
    };
  }

  async setupIsolatedEnvironment(): Promise<void> {
    // Create temporary home directory for isolated global config
    this.tempHomeDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autoagent-e2e-home-'));
    this.env.HOME = this.tempHomeDir;
    this.env.USERPROFILE = this.tempHomeDir; // Windows support
  }

  async cleanup(): Promise<void> {
    if (this.tempHomeDir !== null) {
      try {
        await fs.rm(this.tempHomeDir, { recursive: true, force: true });
      } catch (error) {
        console.warn(`Failed to cleanup temp home directory: ${error instanceof Error ? error.message : String(error)}`);
      }
      this.tempHomeDir = null;
    }
  }

  async execute(args: string[], options: { timeout?: number; cwd?: string } = {}): Promise<ExecuteResult> {
    const { timeout = 10000, cwd = this.workingDir } = options;

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
    } catch (error) {
      const execError = error as ExecError;
      // execFileAsync throws when exit code is non-zero
      // The actual exit code is stored differently depending on the error type
      let exitCode = 1; // Default to 1 if we can't determine the actual code
      
      // Debug logging to understand the error structure
      if (process.env.DEBUG_CLI_EXECUTOR !== undefined) {
        console.error('CLI Executor Error:', {
          code: execError.code,
          status: execError.status,
          signal: execError.signal,
          killed: execError.killed,
          message: execError.message,
          exitCode: execError.exitCode,
          stderr: execError.stderr?.substring(0, 200)
        });
      }
      
      // In Node.js, when a child process exits with non-zero code,
      // the error object has different properties depending on how it failed:
      // - error.code: the exit code when the process exits normally
      // - error.status: alternative property name for exit code in some Node versions
      // - error.signal: when the process is killed by a signal
      // - error.code can also be a string like 'ENOENT' for system errors
      
      if (execError.exitCode !== undefined && typeof execError.exitCode === 'number') {
        // Modern Node.js provides exitCode directly
        exitCode = execError.exitCode;
      } else if (typeof execError.code === 'number') {
        // This is the exit code from the child process
        exitCode = execError.code;
      } else if (execError.status !== undefined && typeof execError.status === 'number') {
        // Some Node versions use 'status' instead of 'code'
        exitCode = execError.status;
      } else if (execError.signal !== undefined) {
        // Process was killed by a signal
        exitCode = 128 + (execError.signal === 'SIGTERM' ? 15 : 9);
      } else if (execError.code === 'ENOENT') {
        // Command not found
        exitCode = 127;
      }
      
      return {
        stdout: execError.stdout !== undefined ? execError.stdout : '',
        stderr: execError.stderr !== undefined ? execError.stderr : '',
        exitCode,
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