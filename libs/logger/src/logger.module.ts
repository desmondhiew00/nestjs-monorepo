import { Global, Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';
import path from 'path';

import { LoggerService } from './logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    const appName = path.basename(__dirname);
    return {
      module: LoggerModule,
      providers: [{ provide: LoggerService, useValue: new LoggerService(appName) }],
      exports: [LoggerService]
    };
  }
}
