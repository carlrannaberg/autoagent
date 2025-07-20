import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';
import * as path from 'path';

// Helper function to collect repeatable CLI options
function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}

interface RunOptions {
  all?: boolean;
  provider?: string;
  workspace?: string;
  debug?: boolean;
  coAuthor?: boolean;
  dryRun?: boolean;
  addDir?: string[];
  verify?: boolean;
  noVerify?: boolean;
  strictCompletion?: boolean;
  completionConfidence?: number;
  ignoreToolFailures?: boolean;
  maxRetryAttempts?: number;
}

const runCommand = new Command('run')
  .description('Execute autonomous agent tasks')
  .argument('[task-id]', 'Specific task ID to execute')
  .option('-a, --all', 'Execute all pending tasks')
  .option('-p, --provider <provider>', 'AI provider to use (claude or gemini)')
  .option('-w, --workspace <path>', 'Working directory')
  .option('-d, --debug', 'Enable debug logging')
  .option('--co-author', 'Include co-authored-by in commits (enabled by default)', true)
  .option('--no-co-author', 'Disable co-authored-by in commits')
  .option('--dry-run', 'Preview mode without making changes')
  .option('--add-dir <path>', 'Add additional directory (repeatable)', collect, [])
  .option('--verify', 'Enable git hooks during commits (enabled by default)', true)
  .option('--no-verify', 'Skip git hooks during commits')
  .option('--strict-completion', 'Require strict task completion validation')
  .option('--completion-confidence <percent>', 'Minimum confidence threshold for task completion (0-100)', '80')
  .option('--ignore-tool-failures', 'Mark tasks complete even with tool failures')
  .option('--max-retry-attempts <count>', 'Maximum retry attempts for failed tasks', '3')
  .action(async (taskId?: string, options?: RunOptions) => {
    try {
      if (!options) {
        Logger.error('No options provided');
        process.exit(1);
        return;
      }

      const workspacePath = path.resolve(options.workspace ?? process.cwd());
      
      // Enable debug logging if requested
      if (options.debug) {
        Logger.setDebugEnabled(true);
      }

      // Create and initialize agent
      const agent = new AutonomousAgent({
        provider: options.provider as ProviderName,
        workspace: workspacePath,
        includeCoAuthoredBy: options.coAuthor !== false,
        debug: options.debug,
        dryRun: options.dryRun,
        additionalDirectories: options.addDir,
        noVerify: options.verify === false || options.noVerify === true,
        strictCompletion: options.strictCompletion,
        completionConfidence: options.completionConfidence ? parseInt(options.completionConfidence.toString(), 10) : undefined,
        ignoreToolFailures: options.ignoreToolFailures,
        maxRetryAttempts: options.maxRetryAttempts ? parseInt(options.maxRetryAttempts.toString(), 10) : undefined
      });

      await agent.initialize();

      // Determine what to execute
      if (options.all) {
        // Execute all pending tasks
        const tasks = await agent.listTasks('pending');
        
        if (tasks.length === 0) {
          Logger.info('No pending tasks to execute');
          return;
        }

        Logger.info(`Found ${tasks.length} pending task${tasks.length > 1 ? 's' : ''}`);
        
        let successCount = 0;
        let failureCount = 0;

        for (const task of tasks) {
          Logger.info(`\n▶️  Executing task: ${task.title}`);
          
          try {
            const result = await agent.executeTask(task.id);
            if (result.success) {
              successCount++;
              Logger.success(`✅ Task ${task.id} completed successfully`);
            } else {
              failureCount++;
              Logger.error(`❌ Task ${task.id} failed: ${result.error}`);
            }
          } catch (error) {
            failureCount++;
            Logger.error(`❌ Task ${task.id} failed with error: ${error instanceof Error ? error.message : String(error)}`);
          }
        }

        Logger.info(`\n📊 Summary: ${successCount} succeeded, ${failureCount} failed`);
        
        if (failureCount > 0) {
          process.exit(1);
        }
      } else if (taskId) {
        // Execute specific task
        Logger.info(`▶️  Executing task: ${taskId}`);
        
        const result = await agent.executeTask(taskId);
        
        if (result.success) {
          Logger.success('✅ Task completed successfully');
          if (result.output) {
            Logger.info(`\n📝 Output:\n${result.output}`);
          }
        } else {
          Logger.error(`❌ Task failed: ${result.error}`);
          process.exit(1);
        }
      } else {
        // No task specified, show available tasks
        const tasks = await agent.listTasks();
        
        if (tasks.length === 0) {
          Logger.info('No tasks found. Create tasks using the "create" command.');
          return;
        }

        Logger.info('Available tasks:');
        for (const task of tasks) {
          const statusIcon = task.status === 'completed' ? '✅' : task.status === 'in_progress' ? '🔄' : '⏳';
          Logger.info(`  ${statusIcon} ${task.id}: ${task.title}`);
        }
        
        Logger.info('\nRun with a task ID to execute a specific task, or use --all for all pending tasks.');
      }
    } catch (error) {
      Logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
      if (options?.debug) {
        console.error(error);
      }
      process.exit(1);
    }
  });

export function registerRunCommand(program: Command): void {
  program.addCommand(runCommand);
}