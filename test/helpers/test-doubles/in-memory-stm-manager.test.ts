/**
 * Tests for InMemorySTMManager test double
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { InMemorySTMManager } from './in-memory-stm-manager.js';
import { STMError } from '../../../src/utils/stm-manager.js';
import type { TaskContent } from '../../../src/types/stm-types.js';

describe('InMemorySTMManager', () => {
  let manager: InMemorySTMManager;

  beforeEach(() => {
    manager = new InMemorySTMManager();
  });

  describe('createTask', () => {
    it('should create a task with numeric ID returned as string', async () => {
      const content: TaskContent = {
        description: 'Test task description',
        technicalDetails: 'Technical implementation details',
        implementationPlan: 'Step by step plan',
        acceptanceCriteria: ['Criteria 1', 'Criteria 2'],
        testingStrategy: 'Unit tests',
        verificationSteps: 'Run tests',
        tags: ['test', 'feature']
      };

      const taskId = await manager.createTask('Test Task', content);
      
      expect(taskId).toBe('1');
      expect(typeof taskId).toBe('string');
    });

    it('should increment task IDs', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };

      const id1 = await manager.createTask('Task 1', content);
      const id2 = await manager.createTask('Task 2', content);
      const id3 = await manager.createTask('Task 3', content);

      expect(id1).toBe('1');
      expect(id2).toBe('2');
      expect(id3).toBe('3');
    });

    it('should throw STMError for empty title', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };

      await expect(manager.createTask('', content)).rejects.toThrow(STMError);
      await expect(manager.createTask('   ', content)).rejects.toThrow(STMError);
    });

    it('should add autoagent tag and preserve custom tags', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: [],
        tags: ['feature', 'important']
      };

      const taskId = await manager.createTask('Test Task', content);
      const task = await manager.getTask(taskId);

      expect(task?.tags).toEqual(['autoagent', 'feature', 'important']);
    });

    it('should format task content correctly', async () => {
      const content: TaskContent = {
        description: 'Task description',
        technicalDetails: 'Technical details',
        implementationPlan: 'Implementation steps',
        acceptanceCriteria: ['AC1', 'AC2'],
        testingStrategy: 'Test strategy',
        verificationSteps: 'Verification steps'
      };

      const taskId = await manager.createTask('Test Task', content);
      const task = await manager.getTask(taskId);

      expect(task?.content).toContain('## Why & what');
      expect(task?.content).toContain('Task description');
      expect(task?.content).toContain('### Acceptance Criteria');
      expect(task?.content).toContain('- [ ] AC1');
      expect(task?.content).toContain('- [ ] AC2');
      expect(task?.content).toContain('## How');
      expect(task?.content).toContain('Technical details');
      expect(task?.content).toContain('### Implementation Plan');
      expect(task?.content).toContain('Implementation steps');
      expect(task?.content).toContain('## Validation');
      expect(task?.content).toContain('### Testing Strategy');
      expect(task?.content).toContain('Test strategy');
      expect(task?.content).toContain('### Verification Steps');
      expect(task?.content).toContain('Verification steps');
    });

    it('should set default status to pending', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };

      const taskId = await manager.createTask('Test Task', content);
      const task = await manager.getTask(taskId);

      expect(task?.status).toBe('pending');
    });

    it('should set timestamps', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };

      const before = new Date().toISOString();
      const taskId = await manager.createTask('Test Task', content);
      const after = new Date().toISOString();
      const task = await manager.getTask(taskId);

      expect(task?.created).toBeDefined();
      expect(task?.updated).toBeDefined();
      expect(task?.created).toBe(task?.updated);
      expect(new Date(task!.created).getTime()).toBeGreaterThanOrEqual(new Date(before).getTime());
      expect(new Date(task!.created).getTime()).toBeLessThanOrEqual(new Date(after).getTime());
    });
  });

  describe('getTask', () => {
    it('should retrieve task by string ID', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };

      const taskId = await manager.createTask('Test Task', content);
      const task = await manager.getTask(taskId);

      expect(task).toBeDefined();
      expect(task?.title).toBe('Test Task');
      expect(task?.id).toBe(1);
    });

    it('should return null for non-existent task', async () => {
      const task = await manager.getTask('999');
      expect(task).toBeNull();
    });

    it('should return null for invalid ID format', async () => {
      expect(await manager.getTask('abc')).toBeNull();
      expect(await manager.getTask('0')).toBeNull();
      expect(await manager.getTask('-1')).toBeNull();
      expect(await manager.getTask('')).toBeNull();
    });
  });

  describe('listTasks', () => {
    beforeEach(async () => {
      // Create test tasks
      const content1: TaskContent = {
        description: 'First task',
        technicalDetails: 'Details 1',
        implementationPlan: 'Plan 1',
        acceptanceCriteria: [],
        tags: ['feature', 'urgent']
      };

      const content2: TaskContent = {
        description: 'Second task',
        technicalDetails: 'Details 2',
        implementationPlan: 'Plan 2',
        acceptanceCriteria: [],
        tags: ['bug']
      };

      const content3: TaskContent = {
        description: 'Third task',
        technicalDetails: 'Details 3',
        implementationPlan: 'Plan 3',
        acceptanceCriteria: [],
        tags: ['feature', 'test']
      };

      await manager.createTask('Task One', content1);
      const id2 = await manager.createTask('Task Two', content2);
      const id3 = await manager.createTask('Task Three', content3);

      // Update statuses
      await manager.updateTaskStatus(id2, 'in-progress');
      await manager.updateTaskStatus(id3, 'done');
    });

    it('should list all tasks when no filters provided', async () => {
      const tasks = await manager.listTasks();
      
      expect(tasks).toHaveLength(3);
      expect(tasks[0].title).toBe('Task One');
      expect(tasks[1].title).toBe('Task Two');
      expect(tasks[2].title).toBe('Task Three');
    });

    it('should filter by status', async () => {
      const pendingTasks = await manager.listTasks({ status: 'pending' });
      expect(pendingTasks).toHaveLength(1);
      expect(pendingTasks[0].title).toBe('Task One');

      const inProgressTasks = await manager.listTasks({ status: 'in-progress' });
      expect(inProgressTasks).toHaveLength(1);
      expect(inProgressTasks[0].title).toBe('Task Two');

      const doneTasks = await manager.listTasks({ status: 'done' });
      expect(doneTasks).toHaveLength(1);
      expect(doneTasks[0].title).toBe('Task Three');
    });

    it('should filter by tags', async () => {
      const featureTasks = await manager.listTasks({ tags: ['feature'] });
      expect(featureTasks).toHaveLength(2);
      expect(featureTasks[0].title).toBe('Task One');
      expect(featureTasks[1].title).toBe('Task Three');

      const bugTasks = await manager.listTasks({ tags: ['bug'] });
      expect(bugTasks).toHaveLength(1);
      expect(bugTasks[0].title).toBe('Task Two');

      const urgentTasks = await manager.listTasks({ tags: ['urgent'] });
      expect(urgentTasks).toHaveLength(1);
      expect(urgentTasks[0].title).toBe('Task One');
    });

    it('should filter by search pattern', async () => {
      const searchResults = await manager.listTasks({ search: 'Two' });
      expect(searchResults).toHaveLength(1);
      expect(searchResults[0].title).toBe('Task Two');

      const contentSearch = await manager.listTasks({ search: 'Details 3' });
      expect(contentSearch).toHaveLength(1);
      expect(contentSearch[0].title).toBe('Task Three');

      const caseInsensitiveSearch = await manager.listTasks({ search: 'task' });
      expect(caseInsensitiveSearch).toHaveLength(3);
    });

    it('should combine multiple filters', async () => {
      const results = await manager.listTasks({ 
        status: 'pending', 
        tags: ['feature'] 
      });
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Task One');
    });

    it('should return empty array when no matches', async () => {
      const results = await manager.listTasks({ tags: ['nonexistent'] });
      expect(results).toEqual([]);
    });
  });

  describe('updateTask', () => {
    let taskId: string;

    beforeEach(async () => {
      const content: TaskContent = {
        description: 'Original description',
        technicalDetails: 'Original details',
        implementationPlan: 'Original plan',
        acceptanceCriteria: ['AC1'],
        tags: ['original']
      };
      taskId = await manager.createTask('Original Title', content);
    });

    it('should update task title', async () => {
      const updated = await manager.updateTask(taskId, { title: 'New Title' });
      
      expect(updated.title).toBe('New Title');
      expect(updated.id).toBe(1);
    });

    it('should update task status', async () => {
      const updated = await manager.updateTask(taskId, { status: 'in-progress' });
      
      expect(updated.status).toBe('in-progress');
    });

    it('should update task tags', async () => {
      const updated = await manager.updateTask(taskId, { tags: ['new', 'tags'] });
      
      expect(updated.tags).toEqual(['new', 'tags']);
    });

    it('should update task content', async () => {
      const updated = await manager.updateTask(taskId, { content: 'New content' });
      
      expect(updated.content).toBe('New content');
    });

    it('should update multiple fields', async () => {
      const updated = await manager.updateTask(taskId, { 
        title: 'New Title',
        status: 'done',
        tags: ['completed']
      });
      
      expect(updated.title).toBe('New Title');
      expect(updated.status).toBe('done');
      expect(updated.tags).toEqual(['completed']);
    });

    it('should update the updated timestamp', async () => {
      const original = await manager.getTask(taskId);
      const originalUpdated = original!.updated;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      const updated = await manager.updateTask(taskId, { title: 'New Title' });
      
      expect(new Date(updated.updated).getTime()).toBeGreaterThan(new Date(originalUpdated).getTime());
    });

    it('should throw STMError for invalid task ID format', async () => {
      await expect(manager.updateTask('abc', { title: 'New' })).rejects.toThrow(STMError);
      await expect(manager.updateTask('0', { title: 'New' })).rejects.toThrow(STMError);
      await expect(manager.updateTask('-1', { title: 'New' })).rejects.toThrow(STMError);
    });

    it('should throw STMError for non-existent task', async () => {
      await expect(manager.updateTask('999', { title: 'New' })).rejects.toThrow(STMError);
      await expect(manager.updateTask('999', { title: 'New' })).rejects.toThrow('Task with ID 999 not found');
    });
  });

  describe('updateTaskStatus', () => {
    let taskId: string;

    beforeEach(async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };
      taskId = await manager.createTask('Test Task', content);
    });

    it('should update status to pending', async () => {
      const updated = await manager.updateTaskStatus(taskId, 'pending');
      expect(updated.status).toBe('pending');
    });

    it('should update status to in-progress', async () => {
      const updated = await manager.updateTaskStatus(taskId, 'in-progress');
      expect(updated.status).toBe('in-progress');
    });

    it('should update status to done', async () => {
      const updated = await manager.updateTaskStatus(taskId, 'done');
      expect(updated.status).toBe('done');
    });

    it('should map completed to done', async () => {
      const updated = await manager.updateTaskStatus(taskId, 'completed');
      expect(updated.status).toBe('done');
    });

    it('should throw STMError for invalid status', async () => {
      await expect(manager.updateTaskStatus(taskId, 'invalid')).rejects.toThrow(STMError);
      await expect(manager.updateTaskStatus(taskId, 'invalid')).rejects.toThrow('Invalid status: invalid');
    });
  });

  describe('markTaskComplete', () => {
    it('should mark task as done', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };
      const taskId = await manager.createTask('Test Task', content);

      const updated = await manager.markTaskComplete(taskId);
      
      expect(updated.status).toBe('done');
    });
  });

  describe('markTaskInProgress', () => {
    it('should mark task as in-progress', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };
      const taskId = await manager.createTask('Test Task', content);

      const updated = await manager.markTaskInProgress(taskId);
      
      expect(updated.status).toBe('in-progress');
    });
  });

  describe('searchTasks', () => {
    beforeEach(async () => {
      const content1: TaskContent = {
        description: 'Search test one',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: [],
        tags: ['search', 'test']
      };

      const content2: TaskContent = {
        description: 'Another task',
        technicalDetails: 'Search in content',
        implementationPlan: 'Plan',
        acceptanceCriteria: [],
        tags: ['other']
      };

      await manager.createTask('Search Task', content1);
      const id2 = await manager.createTask('Other Task', content2);
      await manager.updateTaskStatus(id2, 'done');
    });

    it('should search by pattern', async () => {
      const results = await manager.searchTasks('search');
      expect(results).toHaveLength(2);
    });

    it('should search with status filter', async () => {
      const results = await manager.searchTasks('search', { status: 'pending' });
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Search Task');
    });

    it('should search with tag filter', async () => {
      const results = await manager.searchTasks('task', { tags: ['test'] });
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Search Task');
    });
  });

  describe('getTaskSections', () => {
    it('should parse task sections correctly', async () => {
      const content: TaskContent = {
        description: 'Task description here',
        technicalDetails: 'Technical implementation',
        implementationPlan: 'Step by step',
        acceptanceCriteria: ['AC1', 'AC2'],
        testingStrategy: 'Unit tests',
        verificationSteps: 'Run npm test'
      };

      const taskId = await manager.createTask('Test Task', content);
      const sections = await manager.getTaskSections(taskId);

      expect(sections.description).toContain('Task description here');
      expect(sections.description).toContain('### Acceptance Criteria');
      expect(sections.description).toContain('- [ ] AC1');
      expect(sections.details).toContain('Technical implementation');
      expect(sections.details).toContain('Step by step');
      expect(sections.validation).toContain('Unit tests');
      expect(sections.validation).toContain('Run npm test');
    });

    it('should return empty object for task without content', async () => {
      const taskId = await manager.createTask('Empty Task', {
        description: '',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: []
      });

      // Manually remove content to simulate empty content
      const task = manager.getTaskById(Number(taskId));
      if (task) {
        task.content = undefined;
      }

      const sections = await manager.getTaskSections(taskId);
      expect(sections).toEqual({});
    });

    it('should throw STMError for non-existent task', async () => {
      await expect(manager.getTaskSections('999')).rejects.toThrow(STMError);
      await expect(manager.getTaskSections('999')).rejects.toThrow('Task not found: 999');
    });

    it('should throw STMError for invalid task ID', async () => {
      await expect(manager.getTaskSections('abc')).rejects.toThrow(STMError);
      await expect(manager.getTaskSections('abc')).rejects.toThrow('Invalid task ID: abc');
    });
  });

  describe('parseTaskId', () => {
    it('should parse valid numeric string', () => {
      expect(manager.parseTaskId('123')).toBe(123);
      expect(manager.parseTaskId('1')).toBe(1);
      expect(manager.parseTaskId('9999')).toBe(9999);
    });

    it('should throw STMError for invalid ID', () => {
      expect(() => manager.parseTaskId('abc')).toThrow(STMError);
      expect(() => manager.parseTaskId('')).toThrow(STMError);
    });
  });

  describe('wrapError', () => {
    it('should return STMError as-is', () => {
      const error = new STMError('Test error', 'test');
      const wrapped = manager.wrapError(error, 'operation');
      expect(wrapped).toBe(error);
    });

    it('should wrap Error in STMError', () => {
      const error = new Error('Test error');
      const wrapped = manager.wrapError(error, 'operation');
      expect(wrapped).toBeInstanceOf(STMError);
      expect(wrapped.message).toContain('Test error');
      expect(wrapped.operation).toBe('operation');
      expect(wrapped.cause).toBe(error);
    });

    it('should wrap non-Error in STMError', () => {
      const wrapped = manager.wrapError('String error', 'operation');
      expect(wrapped).toBeInstanceOf(STMError);
      expect(wrapped.message).toContain('String error');
      expect(wrapped.operation).toBe('operation');
      expect(wrapped.cause).toBeUndefined();
    });
  });

  describe('isInitialized', () => {
    it('should return false before any operation', () => {
      expect(manager.isInitialized()).toBe(false);
    });

    it('should return true after successful operation', async () => {
      await manager.createTask('Test', {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      });
      
      expect(manager.isInitialized()).toBe(true);
    });
  });

  describe('reset', () => {
    it('should clear all state', async () => {
      // Create some tasks
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };
      
      await manager.createTask('Task 1', content);
      await manager.createTask('Task 2', content);
      
      expect(manager.getAllTasks()).toHaveLength(2);
      expect(manager.isInitialized()).toBe(true);

      // Reset
      manager.reset();

      expect(manager.getAllTasks()).toHaveLength(0);
      expect(manager.isInitialized()).toBe(false);

      // Should start from ID 1 again
      const newId = await manager.createTask('New Task', content);
      expect(newId).toBe('1');
    });
  });

  describe('Test helper methods', () => {
    it('getAllTasks should return all tasks sorted by ID', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };

      await manager.createTask('Task 3', content);
      await manager.createTask('Task 1', content);
      await manager.createTask('Task 2', content);

      const allTasks = manager.getAllTasks();
      
      expect(allTasks).toHaveLength(3);
      expect(allTasks[0].id).toBe(1);
      expect(allTasks[1].id).toBe(2);
      expect(allTasks[2].id).toBe(3);
    });

    it('setInitializationError should cause operations to fail', async () => {
      manager.setInitializationError(new Error('Init failed'));

      await expect(manager.createTask('Test', {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      })).rejects.toThrow(STMError);
    });

    it('getTaskById should return task by numeric ID', async () => {
      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };

      await manager.createTask('Test Task', content);
      
      const task = manager.getTaskById(1);
      expect(task).toBeDefined();
      expect(task?.title).toBe('Test Task');

      expect(manager.getTaskById(999)).toBeUndefined();
    });

    it('setNextId should control next task ID', async () => {
      manager.setNextId(100);

      const content: TaskContent = {
        description: 'Test',
        technicalDetails: 'Details',
        implementationPlan: 'Plan',
        acceptanceCriteria: []
      };

      const taskId = await manager.createTask('Test Task', content);
      expect(taskId).toBe('100');

      const nextId = await manager.createTask('Another Task', content);
      expect(nextId).toBe('101');
    });
  });

  describe('Content formatting', () => {
    it('should handle partial content', async () => {
      const content: TaskContent = {
        description: 'Only description',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: []
      };

      const taskId = await manager.createTask('Partial Task', content);
      const task = await manager.getTask(taskId);

      expect(task?.content).toContain('## Why & what');
      expect(task?.content).toContain('Only description');
      expect(task?.content).not.toContain('## How');
      expect(task?.content).not.toContain('## Validation');
    });

    it('should handle content without description but with details', async () => {
      const content: TaskContent = {
        description: '',
        technicalDetails: 'Technical only',
        implementationPlan: 'Plan only',
        acceptanceCriteria: []
      };

      const taskId = await manager.createTask('Details Task', content);
      const task = await manager.getTask(taskId);

      expect(task?.content).not.toContain('## Why & what');
      expect(task?.content).toContain('## How');
      expect(task?.content).toContain('Technical only');
      expect(task?.content).toContain('Plan only');
    });

    it('should handle validation section only', async () => {
      const content: TaskContent = {
        description: '',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [],
        testingStrategy: 'Test strategy only',
        verificationSteps: 'Verification only'
      };

      const taskId = await manager.createTask('Validation Task', content);
      const task = await manager.getTask(taskId);

      expect(task?.content).not.toContain('## Why & what');
      expect(task?.content).not.toContain('## How');
      expect(task?.content).toContain('## Validation');
      expect(task?.content).toContain('Test strategy only');
      expect(task?.content).toContain('Verification only');
    });
  });
});