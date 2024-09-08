import { ChatEvent } from '@features/events/domain/model/chat-event';
import { AnnouncementEventObject } from '@features/announcements/presenters/graphql/dto/announcement-event.object';

export class AnnouncementEventMapper {
  static toObjectType(event: ChatEvent): AnnouncementEventObject {
    return new AnnouncementEventObject(event.id, event.eventOptions.type);
  }
}
