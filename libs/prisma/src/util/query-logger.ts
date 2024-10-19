import type { PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import { Signale } from 'signale';

const log = new Signale({
  types: {
    query: {
      badge: '▶',
      color: 'blue',
      label: 'query',
      logLevel: 'info',
    },
  },
});

export const useQueryLogger = (client: PrismaClient<any, 'query', DefaultArgs>) => {
  client.$on('query', (e) => {
    if (process.env.PRISMA_LOG === 'true') {
      console.info();
      log.query(`\x1b[90m\x1b[4m${e.query}\x1b[0m`);
      console.info(`\x1b[34mParams\x1b[0m: ${e.params}  \x1b[32mDuration\x1b[0m: ${e.duration} ms\n`);
    }
  });
};
