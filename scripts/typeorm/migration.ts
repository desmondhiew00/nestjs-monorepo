import { execSync } from 'child_process';

const migrationName = process.argv[2];
const prefixPath = 'typeorm/migrations/';
try {
  execSync(`yarn typeorm migration:generate ${prefixPath + migrationName} --pretty `, { stdio: 'inherit' });
} catch (e) {}
