import { IEvent } from '@nestjs/cqrs';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';

export class ConversationUpdatedEvent implements IEvent {
  constructor(public readonly conversationUpdated: Conversation) {}
}
