#!/usr/bin/env node

import { Command } from 'commander';
import { AutonomousAgent } from '../core/autonomous-agent';
import { createProvider } from '../providers';
import { ConfigManager } from '../core/config-manager';
import { Logger } from '../utils/logger';
import { ProviderName } from '../types';
import * as path from 'path';
import * as fs from 'fs';

interface PackageJson {
  version: string;
}

const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson;

const program = new Command();

program
  .name('autoagent')
  .description('Run autonomous AI agents for task execution')
  .version(packageJson.version);

// Config command group
const config = program
  .command('config')
  .description('Manage configuration');

config
  .command('init')
  .description('Initialize configuration')
  .option('-g, --global', 'Initialize global configuration')
  .action(async (options: { global?: boolean }) => {
    try {
      const configManager = new ConfigManager();
      await configManager.initConfig(options.global);
      Logger.success(`Configuration initialized ${options.global === true ? 'globally' : 'locally'}`);
    } catch (error) {
      Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

config
  .command('set-provider <provider>')
  .description('Set default AI provider (claude or gemini)')
  .option('-g, --global', 'Set globally')
  .action(async (provider: string, options: { global?: boolean }) => {
    try {
      const configManager = new ConfigManager();
      await configManager.setProvider(provider as ProviderName, options.global);
      Logger.success(`Default provider set to ${provider}`);
    } catch (error) {
      Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

config
  .command('set-failover <providers...>')
  .description('Set failover providers in order of preference')
  .option('-g, --global', 'Set globally')
  .action(async (providers: string[], options: { global?: boolean }) => {
    try {
      const configManager = new ConfigManager();
      await configManager.setFailoverProviders(providers, options.global);
      Logger.success(`Failover providers set to: ${providers.join(', ')}`);
    } catch (error) {
      Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

config
  .command('set-auto-commit <enabled>')
  .description('Enable or disable automatic git commits (true/false)')
  .option('-g, --global', 'Set globally')
  .action(async (enabled: string, options: { global?: boolean }) => {
    try {
      const configManager = new ConfigManager();
      const userConfig = await configManager.loadConfig();
      userConfig.gitAutoCommit = enabled === 'true';
      await configManager.saveConfig(userConfig, options.global);
      Logger.success(`Auto-commit ${userConfig.gitAutoCommit ? 'enabled' : 'disabled'}`);
    } catch (error) {
      Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

config
  .command('set-co-authored-by <enabled>')
  .description('Include AI co-authorship in commits (true/false)')
  .option('-g, --global', 'Set globally')
  .action(async (enabled: string, options: { global?: boolean }) => {
    try {
      const configManager = new ConfigManager();
      const userConfig = await configManager.loadConfig();
      userConfig.includeCoAuthoredBy = enabled === 'true';
      await configManager.saveConfig(userConfig, options.global);
      Logger.success(`Co-authorship ${userConfig.includeCoAuthoredBy ? 'enabled' : 'disabled'}`);
    } catch (error) {
      Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

config
  .command('show')
  .description('Show current configuration')
  .action(async () => {
    try {
      const configManager = new ConfigManager();
      await configManager.showConfig();
    } catch (error) {
      Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

config
  .command('clear-limits')
  .description('Clear rate limit records')
  .option('-p, --provider <provider>', 'Clear specific provider')
  .action(async (options: { provider?: string }) => {
    try {
      const configManager = new ConfigManager();
      if (options.provider !== undefined && options.provider !== '') {
        await configManager.clearRateLimit(options.provider as 'claude' | 'gemini');
        Logger.success(`Rate limit cleared for ${options.provider}`);
      } else {
        await configManager.clearRateLimit('claude');
        await configManager.clearRateLimit('gemini');
        Logger.success('All rate limits cleared');
      }
    } catch (error) {
      Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new autoagent project')
  .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
  .action(async (options: { workspace?: string }) => {
    try {
      const { FileManager } = await import('../utils/file-manager');
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
  .action(async (options: { all?: boolean; provider?: string; workspace?: string; debug?: boolean; commit?: boolean; coAuthor?: boolean; dryRun?: boolean }) => {
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

program
  .command('check')
  .description('Check provider availability')
  .option('-p, --provider <provider>', 'AI provider to check')
  .action(async (options: { provider?: string }) => {
    try {
      if (options.provider !== undefined && options.provider !== '') {
        const provider = createProvider(options.provider as ProviderName);
        const available = await provider.checkAvailability();

        Logger.info(`\n🔍 Checking ${provider.name} CLI...\n`);
        
        if (available) {
          Logger.success(`${provider.name} CLI is installed`);
        } else {
          Logger.error(`${provider.name} CLI is not installed`);
          Logger.newline();
          Logger.info(`💡 To install ${provider.name} CLI:`);
          if (provider.name === 'claude') {
            Logger.info('   Visit: https://claude.ai/code');
          } else {
            Logger.info('   Visit: https://ai.google.dev/gemini-api/docs/quickstart');
          }
        }
      } else {
        const providers = ['claude', 'gemini'];
        Logger.info('\n🔍 Checking provider CLI tools...\n');

        let anyAvailable = false;
        for (const providerName of providers) {
          const provider = createProvider(providerName as 'claude' | 'gemini');
          const available = await provider.checkAvailability();

          if (available) {
            Logger.success(`${provider.name} CLI is installed`);
            anyAvailable = true;
          } else {
            Logger.error(`${provider.name} CLI is not installed`);
          }
        }

        if (!anyAvailable) {
          Logger.newline();
          Logger.info('💡 To install provider CLIs:');
          Logger.info('   Claude: https://claude.ai/code');
          Logger.info('   Gemini: https://ai.google.dev/gemini-api/docs/quickstart');
        }
      }
    } catch (error) {
      Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

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

program.parse();