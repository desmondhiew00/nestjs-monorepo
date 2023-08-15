/* eslint-disable no-console */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SchedulerService } from '@scheduler/services/scheduler.service';

@Injectable()
export class CronJobService implements OnModuleInit {
  constructor(private scheduler: SchedulerService) {}

  async onModuleInit() {
    //
  }

  @Cron(CronExpression.EVERY_HOUR)
  async checkForNewData() {
    console.log('Cron job every hour');
  }

  @Cron('0 0 * * *', { timeZone: 'Asia/Kuala_Lumpur' })
  async checkForNewDataEveryDay() {
    console.log('Cron job every day at 00:00');
  }
}
