import { Chat } from '@features/chat-bot/domain/models/chat';
import { ChatEventType } from '../value-objects/chat-event.type';
import { Announcement } from '@features/chat-announcements/domain/model/announcement';

export class ChatEvent {
  constructor(
    public readonly id: string,
    public readonly chatId: Chat['id'],
    public readonly eventType: ChatEventType | string,
    public readonly announcementId: Announcement['id'],
  ) {}
}
