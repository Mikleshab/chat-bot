import { ChatEventObject } from '../dto/chat-event.object';
import { ChatEvent } from '../../../domain/model/chat-event';

export class ChatEventMapper {
  static toObjectType(chatEvent: ChatEvent): ChatEventObject {
    return new ChatEventObject(chatEvent.id, chatEvent.chatId, chatEvent.eventType, chatEvent.announcementId);
  }
}
