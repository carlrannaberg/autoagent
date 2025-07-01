import { Command } from 'commander';
import { Logger } from '../../utils/logger';
import * as path from 'path';
import * as fs from 'fs';

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a new autoagent project')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .action(async (options: { workspace?: string }) => {
      try {
        const { FileManager } = await import('../../utils/file-manager');
        const workspacePath = options.workspace ?? process.cwd();
        
        // Create project configuration file
        const projectConfigPath = path.join(workspacePath, '.autoagent.json');
        const projectConfig = {
          provider: 'claude',
          autoMode: false,
          verbose: false,
          maxRetries: 3,
          timeout: 300000
        };
        
        // Check if already initialized
        try {
          await fs.promises.access(projectConfigPath);
          Logger.error('Failed: Project already initialized');
          process.exit(1);
        } catch {
          // File doesn't exist, proceed
        }
        
        // Create project config
        await fs.promises.writeFile(projectConfigPath, JSON.stringify(projectConfig, null, 2));
        
        // Create project structure
        const fileManager = new FileManager(workspacePath);
        await fileManager.ensureDirectories();
        await fileManager.createProviderInstructionsIfMissing();
        
        Logger.success('Autoagent project initialized successfully!');
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}