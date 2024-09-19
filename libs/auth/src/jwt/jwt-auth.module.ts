import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { getAuthConfigName, getServiceName } from './config';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategyOptions, createJwtAuthStrategy } from './strategy';

export interface JwtAuthConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  strategyConfig?: JwtAuthStrategyOptions;
}

@Global()
@Module({})
export class JwtAuthModule {
  static forRoot(name: string, config: JwtAuthConfig): DynamicModule {
    const JWTStrategy = createJwtAuthStrategy(name);
    const serviceToken = getServiceName(name);
    const configToken = getAuthConfigName(name);

    return {
      module: JwtAuthModule,
      imports: [JwtModule.register({})],
      providers: [
        {
          provide: getAuthConfigName(name),
          useValue: config,
        },
        {
          provide: JWTStrategy,
          useValue: new JWTStrategy({
            ...config.strategyConfig,
            secretOrKey: config.accessTokenSecret,
          }),
        },
        {
          provide: serviceToken,
          useFactory: (opts: JwtAuthConfig) => {
            return new JwtAuthService(opts, new JwtService());
          },
          inject: [configToken],
        },
      ],
      exports: [serviceToken, JwtModule],
    };
  }
}
