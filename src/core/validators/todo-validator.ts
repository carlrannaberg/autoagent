import { BaseValidator } from './base-validator.js';
import { ValidationIssue } from './validation-error.js';

export class TodoValidator extends BaseValidator {
  async validate(filePath: string): Promise<ValidationIssue[]> {
    this.clearIssues();

    try {
      const content = await this.readFileContent(filePath);
      
      // Validate basic structure
      this.validateTodoStructure(content, filePath);
      
      // Validate checkbox formatting
      this.validateCheckboxes(content, filePath);
      
      // Validate issue references
      this.validateIssueReferences(content, filePath);
      
      return this.issues;
    } catch (error) {
      // Error already added to issues in readFileContent
      return this.issues;
    }
  }

  private validateTodoStructure(content: string, filePath: string): void {
    // Check for required TODO.md header
    if (!content.trim().startsWith('# TODO')) {
      this.addIssue({
        file: filePath,
        line: 1,
        severity: 'error',
        message: 'TODO.md must start with "# TODO" header',
        rule: 'missing-todo-header',
        suggestion: 'Add "# TODO" as the first line',
        isFormatting: true,
        canAutofix: true
      });
    }
  }

  private validateCheckboxes(content: string, filePath: string): void {
    const lines = content.split('\n');
    const checkboxPattern = /^(\s*)(-\s+\[([ xX])\])\s*(.*)$/;
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trimStart();
      
      // Skip non-checkbox lines
      if (!trimmedLine.startsWith('- [')) {
        return;
      }
      
      const match = line.match(checkboxPattern);
      if (match === null) {
        this.addIssue({
          file: filePath,
          line: lineNumber,
          severity: 'error',
          message: 'Invalid checkbox format',
          rule: 'invalid-checkbox',
          suggestion: 'Use format: "- [ ] Task description" or "- [x] Completed task"',
          isFormatting: true,
          canAutofix: true
        });
        return;
      }
      
      const [, , , state, description] = match;
      
      // Check checkbox state
      if (state !== ' ' && state !== 'x' && state !== 'X') {
        this.addIssue({
          file: filePath,
          line: lineNumber,
          severity: 'error',
          message: `Invalid checkbox state: "${state}". Use space for unchecked or "x" for checked`,
          rule: 'invalid-checkbox-state',
          suggestion: 'Use [ ] for unchecked or [x] for checked',
          isFormatting: true,
          canAutofix: true
        });
      }
      
      // Normalize X to x
      if (state === 'X') {
        this.addIssue({
          file: filePath,
          line: lineNumber,
          severity: 'warning',
          message: 'Use lowercase "x" for checked items',
          rule: 'uppercase-checkbox',
          suggestion: 'Change [X] to [x]',
          isFormatting: true,
          canAutofix: true
        });
      }
      
      // Check for empty description
      if (description === undefined || description.trim() === '') {
        this.addIssue({
          file: filePath,
          line: lineNumber,
          severity: 'error',
          message: 'Checkbox has no description',
          rule: 'empty-checkbox',
          suggestion: 'Add a description after the checkbox',
          isFormatting: false,
          canAutofix: false
        });
      }
    });
  }

  private validateIssueReferences(content: string, filePath: string): void {
    const lines = content.split('\n');
    const bareIssueRefPattern = /\*\*\[#(\d+)\]\*\*/g;
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      let match;
      bareIssueRefPattern.lastIndex = 0; // Reset regex state
      
      while ((match = bareIssueRefPattern.exec(line)) !== null) {
        const issueNumber = match[1];
        const column = match.index + 1;
        
        // Error on bare #N format in TODO items - must use "Issue #N"
        this.addIssue({
          file: filePath,
          line: lineNumber,
          column,
          severity: 'error',
          message: `Invalid TODO issue reference "**[#${issueNumber}]**". Must use "**[Issue #${issueNumber}]**"`,
          rule: 'invalid-todo-issue-reference',
          suggestion: `Replace "**[#${issueNumber}]**" with "**[Issue #${issueNumber}]**"`,
          isFormatting: true,
          canAutofix: true
        });
      }
    });
  }
}