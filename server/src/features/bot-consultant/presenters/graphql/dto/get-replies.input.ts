import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { MessageObject } from '@features/bot-consultant/presenters/graphql/dto/message.object';

@InputType('GetRepliesInput', { description: 'Input arguments for the getReplies query.' })
export class GetRepliesInput {
  @Field(() => Number, { description: 'The unique identifier of the message.' })
  @IsPositive({ message: 'Message ID must be a number.' })
  messageId!: MessageObject['id'];

  @Field(() => String, { nullable: true, description: 'The cursor to start fetching messages after.' })
  @IsOptional()
  @IsString({ message: 'Cursor must be a string.' })
  after?: string;

  @Field(() => Number, { nullable: true, description: 'The number of messages to return.' })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Limit must be a positive number.' })
  first?: number;
}
