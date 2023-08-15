import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { upperCase } from 'lodash';
import path from 'path';
import { s3schema } from '@lib/aws/environment';
import database from '@lib/database/environment';
import firebase from '@lib/firebase/environment';
import onewaysms from '@lib/onewaysms/environment';
import sendgrid from '@lib/sendgrid/environment';

/* --------------------------------- Schema --------------------------------- */

const mainSchema = {
  NODE_ENV: Joi.string().valid('development', 'staging', 'production', 'test', 'provision').required(),
  CORS_VALIDATION: Joi.string(),
  CORS_ORIGINS_WHITELIST: Joi.string()
};

const jwtSchema = {
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  FORGOT_PASSWORD_TOKEN_SECRET: Joi.string().required()
};

/* ------------------------------- END Schema ------------------------------- */

export const JwtAuthEnv = () => ({
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD_TOKEN_SECRET
});

export const environments = {
  'aws-s3': s3schema,
  'jwt-auth': jwtSchema,
  database,
  firebase,
  onewaysms,
  sendgrid
} as const;

type Module = keyof typeof environments;
export class EnvConfigModule {
  static forRoot(modules?: Module[], customSchema?: Record<string, Joi.Schema>): DynamicModule {
    const appName = path.basename(__dirname);

    // default schema
    let schema = {
      ...mainSchema,
      ...environments.database,
      ...customSchema
    };

    if (appName !== 'configs') {
      schema[`${upperCase(appName)}_PORT`] = Joi.number().required();
    }

    (modules || []).map((key) => {
      const module = environments[key];
      schema = { ...schema, ...module, ...customSchema };
    });

    return ConfigModule.forRoot({
      envFilePath: [`./env/.${appName}.env`, `./env/.env`],
      isGlobal: true,
      validationSchema: Joi.object(schema)
    });
  }
}

export default EnvConfigModule;
