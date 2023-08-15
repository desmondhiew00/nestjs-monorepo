import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import type { MailDataRequired } from '@sendgrid/mail';
import { MailService } from '@sendgrid/mail';

export const injectToken = 'SENDGRID_APIKEY';

@Injectable()
export class SendGridService {
  private mailService: MailService;

  constructor(@Inject(injectToken) apiKey: string) {
    this.mailService = new MailService();
    if (apiKey) this.mailService.setApiKey(apiKey);
  }

  /**
   * @see https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail#quick-start-hello-email
   * @param msg
   */
  public async send(msg: MailDataRequired) {
    try {
      const res = await this.mailService.send(msg);
      return res;
    } catch (e) {
      const errors = _.get(e, 'response.data.errors') || _.get(e, 'response.body.errors');
      let errorMessage = '';
      if (_.isArray(errors)) {
        errorMessage = _.join(
          _.map(errors, (data) => {
            let msg = '';
            if (_.get(data, 'field')) msg += `[${data.field}] `;
            msg += data.message;
            return msg;
          }),
          ', '
        );
      } else {
        errorMessage = _.get(e, 'message');
      }
      throw new Error(errorMessage);
    }
  }
}
