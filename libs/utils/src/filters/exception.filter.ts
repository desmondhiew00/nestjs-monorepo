import { ArgumentsHost, Catch, ForbiddenException, Logger, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { JsonWebTokenError } from 'jsonwebtoken';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { ForbiddenError } from '@casl/ability';

@Catch()
export class AppExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('Error');

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception, exception.stack);
    if (exception instanceof EntityNotFoundError) {
      exception = new NotFoundException('No Record Found');
    } else if (exception instanceof JsonWebTokenError) {
      exception = new ForbiddenException('Invalid Token');
    }
    // else if (typeof QueryFailedError) {
    //   if (
    //     exception.errno === 1452 &&
    //     String(exception?.sqlMessage).includes(
    //       'FOREIGN KEY (`countryId`) REFERENCES `countries` (`id`)',
    //     )
    //   ) {
    //     exception = new BadRequestException(
    //       `CountryId header '${COUNTRY_ID_HEADER_NAME}' cannot be empty`,
    //     );
    //   }
    // }
    const contextType = host.getType() as any;
    if (contextType === 'graphql') {
      return exception;
    }

    super.catch(exception, host);
  }
}

ForbiddenError.setDefaultMessage((error) => {
  const id = error?.subject?.id;
  return `Insufficient Permissions: ${error.action}-${error.subjectType}${id && `(id:${id})`}`;
});
