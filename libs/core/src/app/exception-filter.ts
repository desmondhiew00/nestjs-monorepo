import {
  ArgumentsHost,
  Catch,
  ForbiddenException,
  Logger,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { JsonWebTokenError } from 'jsonwebtoken';
import { get, isArray } from 'lodash';

import { PrismaError } from '../utils/prisma';

@Catch()
export class AppExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('Error');

  override catch(exception: Error | PreconditionFailedException, host: ArgumentsHost) {
    const contextType = host.getType() as unknown as string;
    let stack = true;
    let errorMessages = '';

    switch (exception.constructor) {
      case JsonWebTokenError:
        exception = new ForbiddenException('Invalid Token');
        break;
      case PreconditionFailedException:
        errorMessages = get(exception, 'response.message') ?? exception.message;
        if (isArray(errorMessages)) {
          exception = new PreconditionFailedException(JSON.stringify(errorMessages));
        }
        stack = false;
        break;
      case UnauthorizedException:
      case NotFoundException:
      case ForbiddenException:
        stack = false;
        break;
      default:
        break;
    }

    this.logger.error(exception, stack ? exception.stack : undefined);

    if (contextType === 'graphql') {
      throw new PrismaError(exception);
    }

    super.catch(exception, host);
  }
}
