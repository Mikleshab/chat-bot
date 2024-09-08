import { IEvent } from '@nestjs/cqrs';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';

export class ConversationUpdatedEvent implements IEvent {
  constructor(public readonly conversationUpdated: Conversation) {}
}
