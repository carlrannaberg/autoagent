/**
 * STM (Simple Task Master) Manager for AutoAgent integration.
 * Provides lazy initialization and error handling for STM task management.
 */

import { TaskManager, type Task, type TaskCreateInput, type TaskUpdateInput, type TaskListFilters, NotFoundError } from 'simple-task-master';
import { TaskContent } from '../types/stm-types.js';

/**
 * Error thrown when STM operations fail.
 */
export class STMError extends Error {
  constructor(
    message: string,
    public readonly operation: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'STMError';
  }
}

/**
 * Configuration options for STMManager.
 */
export interface STMManagerConfig {
  /** Base directory for task storage (defaults to workspace discovery) */
  tasksDir?: string;
  /** Maximum task file size in bytes (default: 1MB) */
  maxTaskSizeBytes?: number;
  /** Maximum task title length (default: 200) */
  maxTitleLength?: number;
  /** Maximum description length (default: 64KB) */
  maxDescriptionLength?: number;
}

/**
 * Manager for STM (Simple Task Master) integration with lazy initialization.
 * Handles task creation, updates, and retrieval with proper error handling.
 */
export class STMManager {
  private taskManager: TaskManager | null = null;
  private initializationPromise: Promise<void> | null = null;
  private readonly config: STMManagerConfig;

  constructor(config: STMManagerConfig = {}) {
    this.config = config;
  }

  /**
   * Ensures TaskManager is initialized before use.
   * Uses lazy initialization pattern to defer STM setup until first use.
   * 
   * @throws {STMError} When TaskManager initialization fails
   */
  private async ensureInitialized(): Promise<void> {
    if (this.taskManager) {
      return;
    }

    // Prevent multiple concurrent initialization attempts
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.initializeTaskManager();
    return this.initializationPromise;
  }

  /**
   * Initializes the TaskManager with proper error handling.
   * 
   * @private
   */
  private async initializeTaskManager(): Promise<void> {
    try {
      this.taskManager = await TaskManager.create(this.config);
    } catch (error) {
      const stmError = new STMError(
        'Failed to initialize STM TaskManager',
        'initialization',
        error instanceof Error ? error : new Error(String(error))
      );
      
      // Reset initialization promise to allow retry
      this.initializationPromise = null;
      
      throw stmError;
    }
  }

  /**
   * Creates a new STM task from AutoAgent TaskContent.
   * 
   * @param title - Task title
   * @param content - Task content structure from AutoAgent
   * @returns Promise resolving to the created task ID as string
   * @throws {STMError} When task creation fails
   */
  async createTask(title: string, content: TaskContent): Promise<string> {
    await this.ensureInitialized();

    try {
      const taskInput: TaskCreateInput = {
        title,
        content: this.formatTaskContent(content),
        tags: this.buildTaskTags(content.tags),
        status: 'pending'
      };

      const task = await this.taskManager!.create(taskInput);
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
   * 
   * @param id - Task ID as string
   * @returns Promise resolving to the Task or null if not found
   * @throws {STMError} When task retrieval fails (but not for "not found" cases)
   */
  async getTask(id: string): Promise<Task | null> {
    await this.ensureInitialized();

    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId) || numericId <= 0) {
        return null;
      }
      
      return await this.taskManager!.get(numericId);
    } catch (error) {
      // Return null for "not found" errors instead of throwing
      if (error instanceof NotFoundError) {
        return null;
      }
      
      // Re-throw all other errors as STMError
      throw new STMError(
        `Failed to get STM task with ID: ${id}`,
        'get',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Lists tasks with optional filtering.
   * 
   * @param filters - Optional filters for task listing
   * @returns Promise resolving to array of Tasks
   * @throws {STMError} When task listing fails
   */
  async listTasks(filters?: TaskListFilters): Promise<Task[]> {
    await this.ensureInitialized();

    try {
      return await this.taskManager!.list(filters);
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
   * 
   * @param id - Task ID as string to update
   * @param updates - Updates to apply
   * @returns Promise resolving to the updated Task
   * @throws {STMError} When task update fails or task not found
   */
  async updateTask(id: string, updates: TaskUpdateInput): Promise<Task> {
    await this.ensureInitialized();

    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId) || numericId <= 0) {
        throw new STMError(
          `Invalid task ID format: ${id}. Expected a positive numeric ID.`,
          'update'
        );
      }
      
      return await this.taskManager!.update(numericId, updates);
    } catch (error) {
      // For STM errors, preserve them but with better context
      if (error instanceof STMError) {
        throw error;
      }
      
      // Convert STM NotFoundError to STMError with clear message
      if (error instanceof NotFoundError) {
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
   * 
   * @param id - Task ID as string to mark as done
   * @returns Promise resolving to the updated Task
   * @throws {STMError} When status update fails
   */
  async markTaskComplete(id: string): Promise<Task> {
    return this.updateTask(id, { status: 'done' });
  }

  /**
   * Marks a task as in progress.
   * 
   * @param id - Task ID as string to mark as in-progress
   * @returns Promise resolving to the updated Task
   * @throws {STMError} When status update fails
   */
  async markTaskInProgress(id: string): Promise<Task> {
    return this.updateTask(id, { status: 'in-progress' });
  }

  /**
   * Updates a task's status with validation.
   * Supports transitions between pending, in-progress, and done states.
   * 
   * @param id - Task ID as string to update
   * @param status - New status to set (pending, in-progress, or done)
   * @returns Promise resolving to the updated Task
   * @throws {STMError} When task update fails or status is invalid
   */
  async updateTaskStatus(id: string, status: string): Promise<Task> {
    // Validate status value and map to STM's status values
    let stmStatus: 'pending' | 'in-progress' | 'done';
    
    if (status === 'completed') {
      stmStatus = 'done';
    } else if (['pending', 'in-progress', 'done'].includes(status)) {
      stmStatus = status as 'pending' | 'in-progress' | 'done';
    } else {
      throw new STMError(
        `Invalid status: ${status}. Valid statuses are: pending, in-progress, done, completed`,
        'updateStatus'
      );
    }

    return this.updateTask(id, { status: stmStatus });
  }

  /**
   * Searches tasks using STM's built-in search capabilities.
   * Supports regex patterns and searches across task titles and content.
   * 
   * @param searchPattern - Search pattern (supports regex)
   * @param options - Optional search configuration
   * @returns Promise resolving to array of matching Tasks
   * @throws {STMError} When search fails
   */
  async searchTasks(
    searchPattern: string,
    options?: {
      /** Case-insensitive search */
      ignoreCase?: boolean;
      /** Filter by status */
      status?: 'pending' | 'in-progress' | 'done';
      /** Filter by tags */
      tags?: string[];
    }
  ): Promise<Task[]> {
    await this.ensureInitialized();

    try {
      // Build search filters
      const filters: TaskListFilters = {
        search: searchPattern
      };

      // Add optional filters
      if (options?.status) {
        filters.status = options.status;
      }
      if (options?.tags) {
        filters.tags = options.tags;
      }

      // Call the underlying TaskManager list method directly to avoid
      // STMError re-wrapping from listTasks
      const results = await this.taskManager!.list(filters);

      // If case-insensitive search is requested and STM doesn't handle it natively,
      // we would need to implement client-side filtering here.
      // For now, we rely on STM's native search capabilities.
      return results;
    } catch (error) {
      throw new STMError(
        `Failed to search STM tasks with pattern: ${searchPattern}`,
        'search',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Checks if STM is available and initialized.
   * 
   * @returns True if TaskManager is initialized and ready
   */
  isInitialized(): boolean {
    return this.taskManager !== null;
  }

  /**
   * Resets the STM manager state.
   * Useful for testing or when reinitializing with different config.
   */
  reset(): void {
    this.taskManager = null;
    this.initializationPromise = null;
  }

  /**
   * Get task sections parsed from markdown content
   * @param taskId - ID of the task
   * @returns Object with parsed sections
   */
  async getTaskSections(taskId: string): Promise<{ description?: string; details?: string; validation?: string }> {
    await this.ensureInitialized();
    
    if (!this.taskManager) {
      throw new STMError('Task manager not initialized', 'getTaskSections');
    }

    try {
      const numericId = this.parseTaskId(taskId);
      const task = await this.taskManager.get(numericId);
      
      if (!task.content) {
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
          if (currentSection && sectionContent.length > 0) {
            const content = sectionContent.join('\n').trim();
            sections[currentSection as keyof typeof sections] = content;
          }

          // Start new section
          const sectionName = line.substring(3).toLowerCase();
          if (['description', 'details', 'validation'].includes(sectionName)) {
            currentSection = sectionName;
            sectionContent = [];
          } else {
            currentSection = null;
          }
        } else if (currentSection) {
          sectionContent.push(line);
        }
      }

      // Save last section
      if (currentSection && sectionContent.length > 0) {
        const content = sectionContent.join('\n').trim();
        sections[currentSection as keyof typeof sections] = content;
      }

      return sections;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new STMError(`Task not found: ${taskId}`, 'getTaskSections', error);
      }
      throw this.wrapError(error, 'getTaskSections');
    }
  }

  /**
   * Parse task ID string to numeric ID
   * @private
   */
  private parseTaskId(taskId: string): number {
    const id = parseInt(taskId, 10);
    if (isNaN(id)) {
      throw new STMError(`Invalid task ID: ${taskId}`, 'parseTaskId');
    }
    return id;
  }

  /**
   * Wrap generic errors in STMError
   * @private
   */
  private wrapError(error: unknown, operation: string): STMError {
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
   * Formats TaskContent into STM markdown content format using STM's actual section definitions.
   * 
   * @private
   */
  private formatTaskContent(content: TaskContent): string {
    const sections: string[] = [];

    // Why & what section (maps description + acceptance criteria)
    const descriptionSection = this.formatDescription(content);
    if (descriptionSection) {
      sections.push(descriptionSection);
      sections.push('');
    }

    // How section (maps technical details + implementation plan)
    const detailsSection = this.formatDetails(content);
    if (detailsSection) {
      sections.push(detailsSection);
      sections.push('');
    }

    // Validation section (maps testing strategy + verification steps)
    const validationSection = this.formatValidation(content);
    if (validationSection) {
      sections.push(validationSection);
      sections.push('');
    }

    return sections.join('\n').trim();
  }

  /**
   * Formats description and acceptance criteria into STM's "Why & what" section.
   * 
   * @private
   */
  private formatDescription(content: TaskContent): string {
    const sections: string[] = [];

    if (content.description) {
      sections.push('## Why & what\n');
      sections.push(content.description);
      
      // Add acceptance criteria as part of the description
      if (content.acceptanceCriteria && content.acceptanceCriteria.length > 0) {
        sections.push('\n### Acceptance Criteria\n');
        content.acceptanceCriteria.forEach(criteria => {
          sections.push(`- [ ] ${criteria}`);
        });
      }
    }

    return sections.join('\n');
  }

  /**
   * Formats technical details and implementation plan into STM's "How" section.
   * 
   * @private
   */
  private formatDetails(content: TaskContent): string {
    const sections: string[] = [];

    if (content.technicalDetails || content.implementationPlan) {
      sections.push('## How\n');
      
      if (content.technicalDetails) {
        sections.push(content.technicalDetails);
      }

      if (content.implementationPlan) {
        if (content.technicalDetails) {
          sections.push('\n### Implementation Plan\n');
        }
        sections.push(content.implementationPlan);
      }
    }

    return sections.join('\n');
  }

  /**
   * Formats testing strategy and verification steps into STM's "Validation" section.
   * 
   * @private
   */
  private formatValidation(content: TaskContent): string {
    const sections: string[] = [];
    
    if (content.testingStrategy || content.verificationSteps) {
      sections.push('## Validation\n');
      
      if (content.testingStrategy) {
        sections.push('### Testing Strategy\n');
        sections.push(content.testingStrategy);
      }

      if (content.verificationSteps) {
        if (content.testingStrategy) {
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
   * 
   * @private
   */
  private buildTaskTags(contentTags?: string[]): string[] {
    const tags = ['autoagent'];
    
    if (contentTags && contentTags.length > 0) {
      tags.push(...contentTags);
    }

    return tags;
  }
}