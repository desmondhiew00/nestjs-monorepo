import { execSync } from 'child_process';
import * as color from 'colorette';
import _ from 'lodash';

const run = () => {
  try {
    const args = process.argv;
    args.splice(0, 2);

    const schematic = _.get(args, '0') || '';
    const name = _.get(args, '1') || '';

    args.splice(0, 2);
    const options = _.join(args, ' ');
    let path = '';

    if (!schematic) throw new Error("missing required argument 'schematic'");

    _.map(customPath, (values, dir) => {
      if (_.includes(values, schematic)) {
        path = dir;
      }
    });

    if (path && !name) throw new Error("missing required argument 'name'");

    const command = `nest generate --no-spec ${options} ${schematic} ${name} ${path} && yarn lint`;
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    /* eslint-disable no-console */
    console.log(`\n`);
    console.log(`${log.errorTag} ${e.message}`);
    console.log(log.usage);
    console.log(`Reference: ${log.url('https://docs.nestjs.com/cli/usages#nest-generate')}`);
    console.log(`\n`);
    /* eslint-enable no-console */
  }
};

const usageExp = 'generate <schematic> [name] [options]';

const log = {
  errorTag: color.bgRed(color.white(`  Error  `)),
  url: (val: string) => color.underline(color.yellow(val)),
  usage: `Usage: ${color.greenBright(usageExp)}`
};

const customPath = {
  modules: [
    'module',
    'mo',
    'resolver',
    'r',
    'resource',
    'res',
    'service',
    's',
    'provider',
    'pr',
    'gateway',
    'ga',
    'filter',
    'f',
    'controller',
    'co',
    'class',
    'cl'
  ],
  types: ['interface', 'itf'],
  decorators: ['decorator', 'd'],
  guards: ['guard', 'gu'],
  middlewares: ['middleware', 'mi'],
  pipes: ['pipe', 'pi'],
  interceptors: ['interceptor', 'itc']
};

run();
