import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';

export function registerBootstrapCommand(program: Command): void {
  program
    .command('bootstrap [plan-file]')
    .description('Create initial issue from master plan')
    .option('-p, --provider <provider>', 'Override AI provider for this operation (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .action(async (planFile: string | undefined, options: { provider?: string; workspace?: string }) => {
      try {
        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace
        });

        const masterPlanPath = (planFile !== undefined && planFile !== '') ? planFile : 'master-plan.md';

        await agent.bootstrap(masterPlanPath);
        Logger.success('Bootstrap issue created successfully');

        const status = await agent.getStatus();
        Logger.info(`\nTotal issues: ${status.totalIssues}`);
        if (status.currentIssue) {
          Logger.info(`Next issue: #${status.currentIssue.number}: ${status.currentIssue.title}`);
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}