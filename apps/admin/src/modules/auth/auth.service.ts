import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '@db/dto/user.dto';
import { UserEntity } from '@db/entities/user.entity';
import { EncryptionService } from '@lib/encryption';

import {
  getAccessJwtConfig,
  getForgotPasswordJwtConfig,
  getRefreshJwtConfig,
  JwtSignData
} from '../../configs/jwt.config';
import { AuthData } from '../../types';
import { ChangePasswordInput } from './dto/auth.dto';

interface ForgotPasswordTokenData {
  userId: number;
  token: string;
}

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
    const accessToken = this.jwtService.sign(jwtSignData, getAccessJwtConfig());
    const refreshToken = this.jwtService.sign(jwtSignData, getRefreshJwtConfig());

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
    const payload = this.jwtService.verify(refreshToken, { secret: getRefreshJwtConfig().secret }) as JwtSignData;
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

  async changePassword(input: ChangePasswordInput, authUser: AuthData) {
    const user = await this.userRepo.findOneOrFail({ where: { id: authUser.id } });

    const validPassword = this.encryption.comparePassword(input.oldPassword, user.password);
    if (!validPassword) throw new BadRequestException('Invalid old password');

    user.password = await this.encryption.hashPassword(input.newPassword);
    await this.userRepo.save(user);
  }

  async getAuthUserData(authUser: AuthData) {
    return await this.userRepo.findOneByOrFail({ id: authUser.id });
  }

  async updateProfile(input: UpdateUserDto, authUser: AuthData): Promise<UserEntity> {
    const user = await this.userRepo.findOneByOrFail({ id: authUser.id });
    this.userRepo.merge(user, { ...input } as UserEntity);
    await this.userRepo.save(user);
    return user;
  }

  async forgotPassword(email: string) {
    const user = await this.userRepo.findOne({ where: { email, active: true } });
    if (!user) throw new Error("Email doesn't exist");

    const token = this.encryption.generateForgotPasswordToken();
    const jwtTokenData: ForgotPasswordTokenData = { userId: user.id, token };
    const jwtToken = this.jwtService.sign(jwtTokenData, getForgotPasswordJwtConfig());

    user.forgotPasswordToken = await this.encryption.hashToken(token);
    await this.userRepo.save(user);
    return jwtToken;
  }

  async resetPassword(jwtToken: string, newPassword: string) {
    const { userId, token } = this.jwtService.verify<ForgotPasswordTokenData>(jwtToken, {
      secret: getForgotPasswordJwtConfig().secret
    });
    if (!token) throw new Error('Invalid token');

    const user = await this.userRepo.findOneByOrFail({ id: userId });
    const valid = await this.encryption.compareToken(token, user.forgotPasswordToken);
    if (!valid) throw new Error('Invalid token');

    const hashedPassword = await this.encryption.hashPassword(newPassword);
    this.userRepo.merge(user, { password: hashedPassword });
    await this.userRepo.save(user);
  }
}
