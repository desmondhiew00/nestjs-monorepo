import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

/* ----------------------------- Controller Dto ----------------------------- */

export class SignInDto {
  @IsEmail()
  @ApiProperty({ example: 'admin@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '1234' })
  password: string;
}

export class SignInResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessTokenExpiry: number;

  @ApiProperty()
  user: any;
}

export class RevokeDto {
  @IsString()
  @ApiProperty()
  refreshToken: string;
}

export class ForgotPasswordDto {
  @IsString()
  @ApiProperty({ example: 'admin@test.com' })
  email: string;
}

export class ForgotPasswordResponse {
  @ApiProperty()
  token: string;
}

export class ResetPasswordDto {
  @IsString()
  @ApiProperty()
  token: string;

  @IsString()
  @ApiProperty()
  newPassword: string;
}

/* -------------------------------- Resolver Dto -------------------------------- */

@ObjectType()
export class ChangePasswordDto {
  @Field()
  success: boolean;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}
