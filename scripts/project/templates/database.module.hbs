import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfigModule } from 'configs/env-config';
import dotenv from 'dotenv';

import { DatabaseService } from './database.service';
// Inject: Import

dotenv.config({ path: './env/.env' });

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    const defaultOption: TypeOrmModuleOptions = {
      type: process.env.DB_DRIVER as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      useUTC: true,
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
      entities,
      subscribers
    };

    const dbModule = TypeOrmModule.forRoot({ ...defaultOption, ...options } as TypeOrmModuleOptions);
    return {
      module: DatabaseModule,
      imports: [dbModule, EnvConfigModule.forRoot(['aws-s3'])],
      providers: [DatabaseService],
      exports: [dbModule, DatabaseService]
    };
  }
}

const entities = [
  // Inject: Entity Array
];

const subscribers = [
  // Inject: Subscriber Array
];
