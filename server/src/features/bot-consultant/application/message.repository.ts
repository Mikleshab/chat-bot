import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';

export abstract class MessageRepository {
  abstract saveMessage(conversation: Conversation, message: MessageDomain): Promise<void>;

  abstract getMessages(
    filter: {
      authorId?: MessageDomain['author']['userId'];
      parentId: MessageDomain['parentId'];
    },
    pageInfo: { first?: number; after?: string },
  ): Promise<MessageDomain[]>;

  abstract getMessageById(id: MessageDomain['messageId']): Promise<MessageDomain>;

  abstract getMessageByTelegramId(telegramMessageId: MessageDomain['telegramMessageId']): Promise<MessageDomain>;

  abstract addTelegramMessageId(
    messageId: MessageDomain['messageId'],
    telegramMessageId: MessageDomain['telegramMessageId'],
  ): Promise<void>;
}
