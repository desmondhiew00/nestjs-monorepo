import { DataSource } from 'typeorm';

import AppDataSource from './app.data-source';

import 'dotenv/config';

const SeedDataSource = new DataSource({
  ...AppDataSource.options,
  migrations: ['typeorm/seeds/**/*.*'],
  migrationsTableName: 'seeds'
});

export default SeedDataSource;
