// http://sms.onewaysms.com.my/api.pdf

export interface OneWaySmsConfig {
  username: string;
  password: string;
  senderid?: string;
}

export interface SendSmsData {
  to: string;
  message: string;
}
