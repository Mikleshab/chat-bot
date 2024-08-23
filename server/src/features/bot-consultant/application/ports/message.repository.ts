import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';

export abstract class MessageRepository {
  abstract saveMessage(conversation: Conversation, message: MessageDomain): Promise<void>;

  abstract getMessages(
    filter: {
      authorId?: MessageDomain['author']['userId'];
      replyToMessageId: MessageDomain['replyToMessageId'];
    },
    pageInfo: { first?: number; after?: string },
  ): Promise<MessageDomain[]>;

  abstract getMessageById(id: MessageDomain['telegramMessageId']): Promise<MessageDomain>;
}
