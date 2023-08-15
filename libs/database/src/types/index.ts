export * from './upload.type';
import type { NestjsQueryGraphqlModuleOpts } from '@nestjs-query/query-graphql/dist/src/module';
import { AuthData } from 'configs/auth.config';

export interface GqlCrudModuleConfig {
  imports?: NestjsQueryGraphqlModuleOpts['imports'];
  resolver?: Partial<NestjsQueryGraphqlModuleOpts['resolvers'][number]>;
  services?: NestjsQueryGraphqlModuleOpts['services'];
  assemblers?: NestjsQueryGraphqlModuleOpts['assemblers'];
  dtos?: NestjsQueryGraphqlModuleOpts['dtos'];
  pubSub?: NestjsQueryGraphqlModuleOpts['pubSub'];
  readOnly?: boolean;
}

export type AppContextReq = {
  headers: Record<string, string>;
  user: AuthData;
};

export type AppContext = {
  req: AppContextReq;
};
