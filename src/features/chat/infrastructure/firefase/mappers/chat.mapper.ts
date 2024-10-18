import { Chat } from '@features/chat/domain/models/chat';

export class ChatMapper {
  static toDomain(doc: any): Chat {
    return new Chat(doc.id, doc.title);
  }
}
