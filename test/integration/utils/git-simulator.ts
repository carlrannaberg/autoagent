import { promises as fs } from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

export class GitSimulator {
  private repoPath: string;
  
  constructor(repoPath: string) {
    this.repoPath = repoPath;
  }

  async init(): Promise<void> {
    await this.exec(['init']);
    await this.exec(['config', 'user.email', 'test@example.com']);
    await this.exec(['config', 'user.name', 'Test User']);
  }

  async createCommit(message: string, files: Record<string, string>): Promise<string> {
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(this.repoPath, filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content);
      await this.exec(['add', filePath]);
    }
    
    await this.exec(['commit', '-m', message]);
    const { stdout } = await this.exec(['rev-parse', 'HEAD']);
    return stdout.trim();
  }

  async createBranch(branchName: string, checkout: boolean = true): Promise<void> {
    await this.exec(['branch', branchName]);
    if (checkout) {
      await this.exec(['checkout', branchName]);
    }
  }

  async getCurrentBranch(): Promise<string> {
    const { stdout } = await this.exec(['rev-parse', '--abbrev-ref', 'HEAD']);
    return stdout.trim();
  }

  async getStatus(): Promise<{
    branch: string;
    clean: boolean;
    staged: string[];
    unstaged: string[];
    untracked: string[];
  }> {
    const branch = await this.getCurrentBranch();
    const { stdout } = await this.exec(['status', '--porcelain']);
    
    const lines = stdout.trim().split('\n').filter(line => line.length > 0);
    const staged: string[] = [];
    const unstaged: string[] = [];
    const untracked: string[] = [];

    for (const line of lines) {
      const status = line.substring(0, 2);
      const file = line.substring(3);
      
      if (status === '??') {
        untracked.push(file);
      } else if (status[0] !== ' ' && status[0] !== '?') {
        staged.push(file);
      } else if (status[1] !== ' ' && status[1] !== '?') {
        unstaged.push(file);
      }
    }

    return {
      branch,
      clean: lines.length === 0,
      staged,
      unstaged,
      untracked
    };
  }

  async simulateMergeConflict(file: string, ourContent: string, theirContent: string): Promise<void> {
    const conflictContent = `<<<<<<< HEAD
${ourContent}
=======
${theirContent}
>>>>>>> branch`;
    
    const fullPath = path.join(this.repoPath, file);
    await fs.writeFile(fullPath, conflictContent);
  }

  async simulateDetachedHead(): Promise<void> {
    const { stdout } = await this.exec(['rev-parse', 'HEAD']);
    const commit = stdout.trim();
    await this.exec(['checkout', commit]);
  }

  async getCommitHistory(limit: number = 10): Promise<Array<{
    hash: string;
    author: string;
    date: string;
    message: string;
  }>> {
    const { stdout } = await this.exec([
      'log',
      `--max-count=${limit}`,
      '--pretty=format:%H|%an|%ad|%s',
      '--date=iso'
    ]);

    return stdout.trim().split('\n').map(line => {
      const [hash, author, date, message] = line.split('|');
      return { hash, author, date, message };
    });
  }

  async hasRemote(): Promise<boolean> {
    try {
      const { stdout } = await this.exec(['remote', '-v']);
      return stdout.trim().length > 0;
    } catch {
      return false;
    }
  }

  async addRemote(name: string, url: string): Promise<void> {
    await this.exec(['remote', 'add', name, url]);
  }

  private exec(args: string[]): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      const proc = spawn('git', args, {
        cwd: this.repoPath,
        env: { ...process.env, GIT_AUTHOR_DATE: '2024-01-01T00:00:00Z', GIT_COMMITTER_DATE: '2024-01-01T00:00:00Z' }
      });

      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      proc.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      proc.on('close', (code) => {
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(new Error(`Git command failed: ${args.join(' ')}\n${stderr}`));
        }
      });
    });
  }
}