import { GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

/**
 * @IDField @Field @FilterableField Gql schema
 * @Column TypeORM schema
 */
@ObjectType()
export class AppBaseEntity extends BaseEntity {
  @IDField(() => Int)
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /* --------------------------------- Records -------------------------------- */
  @FilterableField({ nullable: true })
  @Column('int', { nullable: true, unsigned: true })
  createdBy: number;

  @FilterableField({ nullable: true })
  @Column('int', { nullable: true, unsigned: true })
  updatedBy: number;

  @Column('int', { nullable: true, unsigned: true })
  deletedBy: number;

  /* ------------------------------- Timestamps ------------------------------- */
  @FilterableField(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
