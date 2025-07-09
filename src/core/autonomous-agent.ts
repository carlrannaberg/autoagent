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
import { DEFAULT_REFLECTION_CONFIG } from './reflection-defaults';
import { ConfigManager } from './config-manager';
import { FileManager } from '../utils/file-manager';
import { Provider, createProvider, getFirstAvailableProvider } from '../providers';
import { ProviderLearning } from './provider-learning';
import { reflectiveDecomposition } from './reflection-engine';
import {
  stageAllChanges,
  createCommit,
  getCurrentCommitHash,
  getUncommittedChanges,
  hasChangesToCommit,
  revertToCommit,
  validateGitEnvironment
} from '../utils/git';
import { isRateLimitOrUsageError } from '../utils/retry';

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
      reflection: DEFAULT_REFLECTION_CONFIG,
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

      // Validate git repository for auto-commit and auto-push
      await this.validateGitForAutoCommitAndPush();

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
    // Always log provider selection process
    this.reportProgress('🔍 Selecting provider...', 0);
    
    // Check if specific provider is requested
    if (this.config.provider) {
      this.reportProgress(`📌 Specific provider requested: ${this.config.provider}`, 0);
      const provider = createProvider(this.config.provider);
      
      // Special handling for Gemini: check if it's available first, then let it handle model selection
      if (this.config.provider === 'gemini') {
        const isAvailable = await provider.checkAvailability();
        if (isAvailable) {
          this.reportProgress(`✅ Using requested provider: ${this.config.provider}`, 0);
          
          // Show model information for Gemini
          const geminiProvider = provider as { rateLimiter?: { getBestGeminiModel?: () => Promise<string> } };
          if (geminiProvider.rateLimiter && typeof geminiProvider.rateLimiter.getBestGeminiModel === 'function') {
            try {
              const model = await geminiProvider.rateLimiter.getBestGeminiModel();
              this.reportProgress(`🤖 Using Gemini model: ${model}`, 0);
            } catch (error) {
              // Fallback if model detection fails
              this.reportProgress('🤖 Using Gemini model: gemini-2.5-pro (default)', 0);
            }
          }
          
          return provider;
        } else {
          this.reportProgress(`❌ ${this.config.provider} is not available`, 0);
        }
      } else {
        // For other providers, check rate limiting first
        const isRateLimited = await this.configManager.isProviderRateLimited(this.config.provider);

        if (isRateLimited === true) {
          this.reportProgress(`⚠️  ${this.config.provider} is rate limited`, 0);
        } else {
          const isAvailable = await provider.checkAvailability();
          if (isAvailable) {
            this.reportProgress(`✅ Using requested provider: ${this.config.provider}`, 0);
            return provider;
          } else {
            this.reportProgress(`❌ ${this.config.provider} is not available`, 0);
          }
        }
      }
    }

    // Use failover logic
    const userConfig = this.configManager.getConfig();
    const availableProviders = await this.configManager.getAvailableProviders();
    
    this.reportProgress(`📋 Configured providers: ${JSON.stringify(userConfig.providers)}`, 0);
    this.reportProgress(`✅ Available providers: ${JSON.stringify(availableProviders)}`, 0);
    
    const provider = await getFirstAvailableProvider(availableProviders);

    if (provider === null) {
      // All providers are rate limited
      this.reportProgress('❌ All providers are rate limited. Waiting for cooldown...', 0);

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
    } else {
      this.reportProgress(`🎯 Selected provider: ${provider.name}`, 0);
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

        // Resolve additional directories from config and CLI
        const configDirs = userConfig.additionalDirectories || [];
        const cliDirs = this.config.additionalDirectories || [];
        const additionalDirectories = await this.configManager.resolveAdditionalDirectories(
          configDirs,
          cliDirs,
          this.config.workspace
        );

        const result = await provider.execute(issueFile, planFile, contextFiles, signal, additionalDirectories);

        // Check for rate limiting or usage limits
        if (result.error !== undefined && isRateLimitOrUsageError(result.error)) {
          await this.configManager.updateRateLimit(provider.name as ProviderName, true);

          // Try failover if available
          const alternativeProvider = await this.tryFailover(provider.name as ProviderName);
          if (alternativeProvider) {
            this.reportProgress(`Switching to ${alternativeProvider.name} due to ${result.error.toLowerCase().includes('usage limit') ? 'usage limit' : 'rate limit'}`, 15);
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

        // Check if this is a rate limit or usage limit error that should trigger failover
        if (isRateLimitOrUsageError(lastError.message)) {
          await this.configManager.updateRateLimit(provider.name as ProviderName, true);

          // Try failover if available
          const alternativeProvider = await this.tryFailover(provider.name as ProviderName);
          if (alternativeProvider) {
            this.reportProgress(`Switching to ${alternativeProvider.name} due to ${lastError.message.toLowerCase().includes('usage limit') ? 'usage limit' : 'rate limit'}`, 15);
            return this.executeWithProvider(
              alternativeProvider,
              issueFile,
              planFile,
              contextFiles,
              issueNumber
            );
          }
        }

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
      // Use exact match for issue number to avoid marking #10, #11 when marking #1
      const issueRegex = new RegExp(`\\[Issue #${issue.number}\\]`);
      if (issueRegex.test(todo)) {
        return todo.replace('[ ]', '[x]');
      }
      return todo;
    });
    await this.fileManager.updateTodoList(updatedTodos);

    // Update provider instructions if configured
    if (this.config.autoUpdateContext === true && result.provider !== undefined) {
      await this.updateProviderInstructions(result);
    }

    // Git auto-commit and auto-push if configured
    if (this.config.autoCommit === true) {
      await this.performGitCommitAndPush(issue, result);
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
   * Add issue to TODO list with consistent formatting while preserving existing content.
   * 
   * This method safely appends new issues to the TODO.md file without overwriting
   * existing issues. It intelligently handles the section structure, ensuring new
   * issues are added to the "Pending Issues" section while preserving any existing
   * TODO items.
   * 
   * @param issueNumber - The sequential issue number to add
   * @param title - The title of the issue
   * 
   * @remarks
   * - If TODO.md doesn't exist, creates it with proper structure
   * - If TODO.md exists, appends the new issue to the Pending Issues section
   * - Preserves all existing TODO content (both pending and completed issues)
   * - Generates consistent filename slugs for issue references
   * - Maintains proper section structure (Pending Issues / Completed Issues)
   * 
   * @example
   * // First bootstrap creates TODO.md with issue 1
   * await addIssueToTodo(1, "Add User Authentication");
   * 
   * // Second bootstrap appends issue 2, preserving issue 1
   * await addIssueToTodo(2, "Implement Error Handling");
   * 
   * @throws Will create a new TODO.md if file operations fail
   */
  private async addIssueToTodo(issueNumber: number, title: string): Promise<void> {
    // Generate consistent filename slug
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    const issueFilename = `${issueNumber}-${slug}.md`;
    const issueEntry = `- [ ] **[Issue #${issueNumber}]** ${title} - \`issues/${issueFilename}\``;

    try {
      // Try to read existing TODO content
      const existingContent = await this.fileManager.readTodo();
      
      if (existingContent.trim()) {
        // TODO exists, append to pending issues section
        let updatedContent = existingContent;
        
        // Check if Pending Issues section exists
        if (updatedContent.includes('## Pending Issues')) {
          // Find the position after "## Pending Issues" and any existing issues
          const pendingIndex = updatedContent.indexOf('## Pending Issues');
          const nextSectionIndex = updatedContent.indexOf('\n## ', pendingIndex + 1);
          
          if (nextSectionIndex !== -1) {
            // Find the blank line before the next section
            const beforeNextSection = updatedContent.lastIndexOf('\n\n', nextSectionIndex);
            const insertPosition = beforeNextSection !== -1 && beforeNextSection > pendingIndex 
              ? beforeNextSection + 1  // Insert after the last newline, keeping one blank line
              : nextSectionIndex;      // Fallback to before next section
            
            updatedContent = updatedContent.slice(0, insertPosition) + 
                           `${issueEntry}\n` + 
                           updatedContent.slice(insertPosition);
          } else {
            // No next section, append at end
            updatedContent = updatedContent.trimEnd() + `\n${issueEntry}\n`;
          }
        } else {
          // No Pending Issues section, add it before Completed Issues
          if (updatedContent.includes('## Completed Issues')) {
            updatedContent = updatedContent.replace(
              '## Completed Issues',
              `## Pending Issues\n${issueEntry}\n\n## Completed Issues`
            );
          } else {
            // No sections, append at end
            updatedContent += `\n\n## Pending Issues\n${issueEntry}\n\n## Completed Issues\n`;
          }
        }
        
        await this.fileManager.updateTodo(updatedContent);
      } else {
        // TODO doesn't exist or is empty, create new structure
        const todoContent = `# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
${issueEntry}

## Completed Issues
`;
        
        await this.fileManager.updateTodo(todoContent);
      }
    } catch (error) {
      // If TODO doesn't exist, create new one
      const todoContent = `# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
${issueEntry}

## Completed Issues
`;
      
      await this.fileManager.updateTodo(todoContent);
    }
  }

  /**
   * Validate git repository status for auto-commit operations.
   * Checks git availability, repository status, and user configuration.
   * 
   * @throws Error with clear remediation guidance if validation fails
   */
  private async validateGitForAutoCommit(): Promise<void> {
    // Skip validation if auto-commit is disabled
    if (this.config.autoCommit !== true) {
      return;
    }

    // Add debug logging at the start
    if (this.config.debug === true) {
      this.reportProgress('🔐 Validating git environment for auto-commit...', 0);
      this.reportProgress(`📍 Auto-commit: ${this.config.autoCommit === true ? 'enabled' : 'disabled'}`, 0);
    }

    // Use the comprehensive validation function with debug logging
    const validationResult = await validateGitEnvironment({
      onDebug: this.config.debug === true ? (message: string): void => this.reportProgress(message, 0) : undefined
    });

    if (!validationResult.isValid) {
      // Build comprehensive error message
      const errorMessage = [
        'Git validation failed for auto-commit.',
        '',
        'Errors found:',
        ...validationResult.errors.map((e, i) => `${i + 1}. ${e}`),
        '',
        'To fix these issues:',
        ...validationResult.suggestions.map((s, i) => `${i + 1}. ${s}`),
        '',
        'Alternative: Disable auto-commit by setting autoCommit to false in your config'
      ].join('\n');

      throw new Error(errorMessage);
    }

    // Log successful validation in debug mode
    if (this.config.debug === true) {
      const version = validationResult.gitVersion ?? 'unknown version';
      this.reportProgress(`✅ Git validation passed for auto-commit (${version})`, 0);
    }
  }

  /**
   * Validate git repository for auto-push operations.
   * Checks remote configuration and accessibility.
   * 
   * @throws Error with clear remediation guidance if validation fails
   */
  private async validateGitForAutoPush(): Promise<void> {
    // Get push configuration
    const userConfig = this.configManager.getConfig();
    const autoPush = this.config.autoPush ?? userConfig.gitAutoPush;
    
    // Skip validation if auto-push is disabled
    if (!autoPush) {
      return;
    }

    if (this.config.debug === true) {
      this.reportProgress('🔐 Validating git environment for auto-push...', 0);
      this.reportProgress(`📍 Auto-push: ${autoPush ? 'enabled' : 'disabled'}`, 0);
    }

    // Validate remote repository
    const { validateRemoteForPush } = await import('../utils/git');
    const remote = userConfig.gitPushRemote ?? 'origin';
    const validationResult = await validateRemoteForPush(remote);

    if (!validationResult.isValid) {
      // Build comprehensive error message
      const errorMessage = [
        'Git validation failed for auto-push.',
        '',
        'Errors found:',
        ...validationResult.errors.map((e, i) => `${i + 1}. ${e}`),
        '',
        'To fix these issues:',
        ...validationResult.suggestions.map((s, i) => `${i + 1}. ${s}`),
        '',
        'Alternative: Disable auto-push by setting gitAutoPush to false in your config'
      ].join('\n');

      throw new Error(errorMessage);
    }

    // Log successful validation in debug mode
    if (this.config.debug === true) {
      this.reportProgress(`✅ Git validation passed for auto-push (remote: ${remote})`, 0);
    }
  }

  /**
   * Validate git environment for both auto-commit and auto-push.
   * Consolidates validation to avoid duplicate checks.
   * 
   * @throws Error with clear remediation guidance if validation fails
   */
  private async validateGitForAutoCommitAndPush(): Promise<void> {
    // Get effective configuration
    const userConfig = this.configManager.getConfig();
    const autoCommit = this.config.autoCommit ?? false;
    const autoPush = this.config.autoPush ?? userConfig.gitAutoPush;

    // Skip validation if both are disabled
    if (!autoCommit && !autoPush) {
      return;
    }

    if (this.config.debug === true) {
      this.reportProgress('🔐 Validating git environment...', 0);
      this.reportProgress(`📍 Auto-commit: ${autoCommit ? 'enabled' : 'disabled'}`, 0);
      this.reportProgress(`📍 Auto-push: ${autoPush ? 'enabled' : 'disabled'}`, 0);
    }

    // Validate for commit if enabled
    if (autoCommit) {
      await this.validateGitForAutoCommit();
    }

    // Validate for push if enabled
    if (autoPush) {
      await this.validateGitForAutoPush();
    }
  }


  /**
   * Perform git push operation
   */
  private async performGitPush(result?: ExecutionResult): Promise<void> {
    try {
      const userConfig = this.configManager.getConfig();
      const autoPush = this.config.autoPush ?? userConfig.gitAutoPush;
      
      // Skip if auto-push is disabled
      if (!autoPush) {
        return;
      }

      this.reportProgress('Pushing to remote...', 96);

      const { pushToRemote, hasUpstreamBranch, getCurrentBranch } = await import('../utils/git');
      
      // Get push configuration
      const remote = userConfig.gitPushRemote ?? 'origin';
      const branch = userConfig.gitPushBranch ?? await getCurrentBranch() ?? undefined;
      
      // Check if upstream tracking exists
      const hasUpstream = await hasUpstreamBranch();
      const setUpstream = !hasUpstream;
      
      if (setUpstream && this.config.debug === true) {
        this.reportProgress(`Setting upstream to ${remote}/${branch}...`, 96);
      }

      // Execute push
      const pushResult = await pushToRemote({
        remote,
        branch,
        setUpstream
      });

      if (pushResult.success) {
        this.reportProgress(`Changes pushed to ${pushResult.remote}/${pushResult.branch}`, 98);
        
        // Store push info in result for potential rollback
        if (result !== undefined && result.rollbackData !== undefined && pushResult.branch !== undefined) {
          result.rollbackData.gitPush = {
            remote: pushResult.remote ?? remote,
            branch: pushResult.branch,
            commit: result.rollbackData.gitCommit ?? ''
          };
        }
      } else {
        // Push failed - log but don't fail the execution
        const errorMsg = pushResult.error ?? 'Unknown error';
        if (this.config.debug === true) {
          this.reportProgress(`Git push failed: ${errorMsg}`, 0);
          if (pushResult.stderr !== undefined) {
            this.reportProgress(`Push stderr: ${pushResult.stderr}`, 0);
          }
        }
        
        // Provide helpful error messages
        if (errorMsg.includes('Authentication')) {
          this.reportProgress('⚠️  Push failed due to authentication. Check your git credentials.', 0);
        } else if (errorMsg.includes('remote rejected')) {
          this.reportProgress('⚠️  Push was rejected by remote. You may need to pull first.', 0);
        } else if (errorMsg.includes('Could not resolve host')) {
          this.reportProgress('⚠️  Push failed due to network error. Check your internet connection.', 0);
        } else {
          this.reportProgress(`⚠️  Push failed: ${errorMsg}`, 0);
        }
      }
    } catch (error) {
      // Log error but don't fail the execution
      if (this.config.debug === true) {
        this.reportProgress(`Git push error: ${error instanceof Error ? error.message : String(error)}`, 0);
      }
    }
  }

  /**
   * Perform git commit and optionally push for completed issue
   */
  private async performGitCommitAndPush(issue: Issue, result: ExecutionResult): Promise<void> {
    try {
      // Check if there are changes to commit
      const hasChanges = await hasChangesToCommit();
      if (!hasChanges) {
        return; // No changes to commit or push
      }

      // Perform commit if auto-commit is enabled
      if (this.config.autoCommit === true) {
        // Stage all changes
        await stageAllChanges();

        // Create commit message
        const issueName = `${issue.number}-${issue.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
        const commitMessage = `feat: Complete issue from issues/${issueName}.md`;

        // Determine no-verify setting with proper precedence
        let noVerify = false;
        
        if (this.config.noVerify !== undefined) {
          noVerify = this.config.noVerify;
          if (this.config.debug === true) {
            this.reportProgress(`🔧 Using runtime noVerify setting: ${noVerify}`, 0);
          }
        } else {
          const userConfig = this.configManager.getConfig();
          noVerify = userConfig.gitCommitNoVerify;
          if (this.config.debug === true && noVerify) {
            this.reportProgress(`🔧 Using configured gitCommitNoVerify: ${noVerify}`, 0);
          }
        }

        // Create commit with optional co-authorship and no-verify option
        const commitResult = await createCommit({
          message: commitMessage,
          coAuthor: (this.config.includeCoAuthoredBy === true && result.provider !== undefined) ? {
            name: result.provider.charAt(0).toUpperCase() + result.provider.slice(1),
            email: `${result.provider}@autoagent-cli`
          } : undefined,
          noVerify
        });

        if (commitResult.success) {
          this.reportProgress('Changes committed to git', 95);

          // Store commit hash in result for potential rollback
          if (commitResult.commitHash !== undefined && commitResult.commitHash !== '' && result.rollbackData !== undefined) {
            result.rollbackData.gitCommit = commitResult.commitHash;
          }
          
          // Perform push if enabled and commit was successful
          await this.performGitPush(result);
        } else if (this.config.debug === true) {
          this.reportProgress(`Git commit failed: ${commitResult.error ?? 'Unknown error'}`, 0);
        }
      }
    } catch (error) {
      // Log error but don't fail the execution
      if (this.config.debug === true) {
        this.reportProgress(`Git commit/push error: ${error instanceof Error ? error.message : String(error)}`, 0);
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
  async createIssue(title: string, description?: string, acceptanceCriteria?: string[], details?: string, customContent?: string): Promise<number> {
    // Get next issue number
    const nextNumber = await this.fileManager.getNextIssueNumber();
    
    let issueContent: string;
    
    // If we have custom content, use it with corrected issue number
    if (customContent !== undefined) {
      // If content doesn't start with a header, add it
      if (!customContent.startsWith('#')) {
        issueContent = `# Issue ${nextNumber}: ${title}\n\n${customContent}`;
      } else {
        // Replace placeholder issue number with the actual assigned number (supports both "Issue 14:" and "Issue #14:" formats)
        issueContent = customContent.replace(/^#\s*Issue\s*#?\d*:\s*/m, `# Issue ${nextNumber}: `);
      }
    }
    // If we have explicit content, use it directly
    else if (description !== undefined || acceptanceCriteria !== undefined || details !== undefined) {
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

        // Execute with provider (no additional directories needed for bootstrap)
        const result = await provider.execute(prompt, '', undefined, undefined, []);
        
        // Check if provider execution failed
        if (!result.success) {
          throw new Error(`Provider execution failed: ${result.error ?? 'Unknown error'}`);
        }
        
        issueContent = `# Issue ${nextNumber}: ${title}

${result.output ?? 'Success'}`;
      }
    }

    await this.fileManager.createIssue(nextNumber, title, issueContent);

    // Update todo list using shared method
    await this.addIssueToTodo(nextNumber, title);

    return nextNumber;
  }

  /**
   * Sync TODO.md with newly created issues after decomposition
   * This scans the issues directory for any issues not in TODO.md and adds them
   */
  async syncTodoWithIssues(): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    try {
      // Get current TODO content
      const todoContent = await this.fileManager.readTodo();
      const issuesDir = path.join(this.config.workspace ?? process.cwd(), 'issues');
      
      // Get all issue files
      const files = await fs.readdir(issuesDir);
      const issueFiles = files.filter(f => f.endsWith('.md'));
      
      // Extract issue numbers from TODO
      const todoIssueNumbers = new Set<number>();
      const todoLines = todoContent.split('\n');
      for (const line of todoLines) {
        const match = line.match(/\*\*\[Issue #(\d+)\]\*\*/);
        if (match !== null && match[1] !== undefined && match[1] !== '') {
          todoIssueNumbers.add(parseInt(match[1], 10));
        }
      }
      
      // Find issues not in TODO
      const missingIssues: Array<{ number: number; title: string; filename: string }> = [];
      
      for (const file of issueFiles) {
        const match = file.match(/^(\d+)-(.+)\.md$/);
        if (match !== null && match[1] !== undefined && match[1] !== '') {
          const issueNumber = parseInt(match[1], 10);
          
          if (!todoIssueNumbers.has(issueNumber)) {
            // Read the issue file to get the title
            const issuePath = path.join(issuesDir, file);
            const issueContent = await fs.readFile(issuePath, 'utf-8');
            
            // Extract title from the issue content (supports both "Issue 14:" and "Issue #14:" formats)
            const titleMatch = issueContent.match(/^#\s*Issue\s*#?\d*:\s*(.+)$/m);
            const title = (titleMatch !== null && titleMatch[1] !== undefined && titleMatch[1] !== '') ? titleMatch[1].trim() : file.replace('.md', '');
            
            missingIssues.push({
              number: issueNumber,
              title,
              filename: file
            });
          }
        }
      }
      
      // Sort missing issues by number
      missingIssues.sort((a, b) => a.number - b.number);
      
      // Add missing issues to TODO
      for (const issue of missingIssues) {
        await this.addIssueToTodo(issue.number, issue.title);
      }
      
      if (missingIssues.length > 0) {
        this.reportProgress(`Added ${missingIssues.length} new issues to TODO.md`, 95);
      }
    } catch (error) {
      // Log error but don't fail - TODO sync is not critical
      if (this.config.debug === true) {
        this.reportProgress(`Failed to sync TODO: ${error instanceof Error ? error.message : String(error)}`, 0);
      }
    }
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
   * Bootstrap a project from a master plan file.
   * 
   * Creates an initial decomposition issue that breaks down the master plan into
   * individual actionable tasks. This method is safe to use in active projects
   * as it preserves all existing TODO items and uses dynamic issue numbering.
   * 
   * Templates are embedded within the package, so no external template files
   * are required - bootstrap works out-of-the-box with zero configuration.
   * 
   * @param masterPlanPath - Path to the master plan markdown file
   * @returns The issue number of the created bootstrap issue
   * 
   * @remarks
   * Key safety features:
   * - Automatically uses the next available issue number (not hardcoded)
   * - Preserves all existing TODO items when adding new issues
   * - Safe to run multiple times without data loss
   * - Appends new issues to the Pending Issues section
   * - Never overwrites existing TODO.md content
   * - Uses embedded templates (no external files needed)
   * 
   * @example
   * // First bootstrap in a new project
   * const issueNumber = await agent.bootstrap('master-plan.md'); // Creates issue #1, returns 1
   * 
   * // Second bootstrap in the same project  
   * const issueNumber2 = await agent.bootstrap('phase2-plan.md'); // Creates issue #2, preserves #1, returns 2
   * 
   * // Bootstrap in a project with existing issues
   * // If issues 1-5 exist, creates issue #6
   * const issueNumber3 = await agent.bootstrap('new-feature.md'); // Returns 6
   * 
   * @throws Error if no providers are available
   * @throws Error if master plan file cannot be read
   */
  async bootstrap(masterPlanPath: string): Promise<number> {
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

    // Use embedded templates from the package - no external files needed
    // Dynamic import for testability
    const { DEFAULT_ISSUE_TEMPLATE: issueTemplate, DEFAULT_PLAN_TEMPLATE: planTemplate } = await import('../templates/default-templates');

    // Validate embedded templates are available
    if (!issueTemplate || !planTemplate) {
      throw new Error('Embedded templates are not properly defined');
    }

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

    // Execute with provider (no additional directories needed for decomposition)
    const result = await provider.execute(prompt, '', undefined, undefined, []);

    // If reflection is enabled, perform reflective improvement
    if (this.config.reflection?.enabled === true) {
      const reflectionResult = await this.performReflectiveImprovement(
        provider,
        masterPlanPath,
        masterPlanContent,
        result.output ?? ''
      );
      
      // Log reflection results
      if (reflectionResult.enabled) {
        this.reportProgress(
          `Reflection completed: ${reflectionResult.performedIterations} iterations, ` +
          `${reflectionResult.totalImprovements} improvements`,
          85
        );
      }
    }

    // Create initial issue for bootstrapping
    const planBasename = path.basename(masterPlanPath, path.extname(masterPlanPath));
    const issueTitle = `Implement plan from ${planBasename}`;
    
    // Create the issue content with placeholder issue number
    const issueContent = `# Issue: ${issueTitle}

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

    // Use createIssue with custom content
    const issueNumber = await this.createIssue(issueTitle, undefined, undefined, undefined, issueContent);

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

    return issueNumber;
  }

  /**
   * Get provider for operation (with fallback to available provider)
   */
  private async getProviderForOperation(): Promise<Provider | null> {
    // Check if mock provider is enabled for testing
    if (process.env.AUTOAGENT_MOCK_PROVIDER === 'true') {
      const mockProvider = createProvider('mock');
      if (await mockProvider.checkAvailability()) {
        return mockProvider;
      }
    }
    
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
   * Perform reflective improvement on bootstrap decomposition
   * 
   * This method integrates the reflection engine to iteratively improve
   * the decomposed issues and plans based on the original specification.
   * It respects the reflection configuration and handles errors gracefully.
   * 
   * @param provider - The AI provider to use for reflection
   * @param masterPlanPath - Path to the master plan file
   * @param masterPlanContent - Content of the master plan
   * @param initialDecomposition - Initial decomposition output from provider
   * @returns Reflection result with improvement details
   */
  private async performReflectiveImprovement(
    provider: Provider,
    masterPlanPath: string,
    masterPlanContent: string,
    initialDecomposition: string
  ): Promise<import('../types').ReflectionResult> {
    try {
      this.reportProgress('Starting reflective improvement process...', 70);

      // Extract issue and plan file information from the decomposition
      // This is a simplified extraction - in production, you might parse the actual generated files
      const issueMatches = initialDecomposition.match(/issues\/\d+-[\w-]+\.md/g) || [];
      const planMatches = initialDecomposition.match(/plans\/\d+-[\w-]+\.md/g) || [];
      
      // Calculate word count for skip check
      const totalWordCount = masterPlanContent.split(/\s+/).length;

      // Create a decomposition result structure
      const decompositionResult = {
        specFile: masterPlanPath,
        specContent: masterPlanContent,
        issueFiles: issueMatches,
        planFiles: planMatches,
        issueCount: issueMatches.length,
        totalWordCount
      };

      // Perform reflective decomposition
      const reflectionResult = await reflectiveDecomposition(
        provider,
        decompositionResult,
        this.config
      );

      // Log improvements if any were found
      if (reflectionResult.enabled && reflectionResult.improvements) {
        for (const improvement of reflectionResult.improvements) {
          if (improvement.changes.length > 0) {
            this.reportProgress(
              `Iteration ${improvement.iterationNumber}: ${improvement.changes.length} improvements identified`,
              75 + (improvement.iterationNumber * 5)
            );
          }
        }
      }

      return reflectionResult;
    } catch (error) {
      // Log error but don't fail the bootstrap process
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.reportProgress(`Reflection process failed: ${errorMessage}`, 70);
      
      // Return disabled result on error
      return {
        enabled: false,
        performedIterations: 0,
        totalImprovements: 0,
        finalScore: 0,
        skippedReason: `Error: ${errorMessage}`
      };
    }
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