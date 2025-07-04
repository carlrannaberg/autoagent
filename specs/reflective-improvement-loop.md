# Reflective Improvement Loop Specification

## Title
Reflective Improvement Loop for Issue and Plan Enhancement

## Overview
This specification describes adding a configurable iterative improvement process that reviews and enhances generated issues and plans after initial decomposition. The system will prompt the AI to "think deeply about the issues and plans and see if there are still some gaps" and iteratively improve the decomposed work through multiple reflection cycles.

## Background/Problem Statement
Currently, when a spec file is decomposed into issues and plans, the AI generates them in a single pass without reviewing or refining the output. This often results in:

1. **Missing dependencies** between issues that become apparent only after decomposition
2. **Insufficient detail** in acceptance criteria or technical requirements
3. **Scope gaps** where important aspects of the specification are overlooked
4. **Inconsistent abstraction levels** across different issues
5. **Suboptimal task breakdown** that could be improved with reflection

Human project managers naturally iterate on their initial decomposition, reviewing and refining their breakdown. The AI should have a similar reflective capability to improve the quality of generated issues and plans.

## Goals
1. **Improve decomposition quality** - Generate more comprehensive and well-thought-out issues
2. **Identify missing dependencies** - Catch inter-issue relationships and ordering requirements
3. **Enhance detail level** - Add missing acceptance criteria, technical details, and edge cases
4. **Ensure completeness** - Verify all aspects of the original spec are addressed
5. **Configurable depth** - Allow users to control the number of improvement iterations
6. **Maintain efficiency** - Balance improvement quality with execution time

## Non-Goals
1. **Infinite loops** - The improvement process must have clear termination
2. **Changing issue numbering** - Existing issues should maintain their numbers during improvement
3. **Breaking existing workflows** - The improvement should be optional and transparent
4. **Over-engineering** - Avoid adding unnecessary complexity to simple specs
5. **Provider-specific behavior** - Should work consistently across Claude and Gemini

## Detailed Design

### Architecture Changes

#### Configuration
```typescript
interface ReflectionConfig {
  enabled: boolean;           // Default: true
  maxIterations: number;      // Default: 3
  improvementThreshold: number; // Minimum improvement score to continue (0.1)
  skipForSimpleSpecs: boolean; // Skip if spec is < 500 words (default: true)
}
```

#### Reflection Process Flow
```typescript
async function reflectiveDecomposition(specFile: string, config: ReflectionConfig) {
  // 1. Initial decomposition
  const initialResult = await performInitialDecomposition(specFile);
  
  if (!config.enabled || shouldSkipReflection(initialResult, config)) {
    return initialResult;
  }
  
  let currentResult = initialResult;
  
  // 2. Iterative improvement loop
  for (let iteration = 1; iteration <= config.maxIterations; iteration++) {
    Logger.info(`🔍 Reflection iteration ${iteration}/${config.maxIterations}`);
    
    const improvements = await reflectOnIssuesAndPlans(currentResult, iteration);
    
    if (improvements.score < config.improvementThreshold) {
      Logger.info(`✅ Reflection complete - minimal improvements found`);
      break;
    }
    
    currentResult = await applyImprovements(currentResult, improvements);
    Logger.info(`📈 Applied ${improvements.changes.length} improvements`);
  }
  
  return currentResult;
}
```

### Implementation Approach

#### Reflection Prompt Template
```typescript
const REFLECTION_PROMPT = `You are reviewing a project decomposition. Analyze the generated issues and plans for gaps, improvements, and missing details.

## Original Specification
{originalSpec}

## Current Issues and Plans
{currentIssuesAndPlans}

## Reflection Instructions
Now think deeply about the issues and plans and see if there are still some gaps in there.

Consider:
1. **Missing Dependencies**: Are there unstated dependencies between issues?
2. **Scope Gaps**: Does the decomposition cover all aspects of the original spec?
3. **Detail Level**: Do issues have sufficient acceptance criteria and technical details?
4. **Task Granularity**: Are issues appropriately sized and scoped?
5. **Implementation Order**: Is the sequence of work logical and efficient?
6. **Edge Cases**: Are important edge cases and error scenarios covered?
7. **Testing Strategy**: Is testing adequately addressed in the plans?

## Required Output Format
Provide a structured improvement analysis:

### Improvement Score: {0.0 to 1.0}
Rate how much improvement is needed (0.0 = perfect, 1.0 = major gaps)

### Identified Gaps
- List specific gaps or missing elements
- Reference issue numbers where applicable

### Recommended Changes
For each recommended change:
- **Type**: [ADD_ISSUE, MODIFY_ISSUE, ADD_PLAN, MODIFY_PLAN, ADD_DEPENDENCY]
- **Target**: [Issue/Plan identifier]
- **Description**: [What to change and why]
- **Content**: [Specific content to add/modify]

### Reasoning
Explain the rationale for the most important changes.
`;
```

#### Integration Points

1. **AutonomousAgent.bootstrap()** method:
   ```typescript
   async bootstrap(specFile: string): Promise<number> {
     // Existing decomposition logic
     const initialIssueNumber = await this.performInitialBootstrap(specFile);
     
     // New reflection process
     if (this.config.enableReflection !== false) {
       await this.performReflectiveImprovement(specFile, initialIssueNumber);
     }
     
     return initialIssueNumber;
   }
   ```

2. **Configuration integration**:
   ```typescript
   interface AgentConfig {
     // Existing config
     reflection?: ReflectionConfig;
   }
   ```

3. **CLI option**:
   ```bash
   autoagent run project-spec.md --reflection-iterations 5
   autoagent run project-spec.md --no-reflection
   ```

### Code Structure

#### New Files
- `src/core/reflection-engine.ts` - Core reflection logic
- `src/utils/improvement-analyzer.ts` - Analyzes improvement suggestions
- `src/types/reflection.ts` - TypeScript types for reflection

#### Enhanced Files
- `src/core/autonomous-agent.ts` - Integration with bootstrap process
- `src/cli/commands/run.ts` - CLI options for reflection control
- `src/types/index.ts` - Export reflection types

### API Changes

1. **AgentConfig interface** - Add optional reflection configuration
2. **CLI run command** - Add reflection control flags
3. **Bootstrap return type** - No changes (maintains compatibility)

### Error Handling

1. **Reflection failures** - Gracefully fall back to initial decomposition
2. **Invalid improvements** - Validate suggestions before applying
3. **Timeout handling** - Limit reflection time per iteration
4. **Provider errors** - Handle rate limits and failures during reflection
5. **File system errors** - Safely handle file read/write during improvements

## Migration Strategy

### Incremental Rollout
1. **Default enabled** - Reflection enabled by default with conservative settings
2. **Opt-out available** - Users can disable with `--no-reflection`
3. **Configurable thresholds** - Users can tune sensitivity and iteration counts
4. **Backward compatibility** - Existing bootstrap behavior preserved when disabled

### Configuration Migration
- No breaking changes to existing configuration
- New reflection settings added as optional properties
- Default values ensure existing behavior is preserved

## Testing Strategy

### Unit Tests
1. **Reflection engine** - Test improvement identification and application
2. **Configuration handling** - Test various reflection settings
3. **Integration points** - Test bootstrap method with reflection enabled/disabled
4. **Error scenarios** - Test fallback behavior and error handling

### Integration Tests
1. **End-to-end reflection** - Test complete reflection cycle with real specs
2. **Multiple iterations** - Verify iterative improvement process
3. **Provider compatibility** - Test with both Claude and Gemini
4. **File system operations** - Test issue/plan file updates

### E2E Tests
```typescript
describe('Reflective Improvement E2E', () => {
  it('should improve issue quality through reflection', async () => {
    const result = await cli.execute([
      'run', 'complex-spec.md', 
      '--reflection-iterations', '2'
    ]);
    
    expect(result.stdout).toContain('Reflection iteration 1/2');
    expect(result.stdout).toContain('Applied improvements');
    
    // Verify enhanced issues were created
    const issues = await workspace.listIssues();
    expect(issues.length).toBeGreaterThan(3);
    
    // Check for improved detail level
    const issueContent = await workspace.readFile('issues/1-initial-setup.md');
    expect(issueContent).toContain('Dependencies:');
    expect(issueContent).toContain('Edge Cases:');
  });
  
  it('should skip reflection for simple specs', async () => {
    const result = await cli.execute(['run', 'simple-spec.md']);
    
    expect(result.stdout).not.toContain('Reflection iteration');
    expect(result.stdout).toContain('Skipping reflection for simple spec');
  });
});
```

## Performance Considerations

1. **Execution time** - Each reflection iteration adds 30-60 seconds
2. **Provider costs** - Additional API calls for reflection prompts
3. **File I/O** - Multiple reads/writes during improvement application
4. **Memory usage** - Storing multiple versions of issues/plans during reflection
5. **Optimization strategies** - Smart skipping for simple specs, early termination

### Performance Optimizations
- **Parallel analysis** - Analyze multiple issues simultaneously where possible
- **Incremental updates** - Only rewrite modified files
- **Smart caching** - Cache spec analysis between iterations
- **Early termination** - Stop when improvements become minimal

## Security Considerations

1. **File system access** - Reflection process modifies existing issue/plan files
2. **Input validation** - Validate improvement suggestions before application
3. **Provider prompts** - Ensure reflection prompts don't leak sensitive information
4. **Iteration limits** - Prevent infinite loops or resource exhaustion
5. **Error isolation** - Ensure reflection failures don't corrupt existing files

## Documentation

### User Documentation
1. **README updates** - Explain reflection feature and configuration options
2. **CLI help text** - Document reflection-related flags
3. **Configuration guide** - How to tune reflection settings
4. **Examples** - Before/after examples showing reflection improvements

### Developer Documentation
1. **Architecture docs** - How reflection integrates with bootstrap process
2. **API reference** - Reflection configuration options
3. **Extension guide** - How to customize reflection prompts
4. **Troubleshooting** - Common issues and debugging steps

## Implementation Steps

1. **Create reflection engine** - Core logic for analyzing and improving issues/plans
2. **Add configuration support** - AgentConfig and CLI options for reflection control
3. **Integrate with bootstrap** - Modify bootstrap process to include reflection
4. **Implement improvement application** - Logic to safely apply suggested changes
5. **Add CLI interface** - Command line options for reflection control
6. **Create comprehensive tests** - Unit, integration, and E2E test coverage
7. **Update documentation** - User and developer documentation

## Open Questions

1. **Improvement scoring** - How to quantitatively measure improvement quality?
   - **Decision**: Use combination of content length increase, detail density, and dependency coverage

2. **Iteration termination** - When should reflection stop automatically?
   - **Decision**: Stop when improvement score drops below threshold or max iterations reached

3. **File modification strategy** - Should reflection create new files or modify existing ones?
   - **Decision**: Modify existing files in-place with backup capability

4. **Provider consistency** - How to ensure consistent reflection quality across providers?
   - **Decision**: Use standardized prompts with provider-specific tuning parameters

5. **Large spec handling** - How to handle specs that would generate 20+ issues?
   - **Decision**: Implement chunked reflection for large decompositions

## Example Workflows

### Standard Reflection Workflow
```bash
# Default reflection (3 iterations)
autoagent run project-spec.md

# Output:
# 📋 Decomposing spec file...
# ✅ Created 5 issues and 5 plans
# 🔍 Reflection iteration 1/3
# 📈 Applied 8 improvements
# 🔍 Reflection iteration 2/3  
# 📈 Applied 3 improvements
# 🔍 Reflection iteration 3/3
# ✅ Reflection complete - minimal improvements found
```

### Custom Reflection Settings
```bash
# High-detail reflection
autoagent run complex-spec.md --reflection-iterations 5

# Skip reflection for simple specs
autoagent run simple-task.md --no-reflection

# Reflection with all subsequent execution
autoagent run project-spec.md --reflection-iterations 2 --all
```

### Configuration File
```json
{
  "reflection": {
    "enabled": true,
    "maxIterations": 3,
    "improvementThreshold": 0.1,
    "skipForSimpleSpecs": true
  }
}
```

## Success Metrics

1. **Quality improvement** - Measurable increase in issue detail and completeness
2. **Dependency detection** - Better identification of inter-issue relationships
3. **User satisfaction** - Reduced need for manual issue refinement
4. **Coverage completeness** - More comprehensive coverage of original specifications
5. **Execution efficiency** - Balance between improvement quality and processing time