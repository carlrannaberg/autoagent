import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';

export function registerCreateCommand(program: Command): void {
  program
    .command('create <title>')
    .description('Create a new issue')
    .option('-p, --provider <provider>', 'Override AI provider for this operation (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .action(async (title: string, options: { provider?: string; workspace?: string }) => {
      try {
        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace
        });

        const issueNumber = await agent.createIssue(title);
        Logger.success(`Created issue #${issueNumber}: ${title}`);
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}