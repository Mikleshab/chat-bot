import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt } from 'class-validator';
import { ChatEventType } from '@features/events/domain/value-objects/chat-event-options';

@InputType({ description: 'Input data required to retrieve a specific chat event' })
export class GetChatEventInput {
  @Field(() => Number, { description: 'The unique identifier of the chat where the event occurred' })
  @IsInt({ message: 'The chat ID must be an integer value' })
  chatId!: number;

  @Field(() => ChatEventType, { description: 'The type of event to be added to the chat' })
  @IsEnum(ChatEventType, { message: `The event type must be a ${Object.values(ChatEventType).join(', ')}` })
  eventType!: ChatEventType;
}
