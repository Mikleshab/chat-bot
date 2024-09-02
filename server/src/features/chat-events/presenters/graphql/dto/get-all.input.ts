import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType({ description: 'Input data required to retrieve all events for a specific chat' })
export class GetAllChatEventInput {
  @Field(() => Number, { description: 'The unique identifier of the chat for which all events will be retrieved' })
  @IsInt({ message: 'The chat ID must be an integer value' })
  chatId!: number;
}
