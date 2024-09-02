import { Announcement } from '@features/chat-announcements/domain/model/announcement';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';

export class ExtraFactory {
  static toExtra(_announcement: Announcement): ExtraReplyMessage {
    return {};
  }
}
