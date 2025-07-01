import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';

export function registerStatusCommand(program: Command): void {
  program
    .command('status')
    .description('Show current status')
    .argument('[issue]', 'Issue name or number to check specific status')
    .option('--history', 'Show execution history')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .action(async (issueArg?: string, options?: { workspace?: string; history?: boolean }) => {
      try {
        const agent = new AutonomousAgent({
          provider: 'claude',
          workspace: options?.workspace
        });

        if (options?.history) {
          // Show execution history
          const fs = await import('fs/promises');
          const path = await import('path');
          const executionsFile = path.join(options?.workspace ?? process.cwd(), '.autoagent', 'executions.json');
          
          try {
            const content = await fs.readFile(executionsFile, 'utf-8');
            const executions = JSON.parse(content);
            Logger.info('Execution History:\n');
            executions.forEach((exec: any) => {
              const statusIcon = exec.status === 'completed' ? '✅' : 
                                exec.status === 'failed' ? '❌' : '🔄';
              Logger.info(`  ${statusIcon} ${exec.issue} (${exec.status}) - ${new Date(exec.timestamp).toLocaleString()}`);
            });
          } catch {
            Logger.info('No execution history found');
          }
          return;
        }

        if (issueArg) {
          // Show specific issue status
          const fs = await import('fs/promises');
          const path = await import('path');
          const statusFile = path.join(options?.workspace ?? process.cwd(), '.autoagent', 'status.json');
          
          let issueStatus = 'pending';
          try {
            const statusContent = await fs.readFile(statusFile, 'utf-8');
            const statusData = JSON.parse(statusContent);
            issueStatus = statusData[issueArg]?.status ?? 'pending';
          } catch {
            // Status file might not exist, default to pending
          }
          
          Logger.info(`Status: ${issueStatus}`);
          return;
        }

        const status = await agent.getStatus();

        Logger.info('\n📊 Project Status\n');
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