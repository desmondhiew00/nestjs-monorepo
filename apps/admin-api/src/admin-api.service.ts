import { PrismaService } from '@app/prisma';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AdminApiService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  onModuleInit() {}

  getHello(): string {
    return 'Hello World!';
  }
}
