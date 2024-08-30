import { JwtAuthModule } from '@app/auth/jwt';
import { EnvConfigModule, envSchema, getEnv } from '@app/core/env';
import { GqlModule } from '@app/core/graphql';
import { LoggerModule } from '@app/logger';
import { prismaClient, PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { AdminApiController } from './admin-api.controller';
import { AdminApiResolver } from './admin-api.resolver';
import { AdminApiService } from './admin-api.service';
import * as Config from './config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    EnvConfigModule.forRoot(envSchema.base, envSchema.jwt),
    LoggerModule.forRoot(Config.LOGGER_DIR),
    PrismaModule,
    GqlModule.forRoot(prismaClient),
    JwtAuthModule.forRoot(Config.JWT_AUTH_NAME, {
      accessTokenSecret: getEnv<Config.EnvConfig>('ACCESS_TOKEN_SECRET') || '',
      refreshTokenSecret: getEnv<Config.EnvConfig>('REFRESH_TOKEN_SECRET') || '',
    }),
    UserModule,
  ],
  controllers: [AdminApiController],
  providers: [AdminApiService, AdminApiResolver],
})
export class AdminApiModule {}
