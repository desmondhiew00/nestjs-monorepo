import { DynamicModule, Global, Module } from '@nestjs/common';

import { AwsS3Service, S3UploadConfig } from './aws-s3.service';

@Global()
@Module({})
export class AwsS3Module {
  static forRoot(config: S3UploadConfig): DynamicModule {
    return {
      module: AwsS3Module,
      providers: [
        {
          provide: AwsS3Service,
          useValue: new AwsS3Service(config),
        },
      ],
      exports: [AwsS3Service],
    };
  }
}
