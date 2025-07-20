import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';
import { TaskContent } from '../../types/stm-types';

export function registerCreateCommand(program: Command): void {
  program
    .command('create')
    .description('Create a new task')
    .option('-t, --title <title>', 'Task title')
    .option('-d, --description <description>', 'Task description')
    .option('-a, --acceptance <criteria>', 'Acceptance criteria (can be used multiple times)', (value, prev: string[]) => {
      return Array.isArray(prev) && prev.length > 0 ? [...prev, value] : [value];
    }, [] as string[])
    .option('--details <details>', 'Technical details')
    .option('--plan <plan>', 'Implementation plan')
    .option('--testing <strategy>', 'Testing strategy')
    .option('--tags <tags>', 'Comma-separated tags')
    .option('-p, --provider <provider>', 'Override AI provider for this operation (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory')
    .action(async (options: { 
      title?: string; 
      description?: string; 
      acceptance?: string[]; 
      details?: string;
      plan?: string;
      testing?: string;
      tags?: string;
      provider?: string; 
      workspace?: string 
    }) => {
      try {
        if (options.title === undefined || options.title === '') {
          Logger.error('Task title is required');
          process.exit(1);
        }

        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace
        });

        await agent.initialize();

        // Build task content
        const content: TaskContent = {
          description: options.description !== undefined && options.description !== '' ? options.description : 'No description provided',
          technicalDetails: options.details !== undefined && options.details !== '' ? options.details : '',
          implementationPlan: options.plan !== undefined && options.plan !== '' ? options.plan : '',
          acceptanceCriteria: options.acceptance || [],
          testingStrategy: options.testing,
          tags: options.tags !== undefined && options.tags !== '' ? options.tags.split(',').map(t => t.trim()) : undefined
        };

        // Create task in STM
        const taskId = await agent.createTask(options.title, content);
        
        Logger.success(`✅ Created task: ${taskId}`);
        Logger.info(`Title: ${options.title}`);
        if (content.tags && content.tags.length > 0) {
          Logger.info(`Tags: ${content.tags.join(', ')}`);
        }
        
        Logger.info('\nRun with the task ID to execute:');
        Logger.info(`  autoagent run ${taskId}`);
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}