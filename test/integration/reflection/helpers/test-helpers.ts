import { mkdtemp, rm, writeFile, readFile, mkdir } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import type { ProviderResponse, CompletionResponse } from '../../../../src/types/providers.js';
import type { ReflectionContext } from '../../../../src/core/reflection/types.js';

export async function createTempDir(): Promise<string> {
  return await mkdtemp(join(tmpdir(), 'autoagent-reflection-test-'));
}

export async function cleanupTempDir(dir: string): Promise<void> {
  try {
    await rm(dir, { recursive: true, force: true });
  } catch (error) {
    // Ignore cleanup errors
  }
}

export async function createSpecFile(dir: string, content: string): Promise<string> {
  // Ensure the directory exists first
  await mkdir(dir, { recursive: true });
  const specPath = join(dir, 'test-spec.md');
  await writeFile(specPath, content);
  return specPath;
}

export async function createIssueFiles(dir: string, issues: Array<{ number: number; content: string }>): Promise<void> {
  const issuesDir = join(dir, 'issues');
  await mkdir(issuesDir, { recursive: true });
  
  for (const issue of issues) {
    const issuePath = join(issuesDir, `${issue.number}-test-issue.md`);
    await writeFile(issuePath, issue.content);
  }
}

export async function readIssueFile(dir: string, issueNumber: number): Promise<string> {
  const issuePath = join(dir, 'issues', `${issueNumber}-test-issue.md`);
  return await readFile(issuePath, 'utf-8');
}

export function createMockProviderResponse(content: string): ProviderResponse {
  return {
    success: true,
    content,
    usage: {
      inputTokens: 100,
      outputTokens: 200,
      totalTokens: 300
    }
  };
}

export function createMockCompletionResponse(content: string): CompletionResponse {
  return {
    content,
    usage: {
      inputTokens: 100,
      outputTokens: 200,
      totalTokens: 300
    }
  };
}

export function createMockProviderError(message: string): ProviderResponse {
  return {
    success: false,
    error: new Error(message),
    retryable: false
  };
}

export function createMockReflectionResponse(improvements: string[], score: number = 8): string {
  return `## Analysis

The specification has been reviewed for clarity and completeness.

## Improvements

${improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

## Score

${score}/10

The specification ${score >= 8 ? 'is well-structured' : 'needs improvements'}.`;
}

export function createMockImprovementResponse(originalContent: string, improvements: string[]): string {
  const improvedContent = originalContent + '\n\n## Additional Details\n\n' + improvements.join('\n');
  
  return `## Improved Specification

${improvedContent}

## Changes Made

${improvements.map((imp) => `- ${imp}`).join('\n')}`;
}

export async function createReflectionContext(dir: string, specPath: string): Promise<ReflectionContext> {
  const context: ReflectionContext = {
    specPath,
    originalContent: await readFile(specPath, 'utf-8'),
    currentContent: await readFile(specPath, 'utf-8'),
    iteration: 1,
    improvements: [],
    scores: []
  };
  
  return context;
}

export function createSampleSpec(complexity: 'simple' | 'complex' = 'simple'): string {
  if (complexity === 'simple') {
    return `# Feature: User Authentication

## Requirement
Implement basic user authentication with login and logout functionality.

## Acceptance Criteria
- Users can log in with email and password
- Users can log out
- Sessions are managed securely

## Technical Details
- Use JWT tokens for authentication
- Store user sessions in memory`;
  }
  
  return `# Feature: Advanced Task Queue System

## Requirement
Design and implement a distributed task queue system with priority scheduling, dead letter queues, and real-time monitoring capabilities.

## Acceptance Criteria
- Tasks can be scheduled with different priority levels
- Failed tasks are automatically retried with exponential backoff
- Dead letter queue for permanently failed tasks
- Real-time monitoring dashboard with metrics
- Support for task dependencies and workflows
- Horizontal scaling with multiple workers
- Task result persistence and retrieval

## Technical Details
- Use Redis for queue management
- Implement worker pool with configurable concurrency
- WebSocket for real-time updates
- Prometheus metrics integration
- Docker compose for local development
- Kubernetes deployment manifests

## Non-Functional Requirements
- Handle 10,000 tasks per second
- 99.9% uptime SLA
- Sub-second task pickup latency
- Graceful shutdown with task draining`;
}

export function createSampleIssue(number: number, title: string): string {
  return `# Issue ${number}: ${title}

## Requirement
Implement ${title.toLowerCase()}.

## Acceptance Criteria
- [ ] Basic implementation complete
- [ ] Tests written and passing
- [ ] Documentation updated

## Technical Details
- Follow existing patterns
- Ensure backward compatibility`;
}