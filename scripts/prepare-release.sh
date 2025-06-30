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
echo "Commits since last release:"
echo "==========================="
git log ${LAST_TAG}..HEAD --oneline | head -20
echo
echo "Using Claude to analyze changes and prepare release..."

# Use Claude to prepare the release
claude -p "$(cat << EOF
You are preparing a new $RELEASE_TYPE release for the AutoAgent npm package.

Current version: $CURRENT_VERSION

Please do the following:
1. Find the last release tag using: git describe --tags --abbrev=0
2. Get all commits since that tag using: git log <last-tag>..HEAD --oneline
3. Analyze these commits and categorize them as:
   - Fixed: bug fixes
   - Added: new features
   - Changed: changes to existing functionality
   - Removed: removed features
   - Security: security fixes
   - Documentation: documentation only changes
4. Update CHANGELOG.md with a new section for the new version, organizing changes by category
5. Update the version in package.json using: npm version $RELEASE_TYPE --no-git-tag-version
6. Create a git commit with message "chore: prepare for vX.X.X release" where X.X.X is the new version
7. Create an annotated git tag using: git tag -a vX.X.X -m "Release vX.X.X"

Follow the Keep a Changelog format and include the date. Only include categories that have changes.
EOF
)"

echo
echo "Release preparation complete!"
echo "Next steps:"
echo "1. Review the changes: git diff HEAD~1"
echo "2. Push to GitHub: git push origin master && git push origin --tags"
echo "3. The GitHub Actions release workflow will automatically publish to npm"