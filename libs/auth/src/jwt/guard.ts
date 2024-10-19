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
import { type Request } from "express";


export const generateJwtAuthGuard = (name: string) => {
  @Injectable()
  class JwtAuthGuard extends PassportGuard(name) {
    constructor() {
      super();
    }

    override async canActivate(context: ExecutionContext) {
      return (await super.canActivate(context)) as boolean;
    }

    override getRequest(context: ExecutionContext) {
      return getRequestFromContext(context);
    }
  }

  const UseJwtAuthGuard = () => {
    return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
  };

  const UseAuthUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = getRequestFromContext(ctx);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.user as any;
  });

  return { JwtAuthGuard, UseJwtAuthGuard, UseAuthUser };
};

export const getRequestFromContext = (context: ExecutionContext): Request => {
  if (context.getType<GqlContextType>() === 'graphql') {
    return GqlExecutionContext.create(context).getContext().req as Request;
  }
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest<Request>();
  }

  throw new BadRequestException('Unknown Context');
};
