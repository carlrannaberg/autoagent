import { EventEmitter } from 'events';
import { exec } from 'child_process';
import { promisify } from 'util';
import {
  AgentConfig,
  ExecutionResult,
  Issue,
  ProviderName,
  Status,
  RollbackData
} from '../types';
import { ConfigManager } from './config-manager';
import { FileManager } from '../utils/file-manager';
import { Provider, createProvider, getFirstAvailableProvider } from '../providers';
import { ProviderLearning } from './provider-learning';
import {
  checkGitAvailable,
  isGitRepository,
  stageAllChanges,
  createCommit,
  getCurrentCommitHash,
  getUncommittedChanges,
  hasChangesToCommit,
  revertToCommit
} from '../utils/git';

const execAsync = promisify(exec);

/**
 * Main autonomous agent class that orchestrates issue execution
 * with automatic provider failover and progress tracking.
 */
export class AutonomousAgent extends EventEmitter {
  private configManager: ConfigManager;
  private fileManager: FileManager;
  private providerLearning: ProviderLearning;
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
    this.providerLearning = new ProviderLearning(this.fileManager, this.config.workspace);

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

      // Capture pre-execution state if rollback is enabled
      let rollbackData;
      if (this.config.enableRollback === true) {
        rollbackData = await this.capturePreExecutionState();
      }

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

      // Add rollback data to result
      if (rollbackData) {
        result.rollbackData = rollbackData;
      }

      // Add issue title to result
      result.issueTitle = issue.title;

      // Capture file changes if not in dry run
      if (this.config.dryRun !== true && result.success) {
        result.filesModified = await this.captureFileChanges();
      }

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

    // Keep checking for new tasks until no more pending tasks exist
    let hasMoreTasks = true;
    while (hasMoreTasks) {
      // Reload the todo list to check for new tasks
      const todos = await this.fileManager.readTodoList();
      const pendingTodos = todos.filter(todo => !todo.includes('[x]'));

      // If no pending todos, we're done
      if (pendingTodos.length === 0) {
        hasMoreTasks = false;
        break;
      }

      // Find the next unprocessed todo
      let foundNextTodo = false;
      
      for (const todo of pendingTodos) {
        if (todo === undefined || todo === '') {
          continue;
        }

        const match = todo.match(/Issue #(\d+)/);

        if (match !== null && match[1] !== undefined) {
          const issueNumber = parseInt(match[1], 10);

          // Check if we've already processed this issue
          const alreadyProcessed = results.some(r => r.issueNumber === issueNumber);
          if (alreadyProcessed) {
            continue;
          }

          foundNextTodo = true;

          // Report overall progress based on what we've processed so far
          this.reportProgress(`Processing issue #${issueNumber}`, 0);

          const result = await this.executeIssue(issueNumber);
          results.push(result);

          // Stop on failure unless configured otherwise
          if (!result.success && this.config.debug !== true) {
            return results;
          }

          // Check for cancellation
          if (this.config.signal?.aborted === true) {
            return results;
          }

          // After processing one issue, break to reload the todo list
          // This ensures we pick up any new tasks created during execution
          break;
        }
      }

      // If we didn't find any new todos to process, we're done
      if (!foundNextTodo) {
        hasMoreTasks = false;
      }
    }

    return results;
  }

  /**
   * Execute the next pending issue
   */
  async executeNext(): Promise<ExecutionResult> {
    const nextIssue = await this.fileManager.getNextIssue();

    if (!nextIssue) {
      return {
        success: false,
        issueNumber: 0,
        duration: 0,
        error: 'No pending issues to execute'
      };
    }

    return this.executeIssue(nextIssue.number);
  }

  /**
   * Rollback changes from a previous execution
   */
  async rollback(executionResult: ExecutionResult): Promise<boolean> {
    if (!executionResult.rollbackData) {
      this.reportProgress('No rollback data available', 0);
      return false;
    }

    try {
      const { gitCommit, fileBackups } = executionResult.rollbackData;

      // If we have a git commit, revert to it
      if (gitCommit !== undefined && gitCommit !== '') {
        const success = await revertToCommit(gitCommit);
        if (success) {
          this.reportProgress(`Reverted to commit ${gitCommit}`, 100);
          return true;
        }
      }

      // Otherwise try to restore file backups
      if (fileBackups && fileBackups.size > 0) {
        // Handle uncommitted changes
        if (fileBackups.has('__git_uncommitted_changes__')) {
          const patch = fileBackups.get('__git_uncommitted_changes__');
          if (patch !== undefined && patch !== '') {
            // Apply the patch using git apply
            const fs = await import('fs/promises');
            const patchFile = `/tmp/rollback-${Date.now()}.patch`;
            await fs.writeFile(patchFile, patch);

            try {
              await execAsync(`git apply ${patchFile}`);
              await fs.unlink(patchFile);
              this.reportProgress('Restored uncommitted changes', 100);
              return true;
            } catch (error) {
              await fs.unlink(patchFile);
              throw error;
            }
          }
        }
      }

      this.reportProgress('Rollback failed: insufficient rollback data', 0);
      return false;
    } catch (error) {
      this.reportProgress(`Rollback failed: ${String(error)}`, 0);
      return false;
    }
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

      const userConfig = this.configManager.getConfig();
      for (const providerName of userConfig.providers) {
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
   * Update provider instruction files with execution history and learnings
   */
  private async updateProviderInstructions(result: ExecutionResult): Promise<void> {
    // Use the comprehensive provider learning system
    await this.providerLearning.updateProviderLearnings(result);
  }

  /**
   * Perform git commit for completed issue
   */
  private async performGitCommit(issue: Issue, result: ExecutionResult): Promise<void> {
    try {
      // Check if git is available and we're in a repo
      const gitAvailable = await checkGitAvailable();
      const isRepo = await isGitRepository();

      if (gitAvailable !== true || isRepo !== true) {
        if (this.config.debug === true) {
          this.reportProgress('Git not available or not in a repository', 0);
        }
        return;
      }

      // Check if there are changes to commit
      const hasChanges = await hasChangesToCommit();
      if (!hasChanges) {
        return; // No changes to commit
      }

      // Stage all changes
      await stageAllChanges();

      // Create commit message
      const issueName = `${issue.number}-${issue.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
      const commitMessage = `feat: Complete issue from issues/${issueName}.md`;

      // Create commit with optional co-authorship
      const commitResult = await createCommit({
        message: commitMessage,
        coAuthor: (this.config.includeCoAuthoredBy === true && result.provider !== undefined) ? {
          name: result.provider.charAt(0).toUpperCase() + result.provider.slice(1),
          email: `${result.provider}@autoagent-cli`
        } : undefined
      });

      if (commitResult.success) {
        this.reportProgress('Changes committed to git', 95);

        // Store commit hash in result for potential rollback
        if (commitResult.commitHash !== undefined && commitResult.commitHash !== '' && result.rollbackData !== undefined) {
          result.rollbackData.gitCommit = commitResult.commitHash;
        }
      } else if (this.config.debug === true) {
        this.reportProgress(`Git commit failed: ${commitResult.error ?? 'Unknown error'}`, 0);
      }
    } catch (error) {
      // Log error but don't fail the execution
      if (this.config.debug === true) {
        this.reportProgress(`Git commit error: ${error instanceof Error ? error.message : String(error)}`, 0);
      }
    }
  }

  /**
   * Prepare context files for provider execution
   */
  private async prepareContextFiles(provider: ProviderName): Promise<string[]> {
    const contextFiles: string[] = [];

    // Add common agent instructions file
    const agentInstructionsPath = `${this.config.workspace}/AGENT.md`;
    try {
      await this.fileManager.readFile(agentInstructionsPath);
      contextFiles.push(agentInstructionsPath);
    } catch {
      // Agent instructions file doesn't exist, skip it
    }

    // Add provider-specific instruction file
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
      this.emit('debug', `${progress}${message}`);
    }
  }

  /**
   * Capture files that were modified during execution
   */
  private async captureFileChanges(): Promise<string[]> {
    try {
      const { getChangedFiles } = await import('../utils/git');
      return await getChangedFiles();
    } catch {
      // If git is not available, return empty array
      return [];
    }
  }

  /**
   * Handle interrupt signal
   */
  private handleInterrupt(): void {
    if (this.isExecuting) {
      this.emit('interrupt', 'Interrupting execution...');
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

  /**
   * Create a new issue
   */
  async createIssue(title: string, description?: string, acceptanceCriteria?: string[], details?: string): Promise<number> {
    // Get next issue number
    const nextNumber = await this.fileManager.getNextIssueNumber();
    
    let issueContent: string;
    
    // If we have explicit content, use it directly
    if (description !== undefined || acceptanceCriteria !== undefined || details !== undefined) {
      issueContent = `# Issue ${nextNumber}: ${title}

## Description
${description ?? 'To be defined'}

## Acceptance Criteria
${acceptanceCriteria !== undefined && acceptanceCriteria.length > 0 ? acceptanceCriteria.map(ac => `- [ ] ${ac}`).join('\n') : '- [ ] To be defined'}

## Technical Details
${details ?? 'To be defined'}`;
    } else {
      // Otherwise try to use a provider to generate content
      const provider = await this.getProviderForOperation();
      if (!provider) {
        // If no provider is available, create a basic issue
        issueContent = `# Issue ${nextNumber}: ${title}

## Description
To be defined

## Acceptance Criteria
- [ ] To be defined

## Technical Details
To be defined`;
      } else {
        // Create prompt for provider
        const prompt = `Create a detailed software development issue for the following task:
Title: ${title}

Generate a comprehensive issue document with:
1. Clear requirements
2. Specific acceptance criteria
3. Technical details and considerations
4. Resources needed

Format as a proper issue document.`;

        // Execute with provider
        const result = await provider.execute(prompt, '');
        issueContent = `# Issue ${nextNumber}: ${title}

${result.output ?? 'Success'}`;
      }
    }

    await this.fileManager.createIssue(nextNumber, title, issueContent);

    // Update todo list
    const todoContent = await this.fileManager.readTodo();
    const updatedTodo = todoContent.replace(
      '## Pending Issues',
      `## Pending Issues\n- [ ] **[Issue #${nextNumber}]** ${title} - \`issues/${nextNumber}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md\``
    );
    await this.fileManager.updateTodo(updatedTodo);

    return nextNumber;
  }

  /**
   * Get current status
   */
  async getStatus(): Promise<Status> {
    const config = await this.configManager.loadConfig();
    const stats = await this.fileManager.getTodoStats();
    const nextIssue = await this.fileManager.getNextIssue();

    // Check provider availability
    const availableProviders: ProviderName[] = [];
    const rateLimitedProviders: ProviderName[] = [];

    for (const providerName of config.providers) {
      const isRateLimited = await this.configManager.isProviderRateLimited(providerName);
      if (isRateLimited === true) {
        rateLimitedProviders.push(providerName);
      } else {
        const provider = createProvider(providerName);
        if (await provider.checkAvailability()) {
          availableProviders.push(providerName);
        }
      }
    }

    return {
      totalIssues: stats.total,
      completedIssues: stats.completed,
      pendingIssues: stats.pending,
      currentIssue: nextIssue,
      availableProviders,
      rateLimitedProviders
    };
  }

  /**
   * Bootstrap from master plan
   */
  async bootstrap(masterPlanPath: string): Promise<void> {
    const provider = await this.getProviderForOperation();
    if (!provider) {
      throw new Error('No available providers for bootstrap');
    }

    // Read master plan
    const fs = await import('fs/promises');
    const path = await import('path');

    const fullPath = path.isAbsolute(masterPlanPath)
      ? masterPlanPath
      : path.join(this.config.workspace ?? process.cwd(), masterPlanPath);

    let masterPlanContent: string;
    try {
      masterPlanContent = await fs.readFile(fullPath, 'utf-8');
    } catch (error) {
      throw new Error(`Could not read master plan: ${masterPlanPath}`);
    }

    // Read templates
    const templateDir = path.join(this.config.workspace ?? process.cwd(), 'templates');
    const issueTemplate = await this.fileManager.readFile(path.join(templateDir, 'issue.md'));
    const planTemplate = await this.fileManager.readFile(path.join(templateDir, 'plan.md'));

    // Create prompt for bootstrapping
    const prompt = `You are an expert project manager. Decompose the following master plan into individual, actionable issues.
Each issue should be self-contained and independently executable.

IMPORTANT: For EACH issue you create, you MUST create TWO files:
1. An issue file in the issues/ directory
2. A corresponding plan file in the plans/ directory (with the SAME filename)

Use these templates:

ISSUE TEMPLATE:
${issueTemplate}

PLAN TEMPLATE:
${planTemplate}

Key differences:
- ISSUES focus on WHAT needs to be done (requirements, acceptance criteria)
- PLANS focus on HOW to do it (implementation phases, technical approach)

Also create a TODO.md file that lists all issues in this format:
- [ ] **[Issue #NUMBER]** Title - \`issues/filename.md\`

Master Plan:
${masterPlanContent}`;

    // Execute with provider
    const result = await provider.execute(prompt, '');

    // Create initial issue for bootstrapping
    const issueNumber = 1;
    const planBasename = path.basename(masterPlanPath, path.extname(masterPlanPath));
    const issueTitle = `Implement plan from ${planBasename}`;
    const issueContent = `# Issue ${issueNumber}: ${issueTitle}

## Requirement
Decompose the plan into individual actionable issues and create corresponding plan files for each issue.

## Acceptance Criteria
- [ ] All issues are created and numbered in the issues/ directory
- [ ] Each issue has a corresponding plan file in the plans/ directory
- [ ] Each issue has clear requirements and acceptance criteria
- [ ] Each plan has implementation phases with tasks
- [ ] Todo list is created with all issues
- [ ] Issues are properly linked in the todo list

## Technical Details
This issue decomposes the plan into individual actionable tasks for implementation.

IMPORTANT: For each issue you create:
1. Create an issue file in issues/ directory named: {number}-{title-slug}.md
2. Create a corresponding plan file in plans/ directory with the SAME name: {number}-{title-slug}.md
3. The plan file should contain implementation phases and tasks

## Resources
- Master Plan: \`${masterPlanPath}\`

## Generated Issues

${result.output ?? 'Success'}`;

    await this.fileManager.createIssue(issueNumber, issueTitle, issueContent);

    // Create corresponding plan file
    await this.fileManager.createPlan(issueNumber, { 
      issueNumber, 
      file: '', 
      phases: [
        { name: 'Analysis and Decomposition', tasks: ['Analyze master plan', 'Create issues'] },
        { name: 'Implementation Setup', tasks: ['Update todo list', 'Validate issues'] }
      ],
      technicalApproach: 'AI-assisted decomposition of master plan',
      challenges: ['Ensuring task independence', 'Managing dependencies']
    }, issueTitle);

    // Create initial todo list
    const issueFilename = `${issueNumber}-${issueTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9.-]/g, '').replace(/\.+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')}.md`;
    const todoContent = `# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
- [ ] **[Issue #${issueNumber}]** ${issueTitle} - \`issues/${issueFilename}\`

## Completed Issues
`;

    await this.fileManager.updateTodo(todoContent);
  }

  /**
   * Get provider for operation (with fallback to available provider)
   */
  private async getProviderForOperation(): Promise<Provider | null> {
    if (this.config.provider) {
      const provider = createProvider(this.config.provider);
      if (await provider.checkAvailability()) {
        return provider;
      }
    }

    // Fallback to first available provider
    const config = await this.configManager.loadConfig();
    return getFirstAvailableProvider(config.providers);
  }


  /**
   * Capture pre-execution state for potential rollback
   */
  private async capturePreExecutionState(): Promise<RollbackData> {
    const rollbackData: RollbackData = {};

    try {
      // Get current git commit hash
      const commitHash = await getCurrentCommitHash();
      if (commitHash !== null && commitHash !== '') {
        rollbackData.gitCommit = commitHash;
      }

      // Get uncommitted changes
      const uncommittedChanges = await getUncommittedChanges();
      if (uncommittedChanges !== null && uncommittedChanges !== '') {
        rollbackData.fileBackups = new Map([['__git_uncommitted_changes__', uncommittedChanges]]);
      }
    } catch (error) {
      if (this.config.debug === true) {
        this.reportProgress(`Failed to capture pre-execution state: ${error instanceof Error ? error.message : String(error)}`, 0);
      }
    }

    return rollbackData;
  }
}