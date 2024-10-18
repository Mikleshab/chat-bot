import { AnnouncementObject } from '@features/announcements/presenters/graphql/dto/announcement.object';
import { Announcement } from '@features/announcements/domain/model/announcement';

export class AnnouncementMapper {
  static toObjectType(announcement: Announcement): AnnouncementObject {
    return new AnnouncementObject(announcement.id, announcement.title, announcement.text, announcement.chatId);
  }
}
