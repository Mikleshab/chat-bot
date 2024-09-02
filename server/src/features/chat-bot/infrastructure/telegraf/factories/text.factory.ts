import { Announcement } from '@features/chat-announcements/domain/model/announcement';

export class TextFactory {
  static toText(announcement: Announcement): string {
    return announcement.text;
  }
}
