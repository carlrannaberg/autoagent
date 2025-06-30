#!/bin/bash

# rollback-release.sh - Rollback a release that was prepared but not published

set -e  # Exit on error

# Check if version tag is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <version-tag>"
    echo "Example: $0 v0.0.2"
    echo
    echo "This script will:"
    echo "  1. Delete the specified git tag (local and remote)"
    echo "  2. Revert package.json to previous version"
    echo "  3. Move CHANGELOG entries back to [Unreleased]"
    echo "  4. Optionally undo the release commit"
    exit 1
fi

VERSION_TAG=$1
VERSION=${VERSION_TAG#v}  # Remove 'v' prefix

echo "Rolling back release $VERSION_TAG..."

# Get package name from package.json
PACKAGE_NAME=$(node -p "require('./package.json').name")
echo "Package name: $PACKAGE_NAME"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Warning: npm is not installed, skipping registry check"
    read -p "Continue without checking npm registry? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Rollback cancelled"
        exit 1
    fi
else
    # Check if version exists in npm registry
    echo "Checking if $PACKAGE_NAME@$VERSION is published to npm..."
    
    # Temporarily disable exit on error for npm check
    set +e
    NPM_CHECK_OUTPUT=$(npm view "$PACKAGE_NAME@$VERSION" version 2>&1)
    NPM_CHECK_EXIT_CODE=$?
    set -e  # Re-enable exit on error
    
    if [ $NPM_CHECK_EXIT_CODE -eq 0 ]; then
        echo "❌ Error: Version $VERSION is already published to npm!"
        echo "Published versions cannot be rolled back or reused."
        echo "You must create a new version instead."
        exit 1
    elif echo "$NPM_CHECK_OUTPUT" | grep -q "E404"; then
        echo "✅ Version $VERSION is not published to npm, safe to rollback"
    else
        # Network error or other issue
        echo "Warning: Could not verify npm registry status"
        echo "Error: $NPM_CHECK_OUTPUT"
        read -p "Continue anyway? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Rollback cancelled"
            exit 1
        fi
    fi
fi

# Check if tag exists locally
if ! git rev-parse "$VERSION_TAG" >/dev/null 2>&1; then
    echo "Error: Tag $VERSION_TAG does not exist locally"
    exit 1
fi

# Get the commit hash of the tag
TAG_COMMIT=$(git rev-list -n 1 "$VERSION_TAG")
echo "Tag $VERSION_TAG points to commit: $TAG_COMMIT"

# Check if it's the most recent commit
HEAD_COMMIT=$(git rev-parse HEAD)
if [ "$TAG_COMMIT" = "$HEAD_COMMIT" ]; then
    echo "Tag is on the current commit. Release commit can be undone."
    CAN_UNDO_COMMIT=true
else
    echo "Warning: Tag is not on the current commit. Only tag and version will be rolled back."
    CAN_UNDO_COMMIT=false
fi

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current package.json version: $CURRENT_VERSION"

# Get previous version from git history
echo "Finding previous version..."
PREVIOUS_VERSION=$(git show HEAD~1:package.json 2>/dev/null | grep '"version"' | sed -E 's/.*"version": "([^"]+)".*/\1/' || echo "")

if [ -z "$PREVIOUS_VERSION" ]; then
    echo "Warning: Could not determine previous version from git history"
    read -p "Enter the previous version manually (or press Enter to skip): " PREVIOUS_VERSION
fi

# Confirmation
echo
echo "This will:"
echo "  - Delete tag $VERSION_TAG (local and remote)"
echo "  - Revert package.json version from $CURRENT_VERSION to ${PREVIOUS_VERSION:-[manual edit required]}"
echo "  - Move CHANGELOG.md entries from [$VERSION] to [Unreleased]"
if [ "$CAN_UNDO_COMMIT" = true ]; then
    echo "  - Undo the release commit"
fi
echo
read -p "Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Rollback cancelled"
    exit 1
fi

# Delete local tag
echo "Deleting local tag..."
git tag -d "$VERSION_TAG"

# Delete remote tag if it exists
echo "Checking for remote tag..."
if git ls-remote --tags origin | grep -q "refs/tags/$VERSION_TAG"; then
    echo "Deleting remote tag..."
    git push origin --delete "$VERSION_TAG" || echo "Warning: Could not delete remote tag"
else
    echo "Remote tag does not exist, skipping..."
fi

# If we can undo the commit and user wants to
if [ "$CAN_UNDO_COMMIT" = true ]; then
    read -p "Undo the release commit? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Undoing release commit..."
        git reset --soft HEAD~1
        echo "Commit undone. Changes are staged."
    else
        # If not undoing commit, we need to create a new commit with reverted changes
        echo "Creating revert changes..."
        
        # Revert package.json version
        if [ -n "$PREVIOUS_VERSION" ]; then
            echo "Reverting package.json to version $PREVIOUS_VERSION..."
            sed -i.bak "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$PREVIOUS_VERSION\"/" package.json
            rm package.json.bak
        else
            echo "Please manually edit package.json to set the correct version"
        fi
        
        # Revert CHANGELOG.md
        echo "Reverting CHANGELOG.md..."
        echo "Using Claude to move changelog entries back to [Unreleased]..."
        # Use Claude to intelligently move the changelog entries
        claude --add-dir . --dangerously-skip-permissions -p "Please edit the CHANGELOG.md file to move all entries under the [$VERSION] section back to [Unreleased].

Requirements:
1. Find the [$VERSION] section in CHANGELOG.md
2. Move all its content to [Unreleased] section (create it if it doesn't exist)
3. Remove the [$VERSION] section header and date
4. Preserve all other content exactly as is
5. Write the updated content to CHANGELOG.md

Do not add any new content or explanations, just restructure the existing content."
        
        # Stage changes
        git add package.json CHANGELOG.md
        
        # Show changes
        echo
        echo "Changes to be committed:"
        git diff --cached
        
        echo
        read -p "Commit these rollback changes? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git commit -m "chore: rollback version $VERSION

- Reverted package.json version to $PREVIOUS_VERSION
- Moved CHANGELOG entries back to [Unreleased]
- Deleted tag $VERSION_TAG"
        else
            echo "Changes are staged but not committed"
        fi
    fi
else
    # Tag is on an older commit, just revert files
    echo "Creating rollback changes..."
    
    # Revert package.json version
    if [ -n "$PREVIOUS_VERSION" ]; then
        echo "Reverting package.json to version $PREVIOUS_VERSION..."
        sed -i.bak "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$PREVIOUS_VERSION\"/" package.json
        rm package.json.bak
    else
        echo "Please manually edit package.json to set the correct version"
    fi
    
    # Revert CHANGELOG.md
    echo "Please manually move CHANGELOG.md entries from [$VERSION] to [Unreleased]"
    echo "Or run: git checkout HEAD~1 -- CHANGELOG.md"
fi

echo
echo "Rollback complete!"
echo
echo "Next steps:"
echo "1. Verify the changes look correct"
echo "2. Run 'npm install' to update package-lock.json"
echo "3. Make any additional fixes needed"
echo "4. Run './scripts/prepare-release.sh' when ready to prepare the release again"