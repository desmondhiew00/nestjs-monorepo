import { execSync } from 'child_process';
import fs from 'fs';

const rootPath = `${__dirname}/../..`;

// Helper Functions

const removeFiles = (path: string) => {
  fs.readdirSync(path).forEach((dir) => {
    const isDir = fs.lstatSync(`${path}/${dir}`).isDirectory();
    if (isDir) {
      fs.rmdirSync(`${path}/${dir}`, { recursive: true });
    } else {
      fs.unlinkSync(`${path}/${dir}`);
    }
  });
};

/* --------------------- Remove migration and seed files -------------------- */

const migrationsPath = `${rootPath}/typeorm/migrations`;
const seedsPath = `${rootPath}/typeorm/seeds`;

removeFiles(migrationsPath);
removeFiles(seedsPath);

/* -------------------------- Remove monorepo apps -------------------------- */

const appsPath = `${rootPath}/apps`;
removeFiles(appsPath);

// Remove apps from nest-cli.json
const nestCliPath = `${rootPath}/nest-cli.json`;
const nestCliValue = JSON.parse(fs.readFileSync(nestCliPath, 'utf8'));
const projects = nestCliValue.projects;

Object.keys(projects).forEach((key) => {
  const value = projects[key];
  if (value.root.includes('apps')) {
    delete projects[key];
  }
});
fs.writeFileSync(nestCliPath, JSON.stringify(nestCliValue, null, 2));

/* ------------------------------ Init database ----------------------------- */
const entitiesPath = `${rootPath}/libs/database/src/entities`;
const enumPath = `${rootPath}/libs/database/src/enums`;
const graphqlPath = `${rootPath}/libs/database/src/graphql`;
const subscriberPath = `${rootPath}/libs/database/src/subscribers`;

removeFiles(entitiesPath);
removeFiles(enumPath);
removeFiles(graphqlPath);
removeFiles(subscriberPath);

// Replace database.module
const databaseModulePath = `${rootPath}/libs/database/src/database.module.ts`;
const databaseModuleTemplate = fs.readFileSync(`${__dirname}/templates/database.module.hbs`, 'utf8');
fs.writeFileSync(databaseModulePath, databaseModuleTemplate);

execSync('yarn generate app app');
execSync('yarn app:init app');
