import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field() updatedAt: Date;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true }) updatedAt?: Date;
}
