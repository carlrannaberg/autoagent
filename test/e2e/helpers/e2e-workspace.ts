import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export class E2EWorkspace {
  private workspace: string | null = null;
  private gitInitialized = false;

  async create(prefix = 'autoagent-e2e'): Promise<string> {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), `${prefix}-`));
    this.workspace = tmpDir;
    return tmpDir;
  }

  async cleanup(): Promise<void> {
    if (this.workspace) {
      try {
        await fs.rm(this.workspace, { recursive: true, force: true });
      } catch (error) {
        console.warn(`Failed to cleanup workspace: ${error}`);
      }
      this.workspace = null;
      this.gitInitialized = false;
    }
  }

  async initGit(): Promise<void> {
    if (!this.workspace) {
      throw new Error('Workspace not created');
    }

    await execFileAsync('git', ['init'], { cwd: this.workspace });
    await execFileAsync('git', ['config', 'user.email', 'test@example.com'], { cwd: this.workspace });
    await execFileAsync('git', ['config', 'user.name', 'Test User'], { cwd: this.workspace });
    this.gitInitialized = true;
  }

  async createFile(relativePath: string, content: string): Promise<void> {
    if (!this.workspace) {
      throw new Error('Workspace not created');
    }

    const fullPath = path.join(this.workspace, relativePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
  }

  async createIssue(name: string, content: string): Promise<void> {
    await this.createFile(path.join('issues', `${name}.md`), content);
  }

  async createPlan(issueName: string, content: string): Promise<void> {
    await this.createFile(path.join('plans', `${issueName}.md`), content);
  }

  async readFile(relativePath: string): Promise<string> {
    if (!this.workspace) {
      throw new Error('Workspace not created');
    }

    return fs.readFile(path.join(this.workspace, relativePath), 'utf-8');
  }

  async fileExists(relativePath: string): Promise<boolean> {
    if (!this.workspace) {
      throw new Error('Workspace not created');
    }

    try {
      await fs.access(path.join(this.workspace, relativePath));
      return true;
    } catch {
      return false;
    }
  }

  async listFiles(relativePath = '.'): Promise<string[]> {
    if (!this.workspace) {
      throw new Error('Workspace not created');
    }

    const fullPath = path.join(this.workspace, relativePath);
    try {
      return await fs.readdir(fullPath);
    } catch {
      return [];
    }
  }

  async commit(message: string): Promise<void> {
    if (!this.workspace || !this.gitInitialized) {
      throw new Error('Git not initialized');
    }

    await execFileAsync('git', ['add', '.'], { cwd: this.workspace });
    await execFileAsync('git', ['commit', '-m', message], { cwd: this.workspace });
  }

  getPath(): string {
    if (!this.workspace) {
      throw new Error('Workspace not created');
    }
    return this.workspace;
  }
}