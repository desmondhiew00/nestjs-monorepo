import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { FastifyConfig } from '@app/core/app/fastify-config';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { AdminApiModule } from './admin-api.module';

dayjs.extend(timezone);
dayjs.extend(utc);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AdminApiModule, new FastifyAdapter());

  const fastifyConfig = new FastifyConfig(app);
  await fastifyConfig.useHelmet();
  await fastifyConfig.useCors();
  await fastifyConfig.useCompress();
  fastifyConfig.useSwagger();
  await fastifyConfig.start();
}

void bootstrap();
