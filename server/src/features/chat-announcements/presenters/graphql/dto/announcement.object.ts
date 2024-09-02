import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AnnouncementEventObject } from './announcement-event.object';

@ObjectType('AnnouncementObject', { description: 'Represents an announcement object containing ID and text' })
export class AnnouncementObject {
  @Field(() => ID, { description: 'The unique identifier of the announcement' })
  id: string;

  @Field(() => String, { description: 'The title of the announcement' })
  title: string;

  @Field(() => String, { description: 'The text content of the announcement' })
  text: string;

  @Field(() => Number, { description: 'The unique identifier of the chat where the announcement occurred' })
  chatId: number;

  @Field(() => AnnouncementEventObject, {
    description: 'The event associated with this announcement',
    nullable: true,
  })
  event!: AnnouncementEventObject;

  @Field(() => [AnnouncementEventObject], {
    description: 'List of events available for the announcement',
    nullable: true,
  })
  eventsForAnnouncement!: AnnouncementEventObject[];

  constructor(id: string, title: string, text: string, chatId: number) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.chatId = chatId;
  }
}
