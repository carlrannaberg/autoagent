import { describe, it, expect, beforeEach } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import * as path from 'path';

describe('Run Task Management E2E', () => {
  const context = setupE2ETest();

  describe('Task Creation and Execution', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      // Add a fake remote to satisfy git validation
      await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
      // Create AGENT.md that would have been created by init
      await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
      // Create local config to disable git operations for tests
      await context.workspace.createFile('.autoagent/config.json', JSON.stringify({
        autoCommit: false,
        gitAutoPush: false
      }));
    });

    it('should create and execute a complex task', async () => {
      // Create a complex task with detailed requirements
      await context.cli.execute([
        'create',
        '--title',
        'Product Feature Implementation',
        '--description',
        'This specification defines a new product feature for our application.',
        '--acceptance',
        'Implement user authentication',
        '--acceptance',
        'Add dashboard functionality', 
        '--acceptance',
        'Create API endpoints',
        '--details',
        'Use JWT for authentication, WebSocket for real-time features, RESTful API design',
        '--plan',
        'Phase 1: Authentication, Phase 2: Dashboard, Phase 3: API endpoints',
        '--testing',
        'Unit tests for auth, integration tests for API, E2E tests for dashboard'
      ]);

      // Verify task was created
      const listResult = await context.cli.execute(['list', 'tasks']);
      expect(listResult.exitCode).toBe(0);
      expect(listResult.stdout).toContain('Product Feature Implementation');
      
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '1']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });

    it('should handle multiple tasks with --all flag', async () => {
      // Create multiple related tasks
      await context.cli.execute([
        'create',
        '--title',
        'User Management',
        '--description',
        'Build user management system',
        '--acceptance',
        'User registration and login'
      ]);
      
      await context.cli.execute([
        'create',
        '--title',
        'Reporting System',
        '--description',
        'Build reporting dashboard',
        '--acceptance',
        'Generate and display reports'
      ]);
      
      await context.cli.execute([
        'create',
        '--title',
        'Integration APIs',
        '--description',
        'Build API integration layer',
        '--acceptance',
        'External API connectivity'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      // Run all tasks
      const result = await context.cli.execute(['run', '--all'], { timeout: 60000 });
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Found 3 pending task');
      expect(result.stdout).toContain('3 succeeded, 0 failed');
    }, 60000);

    it('should handle tasks with detailed API specifications', async () => {
      // Create task with detailed API specs
      await context.cli.execute([
        'create',
        '--title',
        'API Design Implementation',
        '--description',
        'RESTful API design for the application',
        '--acceptance',
        'Implement GET /users endpoint',
        '--acceptance', 
        'Implement POST /users endpoint',
        '--acceptance',
        'Implement PUT /users/:id endpoint',
        '--acceptance',
        'Implement DELETE /users/:id endpoint',
        '--details',
        'Follow REST conventions, use proper HTTP status codes, include proper error handling'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '1']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });

    // Note: Title matching is not currently implemented - only task IDs are supported
    it.skip('should handle task execution by exact title match', async () => {
      await context.cli.execute([
        'create',
        '--title',
        'Absolute Path Testing',
        '--description',
        'Testing task execution by exact title match'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'Absolute Path Testing']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });

    it('should differentiate between task IDs and partial title matches', async () => {
      // Create tasks with similar names
      await context.cli.execute([
        'create',
        '--title',
        'Test Issue',
        '--description',
        'First test task for differentiation testing'
      ]);
      
      await context.cli.execute([
        'create',
        '--title',
        'Test Issue Advanced',
        '--description',
        'Second test task for differentiation testing'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      // Run by specific ID (should execute first task)
      const result = await context.cli.execute(['run', '1']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });
  });

  describe('Error Handling', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      // Add a fake remote to satisfy git validation
      await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
      // Create AGENT.md that would have been created by init
      await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
      // Create local config to disable git operations for tests
      await context.workspace.createFile('.autoagent/config.json', JSON.stringify({
        autoCommit: false,
        gitAutoPush: false
      }));
    });

    it('should handle non-existent task ID', async () => {
      const result = await context.cli.execute(['run', '999']);
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Task 999 not found');
    });

    it('should handle task execution failure gracefully', async () => {
      // Create a task
      await context.cli.execute([
        'create',
        '--title',
        'Failing Task',
        '--description',
        'This task will fail during execution'
      ]);

      // Use mock provider but set it to fail
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_FAIL', 'true');
      
      const result = await context.cli.execute(['run', '1'], { timeout: 10000 });
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Mock execution failed');
    });

    it('should handle empty task list gracefully', async () => {
      // No tasks created
      const result = await context.cli.execute(['run', '--all']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('No pending tasks to execute');
    });

    it('should handle invalid task title search gracefully', async () => {
      await context.cli.execute([
        'create',
        '--title',
        'Valid Task',
        '--description',
        'A valid task for testing'
      ]);
      
      const result = await context.cli.execute(['run', 'Non-existent Task']);
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Task Non-existent Task not found');
    });
  });

  describe('Workflow Scenarios', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      // Add a fake remote to satisfy git validation
      await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
      // Create AGENT.md that would have been created by init
      await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
      // Create local config to disable git operations for tests
      await context.workspace.createFile('.autoagent/config.json', JSON.stringify({
        autoCommit: false,
        gitAutoPush: false
      }));
    });

    it('should support task management workflow with multiple tasks', async () => {
      // Create multiple tasks representing a large project
      const components = [
        'Authentication System',
        'User Management', 
        'Data Processing Pipeline',
        'Reporting Dashboard',
        'API Gateway',
        'Monitoring System',
        'Backup Service',
        'Notification System'
      ];
      
      for (const component of components) {
        await context.cli.execute([
          'create',
          '--title',
          component,
          '--description',
          `Implement ${component} for the comprehensive project`,
          '--acceptance',
          `${component} is fully functional`
        ]);
      }

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      // Verify all tasks were created
      const listResult = await context.cli.execute(['list', 'tasks']);
      expect(listResult.exitCode).toBe(0);
      expect(listResult.stdout).toContain('Found 8 task');
      
      // Execute first task
      const firstResult = await context.cli.execute(['run', '1']);
      expect(firstResult.exitCode).toBe(0);
      expect(firstResult.stdout).toContain('Executing task: 1');
      
      // Verify that system remains functional after execution
      const nextResult = await context.cli.execute(['run', '2'], { timeout: 30000 });
      expect(nextResult.exitCode).toBe(0);
      expect(nextResult.stdout).toContain('Executing task: 2');
    }, 60000);

    it('should handle tasks with external file references', async () => {
      // Create supporting files
      await context.workspace.createFile('requirements/auth.md', `# Authentication Requirements

- Support OAuth2
- JWT tokens
- Session management
`);

      await context.workspace.createFile('requirements/api.md', `# API Requirements

- RESTful design
- GraphQL support
- Rate limiting
`);

      // Create task that references these files
      await context.cli.execute([
        'create',
        '--title',
        'Master Implementation',
        '--description',
        'This project implements features based on external requirement documents.',
        '--acceptance',
        'Authentication features per requirements/auth.md',
        '--acceptance',
        'API design per requirements/api.md',
        '--details',
        'Reference requirements/auth.md and requirements/api.md for detailed specifications'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '1']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });

    it('should handle tasks with code blocks and technical details', async () => {
      await context.cli.execute([
        'create',
        '--title',
        'REST API Implementation',
        '--description',
        'Implement a REST API with the following endpoints.',
        '--acceptance',
        'GET /api/users endpoint returns list of users',
        '--acceptance',
        'POST /api/users endpoint creates new user',
        '--acceptance',
        'API includes proper authentication',
        '--details',
        `API Design includes User interface with id, name, email, role fields.
Endpoints: GET /api/users, POST /api/users with Bearer token auth.
Response format: { data: T, error?: string, timestamp: number }`,
        '--plan',
        '1. Set up Express server, 2. Implement user model, 3. Create API routes, 4. Add authentication middleware, 5. Write tests'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '1']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });
  });

  describe('Provider Failover During Task Execution', () => {
    it('should handle provider failover during task execution', async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      
      await context.cli.execute([
        'create',
        '--title',
        'Failover Test Task',
        '--description',
        'Test provider failover handling during task execution'
      ]);

      // Simulate provider failure by not setting mock provider
      // This will attempt real provider and fail over if not configured
      const result = await context.cli.execute(['run', '1'], { timeout: 15000 });
      
      // Should either succeed with failover or fail with clear error
      if (result.exitCode !== 0) {
        expect(result.stderr).toMatch(/Mock execution failed|provider|authentication|Git validation/i);
      } else {
        expect(result.stdout).toContain('Executing task: 1');
      }
    });
  });

  describe('Edge Cases', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      await context.workspace.initializeSTM();
      // Add a fake remote to satisfy git validation
      await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
      // Create AGENT.md that would have been created by init
      await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
      // Create local config to disable git operations for tests
      await context.workspace.createFile('.autoagent/config.json', JSON.stringify({
        autoCommit: false,
        gitAutoPush: false
      }));
    });

    it('should handle tasks with various markdown content edge cases', async () => {
      await context.cli.execute([
        'create',
        '--title',
        'Edge Case Markdown Task',
        '--description',
        `A task with various markdown content edge cases including:
- Lines that mention other issues
- Code blocks with hash symbols
- Complex formatting`,
        '--details',
        `The task has various edge cases:
\`\`\`
# This is in a code block
# Just regular markdown headers
\`\`\`
But it's still a valid task.`
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '1']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });

    it('should handle task titles that look like issue numbers', async () => {
      // Create a task with a number-like title
      await context.cli.execute([
        'create',
        '--title',
        '42-feature-implementation',
        '--description',
        'This task has a number-like title but is a standard STM task',
        '--acceptance',
        'Build feature 42',
        '--acceptance',
        'Test thoroughly'
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '1']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });

    it('should handle tasks with very large content', async () => {
      // Create a task with large content
      const description = 'This is a very large task specification.\n\n';
      let details = '';
      const acceptanceCriteria = [];
      
      for (let i = 0; i < 50; i++) {
        details += `Section ${i}: Detailed requirements for section ${i}.\n`;
        acceptanceCriteria.push(`Requirement ${i}.1`, `Requirement ${i}.2`, `Requirement ${i}.3`);
      }

      await context.cli.execute([
        'create',
        '--title',
        'Large Content Task',
        '--description',
        description,
        '--details',
        details,
        '--acceptance',
        acceptanceCriteria.slice(0, 10).join(', ') // Limit acceptance criteria for CLI
      ]);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '1']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing task: 1');
    });
  });
});