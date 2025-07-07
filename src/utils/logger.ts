import * as chalk from 'chalk';

export type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'debug'

export interface LoggerOptions {
  prefix?: string;
  timestamp?: boolean;
  debugEnabled?: boolean;
}

export class Logger {
  private static debugEnabled = false;
  private static defaultOptions: LoggerOptions = {
    timestamp: false,
    debugEnabled: false,
  };

  static setDebugEnabled(enabled: boolean): void {
    Logger.debugEnabled = enabled;
  }

  static setDefaultOptions(options: LoggerOptions): void {
    Logger.defaultOptions = { ...Logger.defaultOptions, ...options };
  }

  private static formatMessage(message: string, options?: LoggerOptions): string {
    const opts = { ...Logger.defaultOptions, ...options };
    let formatted = message;

    if (opts.prefix !== undefined && opts.prefix !== '') {
      formatted = `[${opts.prefix}] ${formatted}`;
    }

    if (opts.timestamp === true) {
      const timestamp = new Date().toISOString();
      formatted = `[${timestamp}] ${formatted}`;
    }

    return formatted;
  }

  static info(message: string, options?: LoggerOptions): void {
    console.log(chalk.blue(Logger.formatMessage(message, options)));
  }

  static success(message: string, options?: LoggerOptions): void {
    console.log(chalk.green(`✓ ${Logger.formatMessage(message, options)}`));
  }

  static warning(message: string, options?: LoggerOptions): void {
    console.log(chalk.yellow(`⚠ ${Logger.formatMessage(message, options)}`));
  }

  static error(message: string | Error, options?: LoggerOptions): void {
    const errorMessage = message instanceof Error ? message.message : message;
    console.error(chalk.red(`Error: ${Logger.formatMessage(errorMessage, options)}`));
    
    if (message instanceof Error && Logger.debugEnabled) {
      console.error(chalk.gray(`Stack trace: ${message.stack ?? ''}`));
    }
  }

  static debug(message: string, options?: LoggerOptions): void {
    const debugOptions = { ...options, debugEnabled: options?.debugEnabled ?? Logger.debugEnabled };
    if (debugOptions.debugEnabled === true || Logger.defaultOptions.debugEnabled === true) {
      console.log(chalk.gray(`[DEBUG] ${Logger.formatMessage(message, options)}`));
    }
  }

  static progress(message: string, current: number, total: number, options?: LoggerOptions): void {
    const percentage = Math.round((current / total) * 100);
    const progressBar = Logger.createProgressBar(percentage);
    console.log(chalk.cyan(`${progressBar} ${percentage}% - ${Logger.formatMessage(message, options)}`));
  }

  private static createProgressBar(percentage: number, width = 20): string {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    return `[${chalk.green('█'.repeat(filled))}${chalk.gray('░'.repeat(empty))}]`;
  }

  static clear(): void {
    process.stdout.write('\x1Bc');
  }

  static newline(): void {
    console.log();
  }
}