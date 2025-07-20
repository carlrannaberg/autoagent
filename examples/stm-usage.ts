#!/usr/bin/env node

/**
 * Example demonstrating STM (Simple Task Master) usage in AutoAgent.
 * Shows how to create, manage, and track tasks using STMManager and TaskContent.
 */

import { STMManager, STMError } from '../src/utils/stm-manager.js';
import { TaskContent } from '../src/types/stm-types.js';

async function demonstrateSTMWorkflow(): Promise<void> {
  const stmManager = new STMManager();

  try {
    console.log('🚀 Starting STM Workflow Demonstration\n');

    // Example 1: Create a comprehensive development task
    console.log('=== Example 1: Creating a Comprehensive Task ===');
    
    const featureTaskContent: TaskContent = {
      description: 'Implement a new API endpoint for user profile management that allows users to update their personal information securely',
      technicalDetails: 'Use Express.js framework with TypeScript for type safety. Implement proper input validation using Joi schema validation. Use bcrypt for password hashing and JWT for authentication. Store data in PostgreSQL with proper indexing for performance.',
      implementationPlan: `1. Create TypeScript interfaces for user profile data
2. Implement Joi validation schemas for input validation
3. Create database migration for user profile table updates
4. Implement the API endpoint with proper error handling
5. Add authentication middleware to protect the endpoint
6. Create comprehensive unit and integration tests
7. Update API documentation with new endpoint details`,
      acceptanceCriteria: [
        'API endpoint responds correctly to valid profile update requests',
        'Input validation prevents invalid data from being processed',
        'Authentication is required to access the endpoint',
        'Database transactions handle errors gracefully',
        'All edge cases are covered with appropriate error messages',
        'Unit tests achieve >90% code coverage',
        'Integration tests verify end-to-end functionality',
        'API documentation is complete and accurate'
      ],
      testingStrategy: `Unit testing: Test individual functions for validation, database operations, and business logic using Jest.
Integration testing: Test complete API endpoint flow using supertest.
Security testing: Verify authentication and authorization work correctly.
Performance testing: Ensure endpoint handles expected load.`,
      verificationSteps: `1. Run unit tests and verify 90%+ coverage
2. Run integration tests against test database
3. Manual testing with Postman for various scenarios
4. Security audit of authentication flow
5. Performance testing with load simulation
6. Code review by team members`,
      tags: ['api', 'backend', 'user-management', 'security']
    };

    const taskId1 = await stmManager.createTask(
      'Implement User Profile API Endpoint',
      featureTaskContent
    );
    console.log(`✅ Created comprehensive task with ID: ${taskId1}`);

    // Example 2: Create a simpler bug fix task
    console.log('\n=== Example 2: Creating a Bug Fix Task ===');
    
    const bugFixContent: TaskContent = {
      description: 'Fix memory leak in WebSocket connection handler that causes server crashes after prolonged usage',
      technicalDetails: 'The WebSocket event listeners are not being properly cleaned up when connections close, leading to memory accumulation',
      implementationPlan: `1. Identify all WebSocket event listeners in the codebase
2. Add proper cleanup in connection close handlers
3. Implement connection pooling to limit concurrent connections
4. Add memory usage monitoring and alerts`,
      acceptanceCriteria: [
        'Memory usage remains stable during extended operation',
        'WebSocket connections close cleanly without leaks',
        'Server can handle expected concurrent connection load',
        'Memory monitoring alerts work correctly'
      ],
      testingStrategy: 'Load testing with multiple WebSocket connections, memory profiling, automated stress tests',
      verificationSteps: 'Run load tests, monitor memory usage, verify clean connection termination',
      tags: ['bugfix', 'websocket', 'memory-leak', 'performance']
    };

    const taskId2 = await stmManager.createTask(
      'Fix WebSocket Memory Leak',
      bugFixContent
    );
    console.log(`🐛 Created bug fix task with ID: ${taskId2}`);

    // Example 3: Demonstrate task management operations
    console.log('\n=== Example 3: Task Management Operations ===');

    // List all tasks
    const allTasks = await stmManager.listTasks();
    console.log(`📋 Found ${allTasks.length} total tasks`);

    // Filter tasks by status
    const pendingTasks = await stmManager.listTasks({ status: 'pending' });
    console.log(`⏳ Found ${pendingTasks.length} pending tasks`);

    // Start working on the bug fix
    await stmManager.markTaskInProgress(taskId2);
    console.log(`🔄 Marked task ${taskId2} as in-progress`);

    // Get task details
    const taskDetails = await stmManager.getTask(taskId2);
    if (taskDetails) {
      console.log(`📖 Task "${taskDetails.title}" is now ${taskDetails.status}`);
    }

    // Example 4: Search functionality
    console.log('\n=== Example 4: Search and Filter Tasks ===');

    // Search for API-related tasks
    const apiTasks = await stmManager.searchTasks('API', {
      ignoreCase: true,
      tags: ['api']
    });
    console.log(`🔍 Found ${apiTasks.length} API-related tasks`);

    // Search for memory-related tasks
    const memoryTasks = await stmManager.searchTasks('memory', {
      ignoreCase: true
    });
    console.log(`🧠 Found ${memoryTasks.length} memory-related tasks`);

    // Example 5: Complete a task
    console.log('\n=== Example 5: Task Completion ===');
    
    // Mark the bug fix as completed
    await stmManager.markTaskComplete(taskId2);
    console.log(`✅ Marked task ${taskId2} as completed`);

    // Verify status change
    const completedTask = await stmManager.getTask(taskId2);
    if (completedTask) {
      console.log(`🎉 Task "${completedTask.title}" is now ${completedTask.status}`);
    }

    // Example 6: Advanced task content parsing
    console.log('\n=== Example 6: Parse Task Sections ===');
    
    const sections = await stmManager.getTaskSections(taskId1);
    if (sections.description) {
      console.log('📝 Found description section');
    }
    if (sections.details) {
      console.log('🔧 Found technical details section');
    }
    if (sections.validation) {
      console.log('✅ Found validation section');
    }

    // Example 7: Demonstrate error handling
    console.log('\n=== Example 7: Error Handling ===');
    
    try {
      await stmManager.getTask('invalid-id');
    } catch (error) {
      if (error instanceof STMError) {
        console.log(`❌ Handled STM error: ${error.message} (operation: ${error.operation})`);
      }
    }

    try {
      await stmManager.updateTaskStatus(taskId1, 'invalid-status');
    } catch (error) {
      if (error instanceof STMError) {
        console.log(`❌ Handled invalid status error: ${error.message}`);
      }
    }

    console.log('\n🎯 STM Workflow demonstration completed successfully!');

  } catch (error) {
    console.error('❌ STM Workflow demonstration failed:', error);
    process.exit(1);
  }
}

// Example of minimal task creation
async function createMinimalTask(): Promise<void> {
  console.log('\n=== Minimal Task Example ===');
  
  const stmManager = new STMManager();
  
  const minimalContent: TaskContent = {
    description: 'Update documentation for the new API endpoints',
    technicalDetails: 'Review all new endpoints and ensure OpenAPI specs are complete',
    implementationPlan: 'Go through each endpoint and update the documentation',
    acceptanceCriteria: [
      'All new endpoints are documented',
      'Examples are provided for each endpoint',
      'Documentation builds without errors'
    ]
  };

  try {
    const taskId = await stmManager.createTask(
      'Update API Documentation',
      minimalContent
    );
    console.log(`📚 Created minimal documentation task with ID: ${taskId}`);
  } catch (error) {
    console.error('Failed to create minimal task:', error);
  }
}

// Run the demonstrations
async function main(): Promise<void> {
  await demonstrateSTMWorkflow();
  await createMinimalTask();
}

main().catch(console.error);