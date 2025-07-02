import { vi } from 'vitest';
import type { MockedFunction } from 'vitest';
import { EventEmitter } from 'node:events';
import type { ChildProcess } from 'node:child_process';

export interface MockProcessOptions {
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  signal?: NodeJS.Signals;
  delay?: number;
  error?: Error;
}

class MockChildProcess extends EventEmitter implements Partial<ChildProcess> {
  stdout: EventEmitter | null;
  stderr: EventEmitter | null;
  stdin: any;
  pid?: number;
  killed: boolean = false;
  
  constructor(private options: MockProcessOptions) {
    super();
    this.stdout = new EventEmitter();
    this.stderr = new EventEmitter();
    this.stdin = { write: vi.fn(), end: vi.fn() };
    this.pid = Math.floor(Math.random() * 10000);
  }
  
  async simulate(): Promise<void> {
    if (this.options.delay !== undefined && this.options.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.options.delay));
    }
    
    if (this.options.error) {
      this.emit('error', this.options.error);
      return;
    }
    
    if (this.options.stdout !== undefined && this.stdout !== null) {
      this.stdout.emit('data', Buffer.from(this.options.stdout));
    }
    
    if (this.options.stderr !== undefined && this.stderr !== null) {
      this.stderr.emit('data', Buffer.from(this.options.stderr));
    }
    
    if (this.options.signal) {
      this.emit('close', null, this.options.signal);
    } else {
      this.emit('close', this.options.exitCode ?? 0);
    }
  }
  
  kill(signal?: NodeJS.Signals): boolean {
    this.killed = true;
    this.emit('close', null, signal || 'SIGTERM');
    return true;
  }
}

export function createMockSpawn(scenarios: Record<string, MockProcessOptions> = {}): MockedFunction<any> {
  const spawn: MockedFunction<any> = vi.fn((command: string, args?: readonly string[], _options?: any) => {
    const cmdString = `${command} ${args?.join(' ') ?? ''}`.trim();
    
    const scenario = Object.entries(scenarios).find(([pattern]) => {
      return cmdString.includes(pattern) || new RegExp(pattern).test(cmdString);
    });
    
    const processOptions = scenario ? scenario[1] : { stdout: '', exitCode: 0 };
    const mockProcess = new MockChildProcess(processOptions);
    
    setTimeout(() => { void mockProcess.simulate(); }, 0);
    
    return mockProcess as any;
  });
  
  return spawn;
}

export function createMockExec(): MockedFunction<any> {
  const exec: MockedFunction<any> = vi.fn((command: string, options: unknown, callback?: unknown) => {
    const cb = callback !== undefined ? callback : (typeof options === 'function' ? options : undefined);
    
    if (typeof cb === 'function' && command.includes('git')) {
      if (command.includes('git status')) {
        (cb as any)(null, 'On branch main\nnothing to commit', '');
      } else if (command.includes('git log')) {
        (cb as any)(null, 'commit abc123\nAuthor: Test\nDate: Today\n\n    Test commit', '');
      } else {
        (cb as any)(null, '', '');
      }
    } else if (typeof cb === 'function') {
      (cb as any)(null, '', '');
    }
  });
  
  return exec;
}

export function mockChildProcessModule(spawn?: any, exec?: any): { spawn: MockedFunction<any>; exec: MockedFunction<any> } {
  const mockSpawn = spawn !== undefined ? spawn : createMockSpawn();
  const mockExec = exec !== undefined ? exec : createMockExec();
  
  vi.doMock('node:child_process', () => ({
    spawn: mockSpawn,
    exec: mockExec
  }));
  
  vi.doMock('child_process', () => ({
    spawn: mockSpawn,
    exec: mockExec
  }));
  
  return { spawn: mockSpawn, exec: mockExec };
}

export function createProcessScenarios(): Record<string, Record<string, MockProcessOptions>> {
  return {
    gitSuccess: {
      'git status': { stdout: 'On branch main\nnothing to commit', exitCode: 0 },
      'git add': { stdout: '', exitCode: 0 },
      'git commit': { stdout: '[main abc123] Test commit\n 1 file changed', exitCode: 0 },
      'git push': { stdout: 'Everything up-to-date', exitCode: 0 }
    },
    
    gitFailure: {
      'git status': { stderr: 'fatal: not a git repository', exitCode: 128 },
      'git add': { stderr: 'fatal: pathspec does not match any files', exitCode: 1 },
      'git commit': { stderr: 'nothing to commit', exitCode: 1 }
    },
    
    commandSuccess: {
      'npm test': { stdout: 'All tests passed!', exitCode: 0 },
      'npm run build': { stdout: 'Build complete', exitCode: 0 }
    },
    
    commandFailure: {
      'npm test': { stderr: 'Tests failed', exitCode: 1 },
      'npm run build': { stderr: 'Build error', exitCode: 1 }
    }
  };
}