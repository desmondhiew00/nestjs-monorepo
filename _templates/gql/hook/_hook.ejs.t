---
to: libs/database/src/graphql/<%= h.removeModuleExt(DTO_FILE) %>/<%= h.removeModuleExt(DTO_FILE) %>.hook.ts
---

import { Injectable } from '@nestjs/common';
import {
  BeforeCreateOneHook,
  BeforeDeleteOneHook,
  BeforeUpdateOneHook,
  CreateOneInputType,
  DeleteOneInputType,
  UpdateOneInputType
} from '@nestjs-query/query-graphql';
import { AppContext } from '@lib/database/types';

import { <%= h.dtoVar(DTO_FILE) %> } from './<%= h.removeExt(DTO_FILE) %>.dto';

@Injectable()
export class <%= h.pascalCase(h.moduleName(DTO_FILE)) %>CreateOneHook<T extends <%= h.dtoVar(DTO_FILE) %>> implements BeforeCreateOneHook<T, AppContext> {
  async run(instance: CreateOneInputType<T>, _context: AppContext): Promise<CreateOneInputType<T>> {
    return instance;
  }
}

@Injectable()
export class <%= h.pascalCase(h.moduleName(DTO_FILE)) %>UpdateOneHook<T extends <%= h.dtoVar(DTO_FILE) %>> implements BeforeUpdateOneHook<T, AppContext> {
  async run(instance: UpdateOneInputType<T>, _context: AppContext): Promise<UpdateOneInputType<T>> {
    return instance;
  }
}

@Injectable()
export class <%= h.pascalCase(h.moduleName(DTO_FILE)) %>DeleteOneHook implements BeforeDeleteOneHook<AppContext> {
  async run(instance: DeleteOneInputType, _context: AppContext): Promise<DeleteOneInputType> {
    return instance;
  }
}
