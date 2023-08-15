import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: './env/.env' });

const AppDataSource = new DataSource({
  type: process.env.DB_DRIVER as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['libs/database/src/entities/**/*.entity.ts'],
  migrations: ['typeorm/migrations/**/*.*']
});

export default AppDataSource;
