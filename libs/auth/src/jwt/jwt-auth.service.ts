import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import crypto from 'crypto';
import { type Jwt } from 'jsonwebtoken';
import { JwtAuthConfig } from './jwt-auth.module';

@Injectable()
export class JwtAuthService {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;

  constructor(
    @Inject('JWT_AUTH_CONFIG') private authConfig: JwtAuthConfig,
    private jwtService: JwtService,
  ) {
    this.accessTokenSecret = this.authConfig.accessTokenSecret;
    this.refreshTokenSecret = this.authConfig.refreshTokenSecret;
  }

  sign<T>(payload: T, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload as unknown as object, options);
  }

  verify<T extends object = any>(token: string, secret: string): T {
    return this.jwtService.verify<T>(token, { secret });
  }

  decode<T>(token: string) {
    return this.jwtService.decode<T>(token, { complete: true });
  }

  generateAccessToken<T>(data: T, options: JwtSignOptions = { expiresIn: '1h' }) {
    return this.sign(data, { ...options, secret: this.accessTokenSecret });
  }

  generateRefreshToken<T>(data: T, options: JwtSignOptions = { expiresIn: '7d' }) {
    return this.sign(data, { ...options, secret: this.refreshTokenSecret });
  }

  verifyAccessToken<T extends object>(token: string) {
    return this.verify<T>(token, this.accessTokenSecret);
  }

  verifyRefreshToken<T extends object>(token: string) {
    return this.verify<T>(token, this.refreshTokenSecret);
  }

  getExpirationDate(token: string) {
    const decoded = this.jwtService.decode<Jwt>(token, { complete: true });
    if (typeof decoded.payload === 'string') return null;
    return decoded?.payload?.exp;
  }

  generateUniqueToken() {
    return crypto.randomBytes(32).toString('base64url');
  }
}
