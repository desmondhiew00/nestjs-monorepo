/* eslint-disable no-console */

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobService } from './modules/job/job.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly jobService: JobService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    console.log('Cron every 10 secs');
    const users = await this.jobService.getUsers();
    console.log(users);
  }

  // @Interval(1000)
  // handleInterval() {}

  @Cron('0 8 * * *', { name: 'notifications', timeZone: 'Asia/Kuala_Lumpur' })
  triggerNotifications() {
    console.log('Push notification every morning at 8:00AM Malaysia time');
  }
}
