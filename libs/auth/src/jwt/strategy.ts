import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import type { Request } from 'express';
import { ExtractJwt, Strategy as JWTStrategy, WithSecretOrKey } from 'passport-jwt';

export interface JwtAuthStrategyOptions extends Partial<WithSecretOrKey> {
  validate?: <T>(req: Request, payload: T) => Promise<T> | T;
}

export const createJwtAuthStrategy = (name: string) => {
  @Injectable()
  class JwtAuthStrategy extends PassportStrategy(JWTStrategy, name) {
    onValidate?: <T>(req: Request, payload: T) => Promise<T> | T;

    constructor(options: JwtAuthStrategyOptions) {
      super({
        passReqToCallback: true,
        ignoreExpiration: false,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ...options,
      });

      if (options.validate) {
        this.onValidate = options.validate;
      }
    }

    async validate<T>(req: Request, payload: T): Promise<T> {
      if (this.onValidate) {
        return this.onValidate(req, payload);
      }
      return payload;
    }
  }

  return JwtAuthStrategy;
};
