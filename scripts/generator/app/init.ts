/* eslint-disable no-console */

import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import inquirer from 'inquirer';
import _ from 'lodash';

import {
  getDirectories,
  handlebarCompile,
  insertToLine,
  removeLineFromFile,
  replaceStringFromFile,
  writeFile
} from '../helper';

export const sourceDir = 'apps/';

const modules = [
  {
    impt: `import ConfigModule from 'configs/env-config';\n`,
    apply: "ConfigModule.forRoot(['jwt-auth']),"
  },
  { impt: `import { LoggerModule } from '@lib/logger';\n`, apply: 'LoggerModule.forRoot(),' },
  { impt: `import { DatabaseModule } from '@db';\n`, apply: 'DatabaseModule.forRoot(),' },
  { impt: `import { GqlModule } from '@utils/core/gql';\n`, apply: 'GqlModule.forRoot(),' }
];
modules.reverse();

const files = (app: string) => {
  const sourcePath = `apps/${app}/src/`;
  const templateSource = `scripts/generator/app/templates`;
  return [
    { template: `${templateSource}/jwt.strategy.hbs`, output: `${sourcePath}/modules/auth/strategies/jwt.strategy.ts` },
    { template: `${templateSource}/auth.decorator.hbs`, output: `${sourcePath}/decorators/auth.decorator.ts` },
    { template: `${templateSource}/auth.guard.hbs`, output: `${sourcePath}/guards/auth.guard.ts` },
    { template: `${templateSource}/jwt.config.hbs`, output: `${sourcePath}/configs/jwt.config.ts` },
    { template: `${templateSource}/types.hbs`, output: `${sourcePath}/types/index.ts` }
  ];
};

const run = async (app: string, force: boolean) => {
  const templateData = { APP: app };

  /* -------------------------------- tsconfig -------------------------------- */
  const tsResolver = `"@${app}/*": ["apps/${app}/src/*"],`;
  await insertToLine('tsconfig.json', '      ' + tsResolver, `"paths": {`, tsResolver);

  /* --------------------------------- main.ts -------------------------------- */
  const mainTs = `apps/${app}/src/main.ts`;
  const importInit = `import '@utils/core/dayjs';\nimport initApplication from '@utils/core/app';`;
  const init = `  initApplication(app, {
    port: Number(process.env.${_.upperCase(app)}_PORT) || 4000,
    apiPrefix: 'api',
    swaggerConfig: { title: '${_.startCase(app)} App API' }
  });`;
  await insertToLine(mainTs, importInit, '@nestjs/core', 'import initApplication');
  await insertToLine(mainTs, init, 'NestFactory.create', 'initApplication(app');
  removeLineFromFile(mainTs, `await app.listen`);

  /* -------------------------------- module.ts ------------------------------- */
  const moduleFilePath = `apps/${app}/src/${app}.module.ts`;
  await replaceStringFromFile(moduleFilePath, 'imports: [', 'imports: [\n');

  for (let i = 0; i < modules.length; i++) {
    const { impt, apply } = modules[i];
    await insertToLine(moduleFilePath, impt, 1, impt);
    if (apply) await insertToLine(moduleFilePath, apply, 'imports: [', apply);
  }
  execSync(`yarn eslint --fix ${moduleFilePath}`, { stdio: 'inherit' });

  /* ---------------------------------- files --------------------------------- */
  const newFiles = files(app);
  await Promise.all(
    newFiles.map(async ({ output, template }) => {
      const content = handlebarCompile(template, templateData);
      await writeFile(output, content, force);
    })
  );
};

const command = new Command();
command.argument('[name]');
command.option('-f, --force', 'Replace existing file.').action((name) => {
  const options = command.opts();
  const force = _.get(options, 'force');
  const apps = getDirectories(sourceDir);

  if (!name) {
    inquirer.prompt([{ type: 'list', name: 'filename', message: 'Select app', choices: apps }]).then(({ filename }) => {
      run(filename, force);
    });
  } else {
    const path = name;
    let valid = false;
    if (!valid && _.includes(apps, path)) valid = true;
    if (valid) {
      run(path, force);
    } else {
      console.log(chalk.bgRed('Error'), `app ${chalk.yellow(`${name}`)} not exists.`);
    }
  }
});
command.parse();
