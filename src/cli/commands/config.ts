import { Command } from 'commander';
import { ConfigManager } from '../../core/config-manager';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';

export function registerConfigCommand(program: Command): void {
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
}