import { Data } from '@features/analytics/domain/value-objects/data';
import { Chat } from '@features/chat-bot/domain/models/chat';

export abstract class AnalyticsRepository {
  abstract getMessagesCount(chatId: Chat['id']): Promise<number>;

  abstract getMembersCount(chatId: Chat['id']): Promise<number>;

  abstract getMessageHistory(chatId: Chat['id']): Promise<Data[]>;

  abstract getMembersHistory(chatId: Chat['id']): Promise<Data[]>;
}
