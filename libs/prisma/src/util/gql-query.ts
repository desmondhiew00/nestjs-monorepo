/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Field, Int, ObjectType } from '@nestjs/graphql';

type Class = new (...args: unknown[]) => unknown;
export const CreateFindManyResultType = <TItem>(TItemClass: Class): Class => {
  @ObjectType({ isAbstract: true })
  class FindManyResultClass {
    @Field(() => Int)
    // @ts-ignore
    total: number;

    @Field(() => [TItemClass])
    // @ts-ignore
    data: TItem[];
  }

  Object.defineProperty(FindManyResultClass, 'name', {
    value: `${TItemClass.name}FindManyResult`,
  });
  return FindManyResultClass;
};
