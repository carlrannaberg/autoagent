# Provider Instructions Structure

This project uses a consolidated approach for managing provider instructions to avoid duplication.

## File Structure

### `PROVIDER_INSTRUCTIONS.md`
- Contains all common instructions, project context, and execution history
- This is the main file that gets updated with new execution results
- Shared between both Claude and Gemini providers

### `CLAUDE.md`
- Minimal file that references PROVIDER_INSTRUCTIONS.md
- Contains only Claude-specific notes:
  - Using `claude` CLI with `--json` flag
  - Co-authorship attribution format

### `GEMINI.md`
- Minimal file that references PROVIDER_INSTRUCTIONS.md
- Contains only Gemini-specific notes:
  - Using `gemini` CLI command
  - Co-authorship attribution format

## How It Works

1. When running an agent, both files are passed as context:
   - `PROVIDER_INSTRUCTIONS.md` (common instructions)
   - Provider-specific file (`CLAUDE.md` or `GEMINI.md`)

2. The provider learning system updates `PROVIDER_INSTRUCTIONS.md` with:
   - Execution history
   - Performance metrics
   - Learning insights
   - Detected patterns

3. Provider-specific files remain minimal and static

## Benefits

- No duplication of content between provider files
- Single source of truth for project context
- Easier to maintain and update
- Both providers benefit from shared learnings