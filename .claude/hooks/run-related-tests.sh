#!/bin/bash
# Run Vitest tests related to changed files

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

# Convert file path to test pattern
# Example: src/core/services/report.service.ts -> src/core/services/report.service.test.ts
TEST_FILE="${FILE_PATH%.*}.test.${FILE_PATH##*.}"
SPEC_FILE="${FILE_PATH%.*}.spec.${FILE_PATH##*.}"

# Also check for tests in __tests__ directory
DIR=$(dirname "$FILE_PATH")
BASENAME=$(basename "$FILE_PATH")
TESTS_DIR_FILE="$DIR/__tests__/$BASENAME"
TESTS_DIR_TEST_FILE="${TESTS_DIR_FILE%.*}.test.${TESTS_DIR_FILE##*.}"
TESTS_DIR_SPEC_FILE="${TESTS_DIR_FILE%.*}.spec.${TESTS_DIR_FILE##*.}"

# Check if any test files exist and run them
if [ -f "$TEST_FILE" ] || [ -f "$SPEC_FILE" ] || [ -f "$TESTS_DIR_TEST_FILE" ] || [ -f "$TESTS_DIR_SPEC_FILE" ]; then
  # Build a pattern that includes all possible test files
  PATTERN="${FILE_PATH%.*}"
  echo "Looking for tests matching pattern: $PATTERN" >&2
  # Use vitest with --run for non-watch mode
  npm test -- "$PATTERN" --run --passWithNoTests
else
  echo "No test files found for $FILE_PATH" >&2
  exit 0
fi