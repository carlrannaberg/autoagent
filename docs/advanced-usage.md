# Advanced Usage Guide

## Customizing Agent Behavior

### Project-Specific Instructions
The `CLAUDE.md` file is crucial for providing context to Claude. Here's a detailed example:

```markdown
# Agent Instructions

## Project Context
- **Architecture**: Microservices with Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest for unit tests, Supertest for API tests
- **Code Style**: ESLint with Airbnb config

## Coding Standards
- Use async/await instead of callbacks
- Implement proper error handling with try/catch
- Add JSDoc comments for all public functions
- Follow RESTful naming conventions

## Security Requirements
- Never commit credentials
- Validate all user inputs
- Use parameterized queries
- Implement rate limiting
```

### Issue and Plan Templates

Create custom templates for common workflows:

```bash
# Create an issue template
cat > issue-templates/api-endpoint.md << 'EOF'
# Issue N: Create [RESOURCE] API Endpoint

## Requirement
Implement a complete REST API endpoint for [RESOURCE] management with full CRUD operations.

## Acceptance Criteria
- [ ] All CRUD endpoints implemented
- [ ] Input validation returns clear errors
- [ ] Unit tests achieve >80% coverage
- [ ] API documentation is complete
- [ ] Pagination works for list endpoints

## Technical Details
- Use existing database models
- Follow current API patterns
- Implement using [Framework]

## Resources
- API design guidelines
- Similar endpoints for reference
EOF

# Create a plan template
cat > plan-templates/api-endpoint-plan.md << 'EOF'
# Plan for Issue N: Create [RESOURCE] API Endpoint

## Implementation Plan

### Phase 1: Model & Schema
- [ ] Define [RESOURCE] model
- [ ] Create database migrations
- [ ] Set up validation schemas

### Phase 2: API Implementation
- [ ] Implement GET endpoints
- [ ] Implement POST endpoint
- [ ] Implement PUT endpoint
- [ ] Implement DELETE endpoint
- [ ] Add pagination logic

### Phase 3: Testing
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Test error scenarios

### Phase 4: Documentation
- [ ] Update API docs
- [ ] Add usage examples

## Technical Approach
[Describe approach]

## Potential Challenges
[List challenges]
EOF
```

## Workflow Patterns

### 1. Sequential Development
Best for features that build on each other:

```bash
# Create related issues
./scripts/create-issue.sh "Set up database schema for blog"
./scripts/create-issue.sh "Create blog post CRUD API"
./scripts/create-issue.sh "Add comment functionality to blog"
./scripts/create-issue.sh "Implement blog post search"

# Run one at a time to review progress
./scripts/run-agent.sh
```

### 2. Parallel Development
For independent features:

```bash
# Create independent issues
./scripts/create-issue.sh "Add user profile page"
./scripts/create-issue.sh "Implement email notifications"
./scripts/create-issue.sh "Create admin dashboard"

# Can run in any order
./scripts/run-agent.sh --auto
```

### 3. Test-Driven Development
Structure tasks to follow TDD:

```bash
# First issue: Write tests
./scripts/create-issue.sh "Write tests for payment processing"

# Second issue: Implement to pass tests
./scripts/create-issue.sh "Implement payment processing to pass tests"
```

## Integration with CI/CD

### GitHub Actions Example
```yaml
name: Autonomous Agent Tasks

on:
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday
  workflow_dispatch:

jobs:
  run-agent:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Claude CLI
        run: |
          # Install Claude CLI
          # Configure with API key from secrets
      
      - name: Run pending issues
        run: |
          ./scripts/run-agent.sh --auto
        env:
          AUTO_COMMIT: true
      
      - name: Create PR
        uses: peter-evans/create-pull-request@v4
        with:
          title: 'Autonomous agent completed issues'
          branch: agent-issues
```

## Monitoring and Logging

### Task Execution Logs
Capture detailed logs for debugging:

```bash
# Modify run-agent.sh to save logs
./scripts/run-agent.sh 2>&1 | tee "logs/agent-$(date +%Y%m%d-%H%M%S).log"
```

### Progress Tracking
Create a dashboard script:

```bash
#!/bin/bash
# scripts/status.sh

echo "📊 Issue Status Report"
echo "===================="
echo ""

TOTAL=$(grep -c "^- \[" todo.md)
COMPLETED=$(grep -c "^- \[x\]" todo.md)
PENDING=$((TOTAL - COMPLETED))

echo "Total Issues: $TOTAL"
echo "Completed: $COMPLETED ✅"
echo "Pending: $PENDING ⏳"
echo "Progress: $((COMPLETED * 100 / TOTAL))%"
echo ""

echo "Recent Completions:"
grep "^- \[x\]" todo.md | tail -5
```

## Best Practices

### 1. Issue Granularity
- **Too Large**: "Build entire application"
- **Too Small**: "Create a variable"
- **Just Right**: "Implement user authentication with JWT"

### 2. Clear Success Criteria
```markdown
## Success Criteria
- ✅ All unit tests pass (npm test)
- ✅ No TypeScript errors (npm run type-check)
- ✅ API endpoint returns 200 for valid requests
- ✅ Returns 400 for invalid input with clear error message
```

### 3. Context is Key
Always include:
- Related files or modules
- Design decisions already made
- External dependencies to use
- Performance requirements

### 4. Iterative Refinement
After each issue:
1. Review the output
2. Update CLAUDE.md with new patterns
3. Refine issue and plan templates
4. Document lessons learned

## Troubleshooting

### Agent Fails to Complete Issue
1. Check issue clarity and acceptance criteria
2. Verify plan is detailed enough
3. Break down into smaller issues
4. Add more specific implementation steps

### Unexpected Behavior
1. Review CLAUDE.md instructions
2. Check for conflicting requirements
3. Ensure examples match expectations
4. Validate environment setup

### Performance Issues
1. Limit issue scope
2. Specify performance requirements
3. Use appropriate models (if configurable)
4. Consider issue dependencies