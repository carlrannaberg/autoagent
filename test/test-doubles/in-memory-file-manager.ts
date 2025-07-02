import { Issue, Plan, Todo } from '../../src/types';
import * as path from 'path';

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

  async readIssue(issueNumber: number): Promise<Issue> {
    const issue = this.issues.get(issueNumber);
    if (!issue) {
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

  async readPlan(issueNumber: number): Promise<Plan> {
    const plan = this.plans.get(issueNumber);
    if (!plan) {
      return {
        issueNumber,
        file: `plans/${issueNumber}-plan.md`,
        phases: [{ name: 'Phase 1', tasks: ['Task 1'] }]
      };
    }
    return plan;
  }

  async readTodoList(): Promise<string[]> {
    return this.todos.map(todo => 
      `- [${todo.completed ? 'x' : ' '}] Issue #${todo.issueNumber}: ${todo.title}`
    );
  }

  async updateTodoList(todos: string[]): Promise<void> {
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

  async readProviderInstructions(): Promise<string> {
    return this.providerInstructions;
  }

  async updateProviderInstructions(instructions: string): Promise<void> {
    this.providerInstructions = instructions;
  }

  async updateTodo(issueNumber: number, completed: boolean): Promise<void> {
    const todo = this.todos.find(t => t.issueNumber === issueNumber);
    if (todo) {
      todo.completed = completed;
    }
  }

  async getNextIssue(): Promise<number | null> {
    const pending = this.todos.find(t => !t.completed);
    return pending ? pending.issueNumber : null;
  }
  
  async getNextPendingIssue(): Promise<number | null> {
    const pending = this.todos.find(t => !t.completed);
    return pending ? pending.issueNumber : null;
  }

  async getNextIssueNumber(): Promise<number> {
    const maxIssue = Math.max(0, ...this.issues.keys(), ...this.todos.map(t => t.issueNumber));
    return maxIssue + 1;
  }

  async readTodo(): Promise<string> {
    const pendingTodos = this.todos.filter(t => !t.completed);
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

  async createIssue(issueNumber: number, content: string): Promise<string> {
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

  async createPlan(issueNumber: number, content: string): Promise<string> {
    const filePath = `plans/${issueNumber}-plan.md`;
    this.files.set(filePath, content);
    this.plans.set(issueNumber, {
      issueNumber,
      file: filePath,
      phases: [{ name: 'New Phase', tasks: ['New Task'] }]
    });
    return filePath;
  }

  async getTodoStats(): Promise<{ total: number; completed: number; pending: number }> {
    const completed = this.todos.filter(t => t.completed).length;
    const total = this.todos.length;
    return {
      total,
      completed,
      pending: total - completed
    };
  }

  async getChangedFiles(): Promise<string[]> {
    return this.changedFiles;
  }

  setChangedFiles(files: string[]): void {
    this.changedFiles = files;
  }

  async readFile(filePath: string): Promise<string> {
    return this.files.get(filePath) || 'Template content';
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    this.files.set(filePath, content);
  }

  // Helper method for tests
  addTodo(issueNumber: number, title: string, completed: boolean = false): void {
    this.todos.push({ issueNumber, title, completed });
  }
}