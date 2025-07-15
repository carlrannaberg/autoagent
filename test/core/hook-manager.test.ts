import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { spawn } from 'child_process';
import { HookManager } from '../../src/core/hook-manager.js';
import { HookConfig, HookData } from '../../src/types/hooks.js';
import { EventEmitter } from 'events';

// Mock child_process
vi.mock('child_process', () => ({
  spawn: vi.fn()
}));

describe('HookManager', () => {
  let hookManager: HookManager;
  let spawnMock: any;
  
  beforeEach(() => {
    vi.clearAllMocks();
    spawnMock = vi.mocked(spawn);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with config, sessionId, and workspace', () => {
      const config: HookConfig = {};
      const sessionId = 'test-session-123';
      const workspace = '/test/workspace';
      
      hookManager = new HookManager(config, sessionId, workspace);
      expect(hookManager).toBeDefined();
    });
  });

  describe('executeHooks', () => {
    it('should execute command hooks sequentially', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { type: 'command', command: 'echo "Hook 1"' },
          { type: 'command', command: 'echo "Hook 2"' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      let callCount = 0;
      spawnMock.mockImplementation(() => {
        callCount++;
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        // Simulate successful execution
        setTimeout(() => {
          child.stdout.emit('data', `Hook ${callCount} output`);
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const result = await hookManager.executeHooks('PreExecutionStart', {
        issueNumber: 42,
        issueTitle: 'Test Issue'
      });
      
      expect(result.blocked).toBe(false);
      expect(spawnMock).toHaveBeenCalledTimes(2);
      expect(consoleLog).toHaveBeenCalledWith('Hook 1 output');
      expect(consoleLog).toHaveBeenCalledWith('Hook 2 output');
    });

    it('should pass JSON data via stdin', async () => {
      const config: HookConfig = {
        'PostExecutionEnd': [
          { type: 'command', command: 'cat' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      let stdinData = '';
      spawnMock.mockImplementation(() => {
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = {
          write: vi.fn((data: string) => { stdinData = data; }),
          end: vi.fn()
        };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      await hookManager.executeHooks('PostExecutionEnd', {
        issueNumber: 42,
        issueTitle: 'Test Issue',
        success: true
      });
      
      const parsedData = JSON.parse(stdinData);
      expect(parsedData.eventName).toBe('PostExecutionEnd');
      expect(parsedData.sessionId).toBe('session-123');
      expect(parsedData.workspace).toBe('/workspace');
      expect(parsedData.issueNumber).toBe(42);
      expect(parsedData.issueTitle).toBe('Test Issue');
      expect(parsedData.success).toBe(true);
      expect(parsedData.timestamp).toBeDefined();
    });

    it('should handle blocking Pre hooks with exit code 2', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { type: 'command', command: 'validate.sh' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      spawnMock.mockImplementation(() => {
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.stderr.emit('data', 'Validation failed');
          child.emit('exit', 2);
        }, 10);
        
        return child;
      });
      
      const result = await hookManager.executeHooks('PreExecutionStart', {});
      
      expect(result.blocked).toBe(true);
      expect(result.reason).toBe('Validation failed');
    });

    it('should not block on exit code 2 for Post hooks', async () => {
      const config: HookConfig = {
        'PostExecutionEnd': [
          { type: 'command', command: 'cleanup.sh' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      spawnMock.mockImplementation(() => {
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.stderr.emit('data', 'Cleanup failed');
          child.emit('exit', 2);
        }, 10);
        
        return child;
      });
      
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = await hookManager.executeHooks('PostExecutionEnd', {});
      
      expect(result.blocked).toBe(false);
      expect(consoleError).toHaveBeenCalledWith('Cleanup failed');
    });

    it('should handle JSON output from hooks', async () => {
      const config: HookConfig = {
        'PreExecutionEnd': [
          { type: 'command', command: 'check-todos.sh' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      spawnMock.mockImplementation(() => {
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        const jsonOutput = JSON.stringify({
          decision: 'block',
          reason: 'Found incomplete TODOs',
          feedback: 'Please complete all TODOs before committing'
        });
        
        setTimeout(() => {
          child.stdout.emit('data', jsonOutput);
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      const result = await hookManager.executeHooks('PreExecutionEnd', {});
      
      expect(result.blocked).toBe(true);
      expect(result.reason).toBe('Found incomplete TODOs');
    });

    it('should continue executing hooks if one fails (non-blocking)', async () => {
      const config: HookConfig = {
        'PostExecutionStart': [
          { type: 'command', command: 'failing-hook.sh' },
          { type: 'command', command: 'succeeding-hook.sh' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      let callCount = 0;
      spawnMock.mockImplementation(() => {
        callCount++;
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        if (callCount === 1) {
          // First hook fails
          setTimeout(() => {
            child.stderr.emit('data', 'Error in hook');
            child.emit('exit', 1);
          }, 10);
        } else {
          // Second hook succeeds
          setTimeout(() => {
            child.stdout.emit('data', 'Success');
            child.emit('exit', 0);
          }, 10);
        }
        
        return child;
      });
      
      const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = await hookManager.executeHooks('PostExecutionStart', {});
      
      expect(result.blocked).toBe(false);
      expect(spawnMock).toHaveBeenCalledTimes(2);
      expect(consoleError).toHaveBeenCalledWith('Error in hook');
      expect(consoleLog).toHaveBeenCalledWith('Success');
    });

    it('should skip hooks if none configured for hook point', async () => {
      const config: HookConfig = {};
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      const result = await hookManager.executeHooks('Stop', {});
      
      expect(result.blocked).toBe(false);
      expect(spawnMock).not.toHaveBeenCalled();
    });

    it('should warn about unimplemented built-in hooks', async () => {
      const config: HookConfig = {
        'PostExecutionEnd': [
          { type: 'git-commit', message: 'Test commit' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const result = await hookManager.executeHooks('PostExecutionEnd', {});
      
      expect(result.blocked).toBe(false);
      expect(consoleWarn).toHaveBeenCalledWith("Built-in hook type 'git-commit' not yet implemented");
    });
  });

  describe('interpolateCommand', () => {
    it('should interpolate template variables', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { 
            type: 'command', 
            command: 'echo "Starting issue {{issueNumber}}: {{issueTitle}}"' 
          }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      let actualCommand = '';
      spawnMock.mockImplementation((cmd: string, options: any) => {
        actualCommand = cmd;
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      await hookManager.executeHooks('PreExecutionStart', {
        issueNumber: 42,
        issueTitle: 'Fix authentication bug'
      });
      
      expect(actualCommand).toBe('echo "Starting issue 42: Fix authentication bug"');
    });

    it('should handle array values in template interpolation', async () => {
      const config: HookConfig = {
        'PostExecutionEnd': [
          { 
            type: 'command', 
            command: 'echo "Modified: {{filesModified}}"' 
          }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      let actualCommand = '';
      spawnMock.mockImplementation((cmd: string, options: any) => {
        actualCommand = cmd;
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      await hookManager.executeHooks('PostExecutionEnd', {
        filesModified: ['src/auth.ts', 'test/auth.test.ts']
      });
      
      expect(actualCommand).toBe('echo "Modified: src/auth.ts test/auth.test.ts"');
    });

    it('should preserve template if variable not found', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { 
            type: 'command', 
            command: 'echo "{{unknownVariable}}"' 
          }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      let actualCommand = '';
      spawnMock.mockImplementation((cmd: string, options: any) => {
        actualCommand = cmd;
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      await hookManager.executeHooks('PreExecutionStart', {});
      
      expect(actualCommand).toBe('echo "{{unknownVariable}}"');
    });
  });

  describe('timeout handling', () => {
    it('should enforce timeout limits', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { type: 'command', command: 'sleep 10', timeout: 100 }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      const killMock = vi.fn();
      spawnMock.mockImplementation(() => {
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = killMock;
        child.killed = false;
        
        // Don't emit exit event to simulate hanging process
        
        return child;
      });
      
      const resultPromise = hookManager.executeHooks('PreExecutionStart', {});
      
      // Wait for timeout
      await new Promise(resolve => setTimeout(resolve, 150));
      
      expect(killMock).toHaveBeenCalledWith('SIGTERM');
    });

    it('should use default timeout of 60 seconds', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { type: 'command', command: 'echo "test"' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      let timeoutValue = 0;
      const originalSetTimeout = global.setTimeout;
      vi.spyOn(global, 'setTimeout').mockImplementation((fn, delay) => {
        if (delay && delay > 1000) {
          timeoutValue = delay as number;
        }
        return originalSetTimeout(fn as any, delay);
      });
      
      spawnMock.mockImplementation(() => {
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      await hookManager.executeHooks('PreExecutionStart', {});
      
      expect(timeoutValue).toBe(60000);
    });
  });

  describe('error handling', () => {
    it('should handle spawn errors gracefully', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { type: 'command', command: 'nonexistent-command' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      spawnMock.mockImplementation(() => {
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.emit('error', new Error('spawn ENOENT'));
        }, 10);
        
        return child;
      });
      
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = await hookManager.executeHooks('PreExecutionStart', {});
      
      expect(result.blocked).toBe(false);
      expect(consoleError).toHaveBeenCalledWith('Failed to execute command: spawn ENOENT');
    });

    it('should catch and log exceptions in hook execution', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { type: 'command' } // Missing command field
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = await hookManager.executeHooks('PreExecutionStart', {});
      
      expect(result.blocked).toBe(false);
      expect(consoleError).toHaveBeenCalledWith('Hook error: Command hook missing command field');
    });

    it('should handle malformed JSON output gracefully', async () => {
      const config: HookConfig = {
        'PreExecutionEnd': [
          { type: 'command', command: 'echo "Not JSON"' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      spawnMock.mockImplementation(() => {
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.stdout.emit('data', 'Not JSON output');
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const result = await hookManager.executeHooks('PreExecutionEnd', {});
      
      expect(result.blocked).toBe(false);
      expect(consoleLog).toHaveBeenCalledWith('Not JSON output');
    });
  });

  describe('command execution', () => {
    it('should execute commands in the workspace directory', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { type: 'command', command: 'pwd' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/test/workspace');
      
      let spawnOptions: any;
      spawnMock.mockImplementation((cmd: string, options: any) => {
        spawnOptions = options;
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      await hookManager.executeHooks('PreExecutionStart', {});
      
      expect(spawnOptions.cwd).toBe('/test/workspace');
    });

    it('should use shell mode for command execution', async () => {
      const config: HookConfig = {
        'PreExecutionStart': [
          { type: 'command', command: 'echo "test" | grep test' }
        ]
      };
      
      hookManager = new HookManager(config, 'session-123', '/workspace');
      
      let spawnOptions: any;
      spawnMock.mockImplementation((cmd: string, options: any) => {
        spawnOptions = options;
        const child = new EventEmitter() as any;
        child.stdout = new EventEmitter();
        child.stderr = new EventEmitter();
        child.stdin = { write: vi.fn(), end: vi.fn() };
        child.kill = vi.fn();
        child.killed = false;
        
        setTimeout(() => {
          child.emit('exit', 0);
        }, 10);
        
        return child;
      });
      
      await hookManager.executeHooks('PreExecutionStart', {});
      
      expect(spawnOptions.shell).toBe(true);
    });
  });
});