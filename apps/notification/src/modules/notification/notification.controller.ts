import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import * as E from './events';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private service: NotificationService) {}

  @EventPattern(E.OrderCreated.name)
  async handleOrderCreated(data: E.OrderCreated) {
    this.service.handleOrderCreated(data);
  }
}
