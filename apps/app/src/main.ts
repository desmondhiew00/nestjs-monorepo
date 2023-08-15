import { NestFactory } from '@nestjs/core';
import '@utils/core/dayjs';
import initApplication from '@utils/core/app';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initApplication(app, {
    port: Number(process.env.APP_PORT) || 4000,
    apiPrefix: 'api',
    swaggerConfig: { title: 'App App API' }
  });
}
bootstrap();
