import chalk from 'chalk';
import { capitalCase } from 'change-case';
import path from 'path';

interface Options {
  swaggerPath?: string;
  gqlPlaygroundPath?: string;
  microservice?: boolean;
}
export const printNestApplicationDetails = (port: number, options?: Options) => {
  const { swaggerPath, gqlPlaygroundPath, microservice } = options || {};
  const appName = capitalCase(path.basename(__dirname));
  const url = `http://localhost:` + port;
  const swaggerUrl = swaggerPath ? `${url}${formatDir(swaggerPath)}` : null;
  const gqlPlaygroundUrl = gqlPlaygroundPath ? `${url}${formatDir(gqlPlaygroundPath)}` : null;

  /* eslint-disable no-console*/
  console.log('\n');
  console.log(`--------------------------- [${title(appName)}] --------------------------`);
  console.log(`${chalk.cyanBright(microservice ? `[Microservice]` : `[Application]`)} listening at ${logUrl(url)}`);
  if (swaggerUrl) {
    console.log(`${chalk.greenBright('[Swagger]')} listening at ${logUrl(swaggerUrl)}`);
  }
  if (gqlPlaygroundUrl) {
    console.log(`${chalk.magentaBright('[GraphQL Playground]')} listening at ${logUrl(gqlPlaygroundUrl)}`);
  }
  /* eslint-enable */
};

/* ---------------------------- Helper Functions ---------------------------- */

const title = (val: string) => chalk.bold.cyanBright(val);
const logUrl = (val: string) => chalk.underline.greenBright(val);

const formatDir = (val: string) => {
  if (val.charAt(0) === '/') return val;
  return '/' + val;
};
