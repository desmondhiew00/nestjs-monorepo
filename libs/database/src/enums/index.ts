import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF'
}

registerEnumType(UserType, { name: 'UserType' });
