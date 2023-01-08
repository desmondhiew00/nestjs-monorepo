import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

export class GqlModule {
  static forRoot(config?: ApolloDriverConfig) {
    return GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: false,
      debug: true,
      ...config
    });
  }
}
