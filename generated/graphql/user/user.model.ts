import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Post } from '../post/post.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [Post], {nullable:true})
    posts?: Array<Post>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
