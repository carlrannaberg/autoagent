/**
 * @module default-templates
 * @description Embedded templates for AutoAgent's bootstrap command.
 * 
 * These templates are bundled directly within the package, eliminating the need
 * for external template files. This ensures that bootstrap works out-of-the-box
 * without any configuration or setup required.
 * 
 * The templates provide a consistent structure for issue tracking and planning,
 * helping teams maintain organized project documentation.
 * 
 * @since 0.0.14
 */

/**
 * Default issue template for the bootstrap command.
 * 
 * This template is embedded within the package and used to create issue files
 * when bootstrapping a project. It provides a comprehensive structure for
 * documenting requirements, acceptance criteria, and technical details.
 * 
 * Template placeholders (e.g., [NUMBER], [TITLE]) are replaced dynamically
 * during issue creation based on the parsed master plan content.
 * 
 * @constant {string}
 * @example
 * // The template will be processed to replace placeholders:
 * // [NUMBER] -> Issue number (e.g., "1", "2", etc.)
 * // [TITLE] -> Issue title from the master plan
 * // [REQUIREMENT] -> Detailed requirement description
 * // [ACCEPTANCE_CRITERIA] -> List of criteria for completion
 * // [TECHNICAL_DETAILS] -> Implementation specifics
 * // [DEPENDENCIES] -> Related issues or external dependencies
 * // [RESOURCES] -> Reference materials and documentation
 * // [NOTES] -> Additional context or considerations
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
 * 
 * This template is embedded within the package and used to create plan files
 * that accompany each issue. It provides a structured approach for breaking
 * down work into phases with clear implementation steps.
 * 
 * The plan template helps AI agents understand the execution strategy and
 * ensures consistent project delivery across different issues.
 * 
 * @constant {string}
 * @example
 * // The template will be processed to replace placeholders:
 * // [NUMBER] -> Issue number matching the issue file
 * // [TITLE] -> Issue title for context
 * // [ISSUE_FILE_NAME] -> Generated filename for cross-referencing
 * // [PHASE_1_TASKS] -> Initial setup and preparation tasks
 * // [PHASE_2_TASKS] -> Core implementation work
 * // [PHASE_3_TASKS] -> Integration and connection tasks
 * // [PHASE_4_TASKS] -> Testing and documentation tasks
 * // [TECHNICAL_APPROACH] -> Implementation strategy details
 * // [POTENTIAL_CHALLENGES] -> Known risks and mitigation
 * // [SUCCESS_METRICS] -> Criteria for successful completion
 * // [ROLLBACK_STRATEGY] -> Recovery plan if issues arise
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