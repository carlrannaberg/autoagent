import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';

export function registerStatusCommand(program: Command): void {
  program
    .command('status')
    .description('Show current status')
    .argument('[issue]', 'Issue name or number to check specific status')
    .option('--history', 'Show execution history')
    .option('-w, --workspace <path>', 'Workspace directory')
    .action(async (issueArg?: string, options?: { workspace?: string; history?: boolean }) => {
      try {
        const workspace = options?.workspace ?? process.cwd();
        
        const agent = new AutonomousAgent({
          provider: 'claude',
          workspace
        });

        if (options?.history === true) {
          // Show execution history
          const fs = await import('fs/promises');
          const path = await import('path');
          const executionsFile = path.join(workspace, '.autoagent', 'executions.json');
          
          try {
            const content = await fs.readFile(executionsFile, 'utf-8');
            const executions = JSON.parse(content) as Array<{
              id: string;
              issue: string;
              status: string;
              timestamp: string;
            }>;
            Logger.info('Recent Executions:\n');
            executions.forEach((exec) => {
              const statusIcon = exec.status === 'completed' ? '✅' : 
                                exec.status === 'failed' ? '❌' : '🔄';
              Logger.info(`  ${statusIcon} ${exec.issue} (${exec.status}) - ${new Date(exec.timestamp).toLocaleString()}`);
            });
          } catch {
            Logger.info('No execution history found');
          }
          return;
        }

        if (issueArg !== null && issueArg !== undefined && issueArg.length > 0) {
          // Show specific issue status
          const fs = await import('fs/promises');
          const path = await import('path');
          
          // Check if issue exists by looking for issue files
          const issuesDir = path.join(workspace, 'issues');
          let issueExists = false;
          let resolvedIssueKey = issueArg;
          
          try {
            const files = await fs.readdir(issuesDir);
            // First try to find by number (e.g., "1" -> "1-title.md")
            if (/^\d+$/.test(issueArg)) {
              issueExists = files.some(f => f.match(new RegExp(`^${issueArg}-.*\\.md$`)));
            } else {
              // Try to find by slug in status.json
              const statusFile = path.join(workspace, '.autoagent', 'status.json');
              try {
                const statusContent = await fs.readFile(statusFile, 'utf-8');
                const statusData = JSON.parse(statusContent) as Record<string, { issueNumber?: number; [key: string]: unknown }>;
                const issueData = statusData[issueArg];
                if (issueData?.issueNumber !== undefined && issueData.issueNumber !== null) {
                  issueExists = files.some(f => f.match(new RegExp(`^${issueData.issueNumber}-.*\\.md$`)));
                  resolvedIssueKey = issueArg; // Keep the original key for status lookup
                } else {
                  // Fallback: try to find by filename containing the argument
                  issueExists = files.some(f => f.includes(issueArg) && f.endsWith('.md'));
                }
              } catch {
                // Fallback: try to find by filename containing the argument
                issueExists = files.some(f => f.includes(issueArg) && f.endsWith('.md'));
              }
            }
          } catch {
            // Issues directory doesn't exist
          }
          
          if (!issueExists) {
            Logger.error('Issue not found');
            process.exit(1);
          }
          
          const statusFile = path.join(workspace, '.autoagent', 'status.json');
          
          let issueStatus = 'pending';
          let startedAt: string | undefined;
          try {
            const statusContent = await fs.readFile(statusFile, 'utf-8');
            const statusData = JSON.parse(statusContent) as Record<string, { status?: string; startedAt?: string; [key: string]: unknown }>;
            const issueData = statusData[resolvedIssueKey];
            issueStatus = issueData?.status ?? 'pending';
            startedAt = issueData?.startedAt;
          } catch {
            // Status file might not exist, default to pending
          }
          
          Logger.info(`${issueArg}`);
          Logger.info(`Status: ${issueStatus}`);
          
          // If running, show how long ago it was started
          if (issueStatus === 'running' && startedAt !== undefined) {
            const startTime = new Date(startedAt).getTime();
            const now = Date.now();
            const elapsed = now - startTime;
            const hours = Math.floor(elapsed / (1000 * 60 * 60));
            const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
            
            if (hours > 0) {
              Logger.info(`${hours} hour${hours > 1 ? 's' : ''} ago`);
            } else if (minutes > 0) {
              Logger.info(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
            } else {
              Logger.info('Just started');
            }
          }
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