import { Module } from '@nestjs/common';
import { SchedulerService } from '@scheduler/services/scheduler.service';

import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [],
  providers: [EventService, SchedulerService],
  controllers: [EventController]
})
export class EventModule {}
