import { EventEmitter } from 'events';
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import { 
  AgentConfig, 
  ExecutionResult, 
  Issue, 
  ProviderName,
  Status
} from '../types';
import { ConfigManager } from './config-manager';
import { FileManager } from '../utils/file-manager';
import { Provider, createProvider, getFirstAvailableProvider } from '../providers';

const execAsync = promisify(exec);

/**
 * Main autonomous agent class that orchestrates issue execution
 * with automatic provider failover and progress tracking.
 */
export class AutonomousAgent extends EventEmitter {
  private configManager: ConfigManager;
  private fileManager: FileManager;
  private config: AgentConfig;
  private isExecuting: boolean = false;
  private abortController: AbortController | null = null;

  constructor(config?: AgentConfig) {
    super();
    this.config = {
      workspace: process.cwd(),
      provider: undefined,
      autoCommit: false,
      includeCoAuthoredBy: true,
      autoUpdateContext: true,
      debug: false,
      dryRun: false,
      enableRollback: false,
      ...config
    };

    this.configManager = new ConfigManager(this.config.workspace);
    this.fileManager = new FileManager(this.config.workspace);

    // Set up signal handlers for graceful shutdown
    if (!this.config.signal) {
      process.on('SIGINT', () => this.handleInterrupt());
      process.on('SIGTERM', () => this.handleInterrupt());
    }
  }

  /**
   * Initialize the agent by loading configuration
   */
  async initialize(): Promise<void> {
    await this.configManager.loadConfig();
    await this.fileManager.createProviderInstructionsIfMissing();
  }

  /**
   * Execute a single issue by number
   */
  async executeIssue(issueNumber: number): Promise<ExecutionResult> {
    if (this.isExecuting) {
      throw new Error('Agent is already executing a task');
    }

    this.isExecuting = true;
    this.emit('execution-start', issueNumber);

    try {
      // Load issue and plan files
      const issueFile = await this.findIssueFile(issueNumber);
      const planFile = await this.findPlanFile(issueNumber);

      if (issueFile === null) {
        throw new Error(`Issue #${issueNumber} not found`);
      }

      if (planFile === null) {
        throw new Error(`Plan for issue #${issueNumber} not found`);
      }

      const issue = await this.fileManager.readIssue(issueFile);
      const plan = await this.fileManager.readPlan(planFile);

      if (!issue || !plan) {
        throw new Error('Failed to read issue or plan files');
      }

      // Report initial progress
      this.reportProgress('Starting execution...', 0);

      // Get available provider with failover
      const provider = await this.getAvailableProvider();
      if (!provider) {
        throw new Error('No available providers found');
      }


      // Prepare context files
      const contextFiles = await this.prepareContextFiles(provider.name as ProviderName);

      // Execute with provider
      const result = await this.executeWithProvider(
        provider,
        issueFile,
        planFile,
        contextFiles,
        issueNumber
      );

      // Handle post-execution tasks
      if (result.success && this.config.dryRun !== true) {
        await this.handlePostExecution(issue, result);
      }

      this.emit('execution-end', result);
      return result;

    } catch (error) {
      const errorResult: ExecutionResult = {
        success: false,
        issueNumber,
        duration: 0,
        error: error instanceof Error ? error.message : String(error)
      };
      
      this.emit('error', error);
      this.emit('execution-end', errorResult);
      
      return errorResult;
    } finally {
      this.isExecuting = false;
    }
  }

  /**
   * Execute all pending issues
   */
  async executeAll(): Promise<ExecutionResult[]> {
    const results: ExecutionResult[] = [];
    const todos = await this.fileManager.readTodoList();
    const pendingTodos = todos.filter(todo => !todo.includes('[x]'));

    for (let i = 0; i < pendingTodos.length; i++) {
      const todo = pendingTodos[i];
      if (todo === undefined || todo === '') {
        continue;
      }
      
      const match = todo.match(/Issue #(\d+)/);
      
      if (match !== null && match[1] !== undefined) {
        const issueNumber = parseInt(match[1], 10);
        
        // Report overall progress
        const percentage = Math.round((i / pendingTodos.length) * 100);
        this.reportProgress(`Processing issue #${issueNumber}`, percentage);

        const result = await this.executeIssue(issueNumber);
        results.push(result);

        // Stop on failure unless configured otherwise
        if (!result.success && this.config.debug !== true) {
          break;
        }

        // Check for cancellation
        if (this.config.signal?.aborted === true) {
          break;
        }
      }
    }

    return results;
  }

  /**
   * Get the current status of the agent
   */
  async getStatus(): Promise<Status> {
    const todos = await this.fileManager.readTodoList();
    const completedTodos = todos.filter(todo => todo.includes('[x]'));
    const pendingTodos = todos.filter(todo => !todo.includes('[x]'));

    const userConfig = this.configManager.getConfig();
    const availableProviders = await this.configManager.getAvailableProviders();
    const rateLimitedProviders = userConfig.providers.filter(
      p => !availableProviders.includes(p)
    );

    return {
      totalIssues: todos.length,
      completedIssues: completedTodos.length,
      pendingIssues: pendingTodos.length,
      availableProviders: availableProviders as string[],
      rateLimitedProviders: rateLimitedProviders as string[]
    };
  }

  /**
   * Get an available provider with failover logic
   */
  private async getAvailableProvider(): Promise<Provider | null> {
    // Check if specific provider is requested
    if (this.config.provider) {
      const provider = createProvider(this.config.provider);
      const isRateLimited = await this.configManager.isProviderRateLimited(this.config.provider);
      
      if (isRateLimited === false && await provider.checkAvailability()) {
        return provider;
      }
    }

    // Use failover logic
    const availableProviders = await this.configManager.getAvailableProviders();
    const provider = await getFirstAvailableProvider(availableProviders);

    if (provider === null) {
      // All providers are rate limited
      this.reportProgress('All providers are rate limited. Waiting for cooldown...', 0);
      
      // Find the provider with the shortest remaining cooldown
      let shortestCooldown = Infinity;
      let nextProvider: ProviderName | null = null;

      for (const providerName of ['claude', 'gemini'] as ProviderName[]) {
        const status = await this.configManager.checkRateLimit(providerName);
        if (status.timeRemaining !== undefined && status.timeRemaining < shortestCooldown) {
          shortestCooldown = status.timeRemaining;
          nextProvider = providerName;
        }
      }

      if (nextProvider && shortestCooldown < Infinity) {
        const minutes = Math.ceil(shortestCooldown / 60000);
        throw new Error(`All providers rate limited. Next available: ${nextProvider} in ${minutes} minutes`);
      }
    }

    return provider;
  }

  /**
   * Execute with a specific provider, handling retries and failover
   */
  private async executeWithProvider(
    provider: Provider,
    issueFile: string,
    planFile: string,
    contextFiles: string[],
    issueNumber: number
  ): Promise<ExecutionResult> {
    const userConfig = this.configManager.getConfig();
    let lastError: Error | null = null;

    // Try execution with retry logic
    for (let attempt = 1; attempt <= userConfig.retryAttempts; attempt++) {
      try {
        this.reportProgress(`Executing with ${provider.name} (attempt ${attempt}/${userConfig.retryAttempts})`, 20);

        if (this.config.dryRun === true) {
          // Dry run mode - just preview
          return {
            success: true,
            issueNumber,
            duration: 0,
            output: 'Dry run - no changes made',
            provider: provider.name as ProviderName
          };
        }

        // Create abort signal for this execution
        this.abortController = new AbortController();
        const signal = this.config.signal || this.abortController.signal;

        const result = await provider.execute(issueFile, planFile, contextFiles, signal);

        // Check for rate limiting
        if (result.error !== undefined && result.error.toLowerCase().includes('rate limit')) {
          await this.configManager.updateRateLimit(provider.name as ProviderName, true);
          
          // Try failover if available
          const alternativeProvider = await this.tryFailover(provider.name as ProviderName);
          if (alternativeProvider) {
            this.reportProgress(`Switching to ${alternativeProvider.name} due to rate limit`, 15);
            return this.executeWithProvider(
              alternativeProvider,
              issueFile,
              planFile,
              contextFiles,
              issueNumber
            );
          }
        }

        return result;

      } catch (error) {
        lastError = error as Error;
        
        // Exponential backoff
        if (attempt < userConfig.retryAttempts) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
          this.reportProgress(`Retrying in ${delay}ms...`, 20);
          await this.delay(delay);
        }
      }
    }

    throw lastError || new Error('Execution failed after all retry attempts');
  }

  /**
   * Try to failover to an alternative provider
   */
  private async tryFailover(currentProvider: ProviderName): Promise<Provider | null> {
    const userConfig = this.configManager.getConfig();
    const availableProviders = await this.configManager.getAvailableProviders();
    
    // Find next available provider
    const alternativeProviders = availableProviders.filter(p => p !== currentProvider);
    
    if (alternativeProviders.length > 0) {
      // Wait for failover delay
      await this.delay(userConfig.failoverDelay);
      
      const provider = await getFirstAvailableProvider(alternativeProviders);
      return provider;
    }

    return null;
  }

  /**
   * Handle post-execution tasks
   */
  private async handlePostExecution(issue: Issue, result: ExecutionResult): Promise<void> {
    // Update todo list
    const todos = await this.fileManager.readTodoList();
    const updatedTodos = todos.map(todo => {
      if (todo.includes(`Issue #${issue.number}`)) {
        return todo.replace('[ ]', '[x]');
      }
      return todo;
    });
    await this.fileManager.updateTodoList(updatedTodos);

    // Update provider instructions if configured
    if (this.config.autoUpdateContext === true && result.provider !== undefined) {
      await this.updateProviderInstructions(result);
    }

    // Git auto-commit if configured
    if (this.config.autoCommit === true) {
      await this.performGitCommit(issue, result);
    }

    this.reportProgress('Execution completed successfully', 100);
  }

  /**
   * Update provider instruction files with execution history
   */
  private async updateProviderInstructions(result: ExecutionResult): Promise<void> {
    if (!result.provider) {
      return;
    }

    const providerFile = result.provider.toUpperCase() as 'CLAUDE' | 'GEMINI';
    const content = await this.fileManager.readProviderInstructions(providerFile);
    
    const date = new Date().toISOString().split('T')[0];
    const updateMessage = `\n## Execution History\n- **${date}**: Successfully completed Issue #${result.issueNumber}`;
    
    if (content.includes('## Execution History') === false) {
      await this.fileManager.updateProviderInstructions(providerFile, content + updateMessage);
    } else {
      // Insert after the execution history header
      const updatedContent = content.replace(
        '## Execution History',
        `## Execution History\n- **${date}**: Successfully completed Issue #${result.issueNumber}`
      );
      await this.fileManager.updateProviderInstructions(providerFile, updatedContent);
    }
  }

  /**
   * Perform git commit for completed issue
   */
  private async performGitCommit(issue: Issue, result: ExecutionResult): Promise<void> {
    try {
      // Check if there are changes to commit
      const { stdout: statusOutput } = await execAsync('git status --porcelain', {
        cwd: this.config.workspace
      });

      if (statusOutput.trim() === '') {
        return; // No changes to commit
      }

      // Stage all changes
      await execAsync('git add -A', { cwd: this.config.workspace });

      // Create commit message
      let commitMessage = `feat: Complete issue from issues/${issue.number}-${issue.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
      
      if (this.config.includeCoAuthoredBy === true && result.provider !== undefined) {
        commitMessage += `\n\nCo-authored-by: ${result.provider} <${result.provider}@autoagent>`;
      }

      // Commit changes
      await execAsync(`git commit -m "${commitMessage}"`, {
        cwd: this.config.workspace
      });

      this.reportProgress('Changes committed to git', 95);
    } catch (error) {
      // Log error but don't fail the execution
      if (this.config.debug === true) {
        console.error(chalk.yellow('Git commit failed:'), error); // eslint-disable-line no-console
      }
    }
  }

  /**
   * Prepare context files for provider execution
   */
  private async prepareContextFiles(provider: ProviderName): Promise<string[]> {
    const contextFiles: string[] = [];
    
    // Add provider instruction file
    const providerFile = provider.toUpperCase() as 'CLAUDE' | 'GEMINI';
    const instructionPath = `${this.config.workspace}/${providerFile}.md`;
    
    try {
      await this.fileManager.readProviderInstructions(providerFile);
      contextFiles.push(instructionPath);
    } catch {
      // Instruction file doesn't exist, skip it
    }

    return contextFiles;
  }

  /**
   * Find issue file by number
   */
  private async findIssueFile(issueNumber: number): Promise<string | null> {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const issuesDir = path.join(this.config.workspace ?? process.cwd(), 'issues');
    
    try {
      const files = await fs.readdir(issuesDir);
      const issueFile = files.find(f => f.startsWith(`${issueNumber}-`) && f.endsWith('.md'));
      
      if (issueFile !== undefined) {
        return path.join(issuesDir, issueFile);
      }
    } catch {
      // Directory doesn't exist
    }

    return null;
  }

  /**
   * Find plan file by issue number
   */
  private async findPlanFile(issueNumber: number): Promise<string | null> {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const plansDir = path.join(this.config.workspace ?? process.cwd(), 'plans');
    
    try {
      const files = await fs.readdir(plansDir);
      const planFile = files.find(f => f.startsWith(`${issueNumber}-`) && f.endsWith('.md'));
      
      if (planFile !== undefined) {
        return path.join(plansDir, planFile);
      }
    } catch {
      // Directory doesn't exist
    }

    return null;
  }

  /**
   * Report progress to callback if provided
   */
  private reportProgress(message: string, percentage?: number): void {
    if (this.config.onProgress !== undefined) {
      this.config.onProgress(message, percentage);
    }

    if (this.config.debug === true) {
      const progress = percentage !== undefined ? `[${percentage}%] ` : '';
      console.log(chalk.gray(`${progress}${message}`)); // eslint-disable-line no-console
    }
  }

  /**
   * Handle interrupt signal
   */
  private handleInterrupt(): void {
    if (this.isExecuting) {
      console.log(chalk.yellow('\nInterrupting execution...')); // eslint-disable-line no-console
      this.abortController?.abort();
    }
    process.exit(0);
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}