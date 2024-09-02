import { ChatEvent } from '../../../domain/model/chat-event';

export class ChatEventMapper {
  static toDomain(doc: any): ChatEvent {
    return new ChatEvent(doc.id, doc.chatId, doc.eventType, doc.announcementId);
  }
}
