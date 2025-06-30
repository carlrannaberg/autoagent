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

# Use Claude to prepare the release
claude --no-conversation << EOF
You are preparing a new $RELEASE_TYPE release for the AutoAgent npm package.

Current version: $CURRENT_VERSION

Please do the following:
1. Look at the git log to see what changed since the last release
2. Update CHANGELOG.md with a new section for the new version
3. Update the version in package.json using npm version $RELEASE_TYPE --no-git-tag-version
4. Create a git commit with message "chore: prepare for vX.X.X release"
5. Create an annotated git tag for the release

Make sure to include all relevant changes in the CHANGELOG.md based on the commit history.
EOF

echo
echo "Release preparation complete!"
echo "Next steps:"
echo "1. Review the changes: git diff HEAD~1"
echo "2. Push to GitHub: git push origin master && git push origin --tags"
echo "3. The GitHub Actions release workflow will automatically publish to npm"