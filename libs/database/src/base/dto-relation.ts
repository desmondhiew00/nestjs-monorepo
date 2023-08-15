import { applyDecorators } from '@nestjs/common';
import {
  FilterableOffsetConnection,
  FilterableRelation,
  FilterableUnPagedRelation,
  RelationDecoratorOpts,
  RelationTypeFunc
} from '@nestjs-query/query-graphql';

const RELATIONS_KEY = 'NESTJS_QUERY_DTO_RELATION_PROPERTY_NAME';

const DEFAULT_OPTIONS = {
  disableUpdate: true,
  disableRemove: true,
  nullable: true,
  maxResultsSize: -1
};

export const GqlHasOne = <Relation>(
  relationTypeFunc: RelationTypeFunc<Relation>,
  options?: RelationDecoratorOpts<Relation>
) => {
  return function (target: any, propertyKey: string) {
    const relations = target[RELATIONS_KEY] ?? [];

    const newRelation = FilterableRelation(propertyKey, relationTypeFunc, {
      ...DEFAULT_OPTIONS,
      ...options
    });

    target[RELATIONS_KEY] = [...relations, newRelation];
  };
};

export const GqlHasManyUnpaged = <Relation>(
  relationTypeFunc: RelationTypeFunc<Relation>,
  options?: RelationDecoratorOpts<Relation>
) => {
  return function (target: any, propertyKey: string) {
    const relations = target[RELATIONS_KEY] ?? [];

    const newRelation = FilterableUnPagedRelation(propertyKey, relationTypeFunc, {
      ...DEFAULT_OPTIONS,
      ...options
    });

    target[RELATIONS_KEY] = [...relations, newRelation];
  };
};

export const GqlHasManyOffset = <Relation>(
  relationTypeFunc: RelationTypeFunc<Relation>,
  options?: RelationDecoratorOpts<Relation>
) => {
  return function (target: any, propertyKey: string) {
    const relations = target[RELATIONS_KEY] ?? [];

    const newRelation = FilterableOffsetConnection(propertyKey, relationTypeFunc, {
      ...DEFAULT_OPTIONS,
      ...options
    });

    target[RELATIONS_KEY] = [...relations, newRelation];
  };
};

/**
 * Declare relation decorators
 * @param entity
 * @returns
 */
export const DTORelations = <Relation>(entity: RelationTypeFunc<Relation>) => {
  const nestjsQueryRelations = entity().prototype[RELATIONS_KEY] ?? [];
  return applyDecorators(...nestjsQueryRelations);
};
