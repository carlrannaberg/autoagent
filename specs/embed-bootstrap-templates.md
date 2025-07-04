# Embed Bootstrap Templates in Package

## Overview

The bootstrap command currently expects template files (`issue.md` and `plan.md`) to exist in the project's `templates/` directory. These templates should be embedded within the autoagent package itself, making bootstrap work out-of-the-box without requiring users to create template files.

## Background/Problem Statement

### Current Behavior

When running `autoagent bootstrap <master-plan>`, the system:
1. Looks for templates in `{workspace}/templates/issue.md` and `{workspace}/templates/plan.md`
2. Fails with `ENOENT` error if templates don't exist
3. Requires users to manually create template files before using bootstrap

### Root Cause

In `src/core/autonomous-agent.ts` lines 787-789:
```typescript
const templateDir = path.join(this.config.workspace ?? process.cwd(), 'templates');
const issueTemplate = await this.fileManager.readFile(path.join(templateDir, 'issue.md'));
const planTemplate = await this.fileManager.readFile(path.join(templateDir, 'plan.md'));
```

The code expects templates to exist in the user's project directory rather than being packaged with autoagent.

### Impact

- **Poor User Experience**: Bootstrap fails on first use without clear guidance
- **Setup Friction**: Users must find/create templates before using bootstrap
- **Inconsistent Templates**: Each project may have different template formats
- **Distribution Issues**: Templates aren't part of the npm package

## Goals

1. **Zero Configuration**: Bootstrap should work immediately after installation
2. **Embedded Templates**: Package templates within autoagent distribution
3. **Consistent Format**: All users get the same high-quality templates
4. **Easy Updates**: Template improvements ship with package updates
5. **Future Extensibility**: Support for custom template overrides (future feature)

## Non-Goals

- Custom template overrides (future feature - out of scope)
- Template versioning or migration
- Multiple template variants/themes
- Template configuration options
- Changing the template content/format

## Detailed Design

### Architecture Changes

Templates will be embedded as TypeScript string constants or loaded from embedded files during build time, ensuring they're always available within the package.

### Implementation Approach

#### Option 1: TypeScript String Constants (Recommended)

Embed templates directly in the codebase as string constants:

```typescript
// src/templates/default-templates.ts
export const DEFAULT_ISSUE_TEMPLATE = `# Issue [NUMBER]: [TITLE]

## Requirement
[Provide a clear, concise description of what needs to be done. This should be specific enough for an AI agent to understand the task.]

## Acceptance Criteria
- [ ] [First specific criterion that must be met]
- [ ] [Second specific criterion that must be met]
- [ ] [Additional criteria as needed]
- [ ] [Tests are written and passing (if applicable)]
- [ ] [Documentation is updated (if applicable)]

## Technical Details
[Optional section: Include any technical specifications, constraints, or implementation hints]

- [Technical detail 1]
- [Technical detail 2]
- [API changes, if any]
- [Database changes, if any]

## Dependencies
[Optional section: List any issues that must be completed before this one]

- Depends on: Issue #[NUMBER]
- Blocked by: [External dependency]

## Resources
[Optional section: Links to relevant documentation, discussions, or examples]

- [Link to relevant documentation]
- [Link to design discussion]
- [Example implementation]

## Notes
[Optional section: Any additional context or considerations]`;

export const DEFAULT_PLAN_TEMPLATE = `# Plan for Issue [NUMBER]: [TITLE]

This document outlines the step-by-step plan to complete \`issues/[NUMBER]-[issue-slug].md\`.

## Implementation Plan

### Phase 1: [Initial Setup/Research]
- [ ] [First task in this phase]
- [ ] [Second task in this phase]
- [ ] [Additional tasks as needed]
- [ ] [Verify phase completion]

### Phase 2: [Core Implementation]
- [ ] [Main implementation task 1]
- [ ] [Main implementation task 2]
- [ ] [Error handling implementation]
- [ ] [Unit tests for this phase]

### Phase 3: [Integration/Enhancement]
- [ ] [Integration with existing code]
- [ ] [Additional features]
- [ ] [Performance optimization]
- [ ] [Integration tests]

### Phase 4: [Testing and Documentation]
- [ ] [Write comprehensive tests]
- [ ] [Update documentation]
- [ ] [Add code examples]
- [ ] [Final verification]

## Technical Approach
[Describe the technical approach and key decisions]

- [Key technical decision 1]
- [Architecture consideration]
- [Technology choices]
- [Design patterns to use]

## Potential Challenges
[Identify potential issues and mitigation strategies]

- [Challenge 1] - [Mitigation strategy]
- [Challenge 2] - [Mitigation strategy]
- [Edge cases to consider]
- [Performance considerations]

## Success Metrics
[Define how to measure successful completion]

- [All tests passing]
- [Performance benchmarks met]
- [Documentation complete]
- [Code review approved]

## Rollback Strategy
[Optional: How to rollback if issues arise]

- [Rollback procedure]
- [Data migration reversal]
- [Feature flag disable]`;
```

#### Option 2: Build-Time File Embedding

Use a build step to convert template files to TypeScript:

```typescript
// Generated during build from templates/*.md
export const TEMPLATES = {
  issue: '...file contents...',
  plan: '...file contents...'
};
```

### Code Structure

```typescript
// src/core/autonomous-agent.ts
import { DEFAULT_ISSUE_TEMPLATE, DEFAULT_PLAN_TEMPLATE } from '../templates/default-templates';

async bootstrap(masterPlanPath: string): Promise<void> {
  // ... existing code ...
  
  // Use embedded templates instead of reading from filesystem
  const issueTemplate = DEFAULT_ISSUE_TEMPLATE;
  const planTemplate = DEFAULT_PLAN_TEMPLATE;
  
  // ... rest of bootstrap logic ...
}
```

### Future Extension Point

For future custom template support:

```typescript
// Future implementation (not in scope)
async getTemplates(): Promise<{ issue: string; plan: string }> {
  // Check for custom templates first
  const customTemplateDir = path.join(this.config.workspace, 'templates');
  
  try {
    const customIssue = await this.fileManager.readFile(path.join(customTemplateDir, 'issue.md'));
    const customPlan = await this.fileManager.readFile(path.join(customTemplateDir, 'plan.md'));
    return { issue: customIssue, plan: customPlan };
  } catch {
    // Fall back to embedded defaults
    return { 
      issue: DEFAULT_ISSUE_TEMPLATE, 
      plan: DEFAULT_PLAN_TEMPLATE 
    };
  }
}
```

### API Changes

**No public API changes** - this is an internal implementation improvement that maintains the same CLI interface.

## Migration Strategy

### For Users

**No migration required**:
- Existing projects with custom templates continue to work (once override feature is added)
- Projects without templates now work immediately
- No breaking changes to CLI commands

### For Existing Templates

Current template files in the repository should be:
1. Converted to TypeScript constants
2. Original files kept for reference/documentation
3. Build process updated if using Option 2

### Deployment Strategy

1. This can be deployed as a **patch release** (bug fix)
2. No breaking changes
3. Immediate fix for bootstrap command failure

## Testing Strategy

### Unit Tests

```typescript
describe('Bootstrap Template Loading', () => {
  it('should use embedded templates when no custom templates exist', async () => {
    const workspace = await TestWorkspace.create();
    // Don't create template files
    
    const agent = new AutonomousAgent({ workspace: workspace.path });
    
    // Mock provider to capture prompt
    let capturedPrompt: string;
    mockProvider.execute.mockImplementation(async (prompt: string) => {
      capturedPrompt = prompt;
      return { success: true, output: 'Generated issues' };
    });
    
    await agent.bootstrap('master-plan.md');
    
    // Verify embedded templates were used in prompt
    expect(capturedPrompt).toContain('Issue [NUMBER]: [TITLE]');
    expect(capturedPrompt).toContain('Plan for Issue [NUMBER]');
  });
  
  it('should not require templates directory to exist', async () => {
    const workspace = await TestWorkspace.create();
    
    // Ensure no templates directory
    const templatesDir = path.join(workspace.path, 'templates');
    expect(await fs.exists(templatesDir)).toBe(false);
    
    const agent = new AutonomousAgent({ workspace: workspace.path });
    
    // Should not throw
    await expect(agent.bootstrap('master-plan.md')).resolves.not.toThrow();
  });
});
```

### Integration Tests

```typescript
describe('Bootstrap with Embedded Templates', () => {
  it('should successfully bootstrap without template files', async () => {
    const { stdout, stderr } = await execCLI(['bootstrap', 'master-plan.md']);
    
    expect(stderr).not.toContain('ENOENT');
    expect(stdout).toContain('Bootstrap completed');
    
    // Verify issues were created
    const issues = await fs.readdir(path.join(testWorkspace, 'issues'));
    expect(issues.length).toBeGreaterThan(0);
  });
  
  it('should create properly formatted issues using embedded templates', async () => {
    await execCLI(['bootstrap', 'master-plan.md']);
    
    const issueFile = await fs.readFile('issues/1-implement-plan.md', 'utf-8');
    
    // Verify template structure was used
    expect(issueFile).toContain('## Requirement');
    expect(issueFile).toContain('## Acceptance Criteria');
    expect(issueFile).toContain('## Technical Details');
  });
});
```

### Error Handling Tests

```typescript
describe('Template Error Handling', () => {
  it('should provide clear error if templates are somehow missing', async () => {
    // Mock template constants to be undefined
    jest.mock('../templates/default-templates', () => ({}));
    
    const agent = new AutonomousAgent({ workspace: testWorkspace });
    
    await expect(agent.bootstrap('master-plan.md'))
      .rejects.toThrow('Bootstrap templates not found');
  });
});
```

## Performance Considerations

### Current Performance
- File I/O operations to read template files
- Potential filesystem latency
- Directory traversal overhead

### Impact Analysis
- **Improved Performance**: Eliminates filesystem reads for templates
- **Memory Impact**: Minimal - templates are small (~2KB each)
- **Startup Time**: Faster - no filesystem operations needed
- **Bundle Size**: Increases by ~4KB (acceptable)

### Optimization Benefits
- Templates loaded from memory instead of disk
- No filesystem permission issues
- Consistent performance across environments

## Security Considerations

### Positive Security Impact
- **No File Access Required**: Eliminates filesystem reads in user directory
- **Immutable Templates**: Can't be tampered with on disk
- **Consistent Content**: All users get same secure templates

### No New Security Risks
- Templates are static strings in code
- No dynamic content loading
- No user input in template selection (currently)

### Enhanced Security
- Eliminates potential template injection via filesystem
- No path traversal risks
- Templates can be reviewed in code reviews

## Documentation

### User Documentation

Update README.md:

```markdown
## Bootstrap Command

The `autoagent bootstrap` command automatically decomposes a master plan into individual issues and plans.

### Usage
```bash
autoagent bootstrap master-plan.md
```

### Built-in Templates

AutoAgent includes professional templates for issues and plans. These templates ensure:
- Consistent issue formatting
- Clear acceptance criteria
- Structured implementation plans
- Proper documentation sections

No setup required - templates are built into the package!

### Custom Templates (Future Feature)

In a future release, you'll be able to override the built-in templates by creating your own in `templates/issue.md` and `templates/plan.md`.
```

### Code Documentation

```typescript
/**
 * Default issue template embedded in the package.
 * Used by bootstrap command to create consistent issue formats.
 * @const
 */
export const DEFAULT_ISSUE_TEMPLATE: string;

/**
 * Default plan template embedded in the package.
 * Used by bootstrap command to create structured implementation plans.
 * @const
 */
export const DEFAULT_PLAN_TEMPLATE: string;
```

## Implementation Phases

### Phase 1: Core Implementation (4 hours)

1. **Create Template Module** (1 hour)
   - Create `src/templates/default-templates.ts`
   - Copy existing templates as string constants
   - Export constants with proper types

2. **Update Bootstrap Method** (1 hour)
   - Import template constants
   - Replace filesystem reads with constants
   - Remove template directory dependency

3. **Error Handling** (30 minutes)
   - Add validation for template availability
   - Improve error messages
   - Handle edge cases

4. **Manual Testing** (1.5 hours)
   - Test bootstrap without template files
   - Verify in new projects
   - Test error scenarios

### Phase 2: Testing and Polish (3 hours)

1. **Unit Tests** (1.5 hours)
   - Test embedded template usage
   - Test error handling
   - Test template content

2. **Integration Tests** (1 hour)
   - Full bootstrap workflow tests
   - CLI integration tests
   - Cross-platform testing

3. **Documentation Updates** (30 minutes)
   - Update README
   - Add code comments
   - Update CHANGELOG

### Phase 3: Future Preparation (1 hour)

1. **Design Override System** (30 minutes)
   - Plan custom template detection
   - Design configuration approach
   - Document future API

2. **Add Extension Points** (30 minutes)
   - Add TODO comments for override logic
   - Structure code for future expansion
   - Consider template versioning

## Open Questions

### 1. Should templates be minified?

**Question**: Should we minimize whitespace in template strings to reduce bundle size?

**Analysis**:
- Templates are ~2KB each (4KB total)
- Readability vs size tradeoff
- Modern compression handles this well

**Recommendation**: Keep templates readable - bundle size impact is negligible

### 2. Should we support template includes/partials?

**Question**: Should templates support including common sections?

**Analysis**:
- Adds complexity
- Templates are currently simple
- Could be useful for consistency

**Recommendation**: Not for initial implementation - keep it simple

### 3. How should we handle template updates?

**Question**: When we improve templates, how do users benefit?

**Analysis**:
- Embedded templates update with package
- No migration needed
- Users get improvements automatically

**Recommendation**: Document template changes in CHANGELOG

### 4. Should we validate template placeholders?

**Question**: Should we verify templates have required placeholders like [NUMBER]?

**Analysis**:
- Could catch template errors early
- Adds complexity
- Templates are controlled by us

**Recommendation**: Add basic validation to catch obvious issues

---

## Summary

This specification addresses the bootstrap command's dependency on external template files by embedding them directly in the autoagent package. This zero-configuration approach improves user experience, ensures consistency, and eliminates a common failure point for new users.

The implementation is straightforward, maintains backward compatibility (with future override support), and provides immediate value by making bootstrap work out-of-the-box. The embedded templates can be updated and improved with each package release, benefiting all users automatically.