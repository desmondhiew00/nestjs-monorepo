import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@db/entities/user.entity';

import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [JobService],
  exports: [JobService]
})
export class JobModule {}
