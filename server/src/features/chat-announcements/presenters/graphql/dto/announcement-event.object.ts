import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatEventType } from '@features/chat-events/domain/value-objects/chat-event-options';

@ObjectType('AnnouncementEventObject', { description: '' })
export class AnnouncementEventObject {
  @Field(() => ID, { description: 'The unique identifier of the event' })
  id: string;

  @Field(() => ChatEventType, {
    description: 'The type of the event that occurred in the chat',
  })
  eventType: ChatEventType;

  constructor(id: string, eventType: ChatEventType) {
    this.id = id;
    this.eventType = eventType;
  }
}
