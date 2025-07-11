# Validate Issues and Plans Format on Run Start

## Overview

This specification outlines the implementation of upfront validation for issue and plan files when the `run` command is executed. The validation will ensure that all files are properly formatted before execution begins, preventing runtime parsing errors and providing clear, actionable feedback to users about formatting issues.

## Background/Problem Statement

Currently, the AutoAgent system can encounter parsing errors during execution when issue or plan files have formatting problems. These errors occur mid-execution, which can lead to:

1. **Wasted compute resources**: Providers may process partial requests before hitting parsing errors
2. **Unclear error messages**: Users get parsing errors without context about which file or line caused the issue
3. **Inconsistent formatting**: Files may use different issue reference formats (e.g., `#10` vs `10`) without validation
4. **Silent failures**: Some parsing errors may be swallowed, leading to incorrect behavior

Common formatting issues include:
- Inconsistent issue number references (`#10` vs `10` vs `Issue #10`)
- Malformed markdown structure
- Missing required sections
- Invalid YAML frontmatter
- Encoding issues or invalid characters

## Goals

1. **Early validation**: Validate all issue and plan files before any execution begins
2. **Clear error reporting**: Provide specific file names, line numbers, and fix suggestions
3. **Format standardization**: Enforce consistent formatting rules across all files
4. **Auto-fix capability**: Automatically fix formatting issues using AI providers
5. **Performance**: Complete validation quickly without impacting startup time
6. **Extensibility**: Easy to add new validation rules as the format evolves

## Non-Goals

1. **Content generation**: Won't generate missing content, only fix formatting
2. **Semantic validation**: Won't validate whether requirements make sense
3. **Custom formats**: Won't support alternative file formats beyond markdown
4. **Backward compatibility breaking**: Won't change existing valid formats

## Detailed Design

### Architecture Changes

```
src/
├── core/
│   ├── validators/           # New directory
│   │   ├── index.ts
│   │   ├── issue-validator.ts
│   │   ├── plan-validator.ts
│   │   ├── todo-validator.ts
│   │   └── validation-error.ts
│   └── autonomous-agent.ts   # Updated to use validators
└── cli/
    └── commands/
        └── run.ts           # Updated to validate before execution
```

### Implementation Approach

#### 1. Validation Error Class

```typescript
// src/core/validators/validation-error.ts
export interface ValidationIssue {
  file: string;
  line?: number;
  column?: number;
  severity: 'error' | 'warning';
  message: string;
  rule: string;
  suggestion?: string;
}

export class ValidationError extends Error {
  constructor(
    public readonly issues: ValidationIssue[],
    message?: string
  ) {
    super(message || `Validation failed with ${issues.length} issue(s)`);
    this.name = 'ValidationError';
  }

  formatIssues(): string {
    return this.issues
      .map(issue => {
        const location = issue.line 
          ? `${issue.file}:${issue.line}${issue.column ? `:${issue.column}` : ''}`
          : issue.file;
        
        const formatted = `${issue.severity.toUpperCase()}: ${location}\n  ${issue.message}`;
        
        if (issue.suggestion) {
          return `${formatted}\n  Suggestion: ${issue.suggestion}`;
        }
        
        return formatted;
      })
      .join('\n\n');
  }

  // Separate formatting issues from content issues
  categorizeIssues(): {
    formatting: ValidationIssue[];
    content: ValidationIssue[];
  } {
    const formattingRules = [
      'issue-title-format',
      'issue-reference-format',
      'todo-checkbox-format',
      'todo-issue-reference',
      'todo-item-spacing',
      'todo-pending-checked',
      'todo-completed-unchecked',
      'plan-title-format',
      'markdown-formatting'
    ];

    return {
      formatting: this.issues.filter(i => formattingRules.includes(i.rule)),
      content: this.issues.filter(i => !formattingRules.includes(i.rule))
    };
  }
}
```

#### 2. Autofix Service

```typescript
// src/core/validators/autofix-service.ts
export interface AutofixOptions {
  provider?: 'claude' | 'gemini';
  dryRun?: boolean;
  maxAttempts?: number;
  interactive?: boolean;
}

export class AutofixService {
  constructor(
    private readonly options: AutofixOptions = {}
  ) {}

  async fixFormattingIssues(
    issues: ValidationIssue[],
    workspace: string
  ): Promise<AutofixResult> {
    const logger = new Logger();
    const results: FileFixResult[] = [];
    
    // Group issues by file
    const issuesByFile = this.groupIssuesByFile(issues);
    
    logger.info(`Attempting to fix formatting issues in ${issuesByFile.size} file(s)...`);
    
    for (const [file, fileIssues] of issuesByFile) {
      try {
        const result = await this.fixFile(file, fileIssues, workspace);
        results.push(result);
        
        if (result.success) {
          logger.success(`Fixed ${result.fixedCount}/${fileIssues.length} issues in ${file}`);
        } else {
          logger.warning(`Failed to fix issues in ${file}: ${result.error}`);
        }
      } catch (error) {
        logger.error(`Error fixing ${file}: ${error.message}`);
        results.push({
          file,
          success: false,
          error: error.message,
          fixedCount: 0
        });
      }
    }
    
    return {
      results,
      totalFixed: results.reduce((sum, r) => sum + r.fixedCount, 0),
      totalIssues: issues.length
    };
  }

  private async fixFile(
    filePath: string,
    issues: ValidationIssue[],
    workspace: string
  ): Promise<FileFixResult> {
    const fullPath = path.join(workspace, filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    
    // Generate fix prompt
    const prompt = this.generateFixPrompt(filePath, content, issues);
    
    // Call provider in non-interactive mode
    const fixedContent = await this.callProvider(prompt, content);
    
    if (!fixedContent || fixedContent === content) {
      return {
        file: filePath,
        success: false,
        error: 'No changes made by provider',
        fixedCount: 0
      };
    }
    
    // Validate the fixed content
    const validator = this.getValidatorForFile(filePath);
    const newIssues = await validator.validateContent(fixedContent, filePath);
    
    // Check if formatting issues were fixed
    const remainingFormatting = newIssues.filter(i => 
      issues.some(orig => orig.rule === i.rule)
    );
    
    if (remainingFormatting.length === 0) {
      // All formatting issues fixed, save the file
      if (!this.options.dryRun) {
        await fs.writeFile(fullPath, fixedContent);
      }
      
      return {
        file: filePath,
        success: true,
        fixedCount: issues.length,
        preview: this.options.dryRun ? fixedContent : undefined
      };
    } else {
      return {
        file: filePath,
        success: false,
        error: `${remainingFormatting.length} formatting issues remain`,
        fixedCount: issues.length - remainingFormatting.length
      };
    }
  }

  private generateFixPrompt(
    file: string,
    content: string,
    issues: ValidationIssue[]
  ): string {
    return `Fix ONLY the formatting issues in this ${file} file. 
Do NOT change the content, meaning, or structure. 
Do NOT add or remove sections.
ONLY fix the specific formatting issues listed below.

Formatting issues to fix:
${issues.map(i => `- Line ${i.line}: ${i.message}\n  Fix: ${i.suggestion}`).join('\n')}

Current content:
\`\`\`markdown
${content}
\`\`\`

Return ONLY the corrected markdown with formatting issues fixed.`;
  }

  private async callProvider(prompt: string, originalContent: string): Promise<string> {
    const provider = this.options.provider || 'claude';
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autofix-'));
    
    try {
      // Write prompt to temporary file
      const promptFile = path.join(tempDir, 'prompt.md');
      await fs.writeFile(promptFile, prompt);
      
      // Call provider in non-interactive mode
      const command = provider === 'claude' 
        ? `claude --no-interactive --max-tokens 4000 < "${promptFile}"`
        : `gemini --no-interactive < "${promptFile}"`;
      
      const { stdout, stderr } = await exec(command);
      
      if (stderr) {
        throw new Error(`Provider error: ${stderr}`);
      }
      
      // Extract markdown content from response
      const extracted = this.extractMarkdown(stdout);
      return extracted || originalContent;
      
    } finally {
      // Cleanup temp directory
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  }

  private extractMarkdown(response: string): string | null {
    // Try to extract markdown from code blocks
    const codeBlockMatch = response.match(/```(?:markdown|md)?\n([\s\S]*?)\n```/);
    if (codeBlockMatch) {
      return codeBlockMatch[1];
    }
    
    // If no code block, assume entire response is markdown
    return response.trim();
  }
}

#### 2. Issue Validator

```typescript
// src/core/validators/issue-validator.ts
export interface IssueValidatorOptions {
  strict?: boolean;
  allowedSections?: string[];
  requireSections?: string[];
}

export class IssueValidator {
  private readonly rules: ValidationRule[] = [
    new IssueNumberFormatRule(),
    new RequiredSectionsRule(),
    new MarkdownStructureRule(),
    new CrossReferenceRule(),
    new EncodingRule()
  ];

  constructor(private options: IssueValidatorOptions = {}) {}

  async validateFile(filePath: string): Promise<ValidationIssue[]> {
    const content = await fs.readFile(filePath, 'utf-8');
    const issues: ValidationIssue[] = [];

    // Parse file
    const parsed = this.parseIssueFile(content);
    
    // Run all rules
    for (const rule of this.rules) {
      const ruleIssues = await rule.validate(filePath, parsed, this.options);
      issues.push(...ruleIssues);
    }

    return issues;
  }

  async validateDirectory(dir: string): Promise<ValidationIssue[]> {
    const files = await glob('**/*.md', { cwd: dir });
    const allIssues: ValidationIssue[] = [];

    for (const file of files) {
      const issues = await this.validateFile(path.join(dir, file));
      allIssues.push(...issues);
    }

    return allIssues;
  }

  private parseIssueFile(content: string): ParsedIssue {
    // Extract frontmatter, title, sections, etc.
    return {
      frontmatter: this.extractFrontmatter(content),
      title: this.extractTitle(content),
      sections: this.extractSections(content),
      references: this.extractReferences(content),
      raw: content
    };
  }
}
```

#### 3. Validation Rules

```typescript
// src/core/validators/rules/issue-number-format.ts
export class IssueNumberFormatRule implements ValidationRule {
  async validate(
    file: string, 
    parsed: ParsedIssue, 
    options: IssueValidatorOptions
  ): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];
    const lines = parsed.raw.split('\n');

    // Check title format
    const titleMatch = parsed.title?.match(/^#?\s*Issue\s+#?(\d+):?\s*(.+)$/i);
    if (!titleMatch) {
      issues.push({
        file,
        line: 1,
        severity: 'error',
        message: 'Issue title must follow format: "# Issue #N: Title"',
        rule: 'issue-title-format',
        suggestion: 'Use format like "# Issue #10: Add user authentication"'
      });
    }

    // Check references in content
    lines.forEach((line, index) => {
      // Find inconsistent references
      const badPatterns = [
        { regex: /\b#(\d+)\b/, suggestion: 'Use "Issue #N" instead of "#N"' },
        { regex: /\bissue\s+(\d+)\b/i, suggestion: 'Use "Issue #N" instead of "issue N"' },
        { regex: /\b(\d+)\s*-\s*[a-z]/i, suggestion: 'Use "Issue #N" for issue references' }
      ];

      for (const pattern of badPatterns) {
        const match = line.match(pattern.regex);
        if (match && !line.includes(`Issue #${match[1]}`)) {
          issues.push({
            file,
            line: index + 1,
            column: match.index! + 1,
            severity: 'warning',
            message: `Inconsistent issue reference format: "${match[0]}"`,
            rule: 'issue-reference-format',
            suggestion: pattern.suggestion
          });
        }
      }
    });

    return issues;
  }
}
```

#### 4. TODO Validator

```typescript
// src/core/validators/todo-validator.ts
export class TodoValidator {
  private readonly rules: ValidationRule[] = [
    new TodoStructureRule(),
    new TodoIssueFormatRule(),
    new TodoCheckboxRule(),
    new TodoIssueOrderRule(),
    new TodoDuplicateRule()
  ];

  async validateFile(filePath: string): Promise<ValidationIssue[]> {
    const content = await fs.readFile(filePath, 'utf-8');
    const issues: ValidationIssue[] = [];

    // Verify it's a TODO.md file
    if (!filePath.endsWith('TODO.md')) {
      issues.push({
        file: filePath,
        severity: 'error',
        message: 'TODO file must be named "TODO.md"',
        rule: 'todo-filename',
        suggestion: 'Rename file to "TODO.md"'
      });
    }

    // Parse and validate structure
    const parsed = this.parseTodoFile(content);
    
    // Check required sections
    if (!parsed.sections.pending || !parsed.sections.completed) {
      issues.push({
        file: filePath,
        severity: 'error',
        message: 'TODO.md must have both "Pending Issues" and "Completed Issues" sections',
        rule: 'todo-required-sections',
        suggestion: 'Add sections: ## Pending Issues and ## Completed Issues'
      });
    }

    // Run validation rules
    for (const rule of this.rules) {
      const ruleIssues = await rule.validate(filePath, parsed);
      issues.push(...ruleIssues);
    }

    return issues;
  }

  private parseTodoFile(content: string): ParsedTodo {
    const lines = content.split('\n');
    const sections = { pending: [], completed: [] };
    let currentSection = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.match(/##\s*Pending Issues/i)) {
        currentSection = 'pending';
      } else if (line.match(/##\s*Completed Issues/i)) {
        currentSection = 'completed';
      } else if (currentSection && line.trim().startsWith('- [')) {
        sections[currentSection].push({
          line: i + 1,
          text: line,
          checked: line.includes('[x]') || line.includes('[X]'),
          issueNumber: this.extractIssueNumber(line)
        });
      }
    }

    return { sections, raw: content, lines };
  }

  private extractIssueNumber(line: string): number | null {
    const match = line.match(/Issue\s+#(\d+)/i);
    return match ? parseInt(match[1]) : null;
  }
}

// Validation rules for TODO.md
export class TodoIssueFormatRule implements ValidationRule {
  async validate(file: string, parsed: ParsedTodo): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];

    // Check all todo items
    const allItems = [
      ...parsed.sections.pending,
      ...parsed.sections.completed
    ];

    for (const item of allItems) {
      // Check checkbox format
      if (!item.text.match(/^-\s*\[([ xX])\]/)) {
        issues.push({
          file,
          line: item.line,
          severity: 'error',
          message: 'Invalid checkbox format',
          rule: 'todo-checkbox-format',
          suggestion: 'Use "- [ ]" for pending or "- [x]" for completed'
        });
      }

      // Check issue reference format
      if (!item.text.match(/\*\*\[Issue #\d+\]\*\*/)) {
        issues.push({
          file,
          line: item.line,
          severity: 'error',
          message: 'Issue reference must be in format: **[Issue #N]**',
          rule: 'todo-issue-reference',
          suggestion: 'Format as: - [ ] **[Issue #10]** Description'
        });
      }

      // Check for proper spacing
      if (!item.text.match(/^-\s*\[([ xX])\]\s+\*\*\[Issue #\d+\]\*\*\s+.+/)) {
        issues.push({
          file,
          line: item.line,
          severity: 'warning',
          message: 'Improper spacing in TODO item',
          rule: 'todo-item-spacing',
          suggestion: 'Use format: "- [ ] **[Issue #N]** Description"'
        });
      }
    }

    return issues;
  }
}

export class TodoCheckboxRule implements ValidationRule {
  async validate(file: string, parsed: ParsedTodo): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];

    // Check pending items don't have checked boxes
    for (const item of parsed.sections.pending) {
      if (item.checked) {
        issues.push({
          file,
          line: item.line,
          severity: 'error',
          message: 'Pending issue has checked checkbox',
          rule: 'todo-pending-checked',
          suggestion: 'Move to "Completed Issues" or uncheck with "- [ ]"'
        });
      }
    }

    // Check completed items have checked boxes
    for (const item of parsed.sections.completed) {
      if (!item.checked) {
        issues.push({
          file,
          line: item.line,
          severity: 'error',
          message: 'Completed issue has unchecked checkbox',
          rule: 'todo-completed-unchecked',
          suggestion: 'Move to "Pending Issues" or check with "- [x]"'
        });
      }
    }

    return issues;
  }
}

export class TodoDuplicateRule implements ValidationRule {
  async validate(file: string, parsed: ParsedTodo): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];
    const seenIssues = new Map<number, number>();

    const allItems = [
      ...parsed.sections.pending,
      ...parsed.sections.completed
    ];

    for (const item of allItems) {
      if (item.issueNumber) {
        const previousLine = seenIssues.get(item.issueNumber);
        if (previousLine) {
          issues.push({
            file,
            line: item.line,
            severity: 'error',
            message: `Duplicate Issue #${item.issueNumber} (first seen at line ${previousLine})`,
            rule: 'todo-duplicate-issue',
            suggestion: 'Remove duplicate entry or update issue number'
          });
        } else {
          seenIssues.set(item.issueNumber, item.line);
        }
      }
    }

    return issues;
  }
}
```

#### 5. Plan Validator

```typescript
// src/core/validators/plan-validator.ts
export class PlanValidator {
  private readonly rules: ValidationRule[] = [
    new PlanStructureRule(),
    new PhaseValidationRule(),
    new TaskFormatRule(),
    new PlanIssueReferenceRule()
  ];

  async validateFile(filePath: string, issueNumber?: number): Promise<ValidationIssue[]> {
    const content = await fs.readFile(filePath, 'utf-8');
    const issues: ValidationIssue[] = [];

    // Verify plan matches issue if provided
    if (issueNumber) {
      const planMatch = content.match(/^#?\s*Plan\s+for\s+Issue\s+#?(\d+)/i);
      if (!planMatch || parseInt(planMatch[1]) !== issueNumber) {
        issues.push({
          file: filePath,
          line: 1,
          severity: 'error',
          message: `Plan file does not match issue #${issueNumber}`,
          rule: 'plan-issue-mismatch',
          suggestion: `Update title to "# Plan for Issue #${issueNumber}"`
        });
      }
    }

    // Run validation rules
    const parsed = this.parsePlanFile(content);
    for (const rule of this.rules) {
      const ruleIssues = await rule.validate(filePath, parsed);
      issues.push(...ruleIssues);
    }

    return issues;
  }
}
```

#### 6. Integration with Run Command

```typescript
// src/cli/commands/run.ts
export async function runCommand(options: RunOptions): Promise<void> {
  const logger = new Logger();
  
  // Step 1: Validate before execution
  if (options.validate !== false) {
    logger.info('Validating TODO.md, issue, and plan files...');
    
    try {
      await validateWorkspace(options);
      logger.success('All files validated successfully');
    } catch (error) {
      if (error instanceof ValidationError) {
        const { formatting, content } = error.categorizeIssues();
        
        // If autofix is enabled and there are formatting issues
        if (options.autofix && formatting.length > 0) {
          logger.info('Attempting to auto-fix formatting issues...');
          
          const autofixService = new AutofixService({
            provider: options.provider,
            dryRun: options.dryRun,
            maxAttempts: 2
          });
          
          const fixResult = await autofixService.fixFormattingIssues(
            formatting,
            options.workspace
          );
          
          logger.info(`Fixed ${fixResult.totalFixed}/${fixResult.totalIssues} formatting issues`);
          
          // Re-validate after fixes
          try {
            await validateWorkspace(options);
            logger.success('All files validated successfully after auto-fix');
          } catch (revalidateError) {
            if (revalidateError instanceof ValidationError) {
              logger.error('Validation still failing after auto-fix:');
              console.error(revalidateError.formatIssues());
              
              if (options.force) {
                logger.warning('Continuing with --force flag despite remaining errors');
              } else {
                logger.error('Fix remaining errors manually or use --force to skip');
                process.exit(1);
              }
            } else {
              throw revalidateError;
            }
          }
        } else {
          // No autofix or only content issues
          logger.error('Validation failed:');
          console.error(error.formatIssues());
          
          if (formatting.length > 0 && !options.autofix) {
            logger.info(`Found ${formatting.length} formatting issues that could be auto-fixed with --autofix`);
          }
          
          if (options.force) {
            logger.warning('Continuing with --force flag despite validation errors');
          } else {
            logger.error('Fix validation errors or use --force to skip validation');
            process.exit(1);
          }
        }
      } else {
        throw error;
      }
    }
  }

  // Step 2: Continue with normal execution
  const agent = new AutonomousAgent(options);
  // ... rest of execution
}

async function validateWorkspace(options: RunOptions): Promise<void> {
  const issueValidator = new IssueValidator({
    strict: options.strictValidation
  });
  
  const planValidator = new PlanValidator();
  const todoValidator = new TodoValidator();
  const allIssues: ValidationIssue[] = [];

  // Step 1: Validate TODO.md first (it's the entry point)
  const todoPath = path.join(options.workspace, 'TODO.md');
  if (await fs.exists(todoPath)) {
    const todoIssues = await todoValidator.validateFile(todoPath);
    allIssues.push(...todoIssues);
  } else {
    allIssues.push({
      file: 'TODO.md',
      severity: 'error',
      message: 'TODO.md file not found',
      rule: 'todo-missing',
      suggestion: 'Create TODO.md with sections: ## Pending Issues and ## Completed Issues'
    });
  }

  // Step 2: Validate issues directory
  const issueValidationIssues = await issueValidator.validateDirectory(
    path.join(options.workspace, 'issues')
  );
  allIssues.push(...issueValidationIssues);

  // Step 3: Validate plans directory
  const planFiles = await glob('**/*.md', { 
    cwd: path.join(options.workspace, 'plans') 
  });
  
  for (const planFile of planFiles) {
    // Extract issue number from plan filename
    const issueMatch = planFile.match(/(\d+)-plan\.md$/);
    const issueNumber = issueMatch ? parseInt(issueMatch[1]) : undefined;
    
    const planIssues = await planValidator.validateFile(
      path.join(options.workspace, 'plans', planFile),
      issueNumber
    );
    allIssues.push(...planIssues);
  }

  // Step 4: Cross-validate TODO.md with actual issues
  if (await fs.exists(todoPath)) {
    const crossValidationIssues = await validateTodoReferences(
      todoPath,
      path.join(options.workspace, 'issues')
    );
    allIssues.push(...crossValidationIssues);
  }

  // Filter by severity if needed
  const errors = allIssues.filter(i => i.severity === 'error');
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  // Show warnings if any
  const warnings = allIssues.filter(i => i.severity === 'warning');
  if (warnings.length > 0 && options.showWarnings) {
    const warningError = new ValidationError(warnings);
    console.warn('Validation warnings:\n' + warningError.formatIssues());
  }
}

// Cross-validate TODO.md references with actual issue files
async function validateTodoReferences(
  todoPath: string,
  issuesDir: string
): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = [];
  const todoContent = await fs.readFile(todoPath, 'utf-8');
  const issueFiles = await glob('**/*.md', { cwd: issuesDir });
  
  // Extract issue numbers from files
  const existingIssues = new Set<number>();
  for (const file of issueFiles) {
    const match = file.match(/^(\d+)-/);
    if (match) {
      existingIssues.add(parseInt(match[1]));
    }
  }

  // Check each TODO reference
  const todoReferences = [...todoContent.matchAll(/\*\*\[Issue #(\d+)\]\*\*/g)];
  for (const ref of todoReferences) {
    const issueNumber = parseInt(ref[1]);
    const line = todoContent.substring(0, ref.index!).split('\n').length;
    
    if (!existingIssues.has(issueNumber)) {
      issues.push({
        file: todoPath,
        line,
        severity: 'error',
        message: `Issue #${issueNumber} referenced in TODO.md does not exist`,
        rule: 'todo-broken-reference',
        suggestion: `Create issue file or remove reference to Issue #${issueNumber}`
      });
    }
  }

  // Check for orphaned issues not in TODO
  for (const issueNum of existingIssues) {
    if (!todoContent.includes(`**[Issue #${issueNum}]**`)) {
      issues.push({
        file: todoPath,
        severity: 'warning',
        message: `Issue #${issueNum} exists but is not tracked in TODO.md`,
        rule: 'todo-missing-issue',
        suggestion: `Add Issue #${issueNum} to either Pending or Completed section`
      });
    }
  }

  return issues;
}
```

### Validation Rules Implementation

#### Required Sections Rule
```typescript
export class RequiredSectionsRule implements ValidationRule {
  private readonly defaultRequired = ['Requirements', 'Acceptance Criteria'];
  
  async validate(file: string, parsed: ParsedIssue): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];
    const required = this.defaultRequired;
    
    for (const section of required) {
      if (!parsed.sections.some(s => s.title.toLowerCase() === section.toLowerCase())) {
        issues.push({
          file,
          severity: 'error',
          message: `Missing required section: "${section}"`,
          rule: 'required-section',
          suggestion: `Add a section "## ${section}" to the file`
        });
      }
    }
    
    return issues;
  }
}
```

#### Cross-Reference Validation
```typescript
export class CrossReferenceRule implements ValidationRule {
  async validate(
    file: string, 
    parsed: ParsedIssue,
    context: ValidationContext
  ): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];
    const references = this.extractIssueReferences(parsed.raw);
    
    for (const ref of references) {
      const issueFile = await this.findIssueFile(ref.number, context);
      if (!issueFile) {
        issues.push({
          file,
          line: ref.line,
          column: ref.column,
          severity: 'warning',
          message: `Referenced Issue #${ref.number} not found`,
          rule: 'broken-reference',
          suggestion: `Verify Issue #${ref.number} exists or update the reference`
        });
      }
    }
    
    return issues;
  }
}
```

## Migration Strategy

Since this is a new feature, migration is minimal:

1. **Opt-in by default**: Validation runs automatically on `run` command
2. **Opt-out available**: Users can use `--no-validate` flag to skip
3. **Force flag**: `--force` allows execution despite validation errors
4. **Gradual adoption**: Warnings don't block execution initially

## Testing Strategy

### Unit Tests

```typescript
describe('IssueValidator', () => {
  it('should detect inconsistent issue number formats', async () => {
    const validator = new IssueValidator();
    const issues = await validator.validateFile('test-issue.md');
    
    expect(issues).toContainEqual(expect.objectContaining({
      rule: 'issue-reference-format',
      message: expect.stringContaining('Inconsistent issue reference')
    }));
  });

  it('should validate required sections', async () => {
    const content = '# Issue #1: Test\n\nNo required sections';
    const issues = await validator.validateContent(content, 'test.md');
    
    expect(issues).toHaveLength(2);
    expect(issues).toContainEqual(expect.objectContaining({
      rule: 'required-section',
      message: 'Missing required section: "Requirements"'
    }));
  });
});

describe('TodoValidator', () => {
  it('should validate TODO.md structure', async () => {
    const validator = new TodoValidator();
    const content = `# To-Do

## Pending Issues
- [ ] **[Issue #1]** First task
- [x] **[Issue #2]** Wrong checkbox in pending

## Completed Issues
- [ ] **[Issue #3]** Wrong checkbox in completed
- [x] **[Issue #4]** Completed task
`;
    const issues = await validator.validateContent(content, 'TODO.md');
    
    expect(issues).toContainEqual(expect.objectContaining({
      rule: 'todo-pending-checked',
      line: 5,
      message: 'Pending issue has checked checkbox'
    }));
    
    expect(issues).toContainEqual(expect.objectContaining({
      rule: 'todo-completed-unchecked',
      line: 8,
      message: 'Completed issue has unchecked checkbox'
    }));
  });

  it('should detect duplicate issues in TODO', async () => {
    const content = `# To-Do

## Pending Issues
- [ ] **[Issue #1]** First occurrence
- [ ] **[Issue #1]** Duplicate

## Completed Issues
`;
    const issues = await validator.validateContent(content, 'TODO.md');
    
    expect(issues).toContainEqual(expect.objectContaining({
      rule: 'todo-duplicate-issue',
      line: 5,
      message: 'Duplicate Issue #1 (first seen at line 4)'
    }));
  });

  it('should validate issue reference format', async () => {
    const content = `# To-Do

## Pending Issues
- [ ] [Issue #1] Missing bold
- [ ] **Issue #2** Missing brackets
- [ ] Issue #3 No formatting

## Completed Issues
`;
    const issues = await validator.validateContent(content, 'TODO.md');
    
    expect(issues.filter(i => i.rule === 'todo-issue-reference')).toHaveLength(3);
  });
});
```

### Integration Tests

```typescript
describe('AutofixService', () => {
  let autofixService: AutofixService;
  let mockProvider: vi.Mock;

  beforeEach(() => {
    mockProvider = vi.fn();
    autofixService = new AutofixService({
      provider: 'claude',
      dryRun: false
    });
  });

  it('should fix formatting issues in TODO.md', async () => {
    const issues: ValidationIssue[] = [
      {
        file: 'TODO.md',
        line: 5,
        severity: 'error',
        message: 'Issue reference must be in format: **[Issue #N]**',
        rule: 'todo-issue-reference',
        suggestion: 'Format as: - [ ] **[Issue #10]** Description'
      }
    ];

    const workspace = await createTestWorkspace();
    await workspace.writeFile('TODO.md', `# To-Do

## Pending Issues
- [ ] Issue #10 Add authentication

## Completed Issues
`);

    mockProvider.mockResolvedValue(`# To-Do

## Pending Issues
- [ ] **[Issue #10]** Add authentication

## Completed Issues
`);

    const result = await autofixService.fixFormattingIssues(issues, workspace.path);
    
    expect(result.totalFixed).toBe(1);
    expect(result.results[0].success).toBe(true);
    
    const fixed = await workspace.readFile('TODO.md');
    expect(fixed).toContain('**[Issue #10]**');
  });

  it('should not fix content issues', async () => {
    const issues: ValidationIssue[] = [
      {
        file: 'issues/1-test.md',
        severity: 'error',
        message: 'Missing required section: "Requirements"',
        rule: 'required-section',
        suggestion: 'Add a section "## Requirements" to the file'
      }
    ];

    const result = await autofixService.fixFormattingIssues(issues, workspace.path);
    
    expect(result.totalFixed).toBe(0);
    expect(result.results).toHaveLength(0);
  });

  it('should handle dry run mode', async () => {
    const autofixDryRun = new AutofixService({
      provider: 'claude',
      dryRun: true
    });

    const issues: ValidationIssue[] = [
      {
        file: 'TODO.md',
        line: 5,
        severity: 'error',
        message: 'Pending issue has checked checkbox',
        rule: 'todo-pending-checked',
        suggestion: 'Move to "Completed Issues" or uncheck with "- [ ]"'
      }
    ];

    const originalContent = await workspace.readFile('TODO.md');
    const result = await autofixDryRun.fixFormattingIssues(issues, workspace.path);
    
    expect(result.totalFixed).toBe(1);
    expect(result.results[0].preview).toBeDefined();
    
    // File should not be modified in dry run
    const afterContent = await workspace.readFile('TODO.md');
    expect(afterContent).toBe(originalContent);
  });
});

describe('Run command with validation', () => {
  it('should fail on validation errors', async () => {
    await createInvalidIssue(workspace, 1);
    
    const result = await runCommand({
      workspace: workspace.path,
      validate: true
    });
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('Validation failed');
  });

  it('should continue with --force despite errors', async () => {
    await createInvalidIssue(workspace, 1);
    
    const result = await runCommand({
      workspace: workspace.path,
      validate: true,
      force: true
    });
    
    expect(result.success).toBe(true);
  });
});
```

## Performance Considerations

1. **Parallel validation**: Validate multiple files concurrently
2. **Caching**: Cache parsed files during validation to avoid re-parsing
3. **Lazy loading**: Only load validation rules that are needed
4. **Early exit**: Stop validation on first error if `--fail-fast` is set

```typescript
// Parallel validation implementation
async function validateFilesParallel(files: string[]): Promise<ValidationIssue[]> {
  const BATCH_SIZE = 10;
  const allIssues: ValidationIssue[] = [];
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(file => validator.validateFile(file))
    );
    
    for (const issues of batchResults) {
      allIssues.push(...issues);
      
      if (options.failFast && issues.some(i => i.severity === 'error')) {
        throw new ValidationError(allIssues);
      }
    }
  }
  
  return allIssues;
}
```

## Security Considerations

1. **Path traversal**: Validate file paths stay within workspace
2. **File size limits**: Skip validation for files over 1MB
3. **Regex DoS**: Use regex with timeout protection
4. **Encoding**: Properly handle various file encodings

## Documentation

### CLI Help Update

```bash
autoagent run [options]

Options:
  --validate          Validate files before execution (default: true)
  --no-validate       Skip validation
  --autofix           Automatically fix formatting issues
  --dry-run           Preview autofix changes without applying
  --strict            Enable strict validation mode
  --force             Continue despite validation errors
  --fail-fast         Stop on first validation error
  --show-warnings     Display validation warnings
  --provider <name>   Provider for autofix (claude/gemini)
```

### Error Message Examples

```
ERROR: TODO.md:5:1
  Pending issue has checked checkbox
  Suggestion: Move to "Completed Issues" or uncheck with "- [ ]"

ERROR: TODO.md:12:1
  Issue reference must be in format: **[Issue #N]**
  Suggestion: Format as: - [ ] **[Issue #10]** Description

ERROR: TODO.md:18:1
  Duplicate Issue #5 (first seen at line 8)
  Suggestion: Remove duplicate entry or update issue number

ERROR: TODO.md:22:15
  Issue #15 referenced in TODO.md does not exist
  Suggestion: Create issue file or remove reference to Issue #15

WARNING: TODO.md
  Issue #20 exists but is not tracked in TODO.md
  Suggestion: Add Issue #20 to either Pending or Completed section

ERROR: issues/10-add-auth.md:1:1
  Issue title must follow format: "# Issue #N: Title"
  Suggestion: Use format like "# Issue #10: Add user authentication"

ERROR: issues/10-add-auth.md:15:8
  Inconsistent issue reference format: "#5"
  Suggestion: Use "Issue #5" instead of "#5"

WARNING: plans/10-plan.md:8:12
  Referenced Issue #5 not found
  Suggestion: Verify Issue #5 exists or update the reference
```

### Autofix Examples

#### Example 1: Fixing TODO.md formatting

```bash
$ autoagent run --autofix

Validating TODO.md, issue, and plan files...
ERROR: TODO.md:5:1
  Pending issue has checked checkbox
  Suggestion: Move to "Completed Issues" or uncheck with "- [ ]"

ERROR: TODO.md:12:1
  Issue reference must be in format: **[Issue #N]**
  Suggestion: Format as: - [ ] **[Issue #10]** Description

Attempting to auto-fix formatting issues...
Fixed 2/2 formatting issues
All files validated successfully after auto-fix
```

#### Example 2: Mixed formatting and content issues

```bash
$ autoagent run --autofix

Validating TODO.md, issue, and plan files...
ERROR: TODO.md:8:1
  Issue reference must be in format: **[Issue #N]**
  Suggestion: Format as: - [ ] **[Issue #5]** Description

ERROR: issues/5-feature.md
  Missing required section: "Requirements"
  Suggestion: Add a section "## Requirements" to the file

Attempting to auto-fix formatting issues...
Fixed 1/1 formatting issues

Validation still failing after auto-fix:
ERROR: issues/5-feature.md
  Missing required section: "Requirements"
  Suggestion: Add a section "## Requirements" to the file

Fix remaining errors manually or use --force to skip
```

#### Example 3: Dry run mode

```bash
$ autoagent run --autofix --dry-run

Validating TODO.md, issue, and plan files...
ERROR: TODO.md:5:1
  Issue reference must be in format: **[Issue #N]**

Attempting to auto-fix formatting issues...
Preview of changes to TODO.md:
- [ ] Issue #10 Add authentication  →  - [ ] **[Issue #10]** Add authentication

Fixed 1/1 formatting issues (DRY RUN - no files modified)
```

## Implementation Phases

### Phase 1: Core Validation Framework (Week 1)
- [ ] Create validation error classes with issue categorization
- [ ] Implement basic validator structure
- [ ] Add file parsing utilities
- [ ] Create validation rule interface

### Phase 2: TODO.md Validation (Week 1)
- [ ] Implement TODO structure validator
- [ ] Add checkbox validation rules
- [ ] Create issue reference format checking
- [ ] Add duplicate detection
- [ ] Implement cross-reference validation

### Phase 3: Issue Validation (Week 1-2)
- [ ] Implement issue number format rule
- [ ] Add required sections rule
- [ ] Create markdown structure validation
- [ ] Add cross-reference checking

### Phase 4: Plan Validation (Week 2)
- [ ] Implement plan structure validation
- [ ] Add phase validation rules
- [ ] Create task format checking
- [ ] Validate plan-issue matching

### Phase 5: Autofix Implementation (Week 2-3)
- [ ] Create AutofixService class
- [ ] Implement provider integration (Claude/Gemini)
- [ ] Add prompt generation for formatting fixes
- [ ] Implement re-validation after fixes
- [ ] Add dry-run mode support

### Phase 6: CLI Integration (Week 3)
- [ ] Update run command with validation
- [ ] Add validation and autofix flags
- [ ] Implement error formatting
- [ ] Add progress reporting
- [ ] Integrate TODO-issue cross-validation

### Phase 7: Testing & Optimization (Week 3-4)
- [ ] Write comprehensive unit tests
- [ ] Add integration tests for autofix
- [ ] Optimize performance
- [ ] Add validation benchmarks

### Phase 8: Documentation & Release (Week 4)
- [ ] Update CLI documentation
- [ ] Add validation and autofix guide
- [ ] Create migration notes
- [ ] Release with feature flag

## Open Questions

1. **Validation strictness levels**: Should we have multiple strictness levels (lax, normal, strict)?
2. **Provider selection for autofix**: Should autofix automatically select the best available provider?
3. **Custom validation rules**: Should users be able to add custom validation rules via config?
4. **Validation config file**: Should validation rules be configurable via `.autoagent/validation.json`?
5. **IDE integration**: How can we expose validation for IDE plugins?
6. **Performance thresholds**: What's the acceptable validation time for large projects?
7. **Caching strategy**: Should we cache validation results based on file modification time?
8. **Autofix prompt customization**: Should users be able to customize autofix prompts?
9. **Batch autofix**: Should we fix all files in one provider call or separately?
10. **Autofix history**: Should we keep a log of autofix changes for rollback?

## Success Metrics

1. **Error prevention**: 90% reduction in runtime parsing errors
2. **Performance**: Validation completes in <500ms for typical projects
3. **User satisfaction**: Clear error messages that users can act on
4. **Adoption**: 80% of users keep validation enabled after first month
5. **False positives**: Less than 1% false positive rate for validation errors