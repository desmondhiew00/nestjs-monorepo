import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AdminApiResolver {
  @Query(() => String)
  hello() {
    return 'hello';
  }
}
