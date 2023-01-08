import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthUser, UseJwtAuthGuard } from '../../decorators/auth.decorator';
import type { AuthData } from '../../types';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  ForgotPasswordResponse,
  ResetPasswordDto,
  RevokeDto,
  SignInDto,
  SignInResponse
} from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, type: SignInResponse })
  @Post('sign-in')
  async signIn(@Body() input: SignInDto, @Res() res: Response) {
    try {
      const payload = await this.authService.emailSignIn(input.email, input.password);
      res.status(HttpStatus.OK).json(payload);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiResponse({ status: 200, type: SignInResponse })
  @Post('revoke')
  async revokeToken(@Body() input: RevokeDto, @Res() res: Response) {
    try {
      const payload = await this.authService.revoke(input.refreshToken);
      res.status(HttpStatus.OK).json(payload);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiResponse({ status: 200 })
  @Post('sign-out')
  @UseJwtAuthGuard()
  async signOut(@AuthUser() user: AuthData, @Res() res: Response) {
    try {
      await this.authService.logout(user.id);
      res.status(HttpStatus.OK).send();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiResponse({ status: 200, type: ForgotPasswordResponse })
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto, @Res() res: Response) {
    try {
      const token = await this.authService.forgotPassword(body.email);
      res.status(HttpStatus.OK).json({ token });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiResponse({ status: 200 })
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto, @Res() res: Response) {
    try {
      await this.authService.resetPassword(body.token, body.newPassword);
      res.status(HttpStatus.OK).send();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
