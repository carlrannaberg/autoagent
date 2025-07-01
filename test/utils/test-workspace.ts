import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';
import { execSync } from 'node:child_process';
import type { Issue } from '../../src/types/index.js';

export interface TestWorkspaceOptions {
  prefix?: string;
  initGit?: boolean;
  files?: Record<string, string>;
}

export class TestWorkspace {
  private _path: string;
  private _cleanup: boolean = true;
  
  constructor(options: TestWorkspaceOptions = {}) {
    const prefix = options.prefix ?? 'autoagent-test';
    this._path = path.join(os.tmpdir(), `${prefix}-${Date.now()}-${Math.random().toString(36).substring(7)}`);
  }
  
  get path(): string {
    return this._path;
  }
  
  async setup(options: TestWorkspaceOptions = {}): Promise<void> {
    await fs.mkdir(this._path, { recursive: true });
    
    if (options.files) {
      await this.createFiles(options.files);
    }
    
    if (options.initGit === true) {
      this.initGit();
    }
  }
  
  async createFiles(files: Record<string, string>): Promise<void> {
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(this._path, filePath);
      const dir = path.dirname(fullPath);
      
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');
    }
  }
  
  async createIssue(issueNumber: number, issue: Issue): Promise<string> {
    const issuesDir = path.join(this._path, 'issues');
    await fs.mkdir(issuesDir, { recursive: true });
    
    const fileName = `${issueNumber}-${issue.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    const filePath = path.join(issuesDir, fileName);
    
    const content = [
      `# Issue ${issueNumber}: ${issue.title}`,
      '',
      '## Requirement',
      issue.requirements,
      '',
      '## Acceptance Criteria',
      ...issue.acceptanceCriteria.map(criterion => `- [ ] ${criterion}`),
    ];
    
    if (issue.technicalDetails !== undefined) {
      content.push('', '## Technical Details', issue.technicalDetails);
    }
    
    if (issue.resources !== undefined && issue.resources.length > 0) {
      content.push('', '## Resources', ...issue.resources.map((resource: string) => `- ${resource}`));
    }
    
    await fs.writeFile(filePath, content.join('\n'));
    return filePath;
  }
  
  async createPlan(issueNumber: number, planContent: string): Promise<string> {
    const plansDir = path.join(this._path, 'plans');
    await fs.mkdir(plansDir, { recursive: true });
    
    const filePath = path.join(plansDir, `issue-${issueNumber}-plan.md`);
    await fs.writeFile(filePath, planContent);
    return filePath;
  }
  
  async readFile(relativePath: string): Promise<string> {
    const fullPath = path.join(this._path, relativePath);
    return fs.readFile(fullPath, 'utf-8');
  }
  
  async fileExists(relativePath: string): Promise<boolean> {
    try {
      const fullPath = path.join(this._path, relativePath);
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }
  
  async listFiles(relativePath: string = '.'): Promise<string[]> {
    const fullPath = path.join(this._path, relativePath);
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    
    const files: string[] = [];
    for (const entry of entries) {
      if (entry.isFile()) {
        files.push(path.join(relativePath, entry.name));
      } else if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const subFiles = await this.listFiles(path.join(relativePath, entry.name));
        files.push(...subFiles);
      }
    }
    
    return files;
  }
  
  private initGit(): void {
    const cwd = this._path;
    execSync('git init', { cwd });
    execSync('git config user.name "Test User"', { cwd });
    execSync('git config user.email "test@example.com"', { cwd });
    execSync('git add .', { cwd });
    execSync('git commit -m "Initial commit"', { cwd });
  }
  
  async cleanup(): Promise<void> {
    if (this._cleanup) {
      try {
        await fs.rm(this._path, { recursive: true, force: true });
      } catch (error) {
        console.warn(`Failed to cleanup test workspace: ${error as string}`);
      }
    }
  }
  
  preventCleanup(): void {
    this._cleanup = false;
    // console.log(`Test workspace preserved at: ${this._path}`);
  }
}