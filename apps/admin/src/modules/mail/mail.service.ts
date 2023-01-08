import { Injectable } from '@nestjs/common';
import { SendGridService } from '@lib/sendgrid';

@Injectable()
export class MailService {
  from = {
    email: process.env.SENDGRID_SENDER_EMAIL,
    name: process.env.SENDGRID_SENDER_NAME
  };

  constructor(private sendgrid: SendGridService) {}

  async sendTemporaryPassword(email: string, tempPassword: string) {
    try {
      await this.sendgrid.send({
        from: this.from,
        to: email,
        subject: 'Temporary Password',
        text: `Your temporary password is : ${tempPassword}`
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Sendgrid Error:  ${e.message}`);
    }
  }

  async sendResetPasswordVerification(email: string, resetPasswordToken: string) {
    try {
      await this.sendgrid.send({
        from: this.from,
        to: email,
        subject: 'Reset Password',
        text: `Reset password URL: ${process.env.RESET_PASSWORD_URL}?token=${resetPasswordToken}`
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Sendgrid Error:  ${e.message}`);
    }
  }
}
