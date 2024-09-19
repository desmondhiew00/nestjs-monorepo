import { Module } from '@nestjs/common';

import { PostModelResolver, UserModelResolver } from './model.resolver';

@Module({
  providers: [UserModelResolver, PostModelResolver],
})
export class ModelModule {}
