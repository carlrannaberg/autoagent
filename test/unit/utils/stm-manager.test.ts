/**
 * Comprehensive unit tests for STMManager
 * Tests all methods including task creation, content formatting, error handling, and edge cases
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TaskManager, NotFoundError, type Task, type TaskListFilters, type TaskCreateInput } from 'simple-task-master';
import { STMManager, STMError, type STMManagerConfig } from '../../../src/utils/stm-manager.js';
import { TaskContent } from '../../../src/types/stm-types.js';

// Mock the TaskManager
vi.mock('simple-task-master', async (importOriginal) => {
  const actual = await importOriginal<typeof import('simple-task-master')>();
  return {
    ...actual,
    TaskManager: {
      create: vi.fn(),
    },
    NotFoundError: actual.NotFoundError,
  };
});

const mockTaskManager = {
  create: vi.fn(),
  get: vi.fn(),
  list: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const MockTaskManager = TaskManager as any;

describe('STMManager', () => {
  let stmManager: STMManager;

  beforeEach(() => {
    vi.clearAllMocks();
    MockTaskManager.create.mockResolvedValue(mockTaskManager);
    stmManager = new STMManager();
  });

  afterEach(() => {
    stmManager.reset();
  });

  describe('Constructor and Configuration', () => {
    // Tests constructor with different configuration options
    it('should create STMManager with default config', () => {
      const manager = new STMManager();
      expect(manager).toBeInstanceOf(STMManager);
      expect(manager.isInitialized()).toBe(false);
    });

    it('should create STMManager with custom config', () => {
      const config: STMManagerConfig = {
        tasksDir: '/custom/path',
        maxTaskSizeBytes: 500000,
        maxTitleLength: 100,
        maxDescriptionLength: 32000
      };
      
      const manager = new STMManager(config);
      expect(manager).toBeInstanceOf(STMManager);
      expect(manager.isInitialized()).toBe(false);
    });

    it('should create STMManager with partial config', () => {
      const config: STMManagerConfig = {
        tasksDir: '/partial/path'
      };
      
      const manager = new STMManager(config);
      expect(manager).toBeInstanceOf(STMManager);
    });

    it('should handle empty config object', () => {
      const manager = new STMManager({});
      expect(manager).toBeInstanceOf(STMManager);
    });
  });

  describe('createTask', () => {
    // Tests task creation with comprehensive content formatting validation
    const mockCreatedTask: Task = {
      schema: 1,
      id: 42,
      title: 'Test Task Creation',
      status: 'pending',
      created: '2023-01-01T00:00:00.000Z',
      updated: '2023-01-01T00:00:00.000Z',
      tags: ['autoagent', 'feature'],
      dependencies: [],
      content: 'Formatted content',
    };

    it('should create task with minimal content', async () => {
      const taskContent: TaskContent = {
        description: 'Basic task description',
        technicalDetails: 'Implementation approach',
        implementationPlan: 'Step-by-step plan',
        acceptanceCriteria: ['Task should work', 'Tests should pass']
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      const result = await stmManager.createTask('Test Task', taskContent);

      expect(result).toBe('42');
      expect(mockTaskManager.create).toHaveBeenCalledWith({
        title: 'Test Task',
        content: expect.stringContaining('## Why & what\n\nBasic task description\n\n### Acceptance Criteria\n\n- [ ] Task should work\n- [ ] Tests should pass\n\n## How\n\nImplementation approach\n\n### Implementation Plan\n\nStep-by-step plan'),
        tags: ['autoagent'],
        status: 'pending'
      });
    });

    it('should create task with full content including validation sections', async () => {
      const taskContent: TaskContent = {
        description: 'Full task description',
        technicalDetails: 'Detailed technical approach',
        implementationPlan: 'Comprehensive implementation plan',
        acceptanceCriteria: ['Requirement 1', 'Requirement 2', 'Requirement 3'],
        testingStrategy: 'Unit tests and integration tests',
        verificationSteps: 'Manual verification steps',
        tags: ['feature', 'critical']
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      const result = await stmManager.createTask('Full Task', taskContent);

      expect(result).toBe('42');
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.title).toBe('Full Task');
      expect(createCall.tags).toEqual(['autoagent', 'feature', 'critical']);
      expect(createCall.status).toBe('pending');
      
      // Verify content formatting includes all sections
      expect(createCall.content).toContain('## Why & what\n\nFull task description');
      expect(createCall.content).toContain('### Acceptance Criteria\n\n- [ ] Requirement 1\n- [ ] Requirement 2\n- [ ] Requirement 3');
      expect(createCall.content).toContain('## How\n\nDetailed technical approach');
      expect(createCall.content).toContain('### Implementation Plan\n\nComprehensive implementation plan');
      expect(createCall.content).toContain('## Validation\n\n### Testing Strategy\n\nUnit tests and integration tests');
      expect(createCall.content).toContain('### Verification Steps\n\nManual verification steps');
    });

    it('should create task with only description (minimal valid content)', async () => {
      const taskContent: TaskContent = {
        description: 'Minimal description only',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: []
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      const result = await stmManager.createTask('Minimal Task', taskContent);

      expect(result).toBe('42');
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toBe('## Why & what\n\nMinimal description only');
    });

    it('should create task with technical details but no implementation plan', async () => {
      const taskContent: TaskContent = {
        description: 'Task with technical details',
        technicalDetails: 'Technical approach without implementation plan',
        implementationPlan: '',
        acceptanceCriteria: ['Must work correctly']
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      await stmManager.createTask('Tech Details Task', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toContain('## Why & what\n\nTask with technical details');
      expect(createCall.content).toContain('### Acceptance Criteria\n\n- [ ] Must work correctly');
      expect(createCall.content).toContain('## How\n\nTechnical approach without implementation plan');
      expect(createCall.content).not.toContain('### Implementation Plan');
    });

    it('should create task with implementation plan but no technical details', async () => {
      const taskContent: TaskContent = {
        description: 'Task with implementation plan only',
        technicalDetails: '',
        implementationPlan: 'Step 1, Step 2, Step 3',
        acceptanceCriteria: []
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      await stmManager.createTask('Implementation Task', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toContain('## How\n\nStep 1, Step 2, Step 3');
      expect(createCall.content).not.toContain('### Implementation Plan');
    });

    it('should create task with testing strategy but no verification steps', async () => {
      const taskContent: TaskContent = {
        description: 'Task with testing strategy',
        technicalDetails: 'Tech details',
        implementationPlan: 'Implementation',
        acceptanceCriteria: [],
        testingStrategy: 'Use TDD approach'
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      await stmManager.createTask('Testing Task', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toContain('## Validation\n\n### Testing Strategy\n\nUse TDD approach');
      expect(createCall.content).not.toContain('### Verification Steps');
    });

    it('should create task with verification steps but no testing strategy', async () => {
      const taskContent: TaskContent = {
        description: 'Task with verification steps',
        technicalDetails: 'Tech details',
        implementationPlan: 'Implementation',
        acceptanceCriteria: [],
        verificationSteps: 'Manual testing steps'
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      await stmManager.createTask('Verification Task', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toContain('## Validation\n\n### Verification Steps\n\nManual testing steps');
      expect(createCall.content).not.toContain('### Testing Strategy');
    });

    it('should handle empty arrays and strings in content', async () => {
      const taskContent: TaskContent = {
        description: '',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [],
        testingStrategy: '',
        verificationSteps: '',
        tags: []
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      const result = await stmManager.createTask('Empty Content Task', taskContent);

      expect(result).toBe('42');
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toBe('');
      expect(createCall.tags).toEqual(['autoagent']);
    });

    it('should handle special characters and markdown in content', async () => {
      const taskContent: TaskContent = {
        description: 'Description with **bold** and *italic* text',
        technicalDetails: '```javascript\nconst test = "code block";\n```',
        implementationPlan: '- List item 1\n- List item 2',
        acceptanceCriteria: ['Support `code` formatting', 'Handle > blockquotes']
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      await stmManager.createTask('Markdown Task', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toContain('**bold** and *italic*');
      expect(createCall.content).toContain('```javascript');
      expect(createCall.content).toContain('- [ ] Support `code` formatting');
      expect(createCall.content).toContain('- [ ] Handle > blockquotes');
    });

    it('should handle large content sections appropriately', async () => {
      const largeText = 'x'.repeat(1000);
      const taskContent: TaskContent = {
        description: largeText,
        technicalDetails: largeText,
        implementationPlan: largeText,
        acceptanceCriteria: [largeText, largeText]
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      const result = await stmManager.createTask('Large Content Task', taskContent);

      expect(result).toBe('42');
      expect(mockTaskManager.create).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Large Content Task',
        status: 'pending'
      }));
    });

    it('should handle unicode and emoji content', async () => {
      const taskContent: TaskContent = {
        description: 'Task with unicode: 你好 and emoji: 🚀✨',
        technicalDetails: 'Technical approach with symbols: ∑∞±',
        implementationPlan: 'Steps with arrows: → ← ↑ ↓',
        acceptanceCriteria: ['Support emoji 💯', 'Handle unicode correctly 中文']
      };

      mockTaskManager.create.mockResolvedValue(mockCreatedTask);

      await stmManager.createTask('Unicode Task 🌟', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.title).toBe('Unicode Task 🌟');
      expect(createCall.content).toContain('你好 and emoji: 🚀✨');
      expect(createCall.content).toContain('- [ ] Support emoji 💯');
    });

    it('should throw STMError when task creation fails', async () => {
      const taskContent: TaskContent = {
        description: 'Task that will fail',
        technicalDetails: 'Tech details',
        implementationPlan: 'Implementation',
        acceptanceCriteria: ['Should fail']
      };

      const originalError = new Error('Database unavailable');
      mockTaskManager.create.mockRejectedValue(originalError);

      await expect(stmManager.createTask('Failing Task', taskContent)).rejects.toThrow(STMError);
      await expect(stmManager.createTask('Failing Task', taskContent)).rejects.toThrow('Failed to create STM task: Failing Task');
      
      // Verify error context is preserved
      try {
        await stmManager.createTask('Failing Task', taskContent);
      } catch (error) {
        expect(error).toBeInstanceOf(STMError);
        expect((error as STMError).operation).toBe('create');
        expect((error as STMError).cause).toBe(originalError);
      }
    });

    it('should handle non-Error exceptions during creation', async () => {
      const taskContent: TaskContent = {
        description: 'Task with string error',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: []
      };

      mockTaskManager.create.mockRejectedValue('String error message');

      await expect(stmManager.createTask('String Error Task', taskContent)).rejects.toThrow(STMError);
      await expect(stmManager.createTask('String Error Task', taskContent)).rejects.toThrow('Failed to create STM task: String Error Task');
    });

    it('should handle initialization failure during task creation', async () => {
      MockTaskManager.create.mockRejectedValue(new Error('Initialization failed'));
      const stmManagerWithFailure = new STMManager();
      
      const taskContent: TaskContent = {
        description: 'Task with init failure',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: []
      };

      await expect(stmManagerWithFailure.createTask('Init Fail Task', taskContent)).rejects.toThrow(STMError);
      await expect(stmManagerWithFailure.createTask('Init Fail Task', taskContent)).rejects.toThrow('Failed to initialize STM TaskManager');
    });

    it('should return task ID as string even for large numeric IDs', async () => {
      const largeIdTask: Task = {
        ...mockCreatedTask,
        id: 999999999
      };
      
      mockTaskManager.create.mockResolvedValue(largeIdTask);
      
      const taskContent: TaskContent = {
        description: 'Task with large ID',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: []
      };

      const result = await stmManager.createTask('Large ID Task', taskContent);

      expect(result).toBe('999999999');
      expect(typeof result).toBe('string');
    });
  });

  describe('getTask', () => {
    const mockTask: Task = {
      schema: 1,
      id: 123,
      title: 'Test Task',
      status: 'pending',
      created: '2023-01-01T00:00:00.000Z',
      updated: '2023-01-01T00:00:00.000Z',
      tags: ['autoagent'],
      dependencies: [],
      content: 'Test content',
    };

    it('should return Task for valid numeric string ID', async () => {
      mockTaskManager.get.mockResolvedValue(mockTask);

      const result = await stmManager.getTask('123');

      expect(result).toEqual(mockTask);
      expect(mockTaskManager.get).toHaveBeenCalledWith(123);
    });

    it('should return null for non-existent task (NotFoundError)', async () => {
      mockTaskManager.get.mockRejectedValue(new NotFoundError('Task not found'));

      const result = await stmManager.getTask('999');

      expect(result).toBeNull();
      expect(mockTaskManager.get).toHaveBeenCalledWith(999);
    });

    it('should return null for invalid ID format', async () => {
      const result = await stmManager.getTask('invalid-id');

      expect(result).toBeNull();
      expect(mockTaskManager.get).not.toHaveBeenCalled();
    });

    it('should return null for non-numeric ID', async () => {
      const result = await stmManager.getTask('abc');

      expect(result).toBeNull();
      expect(mockTaskManager.get).not.toHaveBeenCalled();
    });

    it('should return null for empty string ID', async () => {
      const result = await stmManager.getTask('');

      expect(result).toBeNull();
      expect(mockTaskManager.get).not.toHaveBeenCalled();
    });

    it('should return null for negative ID', async () => {
      const result = await stmManager.getTask('-1');

      expect(result).toBeNull();
      expect(mockTaskManager.get).not.toHaveBeenCalled();
    });

    it('should throw STMError for other types of errors', async () => {
      const originalError = new Error('Database connection failed');
      mockTaskManager.get.mockRejectedValue(originalError);

      await expect(stmManager.getTask('123')).rejects.toThrow(STMError);
      await expect(stmManager.getTask('123')).rejects.toThrow('Failed to get STM task with ID: 123');
    });

    it('should handle initialization failure gracefully', async () => {
      MockTaskManager.create.mockRejectedValue(new Error('Initialization failed'));
      const stmManagerWithFailure = new STMManager();

      await expect(stmManagerWithFailure.getTask('123')).rejects.toThrow(STMError);
      await expect(stmManagerWithFailure.getTask('123')).rejects.toThrow('Failed to initialize STM TaskManager');
    });
  });

  describe('listTasks', () => {
    const mockTasks: Task[] = [
      {
        schema: 1,
        id: 1,
        title: 'Task 1',
        status: 'pending',
        created: '2023-01-01T00:00:00.000Z',
        updated: '2023-01-01T00:00:00.000Z',
        tags: ['autoagent', 'feature'],
        dependencies: [],
        content: 'Content 1',
      },
      {
        schema: 1,
        id: 2,
        title: 'Task 2',
        status: 'in-progress',
        created: '2023-01-02T00:00:00.000Z',
        updated: '2023-01-02T00:00:00.000Z',
        tags: ['autoagent', 'bug'],
        dependencies: [1],
        content: 'Content 2',
      },
    ];

    it('should list all tasks without filters', async () => {
      mockTaskManager.list.mockResolvedValue(mockTasks);

      const result = await stmManager.listTasks();

      expect(result).toEqual(mockTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith(undefined);
    });

    it('should list tasks with status filter', async () => {
      const filteredTasks = [mockTasks[0]];
      mockTaskManager.list.mockResolvedValue(filteredTasks);
      
      const filters: TaskListFilters = { status: 'pending' };
      const result = await stmManager.listTasks(filters);

      expect(result).toEqual(filteredTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith(filters);
    });

    it('should list tasks with tags filter', async () => {
      const filteredTasks = [mockTasks[1]];
      mockTaskManager.list.mockResolvedValue(filteredTasks);
      
      const filters: TaskListFilters = { tags: ['bug'] };
      const result = await stmManager.listTasks(filters);

      expect(result).toEqual(filteredTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith(filters);
    });

    it('should list tasks with search filter', async () => {
      const filteredTasks = [mockTasks[0]];
      mockTaskManager.list.mockResolvedValue(filteredTasks);
      
      const filters: TaskListFilters = { search: 'Task 1' };
      const result = await stmManager.listTasks(filters);

      expect(result).toEqual(filteredTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith(filters);
    });

    it('should list tasks with complex filters', async () => {
      const filteredTasks = [];
      mockTaskManager.list.mockResolvedValue(filteredTasks);
      
      const filters: TaskListFilters = { 
        status: 'done', 
        tags: ['feature', 'completed'],
        search: 'optimization'
      };
      const result = await stmManager.listTasks(filters);

      expect(result).toEqual(filteredTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith(filters);
    });

    it('should return empty array when no tasks match', async () => {
      mockTaskManager.list.mockResolvedValue([]);

      const result = await stmManager.listTasks({ status: 'done' });

      expect(result).toEqual([]);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ status: 'done' });
    });

    it('should throw STMError when listing fails', async () => {
      const originalError = new Error('Database query failed');
      mockTaskManager.list.mockRejectedValue(originalError);

      await expect(stmManager.listTasks()).rejects.toThrow(STMError);
      await expect(stmManager.listTasks()).rejects.toThrow('Failed to list STM tasks');
    });

    it('should include filter information in error message', async () => {
      const originalError = new Error('Query timeout');
      mockTaskManager.list.mockRejectedValue(originalError);
      
      const filters: TaskListFilters = { status: 'pending', tags: ['urgent'] };

      await expect(stmManager.listTasks(filters)).rejects.toThrow(STMError);
      await expect(stmManager.listTasks(filters)).rejects.toThrow(
        'Failed to list STM tasks with filters: {"status":"pending","tags":["urgent"]}'
      );
    });

    it('should handle initialization failure gracefully', async () => {
      MockTaskManager.create.mockRejectedValue(new Error('Initialization failed'));
      const stmManagerWithFailure = new STMManager();

      await expect(stmManagerWithFailure.listTasks()).rejects.toThrow(STMError);
      await expect(stmManagerWithFailure.listTasks()).rejects.toThrow('Failed to initialize STM TaskManager');
    });
  });

  describe('updateTask', () => {
    const mockTask: Task = {
      schema: 1,
      id: 123,
      title: 'Updated Task',
      status: 'in-progress',
      created: '2023-01-01T00:00:00.000Z',
      updated: '2023-01-02T00:00:00.000Z',
      tags: ['autoagent'],
      dependencies: [],
      content: 'Updated content',
    };

    it('should update task with valid ID', async () => {
      mockTaskManager.update.mockResolvedValue(mockTask);

      const updates = { status: 'in-progress' as const };
      const result = await stmManager.updateTask('123', updates);

      expect(result).toEqual(mockTask);
      expect(mockTaskManager.update).toHaveBeenCalledWith(123, updates);
    });

    it('should throw STMError for invalid ID format', async () => {
      const updates = { status: 'done' as const };

      await expect(stmManager.updateTask('invalid-id', updates)).rejects.toThrow(STMError);
      await expect(stmManager.updateTask('invalid-id', updates)).rejects.toThrow(
        'Invalid task ID format: invalid-id. Expected a positive numeric ID.'
      );
    });

    it('should throw STMError for negative ID', async () => {
      const updates = { status: 'done' as const };

      await expect(stmManager.updateTask('-1', updates)).rejects.toThrow(STMError);
      await expect(stmManager.updateTask('-1', updates)).rejects.toThrow(
        'Invalid task ID format: -1. Expected a positive numeric ID.'
      );
    });

    it('should throw STMError when task not found', async () => {
      mockTaskManager.update.mockRejectedValue(new NotFoundError('Task not found'));

      const updates = { status: 'done' as const };

      await expect(stmManager.updateTask('999', updates)).rejects.toThrow(STMError);
      await expect(stmManager.updateTask('999', updates)).rejects.toThrow('Task with ID 999 not found');
    });

    it('should throw STMError for other update failures', async () => {
      const originalError = new Error('Validation failed');
      mockTaskManager.update.mockRejectedValue(originalError);

      const updates = { status: 'done' as const };

      await expect(stmManager.updateTask('123', updates)).rejects.toThrow(STMError);
      await expect(stmManager.updateTask('123', updates)).rejects.toThrow('Failed to update STM task with ID: 123');
    });
  });

  describe('markTaskComplete', () => {
    const mockTask: Task = {
      schema: 1,
      id: 123,
      title: 'Completed Task',
      status: 'done',
      created: '2023-01-01T00:00:00.000Z',
      updated: '2023-01-02T00:00:00.000Z',
      tags: ['autoagent'],
      dependencies: [],
      content: 'Task content',
    };

    it('should mark task as complete', async () => {
      mockTaskManager.update.mockResolvedValue(mockTask);

      const result = await stmManager.markTaskComplete('123');

      expect(result).toEqual(mockTask);
      expect(mockTaskManager.update).toHaveBeenCalledWith(123, { status: 'done' });
    });

    it('should handle task not found', async () => {
      mockTaskManager.update.mockRejectedValue(new NotFoundError('Task not found'));

      await expect(stmManager.markTaskComplete('999')).rejects.toThrow(STMError);
      await expect(stmManager.markTaskComplete('999')).rejects.toThrow('Task with ID 999 not found');
    });
  });

  describe('markTaskInProgress', () => {
    const mockTask: Task = {
      schema: 1,
      id: 123,
      title: 'In Progress Task',
      status: 'in-progress',
      created: '2023-01-01T00:00:00.000Z',
      updated: '2023-01-02T00:00:00.000Z',
      tags: ['autoagent'],
      dependencies: [],
      content: 'Task content',
    };

    it('should mark task as in progress', async () => {
      mockTaskManager.update.mockResolvedValue(mockTask);

      const result = await stmManager.markTaskInProgress('123');

      expect(result).toEqual(mockTask);
      expect(mockTaskManager.update).toHaveBeenCalledWith(123, { status: 'in-progress' });
    });

    it('should handle task not found', async () => {
      mockTaskManager.update.mockRejectedValue(new NotFoundError('Task not found'));

      await expect(stmManager.markTaskInProgress('999')).rejects.toThrow(STMError);
      await expect(stmManager.markTaskInProgress('999')).rejects.toThrow('Task with ID 999 not found');
    });
  });

  describe('Error handling edge cases', () => {
    it('should handle non-Error exceptions gracefully', async () => {
      mockTaskManager.get.mockRejectedValue('String error');

      await expect(stmManager.getTask('123')).rejects.toThrow(STMError);
      await expect(stmManager.getTask('123')).rejects.toThrow('Failed to get STM task with ID: 123');
    });

    it('should handle null/undefined exceptions', async () => {
      mockTaskManager.list.mockRejectedValue(null);

      await expect(stmManager.listTasks()).rejects.toThrow(STMError);
      await expect(stmManager.listTasks()).rejects.toThrow('Failed to list STM tasks');
    });

    it('should preserve STMError hierarchy for chained operations', async () => {
      const updates = { status: 'done' as const };
      
      // First call should throw our custom STMError
      await expect(stmManager.updateTask('invalid', updates)).rejects.toThrow(STMError);
      
      // Check that our specific error is preserved
      try {
        await stmManager.updateTask('invalid', updates);
      } catch (error) {
        expect(error).toBeInstanceOf(STMError);
        expect((error as STMError).operation).toBe('update');
        expect((error as STMError).message).toContain('Invalid task ID format');
      }
    });
  });

  describe('updateTaskStatus', () => {
    const mockTask: Task = {
      schema: 1,
      id: 123,
      title: 'Status Updated Task',
      status: 'done',
      created: '2023-01-01T00:00:00.000Z',
      updated: '2023-01-02T00:00:00.000Z',
      tags: ['autoagent'],
      dependencies: [],
      content: 'Task content',
    };

    it('should update task status to pending', async () => {
      const updatedTask = { ...mockTask, status: 'pending' as const };
      mockTaskManager.update.mockResolvedValue(updatedTask);

      const result = await stmManager.updateTaskStatus('123', 'pending');

      expect(result).toEqual(updatedTask);
      expect(mockTaskManager.update).toHaveBeenCalledWith(123, { status: 'pending' });
    });

    it('should update task status to in-progress', async () => {
      const updatedTask = { ...mockTask, status: 'in-progress' as const };
      mockTaskManager.update.mockResolvedValue(updatedTask);

      const result = await stmManager.updateTaskStatus('123', 'in-progress');

      expect(result).toEqual(updatedTask);
      expect(mockTaskManager.update).toHaveBeenCalledWith(123, { status: 'in-progress' });
    });

    it('should update task status to done', async () => {
      mockTaskManager.update.mockResolvedValue(mockTask);

      const result = await stmManager.updateTaskStatus('123', 'done');

      expect(result).toEqual(mockTask);
      expect(mockTaskManager.update).toHaveBeenCalledWith(123, { status: 'done' });
    });

    it('should throw STMError for invalid status', async () => {
      await expect(stmManager.updateTaskStatus('123', 'invalid' as any)).rejects.toThrow(STMError);
      await expect(stmManager.updateTaskStatus('123', 'invalid' as any)).rejects.toThrow(
        'Invalid status: invalid. Valid statuses are: pending, in-progress, done'
      );
    });

    it('should throw STMError when task not found', async () => {
      mockTaskManager.update.mockRejectedValue(new NotFoundError('Task not found'));

      await expect(stmManager.updateTaskStatus('999', 'done')).rejects.toThrow(STMError);
      await expect(stmManager.updateTaskStatus('999', 'done')).rejects.toThrow('Task with ID 999 not found');
    });

    it('should throw STMError for invalid ID format', async () => {
      await expect(stmManager.updateTaskStatus('invalid-id', 'done')).rejects.toThrow(STMError);
      await expect(stmManager.updateTaskStatus('invalid-id', 'done')).rejects.toThrow(
        'Invalid task ID format: invalid-id. Expected a positive numeric ID.'
      );
    });

    it('should handle update failures gracefully', async () => {
      const originalError = new Error('Validation failed');
      mockTaskManager.update.mockRejectedValue(originalError);

      await expect(stmManager.updateTaskStatus('123', 'done')).rejects.toThrow(STMError);
      await expect(stmManager.updateTaskStatus('123', 'done')).rejects.toThrow('Failed to update STM task with ID: 123');
    });
  });

  describe('searchTasks', () => {
    const mockTasks: Task[] = [
      {
        schema: 1,
        id: 1,
        title: 'Implement search feature',
        status: 'pending',
        created: '2023-01-01T00:00:00.000Z',
        updated: '2023-01-01T00:00:00.000Z',
        tags: ['autoagent', 'feature'],
        dependencies: [],
        content: 'Add search functionality to the system',
      },
      {
        schema: 1,
        id: 2,
        title: 'Fix search bug',
        status: 'in-progress',
        created: '2023-01-02T00:00:00.000Z',
        updated: '2023-01-02T00:00:00.000Z',
        tags: ['autoagent', 'bug'],
        dependencies: [],
        content: 'The search is returning wrong results',
      },
    ];

    it('should search tasks with simple pattern', async () => {
      mockTaskManager.list.mockResolvedValue(mockTasks);

      const result = await stmManager.searchTasks('search');

      expect(result).toEqual(mockTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ search: 'search' });
    });

    it('should search tasks with regex pattern', async () => {
      const filteredTasks = [mockTasks[0]];
      mockTaskManager.list.mockResolvedValue(filteredTasks);

      const result = await stmManager.searchTasks('^Implement.*');

      expect(result).toEqual(filteredTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ search: '^Implement.*' });
    });

    it('should search tasks with status filter', async () => {
      const filteredTasks = [mockTasks[1]];
      mockTaskManager.list.mockResolvedValue(filteredTasks);

      const result = await stmManager.searchTasks('search', { status: 'in-progress' });

      expect(result).toEqual(filteredTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ 
        search: 'search', 
        status: 'in-progress' 
      });
    });

    it('should search tasks with tags filter', async () => {
      const filteredTasks = [mockTasks[1]];
      mockTaskManager.list.mockResolvedValue(filteredTasks);

      const result = await stmManager.searchTasks('bug', { tags: ['bug'] });

      expect(result).toEqual(filteredTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ 
        search: 'bug', 
        tags: ['bug'] 
      });
    });

    it('should search tasks with combined filters', async () => {
      const filteredTasks = [];
      mockTaskManager.list.mockResolvedValue(filteredTasks);

      const result = await stmManager.searchTasks('optimization', { 
        status: 'done',
        tags: ['performance', 'optimization']
      });

      expect(result).toEqual(filteredTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ 
        search: 'optimization',
        status: 'done',
        tags: ['performance', 'optimization']
      });
    });

    it('should return empty array when no matches found', async () => {
      mockTaskManager.list.mockResolvedValue([]);

      const result = await stmManager.searchTasks('nonexistent');

      expect(result).toEqual([]);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ search: 'nonexistent' });
    });

    it('should handle search pattern with special characters', async () => {
      mockTaskManager.list.mockResolvedValue(mockTasks);

      const result = await stmManager.searchTasks('fix.*bug');

      expect(result).toEqual(mockTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ search: 'fix.*bug' });
    });

    it('should throw STMError when search fails', async () => {
      const originalError = new Error('Search query failed');
      mockTaskManager.list.mockRejectedValue(originalError);

      await expect(stmManager.searchTasks('test')).rejects.toThrow(STMError);
      await expect(stmManager.searchTasks('test')).rejects.toThrow('Failed to search STM tasks with pattern: test');
    });

    it('should wrap STM TaskManager errors with search context', async () => {
      const originalError = new Error('Query malformed');
      mockTaskManager.list.mockRejectedValue(originalError);

      await expect(stmManager.searchTasks('test')).rejects.toThrow(STMError);
      await expect(stmManager.searchTasks('test')).rejects.toThrow('Failed to search STM tasks with pattern: test');
      
      // Check that the original error is preserved as the cause
      try {
        await stmManager.searchTasks('test');
      } catch (error) {
        expect(error).toBeInstanceOf(STMError);
        expect((error as STMError).cause).toBe(originalError);
        expect((error as STMError).operation).toBe('search');
      }
    });

    it('should handle initialization failure gracefully', async () => {
      MockTaskManager.create.mockRejectedValue(new Error('Initialization failed'));
      const stmManagerWithFailure = new STMManager();

      await expect(stmManagerWithFailure.searchTasks('test')).rejects.toThrow(STMError);
      await expect(stmManagerWithFailure.searchTasks('test')).rejects.toThrow('Failed to initialize STM TaskManager');
    });

    it('should handle ignoreCase option gracefully', async () => {
      // Note: Currently ignoreCase is documented but not implemented
      // STM's native search handles case sensitivity
      mockTaskManager.list.mockResolvedValue(mockTasks);

      const result = await stmManager.searchTasks('SEARCH', { ignoreCase: true });

      expect(result).toEqual(mockTasks);
      expect(mockTaskManager.list).toHaveBeenCalledWith({ search: 'SEARCH' });
    });
  });

  describe('Concurrent Initialization Handling', () => {
    // Tests for concurrent initialization attempts to ensure thread safety
    it('should handle multiple concurrent initialization attempts safely', async () => {
      const freshManager = new STMManager();
      mockTaskManager.get.mockResolvedValue({} as Task);
      mockTaskManager.list.mockResolvedValue([]);

      // Simulate multiple concurrent calls that would trigger initialization
      const promises = [
        freshManager.getTask('1'),
        freshManager.listTasks(),
        freshManager.searchTasks('test'),
        freshManager.updateTaskStatus('2', 'done')
      ];

      // All should succeed and only initialize once
      await Promise.all(promises);

      expect(MockTaskManager.create).toHaveBeenCalledOnce();
      expect(freshManager.isInitialized()).toBe(true);
    });

    it('should prevent race conditions during initialization', async () => {
      const freshManager = new STMManager();
      
      // Mock TaskManager.create to have a delay to simulate real async operation
      let initStarted = false;
      MockTaskManager.create.mockImplementation(async () => {
        if (initStarted) {
          throw new Error('Initialization called multiple times concurrently');
        }
        initStarted = true;
        
        // Simulate some async work
        await new Promise(resolve => setTimeout(resolve, 10));
        return mockTaskManager;
      });

      mockTaskManager.get.mockResolvedValue({} as Task);

      // Start multiple operations at the same time
      const promise1 = freshManager.getTask('123');
      const promise2 = freshManager.getTask('456');
      const promise3 = freshManager.listTasks();

      // All should complete successfully without multiple initializations
      await Promise.all([promise1, promise2, promise3]);

      expect(MockTaskManager.create).toHaveBeenCalledOnce();
    });

    it('should retry initialization after a failed attempt', async () => {
      const freshManager = new STMManager();
      
      // First call fails
      MockTaskManager.create.mockRejectedValueOnce(new Error('First attempt failed'));
      
      await expect(freshManager.getTask('123')).rejects.toThrow(STMError);
      expect(freshManager.isInitialized()).toBe(false);

      // Second call succeeds
      MockTaskManager.create.mockResolvedValueOnce(mockTaskManager);
      mockTaskManager.get.mockResolvedValue({} as Task);
      
      await freshManager.getTask('123');
      
      expect(MockTaskManager.create).toHaveBeenCalledTimes(2);
      expect(freshManager.isInitialized()).toBe(true);
    });
  });

  describe('Content Formatting Edge Cases', () => {
    // Tests for private content formatting methods indirectly through createTask
    const mockCreatedTask: Task = {
      schema: 1,
      id: 1,
      title: 'Content Format Test',
      status: 'pending',
      created: '2023-01-01T00:00:00.000Z',
      updated: '2023-01-01T00:00:00.000Z',
      tags: ['autoagent'],
      dependencies: [],
      content: 'Formatted content',
    };

    beforeEach(() => {
      mockTaskManager.create.mockResolvedValue(mockCreatedTask);
    });

    it('should format content with whitespace and newlines correctly', async () => {
      const taskContent: TaskContent = {
        description: '  Description with   extra spaces  \n\n  ',
        technicalDetails: '\n\nTech details\n\n\n',
        implementationPlan: '  Plan with tabs\t\tand spaces  ',
        acceptanceCriteria: ['  Criteria 1  ', '  Criteria 2  \n']
      };

      await stmManager.createTask('Whitespace Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toContain('## Why & what\n\n  Description with   extra spaces  \n\n  ');
      expect(createCall.content).toContain('- [ ]   Criteria 1  ');
      expect(createCall.content).toContain('- [ ]   Criteria 2  \n');
    });

    it('should handle content sections with only whitespace', async () => {
      const taskContent: TaskContent = {
        description: '   \n\n   ',
        technicalDetails: '\t\t\t',
        implementationPlan: '      ',
        acceptanceCriteria: ['   ', '\n\n']
      };

      await stmManager.createTask('Whitespace Only Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      // Should still generate sections but with whitespace preserved
      expect(createCall.content).toContain('## Why & what\n\n   \n\n   ');
      expect(createCall.content).toContain('### Acceptance Criteria\n\n- [ ]    \n- [ ] \n\n');
    });

    it('should handle mixed empty and non-empty sections correctly', async () => {
      const taskContent: TaskContent = {
        description: 'Valid description',
        technicalDetails: '',
        implementationPlan: 'Valid plan',
        acceptanceCriteria: [],
        testingStrategy: 'Valid testing strategy',
        verificationSteps: ''
      };

      await stmManager.createTask('Mixed Content Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toContain('## Why & what\n\nValid description');
      expect(createCall.content).toContain('## How\n\nValid plan');
      expect(createCall.content).toContain('## Validation\n\n### Testing Strategy\n\nValid testing strategy');
      expect(createCall.content).not.toContain('### Acceptance Criteria');
      expect(createCall.content).not.toContain('### Verification Steps');
    });

    it('should preserve section order and spacing', async () => {
      const taskContent: TaskContent = {
        description: 'Description',
        technicalDetails: 'Tech',
        implementationPlan: 'Plan',
        acceptanceCriteria: ['Criteria'],
        testingStrategy: 'Testing',
        verificationSteps: 'Verification'
      };

      await stmManager.createTask('Section Order Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      const content = createCall.content;
      
      // Verify order: Why & what -> How -> Validation
      const whyIndex = content.indexOf('## Why & what');
      const howIndex = content.indexOf('## How');
      const validationIndex = content.indexOf('## Validation');
      
      expect(whyIndex).toBeLessThan(howIndex);
      expect(howIndex).toBeLessThan(validationIndex);
      
      // Verify proper spacing between sections
      expect(content).toMatch(/## Why & what\n\nDescription\n\n### Acceptance Criteria\n\n- \[ \] Criteria\n\n## How/);
      expect(content).toMatch(/## How\n\nTech\n\n### Implementation Plan\n\nPlan\n\n## Validation/);
    });

    it('should handle complex acceptance criteria formatting', async () => {
      const taskContent: TaskContent = {
        description: 'Test description',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [
          'Simple criteria',
          'Criteria with **bold** text',
          'Criteria with `code` formatting',
          'Multi-line\ncriteria with\nnewlines',
          ''  // Empty criteria
        ]
      };

      await stmManager.createTask('Complex Criteria Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.content).toContain('- [ ] Simple criteria');
      expect(createCall.content).toContain('- [ ] Criteria with **bold** text');
      expect(createCall.content).toContain('- [ ] Criteria with `code` formatting');
      expect(createCall.content).toContain('- [ ] Multi-line\ncriteria with\nnewlines');
      expect(createCall.content).toContain('- [ ] ');  // Empty criteria should still create checkbox
    });
  });

  describe('Tag Handling Tests', () => {
    // Tests for buildTaskTags method through createTask
    const mockCreatedTask: Task = {
      schema: 1,
      id: 1,
      title: 'Tag Test',
      status: 'pending',
      created: '2023-01-01T00:00:00.000Z',
      updated: '2023-01-01T00:00:00.000Z',
      tags: ['autoagent'],
      dependencies: [],
      content: 'Test content',
    };

    beforeEach(() => {
      mockTaskManager.create.mockResolvedValue(mockCreatedTask);
    });

    it('should add autoagent tag when no tags provided', async () => {
      const taskContent: TaskContent = {
        description: 'Test',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: []
      };

      await stmManager.createTask('No Tags Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.tags).toEqual(['autoagent']);
    });

    it('should add autoagent tag when tags array is empty', async () => {
      const taskContent: TaskContent = {
        description: 'Test',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [],
        tags: []
      };

      await stmManager.createTask('Empty Tags Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.tags).toEqual(['autoagent']);
    });

    it('should combine autoagent with custom tags', async () => {
      const taskContent: TaskContent = {
        description: 'Test',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [],
        tags: ['feature', 'urgent', 'backend']
      };

      await stmManager.createTask('Custom Tags Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.tags).toEqual(['autoagent', 'feature', 'urgent', 'backend']);
    });

    it('should handle duplicate autoagent tag gracefully', async () => {
      const taskContent: TaskContent = {
        description: 'Test',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [],
        tags: ['autoagent', 'feature']  // autoagent already included
      };

      await stmManager.createTask('Duplicate Tag Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.tags).toEqual(['autoagent', 'autoagent', 'feature']);  // STMManager doesn't dedupe
    });

    it('should handle special characters in tags', async () => {
      const taskContent: TaskContent = {
        description: 'Test',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [],
        tags: ['bug-fix', 'v2.0', 'high-priority', 'team:backend']
      };

      await stmManager.createTask('Special Char Tags Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.tags).toEqual(['autoagent', 'bug-fix', 'v2.0', 'high-priority', 'team:backend']);
    });

    it('should handle single tag correctly', async () => {
      const taskContent: TaskContent = {
        description: 'Test',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [],
        tags: ['critical']
      };

      await stmManager.createTask('Single Tag Test', taskContent);
      
      const createCall = mockTaskManager.create.mock.calls[0][0] as TaskCreateInput;
      expect(createCall.tags).toEqual(['autoagent', 'critical']);
    });
  });

  describe('Advanced Error Handling', () => {
    // Comprehensive error handling tests for edge cases
    it('should handle STMError with missing cause property', async () => {
      mockTaskManager.get.mockRejectedValue(new Error('Error without cause'));

      try {
        await stmManager.getTask('123');
      } catch (error) {
        expect(error).toBeInstanceOf(STMError);
        expect((error as STMError).operation).toBe('get');
        expect((error as STMError).cause).toBeInstanceOf(Error);
        expect((error as STMError).cause?.message).toBe('Error without cause');
      }
    });

    it('should handle errors with circular references', async () => {
      const circularError: any = new Error('Circular error');
      circularError.self = circularError;  // Create circular reference
      
      mockTaskManager.list.mockRejectedValue(circularError);

      await expect(stmManager.listTasks()).rejects.toThrow(STMError);
      await expect(stmManager.listTasks()).rejects.toThrow('Failed to list STM tasks');
    });

    it('should handle undefined and null error values', async () => {
      mockTaskManager.get.mockRejectedValue(undefined);

      await expect(stmManager.getTask('123')).rejects.toThrow(STMError);
      await expect(stmManager.getTask('123')).rejects.toThrow('Failed to get STM task with ID: 123');
    });

    it('should handle error objects without message property', async () => {
      const errorLikeObject = { name: 'CustomError', code: 500 };
      mockTaskManager.update.mockRejectedValue(errorLikeObject);

      await expect(stmManager.updateTask('123', { status: 'done' })).rejects.toThrow(STMError);
    });

    it('should handle boolean and number error values', async () => {
      mockTaskManager.create.mockRejectedValue(false);
      
      const taskContent: TaskContent = {
        description: 'Test',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: []
      };

      await expect(stmManager.createTask('Boolean Error Test', taskContent)).rejects.toThrow(STMError);
      
      // Test number error
      mockTaskManager.create.mockRejectedValue(404);
      await expect(stmManager.createTask('Number Error Test', taskContent)).rejects.toThrow(STMError);
    });

    it('should preserve error stack traces when available', async () => {
      const originalError = new Error('Original error with stack');
      mockTaskManager.get.mockRejectedValue(originalError);

      try {
        await stmManager.getTask('123');
      } catch (error) {
        expect(error).toBeInstanceOf(STMError);
        expect((error as STMError).cause).toBe(originalError);
        expect((error as STMError).stack).toBeDefined();
      }
    });
  });

  describe('STMError Class', () => {
    // Tests for STMError class behavior
    it('should create STMError with all properties', () => {
      const cause = new Error('Original error');
      const stmError = new STMError('Test message', 'test-operation', cause);

      expect(stmError.message).toBe('Test message');
      expect(stmError.operation).toBe('test-operation');
      expect(stmError.cause).toBe(cause);
      expect(stmError.name).toBe('STMError');
      expect(stmError).toBeInstanceOf(Error);
    });

    it('should create STMError without cause', () => {
      const stmError = new STMError('Test message', 'test-operation');

      expect(stmError.message).toBe('Test message');
      expect(stmError.operation).toBe('test-operation');
      expect(stmError.cause).toBeUndefined();
      expect(stmError.name).toBe('STMError');
    });

    it('should be instanceof Error and STMError', () => {
      const stmError = new STMError('Test', 'test');

      expect(stmError instanceof Error).toBe(true);
      expect(stmError instanceof STMError).toBe(true);
    });
  });

  describe('Reset and State Management', () => {
    // Tests for reset functionality and state management
    it('should reset manager state correctly', () => {
      expect(stmManager.isInitialized()).toBe(false);
      
      stmManager.reset();
      
      expect(stmManager.isInitialized()).toBe(false);
    });

    it('should reset after initialization', async () => {
      mockTaskManager.get.mockResolvedValue({} as Task);
      
      await stmManager.getTask('123');
      expect(stmManager.isInitialized()).toBe(true);
      
      stmManager.reset();
      expect(stmManager.isInitialized()).toBe(false);
    });

    it('should allow reinitialization after reset', async () => {
      mockTaskManager.get.mockResolvedValue({} as Task);
      
      // Initialize
      await stmManager.getTask('123');
      expect(stmManager.isInitialized()).toBe(true);
      
      // Reset
      stmManager.reset();
      expect(stmManager.isInitialized()).toBe(false);
      
      // Reinitialize
      await stmManager.getTask('456');
      expect(stmManager.isInitialized()).toBe(true);
      expect(MockTaskManager.create).toHaveBeenCalledTimes(2);
    });
  });

  describe('Lazy initialization behavior', () => {
    it('should initialize TaskManager only when first method is called', () => {
      const freshManager = new STMManager();
      expect(freshManager.isInitialized()).toBe(false);
      expect(MockTaskManager.create).not.toHaveBeenCalled();
    });

    it('should initialize TaskManager on getTask call', async () => {
      const freshManager = new STMManager();
      mockTaskManager.get.mockResolvedValue({} as Task);

      await freshManager.getTask('123');

      expect(MockTaskManager.create).toHaveBeenCalledOnce();
      expect(freshManager.isInitialized()).toBe(true);
    });

    it('should initialize TaskManager on listTasks call', async () => {
      const freshManager = new STMManager();
      mockTaskManager.list.mockResolvedValue([]);

      await freshManager.listTasks();

      expect(MockTaskManager.create).toHaveBeenCalledOnce();
      expect(freshManager.isInitialized()).toBe(true);
    });

    it('should initialize TaskManager on searchTasks call', async () => {
      const freshManager = new STMManager();
      mockTaskManager.list.mockResolvedValue([]);

      await freshManager.searchTasks('test');

      expect(MockTaskManager.create).toHaveBeenCalledOnce();
      expect(freshManager.isInitialized()).toBe(true);
    });

    it('should initialize TaskManager on updateTaskStatus call', async () => {
      const freshManager = new STMManager();
      const mockTask = { id: 123, status: 'done' } as Task;
      mockTaskManager.update.mockResolvedValue(mockTask);

      await freshManager.updateTaskStatus('123', 'done');

      expect(MockTaskManager.create).toHaveBeenCalledOnce();
      expect(freshManager.isInitialized()).toBe(true);
    });

    it('should not reinitialize on subsequent calls', async () => {
      mockTaskManager.get.mockResolvedValue({} as Task);
      mockTaskManager.list.mockResolvedValue([]);
      mockTaskManager.update.mockResolvedValue({} as Task);

      await stmManager.getTask('123');
      await stmManager.listTasks();
      await stmManager.searchTasks('test');
      await stmManager.updateTaskStatus('123', 'done');

      expect(MockTaskManager.create).toHaveBeenCalledOnce();
    });
  });
});