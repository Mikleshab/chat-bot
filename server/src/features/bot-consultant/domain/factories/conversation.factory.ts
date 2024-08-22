import { createInstance } from '../../../../common/functions/create-instance';
import { Conversation } from '../value-objects/conversation';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { UserFactory } from '@features/bot-consultant/domain/factories/user.factory';

export class ConversationFactory {
  static create(message: MessageDomain): Conversation {
    return new Conversation(`Беседа с ${message.author.fullName}`, message.author, message.timestamp);
  }

  static load(data: any): Conversation {
    const client = UserFactory.load(data.client);
    return createInstance(Conversation, { ...data, client });
  }
}
