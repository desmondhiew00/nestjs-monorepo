import type { NestjsQueryGraphqlModuleOpts } from '@nestjs-query/query-graphql/dist/src/module';

export interface CrudResolverConfig {
  imports?: NestjsQueryGraphqlModuleOpts['imports'];
  resolver?: Partial<NestjsQueryGraphqlModuleOpts['resolvers'][number]>;
  subscriber?: boolean;
}
