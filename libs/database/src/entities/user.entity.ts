import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Column, Entity } from 'typeorm';

import { AppBaseEntity } from '../base/entity-base';

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

  /* ---------------------------------- Hooks --------------------------------- */
  // @BeforeInsert()
  // async hashPassword() {
  //   const authService = new AuthService();
  //   if (this.password) this.password = await authService.hashPassword(this.password);
  // }
}
