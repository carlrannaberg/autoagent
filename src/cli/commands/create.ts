import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';

export function registerCreateCommand(program: Command): void {
  program
    .command('create')
    .description('Create a new issue')
    .option('-t, --title <title>', 'Issue title')
    .option('-d, --description <description>', 'Issue description')
    .option('-a, --acceptance <criteria>', 'Acceptance criteria (can be used multiple times)', (value, prev: string[]) => {
      return prev ? [...prev, value] : [value];
    }, [] as string[])
    .option('--details <details>', 'Technical details')
    .option('-p, --provider <provider>', 'Override AI provider for this operation (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .action(async (options: { 
      title?: string; 
      description?: string; 
      acceptance?: string[]; 
      details?: string; 
      provider?: string; 
      workspace?: string 
    }) => {
      try {
        if (!options.title) {
          Logger.error('Issue title is required');
          process.exit(1);
        }

        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace
        });

        // Create issue with additional parameters (but simplified for now)
        const issueNumber = await agent.createIssue(options.title);
        
        // Update status tracking
        const fs = await import('fs/promises');
        const path = await import('path');
        const statusFile = path.join(options.workspace ?? process.cwd(), '.autoagent', 'status.json');
        
        // Ensure .autoagent directory exists
        await fs.mkdir(path.dirname(statusFile), { recursive: true });
        
        // Load existing status data
        let statusData: Record<string, any> = {};
        try {
          const statusContent = await fs.readFile(statusFile, 'utf-8');
          statusData = JSON.parse(statusContent);
        } catch {
          // File doesn't exist or is invalid, start fresh
        }
        
        // Add new issue to status
        const issueKey = options.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        statusData[issueKey] = {
          status: 'pending',
          issueNumber: issueNumber,
          title: options.title,
          createdAt: new Date().toISOString()
        };
        
        // Write updated status
        await fs.writeFile(statusFile, JSON.stringify(statusData, null, 2), 'utf-8');
        
        Logger.success(`Created issue #${issueNumber}: ${options.title}`);
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}