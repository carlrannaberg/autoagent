export class OutputParser {
  static extractJsonOutput(output: string): any {
    try {
      // First try to parse the entire output as JSON
      const trimmed = output.trim();
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        return JSON.parse(trimmed);
      }
      
      // Try to find JSON in the output, handling potential wrapper text
      const lines = output.split('\n');
      let jsonStr = '';
      let inJson = false;
      let braceCount = 0;
      let bracketCount = 0;
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (!inJson && (trimmedLine.startsWith('[') || trimmedLine.startsWith('{'))) {
          inJson = true;
        }
        
        if (inJson) {
          jsonStr += line + '\n';
          
          // Count braces and brackets to handle nested JSON
          for (const char of line) {
            if (char === '{') { braceCount++; }
            if (char === '}') { braceCount--; }
            if (char === '[') { bracketCount++; }
            if (char === ']') { bracketCount--; }
          }
          
          // Check if we've closed all braces/brackets
          if (braceCount === 0 && bracketCount === 0 && jsonStr.trim().length > 0) {
            break;
          }
        }
      }
      
      if (jsonStr.trim()) {
        return JSON.parse(jsonStr.trim());
      }
      
      // Fallback to extractJson method
      return this.extractJson(output);
    } catch (error) {
      return null;
    }
  }
  
  static containsSuccess(output: string): boolean {
    return output.toLowerCase().includes('success') || 
           output.includes('✓') || 
           output.includes('completed');
  }

  static containsError(output: string): boolean {
    return output.toLowerCase().includes('error') || 
           output.toLowerCase().includes('failed') ||
           output.includes('✗');
  }

  static extractStatusCounts(output: string): { 
    pending: number; 
    in_progress: number; 
    completed: number; 
    failed: number;
    total: number;
  } {
    const counts = {
      pending: 0,
      in_progress: 0,
      completed: 0,
      failed: 0,
      total: 0
    };

    // Try to match various status count formats
    const pendingMatch = output.match(/pending:\s*(\d+)/i);
    const inProgressMatch = output.match(/in[\s-]?progress:\s*(\d+)/i);
    const completedMatch = output.match(/completed:\s*(\d+)/i);
    const failedMatch = output.match(/failed:\s*(\d+)/i);
    const totalMatch = output.match(/total:\s*(\d+)/i);

    if (pendingMatch) {counts.pending = parseInt(pendingMatch[1], 10);}
    if (inProgressMatch) {counts.in_progress = parseInt(inProgressMatch[1], 10);}
    if (completedMatch) {counts.completed = parseInt(completedMatch[1], 10);}
    if (failedMatch) {counts.failed = parseInt(failedMatch[1], 10);}
    if (totalMatch) {
      counts.total = parseInt(totalMatch[1], 10);
    } else {
      counts.total = counts.pending + counts.in_progress + counts.completed + counts.failed;
    }

    return counts;
  }

  static extractJson<T>(output: string): T | null {
    try {
      // Try to find JSON in the output
      const jsonMatch = output.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch {
      return null;
    }
  }

  static extractTable(output: string): string[][] {
    const lines = output.split('\n');
    const table: string[][] = [];
    
    for (const line of lines) {
      // Skip separator lines and empty lines
      if (line.trim() === '' || /^[─┌┐└┘├┤┬┴┼]+$/.test(line.trim())) {
        continue;
      }
      
      // Extract table cells (assumes pipe-separated)
      if (line.includes('│') || line.includes('|')) {
        const cells = line
          .split(/[│|]/)
          .map(cell => cell.trim())
          .filter(cell => cell !== '');
        
        if (cells.length > 0) {
          table.push(cells);
        }
      }
    }
    
    return table;
  }

  static extractTableData(output: string): string[][] {
    return this.extractTable(output);
  }

  static extractLines(output: string): string[] {
    return output.split('\n').filter(line => line.trim() !== '');
  }

  static extractProgress(output: string): number[] {
    const progress: number[] = [];
    const lines = output.split('\n');
    
    for (const line of lines) {
      // Match various progress patterns like "1/5", "[1/5]", "Progress: 1/5", etc.
      const match = line.match(/(\d+)\s*\/\s*(\d+)/);
      if (match) {
        const current = parseInt(match[1], 10);
        progress.push(current);
      }
    }
    
    return progress;
  }
}