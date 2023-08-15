import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import * as E from './events';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private service: MailService) {}

  @EventPattern(E.ForgotPassword.name)
  async sendForgotPasswordEmail(data: E.ForgotPassword) {
    this.service.sendForgotPasswordEmail(data);
  }
}
