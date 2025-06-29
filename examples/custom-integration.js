#!/usr/bin/env node

/**
 * Custom Integration Example
 * 
 * This example shows how to integrate AutoAgent with custom tools,
 * extend functionality, and create specialized workflows.
 */

const { AutonomousAgent, FileManager, ConfigManager } = require('autoagent');
const { EventEmitter } = require('events');
const fs = require('fs').promises;
const path = require('path');

/**
 * Custom File Manager with additional features
 */
class EnhancedFileManager extends FileManager {
  constructor(workingDir) {
    super(workingDir);
    this.backupDir = path.join(workingDir, '.autoagent', 'backups');
  }

  async backupIssue(issueNumber) {
    const issuePath = path.join(this.issuesDir, `${issueNumber}-*.md`);
    const backupPath = path.join(this.backupDir, `issue-${issueNumber}-${Date.now()}.md`);
    
    await fs.mkdir(this.backupDir, { recursive: true });
    // Implementation would copy the file
    console.log(`Backed up issue ${issueNumber} to ${backupPath}`);
  }

  async getIssueMetrics() {
    const todo = await this.readTodo();
    const metrics = {
      total: todo.length,
      pending: todo.filter(i => i.status === 'pending').length,
      completed: todo.filter(i => i.status === 'completed').length,
      highPriority: todo.filter(i => i.priority === 'high').length
    };
    return metrics;
  }
}

/**
 * Custom Agent with webhooks and notifications
 */
class NotifyingAgent extends EventEmitter {
  constructor(fileManager, configManager) {
    super();
    this.agent = new AutonomousAgent(fileManager, configManager);
    this.webhooks = [];
    this.setupEventForwarding();
  }

  addWebhook(url) {
    this.webhooks.push(url);
  }

  setupEventForwarding() {
    // Forward all agent events
    this.agent.on('issue:complete', async (data) => {
      this.emit('issue:complete', data);
      await this.notifyWebhooks('issue:complete', data);
    });

    this.agent.on('provider:switch', (data) => {
      this.emit('provider:switch', data);
      this.notifyWebhooks('provider:switch', data);
    });

    this.agent.on('execution:error', (data) => {
      this.emit('execution:error', data);
      this.notifyWebhooks('execution:error', data);
    });
  }

  async notifyWebhooks(event, data) {
    for (const webhook of this.webhooks) {
      try {
        console.log(`Notifying webhook: ${webhook}`);
        // In real implementation, you would make HTTP POST request
        // await fetch(webhook, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ event, data, timestamp: new Date() })
        // });
      } catch (error) {
        console.error(`Webhook notification failed: ${error.message}`);
      }
    }
  }

  async executeNext(options) {
    return this.agent.executeNext(options);
  }

  async executeAll(options) {
    return this.agent.executeAll(options);
  }
}

/**
 * Custom Progress Reporter
 */
class ProgressReporter {
  constructor() {
    this.startTime = null;
    this.phases = [];
  }

  start() {
    this.startTime = Date.now();
    this.phases = [];
    console.log('\n📊 Progress Report Started\n');
  }

  recordPhase(phase, duration, success) {
    this.phases.push({ phase, duration, success });
  }

  generateReport() {
    const totalDuration = Date.now() - this.startTime;
    const successRate = (this.phases.filter(p => p.success).length / this.phases.length) * 100;

    console.log('\n' + '='.repeat(50));
    console.log('📊 EXECUTION REPORT');
    console.log('='.repeat(50));
    console.log(`Total Duration: ${(totalDuration / 1000).toFixed(1)}s`);
    console.log(`Success Rate: ${successRate.toFixed(1)}%`);
    console.log(`Phases Completed: ${this.phases.length}`);
    
    console.log('\nPhase Breakdown:');
    this.phases.forEach((phase, i) => {
      const status = phase.success ? '✅' : '❌';
      console.log(`  ${i + 1}. ${phase.phase}: ${status} (${phase.duration}ms)`);
    });
    
    return {
      totalDuration,
      successRate,
      phases: this.phases
    };
  }
}

/**
 * Example: Issue Priority Queue
 */
class PriorityQueueAgent {
  constructor(fileManager, configManager) {
    this.fileManager = fileManager;
    this.agent = new AutonomousAgent(fileManager, configManager);
  }

  async executePriorityQueue() {
    const todo = await this.fileManager.readTodo();
    
    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const sortedIssues = todo
      .filter(item => item.status === 'pending')
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    console.log('Execution order by priority:');
    sortedIssues.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.priority.toUpperCase()}] ${issue.content}`);
    });

    // Execute in priority order
    for (const issue of sortedIssues) {
      const issueNumber = parseInt(issue.content.match(/Issue #(\d+)/)?.[1] || '0');
      if (issueNumber) {
        await this.agent.executeIssue(issueNumber);
      }
    }
  }
}

/**
 * Main demonstration
 */
async function demonstrateCustomIntegration() {
  const workingDir = process.cwd();
  
  console.log('=== AutoAgent Custom Integration Examples ===\n');

  // Example 1: Enhanced File Manager
  console.log('1. Enhanced File Manager:');
  console.log('─'.repeat(40));
  
  const enhancedFileManager = new EnhancedFileManager(workingDir);
  const metrics = await enhancedFileManager.getIssueMetrics();
  
  console.log('Issue Metrics:');
  console.log(`  Total: ${metrics.total}`);
  console.log(`  Pending: ${metrics.pending}`);
  console.log(`  Completed: ${metrics.completed}`);
  console.log(`  High Priority: ${metrics.highPriority}`);

  // Example 2: Notifying Agent
  console.log('\n2. Agent with Webhooks:');
  console.log('─'.repeat(40));
  
  const configManager = new ConfigManager(workingDir);
  const notifyingAgent = new NotifyingAgent(enhancedFileManager, configManager);
  
  // Add webhook endpoints
  notifyingAgent.addWebhook('https://example.com/webhook');
  notifyingAgent.addWebhook('https://slack.com/api/webhook');
  
  // Add custom event handlers
  notifyingAgent.on('issue:complete', (data) => {
    console.log(`🔔 Custom handler: Issue ${data.issueNumber} completed!`);
  });

  // Example 3: Progress Reporter
  console.log('\n3. Custom Progress Reporter:');
  console.log('─'.repeat(40));
  
  const reporter = new ProgressReporter();
  reporter.start();
  
  // Simulate phase recording
  reporter.recordPhase('setup', 1200, true);
  reporter.recordPhase('execution', 5400, true);
  reporter.recordPhase('validation', 800, false);
  reporter.recordPhase('cleanup', 600, true);
  
  const report = reporter.generateReport();

  // Example 4: Custom Workflow
  console.log('\n4. Custom Workflow Integration:');
  console.log('─'.repeat(40));
  
  // Create a custom workflow that combines multiple features
  async function customWorkflow() {
    // 1. Check metrics before starting
    const beforeMetrics = await enhancedFileManager.getIssueMetrics();
    if (beforeMetrics.pending === 0) {
      console.log('No pending issues to process');
      return;
    }
    
    // 2. Backup current state
    console.log('Creating backups...');
    // Would backup issues here
    
    // 3. Execute with custom handling
    const agent = new AutonomousAgent(enhancedFileManager, configManager);
    
    agent.on('issue:start', (data) => {
      console.log(`\n🎯 Starting: ${data.issueTitle}`);
    });
    
    agent.on('progress', (data) => {
      // Custom progress visualization
      const bar = '█'.repeat(Math.floor(data.percentage / 5));
      const empty = '░'.repeat(20 - Math.floor(data.percentage / 5));
      console.log(`Progress: [${bar}${empty}] ${data.percentage}%`);
    });
    
    // 4. Execute next issue
    const result = await agent.executeNext();
    
    // 5. Post-execution analysis
    if (result.success) {
      console.log('\n✅ Workflow completed successfully');
      // Could trigger additional actions here
    }
  }
  
  // Uncomment to run the workflow
  // await customWorkflow();
}

/**
 * Example: Creating a Plugin System
 */
class AutoAgentPlugin {
  constructor(name) {
    this.name = name;
  }

  async beforeExecution(context) {
    // Override in subclasses
  }

  async afterExecution(context, result) {
    // Override in subclasses
  }
}

class LoggingPlugin extends AutoAgentPlugin {
  constructor() {
    super('logging');
    this.logFile = 'autoagent-execution.log';
  }

  async beforeExecution(context) {
    const entry = `[${new Date().toISOString()}] Starting issue ${context.issueNumber}\n`;
    await fs.appendFile(this.logFile, entry);
  }

  async afterExecution(context, result) {
    const entry = `[${new Date().toISOString()}] Completed issue ${context.issueNumber}: ${result.success}\n`;
    await fs.appendFile(this.logFile, entry);
  }
}

// Main execution
if (require.main === module) {
  demonstrateCustomIntegration().catch(console.error);
}

module.exports = {
  EnhancedFileManager,
  NotifyingAgent,
  ProgressReporter,
  PriorityQueueAgent,
  AutoAgentPlugin,
  LoggingPlugin
};