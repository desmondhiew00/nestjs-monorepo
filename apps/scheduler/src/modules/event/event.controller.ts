import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { EventService } from './event.service';
import * as E from './events';

@Controller('event')
export class EventController {
  constructor(private service: EventService) {}

  @EventPattern(E.ScheduleOrder.name)
  async scheduleOrder(data: E.ScheduleOrder) {
    this.service.scheduleOrder(data);
  }
}
