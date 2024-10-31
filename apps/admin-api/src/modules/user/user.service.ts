import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma';

import { PrismaSelect } from '@paljs/plugins';
import { Prisma } from '@prisma/client';
import { FindManyUserArgs, FindUniqueUserArgs } from 'generated/graphql';
import { GraphQLResolveInfo } from 'graphql';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async users(args: FindManyUserArgs, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value.select as Record<string, any>;
    const total: number = select.total ? (await this.prisma.user.count({ where: args.where })) || 0 : 0;
    const data = await this.prisma.user.findMany({ ...args, select: select.data as Prisma.UserSelect });
    return { total, data };
  }

  async user(args: FindUniqueUserArgs, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value.select as object;
    return this.prisma.user.findUnique({ where: args.where, select });
  }

  // Sample Concurrency Control
  // private async updateAdmin(id: number) {
  //   const currentProcess = this.processingCount;
  //   this.processingCount++;

  //   const admin = await this.prisma.admin.findUnique({ where: { id } });
  //   console.log(`Current: ${admin?.createdById}`);
  //   await new Promise((rs) => setTimeout(rs, 3000));
  //   const count = (admin?.createdById || 0) + 1 + currentProcess;
  //   await this.prisma.admin.update({ where: { id }, data: { createdById: count } });
  //   console.log(`Updated to ${count}`);

  //   this.processingCount--;
  // }

  // @Post('/test-concurrency-update')
  // async testConcurrencyUpdate() {
  //   this.updateAdmin(3);
  // }
}
