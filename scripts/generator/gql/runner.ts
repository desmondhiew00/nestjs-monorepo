/* eslint-disable no-console */
import { execSync } from 'child_process';
import fs from 'fs';
import handlebars from 'handlebars';
import _ from 'lodash';

import { createDirectory, writeFile } from '../helper';
import { getVariablesFromSourceFile } from './helper';

const destinationDir = 'libs/database/src/graphql';
const dtoTemplatePath = 'scripts/generator/gql/templates/dto.template.hbs';
const serviceTemplatePath = 'scripts/generator/gql/templates/service.template.hbs';
const moduleTemplatePath = 'scripts/generator/gql/templates/module.template.hbs';

export const generate = async (sourceFile: string, force?: boolean) => {
  const filename = sourceFile.split('.')[0];
  const sourceFileName = sourceFile.replace('.ts', '');

  const outputDir = `${destinationDir}/${filename}`;
  const dtoFilePath = `${outputDir}/${filename}.dto.ts`;
  const serviceFilePath = `${outputDir}/${filename}.service.ts`;
  const moduleFilePath = `${outputDir}/${filename}.module.ts`;
  const indexFilePath = `${outputDir}/index.ts`;

  createDirectory(destinationDir);
  createDirectory(outputDir);

  /* ------------------------- Generate handlebar data ------------------------ */

  const result = getVariablesFromSourceFile(sourceFile);
  const enums = _.sortBy(result.enums);
  const enumImport = _.join(enums, ', ');

  let relationsImport = _.map(result.relations, (r) => {
    const name = r.type.replace('Entity', 'DTO').replace('[]', '');
    if (name === `${result.moduleName}DTO`) return {};
    const file = _.kebabCase(name.replace('DTO', ''));
    const path = file + '.dto';
    return { name, path, file };
  });
  _.remove(relationsImport, _.isEmpty);
  relationsImport = _.uniqBy(relationsImport, 'name');
  relationsImport = _.sortBy(relationsImport, ['name']);

  const handlebarData = {
    filename,
    sourceFileName,
    ...result,
    enumImport,
    relationsImport,
    hasId: result.hasId,
    hasTimestamp: result.hasBaseEntity,
    hasRecorder: result.hasBaseEntity
  };

  /* -------------------------- Generate file content ------------------------- */
  const dtoTemplateFile = fs.readFileSync(dtoTemplatePath, 'utf-8');
  const serviceTemplateFile = fs.readFileSync(serviceTemplatePath, 'utf-8');
  const moduleTemplateFile = fs.readFileSync(moduleTemplatePath, 'utf-8');

  const dtoTemplate = handlebars.compile(dtoTemplateFile, { noEscape: true });
  const serviceTemplate = handlebars.compile(serviceTemplateFile, { noEscape: true });
  const moduleTemplate = handlebars.compile(moduleTemplateFile, { noEscape: true });

  let dtoFileContent = dtoTemplate(handlebarData);
  const serviceFileContent = serviceTemplate(handlebarData);
  const moduleFileContent = moduleTemplate(handlebarData);
  const indexFileContent = `export * from './${filename}.dto';\nexport * from './${filename}.module';\n`;

  /* --------------------------- Parse file content --------------------------- */

  if (!dtoFileContent.includes('@GqlHasOne')) {
    dtoFileContent = dtoFileContent.replace(', GqlHasOne', '');
  }
  if (!dtoFileContent.includes('@GqlHasManyUnpaged')) {
    dtoFileContent = dtoFileContent.replace(', GqlHasManyUnpaged', '');
  }
  if (!dtoFileContent.includes('() => GraphQLISODateTime')) {
    dtoFileContent = dtoFileContent.replace(', GraphQLISODateTime', '');
  }
  if (!dtoFileContent.includes('@IDField(() => Int)')) {
    dtoFileContent = dtoFileContent.replace(', Int', '');
    dtoFileContent = dtoFileContent.replace(', IDField', '');
  }

  /* --------------------------- Write file to disk --------------------------- */

  await writeFile(dtoFilePath, dtoFileContent, force);
  await writeFile(serviceFilePath, serviceFileContent, force);
  await writeFile(moduleFilePath, moduleFileContent, force);
  await writeFile(indexFilePath, indexFileContent, force);

  execSync(`yarn barrels && yarn eslint --fix libs/database/src/graphql/index.ts`);
};

export default generate;
