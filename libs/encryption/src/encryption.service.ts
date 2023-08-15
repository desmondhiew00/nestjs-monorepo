import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import {
  CryptoAlgorithm,
  CryptoSecurityKey,
  CryptoVector,
  PASSWORD_SALT_ROUNDS,
  TOKEN_SALT_ROUNDS
} from './configs/encryption.config';

const isDev = process.env.NODE_ENV === 'development';
const passwordSaltRounds = PASSWORD_SALT_ROUNDS;
const tokenSaltRounds = TOKEN_SALT_ROUNDS;

@Injectable()
export class EncryptionService {
  generatePasswordString(length = 8) {
    if (isDev && process.env.SYSTEM_GEN_PASSWORD) return process.env.SYSTEM_GEN_PASSWORD;

    let password = '';
    for (let i = 0; i < length; i++) {
      password += crypto.randomInt(10).toString();
    }
    return password;
  }

  async hashToken(token: string) {
    const sha256Token = crypto.createHash('sha256').update(token).digest('hex');
    return bcrypt.hash(sha256Token, tokenSaltRounds);
  }

  async compareToken(token: string, tokenHash) {
    const sha256Token = crypto.createHash('sha256').update(token).digest('hex');
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

  generateCode(length = 6) {
    let code = '';
    for (let i = 0; i < length; i++) {
      code += crypto.randomInt(10).toString();
    }
    return code;
  }

  generateForgotPasswordToken() {
    const token = crypto.randomBytes(12).toString('hex');
    return token;
  }

  isEncryptedPassword(val: string) {
    let valid = false;
    try {
      bcrypt.getRounds(val);
      valid = true;
    } catch (e) {}
    return valid;
  }

  encrypt(value: string) {
    const cipher = crypto.createCipheriv(CryptoAlgorithm, CryptoSecurityKey, CryptoVector);
    let encryptedData = cipher.update(value, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
  }

  decrypt(encryptedData: string) {
    const decipher = crypto.createDecipheriv(CryptoAlgorithm, CryptoSecurityKey, CryptoVector);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }
}
