import { Injectable } from '@nestjs/common';
import type { FileUpload } from 'graphql-upload/Upload';
import { nanoid } from 'nanoid';
import path from 'path';
import { CompleteMultipartUploadOutput, PutObjectRequest, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class S3Service {
  constructor(private s3Client: S3Client) {}

  async upload(
    fileName: string,
    stream: PutObjectRequest['Body'],
    mimetype: string,
    document?: string
  ): Promise<CompleteMultipartUploadOutput> {
    const key = path.join(process.env.AWS_S3_BUCKET_PREFIX ?? '', document ?? '', `${nanoid(32)}-${fileName}`);

    const parallelUploads3 = new Upload({
      client: this.s3Client,
      params: {
        Key: key,
        Body: stream,
        Bucket: process.env.AWS_S3_BUCKET,
        ContentType: mimetype,
        ACL: 'public-read'
      }
    });

    return await parallelUploads3.done();
  }

  async uploadGqlFile(file: FileUpload | Promise<FileUpload> | string) {
    if (typeof file !== 'object') return { url: file };

    const { filename, mimetype, createReadStream } = await file;
    const stream = createReadStream();

    const { Location } = await this.upload(filename, stream, mimetype);
    return { filename, mimetype, url: Location };
  }
}
