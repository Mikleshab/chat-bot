import { ChatObject } from '@features/chat/presenters/grqphql/dto/chat.object';
import { Chat } from '@features/chat/domain/models/chat';

export class ChatMapper {
  static toObjectType(chat: Chat): ChatObject {
    return new ChatObject(chat.id, chat.name);
  }
}
