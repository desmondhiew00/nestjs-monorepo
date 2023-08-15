import { Controller, Get } from '@nestjs/common';

import { SchedulerService } from '../../services/scheduler.service';

@Controller('cronjob')
export class CronjobController {
  constructor(private scheduler: SchedulerService) {}

  @Get('scheduled-jobs')
  async getScheduledJobs() {
    return this.scheduler.getJobs().data;
  }
}
