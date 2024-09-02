import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('ChatEventObject', { description: 'Represents an event within a chat that is linked to an announcement' })
export class ChatEventObject {
  @Field(() => ID, { description: 'The unique identifier of the event' })
  id: string;

  @Field(() => Number, { description: 'The unique identifier of the chat where the event occurred' })
  chatId: number;

  @Field(() => String, {
    description: 'The type of the event that occurred in the chat, such as message creation or announcement posting',
  })
  eventType: string;

  @Field(() => ID, { description: 'The unique identifier of the announcement associated with this event' })
  announcementId: string;

  constructor(id: string, chatId: number, eventType: string, announcementId: string) {
    this.id = id;
    this.chatId = chatId;
    this.eventType = eventType;
    this.announcementId = announcementId;
  }
}
