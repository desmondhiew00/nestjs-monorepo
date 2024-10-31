import { envCommonSchema } from '@app/core/env';

// import * as Joi from 'joi';

// Logs directory
export const LOGGER_DIR = 'admin-web';

// JWT auth name
export const JWT_AUTH_NAME = 'admin-auth';

// Get env value helper
export const getEnv = (env: EnvKey) => process.env[env as string];

// .env validation schema
export const envSchema = {
  ...envCommonSchema.base,
  ...envCommonSchema['jwt-auth'],
  ...envCommonSchema['aws-s3'],
  // SENDGRID_API_KEY: Joi.string().required(),
};

type EnvKey = keyof typeof envSchema;
