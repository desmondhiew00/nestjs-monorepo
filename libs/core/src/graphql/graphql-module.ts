import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { Prisma } from '@prisma/client';
import { DynamicClientExtensionThis } from '@prisma/client/runtime/library';

export class GqlModule {
  static forRoot(
    prisma: DynamicClientExtensionThis<Prisma.TypeMap<any, any>, Prisma.TypeMapCb, object, object>,
    config?: ApolloDriverConfig,
  ) {
    return GraphQLModule.forRoot<ApolloDriverConfig>({
      path: '/graphql',
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      sortSchema: false,
      csrfPrevention: false,
      introspection: true,
      context: ({ req, res }: never) => ({ req, res, prisma }),
      formatError: (error) => {
        const { isArray, data } = isJsonArray<string>(error.message);
        return { message: isArray ? data ?? "Error" : error.message };
      },
      ...config,
    });
  }
}

const isJsonArray = <T>(value: string) => {
  try {
    const data = JSON.parse(value) as T;
    return { isArray: Array.isArray(data), data };
  } catch {
    return { isArray: false, data: null };
  }
};
