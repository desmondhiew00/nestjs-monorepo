import { Module } from '@nestjs/common';
import { SchedulerService } from '@scheduler/services/scheduler.service';

import { CronjobController } from './cronjob.controller';
import { CronJobService } from './cronjob.service';

@Module({
  imports: [],
  providers: [CronJobService, SchedulerService],
  controllers: [CronjobController]
})
export class CronjobModule {}
