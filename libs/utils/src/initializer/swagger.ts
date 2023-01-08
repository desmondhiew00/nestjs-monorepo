import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface InitSwaggerConfig {
  title: string;
  description?: string;
  path?: string; // swagger url
  version?: string;
  tags?: { name: string; description?: string }[];
}

export const initSwagger = (app: INestApplication, configs: InitSwaggerConfig) => {
  const { title, description, path = 'api', version = '1.0', tags = [] } = configs || {};

  const config = new DocumentBuilder();

  config.setTitle(title);
  if (description) config.setDescription(description);

  tags.map((tag) => {
    config.addTag(tag.name, tag.description);
  });

  config.setVersion(version);
  config.addBearerAuth({ in: 'header', type: 'http', bearerFormat: 'JWT' });

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(path, app, document);

  return { path, version, title, description };
};

export default initSwagger;
