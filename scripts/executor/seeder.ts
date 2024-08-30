import { readdirSync } from 'fs';
import inquirer from 'inquirer';
import { join } from 'path';
import * as signale from "signale";

(async () => {
  const dirPath = '../../prisma/seeds';
  const seedDir = join(__dirname, dirPath);
  const files = readdirSync(seedDir).filter((file) => file.endsWith('.ts'));

  if (files.length === 0) {
    signale.error('No seed files found');
    return;
  }

  const { seedFile } = await inquirer.prompt({
    type: 'list',
    name: 'seedFile',
    choices: files,
    // @ts-ignore
    message: 'Select seed file'
  });

  const { execSync } = require('child_process');
  execSync(`npx ts-node ${join(seedDir, seedFile)}`, { stdio: 'inherit' });
})();
