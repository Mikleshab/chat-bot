import * as admin from 'firebase-admin';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';
import { UserMapper } from '@features/consultant/infrastructure/firebase/mappers/user.mapper';

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
    return new Conversation(doc.title, UserMapper.toDomain(doc.client), doc.createdAt.toMillis())
      .setMessagesCount(doc.messagesCount)
      .setLastActivity(doc.updatedAt.toMillis());
  }
}
