import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Post, User } from 'generated/graphql';

@Resolver(User)
export class UserModelResolver {
  @ResolveField(() => String)
  async name(@Parent() parent: User) {
    return '[user]]: ' + parent.name;
  }
}

@Resolver(Post)
export class PostModelResolver {
  @ResolveField(() => String)
  async title(@Parent() parent: Post) {
    return '[post]]: ' + parent.title;
  }
}
