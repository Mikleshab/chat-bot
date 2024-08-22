import * as admin from 'firebase-admin';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';
import { UserMapper } from '@features/bot-consultant/infrastructure/firebase/mappers/user.mapper';
import { ConversationFactory } from '@features/bot-consultant/domain/factories/conversation.factory';

export class ConversationMapper {
  static toDocData(conversation: Conversation) {
    return {
      title: conversation.title,
      updatedAt: admin.firestore.Timestamp.fromMillis(conversation.getLastActivity()),
      messagesCount: conversation.getMessagesCount(),
      client: UserMapper.toDocData(conversation.client),
      createdAt: admin.firestore.Timestamp.fromMillis(conversation.createdAt),
    };
  }

  static toDomain(doc: any) {
    return ConversationFactory.load({
      ...doc,
      createdAt: doc.createdAt.toMillis(),
      updatedAt: doc.updatedAt.toMillis(),
    });
  }
}
