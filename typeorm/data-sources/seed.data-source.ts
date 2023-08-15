import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import AppDataSource from './app.data-source';

dotenv.config({ path: './env/.env' });

const SeedDataSource = new DataSource({
  ...AppDataSource.options,
  migrations: ['typeorm/seeds/**/*.*'],
  migrationsTableName: 'seeds'
});

export default SeedDataSource;
