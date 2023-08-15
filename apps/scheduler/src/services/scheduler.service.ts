import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { LoggerService } from '@lib/logger';

@Injectable()
export class SchedulerService {
  constructor(private schedulerRegistry: SchedulerRegistry, private logger: LoggerService) {}

  addJob(name: string, date: Date, callback: () => void) {
    const job = new CronJob(date, callback);
    this.schedulerRegistry.addCronJob(name, job);
    this.logger.log(`schedule job ${name} added!`);
    job.start();
  }

  deleteJob(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`schedule job ${name} deleted!`);
  }

  getJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();

    const data = [];
    for (const key of jobs.keys()) {
      const job = jobs.get(key);
      const scheduledAt = job.nextDates().toFormat('yyyy-MM-dd HH:mm:ss');
      const formattedJob = { name: key, scheduledAt };
      data.push(formattedJob);
    }

    return { jobs, data };
  }

  getJob(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    if (!job) return null;

    const scheduledAt = job.nextDates().toFormat('yyyy-MM-dd HH:mm:ss');
    const data = { name, scheduledAt };

    return { job, data };
  }
}
