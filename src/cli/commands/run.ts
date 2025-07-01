import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';

interface RunOptions {
  all?: boolean;
  provider?: string;
  workspace?: string;
  debug?: boolean;
  commit?: boolean;
  coAuthor?: boolean;
  dryRun?: boolean;
}

export function registerRunCommand(program: Command): void {
  program
    .command('run')
    .description('Run the next issue or all issues')
    .option('-p, --provider <provider>', 'Override AI provider for this run (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .option('--all', 'Run all pending issues')
    .option('--debug', 'Enable debug output')
    .option('--no-commit', 'Disable auto-commit for this run')
    .option('--commit', 'Enable auto-commit for this run')
    .option('--no-co-author', 'Disable co-authorship for this run')
    .option('--co-author', 'Enable co-authorship for this run')
    .option('--dry-run', 'Preview what would be done without making changes')
    .action(async (options: RunOptions) => {
      try {
        const abortController = new AbortController();
        
        process.on('SIGINT', () => {
          Logger.warning('\n⚠️  Cancelling operation...');
          abortController.abort();
        });
        
        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace,
          debug: options.debug,
          autoCommit: options.commit !== undefined ? options.commit : undefined,
          includeCoAuthoredBy: options.coAuthor !== undefined ? options.coAuthor : undefined,
          dryRun: options.dryRun,
          signal: abortController.signal,
          onProgress: (message: string, percentage?: number): void => {
            if (percentage !== undefined) {
              Logger.info(`[${percentage}%] ${message}`);
            } else {
              Logger.info(message);
            }
          }
        });

        // Set up event listeners for better feedback
        agent.on('execution-start', (issueNumber: number) => {
          Logger.info(`🚀 Started work on issue #${issueNumber}`);
        });

        agent.on('execution-end', (result: { success: boolean; issueNumber: number; issueTitle?: string; error?: string }) => {
          if (result.success === true) {
            Logger.success(`✅ Completed issue #${result.issueNumber}${result.issueTitle !== undefined ? `: ${result.issueTitle}` : ''}`);
          } else {
            Logger.error(`❌ Failed issue #${result.issueNumber}: ${result.error !== undefined ? result.error : 'Unknown error'}`);
          }
        });

        agent.on('error', (error: Error) => {
          Logger.error(`💥 Execution error: ${error.message}`);
        });

        agent.on('interrupt', (message: string) => {
          Logger.warning(`⚠️  ${message}`);
        });

        if (options.debug === true) {
          agent.on('debug', (message: string) => {
            Logger.debug(message);
          });
        }

        await agent.initialize();

        if (options.all === true) {
          const results = await agent.executeAll();
          const successful = results.filter(r => r.success).length;
          const failed = results.filter(r => !r.success).length;
          
          if (failed === 0) {
            Logger.success(`🎉 All ${successful} issues completed successfully!`);
          } else {
            Logger.warning(`⚠️  Completed ${successful} issues, ${failed} failed`);
          }
        } else {
          const result = await agent.executeNext();
          if (!result.success && result.error !== undefined && result.error !== 'No pending issues to execute') {
            throw new Error(result.error !== undefined ? result.error : 'Execution failed');
          } else if (result.error === 'No pending issues to execute') {
            Logger.info('📝 No pending issues to execute');
          }
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}