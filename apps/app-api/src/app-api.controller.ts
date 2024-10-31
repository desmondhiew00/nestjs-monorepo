import { Controller, Get } from '@nestjs/common';

import { AppApiService } from './app-api.service';

@Controller()
export class AppApiController {
  constructor(private readonly appApiService: AppApiService) {}

  @Get()
  getHello(): string {
    return this.appApiService.getHello();
  }
}
