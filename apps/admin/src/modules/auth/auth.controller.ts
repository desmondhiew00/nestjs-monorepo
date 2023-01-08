import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser, UseJwtAuthGuard } from '../../decorators/auth.decorator';
import type { AuthData } from '../../types';
import { AuthService } from './auth.service';
import { RevokeDto, SignInDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() input: SignInDto) {
    try {
      const res = await this.authService.emailSignIn(input.email, input.password);
      return res;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('revoke')
  async revokeToken(@Body() input: RevokeDto) {
    try {
      return await this.authService.revoke(input.refreshToken);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('sign-out')
  @UseJwtAuthGuard()
  async signOut(@AuthUser() user: AuthData) {
    try {
      await this.authService.logout(user.id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
