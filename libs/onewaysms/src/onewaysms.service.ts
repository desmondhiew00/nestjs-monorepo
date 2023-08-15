import { Injectable } from '@nestjs/common';
import axios from 'axios';
import _ from 'lodash';

import type { OneWaySmsConfig, SendSmsData } from './type';

// const apiUrl = 'https://sgateway.onewaysms.com/apis10.aspx';

@Injectable()
export class OneWaySmsService {
  apiUrl = '';
  config: OneWaySmsConfig;

  constructor(config: OneWaySmsConfig) {
    this.config = config;
    this.apiUrl = process.env.ONEWAYSMS_URL;
  }

  async sendSms(data: SendSmsData, onError?: (err: Error) => void) {
    let errorCode: number;
    try {
      const res = await axios.get(this.apiUrl, {
        params: {
          ...this.config,
          apiusername: this.config.username,
          apipassword: this.config.password,
          languagetype: '1', // 1 = normal text, 2 = unicode
          mobileno: data.to, // 60121234567
          message: data.message,
          senderid: _.get(this.config, 'senderid') || 'onewaysms'
        }
      });

      errorCode = res.data as number;

      switch (errorCode) {
        case -100:
          throw new Error('apipassname or apipassword is invalid');
        case -200:
          throw new Error('senderid parameter is invalid');
        case -300:
          throw new Error('mobileno parameter is invalid');
        case -400:
          throw new Error('languagetype is invalid');
        case -500:
          throw new Error('Invalid characters in message');
        case -600:
          throw new Error('Insufficient credit balance');
        default:
          break;
      }

      return Promise.resolve(res.data);
    } catch (e) {
      onError?.(e);
      return Promise.reject(e);
    }
  }
}
