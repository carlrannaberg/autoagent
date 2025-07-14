#!/bin/bash

# prepare-release.sh - Automate release preparation using Claude or Gemini

set -e  # Exit on error

# Check which AI CLI is available
AI_CLI=""
AI_MODEL=""
AI_FLAGS=""

if command -v claude &> /dev/null; then
    AI_CLI="claude"
    AI_MODEL="--model sonnet"
    AI_FLAGS="--add-dir . --dangerously-skip-permissions --output-format stream-json --verbose --max-turns 30"
    echo "Using Claude CLI with sonnet model"
elif command -v gemini &> /dev/null; then
    AI_CLI="gemini"
    AI_MODEL="--model gemini-2.5-flash"
    AI_FLAGS="--include-all"
    echo "Using Gemini CLI with gemini-2.5-flash model"
else
    echo "Error: Neither claude nor gemini CLI is installed"
    echo "Please install one of them to use this script"
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

# Run tests first to ensure we don't release with failing tests
echo "Running tests to ensure code quality..."
if ! npm test; then
    echo "Error: Tests are failing. Please fix the failing tests before preparing a release."
    exit 1
fi
echo "All tests passed. Continuing with release preparation..."


# Fetch latest tags from remote to ensure we have complete information
echo "Fetching latest tags from remote..."
git fetch --tags

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version in package.json: $CURRENT_VERSION"

# Get the published version from NPM (this is the source of truth)
PUBLISHED_VERSION=$(npm view autoagent-cli version 2>/dev/null || echo "")
if [ -n "$PUBLISHED_VERSION" ]; then
    echo "Latest published version on NPM: $PUBLISHED_VERSION"
    LAST_VERSION_TAG="v$PUBLISHED_VERSION"
else
    echo "No version found on NPM registry"
    LAST_VERSION_TAG=""
fi

# Get the last git tag
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -z "$LAST_TAG" ]; then
    echo "No previous tags found in git."
    if [ -n "$LAST_VERSION_TAG" ]; then
        echo "Using NPM version $PUBLISHED_VERSION as reference"
        LAST_TAG=$LAST_VERSION_TAG
    else
        echo "This will be the first release."
        LAST_TAG="HEAD"
    fi
else
    echo "Last git tag: $LAST_TAG"
    # Warn if git tag doesn't match NPM version
    if [ -n "$PUBLISHED_VERSION" ] && [ "$LAST_TAG" != "v$PUBLISHED_VERSION" ]; then
        echo "⚠️  WARNING: Git tag ($LAST_TAG) doesn't match NPM version (v$PUBLISHED_VERSION)"
        echo "Using NPM version as the reference for changes"
        LAST_TAG="v$PUBLISHED_VERSION"
    fi
fi

# Pre-compute all data that Claude needs
echo
echo "Pre-computing release data..."
echo "==========================="

# Get commit information
COMMIT_COUNT=$(git rev-list ${LAST_TAG}..HEAD --count)
echo "Found $COMMIT_COUNT commits since $LAST_TAG"

# Get recent commits
RECENT_COMMITS=$(git log ${LAST_TAG}..HEAD --oneline | head -20)

# Get file changes statistics - smart filtering strategy
if [ "$LAST_TAG" != "HEAD" ]; then
    # Get all changes for statistics
    DIFF_STAT=$(git diff ${LAST_TAG}..HEAD --stat)
    
    # Get all changed files
    ALL_CHANGED_FILES=$(git diff ${LAST_TAG}..HEAD --name-only)
    
    # Smart filtering: Include code files, exclude documentation/planning files
    # Strategy: Use exclusion filtering + file extension filtering
    CODE_CHANGED_FILES=$(echo "$ALL_CHANGED_FILES" | grep -v -E '^(docs/|issues/|plans/|specs/|\.github/)' | grep -E '\.(ts|js|json|yml|yaml|sh|py|css|scss|html|vue|jsx|tsx|mjs|cjs|toml|env|gitignore|nvmrc|dockerignore)$|^(package\.json|tsconfig|vitest\.config|eslint|prettier|babel|webpack|rollup|vite\.config|jest\.config|Dockerfile|Makefile|\.eslintrc|\.prettierrc)' || echo "")
    
    if [ -n "$CODE_CHANGED_FILES" ]; then
        # Create filtered diff from only the code files
        FILTERED_DIFF=""
        for file in $CODE_CHANGED_FILES; do
            if [ -f "$file" ]; then
                FILTERED_DIFF="$FILTERED_DIFF$(git diff ${LAST_TAG}..HEAD -- "$file" 2>/dev/null || echo "")"
            fi
        done
        
        if [ -n "$FILTERED_DIFF" ]; then
            DIFF_LINES=$(echo "$FILTERED_DIFF" | wc -l)
            DIFF_CHARS=$(echo "$FILTERED_DIFF" | wc -c)
            echo "Filtered diff (code files only): $DIFF_LINES lines, $DIFF_CHARS characters"
            
            # Still check if the filtered diff is too large
            if [ "$DIFF_LINES" -gt 3000 ] || [ "$DIFF_CHARS" -gt 80000 ]; then
                echo "Even filtered diff is large - providing file list only"
                DIFF_FULL="[DIFF TOO LARGE - Code files changed: $(echo "$CODE_CHANGED_FILES" | tr '\n' ' ')]"
                INCLUDE_DIFF_INSTRUCTION="Use 'git diff ${LAST_TAG}..HEAD -- [filename]' to check individual files: $(echo "$CODE_CHANGED_FILES" | head -10 | tr '\n' ' ')"
            else
                DIFF_FULL="$FILTERED_DIFF"
                INCLUDE_DIFF_INSTRUCTION=""
            fi
        else
            DIFF_FULL="[NO CODE CHANGES - Only documentation/planning files changed]"
            INCLUDE_DIFF_INSTRUCTION="No source code changes found. This release contains only documentation updates."
        fi
    else
        DIFF_FULL="[NO CODE CHANGES - Only documentation/planning files changed]"
        INCLUDE_DIFF_INSTRUCTION="No source code changes found. This release contains only documentation updates."
    fi
else
    DIFF_STAT="No previous release found - this is the first release"
    DIFF_FULL=""
    INCLUDE_DIFF_INSTRUCTION=""
fi

# Get current CHANGELOG content (first 100 lines for context)
CHANGELOG_CONTENT=$(head -100 CHANGELOG.md 2>/dev/null || echo "# Changelog\n\nAll notable changes to this project will be documented in this file.")

# Calculate the new version that will be created
if [ "$RELEASE_TYPE" = "patch" ]; then
    NEW_VERSION=$(node -p "const v=require('./package.json').version.split('.').map(Number); v[2]++; v.join('.')")
elif [ "$RELEASE_TYPE" = "minor" ]; then
    NEW_VERSION=$(node -p "const v=require('./package.json').version.split('.').map(Number); v[1]++; v[2]=0; v.join('.')")
elif [ "$RELEASE_TYPE" = "major" ]; then
    NEW_VERSION=$(node -p "const v=require('./package.json').version.split('.').map(Number); v[0]++; v[1]=0; v[2]=0; v.join('.')")
fi

echo "New version will be: $NEW_VERSION"
echo "Changes to analyze: $COMMIT_COUNT commits"
echo

echo "Using $AI_CLI to analyze changes and prepare release..."
echo "This should be much faster now with pre-computed data..."

# Use AI CLI to prepare the release with pre-computed data
# Temporarily disable exit on error for AI command
set +e

# Check if timeout command is available (not on macOS by default)
# Timeout is set to 180 seconds (3 minutes) as a safety net
if command -v gtimeout >/dev/null 2>&1; then
    # On macOS with GNU coreutils installed
    TIMEOUT_CMD="gtimeout 180"
elif command -v timeout >/dev/null 2>&1; then
    # On Linux or other systems with timeout
    TIMEOUT_CMD="timeout 180"
else
    # No timeout command available
    echo "Warning: No timeout command available. Install coreutils on macOS: brew install coreutils"
    TIMEOUT_CMD=""
fi

$TIMEOUT_CMD $AI_CLI $AI_MODEL $AI_FLAGS -p "Create a changelog entry for version $NEW_VERSION based on these commits:

$RECENT_COMMITS

Code files changed: $(echo "$CODE_CHANGED_FILES" | tr '\n' ' ')

Update CHANGELOG.md to add this new section after the [Unreleased] section:

## [$NEW_VERSION] - $(date +%Y-%m-%d)

### Fixed
- Update issue validation to use 'Acceptance Criteria' section  
- Update test fixtures and templates to use Acceptance Criteria
- Make rate limiter test more robust to timing variations

### Added
- Smart diff handling to prevent context window overflow

### Changed
- Optimize release script by pre-computing data for Claude
- Filter out docs/planning files from release diff analysis

Then run: npm version $RELEASE_TYPE --no-git-tag-version
Then commit with: git commit -m \"chore: prepare for v$NEW_VERSION release\"

Keep it simple and focused on the actual changes."

AI_EXIT_CODE=$?
set -e  # Re-enable exit on error

if [ $AI_EXIT_CODE -eq 124 ]; then
    echo "Error: $AI_CLI command timed out after 15 minutes. You can try running it manually with:"
    echo "$AI_CLI $AI_MODEL $AI_FLAGS -p 'Prepare $RELEASE_TYPE release for AutoAgent package'"
    exit 1
elif [ $AI_EXIT_CODE -ne 0 ]; then
    echo "Error: $AI_CLI command failed with exit code $AI_EXIT_CODE"
    exit 1
fi

echo
echo "✅ CHANGELOG.md and package.json updated successfully!"
echo

# Now validate README.md documentation against the updated CHANGELOG.md
echo "🔍 Validating README.md documentation completeness..."

# Use AI to validate README against CHANGELOG and capture response
set +e  # Temporarily disable exit on error

# Create temporary file for AI response
README_VALIDATION_FILE=$(mktemp)

# Run AI validation and capture output
$AI_CLI $AI_MODEL $AI_FLAGS -p "You are validating that README.md is up to date with the newly updated CHANGELOG.md before a release.

Please analyze both CHANGELOG.md and README.md files and determine if README.md properly documents all features listed in the CHANGELOG.md [Unreleased] section.

Check specifically:
1. Are all new features from CHANGELOG.md documented in README.md?
2. Are new CLI flags/options shown in usage examples?
3. Are major features included in the feature list?
4. Do usage examples reflect new functionality?

IMPORTANT: Start your response with exactly one of these status lines:
- 'README_COMPLETE' if README.md fully documents all unreleased features
- 'README_INCOMPLETE' if documentation is missing

Then provide details. Be strict - any significant missing documentation should result in README_INCOMPLETE." > "$README_VALIDATION_FILE" 2>&1

AI_VALIDATION_EXIT_CODE=$?
set -e  # Re-enable exit on error

if [ $AI_VALIDATION_EXIT_CODE -ne 0 ]; then
    echo "Error: README validation AI command failed."
    cat "$README_VALIDATION_FILE"
    rm -f "$README_VALIDATION_FILE"
    exit 1
fi

# Check the AI response
README_STATUS=$(head -1 "$README_VALIDATION_FILE" | grep -o "README_[A-Z]*" || echo "UNKNOWN")

echo "README validation result: $README_STATUS"
echo
cat "$README_VALIDATION_FILE"
echo

if [[ "$README_STATUS" == "README_INCOMPLETE" ]]; then
    echo "❌ README.md is missing documentation for unreleased features."
    echo "🤖 Automatically updating README.md with missing documentation..."
    
    # Use AI to automatically fix README.md based on the validation analysis
    set +e
    $AI_CLI $AI_MODEL $AI_FLAGS -p "You need to update README.md to include missing documentation identified in the previous analysis.

Previous validation analysis:
$(cat "$README_VALIDATION_FILE")

Based on this analysis and the CHANGELOG.md [Unreleased] section, please:

1. Update the README.md file to include all missing features and documentation
2. Add new CLI flags/options to the appropriate usage examples
3. Include major new features in the feature list section
4. Update usage examples to reflect new functionality
5. Ensure all unreleased features from CHANGELOG.md are properly documented

Please update the README.md file directly. Make sure the documentation is comprehensive and follows the existing README structure and style."

    README_UPDATE_EXIT_CODE=$?
    set -e
    
    if [ $README_UPDATE_EXIT_CODE -ne 0 ]; then
        echo "❌ Error: Failed to automatically update README.md"
        echo "Please manually update README.md based on the analysis above."
        rm -f "$README_VALIDATION_FILE"
        exit 1
    fi
    
    echo "✅ README.md has been automatically updated."
    echo "📝 Please review the changes made to README.md before continuing."
    echo "Press Enter after reviewing the README updates, or Ctrl+C to cancel..."
    read -r
    
elif [[ "$README_STATUS" == "README_COMPLETE" ]]; then
    echo "✅ README.md documentation is complete."
else
    echo "⚠️  Unable to determine README status. Please review the analysis above."
    echo "Press Enter to continue if README looks complete, or Ctrl+C to cancel..."
    read -r
fi

rm -f "$README_VALIDATION_FILE"

echo
echo "Release preparation complete!"
echo "Next steps:"
echo "1. Review the changes: git diff HEAD~1"
echo "2. Push to GitHub: git push origin master"
echo "3. The GitHub Actions will create the tag and publish to npm"