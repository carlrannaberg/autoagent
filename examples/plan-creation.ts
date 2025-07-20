import { STMManager } from '../src/utils/stm-manager.js';
import { TaskContent } from '../src/types/stm-types.js';

async function createTaskExamples(): Promise<void> {
  const stmManager = new STMManager();

  // Create a task for user authentication implementation
  const authTaskContent: TaskContent = {
    description: 'Implement user authentication system with secure login and session management',
    technicalDetails: 'Use JWT tokens for authentication with secure token storage and automatic refresh',
    implementationPlan: `1. Setup authentication middleware
2. Create login form with validation
3. Implement JWT token generation and verification
4. Add secure session management
5. Create logout functionality`,
    acceptanceCriteria: [
      'Users can log in with valid credentials',
      'JWT tokens are generated and validated correctly',
      'Sessions are managed securely',
      'Users can log out successfully',
      'All authentication endpoints are tested'
    ],
    testingStrategy: 'Unit tests for authentication middleware, integration tests for login/logout flow',
    verificationSteps: 'Test login with valid/invalid credentials, verify token generation, test session persistence',
    tags: ['authentication', 'security', 'backend']
  };

  try {
    const taskId1 = await stmManager.createTask(
      'Implement User Authentication',
      authTaskContent
    );
    // eslint-disable-next-line no-console
    console.log('Created authentication task with ID:', taskId1);
    
    // Create a simpler setup task
    const setupTaskContent: TaskContent = {
      description: 'Configure development environment and install necessary dependencies',
      technicalDetails: 'Setup project structure with proper TypeScript configuration and testing framework',
      implementationPlan: `1. Initialize project with npm
2. Configure TypeScript with strict settings
3. Install development dependencies (jest, eslint, prettier)
4. Setup CI/CD pipeline configuration
5. Create initial project structure`,
      acceptanceCriteria: [
        'Project builds successfully with TypeScript',
        'All development tools are properly configured',
        'CI/CD pipeline runs without errors',
        'Code formatting and linting rules are enforced'
      ],
      tags: ['setup', 'configuration', 'infrastructure']
    };

    const taskId2 = await stmManager.createTask(
      'Configure Development Environment',
      setupTaskContent
    );
    // eslint-disable-next-line no-console
    console.log('Created setup task with ID:', taskId2);

    // Demonstrate task retrieval
    const authTask = await stmManager.getTask(taskId1);
    if (authTask) {
      // eslint-disable-next-line no-console
      console.log('Retrieved task:', authTask.title, '- Status:', authTask.status);
    }

    // Demonstrate task status update
    await stmManager.markTaskInProgress(taskId2);
    // eslint-disable-next-line no-console
    console.log('Marked setup task as in-progress');

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating STM tasks:', error);
  }
}

createTaskExamples().catch(console.error);