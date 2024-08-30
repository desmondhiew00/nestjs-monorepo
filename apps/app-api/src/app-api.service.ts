import { Injectable } from '@nestjs/common';

@Injectable()
export class AppApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
