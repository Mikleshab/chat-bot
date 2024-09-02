import { Field, ID, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType({ description: 'Input data required to add a new chat event' })
export class AddChatEventInput {
  @Field(() => Number, { description: 'The unique identifier of the chat where the event will be added' })
  @IsInt({ message: 'The chat ID must be an integer value' })
  chatId!: number;

  @Field(() => String, { description: 'The type of event to be added to the chat, e.g., message, announcement' })
  @IsString({ message: 'The event type must be a string' })
  eventType!: string;

  @Field(() => ID, { description: 'The unique identifier of the announcement associated with this event' })
  @IsString({ message: 'The announcement ID must be a string' })
  announcementId!: string;
}
