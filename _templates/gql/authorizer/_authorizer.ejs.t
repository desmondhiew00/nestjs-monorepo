---
to: libs/database/src/graphql/<%= h.kebabCase(h.singular(NAME)) %>/<%= h.kebabCase(h.singular(NAME)) %>.authorizer.ts
---

import { Injectable } from '@nestjs/common';
import { Filter } from '@nestjs-query/core';
import { AuthorizationContext, CustomAuthorizer } from '@nestjs-query/query-graphql';
import { AppContext } from '@lib/database/types';

import { <%= h.dtoVar(DTO_FILE) %> } from './<%= h.removeExt(DTO_FILE) %>.dto';

@Injectable()
export class <%= h.parseAuthorizerName(NAME) %> implements CustomAuthorizer<<%= h.dtoVar(DTO_FILE) %>> {
  async authorize(_context: AppContext, _authorizerContext?: AuthorizationContext): Promise<Filter<<%= h.dtoVar(DTO_FILE) %>>> {
    return {};
  }

  async authorizeRelation(_relationName: string, _context: AppContext): Promise<Filter<<%= h.dtoVar(DTO_FILE) %>>> {
    return {};
  }
}
