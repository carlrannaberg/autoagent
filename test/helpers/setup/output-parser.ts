export class OutputParser {
  static extractJsonOutput(output: string): any {
    // Try to match JSON array first (to handle arrays containing objects)
    let jsonMatch = output.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Try to match JSON object
    jsonMatch = output.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('No JSON output found');
  }

  static extractLines(output: string): string[] {
    return output.split('\n').filter((line) => line.trim() !== '');
  }

  static containsError(output: string): boolean {
    const errorPatterns = [/error:/i, /failed/i, /exception/i, /❌/, /✗/];
    return errorPatterns.some((pattern) => pattern.test(output));
  }

  static containsSuccess(output: string): boolean {
    const successPatterns = [/success/i, /completed/i, /✓/, /✅/];
    return successPatterns.some((pattern) => pattern.test(output));
  }

  static extractProgress(output: string): number[] {
    const progressPattern = /(\d+)\/(\d+)/g;
    const matches = Array.from(output.matchAll(progressPattern));
    return matches.map((match) => parseInt(match[1], 10));
  }

  static extractTableData(output: string): string[][] {
    const lines = this.extractLines(output);
    const tableLines = lines.filter((line) => line.includes('│'));

    return tableLines.map((line) =>
      line
        .split('│')
        .slice(1, -1)
        .map((cell) => cell.trim())
    );
  }

  static extractStatusCounts(output: string): {
    pending: number;
    running: number;
    completed: number;
    failed: number;
  } {
    const counts = {
      pending: 0,
      running: 0,
      completed: 0,
      failed: 0,
    };

    const pendingMatch = output.match(/pending:\s*(\d+)/i);
    const runningMatch = output.match(/running:\s*(\d+)/i);
    const completedMatch = output.match(/completed:\s*(\d+)/i);
    const failedMatch = output.match(/failed:\s*(\d+)/i);

    if (pendingMatch) {counts.pending = parseInt(pendingMatch[1], 10);}
    if (runningMatch) {counts.running = parseInt(runningMatch[1], 10);}
    if (completedMatch) {counts.completed = parseInt(completedMatch[1], 10);}
    if (failedMatch) {counts.failed = parseInt(failedMatch[1], 10);}

    return counts;
  }

  static stripAnsi(output: string): string {
    // eslint-disable-next-line no-control-regex
    return output.replace(/\u001b\[[0-9;]*m/g, '');
  }
}