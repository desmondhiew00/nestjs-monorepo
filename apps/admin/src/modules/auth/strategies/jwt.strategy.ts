import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { UserEntity } from '@db/entities/user.entity';
import { getAccessConfig, JwtSignData, strategy } from 'apps/admin/src/configs/jwt.config';

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
  async validate(_req: any, payload: JwtSignData) {
    const user = await UserEntity.findOne({ where: { id: payload.id }, select: ['id', 'active'] });
    if (!user) throw new UnauthorizedException('Invalid Session');
    if (!user.active) throw new ForbiddenException('User has been suspended');
    return user;
  }
}
