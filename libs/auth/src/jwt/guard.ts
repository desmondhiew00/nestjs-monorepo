import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export const generateJwtAuthGuard = (name: string) => {
  @Injectable()
  class JwtAuthGuard extends PassportGuard(name) {
    constructor() {
      super();
    }

    override async canActivate(context: ExecutionContext) {
      return (await super.canActivate(context)) as boolean;
    }

    override getRequest(context: any) {
      return getRequestFromContext(context);
    }
  }

  const UseJwtAuthGuard = () => {
    return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
  };

  const UseAuthUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = getRequestFromContext(ctx);
    return request.user;
  });

  return { JwtAuthGuard, UseJwtAuthGuard, UseAuthUser };
};

export const getRequestFromContext = (context: ExecutionContext) => {
  if (context.getType<GqlContextType>() === 'graphql') {
    return GqlExecutionContext.create(context).getContext().req;
  }
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest();
  }

  throw new BadRequestException('Unknown Context');
};
