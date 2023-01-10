import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import * as V from 'class-validator';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/Upload.js';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AppDtoDecorators } from '../base/dto-base';
import { DTORelations, GqlHasOne } from '../base/dto-relation';
import { AppBaseEntity } from '../base/entity-base';
import type { CrudResolverConfig } from '../types';

/**
 * @ObjectType GraphQL schema object
 * @Field GraphQL schema field
 *
 * @Entity TypeORM schema object
 * @Column TypeORM schema field
 */
@ObjectType('User')
@Entity({ name: 'user' })
export class UserEntity extends AppBaseEntity {
  @FilterableField()
  @Column({ length: 50 })
  email: string;

  @FilterableField()
  @Column({ length: 150 })
  name: string;

  // @FilterableField({ nullable: true })
  @Column({ length: 20, nullable: true })
  phoneNo: string;

  @Column()
  password: string;

  @Field()
  @Column({ length: 255, nullable: true })
  avatar: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  fcmToken: string;

  @Column('text', { nullable: true })
  forgotPasswordToken: string;

  @FilterableField()
  @Column('boolean', { default: true })
  active: boolean;

  /* -------------------------------- Relations ------------------------------- */

  @GqlHasOne(() => UserDTO)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdBy' })
  creator: UserEntity;

  /* ---------------------------------- Hooks --------------------------------- */
  // @BeforeInsert()
  // async hashPassword() {
  //   const authService = new AuthService();
  //   if (this.password) this.password = await authService.hashPassword(this.password);
  // }
}

/* ----------------------------------- DTO ---------------------------------- */

@InputType()
export class CreateUserDto {
  @V.IsEmail()
  @Field()
  email: string;

  @V.IsOptional()
  @V.IsString()
  @Field()
  name: string;

  @V.IsOptional()
  @V.IsString()
  @Field({ nullable: true })
  password: string;

  @V.IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  avatar?: FileUpload | string;
}

@InputType()
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {}

@DTORelations(() => UserDTO)
@AppDtoDecorators(() => UserDTO)
export class UserDTO extends UserEntity {}

export class UserCrudResolver {
  static forFeature(config?: CrudResolverConfig) {
    const { resolver = {}, imports = [], services = [] } = config || {};
    return NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity]), ...imports],
      services,
      resolvers: [
        {
          DTOClass: UserDTO,
          EntityClass: UserEntity,
          CreateDTOClass: CreateUserDto,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          ...resolver
        }
      ]
    });
  }
}
