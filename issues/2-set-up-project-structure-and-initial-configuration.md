# Issue 2: Set up project structure and initial configuration

## Requirement
Create the initial project structure for the autoagent npm package including all necessary directories, configuration files, and basic setup as specified in the master plan.

## Acceptance Criteria
- [ ] GitHub repository is created with proper description
- [ ] Complete directory structure is established (src/, test/, templates/, etc.)
- [ ] All configuration files are created (.nvmrc, .gitignore, .npmignore)
- [ ] package.json is properly configured with all dependencies
- [ ] TypeScript configuration (tsconfig.json) is set up
- [ ] ESLint configuration is added
- [ ] Project builds without errors

## Technical Details
- Use Node.js 18.0.0 as specified in .nvmrc
- Follow the exact directory structure from master-plan.md
- Configure TypeScript for ES2020 target with strict mode
- Set up Jest with ts-jest for testing
- Package should be < 15KB gzipped

## Resources
- Master Plan: `master-plan.md` (Step 1-3)
- Node.js version: 18.0.0
- Dependencies: chalk@4.1.2, commander@11.0.0