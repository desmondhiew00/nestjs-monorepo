import { generateJwtAuthGuard } from '@app/auth/jwt';
import { JWT_AUTH_NAME } from '../../config';

export const { JwtAuthGuard, UseJwtAuthGuard, UseAuthUser } = generateJwtAuthGuard(JWT_AUTH_NAME);

export interface AuthData {
  id: number;
  email: string;
}
