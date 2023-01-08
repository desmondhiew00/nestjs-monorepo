import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserDto, UserDTO } from '@db/dto/user.dto';

import { AuthUser, UseJwtAuthGuard } from '../../decorators/auth.decorator';
import { AuthData } from '../../types';
import { AuthService } from './auth.service';
import { ChangePasswordDto, ChangePasswordInput } from './dto/auth.dto';

@UseJwtAuthGuard()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ChangePasswordDto)
  async changePassword(@Args('input') input: ChangePasswordInput, @AuthUser() authUser: AuthData) {
    return await this.authService.changePassword(input, authUser);
  }

  @Query(() => UserDTO)
  async getMyProfile(@AuthUser() authUser: AuthData) {
    return await this.authService.getAuthUserData(authUser);
  }

  @Mutation(() => UserDTO)
  async updateMyProfile(@Args('input') input: UpdateUserDto, @AuthUser() authUser: AuthData) {
    return await this.authService.updateProfile(input, authUser);
  }
}
