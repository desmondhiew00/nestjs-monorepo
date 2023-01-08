import { Module } from '@nestjs/common';
import { S3Module } from '@lib/aws';
import { DatabaseModule } from '@lib/database';
import { SendGridModule } from '@lib/sendgrid';
import ConfigModule from '@lib/utils/initializer/env-config';
import { GqlModule } from '@lib/utils/initializer/gql';

import { getS3Config } from './configs/aws.config';
import { getSendgridConfig } from './configs/sendgrid.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule(['aws']),
    DatabaseModule,
    GqlModule(),
    S3Module.forRoot(getS3Config()),
    SendGridModule.forRoot(getSendgridConfig().apiKey),
    UserModule
  ],

  controllers: [],
  providers: []
})
export class MainModule {}
