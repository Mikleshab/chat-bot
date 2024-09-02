import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('AnnouncementEventObject', { description: '' })
export class AnnouncementEventObject {
  @Field(() => ID, { description: 'The unique identifier of the event' })
  id: string;

  @Field(() => String, {
    description: 'The type of the event that occurred in the chat, such as message creation or announcement posting',
  })
  eventType: string;

  constructor(id: string, eventType: string) {
    this.id = id;
    this.eventType = eventType;
  }
}
