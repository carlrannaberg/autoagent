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
    
    // Note: Templates are no longer read from filesystem - bootstrap uses embedded templates
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
          // eslint-disable-next-line no-console
          console.log('CLI failed with:', { code, stdout, stderr });
        }
        resolve({ stdout, stderr, code: code ?? 0 });
      });
    });
  }

  // Helper to create a master plan file
  async function createMasterPlan(name: string, content: string): Promise<string> {
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
      await createMasterPlan('master', `# Master Plan

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
      expect(issues[0]).toBe('1-implement-plan-from-master.md');
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

      await createMasterPlan('master', `# Master Plan

## Goals
- New feature requirement
- Bug fix needed`);

      const result = await runCLI(['bootstrap', 'master.md']);

      expect(result.code).toBe(0);
      
      const issues = await getIssueFiles();
      expect(issues).toContain('1-existing-issue.md');
      expect(issues).toContain('2-another-issue.md');
      expect(issues).toContain('3-implement-plan-from-master.md');
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
      await createMasterPlan('master', `# Master Plan

## Goals
- Feature A
- Feature B
- Feature C`);

      // Bootstrap
      await runCLI(['bootstrap', 'master.md']);
      
      // Check status
      const statusResult = await runCLI(['status']);
      
      expect(statusResult.code).toBe(0);
      expect(statusResult.stdout).toContain('1');
      expect(statusResult.stdout).toContain('0');
    });

    it('should integrate with list command after bootstrap', async () => {
      await createMasterPlan('master', `# Master Plan

## Goals
- Implement search functionality
- Add user authentication`);

      // Bootstrap
      await runCLI(['bootstrap', 'master.md']);
      
      // List issues
      const listResult = await runCLI(['list', 'issues']);
      
      expect(listResult.code).toBe(0);
      expect(listResult.stdout).toContain('implement-plan-from-master');
    });
  });

  describe('Embedded Template Verification', () => {
    it('should use embedded templates without template directory', async () => {
      // Remove templates directory if it exists
      try {
        await fs.rmdir(path.join(testWorkspace, 'templates'), { recursive: true });
      } catch {
        // Directory doesn't exist, which is what we want
      }

      await createMasterPlan('master', `# Master Plan
## Goals
- Test embedded templates
- Verify no filesystem reads`);

      const result = await runCLI(['bootstrap', 'master.md', '--provider', 'mock']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Bootstrap issue created successfully');
      
      // Verify templates directory was not created
      const templatesExist = await fs.access(path.join(testWorkspace, 'templates'))
        .then(() => true)
        .catch(() => false);
      expect(templatesExist).toBe(false);
    });

    it('should bootstrap successfully with no templates directory', async () => {
      // Ensure no templates directory exists
      const templatesDir = path.join(testWorkspace, 'templates');
      try {
        await fs.rmdir(templatesDir, { recursive: true });
      } catch {
        // Ignore if doesn't exist
      }

      await createMasterPlan('test-plan', `# Test Plan
## Objectives
- Create authentication system
- Implement user profiles`);

      const result = await runCLI(['bootstrap', 'test-plan.md']);

      expect(result.code).toBe(0);
      
      // Check that issue was created
      const issues = await getIssueFiles();
      expect(issues.length).toBeGreaterThan(0);
      
      // Read the created issue to verify format
      const issueContent = await fs.readFile(
        path.join(testWorkspace, 'issues', issues[0]),
        'utf-8'
      );
      expect(issueContent).toContain('## Requirement');
      expect(issueContent).toContain('## Acceptance Criteria');
      expect(issueContent).toContain('## Technical Details');
    });

    it('should ignore filesystem templates even if they exist', async () => {
      // Create templates directory with custom templates
      const templatesDir = path.join(testWorkspace, 'templates');
      await fs.mkdir(templatesDir, { recursive: true });
      
      // Create custom templates that should be ignored
      await fs.writeFile(
        path.join(templatesDir, 'issue.md'),
        '# CUSTOM ISSUE TEMPLATE - SHOULD NOT BE USED\n{{content}}'
      );
      await fs.writeFile(
        path.join(templatesDir, 'plan.md'), 
        '# CUSTOM PLAN TEMPLATE - SHOULD NOT BE USED\n{{content}}'
      );

      await createMasterPlan('master', `# Master Plan
## Goals
- Test that custom templates are ignored`);

      const result = await runCLI(['bootstrap', 'master.md']);

      expect(result.code).toBe(0);
      
      // Read created issue and verify it doesn't contain custom template text
      const issues = await getIssueFiles();
      const issueContent = await fs.readFile(
        path.join(testWorkspace, 'issues', issues[0]),
        'utf-8'
      );
      
      expect(issueContent).not.toContain('CUSTOM ISSUE TEMPLATE');
      expect(issueContent).not.toContain('SHOULD NOT BE USED');
      // Should contain standard sections from embedded template
      expect(issueContent).toContain('## Requirement');
      expect(issueContent).toContain('## Acceptance Criteria');
    });

    it('should create properly formatted issues with embedded templates', async () => {
      await createMasterPlan('feature-plan', `# Feature Plan
## Requirements
- User authentication
- Profile management
- Settings page`);

      const result = await runCLI(['bootstrap', 'feature-plan.md']);

      expect(result.code).toBe(0);
      
      // Verify issue and plan files were created
      const issues = await getIssueFiles();
      const plans = await getPlanFiles();
      
      expect(issues).toHaveLength(1);
      expect(plans).toHaveLength(1);
      
      // Verify matching filenames
      expect(issues[0]).toBe('1-implement-plan-from-feature-plan.md');
      expect(plans[0]).toBe('1-implement-plan-from-feature-plan.md');
      
      // Verify plan content structure
      const planContent = await fs.readFile(
        path.join(testWorkspace, 'plans', plans[0]),
        'utf-8'
      );
      expect(planContent).toContain('# Plan for Issue 1:');
      expect(planContent).toContain('## Implementation Plan');
      expect(planContent).toContain('### Analysis and Decomposition');
    });
  });

  describe('Error Scenarios with Embedded Templates', () => {
    it('should handle missing master plan gracefully', async () => {
      const result = await runCLI(['bootstrap', 'nonexistent-plan.md']);
      
      expect(result.code).not.toBe(0);
      expect(result.stderr).toContain('Could not read master plan');
    });

    it('should handle empty master plan', async () => {
      await createMasterPlan('empty', '');
      
      const result = await runCLI(['bootstrap', 'empty.md']);
      
      // Should still create a bootstrap issue
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Bootstrap issue created successfully');
    });

    it('should handle very large master plans', async () => {
      // Create a large master plan
      const largePlan = `# Large Master Plan\n\n${Array(100).fill('## Section\n- Task item\n- Another task\n').join('\n')}`;
      await createMasterPlan('large', largePlan);
      
      const result = await runCLI(['bootstrap', 'large.md']);
      
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Bootstrap issue created successfully');
    });

    it('should handle multiple consecutive bootstrap operations', async () => {
      // First bootstrap
      await createMasterPlan('phase1', '# Phase 1\n## Tasks\n- Setup infrastructure');
      const result1 = await runCLI(['bootstrap', 'phase1.md']);
      expect(result1.code).toBe(0);

      // Second bootstrap
      await createMasterPlan('phase2', '# Phase 2\n## Tasks\n- Implement features');
      const result2 = await runCLI(['bootstrap', 'phase2.md']);
      expect(result2.code).toBe(0);

      // Verify both issues exist
      const issues = await getIssueFiles();
      expect(issues).toContain('1-implement-plan-from-phase1.md');
      expect(issues).toContain('2-implement-plan-from-phase2.md');
    });
  });
});