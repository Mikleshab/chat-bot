import { Announcement, DEFAULT_TEXT } from '@features/announcements/domain/model/announcement';
import { randomUUID } from 'node:crypto';

export class AnnouncementMapper {
  static toDomain(doc: any): Announcement {
    return new Announcement(doc.id, doc.title, doc.text, doc.chatId);
  }

  static toDomainDefault(): Announcement {
    return new Announcement(randomUUID(), '', DEFAULT_TEXT, 0);
  }
}
