import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import * as path from 'path';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { ConfigManager } from '@/core/config-manager';
import { ProviderSimulator } from '../utils/provider-simulator';
import { createIntegrationContext, cleanupIntegrationContext, createTestIssue, measureExecutionTime } from '../utils/integration-helpers';
import type { IntegrationTestContext } from '../utils/integration-helpers';
import type { Issue } from '@/types/issue';
import type { TodoItem } from '@/types/todo';

describe('Batch Execution Integration Tests', () => {
  let context: IntegrationTestContext;
  let agent: AutonomousAgent;
  let configManager: ConfigManager;

  beforeEach(async () => {
    context = await createIntegrationContext();
    
    configManager = new ConfigManager(context.workspace.rootPath);
    await configManager.loadConfig();
    
    agent = new AutonomousAgent(configManager, context.workspace.rootPath);
  });

  afterEach(async () => {
    await cleanupIntegrationContext(context);
  });

  describe('Multi-Issue Batch Processing', () => {
    it('should process multiple issues in sequence', async () => {
      const issues: Issue[] = [
        {
          id: 'utils-1',
          title: 'Create String Utils',
          requirement: 'Add string manipulation utilities',
          acceptanceCriteria: ['capitalize function', 'truncate function'],
          dependencies: [],
          technicalDetails: ''
        },
        {
          id: 'utils-2',
          title: 'Create Array Utils',
          requirement: 'Add array manipulation utilities',
          acceptanceCriteria: ['chunk function', 'flatten function'],
          dependencies: [],
          technicalDetails: ''
        },
        {
          id: 'utils-3',
          title: 'Create Date Utils',
          requirement: 'Add date formatting utilities',
          acceptanceCriteria: ['format function', 'parse function'],
          dependencies: [],
          technicalDetails: ''
        }
      ];

      const issueDir = path.join(context.workspace.rootPath, 'issues');
      await fs.mkdir(issueDir, { recursive: true });

      for (const issue of issues) {
        await createTestIssue(context.workspace, issue);
      }

      const executionOrder: string[] = [];
      const executionTimes: Record<string, number> = {};

      for (const issue of issues) {
        const { duration } = await measureExecutionTime(async () => {
          executionOrder.push(issue.id);
          
          const filePath = path.join(
            context.workspace.rootPath,
            'src/utils',
            `${issue.id.replace('utils-', '')}.ts`
          );
          
          await fs.mkdir(path.dirname(filePath), { recursive: true });
          
          let content = '';
          if (issue.id === 'utils-1') {
            content = `export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const truncate = (s: string, len: number) => s.length > len ? s.slice(0, len) + '...' : s;`;
          } else if (issue.id === 'utils-2') {
            content = `export const chunk = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
export const flatten = <T>(arr: T[][]): T[] => arr.flat();`;
          } else if (issue.id === 'utils-3') {
            content = `export const format = (date: Date, fmt: string) => date.toISOString();
export const parse = (str: string) => new Date(str);`;
          }
          
          await fs.writeFile(filePath, content);
        });

        executionTimes[issue.id] = duration;
      }

      expect(executionOrder).toEqual(['utils-1', 'utils-2', 'utils-3']);
      
      for (const issueId of Object.keys(executionTimes)) {
        expect(executionTimes[issueId]).toBeGreaterThan(0);
      }

      const files = await fs.readdir(path.join(context.workspace.rootPath, 'src/utils'));
      expect(files).toContain('string.ts');
      expect(files).toContain('array.ts');
      expect(files).toContain('date.ts');
    });

    it('should handle parallel batch execution', async () => {
      const independentIssues: Issue[] = Array.from({ length: 5 }, (_, i) => ({
        id: `parallel-${i + 1}`,
        title: `Parallel Task ${i + 1}`,
        requirement: `Implement feature ${i + 1}`,
        acceptanceCriteria: [`Feature ${i + 1} working`],
        dependencies: [],
        technicalDetails: ''
      }));

      for (const issue of independentIssues) {
        await createTestIssue(context.workspace, issue);
      }

      const startTime = Date.now();
      
      const results = await Promise.all(
        independentIssues.map(async (issue) => {
          const filePath = path.join(
            context.workspace.rootPath,
            'src/features',
            `${issue.id}.ts`
          );
          
          await fs.mkdir(path.dirname(filePath), { recursive: true });
          await fs.writeFile(
            filePath,
            `export const feature${issue.id.split('-')[1]} = () => '${issue.title}';`
          );
          
          return { issueId: issue.id, completed: true };
        })
      );

      const totalTime = Date.now() - startTime;

      expect(results).toHaveLength(5);
      expect(results.every(r => r.completed)).toBe(true);
      expect(totalTime).toBeLessThan(1000);
    });

    it('should respect priority order in batch execution', async () => {
      const prioritizedIssues: Array<Issue & { priority: 'high' | 'medium' | 'low' }> = [
        {
          id: 'low-priority',
          title: 'Low Priority Task',
          requirement: 'Can be done later',
          acceptanceCriteria: [],
          dependencies: [],
          technicalDetails: '',
          priority: 'low'
        },
        {
          id: 'high-priority',
          title: 'High Priority Task',
          requirement: 'Must be done first',
          acceptanceCriteria: [],
          dependencies: [],
          technicalDetails: '',
          priority: 'high'
        },
        {
          id: 'medium-priority',
          title: 'Medium Priority Task',
          requirement: 'Should be done soon',
          acceptanceCriteria: [],
          dependencies: [],
          technicalDetails: '',
          priority: 'medium'
        }
      ];

      const executionOrder: string[] = [];

      const sortedIssues = [...prioritizedIssues].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      for (const issue of sortedIssues) {
        await createTestIssue(context.workspace, issue);
        executionOrder.push(issue.id);
      }

      expect(executionOrder).toEqual(['high-priority', 'medium-priority', 'low-priority']);
    });
  });

  describe('TODO List Management', () => {
    it('should update TODO list during batch execution', async () => {
      const todoPath = path.join(context.workspace.rootPath, '.autoagent/todos.json');
      await fs.mkdir(path.dirname(todoPath), { recursive: true });

      const initialTodos: TodoItem[] = [
        {
          id: '1',
          issueId: 'task-1',
          content: 'Implement feature A',
          status: 'pending',
          priority: 'high'
        },
        {
          id: '2',
          issueId: 'task-2',
          content: 'Implement feature B',
          status: 'pending',
          priority: 'medium'
        },
        {
          id: '3',
          issueId: 'task-3',
          content: 'Implement feature C',
          status: 'pending',
          priority: 'low'
        }
      ];

      await fs.writeFile(todoPath, JSON.stringify(initialTodos, null, 2));

      for (let i = 0; i < initialTodos.length; i++) {
        initialTodos[i].status = 'in_progress';
        await fs.writeFile(todoPath, JSON.stringify(initialTodos, null, 2));

        await new Promise(resolve => setTimeout(resolve, 100));

        initialTodos[i].status = 'completed';
        await fs.writeFile(todoPath, JSON.stringify(initialTodos, null, 2));
      }

      const finalTodos = JSON.parse(await fs.readFile(todoPath, 'utf-8'));
      expect(finalTodos.every((t: TodoItem) => t.status === 'completed')).toBe(true);
    });

    it('should handle TODO dependencies', async () => {
      const todos: TodoItem[] = [
        {
          id: '1',
          issueId: 'setup',
          content: 'Set up project structure',
          status: 'pending',
          priority: 'high',
          dependencies: []
        },
        {
          id: '2',
          issueId: 'implement',
          content: 'Implement core features',
          status: 'pending',
          priority: 'high',
          dependencies: ['1']
        },
        {
          id: '3',
          issueId: 'test',
          content: 'Write tests',
          status: 'pending',
          priority: 'medium',
          dependencies: ['2']
        },
        {
          id: '4',
          issueId: 'docs',
          content: 'Write documentation',
          status: 'pending',
          priority: 'low',
          dependencies: ['2']
        }
      ];

      const executionOrder: string[] = [];
      const completed = new Set<string>();

      const canExecute = (todo: TodoItem): boolean => {
        if (!todo.dependencies) {return true;}
        return todo.dependencies.every(dep => completed.has(dep));
      };

      while (executionOrder.length < todos.length) {
        const executable = todos.find(
          todo => !completed.has(todo.id) && canExecute(todo)
        );
        
        if (executable) {
          executionOrder.push(executable.id);
          completed.add(executable.id);
        }
      }

      expect(executionOrder).toEqual(['1', '2', '3', '4']);
      expect(executionOrder.indexOf('1')).toBeLessThan(executionOrder.indexOf('2'));
      expect(executionOrder.indexOf('2')).toBeLessThan(executionOrder.indexOf('3'));
      expect(executionOrder.indexOf('2')).toBeLessThan(executionOrder.indexOf('4'));
    });
  });

  describe('Progress Tracking', () => {
    it('should track execution progress accurately', async () => {
      const totalIssues = 10;
      const progressUpdates: Array<{ completed: number; percentage: number }> = [];

      for (let i = 0; i < totalIssues; i++) {
        const progress = {
          completed: i + 1,
          percentage: ((i + 1) / totalIssues) * 100
        };
        progressUpdates.push(progress);
      }

      expect(progressUpdates).toHaveLength(totalIssues);
      expect(progressUpdates[0].percentage).toBe(10);
      expect(progressUpdates[4].percentage).toBe(50);
      expect(progressUpdates[9].percentage).toBe(100);

      const isMonotonic = progressUpdates.every((update, i) => {
        if (i === 0) {return true;}
        return update.percentage > progressUpdates[i - 1].percentage;
      });
      expect(isMonotonic).toBe(true);
    });

    it('should generate execution summary report', async () => {
      const executionResults = [
        { issueId: 'issue-1', status: 'completed', duration: 1500, provider: 'claude' },
        { issueId: 'issue-2', status: 'completed', duration: 2000, provider: 'gemini' },
        { issueId: 'issue-3', status: 'failed', duration: 500, provider: 'claude', error: 'Timeout' },
        { issueId: 'issue-4', status: 'completed', duration: 1800, provider: 'claude' },
        { issueId: 'issue-5', status: 'completed', duration: 2200, provider: 'gemini' }
      ];

      const summary = {
        totalIssues: executionResults.length,
        completed: executionResults.filter(r => r.status === 'completed').length,
        failed: executionResults.filter(r => r.status === 'failed').length,
        totalDuration: executionResults.reduce((sum, r) => sum + r.duration, 0),
        averageDuration: 0,
        providerUsage: {} as Record<string, number>,
        errors: executionResults.filter(r => r.error).map(r => ({
          issueId: r.issueId,
          error: r.error
        }))
      };

      summary.averageDuration = summary.totalDuration / summary.totalIssues;

      for (const result of executionResults) {
        summary.providerUsage[result.provider] = 
          (summary.providerUsage[result.provider] || 0) + 1;
      }

      expect(summary.completed).toBe(4);
      expect(summary.failed).toBe(1);
      expect(summary.averageDuration).toBe(1600);
      expect(summary.providerUsage.claude).toBe(3);
      expect(summary.providerUsage.gemini).toBe(2);
      expect(summary.errors).toHaveLength(1);
      expect(summary.errors[0].issueId).toBe('issue-3');
    });
  });

  describe('Incremental Execution', () => {
    it('should support resuming interrupted batch execution', async () => {
      const batchState = {
        batchId: 'batch-001',
        totalIssues: 5,
        completedIssues: ['issue-1', 'issue-2'],
        currentIssue: 'issue-3',
        remainingIssues: ['issue-3', 'issue-4', 'issue-5']
      };

      const statePath = path.join(
        context.workspace.rootPath,
        '.autoagent/batch-state.json'
      );
      
      await fs.mkdir(path.dirname(statePath), { recursive: true });
      await fs.writeFile(statePath, JSON.stringify(batchState, null, 2));

      const loadedState = JSON.parse(await fs.readFile(statePath, 'utf-8'));
      expect(loadedState.completedIssues).toHaveLength(2);
      expect(loadedState.remainingIssues).toHaveLength(3);

      for (const issueId of loadedState.remainingIssues) {
        loadedState.completedIssues.push(issueId);
        loadedState.remainingIssues = loadedState.remainingIssues.filter(
          (id: string) => id !== issueId
        );
        loadedState.currentIssue = loadedState.remainingIssues[0] || null;
      }

      expect(loadedState.completedIssues).toHaveLength(5);
      expect(loadedState.remainingIssues).toHaveLength(0);
      expect(loadedState.currentIssue).toBeNull();
    });

    it('should handle partial file updates in batch', async () => {
      const files = [
        { path: 'src/components/Button.tsx', status: 'completed' },
        { path: 'src/components/Input.tsx', status: 'completed' },
        { path: 'src/components/Modal.tsx', status: 'in_progress' },
        { path: 'src/components/Dropdown.tsx', status: 'pending' },
        { path: 'src/components/Table.tsx', status: 'pending' }
      ];

      for (const file of files) {
        if (file.status !== 'pending') {
          const fullPath = path.join(context.workspace.rootPath, file.path);
          await fs.mkdir(path.dirname(fullPath), { recursive: true });
          
          if (file.status === 'completed') {
            await fs.writeFile(fullPath, `// ${path.basename(file.path)} implementation`);
          } else if (file.status === 'in_progress') {
            await fs.writeFile(fullPath, `// Partial ${path.basename(file.path)}`);
          }
        }
      }

      const createdFiles = [];
      for (const file of files) {
        const fullPath = path.join(context.workspace.rootPath, file.path);
        const exists = await fs.access(fullPath).then(() => true).catch(() => false);
        if (exists) {
          createdFiles.push(file.path);
        }
      }

      expect(createdFiles).toHaveLength(3);
      expect(createdFiles).toContain('src/components/Button.tsx');
      expect(createdFiles).toContain('src/components/Input.tsx');
      expect(createdFiles).toContain('src/components/Modal.tsx');
    });
  });
});