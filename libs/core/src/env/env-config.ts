import * as Joi from 'joi';

export const getEnv = <T>(env: T) => process.env[env as string];

export const envSchema = {
  base: {
    NODE_ENV: Joi.string().valid('development', 'production', 'staging', 'test').default('development'),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required(),
  },
  jwt: {
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
  },
  'aws-s3': {
    AWS_REGION: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_S3_BUCKET: Joi.string().required(),
    AWS_S3_BUCKET_PREFIX: Joi.string(),
  },
};

export type BaseEnv = keyof (typeof envSchema)['base'];
export type JwtEnv = keyof (typeof envSchema)['jwt'];
export type AwsS3Env = keyof (typeof envSchema)['aws-s3'];
export type EnvConfig = BaseEnv | JwtEnv | AwsS3Env;
