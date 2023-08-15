import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { printNestApplicationDetails } from '@lib/logger/logger.utils';
import initApplication from '@utils/core/app';

import { NotificationModule } from './notification.module';

async function bootstrap() {
  const microservicePort = Number(process.env.NOTIFICATION_PORT);
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationModule, {
    transport: Transport.TCP,
    options: { port: microservicePort }
  });
  await microservice.listen();

  const appPort = Number(process.env.NOTIFICATION_PORT) + 1;
  const app = await NestFactory.create(NotificationModule);

  await initApplication(app, { port: appPort, apiPrefix: 'api', swaggerConfig: { title: 'Notification Service API' } });
  printNestApplicationDetails(microservicePort, { microservice: true });
}
bootstrap();
