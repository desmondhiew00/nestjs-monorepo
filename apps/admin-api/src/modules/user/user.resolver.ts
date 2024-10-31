import { Args, Info, Query, Resolver } from '@nestjs/graphql';

import { CreateFindManyResultType } from '@app/prisma';

import { FindManyUserArgs, FindUniqueUserArgs, User } from 'generated/graphql';
import { GraphQLResolveInfo } from 'graphql';

import { UseJwtAuthGuard } from '../auth';
import { UserService } from './user.service';

const UserManyResult = CreateFindManyResultType(User);

@UseJwtAuthGuard()
@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserManyResult)
  async users(@Args() args: FindManyUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.userService.users(args, info);
  }

  @Query(() => User, { nullable: true })
  async user(@Args() args: FindUniqueUserArgs, @Info() info: GraphQLResolveInfo) {
    return this.userService.user(args, info);
  }
}
