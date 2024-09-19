import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaService } from '@app/prisma';

@Injectable()
export class AdminApiService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  onModuleInit() {}

  getHello(): string {
    return 'Hello World!';
  }
}
