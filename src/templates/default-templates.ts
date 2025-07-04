/**
 * Default issue template for the bootstrap command.
 * This template is used to create issue files when no external template is provided.
 */
export const DEFAULT_ISSUE_TEMPLATE: string = `# Issue [NUMBER]: [TITLE]

## Requirement
[REQUIREMENT]

## Acceptance Criteria
[ACCEPTANCE_CRITERIA]

## Technical Details
[TECHNICAL_DETAILS]

## Dependencies
[DEPENDENCIES]

## Resources
[RESOURCES]

## Notes
[NOTES]
`;

/**
 * Default plan template for the bootstrap command.
 * This template is used to create plan files when no external template is provided.
 */
export const DEFAULT_PLAN_TEMPLATE: string = `# Plan for Issue [NUMBER]: [TITLE]

This document outlines the step-by-step plan to complete \`issues/[NUMBER]-[ISSUE_FILE_NAME]\`.

## Implementation Plan

### Phase 1: Initial Setup
[PHASE_1_TASKS]

### Phase 2: Core Implementation
[PHASE_2_TASKS]

### Phase 3: Integration
[PHASE_3_TASKS]

### Phase 4: Testing and Documentation
[PHASE_4_TASKS]

## Technical Approach
[TECHNICAL_APPROACH]

## Potential Challenges
[POTENTIAL_CHALLENGES]

## Success Metrics
[SUCCESS_METRICS]

## Rollback Strategy
[ROLLBACK_STRATEGY]
`;