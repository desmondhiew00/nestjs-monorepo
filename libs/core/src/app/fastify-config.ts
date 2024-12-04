import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import compress from '@fastify/compress';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { NextFunction } from 'express';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as signale from 'signale';

export class FastifyConfig {
  private port = 3000;
  private prefix = '';
  private swaggerPath = '/graphql';
  private graphqlPath = '';

  constructor(
    private readonly app: NestFastifyApplication,
    prefix = 'api',
  ) {
    this.prefix = prefix;
    this.init();
  }

  private init() {
    // Global pipes for validation errors
    this.app.useGlobalPipes(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
        transform: true,
        forbidUnknownValues: false,
      }),
    );

    // Middleware to return 204 No Content for specific routes
    this.emptyContentMiddleware();
  }

  /**
   * Middleware to return 204 No Content for specific routes
   */
  private emptyContentMiddleware(routes = ['/', '/favicon.ico', '/robots.txt']) {
    this.app.use((req: FastifyRequest, reply: FastifyReply, next: NextFunction) => {
      console.log('req.url: ', req.url);
      if (routes.includes(req.url)) {
        console.log('204');
        reply.status(204).send();
      } else {
        next();
      }
    });
  }

  async useHelmet() {
    await this.app.register(helmet, {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production',
      contentSecurityPolicy: process.env.NODE_ENV === 'production',
    });
  }

  async useCompress() {
    await this.app.register(compress);
  }

  async useCors() {
    await this.app.register(cors, {
      origin: (_origin, callback) => callback(null, true),
      credentials: true,
      exposedHeaders: 'Content-Disposition',
    });
  }

  useSwagger(options: SwaggerOptions = {}) {
    const { title = 'API', version = '1.0', description, tags = [], path = '/swagger' } = options;
    const config = new DocumentBuilder()
      .setTitle(title)
      .setVersion(version)
      .addBearerAuth({ in: 'header', type: 'http', bearerFormat: 'JWT' });

    if (description) config.setDescription(description);
    tags.forEach((tag) => config.addTag(tag.name, tag.description));

    const document = SwaggerModule.createDocument(this.app, config.build());
    SwaggerModule.setup(path, this.app, document);

    this.swaggerPath = path;
  }

  showAppInfo() {
    const routes = [];
    routes.push({ name: 'Application', url: `http://localhost:${this.port}/${this.prefix}` });
    if (this.swaggerPath) routes.push({ name: 'Swagger', url: `http://localhost:${this.port}${this.swaggerPath}` });
    if (this.graphqlPath)
      routes.push({ name: 'GraphQL Playground', url: `http://localhost:${this.port}${this.graphqlPath}` });

    signale.log();
    for (const route of routes) {
      if (route.url) signale.start(`🚀 ${route.name} is running on: \x1b[34m\x1b[4m${route.url}\x1b[0m`);
    }
    signale.log();
  }

  async start() {
    const configService = this.app.get(ConfigService);
    this.port = Number(configService.get('PORT')) || 3000;
    if (this.prefix) this.app.setGlobalPrefix(this.prefix);
    await this.app.listen(this.port, '0.0.0.0');

    this.showAppInfo();
  }
}

interface SwaggerOptions {
  title?: string;
  version?: string;
  description?: string;
  tags?: { name: string; description?: string }[];
  path?: string;
}
