#!/usr/bin/env node

/**
 * Spec-Driven Workflow Example for AutoAgent
 * 
 * This example demonstrates the new unified workflow where you can run
 * specification files directly to create plans, decompose into issues,
 * and execute the implementation - all with a single command.
 */

console.log('🚀 SPEC-DRIVEN WORKFLOW EXAMPLE');
console.log('═'.repeat(60));

// Step 1: Create a Specification
console.log('\n📝 Step 1: Create a Specification File');
console.log('─'.repeat(60));
console.log(`
Create a high-level specification describing what you want to build:

\`\`\`bash
cat > specs/add-user-profiles.md << 'EOF'
# Add User Profiles Feature

## Goal
Implement comprehensive user profiles with avatars, bio information,
and privacy controls.

## Requirements
- User profile page at /users/:id
- Editable bio field (max 500 characters)
- Avatar upload with automatic resizing
- Privacy settings (public/private/friends-only)
- Profile completeness indicator
- Social links integration

## Technical Constraints
- Must work with existing authentication system
- Avatar storage should use cloud storage
- Bio must support markdown formatting
- Privacy settings must be retroactive
EOF
\`\`\`
`);

// Step 2: Run the Spec
console.log('\n🎯 Step 2: Run the Specification');
console.log('─'.repeat(60));
console.log(`
Run the spec file to automatically:
1. Create a decomposition plan
2. Generate individual issues
3. Execute the decomposition
4. Optionally continue with all issues

\`\`\`bash
# Just create the plan and issues
autoagent run specs/add-user-profiles.md

# Create plan, issues, AND execute everything
autoagent run specs/add-user-profiles.md --all
\`\`\`
`);

// Step 3: What Happens Behind the Scenes
console.log('\n⚙️  Step 3: Behind the Scenes');
console.log('─'.repeat(60));
console.log(`
When you run a spec file, AutoAgent:

1. **Detects File Type**: Recognizes it's a spec (no "Issue #:" marker)
2. **Creates Decomposition Issue**: Generates issue #1 for breaking down the spec
3. **Executes Decomposition**: AI analyzes and creates:
   - A detailed implementation plan
   - Individual, actionable issues
   - Proper dependencies between issues
4. **Continues Execution**: If --all flag is used, executes all created issues
`);

// Step 4: Working with Created Issues
console.log('\n📋 Step 4: Working with Created Issues');
console.log('─'.repeat(60));
console.log(`
After running the spec, you can:

\`\`\`bash
# View all created issues
autoagent list issues

# Check specific issue details
autoagent status 2-create-profile-model

# Run specific issues
autoagent run 2-create-profile-model
autoagent run 3-add-avatar-upload

# Run remaining issues
autoagent run --all

# Preview changes without execution
autoagent run --dry-run
\`\`\`
`);

// Step 5: Example Output
console.log('\n📊 Step 5: Example Output');
console.log('─'.repeat(60));
console.log(`
Running: \`autoagent run specs/add-user-profiles.md --all\`

🔍 Detected spec/plan file: specs/add-user-profiles.md
🏗️  Bootstrapping project from spec file...
✅ Bootstrap complete! Created decomposition issue #1
🚀 Executing decomposition issue #1...
✅ Decomposition complete! Created 6 implementation issues
📋 Continuing with all created issues...

🚀 Executing issue #2: Create profile model
✅ Completed issue #2: Create profile model

🚀 Executing issue #3: Add avatar upload
✅ Completed issue #3: Add avatar upload

🚀 Executing issue #4: Implement bio editor
✅ Completed issue #4: Implement bio editor

🚀 Executing issue #5: Add privacy settings
✅ Completed issue #5: Add privacy settings

🚀 Executing issue #6: Create profile page UI
✅ Completed issue #6: Create profile page UI

🚀 Executing issue #7: Add tests and documentation
✅ Completed issue #7: Add tests and documentation

🎉 All 6 issues completed successfully!
`);

// Step 6: Advanced Patterns
console.log('\n🔧 Step 6: Advanced Patterns');
console.log('─'.repeat(60));
console.log(`
# Chain multiple specs
for spec in specs/*.md; do
  autoagent run "$spec"
done

# Run with specific provider
autoagent run specs/complex-feature.md --provider claude

# Dry run to preview
autoagent run specs/risky-change.md --dry-run

# Custom workspace
autoagent run ~/projects/api/specs/v2-upgrade.md -w ~/projects/api
`);

// Step 7: File Organization
console.log('\n📁 Step 7: Recommended File Organization');
console.log('─'.repeat(60));
console.log(`
project/
├── specs/              # High-level specifications
│   ├── phase-1-auth.md
│   ├── phase-2-profiles.md
│   └── phase-3-social.md
├── plans/              # Generated implementation plans
│   ├── 1-phase-1-auth-plan.md
│   └── 8-phase-2-profiles-plan.md
├── issues/             # Atomic work items
│   ├── 2-add-jwt-tokens.md
│   ├── 3-create-login-api.md
│   └── 9-create-profile-model.md
└── .autoagent/         # AutoAgent metadata
    ├── config.json
    └── status.json
`);

// Step 8: Tips and Best Practices
console.log('\n💡 Step 8: Tips and Best Practices');
console.log('─'.repeat(60));
console.log(`
1. **Write Clear Specs**: Focus on WHAT, not HOW
2. **Keep Specs Focused**: One feature/goal per spec
3. **Use Descriptive Names**: specs/add-payment-processing.md
4. **Review Before --all**: Check generated issues first
5. **Version Control Specs**: Track your specs in git
6. **Iterative Approach**: Start small, refine based on results
`);

console.log('\n' + '═'.repeat(60));
console.log('🎉 Ready to try it? Create a spec and run it!');
console.log('═'.repeat(60) + '\n');