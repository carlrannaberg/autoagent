#!/usr/bin/env node
import { Command } from 'commander';
import { VERSION } from '../index';

const program = new Command();

program
  .name('autoagent')
  .description('Run autonomous AI agents using Claude or Gemini')
  .version(VERSION);

program.parse(process.argv);