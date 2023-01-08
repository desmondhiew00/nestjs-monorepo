import { NestFactory } from '@nestjs/core';
import { printNestApplicationDetails } from '@lib/logger/logger.utils';
import { SchedulerModule } from './scheduler.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerModule);
  const port = Number(process.env.SCHEDULER_PORT) || 4200;
  await app.listen(port);
  printNestApplicationDetails(port);
}
bootstrap();
