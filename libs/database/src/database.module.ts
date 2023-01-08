import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DatabaseService } from './database.service';

import 'dotenv/config';

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
      synchronize: false
    };

    // return TypeOrmModule.forRoot({ ...defaultOption, ...(options || {}) } as TypeOrmModuleOptions);
    const dbModule = TypeOrmModule.forRoot({ ...defaultOption, ...options } as TypeOrmModuleOptions);
    return {
      module: DatabaseModule,
      imports: [dbModule],
      providers: [DatabaseService],
      exports: [dbModule, DatabaseService]
    };
  }
}
