import { NestFactory } from '@nestjs/core';
import '@lib/utils/initializer/dayjs';
import initApplication from '@lib/utils/initializer/app';
import { MainModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  initApplication(app, {
    port: Number(process.env.APP_PORT) || 4000,
    apiPrefix: 'api',
    swaggerConfig: { title: 'Mobile Rest API' }
  });
}
bootstrap();
