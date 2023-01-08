import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import messaging from 'firebase-admin/messaging';

@Injectable()
export class FirebaseService {
  async sendCloudMessageToDevice(notification: messaging.Notification, fcmToken: string) {
    return firebase.messaging().send({
      notification,
      token: fcmToken
    });
  }
}
