import { Command } from 'commander';
import { ConfigManager } from '../../core/config-manager';
import { Logger } from '../../utils/logger';
import { ProviderName, UserConfig } from '../../types';
import * as fs from 'fs/promises';
import * as path from 'path';


export function registerConfigCommand(program: Command): void {
  const config = program
    .command('config')
    .description('Manage configuration');

  // Get configuration value(s)
  config
    .command('get [key]')
    .description('Get configuration value(s)')
    .option('--show-source', 'Show the source of each configuration value')
    .action(async (key?: string, options?: { showSource?: boolean }) => {
      try {
        const configManager = new ConfigManager();
        
        // Check for corrupted JSON in config files before loading
        const localConfigPath = path.join(process.cwd(), '.autoagent', 'config.json');
        let hasCorruptedJson = false;
        try {
          const content = await fs.readFile(localConfigPath, 'utf-8');
          JSON.parse(content); // This will throw if JSON is invalid
        } catch (error) {
          if (error instanceof SyntaxError) {
            hasCorruptedJson = true;
          }
          // File doesn't exist or other errors, which is fine
        }
        
        if (hasCorruptedJson) {
          Logger.error('Failed to parse configuration');
          process.exit(1);
        }
        
        await configManager.loadConfig();
        const currentConfig = configManager.getConfig();
        
        if (key !== null && key !== undefined && key.length > 0) {
          const value: unknown = getConfigValue(key, currentConfig);
          const envValue: unknown = getEnvValue(key);
          const displayValue = envValue !== undefined ? envValue : value;
          
          if (displayValue === undefined) {
            Logger.error(`Unknown configuration key: ${key}`);
            process.exit(1);
          }
          
          let output = `${key}: ${displayValue !== null ? String(displayValue) : 'undefined'}`;
          if (options?.showSource === true) {
            const source = envValue !== undefined ? 'environment' : 'local';
            output += ` (${source})`;
          }
          Logger.info(output);
        } else {
          // Show all config values
          const allKeys = Object.keys(currentConfig);
          for (const k of allKeys) {
            const value: unknown = getConfigValue(k, currentConfig);
            const envValue: unknown = getEnvValue(k);
            const displayValue = envValue !== undefined ? envValue : value;
            
            let output = `${k}: ${displayValue !== null ? String(displayValue) : 'undefined'}`;
            if (options?.showSource === true) {
              const source = envValue !== undefined ? 'environment' : 'local';
              output += ` (${source})`;
            }
            Logger.info(output);
          }
        }
      } catch (error) {
        // Don't double-log JSON errors that were already handled
        if (!(error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON')))) {
          Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        }
        process.exit(1);
      }
    });

  // Set configuration value
  config
    .command('set <key> <value>')
    .description('Set configuration value')
    .option('-g, --global', 'Set in global configuration')
    .action(async (key: string, value: string, options: { global?: boolean }) => {
      try {
        const configManager = new ConfigManager();
        try {
          await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
        
        // Validate the key and value
        const validatedValue: unknown = validateConfigValue(key, value);
        
        const updates: Partial<UserConfig> = {};
        setConfigValue(key, validatedValue, updates);
        
        try {
          await configManager.updateConfig(updates, options.global === true ? 'global' : 'local');
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code === 'EACCES' || (error as NodeJS.ErrnoException).code === 'EPERM') {
            Logger.error('Permission denied: Cannot write to configuration file');
            process.exit(1);
          }
          throw error;
        }
        Logger.success(`Configuration updated: ${key} = ${value}`);
      } catch (error) {
        // Don't double-log errors that were already handled
        const isJsonError = error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'));
        const isPermissionError = (error as NodeJS.ErrnoException).code === 'EACCES' || (error as NodeJS.ErrnoException).code === 'EPERM';
        if (!isJsonError && !isPermissionError) {
          Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        }
        process.exit(1);
      }
    });

  // Reset configuration
  config
    .command('reset')
    .description('Reset configuration to defaults')
    .option('-g, --global', 'Reset global configuration')
    .action(async (options: { global?: boolean }) => {
      try {
        const configPath = options.global === true
          ? ((): string => {
              const homeDir = process.env.HOME;
              if (homeDir === null || homeDir === undefined || homeDir.length === 0) {
                throw new Error('HOME environment variable not found');
              }
              return path.join(homeDir, '.autoagent', 'config.json');
            })()
          : path.join(process.cwd(), '.autoagent', 'config.json');
        
        try {
          await fs.unlink(configPath);
          Logger.success(`Configuration reset ${options.global === true ? 'globally' : 'locally'}`);
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            throw error;
          }
          Logger.info('No configuration file to reset');
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });

  // Export configuration
  config
    .command('export <filename>')
    .description('Export configuration to file')
    .action(async (filename: string) => {
      try {
        const configManager = new ConfigManager();
        try {
          await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
        const currentConfig = configManager.getConfig();
        
        const exportPath = path.resolve(process.cwd(), filename);
        await fs.writeFile(exportPath, JSON.stringify(currentConfig, null, 2));
        
        Logger.success(`Configuration exported to ${filename}`);
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });

  // Import configuration
  config
    .command('import <filename>')
    .description('Import configuration from file')
    .option('-g, --global', 'Import to global configuration')
    .action(async (filename: string, options: { global?: boolean }) => {
      try {
        const configManager = new ConfigManager();
        const importPath = path.resolve(process.cwd(), filename);
        
        const content = await fs.readFile(importPath, 'utf-8');
        const importedConfig = JSON.parse(content) as UserConfig;
        
        // Validate all imported values
        for (const [key, value] of Object.entries(importedConfig)) {
          validateConfigValue(key, String(value));
        }
        
        await configManager.saveConfig(importedConfig, options.global);
        Logger.success(`Configuration imported from ${filename}`);
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });

  // Legacy commands for backward compatibility
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
        try {
          await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
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
        try {
          await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
        await configManager.setFailoverProviders(providers, options.global);
        Logger.success(`Failover providers set to: ${providers.join(', ')}`);
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });

  config
    .command('set-auto-commit <enabled>')
    .description('Enable or disable automatic git commits via hooks (true/false)')
    .option('-g, --global', 'Set globally')
    .action(async (enabled: string, options: { global?: boolean }) => {
      try {
        const configManager = new ConfigManager();
        let userConfig;
        try {
          userConfig = await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
        
        // Initialize hooks if not present
        if (!userConfig.hooks) {
          userConfig.hooks = {};
        }
        
        const hookPoint = 'PostExecutionEnd';
        const gitCommitHook = {
          type: 'git-commit' as const,
          message: 'Complete issue from {{issueFile}}'
        };
        
        if (enabled === 'true') {
          // Add git-commit hook to PostExecutionEnd
          if (!userConfig.hooks[hookPoint]) {
            userConfig.hooks[hookPoint] = [];
          }
          
          // Check if git-commit hook already exists
          const existingCommitHook = userConfig.hooks[hookPoint].find(h => h.type === 'git-commit');
          if (!existingCommitHook) {
            userConfig.hooks[hookPoint].push(gitCommitHook);
          }
          
          Logger.success('✅ Auto-commit enabled via git-commit hook');
          Logger.info('ℹ️  Git commits will be created after each successful execution');
        } else {
          // Remove all git-commit hooks from PostExecutionEnd
          if (userConfig.hooks[hookPoint]) {
            userConfig.hooks[hookPoint] = userConfig.hooks[hookPoint].filter(h => h.type !== 'git-commit');
            
            // Clean up empty arrays
            if (userConfig.hooks[hookPoint].length === 0) {
              delete userConfig.hooks[hookPoint];
            }
          }
          
          Logger.success('✅ Auto-commit disabled');
          Logger.info('ℹ️  Git commits will not be created automatically');
        }
        
        await configManager.saveConfig(userConfig, options.global);
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
        let userConfig;
        try {
          userConfig = await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
        userConfig.includeCoAuthoredBy = enabled === 'true';
        await configManager.saveConfig(userConfig, options.global);
        Logger.success(`Co-authorship ${userConfig.includeCoAuthoredBy ? 'enabled' : 'disabled'}`);
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });

  config
    .command('set-git-no-verify <value>')
    .description('Skip git pre-commit and commit-msg hooks when committing (true/false)')
    .option('-g, --global', 'Set globally')
    .action(async (value: string, options: { global?: boolean }) => {
      try {
        const configManager = new ConfigManager();
        let userConfig;
        try {
          userConfig = await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
        
        // Parse and validate boolean value (case-insensitive)
        const normalizedValue = value.toLowerCase();
        if (normalizedValue !== 'true' && normalizedValue !== 'false') {
          Logger.error('Invalid value: must be "true" or "false"');
          process.exit(1);
        }
        
        const noVerify = normalizedValue === 'true';
        
        // Initialize hooks if not present
        if (!userConfig.hooks) {
          userConfig.hooks = {};
        }
        
        // Update all git-commit hooks to set noVerify property
        for (const hookPoint in userConfig.hooks) {
          const hooks = userConfig.hooks[hookPoint];
          if (Array.isArray(hooks)) {
            for (const hook of hooks) {
              if (hook.type === 'git-commit') {
                hook.noVerify = noVerify;
              }
            }
          }
        }
        
        await configManager.saveConfig(userConfig, options.global);
        
        Logger.success(`Git hooks ${noVerify ? 'disabled (--no-verify)' : 'enabled'} for commits`);
        Logger.info(noVerify 
          ? 'ℹ️  Pre-commit and commit-msg hooks will be skipped when AutoAgent commits'
          : 'ℹ️  Pre-commit and commit-msg hooks will run when AutoAgent commits');
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });

  config
    .command('set-auto-push <value>')
    .description('Enable or disable automatic git push via hooks (true/false)')
    .option('-g, --global', 'Set globally')
    .action(async (value: string, options: { global?: boolean }) => {
      try {
        const configManager = new ConfigManager();
        let userConfig;
        try {
          userConfig = await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
        
        // Parse and validate boolean value (case-insensitive)
        const normalizedValue = value.toLowerCase();
        if (normalizedValue !== 'true' && normalizedValue !== 'false') {
          Logger.error('Invalid value: must be "true" or "false"');
          process.exit(1);
        }
        
        // Initialize hooks if not present
        if (!userConfig.hooks) {
          userConfig.hooks = {};
        }
        
        const hookPoint = 'PostExecutionEnd';
        const gitPushHook = {
          type: 'git-push' as const,
          remote: 'origin'
        };
        
        const autoPush = normalizedValue === 'true';
        
        if (autoPush) {
          // Add git-push hook to PostExecutionEnd
          if (!userConfig.hooks[hookPoint]) {
            userConfig.hooks[hookPoint] = [];
          }
          
          // Check if git-push hook already exists
          const existingPushHook = userConfig.hooks[hookPoint].find(h => h.type === 'git-push');
          if (!existingPushHook) {
            userConfig.hooks[hookPoint].push(gitPushHook);
          }
          
          Logger.success('✅ Auto-push enabled via git-push hook');
          Logger.info('ℹ️  Git commits will automatically be pushed to the remote repository');
          Logger.warning('Make sure you have a git remote configured with proper permissions');
        } else {
          // Remove all git-push hooks from PostExecutionEnd
          if (userConfig.hooks[hookPoint]) {
            userConfig.hooks[hookPoint] = userConfig.hooks[hookPoint].filter(h => h.type !== 'git-push');
            
            // Clean up empty arrays
            if (userConfig.hooks[hookPoint].length === 0) {
              delete userConfig.hooks[hookPoint];
            }
          }
          
          Logger.success('✅ Auto-push disabled');
          Logger.info('ℹ️  Git commits will not be pushed automatically');
        }
        
        await configManager.saveConfig(userConfig, options.global);
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });

  config
    .command('set-push-remote <remote>')
    .description('Set the git remote for git-push hooks')
    .option('-g, --global', 'Set globally')
    .action(async (remote: string, options: { global?: boolean }) => {
      try {
        const configManager = new ConfigManager();
        let userConfig;
        try {
          userConfig = await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
        
        // Update all git-push hooks with the new remote
        let hooksUpdated = 0;
        if (userConfig.hooks) {
          for (const hookPoint of Object.keys(userConfig.hooks)) {
            const hooks = userConfig.hooks[hookPoint];
            if (hooks) {
              for (const hook of hooks) {
                if (hook.type === 'git-push') {
                  hook.remote = remote;
                  hooksUpdated++;
                }
              }
            }
          }
        }
        
        await configManager.saveConfig(userConfig, options.global);
        
        Logger.success(`✅ Push remote set to: ${remote}`);
        if (hooksUpdated > 0) {
          Logger.info(`ℹ️  Updated ${hooksUpdated} git-push hook${hooksUpdated > 1 ? 's' : ''} to use '${remote}' remote`);
        } else {
          Logger.info('ℹ️  No git-push hooks found. Run \'autoagent config set-auto-push true\' to enable auto-push');
        }
        Logger.info('ℹ️  Make sure this remote exists in your git repository');
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
        try {
          await configManager.loadConfig();
        } catch (error) {
          if (error instanceof SyntaxError || (error instanceof Error && error.message.includes('JSON'))) {
            Logger.error('Failed to parse configuration');
            process.exit(1);
          }
          throw error;
        }
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

function getConfigValue(key: string, config: UserConfig): unknown {
  switch (key) {
    case 'provider':
      return config.providers?.[0];
    case 'providers':
      return config.providers;
    case 'verbose':
      return config.logLevel === 'debug';
    case 'logLevel':
      return config.logLevel;
    case 'maxTokens':
      return config.maxTokens;
    case 'retryAttempts':
      return config.retryAttempts;
    case 'failoverDelay':
      return config.failoverDelay;
    case 'includeCoAuthoredBy':
      return config.includeCoAuthoredBy;
    case 'customInstructions':
      return config.customInstructions;
    case 'rateLimitCooldown':
      return config.rateLimitCooldown;
    case 'hooks':
      return config.hooks;
    case 'strictCompletion':
      return config.strictCompletion;
    case 'completionConfidence':
      return config.completionConfidence;
    case 'ignoreToolFailures':
      return config.ignoreToolFailures;
    case 'maxRetryAttempts':
      return config.maxRetryAttempts;
    default:
      return undefined;
  }
}

function setConfigValue(key: string, value: unknown, updates: Partial<UserConfig>): void {
  switch (key) {
    case 'provider':
      updates.providers = [value as ProviderName];
      break;
    case 'providers':
      updates.providers = value as ProviderName[];
      break;
    case 'verbose':
      updates.logLevel = Boolean(value) === true ? 'debug' : 'info';
      break;
    case 'logLevel':
      updates.logLevel = value as 'debug' | 'info' | 'warn' | 'error';
      break;
    case 'maxTokens':
      updates.maxTokens = value as number;
      break;
    case 'retryAttempts':
      updates.retryAttempts = value as number;
      break;
    case 'failoverDelay':
      updates.failoverDelay = value as number;
      break;
    case 'includeCoAuthoredBy':
      updates.includeCoAuthoredBy = value as boolean;
      break;
    case 'customInstructions':
      updates.customInstructions = value as string;
      break;
    case 'rateLimitCooldown':
      updates.rateLimitCooldown = value as number;
      break;
    case 'strictCompletion':
      updates.strictCompletion = value as boolean;
      break;
    case 'completionConfidence':
      updates.completionConfidence = value as number;
      break;
    case 'ignoreToolFailures':
      updates.ignoreToolFailures = value as boolean;
      break;
    case 'maxRetryAttempts':
      updates.maxRetryAttempts = value as number;
      break;
    default:
      throw new Error(`Unknown configuration key: ${key}`);
  }
}

function getEnvValue(key: string): unknown {
  const envMap: Record<string, string> = {
    'verbose': 'AUTOAGENT_VERBOSE',
    'provider': 'AUTOAGENT_PROVIDER',
    'logLevel': 'AUTOAGENT_LOG_LEVEL',
    'maxTokens': 'AUTOAGENT_MAX_TOKENS',
    'retryAttempts': 'AUTOAGENT_RETRY_ATTEMPTS',
    'failoverDelay': 'AUTOAGENT_FAILOVER_DELAY',
    'includeCoAuthoredBy': 'AUTOAGENT_INCLUDE_CO_AUTHORED_BY',
    'customInstructions': 'AUTOAGENT_CUSTOM_INSTRUCTIONS',
    'rateLimitCooldown': 'AUTOAGENT_RATE_LIMIT_COOLDOWN',
    'strictCompletion': 'AUTOAGENT_STRICT_COMPLETION',
    'completionConfidence': 'AUTOAGENT_COMPLETION_CONFIDENCE',
    'ignoreToolFailures': 'AUTOAGENT_IGNORE_TOOL_FAILURES',
    'maxRetryAttempts': 'AUTOAGENT_MAX_RETRY_ATTEMPTS'
  };

  const envKey = envMap[key];
  if (envKey === null || envKey === undefined || envKey.length === 0 || process.env[envKey] === null || process.env[envKey] === undefined || process.env[envKey] === '') {
    return undefined;
  }

  const envValue = process.env[envKey];
  
  // Parse boolean values
  if (key === 'verbose' || key === 'includeCoAuthoredBy' || key === 'strictCompletion' || 
      key === 'ignoreToolFailures') {
    return envValue === 'true';
  }
  
  // Parse number values
  if (key === 'maxTokens' || key === 'retryAttempts' || key === 'failoverDelay' || 
      key === 'rateLimitCooldown' || key === 'completionConfidence' || key === 'maxRetryAttempts') {
    return parseInt(envValue, 10);
  }
  
  return envValue;
}

function validateConfigValue(key: string, value: string): unknown {
  switch (key) {
    case 'provider':
      if (!['claude', 'gemini'].includes(value)) {
        throw new Error(`Invalid value for provider: ${value}. Must be 'claude' or 'gemini'`);
      }
      return value;
    
    case 'verbose':
    case 'includeCoAuthoredBy':
    case 'strictCompletion':
    case 'ignoreToolFailures':
      if (!['true', 'false'].includes(value)) {
        throw new Error(`Invalid value for ${key}: ${value}. Value must be boolean (true/false)`);
      }
      return value === 'true';
    
    case 'logLevel':
      if (!['debug', 'info', 'warn', 'error'].includes(value)) {
        throw new Error(`Invalid value for logLevel: ${value}. Must be one of: debug, info, warn, error`);
      }
      return value;
    
    case 'maxTokens':
    case 'retryAttempts':
    case 'failoverDelay':
    case 'rateLimitCooldown':
    case 'maxRetryAttempts': {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 0) {
        throw new Error(`Invalid value for ${key}: ${value}. Must be a positive number`);
      }
      return num;
    }
    
    case 'completionConfidence': {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 0 || num > 100) {
        throw new Error(`Invalid value for completionConfidence: ${value}. Must be a number between 0 and 100`);
      }
      return num;
    }
    
    case 'customInstructions':
      return value;
    
    default:
      throw new Error(`Unknown configuration key: ${key}`);
  }
}