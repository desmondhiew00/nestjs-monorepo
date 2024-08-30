import type { BaseEnv, JwtEnv } from '@app/core/env';

export const LOGGER_DIR = 'admin-api';
export const JWT_AUTH_NAME = 'admin-auth';

export type EnvConfig = BaseEnv | JwtEnv;
