/* eslint-disable @typescript-eslint/ban-ts-comment */
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as path from 'path';
import * as pluralize from 'pluralize';
import * as signale from 'signale';
import { Project, ts } from 'ts-morph';
import { camelCase, pascalCase } from '../../../libs/core/src/utils/case-anything';
import { generateFiles } from './core/generate-files';
import { formatFiles, getDirectories, tree } from './core/helper';

void (async () => {
  const args = process.argv.slice(2);
  const forceMode = args.includes('--force');

  const { withCrud, withAuth } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'withCrud',
      message: 'Do you want to generate CRUD operations?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'withAuth',
      message: 'Do you want to add authentication?',
      default: true,
    },
  ]) as { withCrud: boolean; withAuth: boolean };

  const apps = await getDirectories('apps', []);
  let models = await getDirectories('generated/graphql', ['prisma']);

  const { appName } = await inquirer.prompt({
    type: 'list',
    name: 'appName',
    choices: apps,
    // @ts-ignore
    message: 'Select which app to generate the graphql queries for:',
  }) as { appName: string };

  const { targetModel } = await inquirer.prompt({
    type: 'list',
    name: 'targetModel',
    choices: [...models, 'All'],
    // @ts-ignore
    message: 'Which model do you want to generate the graphql queries for:',
  }) as { targetModel: string };

  signale.start(`Generating graphql queries for ${chalk.green(targetModel)} in ${chalk.blue(appName)}`);
  signale.info(`Selected model: ${chalk.green(targetModel)}`);

  const gqlImportSrc = 'generated/graphql';
  const prismaClientImportSrc = '@app/prisma';
  const projectRoot = `apps/${appName}`;
  const targetDir = path.join(projectRoot, 'src/modules');
  const templateDir = path.join(__dirname, 'templates/codegen-module');
  const appModulePath = path.join(projectRoot, `src/${appName}.module.ts`);

  // Generate module, resolver and service
  if (targetModel !== 'All') {
    models = [targetModel];
  }
  if (forceMode) {
    const { confirm } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      // @ts-ignore
      message:
        'Generate graphql queries for all models with --force option will replace all existing files. Are you sure?',
    }) as { confirm: boolean };
    if (!confirm) {
      signale.error('Cancelled');
      return;
    }
  }

  await Promise.all(
    models.map((modelName) => {
      if (!forceMode) {
        const checkIsExists = tree.exists(`${targetDir}/${modelName}`);
        if (checkIsExists) {
          signale.warn(`Module for ${chalk.green(modelName)} already exists. Skipping...`);
          return;
        }
      }

      const fileData = {
        modelName,
        gqlImportSrc,
        prismaClientImportSrc,
        withAuth,
        withCrud,
        camelCase,
        pascalCase,
        plural: (val: string) => pluralize.plural(camelCase(val)),
        singular: (val: string) => pluralize.singular(camelCase(val)),
      };
      generateFiles(templateDir, targetDir, fileData);
    }),
  );

  // Update app.module.ts (imports and module registration)

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(appModulePath);
  if (!sourceFile) {
    signale.error(`Could not find ${chalk.blue(appModulePath)}`);
    return;
  }

  const nestModuleName = `${pascalCase(camelCase(appName))}Module`;
  const moduleDecorator = sourceFile.getClass(nestModuleName)?.getDecorator('Module');
  if (!moduleDecorator) {
    signale.error(`Could not find ${chalk.blue(nestModuleName)} decorator in ${chalk.blue(appModulePath)}`);
    return;
  }

  // @ts-expect-error
  const importsProperty = moduleDecorator
    .getArguments()[0]
    .asKind(ts.SyntaxKind.ObjectLiteralExpression)
    .getProperty('imports')
    .getChildrenOfKind(ts.SyntaxKind.ArrayLiteralExpression)[0];

  models.map((modelName) => {
    const moduleName = `${pascalCase(modelName)}Module`;
    sourceFile.getImportDeclaration(`./modules/${modelName}/${modelName}.module`)?.remove();
    sourceFile.addImportDeclaration({
      moduleSpecifier: `./modules/${modelName}/${modelName}.module`,
      namedImports: [moduleName],
    });

    let duplicatedIndex = null;
    importsProperty.getElements().map((element, index) => {
      if (moduleName === element.getFullText().trim()) {
        duplicatedIndex = index;
      }
    });
    if (duplicatedIndex !== null) importsProperty.removeElement(duplicatedIndex);
    importsProperty.addElement(`${pascalCase(modelName)}Module`);
  });

  tree.write(appModulePath, sourceFile.getFullText());
  formatFiles(appModulePath);
})();
