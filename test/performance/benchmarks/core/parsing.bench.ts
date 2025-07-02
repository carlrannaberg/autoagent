import { describe, bench } from 'vitest';
import { parseIssue, parsePlan } from '~/core/parser';
import { createBenchmark } from '../utils/benchmark.utils';

describe('Parsing Performance Benchmarks', () => {
  const simpleIssue = `# Issue: Simple Task

## Requirement
Do something simple

## Acceptance Criteria
- [ ] Task completed
`;

  const complexIssue = `# Issue 42: Complex Feature Implementation

## Requirement
Implement a comprehensive feature with multiple components and intricate requirements.

## Acceptance Criteria
- [ ] Design system architecture
- [ ] Implement core functionality
- [ ] Add unit tests with >80% coverage
- [ ] Create integration tests
- [ ] Write comprehensive documentation
- [ ] Performance optimization
- [ ] Security audit
- [ ] Accessibility compliance

## Technical Details
- Use TypeScript with strict mode
- Follow SOLID principles
- Implement using functional programming paradigms
- Ensure backward compatibility
- Support internationalization

## Dependencies
- Issue #40: Core infrastructure
- Issue #41: Authentication system
- External API integration required

## Resources
- Design specs: /docs/design.md
- API documentation: /docs/api.md
- Performance requirements: /docs/performance.md

## Additional Context
${Array.from({ length: 50 }, (_, i) => `- Context item ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`).join('\n')}
`;

  const simplePlan = `# Plan: Simple Implementation

## Steps
1. Do step one
2. Do step two
3. Complete
`;

  const complexPlan = `# Plan: Complex Feature Implementation

## Phase 1: Architecture Design
- [ ] Review existing codebase structure
- [ ] Design component hierarchy
- [ ] Define interfaces and contracts
- [ ] Create architectural diagrams
- [ ] Document design decisions

## Phase 2: Core Implementation
- [ ] Set up project structure
- [ ] Implement base classes/modules
- [ ] Create utility functions
- [ ] Build core business logic
- [ ] Add error handling

## Phase 3: Testing Strategy
- [ ] Write unit test suite
- [ ] Create integration tests
- [ ] Add e2e test scenarios
- [ ] Performance benchmarks
- [ ] Security testing

## Phase 4: Documentation
- [ ] API documentation
- [ ] User guide
- [ ] Developer documentation
- [ ] Migration guide
- [ ] Troubleshooting guide

## Technical Approach
${Array.from({ length: 20 }, (_, i) => `
### Component ${i + 1}
- Responsibility: Handle specific functionality
- Dependencies: Module A, Module B
- Testing: Unit and integration tests required
- Performance: Must handle 1000 req/s
`).join('\n')}

## Risk Mitigation
${Array.from({ length: 10 }, (_, i) => `- Risk ${i + 1}: Description and mitigation strategy`).join('\n')}
`;

  describe('Issue Parsing', () => {
    bench('parse simple issue', () => {
      parseIssue(simpleIssue, 'issues/simple.md');
    });

    bench('parse complex issue', () => {
      parseIssue(complexIssue, 'issues/complex.md');
    });

    createBenchmark(
      'parse issue 1000 times',
      () => {
        for (let i = 0; i < 1000; i++) {
          parseIssue(simpleIssue, `issues/issue-${i}.md`);
        }
      },
      { iterations: 10 }
    );

    bench('parse issue with large content', () => {
      const largeContent = complexIssue + '\n\n## Extra Content\n' + 
        Array.from({ length: 1000 }, (_, i) => `Line ${i}: Additional content`).join('\n');
      parseIssue(largeContent, 'issues/large.md');
    });
  });

  describe('Plan Parsing', () => {
    bench('parse simple plan', () => {
      parsePlan(simplePlan, 'plans/simple.md');
    });

    bench('parse complex plan', () => {
      parsePlan(complexPlan, 'plans/complex.md');
    });

    createBenchmark(
      'parse plan 1000 times',
      () => {
        for (let i = 0; i < 1000; i++) {
          parsePlan(simplePlan, `plans/plan-${i}.md`);
        }
      },
      { iterations: 10 }
    );
  });

  describe('Markdown Processing', () => {
    bench('extract sections from markdown', () => {
      const sections = complexIssue.split(/^##\s+/m);
      sections.forEach(section => section.trim());
    });

    bench('parse checkbox items', () => {
      const checkboxRegex = /^-\s*\[[x\s]\]\s*(.+)$/gm;
      const matches = [...complexIssue.matchAll(checkboxRegex)];
      matches.map(match => ({ checked: match[0].includes('[x]'), text: match[1] }));
    });

    bench('extract metadata from frontmatter', () => {
      const withFrontmatter = `---
title: Test Issue
priority: high
tags: [feature, important]
---
${complexIssue}`;
      
      const frontmatterMatch = withFrontmatter.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const lines = frontmatterMatch[1].split('\n');
        const metadata: Record<string, any> = {};
        lines.forEach(line => {
          const [key, value] = line.split(':').map(s => s.trim());
          if (key !== '' && value !== undefined && value !== '') {
            metadata[key] = value;
          }
        });
      }
    });
  });
});