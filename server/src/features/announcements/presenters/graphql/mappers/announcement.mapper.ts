import { AnnouncementObject } from '../dto/announcement.object';
import { Announcement } from '../../../domain/model/announcement';

export class AnnouncementMapper {
  static toObjectType(announcement: Announcement): AnnouncementObject {
    return new AnnouncementObject(announcement.id, announcement.title, announcement.text, announcement.chatId);
  }
}
