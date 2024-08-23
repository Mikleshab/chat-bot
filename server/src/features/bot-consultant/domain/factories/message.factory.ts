import { createInstance } from '../../../../common/functions/create-instance';
import { MessageDomain } from '../message.domain';
import { ClientMessageCreatedCommand } from '@features/bot-consultant/application/commands/client-message-created.command';
import { UserDomain } from '@features/bot-consultant/domain/user.domain';
import { UserFactory } from '@features/bot-consultant/domain/factories/user.factory';
import { faker } from '@faker-js/faker';

export class MessageFactory {
  static createClientMessage(command: ClientMessageCreatedCommand, user: UserDomain): MessageDomain {
    const { telegramMessageId, text, date, replyToMessageId } = command;

    return new MessageDomain(telegramMessageId, user, date, text, replyToMessageId);
  }

  static createConsultantMessage(
    text: MessageDomain['content'],
    replyToMessageId: MessageDomain['replyToMessageId'],
    user: UserDomain,
  ): MessageDomain {
    return new MessageDomain(faker.number.int({ min: 10000000 }), user, Date.now(), text, replyToMessageId);
  }

  static load(data: any): MessageDomain {
    const author = UserFactory.load(data.author);

    return createInstance(MessageDomain, { ...data, author });
  }
}
