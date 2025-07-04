import { describe, bench, beforeAll } from 'vitest';
import { executeIssues } from '~/core/executor';
import { parseIssue } from '~/core/parser';
import { createBenchmark, BenchmarkTimer } from '../utils/benchmark.utils';
import { createMockConfig, createMockIssue, mockCommandRunner } from '../../test-helpers';
import type { Issue } from '~/types';

describe('Execution Performance Benchmarks', () => {
  let mockConfig: ReturnType<typeof createMockConfig>;
  let mockIssues: Issue[];

  beforeAll(() => {
    mockConfig = createMockConfig();
    mockCommandRunner();
    
    mockIssues = Array.from({ length: 20 }, (_, i) => 
      createMockIssue({
        title: `Test Issue ${i + 1}`,
        content: `# Issue ${i + 1}\n\n## Requirement\nTest requirement ${i + 1}`,
        path: `issues/test-issue-${i + 1}.md`
      })
    );
  });

  describe('Single Issue Execution', () => {
    createBenchmark(
      'execute single issue',
      async () => {
        const timer = new BenchmarkTimer();
        const issue = mockIssues[0];
        
        timer.mark('parse');
        const parsedIssue = parseIssue(issue.content, issue.path);
        
        timer.mark('execute');
        await executeIssues([parsedIssue], mockConfig, { dryRun: true });
        
        timer.mark('complete');
      },
      { iterations: 50, time: 5000 }
    );

    bench('parse issue content', () => {
      const issue = mockIssues[0];
      parseIssue(issue.content, issue.path);
    });
  });

  describe('Batch Execution', () => {
    createBenchmark(
      'execute 5 issues',
      async () => {
        const issues = mockIssues.slice(0, 5).map(issue => 
          parseIssue(issue.content, issue.path)
        );
        await executeIssues(issues, mockConfig, { dryRun: true });
      },
      { iterations: 20, time: 10000 }
    );

    createBenchmark(
      'execute 10 issues',
      async () => {
        const issues = mockIssues.slice(0, 10).map(issue => 
          parseIssue(issue.content, issue.path)
        );
        await executeIssues(issues, mockConfig, { dryRun: true });
      },
      { iterations: 10, time: 15000 }
    );

    createBenchmark(
      'execute 20 issues',
      async () => {
        const issues = mockIssues.map(issue => 
          parseIssue(issue.content, issue.path)
        );
        await executeIssues(issues, mockConfig, { dryRun: true });
      },
      { iterations: 5, time: 20000 }
    );
  });

  describe('Concurrent vs Sequential', () => {
    bench('sequential execution (5 issues)', async () => {
      const issues = mockIssues.slice(0, 5).map(issue => 
        parseIssue(issue.content, issue.path)
      );
      
      for (const issue of issues) {
        await executeIssues([issue], mockConfig, { dryRun: true });
      }
    });

    bench('concurrent execution (5 issues)', async () => {
      const issues = mockIssues.slice(0, 5).map(issue => 
        parseIssue(issue.content, issue.path)
      );
      
      await Promise.all(
        issues.map(issue => 
          executeIssues([issue], mockConfig, { dryRun: true })
        )
      );
    });
  });
});