import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';

export function registerStatusCommand(program: Command): void {
  program
    .command('status')
    .description('Show current status')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .action(async (options: { workspace?: string }) => {
      try {
        const agent = new AutonomousAgent({
          provider: 'claude',
          workspace: options.workspace
        });

        const status = await agent.getStatus();

        Logger.info('\n📊 Status Report\n');
        Logger.info(`Total Issues:     ${status.totalIssues}`);
        Logger.info(`Completed:        ${status.completedIssues}`);
        Logger.info(`Pending:          ${status.pendingIssues}`);

        if (status.currentIssue !== null && status.currentIssue !== undefined) {
          Logger.info(`\nNext Issue:       #${status.currentIssue.number}: ${status.currentIssue.title}`);
        }

        if (status.availableProviders !== undefined && status.availableProviders.length > 0) {
          Logger.info(`\n✅ Available Providers: ${status.availableProviders.join(', ')}`);
        }
        if (status.rateLimitedProviders !== undefined && status.rateLimitedProviders.length > 0) {
          Logger.info(`⏱️  Rate Limited: ${status.rateLimitedProviders.join(', ')}`);
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}