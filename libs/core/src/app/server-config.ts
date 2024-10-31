import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import helmet from 'helmet';
import * as path from 'path';
import * as signale from 'signale';

import { AppExceptionsFilter } from './exception-filter';

const isProduction = process.env.NODE_ENV === 'production';

interface InitSwaggerOptions {
  title?: string;
  description?: string;
  path?: string;
  version?: string;
  tags?: { name: string; description?: string }[];
}

export const useSwagger = (app: NestExpressApplication, options: InitSwaggerOptions = {}) => {
  const { title = 'API', description, path = 'swagger', version = '1.0', tags = [] } = options;

  const config = new DocumentBuilder()
    .setTitle(title)
    .setVersion(version)
    .addBearerAuth({ in: 'header', type: 'http', bearerFormat: 'JWT' });

  if (description) config.setDescription(description);
  tags.forEach((tag) => config.addTag(tag.name, tag.description));

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(path, app, document);
};

/**
 * Add middleware to handle GraphQL uploads
 */
export const useGraphql = (
  app: NestExpressApplication,
  path = '/graphql',
  { maxFiles = 10, maxFileSize = 50_000_000 },
) => {
  app.use(path, graphqlUploadExpress({ maxFileSize, maxFiles }));
};

/**
 * Middleware to return 204 No Content for specific routes
 */
export const emptyContentMiddleware = (app: NestExpressApplication, routes = ['/', '/favicon.ico', '/robots.txt']) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (routes.includes(req.originalUrl)) res.status(204).end();
    else next();
  });
};

export const useCORS = (app: NestExpressApplication) => {
  app.enableCors({
    credentials: true,
    exposedHeaders: 'Content-Disposition',
    origin: (_origin, callback) => callback(null, true),
  });
};

export const useHelmet = (app: NestExpressApplication) => {
  app.use(
    helmet({
      crossOriginEmbedderPolicy: isProduction,
      contentSecurityPolicy: isProduction,
    }),
  );
};

/**
 * Middleware to handle class validation errors
 */
export const useValidationPipe = (app: NestExpressApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
      transform: true,
      forbidUnknownValues: false,
    }),
  );
};

/**
 * Middleware to handle exceptions globally
 */
export const useExceptionHandler = (app: NestExpressApplication) => {
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AppExceptionsFilter(httpAdapter));
};

interface AppInfo { port: number; prefix: string; swaggerPath: string; graphqlPath: string }
export const showAppInfo = (options: AppInfo) => {
  const baseUrl = `localhost:${options.port}`;

  const routes = [
    { name: 'Application', url: `http://${baseUrl}/${options.prefix}` },
    { name: 'Swagger', url: options.swaggerPath ? 'http://' + path.join(baseUrl, options.swaggerPath) : null },
    {
      name: 'GraphQL Playground',
      url: options.graphqlPath ? 'http://' + path.join(baseUrl, options.graphqlPath) : null,
    },
  ];

  signale.log();
  for (const route of routes) {
    if (route.url) signale.start(`🚀 ${route.name} is running on: \x1b[34m\x1b[4m${route.url}\x1b[0m`);
  }
  signale.log();
};

interface InitServerOptions {
  port?: number;
  prefix?: string;
  prefixExclude?: string[];
  swaggerPath?: string; // swagger path
  graphqlPath?: string; // graphql path
  useCommonConfig?: boolean;
}
export const initServer = (app: NestExpressApplication, options?: InitServerOptions) => {
  const {
    port = 3000,
    prefix = 'api',
    swaggerPath = '/swagger',
    graphqlPath = '/graphql',
    useCommonConfig = true,
  } = options ?? {};
  const { prefixExclude = [] } = options ?? {};

  app.setGlobalPrefix(prefix, { exclude: prefixExclude });
  app.enableShutdownHooks();

  if (useCommonConfig) {
    app.use(cookieParser());
    app.useBodyParser('json', { limit: '30mb' });

    emptyContentMiddleware(app);
    useCORS(app);
    useHelmet(app);
    useValidationPipe(app);
    useExceptionHandler(app);
    useSwagger(app);
    useGraphql(app, graphqlPath, { maxFiles: 10, maxFileSize: 50_000_000 });
  }

  void app.listen(port, () => showAppInfo({ port, prefix, swaggerPath, graphqlPath }));
};
