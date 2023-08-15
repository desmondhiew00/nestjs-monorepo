import { DynamicModule, Global, Module } from '@nestjs/common';
import EnvConfigModule from 'configs/env-config';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

import { AwsS3Config, AwsS3Env } from '../../environment';
import { S3Service } from './s3.service';

@Global()
@Module({})
export class AwsS3Module {
  static forRoot(config?: S3ClientConfig, bucket?: string, region?: string, prefix?: string): DynamicModule {
    const configuration = config || AwsS3Config();
    const s3Client = new S3Client(configuration);

    const env = AwsS3Env();
    const s3Bucket = bucket || env.AWS_S3_BUCKET;
    const s3Region = region || env.AWS_REGION;
    const s3BucketPrefix = prefix || env.AWS_S3_BUCKET_PREFIX;

    // if (isProduction) {
    //   s3Client.send(new ListBucketsCommand({})).then(() => {
    //     new Logger(S3Module.name).log('AWS S3 Connected');
    //   });
    // }

    return {
      imports: [EnvConfigModule.forRoot(['aws-s3'])],
      module: AwsS3Module,
      providers: [{ provide: S3Service, useValue: new S3Service(s3Client, s3Bucket, s3Region, s3BucketPrefix) }],
      exports: [S3Service]
    };
  }
}
