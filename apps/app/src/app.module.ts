import { Module } from '@nestjs/common';
import ConfigModule from 'configs/env-config';
import { DatabaseModule } from '@db';
import { LoggerModule } from '@lib/logger';
import { GqlModule } from '@utils/core/gql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(['jwt-auth']), LoggerModule.forRoot(), DatabaseModule.forRoot(), GqlModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
