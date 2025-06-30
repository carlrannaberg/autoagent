#!/usr/bin/env node

/**
 * Batch Execution Example
 * 
 * This example shows how to execute multiple issues in sequence with
 * progress tracking, cancellation support, and summary reporting.
 */

const { AutonomousAgent, FileManager, ConfigManager } = require('autoagent-cli');
const readline = require('readline');

async function batchExecution() {
  const workingDir = process.cwd();
  const fileManager = new FileManager(workingDir);
  const configManager = new ConfigManager(workingDir);
  
  // Enable auto-commit for batch operations
  await configManager.updateConfig({
    gitAutoCommit: true,
    gitCommitInterval: 5, // Commit every 5 issues
    includeCoAuthoredBy: true
  });

  const agent = new AutonomousAgent(fileManager, configManager);
  
  // Track execution statistics
  const stats = {
    total: 0,
    completed: 0,
    failed: 0,
    skipped: 0,
    startTime: Date.now(),
    issues: []
  };

  // Setup progress tracking
  agent.on('batch:start', (data) => {
    stats.total = data.totalIssues;
    console.log(`\n🚀 Starting batch execution of ${data.totalIssues} issues\n`);
  });

  agent.on('issue:start', (data) => {
    console.log(`\n📋 Issue ${data.issueNumber}: ${data.issueTitle}`);
    console.log('─'.repeat(50));
  });

  agent.on('issue:complete', (data) => {
    stats.completed++;
    stats.issues.push({
      number: data.issueNumber,
      title: data.issueTitle,
      success: data.success,
      duration: data.duration,
      provider: data.provider
    });
    
    if (data.success) {
      console.log(`✅ Completed in ${(data.duration / 1000).toFixed(1)}s using ${data.provider}`);
    } else {
      stats.failed++;
      console.log(`❌ Failed: ${data.error}`);
    }
  });

  agent.on('batch:progress', (data) => {
    const elapsed = Date.now() - stats.startTime;
    const avgTime = elapsed / stats.completed;
    const remaining = (stats.total - stats.completed) * avgTime;
    
    console.log(`\n📊 Overall Progress: ${data.completed}/${data.total} (${data.percentage}%)`);
    console.log(`   Estimated time remaining: ${(remaining / 60000).toFixed(1)} minutes`);
  });

  // Setup graceful cancellation
  const abortController = new AbortController();
  let cancelled = false;

  process.on('SIGINT', () => {
    if (!cancelled) {
      cancelled = true;
      console.log('\n\n⚠️  Gracefully stopping batch execution...');
      console.log('Press Ctrl+C again to force quit\n');
      abortController.abort();
    } else {
      process.exit(1);
    }
  });

  try {
    // Execute all pending issues
    const results = await agent.executeAll({
      dryRun: false,
      signal: abortController.signal,
      continueOnError: true, // Don't stop on individual failures
      onProgress: (percentage, message) => {
        // Additional progress callback if needed
      }
    });

    // Display summary
    displaySummary(stats, results);

  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('\n🛑 Batch execution cancelled by user');
      displaySummary(stats);
    } else {
      console.error('\n❌ Batch execution error:', error.message);
    }
  }
}

function displaySummary(stats, results = null) {
  const duration = Date.now() - stats.startTime;
  
  console.log('\n' + '='.repeat(60));
  console.log('📈 BATCH EXECUTION SUMMARY');
  console.log('='.repeat(60));
  
  console.log(`\nTotal Issues: ${stats.total}`);
  console.log(`Completed: ${stats.completed} ✅`);
  console.log(`Failed: ${stats.failed} ❌`);
  console.log(`Skipped: ${stats.total - stats.completed - stats.failed} ⏭️`);
  console.log(`\nTotal Duration: ${(duration / 60000).toFixed(1)} minutes`);
  console.log(`Average Time per Issue: ${(duration / stats.completed / 1000).toFixed(1)} seconds`);
  
  if (stats.issues.length > 0) {
    console.log('\n📋 Issue Details:');
    console.log('─'.repeat(60));
    
    stats.issues.forEach(issue => {
      const status = issue.success ? '✅' : '❌';
      const time = (issue.duration / 1000).toFixed(1);
      console.log(`${status} #${issue.number}: ${issue.title} (${time}s, ${issue.provider})`);
    });
  }
  
  // Provider usage statistics
  if (stats.issues.length > 0) {
    const providerStats = {};
    stats.issues.forEach(issue => {
      if (issue.provider) {
        providerStats[issue.provider] = (providerStats[issue.provider] || 0) + 1;
      }
    });
    
    console.log('\n🤖 Provider Usage:');
    Object.entries(providerStats).forEach(([provider, count]) => {
      const percentage = ((count / stats.completed) * 100).toFixed(1);
      console.log(`  ${provider}: ${count} issues (${percentage}%)`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
}

// Interactive mode for selecting issues
async function interactiveBatch() {
  const fileManager = new FileManager(process.cwd());
  const todoList = await fileManager.readTodo();
  const pendingIssues = todoList.filter(item => item.status === 'pending');
  
  if (pendingIssues.length === 0) {
    console.log('No pending issues found!');
    return;
  }
  
  console.log('\n📋 Pending Issues:');
  pendingIssues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.content}`);
  });
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question('\nExecute all issues? (y/n): ', (answer) => {
      rl.close();
      if (answer.toLowerCase() === 'y') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

// Main execution
if (require.main === module) {
  (async () => {
    console.log('=== AutoAgent Batch Execution Example ===');
    
    const proceed = await interactiveBatch();
    if (proceed) {
      await batchExecution();
    } else {
      console.log('Batch execution cancelled.');
    }
  })().catch(console.error);
}

module.exports = { batchExecution, interactiveBatch };