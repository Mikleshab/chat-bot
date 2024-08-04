import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class WelcomeMessageInput {
  @Field(() => String)
  @IsString()
  text!: string;
}
