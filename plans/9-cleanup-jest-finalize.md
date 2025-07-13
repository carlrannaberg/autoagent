# Plan for Issue 9: Clean Up Jest and Finalize Migration

This document outlines the step-by-step plan to complete `issues/9-cleanup-jest-finalize.md`.

## Overview

This plan covers cleaning up Jest configuration and finalizing the migration to the new testing framework.

## Implementation Steps



### Phase 1: Verify Migration Complete
- [ ] Run full test suite with Vitest
- [ ] Check all test types work (unit, integration, e2e)
- [ ] Verify coverage meets thresholds
- [ ] Confirm CI/CD pipeline green

### Phase 2: Remove Jest Dependencies
- [ ] Remove jest from devDependencies
- [ ] Remove @types/jest
- [ ] Remove ts-jest
- [ ] Remove any Jest plugins
- [ ] Clean node_modules and reinstall

### Phase 3: Clean Configuration
- [ ] Delete jest.config.js if exists
- [ ] Remove Jest settings from package.json
- [ ] Delete any Jest setup files
- [ ] Archive old config for reference

### Phase 4: Update Documentation
- [ ] Update README.md testing section
- [ ] Update CONTRIBUTING.md
- [ ] Update CLAUDE.md with Vitest info
- [ ] Create MIGRATION_GUIDE.md
- [ ] Update any test-related docs

### Phase 5: Final Validation
- [ ] Search codebase for "jest" references
- [ ] Verify all imports are "vitest"
- [ ] Run final test suite
- [ ] Create completion summary

## Documentation Updates

### README.md Testing Section
```markdown
## Testing

This project uses Vitest for testing. Run tests with:

\`\`\`bash
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:ui    # Interactive UI
npm run test:coverage # With coverage
\`\`\`
```

### Migration Guide Content
- Why we migrated to Vitest
- Key differences for developers
- Common patterns and examples
- Troubleshooting guide

## Cleanup Checklist
```bash
# Files to remove:
- jest.config.js
- jest.setup.js
- **/*.test.js.snap (old snapshots)

# Packages to remove:
- jest
- @types/jest  
- ts-jest
- jest-* (any plugins)
```

## Potential Challenges
- Hidden Jest references in comments
- Documentation in multiple places
- Third-party integration updates
- Developer habit changes

## Success Metrics
- Zero Jest dependencies
- All tests passing
- Documentation updated
- Team trained on Vitest