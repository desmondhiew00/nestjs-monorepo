import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DbModule } from '@lib/database';
import { LoggerModule } from '@lib/logger';
import { EnvConfigModule } from '@lib/utils/initializer/env-config';
import { JobModule } from './modules/job/job.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [EnvConfigModule, DbModule, LoggerModule.forRoot('scheduler'), ScheduleModule.forRoot(), JobModule],
  controllers: [],
  providers: [SchedulerService]
})
export class SchedulerModule {}
