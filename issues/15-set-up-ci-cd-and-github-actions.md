# Issue 15: Set up CI/CD and GitHub Actions

## Requirement
Configure GitHub Actions workflows for automated testing, version checking, and npm package publishing with proper security and automation.

## Acceptance Criteria
- [ ] PR workflow runs tests and linting
- [ ] Version change check prevents unchanged versions
- [ ] Release workflow publishes to npm automatically
- [ ] Tests run on multiple Node.js versions
- [ ] Coverage reports are generated
- [ ] Workflows use secure npm token
- [ ] Release tags are created automatically
- [ ] Build artifacts are validated

## Technical Details
- Create .github/workflows/ directory
- Use Node.js 14, 16, and 18 for testing
- Configure npm authentication securely
- Automate version tag creation
- Run tests before publishing

## Resources
- Master Plan: GitHub Actions specifications
- GitHub Actions documentation
- npm publish automation guides
- Security best practices for CI/CD