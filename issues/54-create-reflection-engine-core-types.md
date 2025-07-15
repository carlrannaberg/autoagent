# Issue 54: Create reflection engine core types and interfaces

## Description
Define the TypeScript types and interfaces required for the reflection engine functionality. This establishes the foundation for the AI-powered self-reflection system.

## Requirements
Define the TypeScript types and interfaces required for the reflection engine functionality. This includes configuration types, improvement analysis types, and reflection result types.

## Acceptance Criteria
- [ ] Create `src/types/reflection.ts` with all reflection-related type definitions
- [ ] Define `ReflectionConfig` interface with all configuration options
- [ ] Create types for improvement analysis and scoring
- [ ] Define change types (ADD_ISSUE, MODIFY_ISSUE, etc.)
- [ ] Create interfaces for reflection results and state
- [ ] Export all types from `src/types/index.ts`
- [ ] Ensure types follow TypeScript best practices

## Technical Details
- Use TypeScript interfaces for configuration
- Define enums for change types
- Ensure all properties have clear JSDoc comments
- Make optional properties explicit with `?`
- Use appropriate default values in comments

## Resources
- Master Plan: `./specs/reflective-improvement-loop.md` (lines 40-47)
