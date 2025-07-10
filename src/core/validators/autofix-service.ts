import { readFile, writeFile } from 'fs/promises';
import { ValidationIssue } from './validation-error.js';
import { spawn } from 'child_process';

export interface AutofixResult {
  success: boolean;
  fixedIssues: ValidationIssue[];
  failedIssues: ValidationIssue[];
  error?: Error;
}

export class AutofixService {
  constructor(
    private provider: 'claude' | 'gemini' = 'claude',
    private model?: string
  ) {}

  async fixValidationIssues(issues: ValidationIssue[]): Promise<AutofixResult> {
    // Filter only formatting issues that can be autofixed
    const fixableIssues = issues.filter(issue => 
      issue.isFormatting === true && issue.canAutofix === true
    );

    if (fixableIssues.length === 0) {
      return {
        success: true,
        fixedIssues: [],
        failedIssues: []
      };
    }

    // Group issues by file
    const issuesByFile = new Map<string, ValidationIssue[]>();
    fixableIssues.forEach(issue => {
      const fileIssues = issuesByFile.get(issue.file) ?? [];
      fileIssues.push(issue);
      issuesByFile.set(issue.file, fileIssues);
    });

    const fixedIssues: ValidationIssue[] = [];
    const failedIssues: ValidationIssue[] = [];

    // Fix each file
    for (const [filePath, fileIssues] of issuesByFile) {
      try {
        const fixed = await this.fixFile(filePath, fileIssues);
        if (fixed) {
          fixedIssues.push(...fileIssues);
        } else {
          failedIssues.push(...fileIssues);
        }
      } catch (error) {
        failedIssues.push(...fileIssues);
      }
    }

    return {
      success: failedIssues.length === 0,
      fixedIssues,
      failedIssues
    };
  }

  private async fixFile(filePath: string, issues: ValidationIssue[]): Promise<boolean> {
    try {
      const content = await readFile(filePath, 'utf-8');
      const prompt = this.buildFixPrompt(filePath, content, issues);
      
      // Call the AI provider to fix the issues
      const fixedContent = await this.callProvider(prompt);
      
      if (fixedContent !== null && fixedContent !== content) {
        await writeFile(filePath, fixedContent, 'utf-8');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Failed to fix ${filePath}:`, error);
      return false;
    }
  }

  private buildFixPrompt(filePath: string, content: string, issues: ValidationIssue[]): string {
    const issueDescriptions = issues.map(issue => {
      let desc = `- Line ${issue.line ?? 'N/A'}: ${issue.message}`;
      if (issue.suggestion !== undefined && issue.suggestion !== '') {
        desc += ` (Suggestion: ${issue.suggestion})`;
      }
      return desc;
    }).join('\n');

    return `Fix the following formatting issues in ${filePath}:

${issueDescriptions}

Current content:
\`\`\`
${content}
\`\`\`

Provide ONLY the fixed content without any explanation. The output should be the complete file content with all formatting issues fixed.`;
  }

  private async callProvider(prompt: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const args = ['-p', prompt];
      
      if (this.model !== undefined) {
        args.push('--model', this.model);
      }
      
      // Add non-interactive flags
      args.push('--dangerously-skip-permissions');
      
      const child = spawn(this.provider, args, {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env }
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      child.on('error', (error: Error) => {
        reject(error);
      });

      child.on('close', (code: number | null) => {
        if (code === 0) {
          // Clean the output - remove any markdown code blocks
          const cleaned = this.cleanProviderOutput(stdout);
          resolve(cleaned);
        } else {
          reject(new Error(`Provider exited with code ${code}: ${stderr}`));
        }
      });
    });
  }

  private cleanProviderOutput(output: string): string {
    // Remove markdown code blocks if present
    const codeBlockPattern = /^```[^\n]*\n([\s\S]*?)\n```$/;
    const match = output.trim().match(codeBlockPattern);
    
    if (match !== null && match[1] !== undefined) {
      return match[1];
    }
    
    return output.trim();
  }
}