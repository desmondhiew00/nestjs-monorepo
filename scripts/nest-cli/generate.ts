import { execSync } from 'child_process';
import { Command } from 'commander';
import inquirer from 'inquirer';
import _ from 'lodash';

const prePath = {
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

class GenerateCommand {
  public load(program: Command) {
    // .command('generate <schematic> [name] [path]')
    program
      .argument('<schematic>')
      .argument('[name]')
      .option('-d, --dry-run', 'Report actions that would be taken without writing out results.')
      .option('-p, --project [project]', 'Project in which to generate files.')
      .option('--spec', 'Enforce spec files generation.', false)
      .action(async (schematic: string, name: string) => {
        let moduleName = name;
        if (!moduleName) {
          const response = await inquirer.prompt([
            { type: 'input', name: 'answer', message: `What name would you like to use for the ${schematic}?` }
          ]);
          moduleName = response.answer;
        }
        if (!moduleName) return;

        const command = program.opts();
        const options = [];
        options.push({ name: 'dry-run', value: !!command.dryRun });
        options.push({ name: 'project', value: command.project });
        options.push({ name: 'spec', value: !!command.spec });
        options.push({ name: 'no-spec', value: !command.spec });

        let customPath = '';
        _.map(prePath, (values, dir) => {
          if (_.includes(values, schematic)) {
            customPath = dir;
          }
        });

        const optAry = _.map(options, (o) => {
          const val = _.isString(o.value) ? o.value : '';
          if (o.value) return `--${o.name} ${val}`;
          return '';
        });
        const opt = _.join(optAry, ' ');

        const customCommand = `nest generate ${schematic} ${moduleName} ${customPath || ''} ${opt} && yarn lint`;
        execSync(customCommand, { stdio: 'inherit' });
      });
  }
}

const command = new Command();
const generateCli = new GenerateCommand();
generateCli.load(command);
command.parse();
