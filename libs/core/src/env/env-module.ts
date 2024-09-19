import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as joi from 'joi';
import * as path from 'path';

export class EnvConfigModule {
  static forRoot(...schemas: Record<string, joi.Schema>[]): DynamicModule {
    const appName = path.basename(__dirname);
    const validationSchema = {};

    if (schemas) {
      for (const schema of schemas) {
        Object.assign(validationSchema, schema);
      }
    }

    return ConfigModule.forRoot({
      envFilePath: [`.env`, `apps/${appName}/.env`],
      isGlobal: true,
      validationSchema: joi.object(validationSchema),
    });
  }
}

export default EnvConfigModule;
