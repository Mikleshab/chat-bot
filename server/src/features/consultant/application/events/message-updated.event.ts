import { IEvent } from '@nestjs/cqrs';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';

export class MessageUpdatedEvent implements IEvent {
  constructor(public readonly messageId: ConversationMessage['telegramMessageId']) {}
}
