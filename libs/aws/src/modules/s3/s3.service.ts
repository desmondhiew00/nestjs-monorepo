import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload/Upload.js';
import { nanoid } from 'nanoid';
import path from 'path';
import {
  CompleteMultipartUploadOutput,
  DeleteObjectCommand,
  GetObjectCommand,
  ObjectCannedACL,
  PutObjectRequest,
  S3Client
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl as awsGetSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AwsS3Config, AwsS3Env } from '@lib/aws/environment';

type UploadOptions = {
  filename: string;
  stream: PutObjectRequest['Body'];
  mimetype: string;
  document?: string;
  acl?: ObjectCannedACL;
};

@Injectable()
export class S3Service {
  constructor(
    private s3Client?: S3Client,
    private s3Bucket?: string,
    private region?: string,
    private buckerPrefix?: string
  ) {
    if (!s3Client) {
      const configuration = AwsS3Config();
      const env = AwsS3Env();

      this.s3Client = new S3Client(configuration);
      this.s3Bucket = env.AWS_S3_BUCKET;
      this.region = env.AWS_REGION;
      this.buckerPrefix = env.AWS_S3_BUCKET_PREFIX;
    }
  }

  getUrl(key: string) {
    return `https://${this.s3Bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  getKey(url: string) {
    return url.replace(`https://${this.s3Bucket}.s3.${this.region}.amazonaws.com/`, '');
  }

  getFilename(url: string) {
    // remove string after "?"
    const index = url.indexOf('?');
    if (index !== -1) url = url.substring(0, index);

    // remove domain url from string
    const domainRegex = /[^/]*\/\/[^/]*(\/.*)/;
    const domainMatch = url.match(domainRegex);
    const path = domainMatch ? domainMatch[1] : url;

    // get string after "-file-"
    const separateKey = '-file-';
    const filename = path.substring(path.indexOf(separateKey) + separateKey.length);
    return filename;
  }

  /**
   * @param key key of the file
   * @param expiresIn in seconds
   * @returns
   */
  async getSignedUrl(key: string, expiresIn = 300) {
    if (key.startsWith('https')) key = this.getKey(key);
    const command = new GetObjectCommand({ Key: key, Bucket: this.s3Bucket });
    const signedUrl = await awsGetSignedUrl(this.s3Client as any, command as any, { expiresIn });
    return signedUrl;
  }

  async upload(options: UploadOptions): Promise<CompleteMultipartUploadOutput> {
    const { filename, stream, mimetype, document, acl } = options;
    const key = path.join(this.buckerPrefix ?? '', document ?? '', `${nanoid(32)}-file-${filename}`);

    const parallelUploads3 = new Upload({
      client: this.s3Client,
      params: {
        Key: key,
        Body: stream,
        Bucket: this.s3Bucket,
        ContentType: mimetype,
        ACL: acl
      }
    });

    return await parallelUploads3.done();
  }

  async uploadGqlFile(
    file: FileUpload | Promise<FileUpload> | string,
    acl: ObjectCannedACL = ObjectCannedACL.public_read
  ) {
    if (typeof file === 'string') return { url: file };

    const { filename, mimetype, createReadStream } = await file;
    const stream = createReadStream();

    const { Location, Key } = await this.upload({
      filename,
      stream,
      mimetype,
      acl
    });
    return { filename, mimetype, url: Location, key: Key };
  }

  // Remove file from s3
  async deleteFile(key: string) {
    return await this.s3Client.send(new DeleteObjectCommand({ Key: key, Bucket: this.s3Bucket }));
  }
}
