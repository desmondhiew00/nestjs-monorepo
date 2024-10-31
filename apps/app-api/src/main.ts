import { NestFactory } from '@nestjs/core';

import { AppApiModule } from './app-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AppApiModule);
  await app.listen(3000);
}

void bootstrap();
