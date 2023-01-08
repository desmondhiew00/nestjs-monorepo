import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ example: 'admin@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '1234' })
  password: string;
}

export class RevokeDto {
  @IsString()
  @ApiProperty()
  refreshToken: string;
}
