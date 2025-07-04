import { describe, bench, beforeAll, afterAll } from 'vitest';
import { FileManager } from '../../../../src/utils/file-manager';
import { createBenchmark } from '../utils/benchmark.utils';
import { createTempDir } from '../../../setup';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('FileManager Performance Benchmarks', () => {
  let tempDir: string;
  let fileManager: FileManager;
  let issuesDir: string;
  let plansDir: string;

  beforeAll(async () => {
    tempDir = createTempDir();
    fileManager = new FileManager(tempDir);
    issuesDir = path.join(tempDir, 'issues');
    plansDir = path.join(tempDir, 'plans');
    
    await fs.mkdir(issuesDir, { recursive: true });
    await fs.mkdir(plansDir, { recursive: true });
    
    // Create test issues
    for (let i = 1; i <= 20; i++) {
      const issueContent = `# Issue ${i}: Test Issue

## Requirements
This is requirement ${i} with some detailed description.

## Acceptance Criteria
- [ ] Criterion 1 for issue ${i}
- [ ] Criterion 2 for issue ${i}
- [ ] Criterion 3 for issue ${i}

## Technical Details
${'Technical detail text '.repeat(50)}

## Resources
- Resource 1
- Resource 2
- Resource 3
`;
      await fs.writeFile(
        path.join(issuesDir, `${i}-test-issue-${i}.md`),
        issueContent
      );
    }
    
    // Create test plans
    for (let i = 1; i <= 10; i++) {
      const planContent = `# Plan for Issue ${i}

## Approach
Step-by-step approach for implementing issue ${i}.

## Implementation Steps
1. Step one with detailed instructions
2. Step two with more details
3. Step three with technical specifications

## Testing Strategy
- Unit tests
- Integration tests
- E2E tests

## Additional Notes
${'Additional note text '.repeat(30)}
`;
      await fs.writeFile(
        path.join(plansDir, `${i}-plan.md`),
        planContent
      );
    }
    
    // Create todo list
    const todoContent = {
      todos: [
        { id: '1', task: 'Task 1', completed: false },
        { id: '2', task: 'Task 2', completed: true },
        { id: '3', task: 'Task 3', completed: false },
        { id: '4', task: 'Task 4', completed: true },
        { id: '5', task: 'Task 5', completed: false }
      ]
    };
    await fs.writeFile(
      path.join(tempDir, 'todos.json'),
      JSON.stringify(todoContent, null, 2)
    );
  });

  afterAll(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('Issue Operations', () => {
    bench('read single issue', async () => {
      await fileManager.readIssue(5);
    });

    bench('create new issue', async () => {
      const issueNumber = Math.floor(Math.random() * 1000) + 100;
      await fileManager.createIssue(
        issueNumber,
        `Test Issue ${issueNumber}`,
        'Test requirements',
        ['Criterion 1', 'Criterion 2']
      );
    });

    bench('get next issue', async () => {
      await fileManager.getNextIssue();
    });

    createBenchmark(
      'read all issues sequentially',
      async () => {
        for (let i = 1; i <= 20; i++) {
          await fileManager.readIssue(i);
        }
      },
      { iterations: 50 }
    );

    createBenchmark(
      'read all issues concurrently',
      async () => {
        const promises = [];
        for (let i = 1; i <= 20; i++) {
          promises.push(fileManager.readIssue(i));
        }
        await Promise.all(promises);
      },
      { iterations: 50 }
    );
  });

  describe('Plan Operations', () => {
    bench('read single plan', async () => {
      await fileManager.readPlan(5);
    });

    bench('create new plan', async () => {
      const issueNumber = Math.floor(Math.random() * 1000) + 100;
      await fileManager.createPlan(
        issueNumber,
        'Test plan content with implementation details'
      );
    });

    createBenchmark(
      'read all plans',
      async () => {
        for (let i = 1; i <= 10; i++) {
          await fileManager.readPlan(i);
        }
      },
      { iterations: 100 }
    );
  });

  describe('Todo Operations', () => {
    bench('read todo list', async () => {
      await fileManager.readTodoList();
    });

    bench('update todo list', async () => {
      const todos = await fileManager.readTodoList();
      todos.todos.push({
        id: String(Date.now()),
        task: 'New task',
        completed: false
      });
      await fileManager.updateTodoList(todos);
    });

    bench('get todo stats', async () => {
      await fileManager.getTodoStats();
    });

    createBenchmark(
      'update todos 100 times',
      async () => {
        for (let i = 0; i < 100; i++) {
          const todos = await fileManager.readTodoList();
          if (todos.length > 0 && todos[0] !== undefined) {
            // Toggle completion status in markdown format
            if (todos[0].includes('[ ]')) {
              todos[0] = todos[0].replace('[ ]', '[x]');
            } else {
              todos[0] = todos[0].replace('[x]', '[ ]');
            }
          }
          await fileManager.updateTodoList(todos);
        }
      },
      { iterations: 10 }
    );
  });

  describe('File Discovery', () => {
    bench('find all issue files', async () => {
      const files = await fs.readdir(issuesDir);
      return files.filter(f => f.endsWith('.md'));
    });

    bench('get issue count', async () => {
      const files = await fs.readdir(issuesDir);
      return files.filter(f => f.match(/^\d+-.*\.md$/)).length;
    });

    bench('check file existence', async () => {
      for (let i = 1; i <= 20; i++) {
        try {
          await fs.access(path.join(issuesDir, `${i}-test-issue-${i}.md`));
        } catch {
          // File doesn't exist
        }
      }
    });
  });
});