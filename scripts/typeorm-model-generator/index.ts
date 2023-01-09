/* eslint-disable no-console */
import { pascalCase } from 'change-case';
import { execSync } from 'child_process';
import fs from 'fs';
import _, { kebabCase } from 'lodash';

import 'dotenv/config';

const output = './libs/database/src';

const run = async () => {
  const orm = `${output}/ormconfig.json`;
  const ts = `${output}/tsconfig.json`;
  const hasOrm = fs.existsSync(orm);
  const hasTs = fs.existsSync(ts);

  const db = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  };

  const customNamingStrategy = './scripts/typeorm-model-generator/naming-strategy.js';
  const dbConfig = `-h ${db.host} -p ${db.port} -d ${db.name} -u ${db.username} -x ${db.password} -e mysql`;
  const command = `yarn typeorm-model-generator ${dbConfig} -o ${output} --namingStrategy ${customNamingStrategy}`;

  execSync(command, { stdio: 'inherit' });

  if (!hasOrm) execSync(`rimraf ${orm}`);
  if (!hasTs) execSync(`rimraf ${ts}`);

  // Remove migration records table
  execSync(`rimraf ${output}/entities/migrations.ts ${output}/entities/seeds.ts`, { stdio: 'inherit' });
  await renameFiles();
  execSync(`yarn lint && yarn format`);
};

const renameFiles = async () => {
  try {
    const sourceDir = `${output}/entities`;
    const filePath = (path: string) => `${sourceDir}/${path}`;

    const parseFilename = (name: string) => {
      let result = name;
      result = result.replace('.entity.ts', '');
      result = result.replace('.ts', '');
      return kebabCase(result) + '.entity.ts';
    };

    // get generated files
    const files: string[] = await new Promise((rs, rj) => {
      fs.readdir(sourceDir, async (err, files) => {
        if (err) return rj(err);
        rs(files);
      });
    });

    const changed: { oldFileName: string; newFileName: string }[] = [];

    // Change file name to *.entity.ts
    await Promise.all(
      files.map(async (oldFileName) => {
        const newFileName = parseFilename(oldFileName);
        if (oldFileName.includes('.entity.ts')) return;
        await new Promise((rs, rj) => {
          fs.rename(filePath(oldFileName), filePath(newFileName), (err) => {
            if (err) return rj(err);
            changed.push({ oldFileName, newFileName });
            rs(null);
          });
        });
      })
    );

    const newFiles = _.map(changed, 'newFileName');

    await Promise.all(
      newFiles.map(async (newFile) => {
        const modelName = pascalCase(newFile.replace('.entity.ts', ''));
        await new Promise((rs, rj) => {
          fs.readFile(filePath(newFile), 'utf8', function (err, data) {
            if (err) rj(err);

            let result = data;

            // Replace codes
            result = result.replace(`@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })`, '');
            result = result.replace(`id: number;`, '');
            result = result.replace(`PrimaryGeneratedColumn,`, '');
            result = result.replace(`, PrimaryGeneratedColumn`, '');
            result = result.replace(`, { schema: "${process.env.DB_NAME}" }`, '');
            result = result.replace('Entity {', 'Entity extends AppBaseEntity {');
            result = result.replace(/RESTRICT/g, 'CASCADE');
            result = result.replace('@Entity', `@ObjectType('${modelName}')\n@Entity`);
            result = result.replace(/@Column/g, `@Field()\n@Column`);

            // Add import codes
            result =
              `
              import { ObjectType, InputType, Field, PartialType } from '@nestjs/graphql';\n
              import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';\n
              import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';\n
              import { AppBaseEntity, AppDtoDecorators, DTORelations } from '../base';\n
              import type { CrudResolverConfig } from '../types';\n
            ` + result;

            // Change import name
            changed.map(async ({ oldFileName, newFileName }) => {
              const oriFilename = oldFileName.replace('.ts', '');
              result = result.replace(`from "./${oriFilename}";`, `from "./${newFileName.replace('.ts', '')}";`);
            });

            // Add DTO codes
            result += `
            \n
            /* ----------------------------------- DTO ---------------------------------- */
            \n
            @InputType()
            export class Create${modelName}Dto {}
            \n
            @InputType()
            export class Update${modelName}Dto extends PartialType(Create${modelName}Dto) {}
            \n
            @DTORelations(() => ${modelName}DTO)\n
            @AppDtoDecorators(() => ${modelName}DTO)\n
            export class ${modelName}DTO extends ${modelName}Entity {}
            `;

            // Add nest gql module code
            result += `
            \n
            export class ${modelName}CrudResolver {
              static forFeature(config?: CrudResolverConfig) {
                const { resolver = {}, imports = [] } = config || {};
                return NestjsQueryGraphQLModule.forFeature({
                  imports: [NestjsQueryTypeOrmModule.forFeature([${modelName}Entity]), ...imports],
                  services: config.services,
                  resolvers: [
                    {
                      DTOClass: ${modelName}DTO,
                      EntityClass: ${modelName}Entity,
                      create: { many: { disabled: true } },
                      update: { many: { disabled: true } },
                      delete: { many: { disabled: true } },
                      ...resolver
                    }
                  ]
                });
              }
            };
            \n
            `;

            fs.writeFile(filePath(newFile), result, 'utf8', function (err) {
              if (err) rj(err);
              rs(null);
            });
          });
        });
      })
    );

    return Promise.resolve(changed);
  } catch (e) {
    return Promise.reject(e);
  }
};

run();
