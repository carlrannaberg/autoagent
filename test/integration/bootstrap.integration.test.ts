import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';

interface CLIResult {
  stdout: string;
  stderr: string;
  code: number;
}

describe('Bootstrap Command Integration', () => {
  let testWorkspace: string;
  const autoagentBin = path.join(process.cwd(), 'bin', 'autoagent');

  beforeEach(async () => {
    // Create a unique test workspace
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autoagent-test-'));
    testWorkspace = path.join(tmpDir, 'test-project');
    await fs.mkdir(testWorkspace, { recursive: true });
    
    // Initialize basic directories
    await fs.mkdir(path.join(testWorkspace, 'issues'), { recursive: true });
    await fs.mkdir(path.join(testWorkspace, 'plans'), { recursive: true });
    await fs.mkdir(path.join(testWorkspace, 'templates'), { recursive: true });
    
    // Create todo.md
    await fs.writeFile(
      path.join(testWorkspace, 'todo.md'),
      '# TODO\n\n- [ ] Initial todo item\n'
    );
    
    // Create .env file with test provider
    await fs.writeFile(
      path.join(testWorkspace, '.env'),
      'CLAUDE_API_KEY=test-key\nGEMINI_API_KEY=test-key\n'
    );
    
    // Create template files
    await fs.writeFile(
      path.join(testWorkspace, 'templates', 'issue.md'),
      `# Issue {{number}}: {{title}}

## Requirement
{{requirement}}

## Acceptance Criteria
{{criteria}}

## Technical Details
{{details}}`
    );
    
    await fs.writeFile(
      path.join(testWorkspace, 'templates', 'plan.md'),
      `# Plan for Issue {{number}}: {{title}}

## Implementation Plan
{{plan}}

## Technical Approach
{{approach}}`
    );
  });

  afterEach(async () => {
    // Clean up test workspace
    if (testWorkspace) {
      await fs.rm(testWorkspace, { recursive: true, force: true });
    }
  });

  // Helper function to run CLI commands
  async function runCLI(args: string[]): Promise<CLIResult> {
    return new Promise((resolve) => {
      const proc = spawn('node', [autoagentBin, ...args], {
        cwd: testWorkspace,
        env: { ...process.env, NODE_ENV: 'test', DEBUG: 'true' }
      });

      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      proc.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      proc.on('close', (code) => {
        // Log for debugging
        if (code !== 0) {
          console.log('CLI failed with:', { code, stdout, stderr });
        }
        resolve({ stdout, stderr, code: code || 0 });
      });
    });
  }

  // Helper to create a master plan file
  async function createMasterPlan(name: string, content: string) {
    const planPath = path.join(testWorkspace, `${name}.md`);
    await fs.writeFile(planPath, content);
    return planPath;
  }

  // Helper to get issue files
  async function getIssueFiles(): Promise<string[]> {
    const issuesDir = path.join(testWorkspace, 'issues');
    const files = await fs.readdir(issuesDir);
    return files.filter(f => f.endsWith('.md')).sort();
  }

  // Helper to get plan files
  async function getPlanFiles(): Promise<string[]> {
    const plansDir = path.join(testWorkspace, 'plans');
    const files = await fs.readdir(plansDir);
    return files.filter(f => f.endsWith('.md')).sort();
  }

  describe('CLI Integration', () => {
    it('should bootstrap with empty project', async () => {
      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- Build a test feature
- Add documentation

## Implementation
1. Create core functionality
2. Add tests
3. Write documentation`);

      const result = await runCLI(['bootstrap', 'master.md', '--provider', 'mock']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Bootstrap issue created successfully');
      
      const issues = await getIssueFiles();
      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0]).toBe('1-build-a-test-feature.md');
    });

    it('should bootstrap with existing issues', async () => {
      // Create some existing issues
      await fs.writeFile(
        path.join(testWorkspace, 'issues', '1-existing-issue.md'),
        '# Issue 1: Existing Issue\n\nThis already exists.'
      );
      await fs.writeFile(
        path.join(testWorkspace, 'issues', '2-another-issue.md'),
        '# Issue 2: Another Issue\n\nThis also exists.'
      );

      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- New feature requirement
- Bug fix needed`);

      const result = await runCLI(['bootstrap', 'master.md']);

      expect(result.code).toBe(0);
      
      const issues = await getIssueFiles();
      expect(issues).toContain('1-existing-issue.md');
      expect(issues).toContain('2-another-issue.md');
      expect(issues).toContain('3-new-feature-requirement.md');
      expect(issues).toContain('4-bug-fix-needed.md');
    });

    it('should handle bootstrap command errors gracefully', async () => {
      const result = await runCLI(['bootstrap', 'nonexistent.md']);
      
      expect(result.code).not.toBe(0);
      expect(result.stderr).toContain('Could not read master plan');
    });

    it('should show help for bootstrap command', async () => {
      const result = await runCLI(['bootstrap', '--help']);
      
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('bootstrap');
      expect(result.stdout).toContain('master plan');
    });
  });

  describe('Workflow Integration', () => {
    it('should integrate with status command after bootstrap', async () => {
      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- Feature A
- Feature B
- Feature C`);

      // Bootstrap
      await runCLI(['bootstrap', 'master.md']);
      
      // Check status
      const statusResult = await runCLI(['status']);
      
      expect(statusResult.code).toBe(0);
      expect(statusResult.stdout).toContain('3 issues');
      expect(statusResult.stdout).toContain('0 completed');
    });

    it('should integrate with list command after bootstrap', async () => {
      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- Implement search functionality
- Add user authentication`);

      // Bootstrap
      await runCLI(['bootstrap', 'master.md']);
      
      // List issues
      const listResult = await runCLI(['list']);
      
      expect(listResult.code).toBe(0);
      expect(listResult.stdout).toContain('implement-search-functionality');
      expect(listResult.stdout).toContain('add-user-authentication');
    });

    it('should handle multiple bootstrap operations', async () => {
      // First bootstrap
      const masterPlan1 = await createMasterPlan('phase1', `# Phase 1

## Goals
- Initial setup
- Core features`);

      await runCLI(['bootstrap', 'phase1.md']);
      
      // Second bootstrap
      const masterPlan2 = await createMasterPlan('phase2', `# Phase 2

## Goals  
- Advanced features
- Performance optimization`);

      await runCLI(['bootstrap', 'phase2.md']);
      
      const issues = await getIssueFiles();
      expect(issues).toContain('1-initial-setup.md');
      expect(issues).toContain('2-core-features.md');
      expect(issues).toContain('3-advanced-features.md');
      expect(issues).toContain('4-performance-optimization.md');
    });

    it('should preserve TODO items during bootstrap', async () => {
      // Add some existing TODO items
      await fs.writeFile(
        path.join(testWorkspace, 'todo.md'),
        `# TODO

- [ ] Existing task 1
- [ ] Existing task 2
- [x] Completed task`
      );

      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- New requirement`);

      await runCLI(['bootstrap', 'master.md']);
      
      const todoContent = await fs.readFile(path.join(testWorkspace, 'todo.md'), 'utf-8');
      expect(todoContent).toContain('Existing task 1');
      expect(todoContent).toContain('Existing task 2');
      expect(todoContent).toContain('Completed task');
      expect(todoContent).toContain('Complete issue #1');
    });
  });

  describe('State Verification', () => {
    it('should create correct file structure', async () => {
      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- Database integration
- API endpoints
- Frontend components`);

      await runCLI(['bootstrap', 'master.md']);
      
      // Verify issues directory
      const issues = await getIssueFiles();
      expect(issues).toHaveLength(3);
      
      // Verify plans directory
      const plans = await getPlanFiles();
      expect(plans).toHaveLength(3);
      
      // Verify file naming
      expect(issues[0]).toMatch(/1-database-integration\.md/);
      expect(plans[0]).toMatch(/1-database-integration-plan\.md/);
    });

    it('should create valid issue content', async () => {
      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- Implement caching system`);

      await runCLI(['bootstrap', 'master.md']);
      
      const issueContent = await fs.readFile(
        path.join(testWorkspace, 'issues', '1-implement-caching-system.md'),
        'utf-8'
      );
      
      expect(issueContent).toContain('# Issue 1: Implement caching system');
      expect(issueContent).toContain('## Requirement');
      expect(issueContent).toContain('## Acceptance Criteria');
    });

    it('should handle complex master plan formats', async () => {
      const masterPlan = await createMasterPlan('complex', `# Complex Master Plan

## Overview
This is a complex project with multiple phases.

## Phase 1: Foundation
- Set up project structure
- Configure build system

## Phase 2: Core Features  
- User management
- Data processing

## Phase 3: Advanced
- Analytics dashboard
- Reporting system`);

      await runCLI(['bootstrap', 'complex.md']);
      
      const issues = await getIssueFiles();
      expect(issues.length).toBeGreaterThanOrEqual(6);
    });

    it('should maintain project consistency', async () => {
      // Create existing project state
      await fs.writeFile(
        path.join(testWorkspace, 'issues', '1-completed-issue.md'),
        '# Issue 1: Completed Issue\n\n## Status: Completed'
      );
      
      await fs.writeFile(
        path.join(testWorkspace, 'todo.md'),
        `# TODO

- [x] Complete issue #1
- [ ] Review code`
      );

      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- New feature X
- New feature Y`);

      await runCLI(['bootstrap', 'master.md']);
      
      // Verify existing completed issue is preserved
      const issue1Content = await fs.readFile(
        path.join(testWorkspace, 'issues', '1-completed-issue.md'),
        'utf-8'
      );
      expect(issue1Content).toContain('Completed Issue');
      
      // Verify new issues start from correct number
      const issues = await getIssueFiles();
      expect(issues).toContain('2-new-feature-x.md');
      expect(issues).toContain('3-new-feature-y.md');
    });

    it('should handle edge cases in issue numbering', async () => {
      // Create non-sequential existing issues
      await fs.writeFile(
        path.join(testWorkspace, 'issues', '1-first.md'),
        '# Issue 1'
      );
      await fs.writeFile(
        path.join(testWorkspace, 'issues', '3-third.md'),
        '# Issue 3'
      );
      await fs.writeFile(
        path.join(testWorkspace, 'issues', '7-seventh.md'),
        '# Issue 7'
      );

      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- Fill the gap`);

      await runCLI(['bootstrap', 'master.md']);
      
      const issues = await getIssueFiles();
      expect(issues).toContain('8-fill-the-gap.md');
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle invalid master plan gracefully', async () => {
      const masterPlan = await createMasterPlan('invalid', '');
      
      const result = await runCLI(['bootstrap', 'invalid.md']);
      
      expect(result.code).not.toBe(0);
      expect(result.stderr).toBeTruthy();
    });

    it('should handle file system errors gracefully', async () => {
      const masterPlan = await createMasterPlan('master', `# Master Plan

## Goals
- Test feature`);

      // Make issues directory read-only
      await fs.chmod(path.join(testWorkspace, 'issues'), 0o444);
      
      const result = await runCLI(['bootstrap', 'master.md']);
      
      expect(result.code).not.toBe(0);
      
      // Restore permissions for cleanup
      await fs.chmod(path.join(testWorkspace, 'issues'), 0o755);
    });

    it('should provide meaningful error messages', async () => {
      const result = await runCLI(['bootstrap']);
      
      expect(result.code).not.toBe(0);
      expect(result.stderr).toContain('master plan');
    });
  });
});