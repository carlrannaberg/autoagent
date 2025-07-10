import { readFile } from 'fs/promises';
import { ValidationIssue } from './validation-error.js';

export abstract class BaseValidator {
  protected issues: ValidationIssue[] = [];

  abstract validate(filePath: string): Promise<ValidationIssue[]>;

  protected async readFileContent(filePath: string): Promise<string> {
    try {
      return await readFile(filePath, 'utf-8');
    } catch (error) {
      this.addIssue({
        file: filePath,
        severity: 'error',
        message: `Failed to read file: ${error instanceof Error ? error.message : String(error)}`,
        rule: 'file-read-error',
        isFormatting: false,
        canAutofix: false
      });
      throw error;
    }
  }

  protected addIssue(issue: ValidationIssue): void {
    this.issues.push(issue);
  }

  protected clearIssues(): void {
    this.issues = [];
  }

  protected checkRequiredSection(
    content: string,
    sectionName: string,
    filePath: string,
    pattern: RegExp
  ): void {
    if (!pattern.test(content)) {
      this.addIssue({
        file: filePath,
        severity: 'error',
        message: `Missing required section: ${sectionName}`,
        rule: 'missing-required-section',
        suggestion: `Add a ${sectionName} section to the file`,
        isFormatting: false,
        canAutofix: false
      });
    }
  }

  protected validateMarkdownStructure(content: string, filePath: string): void {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockStart = 0;

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check for code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockStart = lineNumber;
        } else {
          inCodeBlock = false;
        }
      }
    });

    // Check for unclosed code blocks
    if (inCodeBlock) {
      this.addIssue({
        file: filePath,
        line: codeBlockStart,
        severity: 'error',
        message: 'Unclosed code block',
        rule: 'unclosed-code-block',
        suggestion: 'Add closing ``` to end the code block',
        isFormatting: true,
        canAutofix: true
      });
    }
  }

  protected normalizeIssueReference(ref: string): string {
    // Normalize various issue reference formats to #N
    const match = ref.match(/(?:issue\s*)?#?(\d+)/i);
    return match !== null ? `#${match[1]}` : ref;
  }
}