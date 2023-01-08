import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@lib/database';
import { LoggerModule } from '@lib/logger';
import ConfigModule from '@lib/utils/initializer/env-config';

import { JobModule } from './modules/job/job.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [ConfigModule(), DatabaseModule, LoggerModule.forRoot(), ScheduleModule.forRoot(), JobModule],
  controllers: [],
  providers: [SchedulerService]
})
export class SchedulerModule {}
