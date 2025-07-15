import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { UserConfig, ProviderName, RateLimitData } from '../types';
import { Logger } from '../utils/logger';

export class ConfigManager {
  private static readonly DEFAULT_CONFIG: UserConfig = {
    providers: ['claude', 'gemini'],
    failoverDelay: 5000,
    retryAttempts: 3,
    maxTokens: 100000,
    rateLimitCooldown: 3600000, // 1 hour in milliseconds
    logLevel: 'info',
    customInstructions: '',
    additionalDirectories: []
  };

  private static readonly GLOBAL_CONFIG_DIR = path.join(os.homedir(), '.autoagent');
  private static readonly LOCAL_CONFIG_DIR = '.autoagent';
  private static readonly CONFIG_FILE = 'config.json';
  private static readonly RATE_LIMIT_FILE = 'rate-limits.json';

  private config: UserConfig;
  private globalConfigPath: string;
  private localConfigPath: string;
  private globalRateLimitPath: string;
  private localRateLimitPath: string;

  constructor(private readonly workingDir: string = process.cwd()) {
    this.globalConfigPath = path.join(ConfigManager.GLOBAL_CONFIG_DIR, ConfigManager.CONFIG_FILE);
    this.localConfigPath = path.join(this.workingDir, ConfigManager.LOCAL_CONFIG_DIR, ConfigManager.CONFIG_FILE);
    this.globalRateLimitPath = path.join(ConfigManager.GLOBAL_CONFIG_DIR, ConfigManager.RATE_LIMIT_FILE);
    this.localRateLimitPath = path.join(this.workingDir, ConfigManager.LOCAL_CONFIG_DIR, ConfigManager.RATE_LIMIT_FILE);
    this.config = { ...ConfigManager.DEFAULT_CONFIG };
  }

  /**
   * Load configuration from all sources with proper precedence
   */
  async loadConfig(): Promise<UserConfig> {
    // Load global config
    const globalConfig = await this.loadConfigFile(this.globalConfigPath);
    
    // Load local config
    const localConfig = await this.loadConfigFile(this.localConfigPath);
    
    // Merge configurations: defaults < global < local
    this.config = {
      ...ConfigManager.DEFAULT_CONFIG,
      ...globalConfig,
      ...localConfig
    };


    // Debug logging
    if (process.env.AUTOAGENT_DEBUG === 'true') {
      Logger.debug('Configuration loaded:');
      Logger.debug(`  Default providers: ${JSON.stringify(ConfigManager.DEFAULT_CONFIG.providers)}`);
      Logger.debug(`  Global config providers: ${JSON.stringify(globalConfig.providers)}`);
      Logger.debug(`  Local config providers: ${JSON.stringify(localConfig.providers)}`);
      Logger.debug(`  Final providers: ${JSON.stringify(this.config.providers)}`);
    }

    return this.config;
  }

  /**
   * Get the current configuration
   */
  getConfig(): UserConfig {
    return { ...this.config };
  }

  /**
   * Update and save configuration
   */
  async updateConfig(updates: Partial<UserConfig>, scope: 'global' | 'local' = 'local'): Promise<void> {
    const configPath = scope === 'global' ? this.globalConfigPath : this.localConfigPath;
    const currentConfig = await this.loadConfigFile(configPath);
    
    const updatedConfig = {
      ...currentConfig,
      ...updates
    };

    await this.saveConfigFile(configPath, updatedConfig);
    
    // Reload config to update internal state
    await this.loadConfig();
  }

  /**
   * Check if a provider is rate limited
   */
  async isProviderRateLimited(provider: ProviderName): Promise<boolean> {
    const rateLimits = await this.loadRateLimits();
    const providerData = rateLimits[provider];

    if (!providerData || providerData.limitedAt === undefined) {
      return false;
    }

    const timeSinceLimited = Date.now() - providerData.limitedAt;
    const cooldownPeriod = this.config.rateLimitCooldown;

    return timeSinceLimited < cooldownPeriod;
  }

  /**
   * Update rate limit status for a provider
   */
  async updateRateLimit(provider: ProviderName, isLimited: boolean): Promise<void> {
    const rateLimits = await this.loadRateLimits();
    
    if (isLimited) {
      rateLimits[provider] = {
        limitedAt: Date.now(),
        attempts: (rateLimits[provider]?.attempts ?? 0) + 1
      };
    } else {
      // Clear rate limit
      delete rateLimits[provider];
    }

    await this.saveRateLimits(rateLimits);
  }

  /**
   * Get available providers considering rate limits
   */
  async getAvailableProviders(): Promise<ProviderName[]> {
    const availableProviders: ProviderName[] = [];

    for (const provider of this.config.providers) {
      const isRateLimited = await this.isProviderRateLimited(provider);
      if (!isRateLimited) {
        availableProviders.push(provider);
      }
    }

    return availableProviders;
  }

  /**
   * Check rate limit status for a provider
   */
  async checkRateLimit(provider: ProviderName): Promise<{
    isLimited: boolean;
    timeRemaining?: number;
    attempts?: number;
  }> {
    const rateLimits = await this.loadRateLimits();
    const providerData = rateLimits[provider];

    if (!providerData || providerData.limitedAt === undefined) {
      return { isLimited: false };
    }

    const timeSinceLimited = Date.now() - providerData.limitedAt;
    const cooldownPeriod = this.config.rateLimitCooldown;
    const isLimited = timeSinceLimited < cooldownPeriod;

    return {
      isLimited,
      timeRemaining: isLimited ? cooldownPeriod - timeSinceLimited : undefined,
      attempts: providerData.attempts
    };
  }

  /**
   * Load a configuration file
   */
  private async loadConfigFile(filePath: string): Promise<Partial<UserConfig>> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      try {
        const config = JSON.parse(content) as Partial<UserConfig>;
        if (process.env.AUTOAGENT_DEBUG === 'true') {
          Logger.debug(`Loaded config from ${filePath}: ${JSON.stringify(config)}`);
        }
        return config;
      } catch (parseError) {
        // Handle invalid JSON gracefully by returning empty config
        Logger.warning(`Invalid JSON in config file ${filePath}: ${String(parseError)}`);
        return {};
      }
    } catch (error) {
      // Handle file read errors
      if (process.env.AUTOAGENT_DEBUG === 'true') {
        Logger.debug(`Config file not found: ${filePath}`);
      }
      return {};
    }
  }

  /**
   * Save a configuration file
   */
  private async saveConfigFile(filePath: string, config: Partial<UserConfig>): Promise<void> {
    await this.ensureDirectoryExists(path.dirname(filePath));
    try {
      await fs.writeFile(filePath, JSON.stringify(config, null, 2));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'EACCES' || (error as NodeJS.ErrnoException).code === 'EPERM') {
        throw new Error(`Permission denied: Cannot write to ${filePath}`);
      }
      throw error;
    }
  }

  /**
   * Load rate limit data
   */
  private async loadRateLimits(): Promise<Partial<Record<ProviderName, RateLimitData>>> {
    // Try local file first, then global
    try {
      const content = await fs.readFile(this.localRateLimitPath, 'utf-8');
      return JSON.parse(content) as Partial<Record<ProviderName, RateLimitData>>;
    } catch {
      try {
        const content = await fs.readFile(this.globalRateLimitPath, 'utf-8');
        return JSON.parse(content) as Partial<Record<ProviderName, RateLimitData>>;
      } catch {
        return {};
      }
    }
  }

  /**
   * Save rate limit data
   */
  private async saveRateLimits(rateLimits: Partial<Record<ProviderName, RateLimitData>>): Promise<void> {
    // Save to local directory by default
    await this.ensureDirectoryExists(path.dirname(this.localRateLimitPath));
    await fs.writeFile(this.localRateLimitPath, JSON.stringify(rateLimits, null, 2));
  }

  /**
   * Initialize configuration (create default config file)
   */
  async initConfig(global = false): Promise<void> {
    const configPath = global ? this.globalConfigPath : this.localConfigPath;
    await this.ensureDirectoryExists(path.dirname(configPath));
    
    // Check if config already exists
    try {
      await fs.access(configPath);
      throw new Error(`Configuration already exists at ${configPath}`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // File doesn't exist - create it
        await this.saveConfigFile(configPath, ConfigManager.DEFAULT_CONFIG);
      } else {
        throw error;
      }
    }
  }

  /**
   * Set the default provider
   */
  async setProvider(provider: ProviderName, global = false): Promise<void> {
    if (!['claude', 'gemini'].includes(provider)) {
      throw new Error(`Invalid provider: ${provider}. Must be 'claude' or 'gemini'`);
    }
    
    await this.updateConfig({ providers: [provider] }, global ? 'global' : 'local');
  }

  /**
   * Set failover providers
   */
  async setFailoverProviders(providers: string[], global = false): Promise<void> {
    const validProviders = providers.filter(p => ['claude', 'gemini'].includes(p)) as ProviderName[];
    
    if (validProviders.length === 0) {
      throw new Error('No valid providers specified. Valid providers are: claude, gemini');
    }
    
    await this.updateConfig({ providers: validProviders }, global ? 'global' : 'local');
  }

  /**
   * Clear rate limit for a provider
   */
  async clearRateLimit(provider: ProviderName): Promise<void> {
    const rateLimits = await this.loadRateLimits();
    delete rateLimits[provider];
    await this.saveRateLimits(rateLimits);
  }









  /**
   * Save configuration
   */
  async saveConfig(config: UserConfig, global = false): Promise<void> {
    const configPath = global ? this.globalConfigPath : this.localConfigPath;
    await this.saveConfigFile(configPath, config);
    await this.loadConfig(); // Reload to update internal state
  }

  /**
   * Show current configuration
   */
  async showConfig(): Promise<void> {
    await this.loadConfig();
    
    Logger.info('\n📋 Current Configuration:');
    Logger.info('─'.repeat(40));
    
    // Show effective config
    Logger.info('\nEffective Configuration:');
    Logger.info(JSON.stringify(this.config, null, 2));
    
    // Show config sources
    Logger.info('\n📁 Configuration Sources:');
    
    // Check global config
    try {
      const globalConfig = await this.loadConfigFile(this.globalConfigPath);
      if (Object.keys(globalConfig).length > 0) {
        Logger.info(`\nGlobal (${this.globalConfigPath}):`);
        Logger.info(JSON.stringify(globalConfig, null, 2));
      }
    } catch {
      Logger.info('\nGlobal: Not configured');
    }
    
    // Check local config
    try {
      const localConfig = await this.loadConfigFile(this.localConfigPath);
      if (Object.keys(localConfig).length > 0) {
        Logger.info(`\nLocal (${this.localConfigPath}):`);
        Logger.info(JSON.stringify(localConfig, null, 2));
      }
    } catch {
      Logger.info('\nLocal: Not configured');
    }
    
    // Show rate limit status
    Logger.info('\n⏱️  Rate Limit Status:');
    
    for (const provider of ['claude', 'gemini'] as ProviderName[]) {
      const status = await this.checkRateLimit(provider);
      if (status.isLimited === true) {
        const remainingTime = Math.ceil((status.timeRemaining ?? 0) / 1000 / 60);
        Logger.info(`${provider}: Rate limited (${remainingTime} minutes remaining)`);
      } else {
        Logger.info(`${provider}: Not rate limited`);
      }
    }
    
  }

  /**
   * Ensure a directory exists
   */
  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      // Directory already exists or other error
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error;
      }
    }
  }

  /**
   * Resolve and validate additional directories from config and CLI args
   * @param configDirs - Additional directories from config
   * @param cliDirs - Additional directories from CLI args
   * @param basePath - Base path to resolve relative paths against (defaults to working directory)
   * @returns Promise resolving to array of validated absolute directory paths
   */
  async resolveAdditionalDirectories(
    configDirs: string[] = [],
    cliDirs: string[] = [],
    basePath: string = this.workingDir
  ): Promise<string[]> {
    const allDirs = [...configDirs, ...cliDirs];
    const resolvedDirs: string[] = [];

    for (const dir of allDirs) {
      try {
        // Resolve relative paths against base path
        const resolvedPath = path.isAbsolute(dir) ? dir : path.resolve(basePath, dir);
        
        // Validate directory exists
        const stats = await fs.stat(resolvedPath);
        if (!stats.isDirectory()) {
          Logger.error(`Skipping ${dir}: not a directory`);
          continue;
        }

        // Basic security check - prevent access to system directories
        if (this.isSystemDirectory(resolvedPath)) {
          Logger.error(`Skipping ${dir}: system directory access not allowed`);
          continue;
        }

        resolvedDirs.push(resolvedPath);
        Logger.debug(`Added additional directory: ${resolvedPath}`);
      } catch (error) {
        Logger.error(`Skipping ${dir}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return resolvedDirs;
  }

  /**
   * Check if a path is a system directory that should be protected
   * @param dirPath - Directory path to check
   * @returns True if the path is a system directory
   */
  private isSystemDirectory(dirPath: string): boolean {
    const systemDirs = [
      '/etc',
      '/usr',
      '/var',
      '/bin',
      '/sbin',
      '/boot',
      '/root',
      '/sys',
      '/proc',
      '/dev'
    ];

    // Normalize the path
    const normalizedPath = path.resolve(dirPath);
    
    // Check if it starts with any system directory
    return systemDirs.some(sysDir => normalizedPath.startsWith(sysDir + path.sep) || normalizedPath === sysDir);
  }
}