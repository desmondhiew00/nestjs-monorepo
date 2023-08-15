import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { getAccessConfig, JwtSignData, strategy } from '@app/configs/jwt.config';
import { AuthData } from '@app/types';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(JWTStrategy, strategy.jwt) {
  constructor() {
    super({
      passReqToCallback: true,
      secretOrKey: getAccessConfig().secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }
  async validate(_req: any, payload: JwtSignData): Promise<AuthData> {
    return payload;
  }
}
