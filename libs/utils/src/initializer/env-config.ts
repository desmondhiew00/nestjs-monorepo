import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import path from 'path';

const main = {
  NODE_ENV: Joi.string().valid('development', 'staging', 'production', 'test', 'provision').required(),
  PORT: Joi.number().required(),
  CORS_VALIDATION: Joi.string(),
  CORS_ORIGINS_WHITELIST: Joi.string()
};

export const environments = {
  database: {
    DB_DRIVER: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required()
  },
  'jwt-auth': {
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    FORGOT_PASSWORD_TOKEN_SECRET: Joi.string().required()
  },
  aws: {
    AWS_REGION: Joi.string().required().allow(''),
    AWS_ACCESS_KEY_ID: Joi.string().required().allow(''),
    AWS_SECRET_ACCESS_KEY: Joi.string().required().allow(''),
    AWS_S3_BUCKET: Joi.string().required().allow(''),
    AWS_S3_BUCKET_PREFIX: Joi.string().required().allow('')
  },
  sendgrid: {
    SENDGRID_API_KEY: Joi.string().required(),
    SENDGRID_SENDER_EMAIL: Joi.string().required(),
    SENDGRID_SENDER_NAME: Joi.string().required()
  },
  firebase: {
    FIREBASE_TYPE: Joi.string().required(),
    FIREBASE_PROJECT_ID: Joi.string().required(),
    FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
    FIREBASE_PRIVATE_KEY: Joi.string().required(),
    FIREBASE_CLIENT_EMAIL: Joi.string().required(),
    FIREBASE_CLIENT_ID: Joi.string().required(),
    FIREBASE_AUTH_URI: Joi.string().required(),
    FIREBASE_TOKEN_URI: Joi.string().required(),
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: Joi.string().required(),
    FIREBASE_CLIENT_X509_CERT_URL: Joi.string().required()
  },
  onewaysms: {
    ONEWAYSMS_USERNAME: Joi.string().required(),
    ONEWAYSMS_PASSWORD: Joi.string().required()
  }
} as const;

type Module = keyof typeof environments;
export class EnvConfigModule {
  static forRoot(modules?: Module[]): DynamicModule {
    const appName = path.basename(__dirname);

    let schema = { ...main, ...environments.database }; // default schema
    (modules || []).map((key) => {
      const module = environments[key];
      schema = { ...schema, ...module };
    });
    return ConfigModule.forRoot({
      envFilePath: `.${appName}.env`,
      isGlobal: true,
      validationSchema: Joi.object(schema)
    });
  }
}

export default EnvConfigModule;
