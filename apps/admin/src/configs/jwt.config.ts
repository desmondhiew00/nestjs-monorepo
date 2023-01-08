import { JwtSignOptions } from '@nestjs/jwt';

export const strategy = {
  jwt: 'admin-jwt-auth'
};

export const getAccessJwtConfig = (): JwtSignOptions => ({
  secret: process.env.ACCESS_TOKEN_SECRET,
  expiresIn: '1d'
});

export const getRefreshJwtConfig = (): JwtSignOptions => ({
  secret: process.env.REFRESH_TOKEN_SECRET,
  expiresIn: '3d'
});

export const getForgotPasswordJwtConfig = (): JwtSignOptions => ({
  secret: process.env.FORGOT_PASSWORD_TOKEN_SECRET,
  expiresIn: '1d'
});

export interface JwtSignData {
  id: number;
}
