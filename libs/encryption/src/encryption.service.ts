import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { createHash, randomBytes, randomInt } from 'crypto';

import { PASSWORD_SALT_ROUNDS, TOKEN_SALT_ROUNDS } from './configs/encryption.config';

const isDev = process.env.NODE_ENV === 'development';
const passwordSaltRounds = PASSWORD_SALT_ROUNDS;
const tokenSaltRounds = TOKEN_SALT_ROUNDS;

@Injectable()
export class EncryptionService {
  generatePasswordString(length = 8) {
    if (isDev && process.env.SYSTEM_GEN_PASSWORD) return process.env.SYSTEM_GEN_PASSWORD;

    let password = '';
    for (let i = 0; i < length; i++) {
      password += randomInt(10).toString();
    }
    return password;
  }

  async hashToken(token: string) {
    const sha256Token = createHash('sha256').update(token).digest('hex');
    return bcrypt.hash(sha256Token, tokenSaltRounds);
  }

  async compareToken(token: string, tokenHash: string) {
    const sha256Token = createHash('sha256').update(token).digest('hex');
    return bcrypt.compare(sha256Token, tokenHash);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, passwordSaltRounds);
  }

  async comparePassword(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  }

  async generatePassword() {
    const password = this.generatePasswordString();
    const hashedPassword = await this.hashPassword(password);
    return { password, hashedPassword };
  }

  generateForgotPasswordToken() {
    const token = randomBytes(12).toString('hex');
    return token;
  }
}
