import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import './dayjs';
import cookieParser from 'cookie-parser';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import helmet from 'helmet';
import { printNestApplicationDetails } from '@lib/logger/logger.utils';

import { AppExceptionsFilter } from '../filters/exception.filter';
import initSwagger, { InitSwaggerConfig } from './swagger';

const isProduction = process.env.NODE_ENV === 'production';

interface Config {
  port: number;
  apiPrefix?: string;
  swaggerConfig: InitSwaggerConfig;
}
export const initApplication = async (app: INestApplication, config: Config) => {
  const { port, apiPrefix, swaggerConfig } = config || {};

  // API url prefix
  app.setGlobalPrefix(apiPrefix);

  // CORS
  app.enableCors({ credentials: true, exposedHeaders: 'Content-Disposition', origin });

  // Secure HTTP headers
  app.use(
    helmet({
      crossOriginEmbedderPolicy: isProduction,
      contentSecurityPolicy: isProduction
    })
  );

  // Cookie handler
  app.use(cookieParser());

  // GraphQL Upload limit
  app.use(graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }));

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
      transform: true,
      forbidUnknownValues: false
    })
  );

  // Exceptions Filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AppExceptionsFilter(httpAdapter));

  // Swagger for Rest API documentations
  const swagger = initSwagger(app, swaggerConfig);

  await app.listen(port);

  /* ----------------------------- Log App Details ---------------------------- */
  printNestApplicationDetails(port, {
    swaggerPath: swagger.path,
    gqlPlaygroundPath: '/graphql'
  });
};

/* -------------------------------- Functions ------------------------------- */

const origin = (origin: any, callback: any) => {
  const corsValidator = process.env.CORS_VALIDATION === 'true';
  const whitelist = process.env.CORS_ORIGINS_WHITELIST?.split(',');

  if (!origin || !corsValidator || whitelist.includes(origin)) {
    return callback(null, true);
  }

  return callback(new Error('Not allowed by CORS'));
};

export default initApplication;
