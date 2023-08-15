import { Injectable } from '@nestjs/common';
import { LoggerService } from '@lib/logger';
import { SendGirdConfig, SendGridService } from '@lib/sendgrid';
import { EmailData } from '@sendgrid/helpers/classes/email-address';

import * as E from './events';

@Injectable()
export class MailService {
  private senderEmail: string;
  private senderName: string;
  private from: EmailData;

  constructor(private sendgrid: SendGridService, private logger: LoggerService) {
    this.senderEmail = SendGirdConfig().from;
    this.senderName = SendGirdConfig().senderName;
    this.from = { email: this.senderEmail, name: this.senderName };
  }

  async sendForgotPasswordEmail(data: E.ForgotPassword) {
    try {
      const templateId = '123';
      const dynamicTemplateData = { token: data.token };

      const response = await this.sendgrid.send({
        to: data.email,
        from: this.from,
        subject: 'Reset Password',
        templateId,
        dynamicTemplateData
      });
      return response;
    } catch (e) {
      this.logger.error(`Error sending forgot password email to ${data.email}`);
      this.logger.error(e);
    }
  }
}
