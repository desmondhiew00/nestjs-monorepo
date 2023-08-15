import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { printNestApplicationDetails } from '@lib/logger/logger.utils';
import initApplication from '@utils/core/app';

import { SchedulerModule } from './main.module';

async function bootstrap() {
  const microservicePort = Number(process.env.SCHEDULER_PORT);
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(SchedulerModule, {
    transport: Transport.TCP,
    options: { port: microservicePort }
  });
  await microservice.listen();

  const appPort = Number(process.env.SCHEDULER_PORT) + 1;
  const app = await NestFactory.create(SchedulerModule);

  await initApplication(app, { port: appPort, apiPrefix: 'api', swaggerConfig: { title: 'Scheduler Service API' } });
  printNestApplicationDetails(microservicePort, { microservice: true });
}
bootstrap();
