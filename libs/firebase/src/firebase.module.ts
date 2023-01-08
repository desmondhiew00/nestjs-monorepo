import { DynamicModule, Global, Module } from '@nestjs/common';
import firebase from 'firebase-admin';

import { FirebaseService } from './firebase.service';

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(options: firebase.AppOptions): DynamicModule {
    firebase.initializeApp(options);

    return {
      module: FirebaseModule,
      providers: [
        {
          provide: FirebaseService,
          useValue: new FirebaseService()
        }
      ],
      exports: [FirebaseService]
    };
  }
}
