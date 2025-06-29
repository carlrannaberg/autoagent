#!/usr/bin/env node

/**
 * Provider Failover Example
 * 
 * This example demonstrates how AutoAgent handles provider failover when
 * rate limits are hit or providers are unavailable.
 */

const { AutonomousAgent, FileManager, ConfigManager } = require('autoagent');

async function demonstrateFailover() {
  const workingDir = process.cwd();
  const fileManager = new FileManager(workingDir);
  const configManager = new ConfigManager(workingDir);

  // Configure failover providers
  await configManager.setFailoverProviders(['claude', 'gemini']);
  await configManager.updateConfig({
    failoverDelay: 2000,     // Wait 2 seconds before failover
    retryAttempts: 3,        // Try each provider up to 3 times
    rateLimitCooldown: 3600  // 1 hour cooldown for rate limits
  });

  const agent = new AutonomousAgent(fileManager, configManager);

  // Track provider switches
  const providerSwitches = [];
  agent.on('provider:switch', (data) => {
    console.log(`\n🔄 Provider Switch Detected:`);
    console.log(`   From: ${data.from}`);
    console.log(`   To: ${data.to}`);
    console.log(`   Reason: ${data.reason}`);
    providerSwitches.push(data);
  });

  // Track retry attempts
  agent.on('execution:retry', (data) => {
    console.log(`\n🔁 Retry Attempt ${data.attempt}/${data.maxAttempts}`);
    console.log(`   Provider: ${data.provider}`);
    console.log(`   Reason: ${data.error}`);
  });

  try {
    console.log('Executing issue with automatic failover...\n');

    const result = await agent.executeNext({
      // No specific provider - let failover logic handle it
      onProgress: (percentage, message) => {
        console.log(`[${percentage}%] ${message}`);
      }
    });

    console.log('\n📊 Execution Summary:');
    console.log(`Success: ${result.success}`);
    console.log(`Final Provider: ${result.provider}`);
    console.log(`Provider Switches: ${providerSwitches.length}`);
    
    if (providerSwitches.length > 0) {
      console.log('\nFailover Chain:');
      providerSwitches.forEach((sw, i) => {
        console.log(`  ${i + 1}. ${sw.from} → ${sw.to} (${sw.reason})`);
      });
    }

  } catch (error) {
    console.error('\n❌ All providers failed:', error.message);
    
    // Check rate limit status
    const claudeAvailable = await configManager.isProviderAvailable('claude');
    const geminiAvailable = await configManager.isProviderAvailable('gemini');
    
    console.log('\nProvider Status:');
    console.log(`  Claude: ${claudeAvailable ? '✅ Available' : '❌ Rate Limited'}`);
    console.log(`  Gemini: ${geminiAvailable ? '✅ Available' : '❌ Rate Limited'}`);
  }
}

// Simulate rate limit scenario
async function simulateRateLimit() {
  const configManager = new ConfigManager(process.cwd());
  
  console.log('\n🧪 Simulating rate limit for Claude...');
  await configManager.recordRateLimit('claude');
  
  const available = await configManager.isProviderAvailable('claude');
  console.log(`Claude available: ${available}`);
  
  if (!available) {
    const resetTime = await configManager.getRateLimitResetTime('claude');
    console.log(`Reset time: ${new Date(resetTime).toLocaleString()}`);
  }
}

// Main execution
if (require.main === module) {
  (async () => {
    console.log('=== AutoAgent Provider Failover Example ===\n');
    
    // Optional: simulate rate limit first
    // await simulateRateLimit();
    
    await demonstrateFailover();
  })().catch(console.error);
}

module.exports = { demonstrateFailover, simulateRateLimit };