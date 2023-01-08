import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
// import { AppContext } from '@types';

export const FieldPermissionMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  // const req = ctx.context.req as AppContext['req'];

  // const { info } = ctx;
  // const { extensions } = info.parentType.getFields()[info.fieldName];

  const value = await next();
  return value;
};
