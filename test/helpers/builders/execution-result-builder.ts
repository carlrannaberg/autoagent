import { ExecutionResult, ProviderName } from '../../../src/types';

export class ExecutionResultBuilder {
  private result: Partial<ExecutionResult> = {
    success: true,
    issueNumber: 1,
    duration: 1000,
    provider: 'claude'
  };

  withSuccess(success: boolean): this {
    this.result.success = success;
    return this;
  }

  withIssueNumber(number: number): this {
    this.result.issueNumber = number;
    return this;
  }

  withDuration(duration: number): this {
    this.result.duration = duration;
    return this;
  }

  withProvider(provider: ProviderName): this {
    this.result.provider = provider;
    return this;
  }

  withResult(result: string): this {
    this.result.result = result;
    return this;
  }

  withOutput(output: string): this {
    this.result.output = output;
    return this;
  }

  withError(error: string): this {
    this.result.error = error;
    this.result.success = false;
    return this;
  }

  withTokensUsed(tokens: number): this {
    this.result.tokensUsed = tokens;
    return this;
  }

  withFilesModified(files: string[]): this {
    this.result.filesModified = files;
    return this;
  }

  withIssueTitle(title: string): this {
    this.result.issueTitle = title;
    return this;
  }

  withExecutionTime(time: number): this {
    this.result.executionTime = time;
    return this;
  }

  withRollbackData(data: any): this {
    this.result.rollbackData = data;
    return this;
  }

  build(): ExecutionResult {
    return this.result as ExecutionResult;
  }

  static success(): ExecutionResult {
    return new ExecutionResultBuilder()
      .withSuccess(true)
      .withIssueNumber(1)
      .withDuration(1500)
      .withProvider('claude')
      .withResult('Task completed successfully')
      .withOutput('Generated code and fixed the issue')
      .withTokensUsed(500)
      .withFilesModified(['src/index.ts', 'src/utils.ts'])
      .build();
  }

  static failure(): ExecutionResult {
    return new ExecutionResultBuilder()
      .withSuccess(false)
      .withIssueNumber(2)
      .withDuration(500)
      .withProvider('gemini')
      .withError('Provider rate limit exceeded')
      .build();
  }

  static timeout(): ExecutionResult {
    return new ExecutionResultBuilder()
      .withSuccess(false)
      .withIssueNumber(3)
      .withDuration(30000)
      .withProvider('claude')
      .withError('Execution timeout after 30 seconds')
      .build();
  }

  static withFilesChanged(files: string[]): ExecutionResult {
    return new ExecutionResultBuilder()
      .withSuccess(true)
      .withIssueNumber(4)
      .withDuration(2000)
      .withProvider('mock')
      .withResult('Modified multiple files')
      .withFilesModified(files)
      .withTokensUsed(1000)
      .build();
  }

  static batch(count: number, successRate: number = 1.0): ExecutionResult[] {
    const results: ExecutionResult[] = [];
    
    for (let i = 0; i < count; i++) {
      const shouldSucceed = Math.random() < successRate;
      
      if (shouldSucceed) {
        results.push(
          new ExecutionResultBuilder()
            .withSuccess(true)
            .withIssueNumber(i + 1)
            .withDuration(Math.floor(Math.random() * 3000) + 500)
            .withProvider(['claude', 'gemini', 'mock'][i % 3] as ProviderName)
            .withResult(`Issue ${i + 1} completed`)
            .withTokensUsed(Math.floor(Math.random() * 1000) + 100)
            .build()
        );
      } else {
        results.push(
          new ExecutionResultBuilder()
            .withSuccess(false)
            .withIssueNumber(i + 1)
            .withDuration(Math.floor(Math.random() * 1000) + 100)
            .withProvider(['claude', 'gemini', 'mock'][i % 3] as ProviderName)
            .withError(`Failed to process issue ${i + 1}`)
            .build()
        );
      }
    }
    
    return results;
  }
}