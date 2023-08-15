import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { AuthData as GlobalAuthData } from 'configs/auth.config';

export type AuthData = GlobalAuthData;

export type AppContextReq = {
  headers: Record<string, string>;
  user: AuthData;
};

export type AppContext = {
  req: AppContextReq;
};

@ObjectType()
export class ActionResponse {
  @Field()
  @ApiProperty()
  success: boolean;
}
