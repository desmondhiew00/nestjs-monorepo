import { Global, Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';

import { OneWaySmsService } from './onewaysms.service';
import type { OneWaySmsConfig } from './type';

@Global()
@Module({})
export class OneWaySmsModule {
  static forRoot(config: OneWaySmsConfig): DynamicModule {
    return {
      module: OneWaySmsModule,
      providers: [{ provide: OneWaySmsService, useValue: new OneWaySmsService(config) }],
      exports: [OneWaySmsService]
    };
  }
}
