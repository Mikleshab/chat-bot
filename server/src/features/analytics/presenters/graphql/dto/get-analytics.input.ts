import { Chat } from '@features/chat-bot/domain/models/chat';
import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType('GetAnalyticsInput', { description: 'Input data required to retrieve analytics for a specific chat.' })
export class GetAnalyticsInput {
  @Field(() => Number, { description: 'The unique identifier of the Chat.' })
  @IsInt({ message: 'The chat ID must be an integer value.' })
  chatId!: Chat['id'];
}
