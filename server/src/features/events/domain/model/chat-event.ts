import { Chat } from '@features/chat-bot/domain/models/chat';
import { ChatEventOptions } from '@features/events/domain/value-objects/chat-event-options';
import { Announcement } from '@features/announcements/domain/model/announcement';

export class ChatEvent {
  constructor(
    public readonly id: string,
    public readonly chatId: Chat['id'],
    public readonly title: string,
    public readonly eventOptions: ChatEventOptions,
    public readonly announcementId: Announcement['id'],
  ) {}
}
