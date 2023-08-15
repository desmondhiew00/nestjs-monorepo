import Joi from 'joi';
import { S3ClientConfig } from '@aws-sdk/client-s3';

export const awsBaseSchema = {
  AWS_REGION: Joi.string().required().allow(''),
  AWS_ACCESS_KEY_ID: Joi.string().required().allow(''),
  AWS_SECRET_ACCESS_KEY: Joi.string().required().allow('')
};

export const awsBaseConfig = () => ({
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
});

/* --------------------------------- S3 Env --------------------------------- */

export const s3schema = {
  ...awsBaseSchema,
  AWS_S3_BUCKET: Joi.string().required().allow(''),
  AWS_S3_BUCKET_PREFIX: Joi.string().required().allow('')
};

export const AwsS3Env = () => ({
  ...awsBaseConfig(),
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_S3_BUCKET_PREFIX: process.env.AWS_S3_BUCKET_PREFIX
});

export const AwsS3Config = (): S3ClientConfig => {
  const env = AwsS3Env();
  return {
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
  };
};
