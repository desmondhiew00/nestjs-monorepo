import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '@db/entities/user.entity';
import { UserDTO } from '@db/entities/user.entity';

import { AuthUser, UseJwtAuthGuard } from '../../decorators/auth.decorator';
import type { AuthData } from '../../types';
import { UserService } from './user.service';

@UseJwtAuthGuard()
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDTO])
  async getUsers() {
    return this.userService.list();
  }

  @Mutation(() => UserDTO)
  async createOneUser(@Args('input') input: CreateUserDto, @AuthUser() user: AuthData) {
    return await this.userService.create(input, user);
  }
}
