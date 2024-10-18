import { Chat as TelegramChat } from '@telegraf/types/manage';
import { Chat } from '@features/chat/domain/models/chat';

export class ChatMapper {
  static toDomain(chat: TelegramChat): Chat {
    return new Chat(chat.id, chat.type === 'private' ? chat.username || '' : chat.title);
  }
}
