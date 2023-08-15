import { applyDecorators } from '@nestjs/common';
import { ObjectType } from '@nestjs/graphql';
import { PagingStrategies } from '@nestjs-query/query-graphql';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  BeforeUpdateMany,
  BeforeUpdateOne,
  QueryOptions,
  RelationTypeFunc
} from '@nestjs-query/query-graphql';
import { QueryOptionsDecoratorOpts } from '@nestjs-query/query-graphql/dist/src/decorators';

import { CreatedByManyHook, CreatedByOneHook, UpdatedByManyHook, UpdatedByOneHook } from './dto-hook';
import { DTORelations } from './dto-relation';

export const DEFAULT_QUERY_OPTIONS = {
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1
};

/**
 * Apply query option, hooks decorator
 * @param entity
 * @returns
 */
export const DTOBaseDecorators = <Relation>(
  entity: RelationTypeFunc<Relation>,
  queryOptions?: QueryOptionsDecoratorOpts<Relation>
) => {
  return applyDecorators(
    DTORelations(entity),
    ObjectType(entity().name.replace('DTO', '')),
    QueryOptions({ ...DEFAULT_QUERY_OPTIONS, ...(queryOptions || {}) }),
    BeforeCreateOne(CreatedByOneHook),
    BeforeCreateMany(CreatedByManyHook),
    BeforeUpdateOne(UpdatedByOneHook),
    BeforeUpdateMany(UpdatedByManyHook)
  );
};
