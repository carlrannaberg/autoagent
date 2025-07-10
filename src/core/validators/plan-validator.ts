import { BaseValidator } from './base-validator.js';
import { ValidationIssue } from './validation-error.js';

export class PlanValidator extends BaseValidator {
  async validate(filePath: string): Promise<ValidationIssue[]> {
    this.clearIssues();

    try {
      const content = await this.readFileContent(filePath);
      
      // Extract issue number from filename
      const issueNumber = this.extractIssueNumber(filePath);
      if (issueNumber === null) {
        this.addIssue({
          file: filePath,
          severity: 'error',
          message: 'Invalid plan filename format',
          rule: 'invalid-filename',
          suggestion: 'Use format: {number}-{title}.md',
          isFormatting: false,
          canAutofix: false
        });
        return this.issues;
      }
      
      // Validate plan header
      this.validatePlanHeader(content, filePath, issueNumber);
      
      // Validate required sections
      this.validateRequiredSections(content, filePath);
      
      // Validate task list
      this.validateTaskList(content, filePath);
      
      // Validate markdown structure
      this.validateMarkdownStructure(content, filePath);
      
      // Validate issue references
      this.validateIssueReferences(content, filePath);
      
      return this.issues;
    } catch (error) {
      // Error already added to issues in readFileContent
      return this.issues;
    }
  }

  private extractIssueNumber(filePath: string): string | null {
    const match = filePath.match(/(\d+)-.*\.md$/);
    return match !== null && match[1] !== undefined ? match[1] : null;
  }

  private validatePlanHeader(content: string, filePath: string, issueNumber: string): void {
    const lines = content.split('\n');
    const firstLine = lines[0]?.trim() ?? '';
    
    // Check various header formats
    const validFormats = [
      new RegExp(`^#\\s+Plan\\s+for\\s+Issue\\s+#?${issueNumber}(?::\\s+.+)?$`, 'i'),
      new RegExp(`^#\\s+Implementation\\s+Plan.*#?${issueNumber}`, 'i')
    ];
    
    const isValidHeader = validFormats.some(pattern => pattern.test(firstLine));
    
    if (!isValidHeader) {
      // Check if it's just a formatting issue
      const hasIssueNumber = firstLine.includes(issueNumber);
      const hasPlanKeyword = firstLine.toLowerCase().includes('plan');
      const hasTitle = firstLine.match(/^#\s+.+/);
      
      if (hasIssueNumber && hasPlanKeyword && hasTitle !== null) {
        // It's a formatting issue
        this.addIssue({
          file: filePath,
          line: 1,
          severity: 'warning',
          message: `Non-standard plan header format: "${firstLine}"`,
          rule: 'non-standard-header',
          suggestion: `Use format: "# Plan for Issue #${issueNumber}: Title"`,
          isFormatting: true,
          canAutofix: true
        });
      } else {
        // It's a content issue
        this.addIssue({
          file: filePath,
          line: 1,
          severity: 'error',
          message: 'Invalid plan header',
          rule: 'invalid-header',
          suggestion: `First line should be: "# Plan for Issue #${issueNumber}: Title"`,
          isFormatting: false,
          canAutofix: false
        });
      }
    }
  }

  private validateRequiredSections(content: string, filePath: string): void {
    const requiredSections = [
      { name: 'Overview', pattern: /^##\s+Overview/m },
      { name: 'Implementation Steps', pattern: /^##\s+Implementation\s+Steps/m }
    ];
    
    requiredSections.forEach(section => {
      this.checkRequiredSection(content, section.name, filePath, section.pattern);
    });
  }

  private validateTaskList(content: string, filePath: string): void {
    const lines = content.split('\n');
    let inImplementationSection = false;
    let hasTaskList = false;
    const taskPattern = /^\s*\d+\.\s+.+$/;
    const checkboxPattern = /^\s*-\s*\[([ xX])\]\s*.+$/;
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Check if we're in the implementation steps section
      if (line.match(/^##\s+Implementation\s+Steps/i)) {
        inImplementationSection = true;
        return;
      }
      
      // Check if we've left the implementation section
      if (inImplementationSection && line.match(/^##\s+/)) {
        inImplementationSection = false;
      }
      
      // Look for task lists in the implementation section
      if (inImplementationSection) {
        if (taskPattern.test(line) || checkboxPattern.test(line)) {
          hasTaskList = true;
          
          // Validate checkbox format if it's a checkbox
          const checkboxMatch = line.match(checkboxPattern);
          if (checkboxMatch !== null) {
            const state = checkboxMatch[1];
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
          }
        }
      }
    });
    
    // Check if implementation steps section has tasks
    if (content.includes('## Implementation Steps') && !hasTaskList) {
      this.addIssue({
        file: filePath,
        severity: 'error',
        message: 'Implementation Steps section has no tasks',
        rule: 'empty-implementation',
        suggestion: 'Add numbered tasks or checkboxes to the Implementation Steps section',
        isFormatting: false,
        canAutofix: false
      });
    }
  }

  private validateIssueReferences(content: string, filePath: string): void {
    const lines = content.split('\n');
    const issueRefPattern = /(?:issue\s*#?|(?<!\w)#)(\d+)/gi;
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      let match;
      
      // Skip the header line
      if (lineNumber === 1) {
        return;
      }
      
      while ((match = issueRefPattern.exec(line)) !== null) {
        const fullMatch = match[0];
        const issueNumber = match[1];
        const column = match.index + 1;
        
        // Skip numbers that are part of ordered lists (e.g., "1. Create a test file")
        if (line.trim().match(/^\d+\.\s+/)) {
          continue;
        }
        
        // Check if it's not already in the correct format
        if (fullMatch !== `#${issueNumber}`) {
          this.addIssue({
            file: filePath,
            line: lineNumber,
            column,
            severity: 'warning',
            message: `Inconsistent issue reference format: "${fullMatch}"`,
            rule: 'inconsistent-issue-ref',
            suggestion: `Use "#${issueNumber}" format`,
            isFormatting: true,
            canAutofix: true
          });
        }
      }
    });
  }
}