import { Field, ID, InputType } from '@nestjs/graphql';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ChatEventOptionsInput } from '@features/events/presenters/graphql/dto/event-options';

@InputType({ description: 'Input data required to add a new chat event' })
export class AddChatEventInput {
  @Field(() => Number, { description: 'The unique identifier of the chat where the event will be added' })
  @IsInt({ message: 'The chat ID must be an integer value' })
  chatId!: number;

  @Field(() => String, { description: 'The title of event to be added to the chat' })
  @IsString({ message: 'The event type must be a string' })
  title!: string;

  @Field(() => ChatEventOptionsInput, { description: 'The type of event to be added to the chat' })
  @ValidateNested({ message: 'Event options must be valid' })
  @Type(() => ChatEventOptionsInput)
  eventOptions!: ChatEventOptionsInput;

  @Field(() => ID, { description: 'The unique identifier of the announcement associated with this event' })
  @IsString({ message: 'The announcement ID must be a string' })
  announcementId!: string;
}
