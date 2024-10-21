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

import type { Request } from 'express';

import { JWT_AUTH_NAME } from '../../config';

export interface AuthData {
  id: number;
  email: string;
}

@Injectable()
export class JwtAuthGuard extends PassportGuard(JWT_AUTH_NAME) {
  constructor() {
    super();
  }

  override async canActivate(context: ExecutionContext) {
    return (await super.canActivate(context)) as boolean;
  }

  override getRequest(context: ExecutionContext): Request {
    return getRequestFromContext(context);
  }
}

export const UseJwtAuthGuard = () => {
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
};

export const UseAuthData = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = getRequestFromContext(ctx);
  return request.user;
});

const getRequestFromContext = (context: ExecutionContext): Request => {
  if (context.getType<GqlContextType>() === 'graphql') {
    return GqlExecutionContext.create(context).getContext().req as Request;
  }
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest<Request>();
  }

  throw new BadRequestException('Unknown Context');
};
