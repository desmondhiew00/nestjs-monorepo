import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
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

  async sign<T>(payload: T, options?: JwtSignOptions): Promise<string> {
    return this.jwtService.sign(payload as unknown as object, options);
  }

  async verify<T extends object = any>(token: string, secret: string): Promise<T> {
    return this.jwtService.verify<T>(token, { secret });
  }

  async decode<T>(token: string) {
    return this.jwtService.decode<T>(token, { complete: true });
  }

  async generateAccessToken<T>(data: T, options: JwtSignOptions = { expiresIn: '1h' }) {
    return this.sign(data, { ...options, secret: this.accessTokenSecret });
  }

  async generateRefreshToken<T>(data: T, options: JwtSignOptions = { expiresIn: '7d' }) {
    return this.sign(data, { ...options, secret: this.refreshTokenSecret });
  }

  async verifyAccessToken<T extends object>(token: string) {
    return this.verify<T>(token, this.accessTokenSecret);
  }

  async verifyRefreshToken<T extends object>(token: string) {
    return this.verify<T>(token, this.refreshTokenSecret);
  }
}
