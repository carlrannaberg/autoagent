import { Issue, Plan, Todo } from '../../src/types';
// Removed unused import: import * as path from 'path';

export class InMemoryFileManager {
  private files: Map<string, string> = new Map();
  private issues: Map<number, Issue> = new Map();
  private plans: Map<number, Plan> = new Map();
  private todos: Todo[] = [];
  private providerInstructions: string = '';
  private changedFiles: string[] = [];

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

  updateTodo(issueNumber: number, completed: boolean): void {
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
    const maxIssue = Math.max(0, ...this.issues.keys(), ...this.todos.map(t => t.issueNumber));
    return maxIssue + 1;
  }

  readTodo(): string {
    const pendingTodos = this.todos.filter((t: any) => t.completed === null || t.completed === undefined || t.completed === false);
    const completedTodos = this.todos.filter(t => t.completed);
    
    let content = '## Pending Issues\n';
    pendingTodos.forEach(todo => {
      content += `- [ ] Issue #${todo.issueNumber}: ${todo.title}\n`;
    });
    
    if (completedTodos.length > 0) {
      content += '\n## Completed Issues\n';
      completedTodos.forEach(todo => {
        content += `- [x] Issue #${todo.issueNumber}: ${todo.title}\n`;
      });
    }
    
    return content;
  }

  createIssue(issueNumber: number, content: string): string {
    const filePath = `issues/${issueNumber}-new-issue.md`;
    this.files.set(filePath, content);
    this.issues.set(issueNumber, {
      number: issueNumber,
      title: `New Issue ${issueNumber}`,
      file: filePath,
      requirements: 'New requirements',
      acceptanceCriteria: ['New criteria']
    });
    return filePath;
  }

  createPlan(issueNumber: number, content: string): string {
    const filePath = `plans/${issueNumber}-plan.md`;
    this.files.set(filePath, content);
    this.plans.set(issueNumber, {
      issueNumber,
      file: filePath,
      phases: [{ name: 'New Phase', tasks: ['New Task'] }]
    });
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
}