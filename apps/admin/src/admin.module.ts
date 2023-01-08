import { Module } from '@nestjs/common';
import { S3Module } from '@lib/aws';
import { DatabaseModule } from '@lib/database';
import { LoggerModule } from '@lib/logger';
import { SendGridModule } from '@lib/sendgrid';
import ConfigModule from '@lib/utils/initializer/env-config';
import { GqlModule } from '@lib/utils/initializer/gql';

import { getS3Config } from './configs/aws.config';
import { getSendgridConfig } from './configs/sendgrid.config';
import { FieldPermissionMiddleware } from './middlewares/gql.middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    /* Note: Remember use env validation when using related module (lib) */
    ConfigModule.forRoot(['jwt-auth', 'aws', 'sendgrid']),
    LoggerModule.forRoot(),
    DatabaseModule.forRoot(),
    GqlModule.forRoot({ buildSchemaOptions: { fieldMiddleware: [FieldPermissionMiddleware] } }),
    S3Module.forRoot(getS3Config()),
    SendGridModule.forRoot(getSendgridConfig().apiKey),
    // FirebaseModule.forRoot(FirebaseConfig),
    UserModule,
    AuthModule,
    MailModule
  ],
  controllers: [],
  providers: []
})
export class MainModule {}
