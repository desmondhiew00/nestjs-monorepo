import { Module } from '@nestjs/common';

import { AppApiController } from './app-api.controller';
import { AppApiService } from './app-api.service';

@Module({
  imports: [],
  controllers: [AppApiController],
  providers: [AppApiService],
})
export class AppApiModule {}
