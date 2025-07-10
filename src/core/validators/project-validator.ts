import { join } from 'path';
import { existsSync, readdirSync } from 'fs';
import { readdir } from 'fs/promises';
import { TodoValidator } from './todo-validator.js';
import { IssueValidator } from './issue-validator.js';
import { PlanValidator } from './plan-validator.js';
import { ValidationError, ValidationIssue } from './validation-error.js';

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  error?: ValidationError;
}

export async function validateProjectFiles(
  projectDir: string
): Promise<ValidationResult> {
  const allIssues: ValidationIssue[] = [];
  
  // Validate TODO.md if it exists
  const todoPath = join(projectDir, 'TODO.md');
  if (existsSync(todoPath)) {
    const todoValidator = new TodoValidator();
    const todoIssues = await todoValidator.validate(todoPath);
    allIssues.push(...todoIssues);
  }
  
  // Validate all issue files
  const issuesDir = join(projectDir, 'issues');
  if (existsSync(issuesDir)) {
    const issueValidator = new IssueValidator();
    const issueFiles = await readdir(issuesDir);
    
    for (const file of issueFiles) {
      if (file.endsWith('.md')) {
        const issuePath = join(issuesDir, file);
        const issues = await issueValidator.validate(issuePath);
        allIssues.push(...issues);
      }
    }
  }
  
  // Validate all plan files
  const plansDir = join(projectDir, 'plans');
  if (existsSync(plansDir)) {
    const planValidator = new PlanValidator();
    const planFiles = await readdir(plansDir);
    
    for (const file of planFiles) {
      if (file.endsWith('.md')) {
        const planPath = join(plansDir, file);
        const issues = await planValidator.validate(planPath);
        allIssues.push(...issues);
      }
    }
  }
  
  // Cross-validate references
  crossValidateReferences(allIssues, projectDir);
  
  if (allIssues.length > 0) {
    const error = new ValidationError(allIssues);
    return {
      valid: false,
      issues: allIssues,
      error
    };
  }
  
  return {
    valid: true,
    issues: []
  };
}

function crossValidateReferences(
  existingIssues: ValidationIssue[],
  projectDir: string
): void {
  // Get all valid issue numbers from file names
  const issuesDir = join(projectDir, 'issues');
  const validIssueNumbers = new Set<number>();
  
  if (existsSync(issuesDir)) {
    try {
      const files = readdirSync(issuesDir);
      files.forEach((file) => {
        const match = file.match(/^(\d+)-.*\.md$/);
        if (match !== null && match[1] !== undefined) {
          validIssueNumbers.add(parseInt(match[1], 10));
        }
      });
    } catch (error) {
      // Ignore errors in cross-validation
    }
  }
  
  // Check for references to non-existent issues
  const issueRefPattern = /#(\d+)/g;
  
  existingIssues.forEach(issue => {
    // Skip if this is already about issue references
    if (issue.rule === 'inconsistent-issue-ref') {
      return;
    }
    
    // Extract message for any issue references
    let match;
    while ((match = issueRefPattern.exec(issue.message)) !== null) {
      const issueNumStr = match[1];
      if (issueNumStr !== undefined) {
        const referencedIssue = parseInt(issueNumStr, 10);
        if (!validIssueNumbers.has(referencedIssue)) {
          existingIssues.push({
            file: issue.file,
            line: issue.line,
            severity: 'warning',
            message: `Reference to non-existent issue #${referencedIssue}`,
            rule: 'invalid-issue-reference',  
            suggestion: `Ensure issue #${referencedIssue} exists or update the reference`,
            isFormatting: false,
            canAutofix: false
          });
        }
      }
    }
  });
}