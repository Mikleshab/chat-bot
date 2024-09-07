import { ChatEventObject } from '../dto/chat-event.object';
import { ChatEvent } from '../../../domain/model/chat-event';
import { ChatEventOptionsObject } from '@features/chat-events/presenters/graphql/dto/event-options';

export class ChatEventMapper {
  static toObjectType(chatEvent: ChatEvent): ChatEventObject {
    return new ChatEventObject(
      chatEvent.id,
      chatEvent.chatId,
      chatEvent.title,
      new ChatEventOptionsObject(
        chatEvent.eventOptions.type,
        chatEvent.eventOptions.system,
        chatEvent.eventOptions.frequencyType,
        chatEvent.eventOptions.interval,
        chatEvent.eventOptions.startDate,
        chatEvent.eventOptions.endDate,
      ),
      chatEvent.announcementId,
    );
  }
}
