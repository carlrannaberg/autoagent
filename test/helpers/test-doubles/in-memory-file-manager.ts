import { Issue, Plan, Todo } from '../../../src/types';
// Removed unused import: import * as path from 'path';

export class InMemoryFileManager {
  private files: Map<string, string> = new Map();
  private issues: Map<number, Issue> = new Map();
  private plans: Map<number, Plan> = new Map();
  private todos: Todo[] = [];
  private providerInstructions: string = '';
  private changedFiles: string[] = [];
  private mockIssueFiles?: string[];
  private rawTodoContent?: string;

  constructor(private rootPath: string = '/test') {}

  async createProviderInstructionsIfMissing(): Promise<void> {
    // No-op for in-memory implementation
  }

  readIssue(issueNumber: number): Issue {
    const issue = this.issues.get(issueNumber);
    if (issue === null || issue === undefined) {
      return {
        number: issueNumber,
        title: `Test Issue ${issueNumber}`,
        file: `issues/${issueNumber}-test-issue.md`,
        requirements: 'Test requirements',
        acceptanceCriteria: ['Test criteria']
      };
    }
    return issue;
  }

  readPlan(issueNumber: number): Plan {
    const plan = this.plans.get(issueNumber);
    if (plan === null || plan === undefined) {
      return {
        issueNumber,
        file: `plans/${issueNumber}-plan.md`,
        phases: [{ name: 'Phase 1', tasks: ['Task 1'] }]
      };
    }
    return plan;
  }

  readTodoList(): string[] {
    return this.todos.map((todo: any) => 
      `- [${todo.completed === true ? 'x' : ' '}] Issue #${todo.issueNumber}: ${todo.title}`
    );
  }

  updateTodoList(todos: string[]): void {
    this.todos = todos.map((todo, index) => {
      const match = todo.match(/- \[(x| )\] Issue #(\d+): (.+)/);
      if (match) {
        return {
          issueNumber: parseInt(match[2]),
          title: match[3],
          completed: match[1] === 'x'
        };
      }
      return { issueNumber: index + 1, title: todo, completed: false };
    });
  }

  readProviderInstructions(): string {
    return this.providerInstructions;
  }

  updateProviderInstructions(instructions: string): void {
    this.providerInstructions = instructions;
  }

  updateTodoStatus(issueNumber: number, completed: boolean): void {
    const todo = this.todos.find(t => t.issueNumber === issueNumber);
    if (todo !== null && todo !== undefined) {
      todo.completed = completed;
    }
  }

  getNextIssue(): { number: number; title: string } | null {
    const pending = this.todos.find((t: any) => t.completed === null || t.completed === undefined || t.completed === false);
    return pending !== null && pending !== undefined ? { number: pending.issueNumber, title: pending.title } : null;
  }
  
  getNextPendingIssue(): number | null {
    const pending = this.todos.find((t: any) => t.completed === null || t.completed === undefined || t.completed === false);
    return pending !== null && pending !== undefined ? pending.issueNumber : null;
  }

  getNextIssueNumber(): number {
    // This should match the real FileManager behavior which reads from the filesystem
    // In our tests, we're directly adding files to mockFiles, so we need to check those too
    const issueNumbers: number[] = [...this.issues.keys()];
    
    // Also check todos
    this.todos.forEach(todo => {
      if (!issueNumbers.includes(todo.issueNumber)) {
        issueNumbers.push(todo.issueNumber);
      }
    });
    
    // For tests, we also need to consider files directly added to the filesystem mock
    // This is passed in through setIssueFiles method
    if (this.mockIssueFiles) {
      this.mockIssueFiles.forEach(filename => {
        const match = filename.match(/^(\d+)-.*\.md$/);
        if (match !== null && match[1] !== undefined && match[1] !== '') {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && !issueNumbers.includes(num)) {
            issueNumbers.push(num);
          }
        }
      });
    }
    
    return issueNumbers.length > 0 ? Math.max(...issueNumbers) + 1 : 1;
  }
  
  // Add a method to set mock issue files for testing
  setIssueFiles(files: string[]): void {
    this.mockIssueFiles = files;
  }

  readTodo(): string {
    // If raw content was stored via updateTodo, return it
    if (this.rawTodoContent !== undefined) {
      return this.rawTodoContent;
    }
    
    // If no todos exist, return empty string to simulate non-existent file
    if (this.todos.length === 0) {
      return '';
    }
    
    const pendingTodos = this.todos.filter((t: any) => t.completed === null || t.completed === undefined || t.completed === false);
    const completedTodos = this.todos.filter(t => t.completed);
    
    // Return full TODO format including header
    let content = '# To-Do\n\n';
    content += 'This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.\n\n';
    content += '## Pending Issues\n';
    pendingTodos.forEach(todo => {
      const slug = todo.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const filename = `${todo.issueNumber}-${slug}.md`;
      content += `- [ ] **[Issue #${todo.issueNumber}]** ${todo.title} - \`issues/${filename}\`\n`;
    });
    
    content += '\n## Completed Issues\n';
    if (completedTodos.length > 0) {
      completedTodos.forEach(todo => {
        const slug = todo.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const filename = `${todo.issueNumber}-${slug}.md`;
        content += `- [x] **[Issue #${todo.issueNumber}]** ${todo.title} - \`issues/${filename}\`\n`;
      });
    }
    
    return content;
  }

  createIssue(issueNumber: number, title: string, content: string): string {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const filePath = `issues/${issueNumber}-${slug}.md`;
    this.files.set(filePath, content);
    this.issues.set(issueNumber, {
      number: issueNumber,
      title: title,
      file: filePath,
      requirements: 'New requirements',
      acceptanceCriteria: ['New criteria']
    });
    return filePath;
  }

  createPlan(issueNumber: number, plan: any, issueTitle?: string): string {
    const slug = issueTitle ? issueTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : 'plan';
    const filePath = `plans/${issueNumber}-${slug}.md`;
    
    // Store the plan object
    this.plans.set(issueNumber, plan);
    
    // Create a simple content representation
    const content = `# Plan for Issue ${issueNumber}\n\n${JSON.stringify(plan, null, 2)}`;
    this.files.set(filePath, content);
    
    return filePath;
  }

  getTodoStats(): { total: number; completed: number; pending: number } {
    const completed = this.todos.filter(t => t.completed).length;
    const total = this.todos.length;
    return {
      total,
      completed,
      pending: total - completed
    };
  }

  getChangedFiles(): string[] {
    return this.changedFiles;
  }

  setChangedFiles(files: string[]): void {
    this.changedFiles = files;
  }

  readFile(filePath: string): string {
    return this.files.get(filePath) ?? 'Template content';
  }

  writeFile(filePath: string, content: string): void {
    this.files.set(filePath, content);
  }

  // Helper method for tests
  addTodo(issueNumber: number, title: string, completed: boolean = false): void {
    this.todos.push({ issueNumber, title, completed });
  }
  
  // Helper method to clear todos for tests
  clearTodos(): void {
    this.todos = [];
  }
  
  // Update TODO content (used by bootstrap)
  updateTodo(content: string): void {
    // Store the raw content for accurate readTodo()
    this.rawTodoContent = content;
    
    // Parse the content to extract todos
    const lines = content.split('\n');
    this.todos = [];
    
    lines.forEach(line => {
      const pendingMatch = line.match(/^- \[ \] \*\*\[Issue #(\d+)\]\*\* (.+) - /);
      const completedMatch = line.match(/^- \[x\] \*\*\[Issue #(\d+)\]\*\* (.+) - /);
      
      if (pendingMatch) {
        this.todos.push({
          issueNumber: parseInt(pendingMatch[1]),
          title: pendingMatch[2],
          completed: false
        });
      } else if (completedMatch) {
        this.todos.push({
          issueNumber: parseInt(completedMatch[1]),
          title: completedMatch[2],
          completed: true
        });
      }
    });
  }
  
  // Check if TODO exists
  hasTodo(): boolean {
    return this.todos.length > 0;
  }
}