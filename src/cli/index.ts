#!/usr/bin/env node

import { Command } from 'commander';
import { AutonomousAgent } from '../core/autonomous-agent';
import { createProvider } from '../providers';
import { ConfigManager } from '../core/config-manager';
import { Logger } from '../utils/logger';
import { ProviderName } from '../types';
import chalk from 'chalk';
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
      Logger.success(`Configuration initialized ${options.global ? 'globally' : 'locally'}`);
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
      if (options.provider) {
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
        console.log(chalk.yellow('\n⚠️  Cancelling operation...'));
        abortController.abort();
      });
      
      const agent = new AutonomousAgent({
        provider: options.provider as ProviderName | undefined,
        workspace: options.workspace,
        debug: options.debug,
        autoCommit: options.commit !== undefined ? options.commit : undefined,
        includeCoAuthoredBy: options.coAuthor !== undefined ? options.coAuthor : undefined,
        dryRun: options.dryRun,
        signal: abortController.signal
      });

      if (options.all) {
        await agent.executeAll();
      } else {
        await agent.executeNext();
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
      console.log(`Total Issues:     ${status.totalIssues}`);
      console.log(`Completed:        ${status.completedIssues}`);
      console.log(`Pending:          ${status.pendingIssues}`);

      if (status.currentIssue) {
        console.log(`\nNext Issue:       #${status.currentIssue.number}: ${status.currentIssue.title}`);
      }

      if (status.availableProviders?.length) {
        console.log(`\n✅ Available Providers: ${status.availableProviders.join(', ')}`);
      }
      if (status.rateLimitedProviders?.length) {
        console.log(`⏱️  Rate Limited: ${status.rateLimitedProviders.join(', ')}`);
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
      if (options.provider) {
        const provider = createProvider(options.provider as ProviderName);
        const available = await provider.checkAvailability();

        if (available) {
          Logger.success(`${provider.name} is available`);
        } else {
          Logger.error(`${provider.name} is not available`);
          Logger.warning(`Install from: https://${provider.name}.ai/code`);
        }
      } else {
        const providers = ['claude', 'gemini'];
        Logger.info('\n🔍 Checking all providers...\n');

        for (const providerName of providers) {
          const provider = createProvider(providerName as 'claude' | 'gemini');
          const available = await provider.checkAvailability();

          if (available) {
            Logger.success(`${provider.name} is available`);
          } else {
            Logger.error(`${provider.name} is not available`);
          }
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

      const masterPlanPath = planFile || 'master-plan.md';

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