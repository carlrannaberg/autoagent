#!/bin/bash
# Detailed lint feedback with error reporting

echo "🔍 Checking lint errors for changed files..."

TOTAL_ERRORS=0
ERROR_OUTPUT=""

for file in $CLAUDE_FILE_PATHS; do
  if [[ $file =~ \.(ts|tsx|js|jsx)$ ]]; then
    # Run ESLint and capture both stdout and stderr
    LINT_OUTPUT=$(npx eslint "$file" 2>&1)
    LINT_EXIT_CODE=$?

    if [ $LINT_EXIT_CODE -ne 0 ]; then
      TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
      ERROR_OUTPUT="${ERROR_OUTPUT}

❌ ESLint errors in ${file}:
${LINT_OUTPUT}"
    fi
  fi
done

if [ $TOTAL_ERRORS -gt 0 ]; then
  # Write to stderr so Claude sees it (exit code 2)
  echo "Found ESLint errors in $TOTAL_ERRORS file(s):" >&2
  echo "$ERROR_OUTPUT" >&2
  echo "" >&2
  echo "Please fix the above ESLint errors." >&2
  exit 2  # This ensures Claude sees the errors
else
  # Success message goes to stdout (user sees in transcript)
  echo "✅ All files passed ESLint checks!"
  exit 0
fi
