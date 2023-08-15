import { Injectable } from '@nestjs/common';
import { LoggerService } from '@lib/logger';

import * as E from './events';

@Injectable()
export class NotificationService {
  constructor(private logger: LoggerService) {}

  async handleOrderCreated(data: E.OrderCreated) {
    try {
      console.log(`Order ${data.orderId} created`);
      // notify customer, admin etc...
    } catch (e) {
      this.logger.error(`Error handling OrderCreated event: ${e.message}`);
    }
  }
}
