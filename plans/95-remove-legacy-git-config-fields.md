# Plan for Issue #95: Remove legacy git config fields

This document outlines the step-by-step plan to complete `issues/95-remove-legacy-git-config-fields.md`.

## Overview
Clean removal of legacy git configuration fields.

## Implementation Steps

### Type Updates
- [ ] Remove autoCommit from AgentConfig
- [ ] Remove gitAutoCommit from UserConfig  
- [ ] Remove gitAutoPush from UserConfig
- [ ] Update type exports

### Code Updates
- [ ] Remove autoCommit usage in AutonomousAgent
- [ ] Remove git config usage in ConfigManager
- [ ] Update config loading logic
- [ ] Remove related constants

### Test Updates
- [ ] Update config manager tests
- [ ] Update autonomous agent tests
- [ ] Remove old field references
- [ ] Fix compilation errors

### Cleanup
- [ ] Search for any remaining references
- [ ] Update mock configurations
- [ ] Verify clean compilation
- [ ] Run full test suite

## Potential Challenges
- Finding all usage sites
- Test mock updates
- Ensuring no runtime errors

## Additional Context Files
- src/types/config.ts
- src/core/config-manager.ts
- src/core/autonomous-agent.ts