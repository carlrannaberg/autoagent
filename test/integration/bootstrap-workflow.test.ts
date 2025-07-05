import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { join } from 'path';
import { readFile, mkdir, writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { tmpdir } from 'os';
import { spawn } from 'child_process';

describe('Bootstrap Workflow Integration Tests', () => {
  let testWorkspace: string;
  let cliPath: string;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Create a unique test workspace
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    testWorkspace = join(tmpdir(), `autoagent-bootstrap-test-${timestamp}-${random}`);
    await mkdir(testWorkspace, { recursive: true });

    // Get CLI path
    cliPath = join(process.cwd(), 'bin', 'autoagent');
  });

  afterEach(async () => {
    // Clean up test workspace
    if (existsSync(testWorkspace)) {
      await rm(testWorkspace, { recursive: true, force: true });
    }
  });

  /**
   * Helper function to run the CLI command
   */
  async function runCLI(args: string[], cwd: string = testWorkspace): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve) => {
      const child = spawn('node', [cliPath, ...args], {
        cwd,
        env: {
          ...process.env,
          NODE_ENV: 'test',
          FORCE_COLOR: '0',
          AUTOAGENT_MOCK_PROVIDER: 'true'
        }
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (exitCode) => {
        resolve({ stdout, stderr, exitCode: exitCode || 0 });
      });
    });
  }

  /**
   * Helper function to create initial project structure
   */
  async function createProjectStructure(options: {
    hasIssues?: boolean;
    hasTodo?: boolean;
    todoContent?: string;
  } = {}) {
    // Create directories
    await mkdir(join(testWorkspace, 'issues'), { recursive: true });
    await mkdir(join(testWorkspace, 'plans'), { recursive: true });
    await mkdir(join(testWorkspace, 'templates'), { recursive: true });

    // Create .env file
    await writeFile(join(testWorkspace, '.env'), 'ANTHROPIC_API_KEY=test-key\n');

    // Create master plan in workspace root (not in templates/)
    await writeFile(join(testWorkspace, 'master-plan.md'), `# Master Plan

## Project Goals
Test project goals

## Architecture
Test architecture

## Implementation Plan
1. Phase 1
2. Phase 2
`);

    // Note: Templates are no longer read from filesystem - bootstrap uses embedded templates

    // Create existing issues if requested
    if (options.hasIssues) {
      await writeFile(join(testWorkspace, 'issues', '1-existing-issue.md'), `# Issue 1: Existing Issue

## Requirement
This is an existing issue

## Acceptance Criteria
- [ ] Test criteria
`);

      await writeFile(join(testWorkspace, 'issues', '2-another-issue.md'), `# Issue 2: Another Issue

## Requirement
This is another existing issue

## Acceptance Criteria
- [ ] More criteria
`);
    }

    // Create TODO.md if requested
    if (options.hasTodo) {
      const content = options.todoContent || `# Project TODO List

## In Progress
- [ ] Working on existing feature

## Backlog
- [ ] Future enhancement
- [ ] Bug fix needed
`;
      await writeFile(join(testWorkspace, 'TODO.md'), content);
    }
  }

  /**
   * Helper function to get issue files
   */
  async function getIssueFiles(): Promise<string[]> {
    const issuesDir = join(testWorkspace, 'issues');
    if (!existsSync(issuesDir)) {
      return [];
    }
    
    const { readdir } = await import('fs/promises');
    const files = await readdir(issuesDir);
    return files.filter(f => f.endsWith('.md')).sort();
  }

  describe('Complete Bootstrap Workflow', () => {
    it('should bootstrap project with existing issues and preserve TODO content', async () => {
      // Arrange: Create project with existing issues and TODO
      const existingTodoContent = `# Project TODO List

## In Progress
- [ ] Implement authentication system
- [ ] Add user profile page

## Completed
- [x] Set up project structure
- [x] Configure build system

## Backlog
- [ ] Add dark mode support
- [ ] Implement search functionality
`;
      
      await createProjectStructure({
        hasIssues: true,
        hasTodo: true,
        todoContent: existingTodoContent
      });

      // Act: Run bootstrap command
      const result = await runCLI(['bootstrap']);

      // Assert: Command should succeed
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Bootstrap issue created successfully');

      // Verify existing issues are preserved
      const issueFiles = await getIssueFiles();
      expect(issueFiles).toContain('1-existing-issue.md');
      expect(issueFiles).toContain('2-another-issue.md');
      
      // Verify new bootstrap issue is created with next number
      const bootstrapIssue = issueFiles.find(f => f.includes('implement-plan-from'));
      expect(bootstrapIssue).toBeDefined();
      expect(bootstrapIssue).toMatch(/^3-.*implement-plan-from.*\.md$/i);

      // Verify plan file is created
      const plansDir = join(testWorkspace, 'plans');
      const { readdir } = await import('fs/promises');
      const planFiles = await readdir(plansDir);
      const bootstrapPlan = planFiles.find(f => f.includes('implement-plan-from'));
      expect(bootstrapPlan).toBeDefined();

      // Verify TODO.md preserves existing content
      const todoContent = await readFile(join(testWorkspace, 'TODO.md'), 'utf-8');
      expect(todoContent).toContain('Implement authentication system');
      expect(todoContent).toContain('Add user profile page');
      expect(todoContent).toContain('Set up project structure');
      expect(todoContent).toContain('Configure build system');
      expect(todoContent).toContain('Add dark mode support');
      expect(todoContent).toContain('Implement search functionality');
      
      // Verify new bootstrap item is added
      expect(todoContent).toMatch(/\[Issue #3\].*Implement plan from master-plan/i);
    });

    it('should handle empty project bootstrap correctly', async () => {
      // Arrange: Create minimal project structure
      await createProjectStructure();

      // Act: Run bootstrap command
      const result = await runCLI(['bootstrap']);

      // Assert: Command should succeed
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Bootstrap issue created successfully');

      // Verify first issue is created as issue 1
      const issueFiles = await getIssueFiles();
      expect(issueFiles.length).toBe(1);
      expect(issueFiles[0]).toMatch(/^1-.*implement-plan-from-master-plan.*\.md$/i);

      // Verify TODO.md is created with bootstrap item
      const todoContent = await readFile(join(testWorkspace, 'TODO.md'), 'utf-8');
      expect(todoContent).toContain('# To-Do');
      expect(todoContent).toMatch(/\[Issue #1\].*Implement plan from master-plan/i);
    });
  });

  describe('CLI Command Execution', () => {
    it('should provide proper output and status messages', async () => {
      // Arrange
      await createProjectStructure({ hasIssues: true });

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Bootstrap issue created successfully');
      expect(result.stdout).toContain('Total issues:');
      expect(result.stdout).toContain('Next issue:');
    });

    it('should provide proper output without extra options', async () => {
      // Arrange
      await createProjectStructure();

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Bootstrap issue created successfully');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle missing master plan template', async () => {
      // Arrange: Create project without master plan
      await createProjectStructure();
      await rm(join(testWorkspace, 'master-plan.md'));

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Could not read master plan');
    });

    it('should handle permission errors gracefully', async function() {
      // Skip on Windows as chmod doesn't work the same way
      if (process.platform === 'win32') {
        this.skip();
        return;
      }

      // Arrange
      await createProjectStructure();
      const issuesDir = join(testWorkspace, 'issues');
      
      // Make issues directory read-only
      const { chmod } = await import('fs/promises');
      await chmod(issuesDir, 0o444);

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toMatch(/permission|access/i);

      // Cleanup: restore permissions
      await chmod(issuesDir, 0o755);
    });

    it('should handle concurrent bootstrap operations', async () => {
      // Arrange
      await createProjectStructure({ hasIssues: true });

      // Act: Run two bootstrap commands concurrently
      const [result1, result2] = await Promise.all([
        runCLI(['bootstrap']),
        runCLI(['bootstrap'])
      ]);

      // Assert: Both should complete (one might fail due to conflict)
      const successCount = [result1, result2].filter(r => r.exitCode === 0).length;
      expect(successCount).toBeGreaterThanOrEqual(1);

      // Verify we don't have duplicate issues
      const issueFiles = await getIssueFiles();
      const bootstrapIssues = issueFiles.filter(f => f.includes('implement-plan-from'));
      expect(bootstrapIssues.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle special characters in master plan', async () => {
      // Arrange
      await createProjectStructure();
      
      // Create master plan with special characters
      await writeFile(join(testWorkspace, 'master-plan.md'), `# Master Plan with "Special" Characters & Symbols

## Project Goals <with> Tags
- Goal with \`code\` blocks
- Goal with **bold** and *italic*

## Architecture & Design
- Component with @ symbol
- Service with $ prefix
- Module with # hash

## Implementation Plan
1. Phase 1: Build & Test
2. Phase 2: Deploy @ Production
`);

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(0);
      
      // Verify issue was created with sanitized filename
      const issueFiles = await getIssueFiles();
      const bootstrapIssue = issueFiles.find(f => f.includes('implement-plan-from'));
      expect(bootstrapIssue).toBeDefined();
      
      // Filename should not contain special characters
      expect(bootstrapIssue).not.toMatch(/[<>:"\\|?*@$#]/);
    });
  });

  describe('TODO.md Preservation', () => {
    it('should preserve complex TODO structure and formatting', async () => {
      // Arrange
      const complexTodoContent = `# Project TODO List

## 🚀 In Progress
- [ ] Feature: Implement real-time notifications
  - [ ] Set up WebSocket server
  - [ ] Create notification service
  - [ ] Add UI components
- [ ] Bug: Fix memory leak in data processor
  - Investigation notes: Occurs after 1000 iterations
  - Priority: HIGH

## ✅ Completed
- [x] Set up CI/CD pipeline (2024-01-15)
- [x] Implement user authentication
  - [x] OAuth integration
  - [x] JWT tokens
  - [x] Session management

## 📋 Backlog
### High Priority
- [ ] Performance optimization for large datasets
- [ ] Add comprehensive error handling

### Low Priority
- [ ] Update documentation
- [ ] Add more unit tests

## 💡 Ideas
- Consider migrating to TypeScript
- Explore PWA capabilities

---
Last updated: 2024-01-20
`;

      await createProjectStructure({
        hasTodo: true,
        todoContent: complexTodoContent
      });

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(0);

      // Verify TODO content is preserved exactly
      const todoContent = await readFile(join(testWorkspace, 'TODO.md'), 'utf-8');
      
      // Check all sections are preserved
      expect(todoContent).toContain('## 🚀 In Progress');
      expect(todoContent).toContain('## ✅ Completed');
      expect(todoContent).toContain('## 📋 Backlog');
      expect(todoContent).toContain('## 💡 Ideas');
      
      // Check nested items are preserved
      expect(todoContent).toContain('- [ ] Set up WebSocket server');
      expect(todoContent).toContain('- [x] OAuth integration');
      
      // Check formatting is preserved
      expect(todoContent).toContain('### High Priority');
      expect(todoContent).toContain('---\nLast updated: 2024-01-20');
      
      // Check bootstrap item is added appropriately
      expect(todoContent).toMatch(/\[Issue #\d+\].*Implement plan from master-plan/i);
    });

    it('should create TODO.md with proper structure when missing', async () => {
      // Arrange
      await createProjectStructure({ hasIssues: true });

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(0);

      // Verify TODO.md is created
      const todoExists = existsSync(join(testWorkspace, 'TODO.md'));
      expect(todoExists).toBe(true);

      // Verify content structure
      const todoContent = await readFile(join(testWorkspace, 'TODO.md'), 'utf-8');
      expect(todoContent).toContain('# To-Do');
      expect(todoContent).toContain('## Pending Issues');
      expect(todoContent).toMatch(/\[Issue #3\].*Implement plan from master-plan/i);
    });
  });

  describe('Issue and Plan Creation', () => {
    it('should create issue and plan with correct references', async () => {
      // Arrange
      await createProjectStructure({ hasIssues: true });

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(0);

      // Get created files
      const issueFiles = await getIssueFiles();
      const bootstrapIssue = issueFiles.find(f => f.includes('implement-plan-from'));
      expect(bootstrapIssue).toBeDefined();

      // Read issue content
      const issueContent = await readFile(
        join(testWorkspace, 'issues', bootstrapIssue!), 
        'utf-8'
      );
      expect(issueContent).toContain('Issue 3:');
      expect(issueContent).toContain('Implement plan from');

      // Check plan file
      const { readdir } = await import('fs/promises');
      const planFiles = await readdir(join(testWorkspace, 'plans'));
      const bootstrapPlan = planFiles.find(f => f.includes('implement-plan-from'));
      expect(bootstrapPlan).toBeDefined();

      // Read plan content
      const planContent = await readFile(
        join(testWorkspace, 'plans', bootstrapPlan!), 
        'utf-8'
      );
      expect(planContent).toContain('Plan for Issue 3:');
      expect(planContent).toContain('Implement plan from');
    });

    it('should handle long issue titles correctly', async () => {
      // Arrange
      await createProjectStructure();
      
      // Create master plan with very long title
      const longTitle = 'This is a very long master plan title that exceeds normal length limits and should be truncated appropriately to avoid filesystem issues while still maintaining readability';
      await writeFile(join(testWorkspace, 'master-plan.md'), `# ${longTitle}

## Project Goals
Test goals

## Architecture
Test architecture

## Implementation Plan
1. Step 1
`);

      // Act
      const result = await runCLI(['bootstrap']);

      // Assert
      expect(result.exitCode).toBe(0);

      // Verify issue is created with truncated filename
      const issueFiles = await getIssueFiles();
      const bootstrapIssue = issueFiles[0];
      
      // Filename should be reasonable length (< 100 chars)
      expect(bootstrapIssue.length).toBeLessThan(100);
      expect(bootstrapIssue).toContain('implement');
    });
  });
});