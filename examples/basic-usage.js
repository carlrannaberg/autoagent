#!/usr/bin/env node

/**
 * Basic Usage Example for AutoAgent
 * 
 * This example demonstrates the basic usage of AutoAgent for executing a single issue.
 * It shows how to set up the agent, handle progress updates, and process results.
 */

const { AutonomousAgent, FileManager, ConfigManager } = require('autoagent');
const path = require('path');

async function main() {
  // Initialize components
  const workingDir = process.cwd();
  const fileManager = new FileManager(workingDir);
  const configManager = new ConfigManager(workingDir);

  // Create the autonomous agent
  const agent = new AutonomousAgent(fileManager, configManager);

  // Handle progress updates
  agent.on('progress', (data) => {
    console.log(`[${data.phase}] ${data.message}`);
    if (data.percentage !== undefined) {
      console.log(`Progress: ${data.percentage}%`);
    }
  });

  // Handle provider switches (useful for debugging)
  agent.on('provider:switch', (data) => {
    console.log(`Switching from ${data.from} to ${data.to}: ${data.reason}`);
  });

  try {
    // Execute the next pending issue
    console.log('Starting AutoAgent...\n');
    
    const result = await agent.executeNext({
      provider: 'claude', // Optional: specify preferred provider
      dryRun: false,      // Set to true to preview without making changes
      onProgress: (percentage, message) => {
        // Alternative way to track progress
        console.log(`${percentage}% - ${message}`);
      }
    });

    if (result.success) {
      console.log('\n✅ Issue completed successfully!');
      console.log(`Issue: ${result.issueNumber} - ${result.issueTitle}`);
      console.log(`Provider: ${result.provider}`);
      console.log(`Duration: ${result.duration}ms`);
      
      if (result.filesModified && result.filesModified.length > 0) {
        console.log(`Files modified: ${result.filesModified.join(', ')}`);
      }
    } else {
      console.error('\n❌ Issue execution failed');
      console.error(`Error: ${result.error}`);
      
      if (result.attempts) {
        console.error(`Attempts made: ${result.attempts}`);
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
    process.exit(1);
  }
}

// Execute the example
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = main;

/* Example Output:

Starting AutoAgent...

[setup] Loading configuration...
[setup] Checking provider availability...
Progress: 10%
[execution] Executing issue #5: Implement file management system
Progress: 50%
[execution] Running provider: claude
Progress: 90%
[completion] Updating issue status...
Progress: 100%

✅ Issue completed successfully!
Issue: 5 - Implement file management system
Provider: claude
Duration: 45230ms
Files modified: src/utils/file-manager.ts, test/file-manager.test.ts

*/