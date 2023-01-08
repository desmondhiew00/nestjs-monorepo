import { NestFactory } from '@nestjs/core';
import initApplication from '@lib/utils/initializer/app';

import { MainModule } from './app.module';

import '@lib/utils/initializer/dayjs';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  initApplication(app, {
    port: Number(process.env.PORT) || 4000,
    apiPrefix: 'api',
    swaggerConfig: { title: 'Mobile Rest API' }
  });
}
bootstrap();
