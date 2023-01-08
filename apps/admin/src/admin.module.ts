import { Module } from '@nestjs/common';
import { S3Module } from '@lib/aws';
import { DbModule } from '@lib/database';
import { LoggerModule } from '@lib/logger';
import { SendGridModule } from '@lib/sendgrid';
import { EnvConfigModule } from '@lib/utils/initializer/env-config';
import { GqlModule } from '@lib/utils/initializer/gql';
import { FieldPermissionMiddleware } from './middlewares/gql.middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    EnvConfigModule,
    GqlModule({ buildSchemaOptions: { fieldMiddleware: [FieldPermissionMiddleware] } }),
    S3Module.forRoot(),
    SendGridModule.forRoot(process.env.SENDGRID_API_KEY),
    LoggerModule.forRoot('admin'),
    DbModule,
    UserModule,
    AuthModule,
    MailModule
  ],
  controllers: [],
  providers: []
})
export class MainModule {}
