import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@db';
import { LoggerModule } from '@lib/logger';

import { CronjobModule } from './modules/cronjob/cronjob.module';
import { EventModule } from './modules/event/event.module';
import { SchedulerService } from './services/scheduler.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.forRoot(),
    LoggerModule.forRoot(),
    ScheduleModule.forRoot(),
    CronjobModule,
    EventModule
  ],
  controllers: [],
  providers: [SchedulerService],
  exports: [SchedulerService]
})
export class SchedulerModule {}
