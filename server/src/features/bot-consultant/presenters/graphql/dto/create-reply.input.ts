import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType('CreateReplyInput', { description: 'Input arguments for the CreateReply mutation.' })
export class CreateReplyInput {
  @Field(() => String, {
    description: 'The ID of the parent message to reply to.',
  })
  @IsString({ message: 'Parent ID must be a string.' })
  parentId!: string;

  @Field(() => String, { description: 'The content of the reply message.' })
  @IsString({ message: 'Content must be a string.' })
  @IsNotEmpty({ message: 'Content must not be empty.' })
  @Length(1, 500, { message: 'Content must be between 1 and 500 characters.' })
  content!: string;

  @Field(() => String, {
    description: 'The ID of the client.',
  })
  @IsString({ message: 'Client ID must be a string.' })
  clientId!: string;
}
