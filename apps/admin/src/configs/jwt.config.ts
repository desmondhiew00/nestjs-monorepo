import { JwtSignOptions } from '@nestjs/jwt';

// User entity data
export interface JwtSignData {
  id: number;
}

export const jwtConfigAccess: JwtSignOptions = {
  secret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
  expiresIn: '1d'
};

export const jwtConfigRefresh: JwtSignOptions = {
  secret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
  expiresIn: '3d'
};
