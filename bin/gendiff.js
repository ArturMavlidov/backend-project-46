#!/usr/bin/env node
import { Command } from 'commander';
import { compareFiles } from '../src/gendiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('filepath1 filepath2')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(() => {
    const [filepath1, filepath2] = program.args;

    console.log(compareFiles(filepath1, filepath2, program.opts().format));
  });

program.parse();
