import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import _ from 'lodash';

const program = new Command();
program.argument('<app>', 'Monorepo app name. Exp: admin');
program.action((app) => {
  const dirs = fs.readdirSync(__dirname + '/../../apps');
  if (!_.includes(dirs, app)) {
    /* eslint-disable no-console */
    console.log(`${chalk.bgRed.white(' Error ')} Cannot find app with name "${app}".`);
    console.log(`Did you mean (${chalk.yellowBright(_.join(dirs, ' | '))})?`);
    /* eslint-enable no-console */
    return;
  }
  execSync(`rimraf ./dist/apps/${app}`, { stdio: 'inherit' });
  execSync(`nest build ${app}`, { stdio: 'inherit' });
});
program.parse();
