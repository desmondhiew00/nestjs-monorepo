import { Global, Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';

import { LoggerService, Options } from './logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(folder: string, options?: Options): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useValue: new LoggerService(folder, options),
        },
      ],
      exports: [LoggerService],
    };
  }
}
