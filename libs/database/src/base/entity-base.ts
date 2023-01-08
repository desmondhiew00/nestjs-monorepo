import { GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
// import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
// import { GqlHasOne } from './dto-relation';

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
  @Column({ nullable: true, unsigned: true, zerofill: false })
  createdBy: number;

  @FilterableField({ nullable: true })
  @Column({ nullable: true, unsigned: true, zerofill: false })
  updatedBy: number;

  @Column({ nullable: true, unsigned: true, zerofill: false })
  deletedBy: number;

  /* ------------------------------- Timestamps ------------------------------- */
  @FilterableField(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /* -------------------------------- Relations ------------------------------- */

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdBy' })
  creator: UserEntity;
}
