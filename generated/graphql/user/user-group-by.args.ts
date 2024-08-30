import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserOrderByWithAggregationInput } from './user-order-by-with-aggregation.input';
import { UserScalarFieldEnum } from './user-scalar-field.enum';
import { UserScalarWhereWithAggregatesInput } from './user-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UserGroupByArgs {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => [UserOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<UserOrderByWithAggregationInput>;

    @Field(() => [UserScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof UserScalarFieldEnum>;

    @Field(() => UserScalarWhereWithAggregatesInput, {nullable:true})
    having?: UserScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
