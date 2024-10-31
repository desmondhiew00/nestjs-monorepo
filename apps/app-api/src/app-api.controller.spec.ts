import { Test, TestingModule } from '@nestjs/testing';

import { AppApiController } from './app-api.controller';
import { AppApiService } from './app-api.service';

describe('AppApiController', () => {
  let appApiController: AppApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppApiController],
      providers: [AppApiService],
    }).compile();

    appApiController = app.get<AppApiController>(AppApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appApiController.getHello()).toBe('Hello World!');
    });
  });
});
