import { ConversationMessage } from '../models/conversation-message';
import { SaveMemberPrivateMessageCommand } from '@features/consultant/application/commands/save-member-private-message.command';
import { UserDomain } from '@features/consultant/domain/models/user.domain';
import { faker } from '@faker-js/faker';
import { Message } from '@features/chat-bot/domain/models/message';

export class ConversationMessageFactory {
  static createClientMessage(
    message: SaveMemberPrivateMessageCommand['message'],
    author: UserDomain,
  ): ConversationMessage {
    const { id: telegramMessageId, text, date, replyToMessageId } = message;

    return new ConversationMessage(telegramMessageId, author, date, text, replyToMessageId);
  }

  static createConsultantReplyToConsultantReply(
    text: ConversationMessage['content'],
    replyToMessageId: ConversationMessage['replyToMessageId'],
    author: UserDomain,
  ): ConversationMessage {
    return new ConversationMessage(faker.number.int({ min: 10000000 }), author, Date.now(), text, replyToMessageId);
  }

  static createConsultantReplyToClientMessage(message: Message, author: UserDomain): ConversationMessage {
    return new ConversationMessage(message.id, author, message.date, message.text, message.replyToMessageId);
  }
}
