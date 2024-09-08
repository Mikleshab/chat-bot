import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';

export abstract class MessageRepository {
  abstract saveMessage(conversation: Conversation, message: ConversationMessage): Promise<void>;

  abstract getMessages(
    filter: {
      authorId?: ConversationMessage['author']['userId'];
      replyToMessageId: ConversationMessage['replyToMessageId'];
    },
    pageInfo: { first?: number; after?: string },
  ): Promise<ConversationMessage[]>;

  abstract getMessageById(id: ConversationMessage['telegramMessageId']): Promise<ConversationMessage>;
}
