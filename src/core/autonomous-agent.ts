import { EventEmitter } from 'events';
import * as path from 'path';
import {
  AgentConfig,
  ExecutionResult,
  ProviderName,
  Status,
  Session
} from '../types';
import { ConfigManager } from './config-manager';
import { STMManager } from '../utils/stm-manager';
import { TaskContent } from '../types/stm-types';
import { Provider, createProvider, getFirstAvailableProvider } from '../providers';
import { HookManager } from './hook-manager';
import { SessionManager } from './session-manager';

/**
 * Main autonomous agent class that orchestrates STM task execution
 * with automatic provider failover and progress tracking.
 */
export class AutonomousAgent extends EventEmitter {
  private configManager: ConfigManager;
  private stmManager: STMManager;
  private config: AgentConfig;
  private isExecuting: boolean = false;
  private abortController: AbortController | null = null;
  private hookManager: HookManager | null = null;
  private sessionManager: SessionManager;
  private currentSession: Session | null = null;

  constructor(config?: AgentConfig) {
    super();
    this.config = {
      workspace: process.cwd(),
      provider: undefined,
      includeCoAuthoredBy: true,
      autoUpdateContext: true,
      debug: false,
      dryRun: false,
      enableRollback: false,
      ...config
    };

    this.configManager = new ConfigManager(this.config.workspace);
    // Initialize STM with a dedicated tasks directory to avoid conflicts with other markdown files
    const stmTasksDir = path.join(this.config.workspace ?? process.cwd(), '.autoagent', 'stm-tasks');
    this.stmManager = new STMManager({ tasksDir: stmTasksDir });
    this.sessionManager = new SessionManager();

    // Set up signal handlers for graceful shutdown
    if (!this.config.signal) {
      process.on('SIGINT', () => void this.handleInterrupt());
      process.on('SIGTERM', () => void this.handleInterrupt());
    }
  }

  /**
   * Initialize the agent by loading configuration
   */
  async initialize(): Promise<void> {
    await this.configManager.loadConfig();

    // Initialize hook manager if hooks are configured
    const userConfig = this.configManager.getConfig();
    if (userConfig.hooks) {
      // Create a session for this agent execution
      this.currentSession = this.sessionManager.createSession(
        this.config.workspace ?? process.cwd()
      );
      await this.sessionManager.saveSession(this.currentSession);
      await this.sessionManager.setCurrentSession(this.currentSession.id);

      // Initialize hook manager with session ID
      this.hookManager = new HookManager(
        userConfig.hooks,
        this.currentSession.id,
        this.config.workspace ?? process.cwd()
      );
    }
  }

  /**
   * Execute a single task by ID
   */
  async executeTask(taskId: string): Promise<ExecutionResult> {
    if (this.isExecuting) {
      throw new Error('Agent is already executing a task');
    }

    this.isExecuting = true;
    this.emit('execution-start', taskId);

    const startTime = Date.now();

    try {
      // Get task from STM
      const task = await this.stmManager.getTask(taskId);
      if (!task) {
        throw new Error(`Task ${taskId} not found`);
      }

      // Update session with current task
      if (this.currentSession) {
        this.currentSession.issueNumber = parseInt(taskId.split('-')[0] || '0', 10);
        this.currentSession.issueTitle = task.title;
        this.currentSession.status = 'active';
        await this.sessionManager.saveSession(this.currentSession);
      }

      // Execute PreExecutionStart hook
      if (this.hookManager) {
        const hookResult = await this.hookManager.executeHooks('PreExecutionStart', {
          taskId,
          taskTitle: task.title,
          taskStatus: task.status
        });

        if (hookResult.blocked) {
          throw new Error(`Execution blocked by hook: ${hookResult.reason ?? 'Unknown reason'}`);
        }
      }

      // Get or create provider
      const provider = await this.getProvider();
      if (!provider) {
        throw new Error('No available providers');
      }

      // Build context for the provider
      const context = await this.buildTaskContext(task);

      // Execute the task
      const output = await provider.execute(
        context,
        this.config.workspace ?? process.cwd(),
        this.config.additionalDirectories ?? [],
        this.config.signal
      );

      // Mark task as completed
      await this.stmManager.updateTaskStatus(taskId, 'completed');

      const result: ExecutionResult = {
        success: true,
        taskId,
        taskTitle: task.title,
        duration: Date.now() - startTime,
        output,
        provider: provider.getName() as ProviderName
      };

      // Execute PostExecutionEnd hook
      if (this.hookManager) {
        await this.hookManager.executeHooks('PostExecutionEnd', {
          taskId,
          taskTitle: task.title,
          success: true,
          duration: result.duration
        });
      }

      this.emit('execution-end', result);
      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      const result: ExecutionResult = {
        success: false,
        taskId,
        duration: Date.now() - startTime,
        error: errorMessage
      };

      // Mark task as failed
      try {
        await this.stmManager.updateTaskStatus(taskId, 'pending'); // Reset to pending for retry
      } catch (updateError) {
        // Ignore STM update errors
      }

      // Execute PostExecutionEnd hook
      if (this.hookManager) {
        await this.hookManager.executeHooks('PostExecutionEnd', {
          taskId,
          success: false,
          error: errorMessage,
          duration: result.duration
        });
      }

      this.emit('error', error);
      return result;

    } finally {
      this.isExecuting = false;
      this.abortController = null;

      // Update session status
      if (this.currentSession) {
        this.currentSession.status = 'completed';
        await this.sessionManager.saveSession(this.currentSession);
      }
    }
  }

  /**
   * Create a new task in STM
   */
  async createTask(title: string, content: TaskContent): Promise<string> {
    return this.stmManager.createTask(title, content);
  }

  /**
   * List all tasks
   */
  async listTasks(status?: string): Promise<Array<{ id: string; title: string; status: string }>> {
    // Convert status string to TaskListFilters
    const filters = status ? { status: status as 'pending' | 'in-progress' | 'done' } : undefined;
    const tasks = await this.stmManager.listTasks(filters);
    
    // Convert Task[] to our simplified format
    return tasks.map(task => ({
      id: task.id.toString(),
      title: task.title,
      status: task.status === 'done' ? 'completed' : task.status
    }));
  }

  /**
   * Get task details
   */
  async getTask(taskId: string) {
    return this.stmManager.getTask(taskId);
  }

  /**
   * Update task status
   */
  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    await this.stmManager.updateTaskStatus(taskId, status);
  }

  /**
   * Search tasks
   */
  async searchTasks(query: string): Promise<Array<{ id: string; title: string; status: string }>> {
    const tasks = await this.stmManager.searchTasks(query);
    
    // Convert Task[] to our simplified format
    return tasks.map(task => ({
      id: task.id.toString(),
      title: task.title,
      status: task.status === 'done' ? 'completed' : task.status
    }));
  }

  /**
   * Get current status
   */
  async getStatus(): Promise<Status> {
    const allTasks = await this.stmManager.listTasks();
    const completedTasks = allTasks.filter(task => task.status === 'done');
    const pendingTasks = allTasks.filter(task => task.status === 'pending' || task.status === 'in-progress');

    return {
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: pendingTasks.length,
      currentTaskId: this.isExecuting ? this.currentSession?.issueNumber?.toString() : undefined
    };
  }

  /**
   * Build context string for task execution
   */
  private async buildTaskContext(task: any): Promise<string> {
    const sections = await this.stmManager.getTaskSections(task.id);
    
    let context = `# Task: ${task.title}\n\n`;
    
    if (sections.description) {
      context += `## Description\n${sections.description}\n\n`;
    }
    
    if (sections.details) {
      context += `## Technical Details\n${sections.details}\n\n`;
    }
    
    if (sections.validation) {
      context += `## Validation Criteria\n${sections.validation}\n\n`;
    }

    context += 'Please complete this task. Make all necessary changes to implement the requirements.';
    
    return context;
  }

  /**
   * Get an available provider with failover support
   */
  private async getProvider(): Promise<Provider | null> {
    const userConfig = this.configManager.getConfig();
    
    if (this.config.provider) {
      const provider = createProvider(this.config.provider);
      const isAvailable = await provider.checkAvailability();
      if (isAvailable) {
        return provider;
      }
    }

    // Try configured providers in order
    return getFirstAvailableProvider(userConfig.providers);
  }

  /**
   * Handle graceful shutdown
   */
  private async handleInterrupt(): Promise<void> {
    if (this.abortController) {
      this.abortController.abort();
    }
    
    if (this.currentSession) {
      this.currentSession.status = 'interrupted';
      await this.sessionManager.saveSession(this.currentSession);
    }

    process.exit(0);
  }

  /**
   * Get STM manager instance for direct access
   */
  getSTMManager(): STMManager {
    return this.stmManager;
  }
}