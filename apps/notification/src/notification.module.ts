import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@db';
import { LoggerModule } from '@lib/logger';
import { SendGirdConfig, SendGridModule } from '@lib/sendgrid';

import { MailModule } from './modules/mail/mail.module';
import { NotificationModule as NModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.forRoot(),
    LoggerModule.forRoot(),
    NModule,
    SendGridModule.forRoot(SendGirdConfig().apiKey),
    MailModule
  ],
  controllers: [],
  providers: []
})
export class NotificationModule {}
