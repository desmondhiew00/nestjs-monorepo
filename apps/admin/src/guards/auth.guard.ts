import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportGuard } from '@nestjs/passport';
import { strategy } from '../modules/auth/strategies/jwt.strategy';

@Injectable()
export class JwtAuthGuard extends PassportGuard(strategy.jwt) {
  getRequest(context: any) {
    return getRequestFromContext(context);
  }
}

@Injectable()
export class GqlJwtAuthGuard extends JwtAuthGuard {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    return (await super.canActivate(context)) as boolean;
  }
}

/* ---------------------------- Helper Functions ---------------------------- */

export const getRequestFromContext = (context: ExecutionContext) => {
  if (context.getType<GqlContextType>() === 'graphql') {
    return GqlExecutionContext.create(context).getContext().req;
  }
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest();
  }

  throw new BadRequestException('Unknown Context');
};
