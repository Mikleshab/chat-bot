import { Chat } from '@features/chat-bot/domain/models/chat';
import { ChatEvent } from '@features/events/domain/model/chat-event';

export abstract class ChatEventRepository {
  abstract add(data: Pick<ChatEvent, 'chatId' | 'title' | 'eventOptions' | 'announcementId'>): Promise<void>;

  abstract getOneByType(filter: {
    chatId: Chat['id'];
    eventType: ChatEvent['eventOptions']['type'];
  }): Promise<ChatEvent>;

  abstract getOneByAnnouncementId(
    announcementId: ChatEvent['announcementId'],
    chatId: ChatEvent['chatId'],
  ): Promise<ChatEvent>;

  abstract getAllByChatId(chatId: ChatEvent['chatId']): Promise<ChatEvent[]>;

  abstract removeById(id: ChatEvent['id'], chatId: ChatEvent['chatId']): Promise<void>;
}
