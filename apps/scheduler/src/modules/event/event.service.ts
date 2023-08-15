/* eslint-disable no-console */

import { Injectable } from '@nestjs/common';

import { SchedulerService } from '../../services/scheduler.service';
import * as E from './events';

@Injectable()
export class EventService {
  constructor(private cron: SchedulerService) {}

  async scheduleOrder(data: E.ScheduleOrder) {
    console.log(`Schedule Order (Id: ${data.orderId}) on ${data.date}`);

    this.cron.addJob(data.getJobName(), new Date(data.date), () => {
      console.log(`Run schedule job (${data.getJobName()}) at ${new Date()}`);
      // handle job logic
    });
  }
}
