/* eslint-disable no-console */
import chalk from 'chalk';
import { execSync, spawn } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import inquirer from 'inquirer';
import _ from 'lodash';

const program = new Command();
program.argument('[name]', 'Monorepo app name');
program.option('-w, --watch', 'Run in watch mode (live-reload)');
program.option('-prod, --production', 'Run in production mode (dist/main.js)');
program.action(async (name) => {
  const dirs = fs.readdirSync(__dirname + '/../../apps');
  _.remove(dirs, (d) => d.charAt(0) === '.');
  const options = program.opts();

  let app = name;
  const watchMode = _.get(options, 'watch') === true;
  const prodMode = _.get(options, 'production') === true;

  if (!app) {
    const response = await inquirer.prompt([{ type: 'list', name: 'appName', message: 'Select app:', choices: dirs }]);
    app = response.appName;
  }

  // const envFile = `./env/.${app}.env`;
  // if (!fs.existsSync(envFile)) {
  //   console.log(`${chalk.bgRed.white(' Error ')} ${chalk.yellow(envFile)} not found in env folder.`);
  //   return;
  // }

  if (!_.includes(dirs, app)) {
    console.log(`${chalk.bgRed.white(' Error ')} Cannot find app with name "${app}".`);
    console.log(`Did you mean (${chalk.yellowBright(_.join(dirs, ' | '))})?`);
    return;
  }
  if (prodMode) {
    execSync(`node dist/apps/${app}/main.js`, { stdio: 'inherit' });
  } else {
    spawn(`nest`, ['start', app, watchMode ? '-w' : ''], { stdio: 'inherit' });
  }
});

program.parse();
