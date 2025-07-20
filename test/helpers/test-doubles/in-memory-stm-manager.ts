/**
 * In-memory test double for STMManager
 * Provides a complete implementation of STMManager interface for testing
 * without file system operations or external dependencies.
 */

import type { 
  Task, 
  TaskUpdateInput, 
  TaskListFilters,
  TaskStatus,
  NotFoundError as STMNotFoundError
} from 'simple-task-master';
import { STMError, type STMManagerConfig } from '../../../src/utils/stm-manager.js';
import type { TaskContent } from '../../../src/types/stm-types.js';

/**
 * Custom NotFoundError for the test double
 */
class TestNotFoundError extends Error implements STMNotFoundError {
  readonly code = 'NOT_FOUND';
  
  constructor(message: string, cause?: Error) {
    super(message);
    this.name = 'NotFoundError';
    this.cause = cause;
  }
}

/**
 * In-memory implementation of STMManager for testing.
 * Simulates all STM behavior without file system access.
 */
export class InMemorySTMManager {
  private tasks: Map<number, Task> = new Map();
  private nextId: number = 1;
  private initialized: boolean = false;
  private initializationError: Error | null = null;
  
  constructor(private config: STMManagerConfig = {}) {}

  /**
   * Simulate initialization (always succeeds unless mocked to fail)
   */
  private ensureInitialized(): void {
    if (this.initializationError) {
      throw new STMError(
        'Failed to initialize STM TaskManager',
        'initialization',
        this.initializationError
      );
    }
    this.initialized = true;
  }

  /**
   * Creates a new STM task from AutoAgent TaskContent.
   */
  async createTask(title: string, content: TaskContent): Promise<string> {
    this.ensureInitialized();

    try {
      // Validate inputs
      if (!title || title.trim() === '') {
        throw new Error('Task title cannot be empty');
      }

      const now = new Date().toISOString();
      const task: Task = {
        schema: 1,
        id: this.nextId++,
        title,
        status: 'pending',
        created: now,
        updated: now,
        tags: this.buildTaskTags(content.tags),
        dependencies: [],
        content: this.formatTaskContent(content)
      };

      this.tasks.set(task.id, task);
      return String(task.id);
    } catch (error) {
      throw new STMError(
        `Failed to create STM task: ${title}`,
        'create',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Retrieves a task by ID.
   */
  async getTask(id: string): Promise<Task | null> {
    this.ensureInitialized();

    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId) || numericId <= 0) {
        return null;
      }
      
      const task = this.tasks.get(numericId);
      return task || null;
    } catch (error) {
      throw new STMError(
        `Failed to get STM task with ID: ${id}`,
        'get',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Lists tasks with optional filtering.
   */
  async listTasks(filters?: TaskListFilters): Promise<Task[]> {
    this.ensureInitialized();

    try {
      let tasks = Array.from(this.tasks.values());

      if (filters) {
        // Filter by status
        if (filters.status) {
          tasks = tasks.filter(task => task.status === filters.status);
        }

        // Filter by tags
        if (filters.tags && filters.tags.length > 0) {
          tasks = tasks.filter(task => 
            filters.tags!.some(tag => task.tags.includes(tag))
          );
        }

        // Search in title and content
        if (filters.search !== undefined && filters.search !== '') {
          const searchPattern = filters.search.toLowerCase();
          tasks = tasks.filter(task => {
            const titleMatch = task.title.toLowerCase().includes(searchPattern);
            const contentMatch = task.content !== undefined && task.content !== null && task.content !== '' ? 
              task.content.toLowerCase().includes(searchPattern) : false;
            return titleMatch || contentMatch;
          });
        }
      }

      // Sort by ID (creation order)
      return tasks.sort((a, b) => a.id - b.id);
    } catch (error) {
      const filtersDescription = filters 
        ? ` with filters: ${JSON.stringify(filters)}`
        : '';
      
      throw new STMError(
        `Failed to list STM tasks${filtersDescription}`,
        'list',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Updates an existing task.
   */
  async updateTask(id: string, updates: TaskUpdateInput): Promise<Task> {
    this.ensureInitialized();

    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId) || numericId <= 0) {
        throw new STMError(
          `Invalid task ID format: ${id}. Expected a positive numeric ID.`,
          'update'
        );
      }
      
      const task = this.tasks.get(numericId);
      if (!task) {
        throw new TestNotFoundError(`Task with ID ${id} not found`);
      }

      // Apply updates
      if (updates.title !== undefined) {
        task.title = updates.title;
      }
      if (updates.status !== undefined) {
        task.status = updates.status;
      }
      if (updates.tags !== undefined) {
        task.tags = updates.tags;
      }
      if (updates.dependencies !== undefined) {
        task.dependencies = updates.dependencies;
      }
      if (updates.content !== undefined) {
        task.content = updates.content;
      }

      task.updated = new Date().toISOString();
      
      return task;
    } catch (error) {
      if (error instanceof STMError) {
        throw error;
      }
      
      if (error instanceof TestNotFoundError) {
        throw new STMError(
          `Task with ID ${id} not found`,
          'update',
          error
        );
      }
      
      throw new STMError(
        `Failed to update STM task with ID: ${id}`,
        'update',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Marks a task as completed.
   */
  async markTaskComplete(id: string): Promise<Task> {
    return this.updateTask(id, { status: 'done' });
  }

  /**
   * Marks a task as in progress.
   */
  async markTaskInProgress(id: string): Promise<Task> {
    return this.updateTask(id, { status: 'in-progress' });
  }

  /**
   * Updates a task's status with validation.
   */
  async updateTaskStatus(id: string, status: string): Promise<Task> {
    let stmStatus: TaskStatus;
    
    if (status === 'completed') {
      stmStatus = 'done';
    } else if (['pending', 'in-progress', 'done'].includes(status)) {
      stmStatus = status as TaskStatus;
    } else {
      throw new STMError(
        `Invalid status: ${status}. Valid statuses are: pending, in-progress, done, completed`,
        'updateStatus'
      );
    }

    return this.updateTask(id, { status: stmStatus });
  }

  /**
   * Searches tasks using pattern matching.
   */
  async searchTasks(
    searchPattern: string,
    options?: {
      ignoreCase?: boolean;
      status?: TaskStatus;
      tags?: string[];
    }
  ): Promise<Task[]> {
    this.ensureInitialized();

    try {
      const filters: TaskListFilters = {
        search: searchPattern
      };

      if (options?.status !== undefined) {
        filters.status = options.status;
      }
      if (options?.tags !== undefined && options.tags.length > 0) {
        filters.tags = options.tags;
      }

      return this.listTasks(filters);
    } catch (error) {
      throw new STMError(
        `Failed to search STM tasks with pattern: ${searchPattern}`,
        'search',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Get task sections parsed from markdown content
   */
  async getTaskSections(taskId: string): Promise<{ description?: string; details?: string; validation?: string }> {
    this.ensureInitialized();
    
    try {
      const numericId = this.parseTaskId(taskId);
      const task = this.tasks.get(numericId);
      
      if (!task) {
        throw new TestNotFoundError(`Task not found: ${taskId}`);
      }
      
      if (task.content === undefined || task.content === null || task.content === '') {
        return {};
      }

      // Parse markdown sections
      const sections: { description?: string; details?: string; validation?: string } = {};
      const lines = task.content.split('\n');
      let currentSection: string | null = null;
      let sectionContent: string[] = [];

      for (const line of lines) {
        if (line.startsWith('## ')) {
          // Save previous section
          if (currentSection !== null && sectionContent.length > 0) {
            const content = sectionContent.join('\n').trim();
            sections[currentSection as keyof typeof sections] = content;
          }

          // Start new section - map STM sections to our sections
          const sectionName = line.substring(3).trim().toLowerCase();
          if (sectionName === 'why & what') {
            currentSection = 'description';
          } else if (sectionName === 'how') {
            currentSection = 'details';
          } else if (sectionName === 'validation') {
            currentSection = 'validation';
          } else {
            currentSection = null;
          }
          sectionContent = [];
        } else if (currentSection !== null) {
          sectionContent.push(line);
        }
      }

      // Save last section
      if (currentSection !== null && sectionContent.length > 0) {
        const content = sectionContent.join('\n').trim();
        sections[currentSection as keyof typeof sections] = content;
      }

      return sections;
    } catch (error) {
      if (error instanceof TestNotFoundError) {
        throw new STMError(`Task not found: ${taskId}`, 'getTaskSections', error);
      }
      throw this.wrapError(error, 'getTaskSections');
    }
  }

  /**
   * Parse task ID string to numeric ID
   */
  parseTaskId(taskId: string): number {
    const id = parseInt(taskId, 10);
    if (isNaN(id)) {
      throw new STMError(`Invalid task ID: ${taskId}`, 'parseTaskId');
    }
    return id;
  }

  /**
   * Wrap generic errors in STMError
   */
  wrapError(error: unknown, operation: string): STMError {
    if (error instanceof STMError) {
      return error;
    }
    return new STMError(
      `STM operation failed: ${error instanceof Error ? error.message : String(error)}`,
      operation,
      error instanceof Error ? error : undefined
    );
  }

  /**
   * Checks if STM is available and initialized.
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Resets the STM manager state.
   */
  reset(): void {
    this.tasks.clear();
    this.nextId = 1;
    this.initialized = false;
    this.initializationError = null;
  }

  /**
   * Test helper: Get all tasks
   */
  getAllTasks(): Task[] {
    return Array.from(this.tasks.values()).sort((a, b) => a.id - b.id);
  }

  /**
   * Test helper: Set initialization to fail
   */
  setInitializationError(error: Error): void {
    this.initializationError = error;
  }

  /**
   * Test helper: Get a task by numeric ID directly
   */
  getTaskById(id: number): Task | undefined {
    return this.tasks.get(id);
  }

  /**
   * Test helper: Set the next ID
   */
  setNextId(id: number): void {
    this.nextId = id;
  }

  /**
   * Formats TaskContent into STM markdown content format.
   */
  private formatTaskContent(content: TaskContent): string {
    const sections: string[] = [];

    // Why & what section
    const descriptionSection = this.formatDescription(content);
    if (descriptionSection) {
      sections.push(descriptionSection);
      sections.push('');
    }

    // How section
    const detailsSection = this.formatDetails(content);
    if (detailsSection) {
      sections.push(detailsSection);
      sections.push('');
    }

    // Validation section
    const validationSection = this.formatValidation(content);
    if (validationSection) {
      sections.push(validationSection);
      sections.push('');
    }

    return sections.join('\n').trim();
  }

  /**
   * Formats description and acceptance criteria.
   */
  private formatDescription(content: TaskContent): string {
    const sections: string[] = [];

    if (content.description !== undefined && content.description !== '') {
      sections.push('## Why & what\n');
      sections.push(content.description);
      
      if (content.acceptanceCriteria !== undefined && content.acceptanceCriteria.length > 0) {
        sections.push('\n### Acceptance Criteria\n');
        content.acceptanceCriteria.forEach(criteria => {
          sections.push(`- [ ] ${criteria}`);
        });
      }
    }

    return sections.join('\n');
  }

  /**
   * Formats technical details and implementation plan.
   */
  private formatDetails(content: TaskContent): string {
    const sections: string[] = [];

    if ((content.technicalDetails !== undefined && content.technicalDetails !== '') || 
        (content.implementationPlan !== undefined && content.implementationPlan !== '')) {
      sections.push('## How\n');
      
      if (content.technicalDetails !== undefined && content.technicalDetails !== '') {
        sections.push(content.technicalDetails);
      }

      if (content.implementationPlan !== undefined && content.implementationPlan !== '') {
        if (content.technicalDetails !== undefined && content.technicalDetails !== '') {
          sections.push('\n### Implementation Plan\n');
        }
        sections.push(content.implementationPlan);
      }
    }

    return sections.join('\n');
  }

  /**
   * Formats testing strategy and verification steps.
   */
  private formatValidation(content: TaskContent): string {
    const sections: string[] = [];
    
    if ((content.testingStrategy !== undefined && content.testingStrategy !== '') || 
        (content.verificationSteps !== undefined && content.verificationSteps !== '')) {
      sections.push('## Validation\n');
      
      if (content.testingStrategy !== undefined && content.testingStrategy !== '') {
        sections.push('### Testing Strategy\n');
        sections.push(content.testingStrategy);
      }

      if (content.verificationSteps !== undefined && content.verificationSteps !== '') {
        if (content.testingStrategy !== undefined && content.testingStrategy !== '') {
          sections.push('\n### Verification Steps\n');
        } else {
          sections.push('### Verification Steps\n');
        }
        sections.push(content.verificationSteps);
      }
    }

    return sections.join('\n');
  }

  /**
   * Builds STM tags from TaskContent tags.
   */
  private buildTaskTags(contentTags?: string[]): string[] {
    const tags = ['autoagent'];
    
    if (contentTags && contentTags.length > 0) {
      tags.push(...contentTags);
    }

    return tags;
  }
}