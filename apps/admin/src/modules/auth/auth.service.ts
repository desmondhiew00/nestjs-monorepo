import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { UserEntity } from '@db/entities/user.entity';
import { EncryptionService } from '@lib/encryption';

import { getAccessConfig, getRefreshConfig, JwtSignData } from '../../configs/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly encryption: EncryptionService
  ) {}

  private async generateAuthToken(userId: number) {
    let user = await this.userRepo.findOneOrFail({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    if (user.active === false) throw new Error('This account has been suspended');

    const jwtSignData: JwtSignData = { id: user.id };
    const accessToken = this.jwtService.sign(jwtSignData, getAccessConfig());
    const refreshToken = this.jwtService.sign(jwtSignData, getRefreshConfig());

    /* -------------------- Update refresh token to database -------------------- */
    this.userRepo.merge(user, { refreshToken });
    await this.userRepo.save(user);

    const decoded: any = this.jwtService.decode(accessToken, { complete: true });
    user = await this.userRepo.findOneOrFail({
      where: { id: userId },
      select: ['id', 'email', 'name', 'phoneNo', 'avatar']
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiry: Number(_.get(decoded, 'payload.exp', null) ?? 0),
      user
    };
  }

  // Email login
  async emailSignIn(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new Error('Invalid email or password');

    const validPassword = await this.encryption.comparePassword(password, user.password);
    if (!validPassword) throw new Error('Invalid email or password');

    const authToken = await this.generateAuthToken(user.id);
    return authToken;
  }

  // Revoke
  async revoke(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, { secret: getRefreshConfig().secret }) as JwtSignData;
    if (!payload) throw new Error('Invalid refresh token');

    const user = await this.userRepo.findOneOrFail({ where: { id: payload.id } });
    const validToken = refreshToken === user.refreshToken;
    if (!validToken) throw new Error('Invalid refresh token');

    const authToken = await this.generateAuthToken(user.id);
    return authToken;
  }

  // Logout
  async logout(userId: number) {
    const user = await this.userRepo.findOneOrFail({ where: { id: userId } });
    this.userRepo.merge(user, { refreshToken: null });
    return await this.userRepo.save(user);
  }

  // Change password
  // Forgot password
  // Reset password
}
