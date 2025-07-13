# Plan for Issue #12: Migrate ESLint Configuration to v9 Format

This document outlines the step-by-step plan to migrate ESLint configuration to the v9 flat config format.

## Overview

This plan covers the migration from the legacy `.eslintrc.js` configuration to ESLint v9's new flat config format. The migration involves converting the extends/plugins/rules structure to the new import-based configuration system while maintaining all existing linting rules and behaviors. This addresses compatibility issues with updated dependencies and ensures the project stays current with ESLint's recommended configuration approach.

## Implementation Steps

1. **Analyze current configuration** - Document all rules, plugins, extends, and parser settings in `.eslintrc.js`
2. **Check compatibility** - Verify all ESLint plugins and @typescript-eslint packages support v9
3. **Create flat config** - Set up new `eslint.config.js` with proper imports and module structure
4. **Migrate settings** - Convert extends to imports, transfer rules, and configure TypeScript parser
5. **Configure file patterns** - Set up proper file matching patterns and ignore rules
6. **Test configuration** - Run lint commands to verify all files are checked with correct rules
7. **Update CI/CD** - Ensure GitHub workflows work with the new configuration
8. **Clean up** - Remove old `.eslintrc.js` and update documentation

## Implementation Plan

### Phase 1: Analysis and Preparation
- [ ] Review current `.eslintrc.js` configuration
- [ ] Document all current rules, plugins, and extends
- [ ] Research ESLint v9 flat config syntax
- [ ] Check @typescript-eslint compatibility with ESLint v9

### Phase 2: Dependency Updates
- [ ] Verify all ESLint plugins are v9 compatible
- [ ] Update @typescript-eslint packages if needed
- [ ] Check for any deprecated plugins or rules

### Phase 3: Configuration Migration
- [ ] Create new `eslint.config.js` file
- [ ] Convert extends to imported configurations
- [ ] Migrate plugins to new import format
- [ ] Transfer all custom rules
- [ ] Configure TypeScript parser correctly
- [ ] Set up file patterns and ignores

### Phase 4: Testing and Refinement
- [ ] Run `npm run lint` to test configuration
- [ ] Fix any configuration errors
- [ ] Ensure all files are linted correctly
- [ ] Test auto-fix functionality
- [ ] Verify CI/CD compatibility

### Phase 5: Cleanup
- [ ] Remove old `.eslintrc.js` file
- [ ] Update any documentation references
- [ ] Ensure `.gitignore` and other configs are updated

## Technical Approach
### Configuration Structure
```javascript
// eslint.config.js
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        // TypeScript parser options
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      // Migrated rules
    }
  }
];
```

## Potential Challenges
- Plugin compatibility with ESLint v9
- Syntax differences in flat config
- Maintaining exact same linting behavior
- Handling global ignores and patterns

## Migration Checklist
- [ ] All extends converted to imports
- [ ] All plugins properly imported
- [ ] Parser configuration migrated
- [ ] Rules transferred correctly
- [ ] File patterns configured
- [ ] Ignore patterns set up
- [ ] TypeScript files properly linted

## Success Metrics
- `npm run lint` runs without errors
- All existing lint rules are enforced
- Dependabot PR #10 passes linting
- No files accidentally excluded from linting
- CI/CD linting job passes