import { BaseValidator } from './base-validator.js';
import { ValidationIssue } from './validation-error.js';

export class IssueValidator extends BaseValidator {
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
          message: 'Invalid issue filename format',
          rule: 'invalid-filename',
          suggestion: 'Use format: {number}-{title}.md',
          isFormatting: false,
          canAutofix: false
        });
        return this.issues;
      }
      
      // Validate issue header
      this.validateIssueHeader(content, filePath, issueNumber);
      
      // Validate required sections
      this.validateRequiredSections(content, filePath);
      
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

  private validateIssueHeader(content: string, filePath: string, issueNumber: string): void {
    const lines = content.split('\n');
    const firstLine = lines[0]?.trim() ?? '';
    
    // Check various header formats
    const validFormats = [
      new RegExp(`^#\\s+Issue\\s+#?${issueNumber}:\\s+.+$`, 'i'),
      new RegExp(`^#\\s+#${issueNumber}:\\s+.+$`, 'i'),
      new RegExp(`^#\\s+${issueNumber}:\\s+.+$`, 'i')
    ];
    
    const isValidHeader = validFormats.some(pattern => pattern.test(firstLine));
    
    if (!isValidHeader) {
      // Check if it's just a formatting issue
      const hasIssueNumber = firstLine.includes(issueNumber);
      const hasTitle = firstLine.match(/^#\s+.+/);
      
      if (hasIssueNumber && hasTitle !== null) {
        // It's a formatting issue
        this.addIssue({
          file: filePath,
          line: 1,
          severity: 'warning',
          message: `Non-standard issue header format: "${firstLine}"`,
          rule: 'non-standard-header',
          suggestion: `Use format: "# Issue #${issueNumber}: Title"`,
          isFormatting: true,
          canAutofix: true
        });
      } else {
        // It's a content issue
        this.addIssue({
          file: filePath,
          line: 1,
          severity: 'error',
          message: 'Invalid issue header',
          rule: 'invalid-header',
          suggestion: `First line should be: "# Issue #${issueNumber}: Title"`,
          isFormatting: false,
          canAutofix: false
        });
      }
    }
  }

  private validateRequiredSections(content: string, filePath: string): void {
    const requiredSections = [
      { name: 'Description', pattern: /^##\s+Description/m },
      { name: 'Requirements', pattern: /^##\s+Requirements/m },
      { name: 'Acceptance Criteria', pattern: /^##\s+Acceptance\s+Criteria/m }
    ];
    
    requiredSections.forEach(section => {
      this.checkRequiredSection(content, section.name, filePath, section.pattern);
    });
  }

  private validateIssueReferences(content: string, filePath: string): void {
    const lines = content.split('\n');
    const bareIssueRefPattern = /(?<!\w)#(\d+)(?!\w)/g;
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Skip the header line
      if (lineNumber === 1) {
        return;
      }
      
      let match;
      bareIssueRefPattern.lastIndex = 0; // Reset regex state
      
      while ((match = bareIssueRefPattern.exec(line)) !== null) {
        const issueNumber = match[1];
        const column = match.index + 1;
        
        // Skip numbers that are part of ordered lists (e.g., "1. Create a test file")
        if (line.trim().match(/^\d+\.\s+/)) {
          continue;
        }
        
        // Error on bare #N format - must use "Issue #N"
        this.addIssue({
          file: filePath,
          line: lineNumber,
          column,
          severity: 'error',
          message: `Invalid issue reference format "#${issueNumber}". Must use "Issue #${issueNumber}"`,
          rule: 'invalid-issue-reference',
          suggestion: `Replace "#${issueNumber}" with "Issue #${issueNumber}"`,
          isFormatting: true,
          canAutofix: true
        });
      }
    });
  }
}