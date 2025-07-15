# Issue 56: Build reflection engine core logic

## Description
Implement the core reflection engine that analyzes decomposed issues and plans, identifies gaps, and generates improvement suggestions. This is the heart of the self-improvement system.

## Requirements
Implement the core reflection engine that analyzes decomposed issues and plans, identifies gaps, and generates improvement suggestions.

## Acceptance Criteria
- [ ] Create `src/core/reflection-engine.ts` with main reflection logic
- [ ] Implement `reflectiveDecomposition` function
- [ ] Create `reflectOnIssuesAndPlans` function for analysis
- [ ] Implement `shouldSkipReflection` logic for simple specs
- [ ] Add iteration control and early termination logic
- [ ] Create reflection prompt builder
- [ ] Handle provider communication for reflection analysis

## Technical Details
- Implement the reflection process flow as specified
- Use provider abstraction for AI communication
- Build structured prompts for consistent analysis
- Parse and validate AI responses
- Implement improvement scoring logic

## Dependencies
- Issue 54: Create reflection engine core types and interfaces
- Issue 55: Implement reflection configuration support

## Resources
- Master Plan: `./specs/reflective-improvement-loop.md` (lines 50-78, 83-123)
