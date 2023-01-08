import { DynamicModule, Global, Module } from '@nestjs/common';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

import { S3Service } from './s3.service';

@Global()
@Module({})
export class S3Module {
  static forRoot(configuration: S3ClientConfig): DynamicModule {
    const s3Client = new S3Client(configuration);

    // if (isProduction) {
    //   s3Client.send(new ListBucketsCommand({})).then(() => {
    //     new Logger(S3Module.name).log('AWS S3 Connected');
    //   });
    // }

    return {
      module: S3Module,
      providers: [{ provide: S3Service, useValue: new S3Service(s3Client) }],
      exports: [S3Service]
    };
  }
}
