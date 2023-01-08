import { NestFactory } from '@nestjs/core';
import '@lib/utils/initializer/dayjs';
import initApplication from '@lib/utils/initializer/app';
import { MainModule } from './admin.module';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  initApplication(app, {
    port: Number(process.env.ADMIN_PORT) || 4100,
    apiPrefix: 'api',
    swaggerConfig: { title: 'Admin Rest API' }
  });
}
bootstrap();
