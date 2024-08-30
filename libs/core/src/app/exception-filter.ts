import { ArgumentsHost, Catch, ForbiddenException, Logger, PreconditionFailedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { JsonWebTokenError } from 'jsonwebtoken';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { PrismaError } from '../utils/prisma';

@Catch()
export class AppExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('Error');

  override catch(exception: Error | PreconditionFailedException, host: ArgumentsHost) {
    this.logger.error(exception, exception.stack);
    const contextType = host.getType() as string;

    if (exception instanceof JsonWebTokenError) {
      exception = new ForbiddenException('Invalid Token');
    }

    if (exception instanceof PreconditionFailedException) {
      const errorMessages = get(exception, 'response.message') || exception.message;
      if (isArray(errorMessages)) return new Error(JSON.stringify(errorMessages));
      return new Error(exception.message);
    }

    if (contextType === 'graphql') {
      return new PrismaError(exception);
    }

    super.catch(exception, host);
  }
}
