import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import messaging from 'firebase-admin/messaging';

// reference: https://notifee.app/

@Injectable()
export class FirebaseMessagingService {
  messaging() {
    return firebase.messaging();
  }

  async send(message: messaging.Message, dryRun?: boolean) {
    return firebase.messaging().send(message, dryRun);
  }
}
