#!/usr/bin/env node

import { Command } from 'commander';
import { registerConfigCommand } from './commands/config';
import { registerCreateCommand } from './commands/create';
import { registerInitCommand } from './commands/init';
import { registerBootstrapCommand } from './commands/bootstrap';
import { registerCheckCommand } from './commands/check';
import { registerRunCommand } from './commands/run';
import { registerStatusCommand } from './commands/status';
import { registerListCommand } from './commands/list';
import { Logger } from '../utils/logger';
import * as path from 'path';
import * as fs from 'fs';

interface PackageJson {
  version: string;
}

const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson;

// Enable debug mode if DEBUG environment variable is set
if (process.env.DEBUG === 'true' || process.env.DEBUG === '1') {
  Logger.setDebugEnabled(true);
}

const program = new Command();

program
  .name('autoagent')
  .description('Run autonomous AI agents for task execution')
  .version(packageJson.version)
  .exitOverride((err) => {
    // Customize error handling for Commander.js
    if (err.code === 'commander.unknownCommand') {
      // Extract the command name from the error message
      const match = err.message.match(/unknown command '(.+)'/);
      const commandName = match ? match[1] : 'unknown';
      console.error(`Unknown command '${commandName}'`);
      console.error('Run autoagent --help for available commands');
      process.exit(1);
    }
    // Handle help and version display
    if (err.code === 'commander.helpDisplayed' || err.code === 'commander.version') {
      process.exit(0);
    }
    // Re-throw other errors to let Commander handle them
    throw err;
  })
  .configureOutput({
    outputError: (str, write) => {
      // Override error output to ensure it goes to stderr
      write(str);
    }
  });

// Register commands
registerConfigCommand(program);
registerInitCommand(program);
registerRunCommand(program);
registerCreateCommand(program);
registerStatusCommand(program);
registerCheckCommand(program);
registerBootstrapCommand(program);
registerListCommand(program);

// Handle unknown commands
program.on('command:*', () => {
  console.error(`Unknown command '${program.args.join(' ')}'`);
  console.error('Run autoagent --help for available commands');
  process.exit(1);
});

program.parse();