import { S3ClientConfig } from '@aws-sdk/client-s3';

export const getS3Config = (): S3ClientConfig => ({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});
