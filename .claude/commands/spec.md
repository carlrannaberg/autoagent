---
allowed-tools: Read, Write, Grep, Glob, TodoWrite
description: Generate a spec file for a new feature or bugfix
---

## Context
- Existing specs: !`ls -la specs/`
- Example spec format: @specs/vitest-migration.md

## Your task

Create a comprehensive specification document in the `specs/` folder for the following feature/bugfix: $ARGUMENTS

The spec should be a technical specification document (NOT a test file) that includes:

1. **Title**: Clear, descriptive title of the feature/bugfix
2. **Overview**: Brief description and purpose
3. **Background/Problem Statement**: Why this feature is needed or what problem it solves
4. **Goals**: What we aim to achieve
5. **Non-Goals**: What is explicitly out of scope
6. **Detailed Design**: 
   - Architecture changes
   - Implementation approach
   - Code structure
   - API changes (if any)
7. **Migration Strategy** (if applicable): How to migrate existing code/users
8. **Testing Strategy**: How the feature will be tested
9. **Performance Considerations**: Impact on performance
10. **Security Considerations**: Security implications
11. **Documentation**: What documentation needs to be updated
12. **Implementation Phases**: Step-by-step implementation plan
13. **Open Questions**: Any unresolved questions or decisions

Follow these guidelines:
- Use Markdown format similar to existing specs
- Be thorough and technical
- Include code examples where helpful
- Consider edge cases and error scenarios
- Reference existing project patterns and conventions

Name the spec file descriptively based on the feature (e.g., `feature-name.md` or `fix-issue-description.md`).