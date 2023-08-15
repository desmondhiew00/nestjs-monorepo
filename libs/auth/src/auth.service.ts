import { Injectable } from '@nestjs/common';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import _ from 'lodash';
import { LoggerService } from '@lib/logger';

interface SocialUser {
  id: string;
  name: string;
  picture: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private logger: LoggerService) {}

  async validateFacebookToken(token: string) {
    // const appId = process.env.FACEBOOK_APP_ID;
    // const appSecret = process.env.FACEBOOK_APP_SECRET;
    // const tokenResponse = await axios.get(
    //   `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`
    // );
    // if (!tokenResponse.data || !tokenResponse.data.data.is_valid) throw new Error('Invalid access token');

    // // Get the user's profile information
    // const userId = tokenResponse.data.data.user_id;
    // const fields = 'id,name,email';
    // const profileResponse = await axios.get(
    //   `https://graph.facebook.com/${userId}?fields=${fields}&access_token=${accessToken}`
    // );
    // if (!profileResponse.data) throw new Error('Invalid access token');

    // const user = {
    //   id: profileResponse.data.id,
    //   name: profileResponse.data.name,
    //   email: profileResponse.data.email
    // };

    const response = await axios.get('https://graph.facebook.com/me', {
      params: { access_token: token, fields: 'id, name, picture, email' }
    });
    if (!response) throw new Error('Invalid access token');

    const user: SocialUser = {
      id: _.get(response.data, 'id'),
      name: _.get(response.data, 'name'),
      picture: _.get(response.data, 'picture.data.url'),
      email: _.get(response.data, 'email')
    };

    return { user, token };
  }

  async validateGoogleToken(token: string) {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        params: { alt: 'json', access_token: token }
      });

      const user: SocialUser = {
        id: _.get(response.data, 'id'),
        name: _.get(response.data, 'name'),
        picture: _.get(response.data, 'picture'),
        email: _.get(response.data, 'email')
      };

      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw new Error('Invalid access token');
    }
  }

  async validateAppleToken(token: string) {
    if (!process.env.APPLE_BUNDLE_ID) throw new Error('Missing APPLE_BUNDLE_ID environment variable');

    const appleJwksClient = jwksClient({ jwksUri: 'https://appleid.apple.com/auth/keys' });
    const decodedToken: any = jwt.decode(token, { complete: true });
    if (!decodedToken) throw new Error('Invalid identity token');

    const key = await appleJwksClient.getSigningKey(decodedToken.header.kid);
    const publicKey = key.getPublicKey();

    const verifiedToken: any = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      audience: process.env.APPLE_BUNDLE_ID,
      issuer: 'https://appleid.apple.com'
    });
    if (!verifiedToken) throw new Error('Invalid identity token');

    const user: SocialUser = {
      id: verifiedToken.sub,
      email: verifiedToken.email,
      picture: '',
      name: ''
    };

    return { user, token };
  }

  async validateSocialLoginToken(platform: 'facebook' | 'google' | 'apple', token: string) {
    switch (platform) {
      case 'facebook':
        return await this.validateFacebookToken(token);
      case 'google':
        return await this.validateGoogleToken(token);
      case 'apple':
        return await this.validateAppleToken(token);
      default:
        throw new Error('Invalid platform');
    }
  }
}
