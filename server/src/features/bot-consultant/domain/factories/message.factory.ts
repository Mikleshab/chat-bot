import { createInstance } from '../../../../common/functions/create-instance';
import { MessageDomain } from '../message.domain';
import { ClientMessageCreatedCommand } from '@features/bot-consultant/application/commands/client-message-created.command';
import { ConsultantMessageCreatedCommand } from '@features/bot-consultant/application/commands/consultant-message-created.command';
import { UserDomain } from '@features/bot-consultant/domain/user.domain';
import { UserFactory } from '@features/bot-consultant/domain/factories/user.factory';
import { faker } from '@faker-js/faker';

export class MessageFactory {
  static createClientMessage(
    command: ClientMessageCreatedCommand,
    user: UserDomain,
    parentId: MessageDomain['parentId'],
  ): MessageDomain {
    const { telegramMessageId, text, date } = command;

    const messageId = faker.string.uuid();

    return new MessageDomain(messageId, telegramMessageId, user, date, text, parentId);
  }

  static createConsultantMessage(command: ConsultantMessageCreatedCommand, user: UserDomain): MessageDomain {
    const { text, parentId } = command;

    const messageId = faker.string.uuid();

    return new MessageDomain(messageId, null, user, Date.now(), text, parentId);
  }

  static load(data: any): MessageDomain {
    const author = UserFactory.load(data.author);

    return createInstance(MessageDomain, { ...data, author });
  }
}
