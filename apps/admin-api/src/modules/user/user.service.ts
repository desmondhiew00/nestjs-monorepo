import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { FindManyUserArgs, FindUniqueUserArgs } from 'generated/graphql';
import { GraphQLResolveInfo } from 'graphql';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async users(args: FindManyUserArgs, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value['select'];
    const total = select.total ? await this.prisma.user.count({ where: args.where }) : 0;
    const data = await this.prisma.user.findMany({ ...args, ...select['data'] });
    return { total, data };
  }

  async user(args: FindUniqueUserArgs, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value['select'];
    return this.prisma.user.findUnique({ where: args.where, select });
  }
}
