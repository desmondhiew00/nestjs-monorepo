import { registerEnumType } from '@nestjs/graphql';

export enum RelationLoadStrategy {
    query = "query",
    join = "join"
}


registerEnumType(RelationLoadStrategy, { name: 'RelationLoadStrategy', description: undefined })
