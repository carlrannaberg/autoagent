#!/bin/bash
# Run Jest tests related to changed files

# Exit if no files provided
if [ -z "$CLAUDE_FILE_PATHS" ]; then
  echo "No files to test"
  exit 0
fi

echo "🧪 Running tests for changed files..."

# Use npm test (not test:watch) with findRelatedTests
# Remove --bail and add --passWithNoTests to handle cases with no related tests
npm test -- --findRelatedTests $CLAUDE_FILE_PATHS --passWithNoTests