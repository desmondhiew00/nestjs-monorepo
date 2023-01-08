import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/Upload.js';
import { UserDTO, UserEntity } from '@db/entities/user.entity';
import { UserSubscriber } from '@db/subscribers/user.subscriber';

import type { CrudResolverConfig } from '../types';

/* -------------------------------- CRUD Dto -------------------------------- */

/**
 * @InputType GraphQL input object type.
 * @Field GraphQL input field.
 * @ApiProperty Swagger field type.
 *
 * Field validator: import from 'class-validator'
 */
@InputType()
export class CreateUserDto {
  @IsEmail()
  @Field()
  email: string;

  @IsOptional()
  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  password: string;

  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  avatar?: FileUpload | string;
}

@InputType()
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {}

/* -------------------------- GraphQL CRUD Resolver ------------------------- */

export const UserCrudResolver = (config?: CrudResolverConfig) => {
  const { subscriber = true, resolver = {}, imports = [] } = config || {};

  const services = [];
  if (subscriber) services.push(UserSubscriber);

  return NestjsQueryGraphQLModule.forFeature({
    imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity]), ...imports],
    services,
    resolvers: [
      {
        DTOClass: UserDTO,
        EntityClass: UserEntity,
        UpdateDTOClass: UpdateUserDto,
        create: { disabled: true },
        ...resolver
      }
    ]
  });
};
