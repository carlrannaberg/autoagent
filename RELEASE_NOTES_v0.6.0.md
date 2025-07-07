# Release Notes - v0.6.0

This minor release introduces significant new features for git automation, improved developer tooling, and comprehensive test infrastructure improvements.

## 🎉 Highlights

- **Git Auto-Push**: Fully automated git workflows with push support
- **Git Hooks Control**: Fine-grained control over git hooks during commits
- **100% Test Pass Rate**: Fixed all 64 failing tests
- **Claude Code Integration**: Enhanced development experience with auto-fixing hooks

## ✨ New Features

### Git Auto-Push Functionality
- Automatic push after commits for fully automated workflows
- New CLI flags: `--push` to enable, `--no-push` to disable
- Configuration commands: `config set-auto-push`, `config set-push-remote`, `config set-push-branch`
- Secure by default (auto-push disabled)
- Comprehensive validation before pushing

### Git Hooks Control
- `--verify` flag to force enable git hooks
- `--no-verify` flag to skip git hooks during commits
- Configuration support via `config set-commit-no-verify`
- Graceful handling of conflicting flags

### Enhanced Git Validation
- Comprehensive environment checks before operations
- Detailed error messages with remediation steps
- Early validation to save AI provider resources
- Debug mode for troubleshooting git issues

## 🐛 Bug Fixes

### Test Infrastructure (64 failures → 0)
- Fixed git utility test mocking for promisified exec
- Resolved CLI command flag handling issues
- Fixed type imports and missing properties
- Updated test mocks with proper initialization

### Claude Code Hooks
- Fixed JSON parsing from stdin
- Added ESLint auto-fix capability
- Updated to use Vitest for test running
- Fixed hook paths with proper variables

## 📚 Documentation

- Comprehensive test mocking patterns in AGENT.md
- NPM registry version checking guidance
- Improved release process documentation
- Added troubleshooting for common issues

## 🔧 Developer Experience

- ESLint auto-fix in validation hooks
- Automatic TypeScript import fixes
- Related test running on file changes
- Better error messages throughout

## 📦 Dependencies

No new runtime dependencies added. All improvements are in the core functionality.

## 🚀 Upgrading

```bash
npm install -g autoagent-cli@0.6.0
```

## 💔 Breaking Changes

None. All new features are opt-in and backward compatible.

## 🙏 Acknowledgments

Thanks to all contributors who helped identify and fix the test failures, and for the feedback on improving the git automation features.