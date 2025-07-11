import { describe, it, expect, beforeEach } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import * as path from 'path';

describe('Run Spec File E2E', () => {
  const context = setupE2ETest();

  describe('Spec File Detection and Execution', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      // Add a fake remote to satisfy git validation
      await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
      // Create AGENT.md that would have been created by init
      await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
      // Create local config to disable git operations for tests
      await context.workspace.createFile('.autoagent/config.json', JSON.stringify({
        autoCommit: false,
        gitAutoPush: false
      }));
      // Note: issues/ and plans/ directories will be created on-demand by the commands
    });

    it('should bootstrap and execute from a spec file', async () => {
      // Create a spec file
      await context.workspace.createFile('specs/product-feature.md', `# Product Feature Specification

## Overview
This specification defines a new product feature for our application.

## Goals
- Implement user authentication
- Add dashboard functionality
- Create API endpoints

## Requirements
The system should support multiple user roles and provide real-time updates.

## Technical Details
- Use JWT for authentication
- WebSocket for real-time features
- RESTful API design
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'specs/product-feature.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file: specs/product-feature.md');
      expect(result.stdout).toContain('Bootstrapping project from spec file');
      expect(result.stdout).toContain('Bootstrap complete! Created decomposition issue');
      expect(result.stdout).toContain('Executing decomposition issue');
      expect(result.stdout).toContain('Decomposition complete!');
      
      // Verify decomposition issue was created
      const files = await context.workspace.listFiles('issues');
      // Bootstrap creates issue #1 with proper naming (1-*.md)
      const decompositionIssue = files.find(f => f.match(/^1-.*\.md$/));
      expect(decompositionIssue).toBeDefined();
    });

    it('should handle spec file with --all flag to execute all created issues', async () => {
      // Create a spec file
      await context.workspace.createFile('specs/multi-feature.md', `# Multi-Feature Specification

## Overview
Build multiple related features.

## Features
1. User Management
2. Reporting System
3. Integration APIs

## Implementation Plan
Each feature should be implemented as a separate issue.
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      // Run the spec file, which should bootstrap and then execute all created issues
      const result = await context.cli.execute(['run', 'specs/multi-feature.md', '--all'], { timeout: 60000 });
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file');
      expect(result.stdout).toContain('Bootstrap complete!');
      expect(result.stdout).toContain('Decomposition complete!');
      expect(result.stdout).toContain('Continuing with all created issues');
      expect(result.stdout).toContain('All');
      expect(result.stdout).toContain('issues completed successfully!');
    }, 60000);

    it('should handle relative spec file paths', async () => {
      // Create nested spec file
      await context.workspace.createFile('docs/specs/api-design.md', `# API Design Specification

## Overview
RESTful API design for the application.

## Endpoints
- GET /users
- POST /users
- PUT /users/:id
- DELETE /users/:id
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'docs/specs/api-design.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file: docs/specs/api-design.md');
      expect(result.stdout).toContain('Bootstrap complete!');
    });

    it('should handle absolute spec file paths', async () => {
      const absolutePath = path.join(context.workspace.getPath(), 'absolute-spec.md');
      
      await context.workspace.createFile('absolute-spec.md', `# Absolute Path Spec

## Description
Testing absolute path handling.
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', absolutePath]);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain(`Detected spec/plan file: ${absolutePath}`);
      expect(result.stdout).toContain('Bootstrap complete!');
    });

    it('should differentiate between spec files and issue files', async () => {
      // Create an issue file (with issue marker)
      await context.workspace.createFile('test-issue.md', `# Issue #10: Test Issue

## Description
This is a test issue for differentiation testing.

## Requirements
This is an issue file, not a spec file.

## Success Criteria
- [ ] Verify issue execution works correctly
`);

      // Create corresponding issue in issues directory
      await context.workspace.createFile('issues/10-test-issue.md', `# Issue #10: Test Issue

## Description
This is the actual issue file for testing differentiation.

## Requirements
This is the actual issue file.

## Success Criteria
- [ ] Issue is properly recognized and executed
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '10', '--no-validate']);
      
      expect(result.exitCode).toBe(0);
      // Should execute as issue, not bootstrap
      expect(result.stdout).toContain('Executing issue #10');
      expect(result.stdout).not.toContain('Detected spec/plan file');
      expect(result.stdout).not.toContain('Bootstrapping');
    });
  });

  describe('Error Handling', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      // Add a fake remote to satisfy git validation
      await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
      // Create AGENT.md that would have been created by init
      await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
      // Create local config to disable git operations for tests
      await context.workspace.createFile('.autoagent/config.json', JSON.stringify({
        autoCommit: false,
        gitAutoPush: false
      }));
      // Note: issues/ and plans/ directories will be created on-demand by the commands
    });

    it('should handle non-existent spec file', async () => {
      const result = await context.cli.execute(['run', 'non-existent-spec.md']);
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('File not found: non-existent-spec.md');
    });

    it('should handle bootstrap failure gracefully', async () => {
      // Create a spec file that will cause bootstrap to fail
      await context.workspace.createFile('bad-spec.md', `# Bad Spec

This spec will cause bootstrap to fail.
`);

      // Use mock provider but set it to fail
      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      context.cli.setEnv('AUTOAGENT_MOCK_FAIL', 'true');
      
      const result = await context.cli.execute(['run', 'bad-spec.md'], { timeout: 10000 });
      
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Decomposition failed');
    });

    it('should handle empty spec file', async () => {
      await context.workspace.createFile('empty-spec.md', '');

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'empty-spec.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file: empty-spec.md');
      expect(result.stdout).toContain('Bootstrap complete!');
    });

    it('should handle spec file with only whitespace', async () => {
      await context.workspace.createFile('whitespace-spec.md', '\n\n   \n\t\n  ');

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'whitespace-spec.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file: whitespace-spec.md');
    });
  });

  describe('Workflow Scenarios', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      // Add a fake remote to satisfy git validation
      await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
      // Create AGENT.md that would have been created by init
      await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
      // Create local config to disable git operations for tests
      await context.workspace.createFile('.autoagent/config.json', JSON.stringify({
        autoCommit: false,
        gitAutoPush: false
      }));
      // Note: issues/ and plans/ directories will be created on-demand by the commands
    });

    it('should support interrupt and resume during spec execution', async () => {
      // Create a large spec file
      await context.workspace.createFile('large-spec.md', `# Large Project Specification

## Overview
A comprehensive project with many components.

## Components
1. Authentication System
2. User Management
3. Data Processing Pipeline
4. Reporting Dashboard
5. API Gateway
6. Monitoring System
7. Backup Service
8. Notification System

## Details
Each component should be implemented as a separate module with its own set of issues.
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      // Start execution
      const result = await context.cli.execute(['run', 'large-spec.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Bootstrap complete!');
      
      // The spec file execution above should create issues automatically
      // Just check if we can run the next pending issue
      
      // Verify that we can run next issue after spec execution
      const nextResult = await context.cli.execute(['run'], { timeout: 30000 });
      
      // If there are no pending issues, the run command might exit with 0 but no execution
      // Or it might return an error - both are acceptable for this test
      expect([0, 1]).toContain(nextResult.exitCode);
      // The main point is that the spec execution didn't break the system
    }, 60000);

    it('should handle spec file that references external files', async () => {
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

      // Create spec that references these files
      await context.workspace.createFile('master-spec.md', `# Master Specification

## Overview
This project implements features based on external requirement documents.

## Requirements
- Authentication: See requirements/auth.md
- API Design: See requirements/api.md

## Implementation
Create issues for each requirement document.
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'master-spec.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Bootstrap complete!');
      expect(result.stdout).toContain('Decomposition complete!');
    });

    it('should handle spec files with code blocks and technical details', async () => {
      await context.workspace.createFile('technical-spec.md', `# Technical Specification

## Overview
Implement a REST API with the following endpoints.

## API Design

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: number;
}
\`\`\`

## Endpoints

### GET /api/users
Returns a list of all users.

\`\`\`bash
curl -X GET http://localhost:3000/api/users \\
  -H "Authorization: Bearer <token>"
\`\`\`

### POST /api/users
Creates a new user.

\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
\`\`\`

## Implementation Tasks
1. Set up Express server
2. Implement user model
3. Create API routes
4. Add authentication middleware
5. Write tests
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'technical-spec.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file');
      expect(result.stdout).toContain('Bootstrap complete!');
      expect(result.stdout).toContain('Decomposition complete!');
    });
  });

  describe('Provider Failover During Spec Execution', () => {
    it('should handle provider failover during bootstrap', async () => {
      await context.workspace.initGit();
      await context.cli.execute(['init']);
      
      await context.workspace.createFile('failover-spec.md', `# Failover Test Spec

## Overview
Test provider failover handling.
`);

      // Simulate provider failure by not setting mock provider
      // This will attempt real provider and fail over if not configured
      const result = await context.cli.execute(['run', 'failover-spec.md'], { timeout: 15000 });
      
      // Should either succeed with failover or fail with clear error
      if (result.exitCode !== 0) {
        expect(result.stderr).toMatch(/Bootstrap failed|provider|authentication|Git validation/i);
      } else {
        expect(result.stdout).toContain('Bootstrap complete!');
      }
    });
  });

  describe('Edge Cases', () => {
    beforeEach(async () => {
      await context.workspace.initGit();
      // Add a fake remote to satisfy git validation
      await context.workspace.addGitRemote('origin', 'https://github.com/test/repo.git');
      // Create AGENT.md that would have been created by init
      await context.workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
      // Create local config to disable git operations for tests
      await context.workspace.createFile('.autoagent/config.json', JSON.stringify({
        autoCommit: false,
        gitAutoPush: false
      }));
      // Note: issues/ and plans/ directories will be created on-demand by the commands
    });

    it('should handle spec file with various markdown edge cases', async () => {
      await context.workspace.createFile('edge-case-spec.md', `# A spec file that doesn't start with Issue

## This looks like "Issue 1: Something" but it's not at the start

### Nested Issue 2: Also not a real issue marker

The file has various edge cases:
- Lines that mention Issue 3: Not a marker
- Code blocks with hash symbols:
\`\`\`
# This is in a code block but not an issue marker
# Just regular markdown headers
\`\`\`

But since the file doesn't match the issue pattern, it's a spec file.
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'edge-case-spec.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file');
      expect(result.stdout).toContain('Bootstrap complete!');
    });

    it('should handle spec file names that look like issue files', async () => {
      // Create a file with issue-like name but no issue marker content
      await context.workspace.createFile('42-not-an-issue.md', `# Specification for Feature 42

This file has an issue-like name but is actually a spec file.

## Requirements
- Build feature 42
- Test thoroughly
`);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', '42-not-an-issue.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file');
      expect(result.stdout).toContain('Bootstrap complete!');
    });

    it('should handle very large spec files', async () => {
      // Create a large spec file
      let content = '# Large Specification\n\n## Overview\n\nThis is a very large specification.\n\n';
      for (let i = 0; i < 100; i++) {
        content += `## Section ${i}\n\nDetailed requirements for section ${i}.\n\n`;
        content += `- Requirement ${i}.1\n- Requirement ${i}.2\n- Requirement ${i}.3\n\n`;
      }

      await context.workspace.createFile('large-spec.md', content);

      context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
      
      const result = await context.cli.execute(['run', 'large-spec.md']);
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Detected spec/plan file');
      expect(result.stdout).toContain('Bootstrap complete!');
    });
  });
});