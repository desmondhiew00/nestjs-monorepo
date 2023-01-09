import { Field, Int } from '@nestjs/graphql';
import { IDField } from '@nestjs-query/query-graphql';
import { AppDtoDecorators, DTORelations, GqlHasOne } from '@lib/database/base';

// Custom dto model
@DTORelations(() => UserDTO)
@AppDtoDecorators(() => UserDTO)
export class UserDTO {
  @IDField(() => Int)
  id: number;

  @Field()
  name: string;

  @GqlHasOne(() => UserDTO)
  creator: UserDTO;
}
