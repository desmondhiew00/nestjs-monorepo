import type { FileUpload } from 'graphql-upload/Upload';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { S3Service } from '@lib/aws';
import { UserEntity } from '@lib/database/entities/user.entity';
import { SendGridService } from '@lib/sendgrid';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(dataSource: DataSource, private s3Service: S3Service, private sendgridService: SendGridService) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    const { entity } = event;

    if (entity.avatar) {
      const { url } = await this.s3Service.uploadGqlFile(entity.avatar);
      entity.avatar = url;
    }
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>) {
    const entity = event.entity as UserEntity;

    if (entity.avatar) {
      const { url } = await this.s3Service.uploadGqlFile(entity.avatar as unknown as FileUpload);
      entity.avatar = url;
    }
  }
}
