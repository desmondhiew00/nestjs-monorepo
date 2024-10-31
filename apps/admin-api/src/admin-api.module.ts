import { Module } from '@nestjs/common';

import { JwtAuthModule } from '@app/auth/jwt';
import { EnvConfigModule } from '@app/core/env';
import { GqlModule } from '@app/core/graphql';
import { LoggerModule } from '@app/logger';
import { PrismaModule, prismaClient } from '@app/prisma';

import { AdminApiController } from './admin-api.controller';
import { AdminApiResolver } from './admin-api.resolver';
import { AdminApiService } from './admin-api.service';
import { JWT_AUTH_NAME, LOGGER_DIR, envSchema, getEnv } from './config';
import { ModelModule } from './modules/model/model.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    EnvConfigModule.forRoot(envSchema),
    LoggerModule.forRoot(LOGGER_DIR),
    PrismaModule,
    GqlModule.forRoot(prismaClient),
    JwtAuthModule.forRoot(JWT_AUTH_NAME, {
      accessTokenSecret: getEnv('ACCESS_TOKEN_SECRET') ?? '',
      refreshTokenSecret: getEnv('REFRESH_TOKEN_SECRET') ?? '',
    }),
    ModelModule,
    UserModule,
  ],
  controllers: [AdminApiController],
  providers: [AdminApiService, AdminApiResolver],
})
export class AdminApiModule {}
