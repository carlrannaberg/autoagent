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
import * as path from 'path';
import * as fs from 'fs';

interface PackageJson {
  version: string;
}

const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson;

const program = new Command();

program
  .name('autoagent')
  .description('Run autonomous AI agents for task execution')
  .version(packageJson.version);

// Register commands
registerConfigCommand(program);
registerInitCommand(program);
registerRunCommand(program);
registerCreateCommand(program);
registerStatusCommand(program);
registerCheckCommand(program);
registerBootstrapCommand(program);
registerListCommand(program);

program.parse();