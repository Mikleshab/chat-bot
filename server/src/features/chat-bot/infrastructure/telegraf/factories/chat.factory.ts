import { Chat } from '@features/chat-bot/domain/models/chat';

export class ChatFactory {
  static toDomain(chatId: number): Chat {
    return new Chat(chatId);
  }
}
