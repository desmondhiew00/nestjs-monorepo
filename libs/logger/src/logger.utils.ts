import { capitalCase } from 'change-case';
import { bold, cyanBright, greenBright, magentaBright, underline } from 'colorette';
import path from 'path';

interface Options {
  swaggerPath?: string;
  gqlPlaygroundPath?: string;
}
export const printNestApplicationDetails = (port: number, options?: Options) => {
  const { swaggerPath, gqlPlaygroundPath } = options || {};
  const appName = capitalCase(path.basename(__dirname));
  const url = `http://localhost:` + port;
  const swaggerUrl = swaggerPath ? `${url}${formatDir(swaggerPath)}` : null;
  const gqlPlaygroundUrl = gqlPlaygroundPath ? `${url}${formatDir(gqlPlaygroundPath)}` : null;

  /* eslint-disable no-console*/
  console.log('\n');
  console.log(`--------------------------- [${title(appName)}] --------------------------`);
  console.log(`${cyanBright(`[Application]`)} listening at ${logUrl(url)}`);
  if (swaggerUrl) {
    console.log(`${greenBright('[Swagger]')} listening at ${logUrl(swaggerUrl)}`);
  }
  if (gqlPlaygroundUrl) {
    console.log(`${magentaBright('[GraphQL Playground]')} listening at ${logUrl(gqlPlaygroundUrl)}`);
  }
  /* eslint-enable */
};

/* ---------------------------- Helper Functions ---------------------------- */

const title = (val: string) => bold(cyanBright(val));
const logUrl = (val: string) => underline(greenBright(val));

const formatDir = (val: string) => {
  if (val.charAt(0) === '/') return val;
  return '/' + val;
};
