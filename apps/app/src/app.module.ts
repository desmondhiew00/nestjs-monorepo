import { Module } from '@nestjs/common';
import { S3Module } from '@lib/aws';
import { DbModule } from '@lib/database';
import { SendGridModule } from '@lib/sendgrid';
import { EnvConfigModule } from '@lib/utils/initializer/env-config';
import { GqlModule } from '@lib/utils/initializer/gql';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    EnvConfigModule,
    GqlModule(),
    DbModule,
    S3Module.forRoot(),
    S3Module,
    SendGridModule.forRoot(process.env.SENDGRID_API_KEY),
    UserModule
  ],
  controllers: [],
  providers: []
})
export class MainModule {}
