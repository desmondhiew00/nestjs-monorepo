import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseService } from './database.service';

import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_DRIVER as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      useUTC: true,
      autoLoadEntities: true,
      synchronize: false
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
