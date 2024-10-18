import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsString, Length } from 'class-validator';
import { MessageObject } from '@features/consultant/presenters/graphql/dto/message.object';
import { UserObject } from '@features/consultant/presenters/graphql/dto/user.object';

@InputType('CreateConsultantReplyInput', { description: 'Input arguments for the createConsultantReply mutation.' })
export class CreateConsultantReplyInput {
  @Field(() => Number, {
    description: 'The ID of the parent message to reply to.',
  })
  @IsPositive({ message: 'Parent ID must be a number.' })
  parentId!: MessageObject['id'];

  @Field(() => String, { description: 'The content of the reply message.' })
  @IsString({ message: 'Content must be a string.' })
  @IsNotEmpty({ message: 'Content must not be empty.' })
  @Length(1, 500, { message: 'Content must be between 1 and 500 characters.' })
  content!: string;

  @Field(() => Number, {
    description: 'The ID of the client.',
  })
  @IsPositive({ message: 'Client ID must be a number.' })
  clientId!: UserObject['userId'];
}
