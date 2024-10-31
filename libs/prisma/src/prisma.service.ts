import { Injectable, type OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { SoftDeleteExtension } from './extensions/soft-delete.extension';
import { useQueryLogger } from './util/query-logger';

const client = new PrismaClient({
  log: [{ emit: 'event', level: 'query' }],
});
useQueryLogger(client);

export const prismaClient = client.$extends(SoftDeleteExtension);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  readonly extendedClient = prismaClient;

  constructor() {
    super({ datasourceUrl: '', datasources: { db: { url: '' } } });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new Proxy(this, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      get: (target: any, key: string) => Reflect.get(key in prismaClient ? prismaClient : target, key),
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
