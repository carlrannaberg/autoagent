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
    if (this.workspace !== null) {
      try {
        await fs.rm(this.workspace, { recursive: true, force: true });
      } catch (error) {
        console.warn(`Failed to cleanup workspace: ${error as string}`);
      }
      this.workspace = null;
      this.gitInitialized = false;
    }
  }

  async initGit(): Promise<void> {
    if (this.workspace === null) {
      throw new Error('Workspace not created');
    }

    await execFileAsync('git', ['init'], { cwd: this.workspace });
    await execFileAsync('git', ['config', 'user.email', 'test@example.com'], { cwd: this.workspace });
    await execFileAsync('git', ['config', 'user.name', 'Test User'], { cwd: this.workspace });
    // Create initial commit to avoid detached HEAD
    await fs.writeFile(path.join(this.workspace, '.gitkeep'), '');
    await execFileAsync('git', ['add', '.gitkeep'], { cwd: this.workspace });
    await execFileAsync('git', ['commit', '-m', 'Initial commit'], { cwd: this.workspace });
    this.gitInitialized = true;
  }

  async addGitRemote(name: string, url: string): Promise<void> {
    if (this.workspace === null || !this.gitInitialized) {
      throw new Error('Git not initialized');
    }
    
    await execFileAsync('git', ['remote', 'add', name, url], { cwd: this.workspace });
  }

  async createFile(relativePath: string, content: string): Promise<void> {
    if (this.workspace === null) {
      throw new Error('Workspace not created');
    }

    const fullPath = path.join(this.workspace, relativePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
  }

  async createSTMTask(taskId: number, content: string): Promise<void> {
    await this.createFile(path.join('.stm', 'tasks', `${taskId}.md`), content);
  }

  async createSTMConfig(config: object): Promise<void> {
    await this.createFile(path.join('.stm', 'config.json'), JSON.stringify(config, null, 2));
  }

  async initializeSTM(): Promise<void> {
    // Create .autoagent/stm-tasks directory structure and initialize STM properly
    const stmTasksDir = path.join(this.getPath(), '.autoagent', 'stm-tasks');
    await fs.mkdir(stmTasksDir, { recursive: true });
    
    // Also initialize a proper STM repository in the workspace for compatibility
    const { execFile } = require('child_process');
    const { promisify } = require('util');
    const execFileAsync = promisify(execFile);
    
    try {
      // Run STM init to create proper STM repository structure
      await execFileAsync('npx', ['simple-task-master', 'init'], { 
        cwd: this.getPath(),
        stdio: 'ignore'
      });
    } catch (error) {
      // If STM init fails, at least ensure our custom directory exists
      console.warn('STM init failed, using manual directory creation:', error instanceof Error ? error.message : String(error));
    }
  }

  async readFile(relativePath: string): Promise<string> {
    if (this.workspace === null) {
      throw new Error('Workspace not created');
    }

    return fs.readFile(path.join(this.workspace, relativePath), 'utf-8');
  }

  async fileExists(relativePath: string): Promise<boolean> {
    if (this.workspace === null) {
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
    if (this.workspace === null) {
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
    if (this.workspace === null || !this.gitInitialized) {
      throw new Error('Git not initialized');
    }

    await execFileAsync('git', ['add', '.'], { cwd: this.workspace });
    await execFileAsync('git', ['commit', '-m', message], { cwd: this.workspace });
  }

  getPath(): string {
    if (this.workspace === null) {
      throw new Error('Workspace not created');
    }
    return this.workspace;
  }
}