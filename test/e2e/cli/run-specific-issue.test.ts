import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';

describe('Run Specific Issue E2E', () => {
  const context = setupE2ETest();

  describe('Running issues by number', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      
      // Create test issues
      await context.workspace.createFile('issues/39-implement-plan-from-embed-bootstrap-templates.md', `# Issue 39: Implement plan from embed-bootstrap-templates

## Description
Decompose the plan into individual actionable issues and create corresponding plan files for each issue.

## Requirements
This issue decomposes the plan into individual actionable tasks for implementation.

## Success Criteria
- [ ] All issues are created and numbered in the issues/ directory
- [ ] Each issue has a corresponding plan file in the plans/ directory

## Technical Details
Master Plan: \`specs/embed-bootstrap-templates.md\`
`);

      await context.workspace.createFile('plans/39-implement-plan-from-embed-bootstrap-templates.md', `# Plan for Issue 39: Implement plan from embed-bootstrap-templates

## Overview
This plan decomposes the embed-bootstrap-templates specification into individual actionable tasks.

## Implementation Steps
- [ ] Analyze master plan
- [ ] Create issues

## Technical Approach
AI-assisted decomposition of master plan
`);

      // Add to TODO.md
      await context.workspace.createFile('TODO.md', `# TODO

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **#39** Implement plan from embed-bootstrap-templates - \`issues/39-implement-plan-from-embed-bootstrap-templates.md\`

## Completed Issues
`);
    });

    it('should execute issue by number', async () => {
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '39']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing issue #39');
      expect(result.stdout).toContain('Mock execution completed');
    });

    it('should execute issue by filename prefix', async () => {
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '39-implement-plan']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing issue #39');
      expect(result.stdout).toContain('Mock execution completed');
    });

    it('should execute issue by partial name match', async () => {
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'embed-bootstrap']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing issue #39');
      expect(result.stdout).toContain('Mock execution completed');
    });

    it('should fail gracefully for non-existent issue number', async () => {
      const result = await context.cli.execute(['run', '999']);
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Issue not found: 999');
    });

    it('should fail for invalid issue number format', async () => {
      const result = await context.cli.execute(['run', 'abc123']);
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Issue not found: abc123');
    });

    it('should execute real provider (non-mock mode)', async () => {
      // Create a master plan for bootstrap issue
      await context.workspace.createFile('specs/embed-bootstrap-templates.md', `# Test Spec

## Overview
Test specification for bootstrap templates.

## Goals
- Embed templates in package
- Zero configuration

## Implementation
Create embedded template constants.
`);

      // Don't set mock provider - test real execution path
      const result = await context.cli.execute(['run', '39'], { timeout: 30000 });
      
      // Should either succeed or fail with provider-specific error
      // (depends on whether claude/gemini are configured)
      if (result.exitCode === 0) {
        expect(result.stdout).toContain('Executing issue #39');
      } else {
        // Should fail with provider error, not "No pending issues"
        expect(result.stderr).not.toContain('No pending issues to execute');
        expect(result.stderr).toMatch(/provider|authentication|configuration/i);
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple matching files gracefully', async () => {
      await context.workspace.initGit();
      
      // Create multiple issues with similar names
      await context.workspace.createFile('issues/10-test-issue.md', '# Issue 10: Test Issue\n\n## Description\nTest issue\n\n## Requirements\nTest\n\n## Success Criteria\n- [ ] Test completion');
      await context.workspace.createFile('issues/100-test-issue.md', '# Issue 100: Test Issue\n\n## Description\nTest issue\n\n## Requirements\nTest\n\n## Success Criteria\n- [ ] Test completion');
      await context.workspace.createFile('issues/1000-test-issue.md', '# Issue 1000: Test Issue\n\n## Description\nTest issue\n\n## Requirements\nTest\n\n## Success Criteria\n- [ ] Test completion');
      
      // Create corresponding plan files
      await context.workspace.createFile('plans/10-test-issue.md', '# Plan for Issue 10: Test Issue\n\n## Overview\nTest plan\n\n## Implementation Steps\n- [ ] Test step');
      await context.workspace.createFile('plans/100-test-issue.md', '# Plan for Issue 100: Test Issue\n\n## Overview\nTest plan\n\n## Implementation Steps\n- [ ] Test step');
      await context.workspace.createFile('plans/1000-test-issue.md', '# Plan for Issue 1000: Test Issue\n\n## Overview\nTest plan\n\n## Implementation Steps\n- [ ] Test step');
      
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      // Should match exact number
      const result = await context.cli.execute(['run', '10']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing issue #10');
    });

    it('should prioritize exact matches over partial matches', async () => {
      await context.workspace.initGit();
      
      // Create issues with overlapping names
      await context.workspace.createFile('issues/5-implement.md', '# Issue 5: Implement\n\n## Description\nTest issue\n\n## Requirements\nTest\n\n## Success Criteria\n- [ ] Test completion');
      await context.workspace.createFile('issues/50-implement-feature.md', '# Issue 50: Implement Feature\n\n## Description\nTest issue\n\n## Requirements\nTest\n\n## Success Criteria\n- [ ] Test completion');
      
      // Create corresponding plan files
      await context.workspace.createFile('plans/5-implement.md', '# Plan for Issue 5: Implement\n\n## Overview\nTest plan\n\n## Implementation Steps\n- [ ] Test step');
      await context.workspace.createFile('plans/50-implement-feature.md', '# Plan for Issue 50: Implement Feature\n\n## Overview\nTest plan\n\n## Implementation Steps\n- [ ] Test step');
      
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      // Should match issue 5, not 50
      const result = await context.cli.execute(['run', '5']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Executing issue #5');
    });
  });
});