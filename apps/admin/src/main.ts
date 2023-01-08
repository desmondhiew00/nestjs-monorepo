import { NestFactory } from '@nestjs/core';
import initApplication from '@lib/utils/initializer/app';

import { MainModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  initApplication(app, {
    port: Number(process.env.PORT) || 4100,
    apiPrefix: 'api',
    swaggerConfig: { title: 'Admin Rest API' }
  });
}
bootstrap();
