import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { initServer } from '@app/core';

import { AdminApiModule } from './admin-api.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminApiModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT')) || 3000;
  initServer(app, { port, useCommonConfig: true });
}

void bootstrap();
