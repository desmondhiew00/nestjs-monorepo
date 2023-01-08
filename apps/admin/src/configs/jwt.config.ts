import { JwtSignOptions } from '@nestjs/jwt';

export const strategy = {
  jwt: 'admin-jwt-auth'
};

export const getAccessConfig = (): JwtSignOptions => ({
  secret: process.env.ACCESS_TOKEN_SECRET,
  expiresIn: '1d'
});

export const getRefreshConfig = (): JwtSignOptions => ({
  secret: process.env.REFRESH_TOKEN_SECRET,
  expiresIn: '3d'
});

export interface JwtSignData {
  id: number;
}
