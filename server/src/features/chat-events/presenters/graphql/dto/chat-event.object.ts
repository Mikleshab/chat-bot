import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatEventOptionsObject } from '@features/chat-events/presenters/graphql/dto/event-options';

@ObjectType('ChatEventObject', { description: 'Represents an event within a chat that is linked to an announcement' })
export class ChatEventObject {
  @Field(() => ID, { description: 'The unique identifier of the event' })
  id: string;

  @Field(() => Number, { description: 'The unique identifier of the chat where the event occurred' })
  chatId: number;

  @Field(() => String, { description: 'The title of the event to be added to the chat' })
  title!: string;

  @Field(() => ChatEventOptionsObject, { description: 'Options describing the recurrence and type of the event' })
  eventOptions: ChatEventOptionsObject;

  @Field(() => ID, { description: 'The unique identifier of the announcement associated with this event' })
  announcementId: string;

  constructor(id: string, chatId: number, title: string, eventOptions: ChatEventOptionsObject, announcementId: string) {
    this.id = id;
    this.chatId = chatId;
    this.title = title;
    this.eventOptions = eventOptions;
    this.announcementId = announcementId;
  }
}
