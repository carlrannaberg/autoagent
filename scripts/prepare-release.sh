#!/bin/bash

# prepare-release.sh - Automate release preparation using Claude

set -e  # Exit on error

# Check if claude CLI is available
if ! command -v claude &> /dev/null; then
    echo "Error: claude CLI is not installed"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Get the release type (patch, minor, major)
RELEASE_TYPE=${1:-patch}

if [[ ! "$RELEASE_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo "Usage: $0 [patch|minor|major]"
    echo "  patch: 0.0.1 -> 0.0.2 (bug fixes)"
    echo "  minor: 0.0.1 -> 0.1.0 (new features)"
    echo "  major: 0.0.1 -> 1.0.0 (breaking changes)"
    exit 1
fi

echo "Preparing $RELEASE_TYPE release..."

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# Get the last tag
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -z "$LAST_TAG" ]; then
    echo "No previous tags found. This will be the first tagged release."
    LAST_TAG="HEAD"
else
    echo "Last release tag: $LAST_TAG"
fi

# Show recent commits
echo
echo "Commits since last release ($LAST_TAG):"
echo "==========================="
COMMIT_COUNT=$(git rev-list ${LAST_TAG}..HEAD --count)
echo "Found $COMMIT_COUNT commits since $LAST_TAG"
git log ${LAST_TAG}..HEAD --oneline | head -20
echo
echo "Using Claude to analyze changes and prepare release..."

# Use Claude to prepare the release
# Add current directory access and let output stream to console
echo "Executing Claude command..."
echo "Command: claude --add-dir . --dangerously-skip-permissions --verbose -p [prompt]"

# Temporarily disable exit on error for Claude command
set +e
claude --add-dir . --dangerously-skip-permissions --verbose -p "You are preparing a new $RELEASE_TYPE release for the AutoAgent npm package.

Current version: $CURRENT_VERSION

Please do the following:
1. Find the last release tag using: git describe --tags --abbrev=0
2. Get the actual changes since that tag using: git diff <last-tag>..HEAD --stat and git diff <last-tag>..HEAD
3. Analyze the ACTUAL CODE CHANGES (not just commit messages) and write accurate changelog entries:
   - Fixed: bug fixes (what was actually fixed in the code)
   - Added: new features (what new functionality was added)
   - Changed: changes to existing functionality (what behavior changed)
   - Removed: removed features (what was deleted)
   - Security: security fixes
   - Documentation: documentation only changes
4. DO NOT just copy commit messages. Look at what files changed and what the changes actually do.
5. Update CHANGELOG.md with a new section for the new version, organizing changes by category
6. Update the version in package.json using: npm version $RELEASE_TYPE --no-git-tag-version
7. Create a git commit with message \"chore: prepare for vX.X.X release\" where X.X.X is the new version

Follow the Keep a Changelog format and include the date. Only include categories that have changes.

DO NOT create a git tag - the GitHub Actions workflow will create it during the release process."

CLAUDE_EXIT_CODE=$?
set -e  # Re-enable exit on error

if [ $CLAUDE_EXIT_CODE -ne 0 ]; then
    echo "Error: Claude command failed with exit code $CLAUDE_EXIT_CODE"
    exit 1
fi

echo
echo "Release preparation complete!"
echo "Next steps:"
echo "1. Review the changes: git diff HEAD~1"
echo "2. Push to GitHub: git push origin master"
echo "3. The GitHub Actions will create the tag and publish to npm"