import { DynamicModule, Global, Module } from '@nestjs/common';

import { injectToken, SendGridService } from './sendgrid.service';

@Global()
@Module({})
export class SendGridModule {
  static forRoot(apiKey: string): DynamicModule {
    return {
      module: SendGridModule,
      providers: [{ provide: injectToken, useValue: apiKey }, SendGridService],
      exports: [SendGridService]
    };
  }
}
