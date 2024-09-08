import { Conversation } from '../value-objects/conversation';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';

export class ConversationFactory {
  static create(message: ConversationMessage): Conversation {
    return new Conversation(`Беседа с ${message.author.fullName}`, message.author, message.timestamp);
  }
}
