import { Command } from 'commander';
import { Logger } from '../../utils/logger';
import { getAvailableProviders } from '../../providers';
import { AutonomousAgent } from '../../core/autonomous-agent';

export function registerListCommand(program: Command): void {
  program
    .command('list <type>')
    .description('List tasks or providers')
    .option('-s, --status <status>', 'Filter by status (for tasks)')
    .option('--json', 'Output in JSON format')
    .option('-w, --workspace <path>', 'Workspace directory')
    .action(async (type: string, options: { status?: string; json?: boolean; workspace?: string }) => {
      try {
        switch (type) {
          case 'tasks':
            await listTasks(options);
            break;
          case 'providers':
            await listProviders(options.json);
            break;
          default:
            Logger.error(`Unknown list type: ${type}. Use 'tasks' or 'providers'.`);
            process.exit(1);
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}

async function listTasks(options: { status?: string; json?: boolean; workspace?: string }): Promise<void> {
  // Validate status parameter first
  if (options.status !== undefined && options.status !== null) {
    const validStatuses = ['pending', 'in-progress', 'done', 'completed'];
    if (!validStatuses.includes(options.status)) {
      Logger.error(`Invalid status: ${options.status}. Valid statuses are: ${validStatuses.join(', ')}`);
      process.exit(1);
    }
  }

  // Create agent to interact with STM
  const agent = new AutonomousAgent({
    workspace: options.workspace
  });

  await agent.initialize();

  // Get tasks from STM
  const tasks = await agent.listTasks(options.status);

  if (tasks.length === 0) {
    if (options.json === true) {
      console.log('[]');
    } else {
      Logger.info(options.status ? `No tasks found with status: ${options.status}` : 'No tasks found');
    }
    return;
  }

  // Output results
  if (options.json === true) {
    console.log(JSON.stringify(tasks, null, 2));
  } else {
    Logger.info(`Found ${tasks.length} task(s):\n`);
    tasks.forEach(task => {
      const statusIcon = task.status === 'completed' || task.status === 'done' ? '✅' : 
                        task.status === 'in-progress' || task.status === 'in_progress' ? '🔄' : '⏳';
      Logger.info(`  ${statusIcon} ${task.id}: ${task.title} (${task.status})`);
    });
  }
}

async function listProviders(json?: boolean): Promise<void> {
  const availableProviders = await getAvailableProviders();
  const allProviders = ['claude', 'gemini'];

  if (json === true) {
    const providersInfo = allProviders.map(name => ({
      name,
      available: availableProviders.includes(name)
    }));
    console.log(JSON.stringify(providersInfo, null, 2));
  } else {
    Logger.info('AI Providers:\n');
    allProviders.forEach(name => {
      const available = availableProviders.includes(name);
      const status = available ? '✅ Available' : '❌ Not installed';
      Logger.info(`  ${name}: ${status}`);
    });
  }
}