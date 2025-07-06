#!/bin/bash
# Run Jest tests related to changed files

# Read JSON input from stdin
JSON_INPUT=$(cat)

# Extract file path from JSON using jq (or fallback to grep/sed if jq not available)
if command -v jq &> /dev/null; then
  FILE_PATH=$(echo "$JSON_INPUT" | jq -r '.tool_input.file_path // empty')
else
  # Fallback: extract file_path using sed
  FILE_PATH=$(echo "$JSON_INPUT" | sed -n 's/.*"file_path":"\([^"]*\)".*/\1/p' | head -1)
fi

# Exit if no file path found
if [ -z "$FILE_PATH" ]; then
  echo "No file to test"
  exit 0
fi

# Only run tests for TypeScript/JavaScript files
if [[ ! $FILE_PATH =~ \.(ts|tsx|js|jsx)$ ]]; then
  exit 0
fi

# Skip test files themselves
if [[ $FILE_PATH =~ \.test\.(ts|tsx|js|jsx)$ ]] || [[ $FILE_PATH =~ \.spec\.(ts|tsx|js|jsx)$ ]]; then
  exit 0
fi

echo "🧪 Running tests related to: $FILE_PATH..." >&2

# Use npm test (not test:watch) with findRelatedTests
# Remove --bail and add --passWithNoTests to handle cases with no related tests
npm test -- --findRelatedTests "$FILE_PATH" --passWithNoTests