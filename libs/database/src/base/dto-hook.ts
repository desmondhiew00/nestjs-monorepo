import { applyDecorators, Injectable } from '@nestjs/common';
import {
  BeforeCreateMany,
  BeforeCreateManyHook,
  BeforeCreateOne,
  BeforeCreateOneHook,
  BeforeUpdateMany,
  BeforeUpdateManyHook,
  BeforeUpdateOne,
  BeforeUpdateOneHook,
  CreateManyInputType,
  CreateOneInputType,
  UpdateManyInputType,
  UpdateOneInputType
} from '@nestjs-query/query-graphql';
import _ from 'lodash';

type AppContext = any;

interface CreatedBy {
  createdBy: number;
  countryId: number;
}

interface UpdatedBy {
  updatedBy: number;
}

const getActionById = (context: any) => _.get(context, 'req.user.id');
const getAuthUserCountryCode = (context: any) => _.get(context, 'req.user.countryCode');

@Injectable()
export class CreatedByOneHook<T extends CreatedBy> implements BeforeCreateOneHook<T, AppContext> {
  async run(instance: CreateOneInputType<T>, context: AppContext): Promise<CreateOneInputType<T>> {
    const actionBy = getActionById(context);
    const countryCode = getAuthUserCountryCode(context);
    if (actionBy) instance.input = { ...instance.input, createdBy: actionBy };
    if (countryCode) instance.input = { ...instance.input, countryCode };
    return instance;
  }
}

@Injectable()
export class CreatedByManyHook<T extends CreatedBy> implements BeforeCreateManyHook<T, AppContext> {
  async run(instance: CreateManyInputType<T>, context: AppContext): Promise<CreateManyInputType<T>> {
    const actionBy = getActionById(context);
    if (actionBy) {
      instance.input = instance.input.map((input) => ({
        ...input,
        createdBy: actionBy
      }));
    }
    return instance;
  }
}

@Injectable()
export class UpdatedByOneHook<T extends UpdatedBy> implements BeforeUpdateOneHook<T, AppContext> {
  async run(instance: UpdateOneInputType<T>, context): Promise<UpdateOneInputType<T>> {
    const actionBy = getActionById(context);
    if (actionBy) instance.update.updatedBy = actionBy;
    return instance;
  }
}

@Injectable()
export class UpdatedByManyHook<T extends UpdatedBy> implements BeforeUpdateManyHook<T, any, AppContext> {
  async run(instance: UpdateManyInputType<T, T>, context: AppContext): Promise<UpdateManyInputType<T, T>> {
    const actionBy = getActionById(context);
    if (actionBy) instance.update.updatedBy = actionBy;
    return instance;
  }
}

export const UseAppHooks = () => {
  return applyDecorators(
    BeforeCreateOne(CreatedByOneHook),
    BeforeCreateMany(CreatedByManyHook),
    BeforeUpdateOne(UpdatedByOneHook),
    BeforeUpdateMany(UpdatedByManyHook)
  );
};
