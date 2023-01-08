import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

const joiSchema = {
  NODE_ENV: Joi.string().valid('development', 'staging', 'production', 'test', 'provision').required(),
  APP_PORT: Joi.number().required(),
  ADMIN_PORT: Joi.number().required(),
  SCHEDULER_PORT: Joi.number().required(),

  CORS_VALIDATION: Joi.string(),
  CORS_ORIGINS_WHITELIST: Joi.string(),

  /* ---------------------------------- Auth ---------------------------------- */
  ADMIN_ACCESS_TOKEN_SECRET: Joi.string().required(),
  ADMIN_REFRESH_TOKEN_SECRET: Joi.string().required(),
  APP_ACCESS_TOKEN_SECRET: Joi.string().required(),
  APP_REFRESH_TOKEN_SECRET: Joi.string().required(),
  SYSTEM_GEN_PASSWORD: Joi.string(), // Replace system auto generated password (For development purpose)

  /* -------------------------------- Database -------------------------------- */
  DB_DRIVER: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  /* --------------------------------- AWS S3 --------------------------------- */
  AWS_REGION: Joi.string().required().allow(''),
  AWS_ACCESS_KEY_ID: Joi.string().required().allow(''),
  AWS_SECRET_ACCESS_KEY: Joi.string().required().allow(''),
  AWS_S3_BUCKET: Joi.string().required().allow(''),
  AWS_S3_BUCKET_PREFIX: Joi.string().required().allow(''),

  /* -------------------------------- Sendgrid -------------------------------- */
  SENDGRID_API_KEY: Joi.string().required().allow(''),
  SENDGRID_SENDER_EMAIL: Joi.string().required().allow(''),
  SENDGRID_SENDER_NAME: Joi.string().required().allow('')

  /* ----------------------- Firebase cloud messaging ---------------------- */
  // FIREBASE_TYPE: Joi.string().required(),
  // FIREBASE_PROJECT_ID: Joi.string().required(),
  // FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
  // FIREBASE_PRIVATE_KEY: Joi.string().required(),
  // FIREBASE_CLIENT_EMAIL: Joi.string().required(),
  // FIREBASE_CLIENT_ID: Joi.string().required(),
  // FIREBASE_AUTH_URI: Joi.string().required(),
  // FIREBASE_TOKEN_URI: Joi.string().required(),
  // FIREBASE_AUTH_PROVIDER_X509_CERT_URL: Joi.string().required(),
  // FIREBASE_CLIENT_X509_CERT_URL: Joi.string().required(),
};

const envSchema = Joi.object(joiSchema);

export const EnvConfigModule = ConfigModule.forRoot({
  envFilePath: ['.env'],
  isGlobal: true,
  validationSchema: envSchema
});
