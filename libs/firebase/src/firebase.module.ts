import { DynamicModule, Global, Module } from '@nestjs/common';
import firebase from 'firebase-admin';

import { FirebaseMessagingService } from './firebase.service';

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(options: firebase.AppOptions): DynamicModule {
    firebase.initializeApp(options);

    return {
      module: FirebaseModule,
      providers: [
        {
          provide: FirebaseMessagingService,
          useValue: new FirebaseMessagingService()
        }
      ],
      exports: [FirebaseMessagingService]
    };
  }
}
