import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType({ description: 'Input data required to retrieve a specific chat event' })
export class GetChatEventInput {
  @Field(() => Number, { description: 'The unique identifier of the chat where the event occurred' })
  @IsInt({ message: 'The chat ID must be an integer value' })
  chatId!: number;

  @Field(() => String, { description: 'The type of event to be retrieved from the chat' })
  @IsString({ message: 'The event type must be a string' })
  eventType!: string;
}
