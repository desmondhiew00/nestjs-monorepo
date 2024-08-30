import { Prisma } from '@prisma/client';

export class PrismaError extends Error {
  constructor(error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientValidationError ||
      error instanceof Prisma.PrismaClientUnknownRequestError
    ) {
      const messages = error.message.split('\n');
      const errorMsg = messages[messages.length - 1];
      super(errorMsg);
    } else if (error instanceof Error) {
      super(error.message);
    } else {
      super('An unexpected error occurred');
    }
  }
}
