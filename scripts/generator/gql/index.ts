import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import _ from 'lodash';

import { getFiles } from '../helper';
import { sourceDir } from './helper';
import { generate } from './runner';

const command = new Command();
command.argument('[name]');
command.option('-f, --force', 'Replace existing file.').action((name) => {
  const options = command.opts();
  const force = _.get(options, 'force');

  const entities = getFiles(sourceDir, 'entity.ts');

  if (!name) {
    inquirer
      .prompt([{ type: 'list', name: 'filename', message: 'Select entity file:', choices: ['All', ...entities] }])
      .then(({ filename }) => {
        if (filename === 'All') {
          entities.map((path) => generate(path, force));
        } else {
          generate(filename, force);
        }
      });
  } else {
    let path = name;
    let valid = false;
    if (!valid && _.includes(entities, path)) valid = true;
    path += '.ts';
    if (!valid && _.includes(entities, path)) valid = true;

    if (valid) {
      generate(path, force);
    } else {
      console.log(chalk.bgRed('Error'), `${chalk.yellow(`${name}`)} not exists.`);
    }
  }
});
command.parse();
