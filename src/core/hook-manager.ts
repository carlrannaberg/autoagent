import { spawn } from 'child_process';
import { HookConfig, HookPoint, Hook, HookData, HookResult, CommandResult } from '../types/hooks.js';

/**
 * Manages execution of hooks at various lifecycle points
 */
export class HookManager {
  private config: HookConfig;
  private sessionId: string;
  private workspace: string;

  constructor(config: HookConfig, sessionId: string, workspace: string) {
    this.config = config;
    this.sessionId = sessionId;
    this.workspace = workspace;
  }

  /**
   * Execute all hooks for a given hook point
   * @param hookPoint The lifecycle event to execute hooks for
   * @param data Event-specific data to pass to hooks
   * @returns Result indicating if execution was blocked
   */
  async executeHooks(hookPoint: HookPoint, data: Omit<HookData, 'eventName' | 'sessionId' | 'workspace' | 'timestamp'>): Promise<HookResult> {
    const hooks = this.config[hookPoint] || [];
    
    // Prepare base hook data
    const hookData: HookData = {
      ...data,
      eventName: hookPoint,
      sessionId: this.sessionId,
      workspace: this.workspace,
      timestamp: Date.now()
    };

    // Execute hooks sequentially
    for (const hook of hooks) {
      try {
        let result: HookResult;

        if (hook.type === 'command') {
          result = await this.executeCommandHook(hook, hookData, hookPoint);
        } else {
          // Built-in hooks will be handled by separate classes
          result = this.executeBuiltinHook(hook, hookData);
        }

        // Check if execution was blocked
        if (result.blocked) {
          return result;
        }

        // Display output to user
        if (result.output && result.output.length > 0) {
          // eslint-disable-next-line no-console
          console.log(result.output);
        }
      } catch (error) {
        // Log but don't fail on hook errors (unless blocking)
        // eslint-disable-next-line no-console
        console.error(`Hook error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return { blocked: false };
  }

  /**
   * Execute a command hook
   */
  private async executeCommandHook(hook: Hook, data: HookData, hookPoint: string): Promise<HookResult> {
    if (!hook.command) {
      throw new Error('Command hook missing command field');
    }

    // Interpolate template variables in command
    const command = this.interpolateCommand(hook.command, data);
    
    // Prepare JSON input
    const input = JSON.stringify(data, null, 2);
    
    // Execute command with timeout
    const timeout = hook.timeout ?? 60000; // Default 60 seconds
    const result = await this.runCommand(command, input, timeout);

    // Always show stdout
    if (result.stdout && result.stdout.length > 0) {
      // eslint-disable-next-line no-console
      console.log(result.stdout);
    }

    // Handle exit codes
    if (result.exitCode === 2 && hookPoint.startsWith('Pre')) {
      // Exit code 2 blocks for Pre hooks
      return {
        blocked: true,
        reason: result.stderr || 'Blocked by hook',
        output: result.stdout
      };
    } else if (result.exitCode !== 0) {
      // Non-zero exit codes show stderr but don't block
      if (result.stderr && result.stderr.length > 0) {
        // eslint-disable-next-line no-console
        console.error(result.stderr);
      }
    }

    // Try to parse JSON output for advanced control
    if (result.stdout && result.stdout.length > 0) {
      try {
        const jsonOutput = JSON.parse(result.stdout) as { decision?: string; reason?: string; feedback?: string };
        if (jsonOutput.decision === 'block') {
          return {
            blocked: true,
            reason: jsonOutput.reason ?? 'Blocked by hook',
            output: jsonOutput.feedback
          };
        }
      } catch {
        // Not JSON, continue normally
      }
    }

    return { 
      blocked: false, 
      output: result.stdout 
    };
  }

  /**
   * Execute a built-in hook (placeholder for future implementation)
   */
  private executeBuiltinHook(hook: Hook, _data: HookData): HookResult {
    // Built-in hooks (git-commit, git-push) will be implemented separately
    // eslint-disable-next-line no-console
    console.warn(`Built-in hook type '${hook.type}' not yet implemented`);
    return { blocked: false };
  }

  /**
   * Interpolate template variables in a command string
   */
  private interpolateCommand(command: string, data: Record<string, unknown>): string {
    return command.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const value = data[key];
      if (value === undefined) {
        return match; // Keep original if no value
      }
      // Handle arrays (like filesModified)
      if (Array.isArray(value)) {
        return value.join(' ');
      }
      // Convert to string
      return String(value);
    });
  }

  /**
   * Run a command with timeout support
   */
  private async runCommand(command: string, input: string, timeout: number): Promise<CommandResult> {
    return new Promise((resolve) => {
      let stdout = '';
      let stderr = '';
      let timedOut = false;

      // Spawn the process using shell mode
      const child = spawn(command, {
        shell: true,
        cwd: this.workspace,
        env: { ...process.env },
        // Set reasonable limits
        windowsHide: true
      });

      // Set timeout
      const timer = setTimeout(() => {
        timedOut = true;
        child.kill('SIGTERM');
        // If it doesn't die gracefully, force kill after 5 seconds
        setTimeout(() => {
          if (!child.killed) {
            child.kill('SIGKILL');
          }
        }, 5000);
      }, timeout);

      // Capture stdout
      child.stdout?.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      // Capture stderr
      child.stderr?.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      // Send input to stdin
      if (input.length > 0) {
        child.stdin?.write(input);
        child.stdin?.end();
      }

      // Handle process exit
      child.on('exit', (code: number | null, signal: NodeJS.Signals | null) => {
        clearTimeout(timer);
        
        resolve({
          exitCode: code ?? (signal ? 1 : 0),
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          timedOut
        });
      });

      // Handle errors
      child.on('error', (error: Error) => {
        clearTimeout(timer);
        resolve({
          exitCode: 1,
          stdout: stdout.trim(),
          stderr: `Failed to execute command: ${error.message}`,
          timedOut: false
        });
      });
    });
  }
}