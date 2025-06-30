#!/usr/bin/env node

/**
 * Configuration Example
 * 
 * This example demonstrates various configuration options and how to
 * customize AutoAgent behavior for different use cases.
 */

const { AutonomousAgent, FileManager, ConfigManager } = require('autoagent-cli');
const path = require('path');

async function configurationExamples() {
  const workingDir = process.cwd();
  const fileManager = new FileManager(workingDir);
  const configManager = new ConfigManager(workingDir);

  console.log('=== AutoAgent Configuration Examples ===\n');

  // Example 1: Basic Configuration
  console.log('1. Basic Configuration Setup:');
  console.log('─'.repeat(40));
  
  await configManager.updateConfig({
    providers: ['claude', 'gemini'],
    defaultProvider: 'claude',
    failoverDelay: 3000,
    retryAttempts: 2,
    maxTokens: 100000,
    logLevel: 'info'
  });
  
  const basicConfig = configManager.getConfig();
  console.log('Default Provider:', basicConfig.defaultProvider);
  console.log('Retry Attempts:', basicConfig.retryAttempts);
  console.log('Log Level:', basicConfig.logLevel);

  // Example 2: Git Configuration
  console.log('\n2. Git Integration Configuration:');
  console.log('─'.repeat(40));
  
  await configManager.updateConfig({
    gitAutoCommit: true,
    gitCommitInterval: 3,
    includeCoAuthoredBy: true,
    enableRollback: true
  });
  
  console.log('Auto-commit enabled:', configManager.getConfig().gitAutoCommit);
  console.log('Commit interval:', configManager.getConfig().gitCommitInterval, 'issues');
  console.log('Co-authorship:', configManager.getConfig().includeCoAuthoredBy ? 'Enabled' : 'Disabled');

  // Example 3: Rate Limit Configuration
  console.log('\n3. Rate Limit Management:');
  console.log('─'.repeat(40));
  
  await configManager.updateConfig({
    rateLimitCooldown: 7200 // 2 hours
  });
  
  // Check provider availability
  const providers = ['claude', 'gemini'];
  for (const provider of providers) {
    const available = await configManager.isProviderAvailable(provider);
    const status = available ? '✅ Available' : '❌ Rate Limited';
    console.log(`${provider}: ${status}`);
    
    if (!available) {
      const resetTime = await configManager.getRateLimitResetTime(provider);
      console.log(`  Reset at: ${new Date(resetTime).toLocaleTimeString()}`);
    }
  }

  // Example 4: Custom Instructions
  console.log('\n4. Custom Provider Instructions:');
  console.log('─'.repeat(40));
  
  const customInstructions = `
## Project-Specific Guidelines
- Always use TypeScript strict mode
- Follow the existing code style
- Write comprehensive tests for new features
- Update documentation when changing APIs
`;

  await configManager.updateConfig({
    customInstructions: customInstructions.trim()
  });
  
  console.log('Custom instructions configured ✅');
  console.log('These will be appended to provider instruction files');

  // Example 5: Environment-Based Configuration
  console.log('\n5. Environment-Based Configuration:');
  console.log('─'.repeat(40));
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isCI = process.env.CI === 'true';
  
  if (isDevelopment) {
    await configManager.updateConfig({
      logLevel: 'debug',
      dryRun: true, // Safe mode in development
      gitAutoCommit: false
    });
    console.log('Development configuration applied');
  }
  
  if (isCI) {
    await configManager.updateConfig({
      providers: ['gemini'], // Use only Gemini in CI
      retryAttempts: 1,
      failoverDelay: 1000
    });
    console.log('CI configuration applied');
  }

  // Example 6: Creating Scoped Configurations
  console.log('\n6. Scoped Configuration (Global vs Local):');
  console.log('─'.repeat(40));
  
  // Update global configuration
  await configManager.updateConfig({
    defaultProvider: 'claude'
  }, 'global');
  console.log('Global default provider: claude');
  
  // Update local configuration (overrides global)
  await configManager.updateConfig({
    defaultProvider: 'gemini'
  }, 'local');
  console.log('Local default provider: gemini (overrides global)');
  
  // Show effective configuration
  const effectiveConfig = configManager.getConfig();
  console.log('Effective default provider:', effectiveConfig.defaultProvider);

  // Example 7: Configuration with Agent
  console.log('\n7. Using Configuration with Agent:');
  console.log('─'.repeat(40));
  
  const agent = new AutonomousAgent(fileManager, configManager);
  
  // The agent automatically uses the configuration
  console.log('Agent initialized with configuration ✅');
  
  // You can still override configuration per execution
  const result = await agent.executeNext({
    provider: 'gemini', // Override default provider
    dryRun: true,       // Override configuration
    maxTokens: 150000,  // Override token limit
    onProgress: (percentage, message) => {
      console.log(`[${percentage}%] ${message}`);
    }
  });
  
  console.log('\nExecution completed with overrides');
}

// Configuration validation example
async function validateConfiguration() {
  console.log('\n=== Configuration Validation ===\n');
  
  const configManager = new ConfigManager(process.cwd());
  const config = configManager.getConfig();
  
  const issues = [];
  
  // Validate providers
  if (!config.providers || config.providers.length === 0) {
    issues.push('No providers configured');
  }
  
  // Validate default provider
  if (config.defaultProvider && !config.providers.includes(config.defaultProvider)) {
    issues.push(`Default provider '${config.defaultProvider}' not in providers list`);
  }
  
  // Validate numeric values
  if (config.retryAttempts < 0 || config.retryAttempts > 10) {
    issues.push('Retry attempts should be between 0 and 10');
  }
  
  if (config.maxTokens < 1000) {
    issues.push('Max tokens should be at least 1000');
  }
  
  if (issues.length > 0) {
    console.log('❌ Configuration Issues Found:');
    issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue}`);
    });
  } else {
    console.log('✅ Configuration is valid');
  }
  
  return issues.length === 0;
}

// Main execution
if (require.main === module) {
  (async () => {
    await configurationExamples();
    await validateConfiguration();
  })().catch(console.error);
}

module.exports = { configurationExamples, validateConfiguration };