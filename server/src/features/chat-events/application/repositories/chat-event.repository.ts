import { Chat } from '@features/chat-bot/domain/models/chat';
import { ChatEvent } from '../../domain/model/chat-event';

export abstract class ChatEventRepository {
  abstract add(data: Omit<ChatEvent, 'id'>): Promise<void>;

  abstract getOneByType(filter: { chatId: Chat['id']; eventType: ChatEvent['eventType'] }): Promise<ChatEvent>;

  abstract getOneByAnnouncementId(announcementId: ChatEvent['announcementId']): Promise<ChatEvent>;

  abstract getAllByChatId(chatId: ChatEvent['chatId']): Promise<ChatEvent[]>;

  abstract removeById(id: ChatEvent['id']): Promise<void>;
}
