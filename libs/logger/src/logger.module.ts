import { Global, Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(dir: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [{ provide: LoggerService, useValue: new LoggerService(dir) }],
      exports: [LoggerService]
    };
  }
}
